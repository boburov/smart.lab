import { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Bounds, Html } from "@react-three/drei";
import * as THREE from "three";
import type { Atom, Molecule, AggregateState } from "../../../entities/molecule";
import { boundingRadius, moleculeState, STATE_LABELS_UZ } from "../../../entities/molecule";
import { getElement } from "../../../entities/element";
import { Icon } from "../../../shared/ui/icon";

/** Ball scale relative to van der Waals radius — small enough to read bonds. */
const ATOM_SCALE = 0.28;
const BOND_RADIUS = 0.09;
/** Perpendicular separation between the strands of a double/triple bond (Å). */
const MULTI_BOND_SEP = 0.16;

interface Cylinder {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color: string;
  radius: number;
}

/** Pre-compute the two-tone cylinder strands for every bond in the molecule. */
function buildBonds(mol: Molecule): Cylinder[] {
  const out: Cylinder[] = [];
  for (const bond of mol.bonds) {
    const a = mol.atoms[bond.a];
    const b = mol.atoms[bond.b];
    if (!a || !b) continue;

    const pa = new THREE.Vector3(a.x, a.y, a.z);
    const pb = new THREE.Vector3(b.x, b.y, b.z);
    const dir = new THREE.Vector3().subVectors(pb, pa).normalize();
    // A vector perpendicular to the bond, for offsetting multi-bond strands.
    const ref =
      Math.abs(dir.y) < 0.95
        ? new THREE.Vector3(0, 1, 0)
        : new THREE.Vector3(1, 0, 0);
    const perp = new THREE.Vector3().crossVectors(dir, ref).normalize();

    const colorA = getElement(a.element).color;
    const colorB = getElement(b.element).color;

    const offsets =
      bond.order === 2
        ? [-MULTI_BOND_SEP, MULTI_BOND_SEP]
        : bond.order === 3
          ? [-MULTI_BOND_SEP, 0, MULTI_BOND_SEP]
          : [0];
    const radius = bond.order >= 2 && bond.order <= 3 ? BOND_RADIUS * 0.6 : BOND_RADIUS;

    for (const o of offsets) {
      const shift = perp.clone().multiplyScalar(o);
      const sA = pa.clone().add(shift);
      const sB = pb.clone().add(shift);
      const mid = new THREE.Vector3().addVectors(sA, sB).multiplyScalar(0.5);
      // Split each strand at the midpoint so each half takes its atom's color.
      out.push({ start: sA, end: mid, color: colorA, radius });
      out.push({ start: mid, end: sB, color: colorB, radius });
    }
  }
  return out;
}

function BondMesh({ start, end, color, radius }: Cylinder) {
  const { position, quaternion, length } = useMemo(() => {
    const dir = new THREE.Vector3().subVectors(end, start);
    const len = dir.length();
    const pos = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const quat = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.normalize(),
    );
    return { position: pos, quaternion: quat, length: len };
  }, [start, end]);

  return (
    <mesh position={position} quaternion={quaternion}>
      <cylinderGeometry args={[radius, radius, length, 16]} />
      <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
    </mesh>
  );
}

function AtomMesh({ atom, showLabel }: { atom: Atom; showLabel: boolean }) {
  const el = getElement(atom.element);
  const [hovered, setHovered] = useState(false);
  const radius = el.vanDerWaalsRadius * ATOM_SCALE;

  return (
    <group position={[atom.x, atom.y, atom.z]}>
      <mesh
        scale={hovered ? 1.22 : 1}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
      >
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          color={el.color}
          roughness={0.35}
          metalness={0.15}
          emissive={el.color}
          emissiveIntensity={hovered ? 0.45 : 0.08}
        />
      </mesh>
      {(hovered || showLabel) && (
        <Html center distanceFactor={9} className="pointer-events-none select-none">
          <span className="whitespace-nowrap rounded bg-white/90 px-1.5 py-0.5 text-xs font-semibold text-slate-800 shadow-sm ring-1 ring-slate-200">
            {el.symbol}
            {hovered && <span className="font-normal text-slate-400"> · {el.name}</span>}
          </span>
        </Html>
      )}
    </group>
  );
}

function MoleculeModel({
  molecule,
  showLabels,
  interactive = true,
  segments = 32,
}: {
  molecule: Molecule;
  showLabels: boolean;
  /** Bitta molekula ko'rinishida atomlar hover/label'ga javob beradi. */
  interactive?: boolean;
  /** Sfera silliqligi — ko'p-nusxali rejimda ravonlik uchun kamaytiriladi. */
  segments?: number;
}) {
  const bonds = useMemo(() => buildBonds(molecule), [molecule]);
  return (
    <group>
      {interactive
        ? molecule.atoms.map((atom, i) => (
            <AtomMesh key={i} atom={atom} showLabel={showLabels} />
          ))
        : molecule.atoms.map((atom, i) => {
            const el = getElement(atom.element);
            return (
              <mesh key={i} position={[atom.x, atom.y, atom.z]}>
                <sphereGeometry
                  args={[el.vanDerWaalsRadius * ATOM_SCALE, segments, segments]}
                />
                <meshStandardMaterial
                  color={el.color}
                  roughness={0.35}
                  metalness={0.15}
                  emissive={el.color}
                  emissiveIntensity={0.08}
                />
              </mesh>
            );
          })}
      {bonds.map((c, i) => (
        <BondMesh key={i} {...c} />
      ))}
    </group>
  );
}

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium ring-1 backdrop-blur transition ${
        active
          ? "bg-blue-600 text-white ring-blue-600"
          : "bg-white/80 text-slate-600 ring-slate-200 hover:bg-white"
      }`}
    >
      {children}
    </button>
  );
}

/** Ko'rinish rejimi: bitta molekula yoki uchta agregat holatdan biri. */
type ViewMode = "single" | AggregateState;

interface Instance {
  position: [number, number, number];
  rotation: [number, number, number];
}

/** Kichik, urug'lantirilgan PRNG — bir xil molekula har safar bir xil joylashuvni beradi. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Agregat holatni ko'rsatuvchi molekula nusxalarining joylashuvini hisoblaydi:
 *  - qattiq: tartibli, zich panjara (burilishsiz);
 *  - suyuq: zich, lekin silkitilgan panjara + tasodifiy burilish;
 *  - gaz: siyrak, erkin tarqoq.
 * Nusxalar soni molekula kattaligiga qarab cheklanadi (render ravonligi uchun).
 */
function buildInstances(state: AggregateState, mol: Molecule): Instance[] {
  const d = Math.max(boundingRadius(mol), 0.8) * 2;
  const atoms = Math.max(mol.atoms.length, 1);
  const rand = mulberry32((mol.cid >>> 0) || 1);
  const out: Instance[] = [];

  if (state === "gas") {
    const spread = d * 3.2;
    const n = Math.max(4, Math.min(9, Math.floor(1500 / atoms)));
    for (let i = 0; i < n; i++) {
      out.push({
        position: [
          (rand() * 2 - 1) * spread,
          (rand() * 2 - 1) * spread,
          (rand() * 2 - 1) * spread,
        ],
        rotation: [rand() * Math.PI * 2, rand() * Math.PI * 2, rand() * Math.PI * 2],
      });
    }
    return out;
  }

  // qattiq va suyuq — kubik panjara; kattaligiga qarab 3×3×3, 2×2×2 yoki 1.
  const side = atoms * 27 <= 1500 ? 3 : atoms * 8 <= 1500 ? 2 : 1;
  const coords: number[] = [];
  for (let i = 0; i < side; i++) coords.push(i - (side - 1) / 2);

  const gap = state === "solid" ? d * 1.12 : d * 1.3;
  const jitter = state === "solid" ? 0 : d * 0.26;

  for (const x of coords)
    for (const y of coords)
      for (const z of coords) {
        out.push({
          position: [
            x * gap + (rand() * 2 - 1) * jitter,
            y * gap + (rand() * 2 - 1) * jitter,
            z * gap + (rand() * 2 - 1) * jitter,
          ],
          rotation:
            state === "solid"
              ? [0, 0, 0]
              : [rand() * Math.PI * 2, rand() * Math.PI * 2, rand() * Math.PI * 2],
        });
      }
  return out;
}

/** Tanlangan agregat holatdagi molekula nusxalarini sahnaga joylashtiradi. */
function StateField({ state, molecule }: { state: AggregateState; molecule: Molecule }) {
  const instances = useMemo(() => buildInstances(state, molecule), [state, molecule]);
  return (
    <group>
      {instances.map((inst, i) => (
        <group key={i} position={inst.position} rotation={inst.rotation}>
          <MoleculeModel molecule={molecule} showLabels={false} interactive={false} segments={16} />
        </group>
      ))}
    </group>
  );
}

const VIEW_MODES: { id: ViewMode; label: string }[] = [
  { id: "single", label: "Molekula" },
  { id: "solid", label: STATE_LABELS_UZ.solid },
  { id: "liquid", label: STATE_LABELS_UZ.liquid },
  { id: "gas", label: STATE_LABELS_UZ.gas },
];

export function MoleculeViewer({ molecule }: { molecule: Molecule }) {
  const [autoRotate, setAutoRotate] = useState(true);
  const [showLabels, setShowLabels] = useState(false);
  const [mode, setMode] = useState<ViewMode>("single");

  const naturalState = moleculeState(molecule);

  return (
    <div className="relative h-full w-full">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 12], fov: 45 }}>
        <color attach="background" args={["#f5f8fc"]} />
        <ambientLight intensity={0.75} />
        <hemisphereLight intensity={0.6} groundColor="#dbe6f3" color="#ffffff" />
        <directionalLight position={[6, 8, 6]} intensity={1.2} />
        <directionalLight position={[-6, -4, -6]} intensity={0.4} />
        {/* Molekula yoki rejim o'zgarganda kamerani qayta moslash (keyli remount). */}
        <Bounds key={`${molecule.cid}-${mode}`} fit clip observe margin={1.3}>
          {mode === "single" ? (
            <MoleculeModel molecule={molecule} showLabels={showLabels} />
          ) : (
            <StateField state={mode} molecule={molecule} />
          )}
        </Bounds>
        <OrbitControls
          makeDefault
          enableDamping
          autoRotate={autoRotate}
          autoRotateSpeed={0.7}
        />
      </Canvas>

      <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          {/* Agregat holat rejimini tanlash */}
          <div className="pointer-events-auto inline-flex rounded-xl bg-white/80 p-1 ring-1 ring-slate-200 backdrop-blur">
            {VIEW_MODES.map((m) => {
              const active = mode === m.id;
              const natural = m.id !== "single" && m.id === naturalState;
              return (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  title={natural ? "Xona haroratidagi tabiiy holat" : undefined}
                  className={`relative rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    active
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {m.label}
                  {natural && (
                    <span
                      className={`absolute right-1 top-1 h-1.5 w-1.5 rounded-full ${
                        active ? "bg-white" : "bg-blue-500"
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="pointer-events-none hidden rounded-lg bg-white/80 px-3 py-1.5 text-xs text-slate-500 ring-1 ring-slate-200 backdrop-blur sm:block">
            suring · kattalashtiring · o'ng tugma bilan suring
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="pointer-events-auto flex gap-2">
            <ToggleButton active={autoRotate} onClick={() => setAutoRotate((v) => !v)}>
              <Icon name="rotate" className="h-3.5 w-3.5" />
              Aylantirish
            </ToggleButton>
            {mode === "single" && (
              <ToggleButton active={showLabels} onClick={() => setShowLabels((v) => !v)}>
                Belgilar
              </ToggleButton>
            )}
          </div>
          <span className="pointer-events-none rounded-lg bg-white/80 px-2.5 py-1.5 text-xs text-slate-500 ring-1 ring-slate-200 backdrop-blur">
            Xona haroratida:{" "}
            <span className="font-semibold text-blue-700">
              {STATE_LABELS_UZ[naturalState]}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
