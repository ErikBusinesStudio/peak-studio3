import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";

function useProceduralMountain(segments: number, heightSegments: number) {
  return useMemo(() => {
    const noise2D = createNoise2D();
    const geometry = new THREE.ConeGeometry(12, 9, segments, heightSegments, true);
    const pos = geometry.attributes.position;
    const colors: number[] = [];
    const snowColor = new THREE.Color("#f1f2f4");
    const rockColor = new THREE.Color("#5a5d63");
    const baseColor = new THREE.Color("#2a3329");
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const broad = noise2D(x * 0.15, z * 0.15) * 1.4;
      const fine = noise2D(x * 0.45, z * 0.45) * 0.45;
      const heightNorm = (y + 4.5) / 9; // 0 base -> 1 top
      const falloff = 1 - Math.max(0, heightNorm);
      const ny = y + (broad + fine) * (0.3 + falloff * 0.9);
      pos.setXYZ(i, x, ny, z);

      // color by height
      const c = new THREE.Color();
      if (heightNorm > 0.7) {
        c.copy(rockColor).lerp(snowColor, (heightNorm - 0.7) / 0.3);
      } else if (heightNorm > 0.25) {
        c.copy(baseColor).lerp(rockColor, (heightNorm - 0.25) / 0.45);
      } else {
        c.copy(baseColor);
      }
      colors.push(c.r, c.g, c.b);
    }
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geometry.computeVertexNormals();
    return geometry;
  }, [segments, heightSegments]);
}

function Mountain({ isMobile }: { isMobile: boolean }) {
  const geometry = useProceduralMountain(isMobile ? 48 : 96, isMobile ? 20 : 40);
  return (
    <mesh geometry={geometry} castShadow={!isMobile} receiveShadow={!isMobile}>
      <meshStandardMaterial vertexColors flatShading roughness={0.95} metalness={0.05} side={THREE.DoubleSide} />
    </mesh>
  );
}

function useScrollProgress() {
  const progress = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function CameraRig({ progress, reduced }: { progress: React.MutableRefObject<number>; reduced: boolean }) {
  const current = useRef(0);
  const frozenT = useRef<number | null>(null);
  useFrame(({ camera }) => {
    let t: number;
    if (reduced) {
      if (frozenT.current === null) frozenT.current = progress.current;
      t = frozenT.current;
    } else {
      // smooth
      current.current += (progress.current - current.current) * 0.08;
      t = current.current;
    }
    const radius = THREE.MathUtils.lerp(5, 16, t);
    const y = THREE.MathUtils.lerp(7, -3, t);
    const angle = t * 2.5 * Math.PI * 2;
    camera.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
    camera.lookAt(0, y * 0.4 + 1, 0);
  });
  return null;
}

export function MountainBackdrop() {
  const progress = useScrollProgress();
  const [isMobile, setIsMobile] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <Canvas
        shadows={!isMobile}
        dpr={[1, isMobile ? 1.5 : 2]}
        camera={{ position: [10, 7, 10], fov: 45, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#0a0a0a"]} />
        <fog attach="fog" args={["#0a0a0a", 18, 45]} />
        <ambientLight intensity={0.25} />
        <directionalLight
          position={[-10, 14, 6]}
          intensity={2.2}
          color="#fff1e0"
          castShadow={!isMobile}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[8, 5, -6]} intensity={0.35} color="#ff5a3a" />
        <Mountain isMobile={isMobile} />
        <CameraRig progress={progress} reduced={reduced} />
      </Canvas>
      {/* Vignette + red glow accents */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/70" />
      <div className="absolute top-1/4 -left-32 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[180px]" />
      <div className="absolute bottom-1/4 -right-32 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[180px]" />
    </div>
  );
}

export default MountainBackdrop;