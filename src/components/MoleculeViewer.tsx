import { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Bounds, Html } from "@react-three/drei";
import * as THREE from "three";
import type { Atom, Molecule } from "../types/molecule";
import { getElement } from "../data/elements";

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

function MoleculeModel({ molecule, showLabels }: { molecule: Molecule; showLabels: boolean }) {
  const bonds = useMemo(() => buildBonds(molecule), [molecule]);
  return (
    <group>
      {molecule.atoms.map((atom, i) => (
        <AtomMesh key={i} atom={atom} showLabel={showLabels} />
      ))}
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
      className={`rounded-md px-3 py-1.5 text-xs font-medium ring-1 backdrop-blur transition ${
        active
          ? "bg-emerald-600 text-white ring-emerald-600"
          : "bg-white/80 text-slate-600 ring-slate-200 hover:bg-white"
      }`}
    >
      {children}
    </button>
  );
}

export default function MoleculeViewer({ molecule }: { molecule: Molecule }) {
  const [autoRotate, setAutoRotate] = useState(true);
  const [showLabels, setShowLabels] = useState(false);

  return (
    <div className="relative h-full w-full">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 12], fov: 45 }}>
        <color attach="background" args={["#f3faf6"]} />
        <ambientLight intensity={0.75} />
        <hemisphereLight intensity={0.6} groundColor="#d8ede1" color="#ffffff" />
        <directionalLight position={[6, 8, 6]} intensity={1.2} />
        <directionalLight position={[-6, -4, -6]} intensity={0.4} />
        {/* Re-fit the camera whenever the molecule changes (keyed remount). */}
        <Bounds key={molecule.cid} fit clip observe margin={1.3}>
          <MoleculeModel molecule={molecule} showLabels={showLabels} />
        </Bounds>
        <OrbitControls
          makeDefault
          enableDamping
          autoRotate={autoRotate}
          autoRotateSpeed={0.7}
        />
      </Canvas>

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-4">
        <div className="pointer-events-auto flex gap-2">
          <ToggleButton active={autoRotate} onClick={() => setAutoRotate((v) => !v)}>
            ⟳ Aylantirish
          </ToggleButton>
          <ToggleButton active={showLabels} onClick={() => setShowLabels((v) => !v)}>
            Belgilar
          </ToggleButton>
        </div>
        <div className="pointer-events-none rounded-md bg-white/80 px-3 py-1.5 text-xs text-slate-500 ring-1 ring-slate-200 backdrop-blur">
          suring · kattalashtiring · o'ng tugma bilan suring
        </div>
      </div>
    </div>
  );
}
