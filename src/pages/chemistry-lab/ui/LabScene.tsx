import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { ReactionKind } from "../../../entities/reaction";
import type { PhysicalState } from "../../../entities/substance";

/**
 * A single realistic glass beaker on a bench. Substances pour in as a coloured
 * liquid: a tilted bottle tips above the beaker and a stream runs into it, the
 * liquid level rises, the colour blends and gentle bubbles drift up.
 */

const BEAKER_HEIGHT = 2.0;
const INNER_RADIUS = 0.6;
const MAX_LIQUID_HEIGHT = 1.72;
const LIQUID_BOTTOM = 0.05;

interface LabSceneProps {
  liquidColor: string;
  fill: number;
  pourColor: string;
  pourSeq: number;
  pourState: PhysicalState;
  reactionSeq: number;
  reactionKind: ReactionKind | null;
}

/** The glass beaker: slightly tapered wall, base, rim and measuring lines. */
function Beaker() {
  const gradMarks = [0.45, 0.8, 1.15, 1.5];
  return (
    <group>
      {/* Glass wall (open top) — clear, so the liquid inside stays visible */}
      <mesh position={[0, BEAKER_HEIGHT / 2, 0]}>
        <cylinderGeometry args={[0.72, 0.66, BEAKER_HEIGHT, 64, 1, true]} />
        <meshStandardMaterial
          color="#d3e4f5"
          transparent
          opacity={0.16}
          roughness={0.08}
          metalness={0.1}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Base */}
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.66, 0.66, 0.06, 64]} />
        <meshPhysicalMaterial color="#dbe8f5" transparent opacity={0.4} roughness={0.1} />
      </mesh>
      {/* Rim */}
      <mesh position={[0, BEAKER_HEIGHT, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.72, 0.022, 14, 64]} />
        <meshStandardMaterial color="#f3f8fd" roughness={0.18} metalness={0.1} />
      </mesh>
      {/* Measuring lines */}
      {gradMarks.map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.7 - (BEAKER_HEIGHT - y) * 0.03, 0.005, 8, 64]} />
          <meshStandardMaterial color="#9db8d4" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

/** The liquid column — animates height toward `fill` and follows the colour. */
function Liquid({ color, fill }: { color: string; fill: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const current = useRef(0);
  const tint = useMemo(() => new THREE.Color(color), [color]);

  useFrame((_, delta) => {
    current.current += (fill - current.current) * Math.min(1, delta * 3.2);
    const h = Math.max(0.001, current.current * MAX_LIQUID_HEIGHT);
    const mesh = ref.current;
    if (mesh) {
      mesh.scale.y = h / MAX_LIQUID_HEIGHT;
      mesh.position.y = LIQUID_BOTTOM + h / 2;
    }
    if (matRef.current) matRef.current.color.lerp(tint, Math.min(1, delta * 4));
  });

  return (
    <mesh ref={ref} position={[0, LIQUID_BOTTOM, 0]}>
      <cylinderGeometry args={[INNER_RADIUS, INNER_RADIUS, MAX_LIQUID_HEIGHT, 56]} />
      <meshStandardMaterial
        ref={matRef}
        color={color}
        transparent
        opacity={0.96}
        roughness={0.22}
        metalness={0.05}
      />
    </mesh>
  );
}

/** A handful of bubbles drifting up through the liquid. */
function Bubbles({ fill }: { fill: number }) {
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const seeds = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        x: ((i % 3) - 1) * 0.28,
        z: (((i + 1) % 3) - 1) * 0.22,
        phase: i * 0.83,
        speed: 0.25 + 0.05 * (i % 4),
        r: 0.022 + 0.012 * (i % 3),
      })),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const top = Math.max(0.12, fill * MAX_LIQUID_HEIGHT - 0.12);
    seeds.forEach((s, i) => {
      const m = meshes.current[i];
      if (!m) return;
      m.visible = fill > 0.05;
      const y = LIQUID_BOTTOM + 0.05 + ((t * s.speed + s.phase) % 1) * top;
      m.position.set(s.x, y, s.z);
    });
  });

  return (
    <group>
      {seeds.map((s, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshes.current[i] = el;
          }}
        >
          <sphereGeometry args={[s.r, 10, 10]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.35} />
        </mesh>
      ))}
    </group>
  );
}

/** Fade the pour in, hold, then fade out across the animation's 0–1 progress. */
function pourIntensity(p: number): number {
  if (p >= 1) return 0;
  if (p < 0.16) return p / 0.16;
  if (p > 0.72) return Math.max(0, 1 - (p - 0.72) / 0.28);
  return 1;
}

/** Curved path the poured stream follows, from the cup's lip down to the liquid. */
const STREAM_CURVE = new THREE.QuadraticBezierCurve3(
  new THREE.Vector3(0.52, 2.3, 0),
  new THREE.Vector3(0.4, 1.92, 0),
  new THREE.Vector3(0.06, 1.5, 0),
);

/**
 * Liquid pour: a glass cup tips above the beaker and a thin, water-like stream
 * (with droplets) runs in. Plays once on mount — the wrapper remounts it per
 * pour via a `key`.
 */
function LiquidPour({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null);
  const cup = useRef<THREE.Group>(null);
  const streamMat = useRef<THREE.MeshStandardMaterial>(null);
  const drops = useRef<(THREE.Mesh | null)[]>([]);
  const progress = useRef(0);
  const streamGeom = useMemo(
    () => new THREE.TubeGeometry(STREAM_CURVE, 28, 0.026, 10, false),
    [],
  );
  useEffect(() => () => streamGeom.dispose(), [streamGeom]);

  useFrame((state, delta) => {
    progress.current = Math.min(1, progress.current + delta * 0.8);
    const intensity = pourIntensity(progress.current);
    // The pouring cup vanishes once the pour is finished.
    if (group.current) group.current.visible = progress.current < 1;
    if (cup.current) cup.current.rotation.z = -0.95 - progress.current * 0.5;
    if (streamMat.current) streamMat.current.opacity = 0.75 * intensity;
    const flow = (state.clock.elapsedTime * 1.6) % 1;
    drops.current.forEach((m, i) => {
      if (!m) return;
      m.position.copy(STREAM_CURVE.getPoint((flow + i / drops.current.length) % 1));
      m.visible = intensity > 0.25;
    });
  });

  return (
    <group ref={group}>
      <group ref={cup} position={[0.92, 2.6, 0]} rotation={[0, 0, -0.95]}>
        <mesh>
          <cylinderGeometry args={[0.2, 0.18, 0.5, 28, 1, true]} />
          <meshStandardMaterial
            color="#e8f1fb"
            transparent
            opacity={0.25}
            roughness={0.06}
            metalness={0.1}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, -0.24, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.04, 28]} />
          <meshStandardMaterial color="#dbe8f5" transparent opacity={0.5} />
        </mesh>
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.165, 0.165, 0.34, 28]} />
          <meshStandardMaterial color={color} transparent opacity={0.92} roughness={0.25} />
        </mesh>
      </group>
      <mesh geometry={streamGeom}>
        <meshStandardMaterial
          ref={streamMat}
          color={color}
          transparent
          opacity={0}
          roughness={0.12}
          depthWrite={false}
        />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(el) => {
            drops.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.03, 10, 10]} />
          <meshStandardMaterial color={color} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}

/** Solid pour: small chunks fall from above and sink into the liquid. */
function SolidDrop({ color }: { color: string }) {
  const cubes = useRef<(THREE.Mesh | null)[]>([]);
  const progress = useRef(0);
  const seeds = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        x: ((i % 3) - 1) * 0.22,
        z: (((i + 1) % 3) - 1) * 0.18,
        delay: i * 0.08,
        spin: i * 0.6,
        size: 0.1 + 0.03 * (i % 3),
      })),
    [],
  );

  useFrame((_, delta) => {
    // Clamp past 1 + max delay so every cube reaches lp = 1 and hides.
    progress.current = Math.min(1.6, progress.current + delta * 0.9);
    seeds.forEach((s, i) => {
      const m = cubes.current[i];
      if (!m) return;
      const lp = Math.max(0, Math.min(1, progress.current - s.delay));
      m.position.set(s.x, 2.7 + (0.35 - 2.7) * (lp * lp), s.z); // ease-in fall
      m.rotation.set(s.spin + lp * 3, s.spin * 1.3 + lp * 2, lp * 2);
      m.visible = lp > 0 && lp < 1;
      (m.material as THREE.MeshStandardMaterial).opacity =
        lp > 0.85 ? Math.max(0, 1 - (lp - 0.85) / 0.15) : 1;
    });
  });

  return (
    <group>
      {seeds.map((s, i) => (
        <mesh
          key={i}
          visible={false}
          ref={(el) => {
            cubes.current[i] = el;
          }}
        >
          <boxGeometry args={[s.size, s.size, s.size]} />
          <meshStandardMaterial color={color} roughness={0.55} metalness={0.15} transparent />
        </mesh>
      ))}
    </group>
  );
}

/** Gas pour: a translucent cloud rises and disperses above the beaker. */
function GasPuff({ color }: { color: string }) {
  const puffs = useRef<(THREE.Mesh | null)[]>([]);
  const progress = useRef(0);
  const seeds = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        x: ((i % 3) - 1) * 0.2,
        z: (((i + 2) % 3) - 1) * 0.2,
        delay: i * 0.05,
        rise: 0.7 + 0.12 * (i % 4),
      })),
    [],
  );

  useFrame((_, delta) => {
    // Clamp past 1 + max delay so every puff reaches lp = 1 and disperses.
    progress.current = Math.min(1.5, progress.current + delta * 0.7);
    seeds.forEach((s, i) => {
      const m = puffs.current[i];
      if (!m) return;
      const lp = Math.max(0, Math.min(1, progress.current - s.delay));
      m.position.set(s.x * (1 + lp), 1.4 + lp * s.rise * 1.6, s.z * (1 + lp));
      m.scale.setScalar(0.12 + lp * 0.45);
      m.visible = lp > 0 && lp < 1;
      (m.material as THREE.MeshStandardMaterial).opacity = Math.max(0, 0.5 * (1 - lp));
    });
  });

  return (
    <group>
      {seeds.map((_s, i) => (
        <mesh
          key={i}
          visible={false}
          ref={(el) => {
            puffs.current[i] = el;
          }}
        >
          <sphereGeometry args={[1, 10, 10]} />
          <meshStandardMaterial color={color} transparent opacity={0} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

/** Picks the entry animation by physical state; the `key` replays it per pour. */
function Pour({ color, seq, state }: { color: string; seq: number; state: PhysicalState }) {
  if (seq === 0) return null;
  if (state === "qattiq") return <SolidDrop key={seq} color={color} />;
  if (state === "gaz") return <GasPuff key={seq} color={color} />;
  return <LiquidPour key={seq} color={color} />;
}

const FX_PARTICLES = 16;
const FX_COLORS: Record<ReactionKind, { core: string; particle: string }> = {
  explosion: { core: "#fff1c2", particle: "#ff6a00" },
  flash: { core: "#ffffff", particle: "#bfe0ff" },
  smoke: { core: "#cdd4dc", particle: "#9aa3ad" },
  fizz: { core: "#ffffff", particle: "#dff1ff" },
};

/**
 * Reaction effect that bursts from the vessel mouth: a bright flash plus a
 * spray of particles. Tuned per kind — explosions fling fast and fall, smoke
 * rises and grows — and restarts whenever `seq` changes.
 */
function ReactionFx({ seq, kind }: { seq: number; kind: ReactionKind | null }) {
  const group = useRef<THREE.Group>(null);
  const flash = useRef<THREE.Mesh>(null);
  const flashMat = useRef<THREE.MeshBasicMaterial>(null);
  const parts = useRef<(THREE.Mesh | null)[]>([]);
  const progress = useRef(1);
  const lastSeq = useRef(seq);

  const dirs = useMemo(
    () =>
      Array.from({ length: FX_PARTICLES }, (_, i) => {
        const a = (i / FX_PARTICLES) * Math.PI * 2;
        const up = 0.4 + (i % 4) * 0.18;
        return new THREE.Vector3(Math.cos(a), up, Math.sin(a)).normalize();
      }),
    [],
  );

  useFrame((_, delta) => {
    if (lastSeq.current !== seq) {
      lastSeq.current = seq;
      progress.current = 0;
    }
    if (progress.current < 1) progress.current = Math.min(1, progress.current + delta * 0.9);
    const p = progress.current;
    const active = seq > 0 && p < 1 && kind !== null;
    if (group.current) group.current.visible = active;
    if (!active || !kind) return;

    const colors = FX_COLORS[kind];
    const speed = kind === "explosion" ? 2.8 : kind === "smoke" ? 0.9 : 1.7;
    const gravity = kind === "smoke" ? 0 : 1.8;

    if (flash.current) {
      flash.current.scale.setScalar(0.25 + p * (kind === "explosion" ? 2.0 : 1.2));
    }
    if (flashMat.current) {
      flashMat.current.color.set(colors.core);
      flashMat.current.opacity = Math.max(0, 1 - p * 1.2);
    }
    parts.current.forEach((m, i) => {
      if (!m) return;
      const d = dirs[i % dirs.length]!;
      m.position.set(d.x * speed * p, 1.45 + d.y * speed * p - gravity * p * p, d.z * speed * p);
      const grow = kind === "smoke" ? 0.05 + 0.22 * p : 0.09 * (1 - p) + 0.015;
      m.scale.setScalar(Math.max(0.001, grow));
      const mat = m.material as THREE.MeshBasicMaterial;
      mat.color.set(colors.particle);
      mat.opacity = Math.max(0, 1 - p);
    });
  });

  return (
    <group ref={group} visible={false}>
      <mesh ref={flash} position={[0, 1.45, 0]}>
        <sphereGeometry args={[0.5, 20, 20]} />
        <meshBasicMaterial ref={flashMat} transparent opacity={0} toneMapped={false} />
      </mesh>
      {Array.from({ length: FX_PARTICLES }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            parts.current[i] = el;
          }}
        >
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial transparent opacity={0} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/** Full 3D laboratory scene: bench, glass beaker, liquid and the formed product. */
export function LabScene({
  liquidColor,
  fill,
  pourColor,
  pourSeq,
  pourState,
  reactionSeq,
  reactionKind,
}: LabSceneProps) {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 1.6, 4.8], fov: 42 }} shadows>
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
      <Bubbles fill={fill} />
      <Pour color={pourColor} seq={pourSeq} state={pourState} />
      <ReactionFx seq={reactionSeq} kind={reactionKind} />

      <OrbitControls
        makeDefault
        enableDamping
        enablePan={false}
        minDistance={3}
        maxDistance={8}
        minPolarAngle={0.5}
        maxPolarAngle={Math.PI / 2.1}
        target={[0, 0.95, 0]}
      />
    </Canvas>
  );
}
