import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { AnatomyLayer, AnatomyPart, LayerState, Region } from "../../../entities/anatomy";

/** Shaffof qatlamlar barqaror saralanishi uchun chizish tartibi (tashqi qatlam keyin). */
const RENDER_ORDER: Record<AnatomyLayer, number> = {
  skeleton: 0,
  vessels: 1,
  organs: 2,
  muscle: 3,
  skin: 4,
};

interface AnatomyViewerProps {
  parts: AnatomyPart[];
  layerState: LayerState;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  region: Region;
}

const DEG = Math.PI / 180;

/** AnatomyPart geometriyasini Three.js BufferGeometry'ga aylantiradi. */
function buildGeometry(part: AnatomyPart): THREE.BufferGeometry {
  const a = part.args ?? [];
  switch (part.geometryType) {
    case "sphere":
      return new THREE.SphereGeometry(a[0] ?? 0.05, 28, 28);
    case "box":
      return new THREE.BoxGeometry(a[0] ?? 0.1, a[1] ?? 0.1, a[2] ?? 0.1);
    case "capsule":
      return new THREE.CapsuleGeometry(a[0] ?? 0.03, a[1] ?? 0.1, 6, 14);
    case "cylinder":
      return new THREE.CylinderGeometry(a[0] ?? 0.03, a[1] ?? 0.03, a[2] ?? 0.12, 18);
    case "cone":
      return new THREE.ConeGeometry(a[0] ?? 0.05, a[1] ?? 0.12, 18);
    case "ellipsoid":
      return new THREE.SphereGeometry(1, 28, 28); // scale orqali cho'ziladi
    case "tube": {
      const pts = (part.path && part.path.length >= 2 ? part.path : [
        [0, 0, 0],
        [0, 0.1, 0],
      ]).map((p) => new THREE.Vector3(p[0], p[1], p[2]));
      const curve = new THREE.CatmullRomCurve3(pts);
      return new THREE.TubeGeometry(curve, Math.max(24, pts.length * 10), part.radius ?? 0.012, 10);
    }
    default:
      return new THREE.SphereGeometry(0.05, 16, 16);
  }
}

function PartMesh({
  part,
  opacity,
  selected,
  onSelect,
}: {
  part: AnatomyPart;
  opacity: number;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const geometry = useMemo(() => buildGeometry(part), [part]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  const isTube = part.geometryType === "tube";
  const isEllipsoid = part.geometryType === "ellipsoid";
  const position = isTube ? ([0, 0, 0] as const) : part.position;
  const rotation = isTube
    ? ([0, 0, 0] as const)
    : ((part.rotation ?? [0, 0, 0]).map((d) => d * DEG) as [number, number, number]);
  const scale = isEllipsoid
    ? (part.args ?? [1, 1, 1])
    : (part.scale ?? [1, 1, 1]);

  const highlight = selected || hovered;
  // Tanlangan qism ko'rinarli bo'lsin, lekin qatlam shaffofligini buzib ichki
  // a'zolarni to'sib qo'ymasin — shuning uchun to'liq noshaffof qilmaymiz.
  const renderOpacity = selected ? Math.max(opacity, 0.55) : opacity;

  return (
    <mesh
      geometry={geometry}
      position={position as [number, number, number]}
      rotation={rotation}
      scale={scale as [number, number, number]}
      renderOrder={RENDER_ORDER[part.layer]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(part.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
    >
      <meshStandardMaterial
        color={part.color}
        transparent={renderOpacity < 1}
        opacity={renderOpacity}
        depthWrite={renderOpacity > 0.92}
        roughness={0.62}
        metalness={0.05}
        emissive={highlight ? part.color : "#000000"}
        emissiveIntensity={selected ? 0.55 : hovered ? 0.28 : 0}
      />
    </mesh>
  );
}

/** Kamerani tanlangan regionga yumshoq olib boradi. */
function CameraRig({ region, controls }: { region: Region; controls: React.MutableRefObject<any> }) {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(...region.target), [region]);
  const desired = useMemo(
    () =>
      new THREE.Vector3(
        region.target[0],
        region.target[1] + region.distance * 0.12,
        region.target[2] + region.distance,
      ),
    [region],
  );
  useFrame((_, delta) => {
    // Kadr tezligidan mustaqil silliq yaqinlashish.
    const a = 1 - Math.pow(0.001, delta);
    camera.position.lerp(desired, a);
    const c = controls.current;
    if (c) {
      c.target.lerp(target, a);
      c.update();
    }
  });
  return null;
}

/** Qatlamli inson anatomiyasi 3D ko'rgichi. */
export function AnatomyViewer({
  parts,
  layerState,
  selectedId,
  onSelect,
  region,
}: AnatomyViewerProps) {
  const controls = useRef<any>(null);

  return (
    <div className="relative h-full w-full">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.1, 2.6], fov: 42 }}
        onPointerMissed={() => onSelect(null)}
      >
        <color attach="background" args={["#eef3f9"]} />
        <ambientLight intensity={0.7} />
        <hemisphereLight intensity={0.5} groundColor="#cdd8e6" color="#ffffff" />
        <directionalLight position={[4, 6, 5]} intensity={1.1} />
        <directionalLight position={[-5, 2, -4]} intensity={0.4} />

        <group>
          {parts.map((p) => {
            const ls = layerState[p.layer];
            if (!ls || !ls.visible) return null;
            return (
              <PartMesh
                key={p.id}
                part={p}
                opacity={ls.opacity}
                selected={selectedId === p.id}
                onSelect={onSelect}
              />
            );
          })}
        </group>

        <OrbitControls ref={controls} makeDefault enableDamping minDistance={0.4} maxDistance={5} />
        <CameraRig region={region} controls={controls} />
      </Canvas>
    </div>
  );
}
