import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { Molecule } from "../../../entities/molecule";
import { getElement } from "../../../entities/element";

/** Inner radius / interior height the liquid is allowed to fill (scene units). */
const INNER_RADIUS = 0.62;
const MAX_LIQUID_HEIGHT = 1.62;
const BEAKER_HEIGHT = 2.0;

interface LabSceneProps {
  liquidColor: string;
  fill: number;
  product: Molecule | null;
}

/** The glass vessel — open-topped cylinder with a base, kept deliberately simple. */
function Beaker() {
  return (
    <group>
      <mesh position={[0, BEAKER_HEIGHT / 2, 0]}>
        <cylinderGeometry args={[0.7, 0.66, BEAKER_HEIGHT, 48, 1, true]} />
        <meshStandardMaterial
          color="#dbeaf6"
          transparent
          opacity={0.22}
          roughness={0.08}
          metalness={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Base disc */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.66, 0.66, 0.04, 48]} />
        <meshStandardMaterial color="#cfe0ee" transparent opacity={0.35} roughness={0.1} />
      </mesh>
      {/* Rim highlight */}
      <mesh position={[0, BEAKER_HEIGHT, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.7, 0.022, 12, 48]} />
        <meshStandardMaterial color="#eaf3fb" roughness={0.2} metalness={0.1} />
      </mesh>
    </group>
  );
}

/** The liquid column — animates its height toward `fill` and follows the colour. */
function Liquid({ color, fill }: { color: string; fill: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const current = useRef(0);
  const target = useMemo(() => new THREE.Color(color), [color]);

  useFrame((_, delta) => {
    current.current += (fill - current.current) * Math.min(1, delta * 3.5);
    const h = Math.max(0.001, current.current * MAX_LIQUID_HEIGHT);
    const mesh = ref.current;
    if (mesh) {
      mesh.scale.y = h / MAX_LIQUID_HEIGHT;
      mesh.position.y = 0.06 + h / 2;
    }
    if (matRef.current) matRef.current.color.lerp(target, Math.min(1, delta * 4));
  });

  return (
    <mesh ref={ref} position={[0, 0.06, 0]}>
      <cylinderGeometry args={[INNER_RADIUS, INNER_RADIUS, MAX_LIQUID_HEIGHT, 48]} />
      <meshStandardMaterial
        ref={matRef}
        color={color}
        transparent
        opacity={0.92}
        roughness={0.25}
        metalness={0.05}
      />
    </mesh>
  );
}

/** Compact ball-and-stick model that floats above the vessel when a product is formed. */
function ProductMolecule({ molecule }: { molecule: Molecule }) {
  const ref = useRef<THREE.Group>(null);
  const { atoms, bonds, scale } = useMemo(() => {
    let radius = 0.001;
    for (const a of molecule.atoms) radius = Math.max(radius, Math.hypot(a.x, a.y, a.z));
    return { atoms: molecule.atoms, bonds: molecule.bonds, scale: 0.9 / radius };
  }, [molecule]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.6;
  });

  return (
    <group ref={ref} position={[0, 3.05, 0]} scale={scale}>
      {atoms.map((atom, i) => {
        const el = getElement(atom.element);
        return (
          <mesh key={i} position={[atom.x, atom.y, atom.z]}>
            <sphereGeometry args={[el.vanDerWaalsRadius * 0.32, 24, 24]} />
            <meshStandardMaterial
              color={el.color}
              roughness={0.3}
              metalness={0.15}
              emissive={el.color}
              emissiveIntensity={0.12}
            />
          </mesh>
        );
      })}
      {bonds.map((bond, i) => {
        const a = molecule.atoms[bond.a];
        const b = molecule.atoms[bond.b];
        if (!a || !b) return null;
        const start = new THREE.Vector3(a.x, a.y, a.z);
        const end = new THREE.Vector3(b.x, b.y, b.z);
        const mid = start.clone().add(end).multiplyScalar(0.5);
        const dir = end.clone().sub(start);
        const len = dir.length();
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir.normalize(),
        );
        return (
          <mesh key={`b${i}`} position={mid} quaternion={quat}>
            <cylinderGeometry args={[0.09, 0.09, len, 12]} />
            <meshStandardMaterial color="#cdd7e2" roughness={0.5} />
          </mesh>
        );
      })}
    </group>
  );
}

/** Full 3D laboratory scene: bench, glass vessel, liquid and the formed product. */
export function LabScene({ liquidColor, fill, product }: LabSceneProps) {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 1.7, 4.8], fov: 42 }} shadows>
      <color attach="background" args={["#eef5fb"]} />
      <fog attach="fog" args={["#eef5fb", 9, 16]} />
      <ambientLight intensity={0.85} />
      <hemisphereLight intensity={0.55} groundColor="#d6e6f2" color="#ffffff" />
      <directionalLight position={[5, 8, 5]} intensity={1.15} castShadow />
      <directionalLight position={[-5, 3, -4]} intensity={0.35} />

      {/* Lab bench surface */}
      <mesh position={[0, -0.06, 0]} receiveShadow>
        <cylinderGeometry args={[6, 6, 0.12, 64]} />
        <meshStandardMaterial color="#dce8f3" roughness={0.85} metalness={0.02} />
      </mesh>

      <Beaker />
      <Liquid color={liquidColor} fill={fill} />
      {product && <ProductMolecule molecule={product} />}

      <OrbitControls
        makeDefault
        enableDamping
        enablePan={false}
        minDistance={3}
        maxDistance={8}
        minPolarAngle={0.5}
        maxPolarAngle={Math.PI / 2.1}
        target={[0, 1, 0]}
      />
    </Canvas>
  );
}
