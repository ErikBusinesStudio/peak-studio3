import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sparkles, Cloud, Clouds } from "@react-three/drei";
import { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";

function MountainLayer({ z, yOffset, color, seed, amplitude }: { z: number; yOffset: number; color: string; seed: number; amplitude: number }) {
  const geometry = useMemo(() => {
    const segments = 120;
    const width = 260;
    const shape = new THREE.Shape();
    const startX = -width / 2;
    const baseY = -60;
    shape.moveTo(startX, baseY);
    for (let i = 0; i <= segments; i++) {
      const x = startX + (width / segments) * i;
      const n =
        Math.sin(i * 0.18 + seed) * amplitude +
        Math.sin(i * 0.42 + seed * 1.7) * amplitude * 0.45 +
        Math.sin(i * 0.95 + seed * 0.6) * amplitude * 0.2 +
        Math.sin(i * 2.1 + seed * 2.3) * amplitude * 0.08;
      shape.lineTo(x, n);
    }
    shape.lineTo(startX + width, baseY);
    shape.lineTo(startX, baseY);
    return new THREE.ShapeGeometry(shape, 1);
  }, [seed, amplitude]);

  return (
    <mesh geometry={geometry} position={[0, yOffset, z]}>
      <meshBasicMaterial color={color} fog />
    </mesh>
  );
}

function Scene({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const camRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const s = scrollRef.current;
    if (camRef.current) {
      // gentle descent: pan down + slight rotation as user scrolls
      camRef.current.position.y = -s * 6;
      camRef.current.rotation.x = s * 0.08;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.008;
      cloudsRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.05) * 2;
    }
  });

  return (
    <group ref={camRef}>
      <fogExp2 attach="fog" args={["#0a0d12", 0.018]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[20, 30, 10]} intensity={0.5} color="#cfd8e3" />

      <Stars radius={140} depth={60} count={2200} factor={2.5} fade speed={0.6} />

      {/* Back atmospheric haze */}
      <mesh position={[0, 0, -70]}>
        <planeGeometry args={[400, 200]} />
        <meshBasicMaterial color="#1a2230" fog={false} />
      </mesh>

      {/* Mountain layers, far → near */}
      <MountainLayer z={-55} yOffset={4} color="#1c2330" seed={1.2} amplitude={26} />
      <MountainLayer z={-40} yOffset={-2} color="#141a25" seed={3.8} amplitude={32} />
      <MountainLayer z={-25} yOffset={-8} color="#0c1119" seed={6.4} amplitude={38} />
      <MountainLayer z={-12} yOffset={-14} color="#06090e" seed={9.1} amplitude={44} />

      {/* Clouds drifting around peaks */}
      <group ref={cloudsRef} position={[0, 8, -35]}>
        <Clouds material={THREE.MeshBasicMaterial}>
          <Cloud segments={28} bounds={[40, 4, 12]} volume={10} color="#1c2230" opacity={0.55} />
          <Cloud segments={20} bounds={[30, 3, 10]} volume={8} color="#252c38" opacity={0.4} position={[-25, 4, -5]} />
          <Cloud segments={20} bounds={[30, 3, 10]} volume={8} color="#1a212c" opacity={0.45} position={[28, -2, 6]} />
        </Clouds>
      </group>

      {/* Atmospheric particles / mist */}
      <Sparkles count={120} scale={[80, 30, 30]} size={2.2} speed={0.15} opacity={0.4} color="#e6ecf2" position={[0, -4, -18]} />
      <Sparkles count={60} scale={[60, 20, 20]} size={1.4} speed={0.08} opacity={0.25} color="#a8b4c2" position={[0, 6, -30]} />
    </group>
  );
}

const MountainBackground = () => {
  const scrollRef = useRef(0);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Disable on reduced motion or very small/touch low-end devices to keep things light
    if (typeof window !== "undefined") {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) setEnabled(false);
    }
    const onScroll = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      // Only react to first ~2 screens for the descent feeling
      scrollRef.current = Math.min(window.scrollY / window.innerHeight, 2);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!enabled) {
    return (
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1018] via-[#06090e] to-background" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      {/* CSS sky gradient sits behind the canvas as base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1018] via-[#080b12] to-background" />
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 2, 18], fov: 55, near: 0.1, far: 300 }}
        style={{ background: "transparent" }}
      >
        <Scene scrollRef={scrollRef} />
      </Canvas>
      {/* Vignette + horizon glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_55%,hsl(220_15%_4%/0.85)_100%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default MountainBackground;