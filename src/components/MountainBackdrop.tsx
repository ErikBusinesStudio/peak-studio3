import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect, useState, Suspense } from "react";
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";
import { Environment, useTexture } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField, Vignette, Noise } from "@react-three/postprocessing";

// ---------------------------------------------------------------------------
// Terrain constants — a long strip the camera flies across
// ---------------------------------------------------------------------------
const TERRAIN_WIDTH = 50;
const TERRAIN_LENGTH = 500;
// Camera flies from Z = 0 down to Z = -TERRAIN_LENGTH (positive t = further down)

// Height profile along the path. zWorld is the world Z (negative as we go forward).
// Returns terrain height at (x, z).
function terrainHeight(x: number, z: number, noise: (x: number, y: number) => number) {
  const t = THREE.MathUtils.clamp(-z / TERRAIN_LENGTH, 0, 1);
  const xn = x / TERRAIN_WIDTH;

  // Base ridge profile across X (mountains on sides, valley in middle as we descend)
  const sideRidge = Math.pow(Math.abs(xn) * 2, 1.4);

  // Per-zone base height
  let base = 0;
  let roughAmp = 0.6;
  let roughFreq = 0.25;

  if (t < 0.1) {
    // Summit: very high, jagged
    base = 18 - t * 30;
    roughAmp = 3.5;
    roughFreq = 0.9;
  } else if (t < 0.25) {
    // Glacier ridge: descending
    const k = (t - 0.1) / 0.15;
    base = 15 - k * 9;
    roughAmp = 1.5;
    roughFreq = 0.45;
  } else if (t < 0.32) {
    // Waterfall basin & lake: drops sharply, nearly flat low
    const k = (t - 0.25) / 0.07;
    base = 6 - k * 7; // down to ~ -1
    roughAmp = 0.2;
    roughFreq = 0.3;
  } else if (t < 0.5) {
    // Path: gentle climb back
    const k = (t - 0.32) / 0.18;
    base = -1 + k * 4;
    roughAmp = 0.5;
    roughFreq = 0.35;
  } else if (t < 0.6) {
    // Crevasse zone — handled by subtraction below
    base = 3;
    roughAmp = 0.8;
  } else if (t < 0.75) {
    // Forest: low hills
    base = 2 + Math.sin(t * 80) * 0.6;
    roughAmp = 1.1;
    roughFreq = 0.5;
  } else if (t < 0.85) {
    // Base camp: flat plateau
    base = 1.2;
    roughAmp = 0.15;
  } else if (t < 0.95) {
    // Ice cave: tall wall with tunnel carved separately
    base = 10;
    roughAmp = 1.8;
  } else {
    // Valley: flat, open
    base = 0.2;
    roughAmp = 0.3;
  }

  // Side ridges (mountains framing the path)
  base += sideRidge * 4 * (0.5 + 0.5 * (1 - t));

  // Procedural roughness
  const rough = noise(x * roughFreq, z * roughFreq) * roughAmp;
  const broad = noise(x * 0.08, z * 0.08) * 2.2;

  let h = base + rough + broad;

  // Crevasse cuts in glacier (0.15-0.22) — narrow deep slits
  if (t > 0.15 && t < 0.22) {
    const slit = Math.sin(z * 0.8) * Math.sin(x * 0.15);
    if (slit > 0.85) h -= 6;
  }

  // Path groove (0.35-0.5) — visible trail near x=0
  if (t > 0.35 && t < 0.5) {
    const grooveFactor = Math.exp(-(x * x) / 4);
    h -= grooveFactor * 0.6;
  }

  // Main crevasse (0.5-0.6): a deep transverse cut
  if (t > 0.52 && t < 0.58) {
    const k = (t - 0.55) / 0.03;
    h -= Math.exp(-k * k * 6) * 12;
  }

  // Ice cave tunnel mouth (0.88-0.92) — carve arch near x=0
  if (t > 0.88 && t < 0.92) {
    const ax = Math.abs(x);
    if (ax < 4) {
      const archDepth = Math.sqrt(Math.max(0, 16 - x * x)) * 1.4;
      h -= archDepth;
    }
  }

  return h;
}

function useProceduralTerrain(wSeg: number, lSeg: number) {
  return useMemo(() => {
    const noise2D = createNoise2D();
    const geometry = new THREE.PlaneGeometry(TERRAIN_WIDTH, TERRAIN_LENGTH, wSeg, lSeg);
    geometry.rotateX(-Math.PI / 2);
    // Plane after rotateX: extends in X (width) and Z (length). We want length from z=0 to z=-LENGTH.
    geometry.translate(0, 0, -TERRAIN_LENGTH / 2);
    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(i, terrainHeight(x, z, noise2D));
    }
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    // Expose the noise function via userData (so other helpers can sample)
    (geometry as any).userData.heightAt = (x: number, z: number) => terrainHeight(x, z, noise2D);
    return geometry;
  }, [wSeg, lSeg]);
}

const PH = "https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k";
const SNOW = {
  map: `${PH}/snow_02/snow_02_diff_1k.jpg`,
  normalMap: `${PH}/snow_02/snow_02_nor_gl_1k.jpg`,
  roughnessMap: `${PH}/snow_02/snow_02_rough_1k.jpg`,
};
const ROCK = {
  map: `${PH}/rock_boulder_dry/rock_boulder_dry_diff_1k.jpg`,
  normalMap: `${PH}/rock_boulder_dry/rock_boulder_dry_nor_gl_1k.jpg`,
  roughnessMap: `${PH}/rock_boulder_dry/rock_boulder_dry_rough_1k.jpg`,
};

function Mountain({ isMobile }: { isMobile: boolean }) {
  const geometry = useProceduralTerrain(isMobile ? 80 : 160, isMobile ? 240 : 600);
  const snow = useTexture([SNOW.map, SNOW.normalMap, SNOW.roughnessMap]);
  const rock = useTexture([ROCK.map, ROCK.normalMap, ROCK.roughnessMap]);

  useMemo(() => {
    [...snow, ...rock].forEach((t) => {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(4, 4);
      t.anisotropy = 8;
    });
    snow[0].colorSpace = THREE.SRGBColorSpace;
    rock[0].colorSpace = THREE.SRGBColorSpace;
  }, [snow, rock]);

  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      map: rock[0],
      normalMap: rock[1],
      roughnessMap: rock[2],
      roughness: 1,
      metalness: 0,
      side: THREE.FrontSide,
    });
    // inject snow textures + height-based mix
    (mat as any).onBeforeCompile = (shader: any) => {
      shader.uniforms.snowMap = { value: snow[0] };
      shader.uniforms.snowNormal = { value: snow[1] };
      shader.uniforms.snowRough = { value: snow[2] };
      shader.uniforms.minY = { value: -2.0 };
      shader.uniforms.maxY = { value: 20.0 };

      shader.vertexShader = shader.vertexShader
        .replace(
          "#include <common>",
          `#include <common>\nvarying float vHeight;\nvarying vec2 vMountUv;`
        )
        .replace(
          "#include <begin_vertex>",
          `#include <begin_vertex>\nvHeight = position.y;\nvMountUv = uv;`
        );

      shader.fragmentShader = shader.fragmentShader
        .replace(
          "#include <common>",
          `#include <common>\nuniform sampler2D snowMap;\nuniform sampler2D snowNormal;\nuniform sampler2D snowRough;\nuniform float minY;\nuniform float maxY;\nvarying float vHeight;\nvarying vec2 vMountUv;`
        )
        .replace(
          "#include <map_fragment>",
          `
          vec2 uvR = vMountUv * vec2(8.0, 80.0);
          vec4 rockTex = texture2D( map, uvR );
          vec4 snowTex = texture2D( snowMap, uvR );
          float h = clamp((vHeight - minY) / (maxY - minY), 0.0, 1.0);
          float mixT = smoothstep(0.35, 0.7, h);
          vec4 sampledDiffuseColor = mix(rockTex, snowTex, mixT);
          #ifdef DECODE_VIDEO_TEXTURE
            sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
          #endif
          diffuseColor *= sampledDiffuseColor;
          `
        )
        .replace(
          "#include <roughnessmap_fragment>",
          `
          float roughnessFactor = roughness;
          vec4 rRock = texture2D( roughnessMap, vMountUv * vec2(8.0, 80.0) );
          vec4 rSnow = texture2D( snowRough, vMountUv * vec2(8.0, 80.0) );
          float hR = clamp((vHeight - minY) / (maxY - minY), 0.0, 1.0);
          float mixR = smoothstep(0.35, 0.7, hR);
          roughnessFactor *= mix(rRock.g, rSnow.g, mixR);
          `
        )
        .replace(
          "#include <normal_fragment_maps>",
          `
          vec3 nRock = texture2D( normalMap, vMountUv * vec2(8.0, 80.0) ).xyz * 2.0 - 1.0;
          vec3 nSnow = texture2D( snowNormal, vMountUv * vec2(8.0, 80.0) ).xyz * 2.0 - 1.0;
          float hN = clamp((vHeight - minY) / (maxY - minY), 0.0, 1.0);
          float mixN = smoothstep(0.35, 0.7, hN);
          vec3 mapN = normalize(mix(nRock, nSnow, mixN));
          mapN.xy *= normalScale;
          normal = normalize( tbn * mapN );
          `
        );
    };
    return mat;
  }, [snow, rock]);

  return (
    <>
      <mesh geometry={geometry} material={material} receiveShadow={!isMobile} />
      <SceneProps geometry={geometry as any} isMobile={isMobile} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Scene props: lake, waterfall, trees, cabin, ice cave arch
// ---------------------------------------------------------------------------
function SceneProps({ geometry, isMobile }: { geometry: THREE.BufferGeometry & { userData: any }; isMobile: boolean }) {
  const waterRef = useRef<THREE.Mesh>(null);
  const splashRef = useRef<THREE.Points>(null);

  // Z positions for zones (negative)
  const zLake = -TERRAIN_LENGTH * 0.28;
  const zFall = -TERRAIN_LENGTH * 0.255;
  const zForestStart = -TERRAIN_LENGTH * 0.6;
  const zForestEnd = -TERRAIN_LENGTH * 0.75;
  const zCabin = -TERRAIN_LENGTH * 0.8;
  const zCave = -TERRAIN_LENGTH * 0.9;

  // Trees
  const trees = useMemo(() => {
    const n = isMobile ? 30 : 55;
    const arr: { pos: [number, number, number]; scale: number }[] = [];
    const heightAt = geometry.userData.heightAt;
    for (let i = 0; i < n; i++) {
      const x = (Math.random() - 0.5) * TERRAIN_WIDTH * 0.9;
      const z = zForestStart + Math.random() * (zForestEnd - zForestStart);
      const y = heightAt ? heightAt(x, z) : 2;
      arr.push({ pos: [x, y, z], scale: 0.6 + Math.random() * 0.9 });
    }
    return arr;
  }, [isMobile, geometry]);

  // Splash particles
  const splashGeom = useMemo(() => {
    const count = 250;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = Math.random() * 2;
      positions[i * 3 + 2] = zFall + (Math.random() - 0.5) * 1.5;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [zFall]);

  // Animated water + splash + waterfall scroll
  const fallMatRef = useRef<THREE.MeshBasicMaterial>(null);
  useFrame((_, dt) => {
    if (fallMatRef.current && fallMatRef.current.map) {
      fallMatRef.current.map.offset.y -= dt * 1.4;
    }
    if (splashRef.current) {
      const pos = splashRef.current.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) {
        let y = pos.getY(i) - dt * 1.5;
        if (y < -1) y = 2 + Math.random();
        pos.setY(i, y);
      }
      pos.needsUpdate = true;
    }
  });

  // Procedural waterfall texture
  const fallTexture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 64; c.height = 256;
    const ctx = c.getContext("2d")!;
    const grd = ctx.createLinearGradient(0, 0, 0, 256);
    grd.addColorStop(0, "rgba(220,235,255,0.0)");
    grd.addColorStop(0.5, "rgba(220,235,255,0.7)");
    grd.addColorStop(1, "rgba(220,235,255,0.2)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 64, 256);
    for (let i = 0; i < 80; i++) {
      ctx.fillStyle = `rgba(255,255,255,${0.05 + Math.random() * 0.25})`;
      ctx.fillRect(Math.random() * 64, Math.random() * 256, 1 + Math.random() * 2, 8 + Math.random() * 24);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, []);

  return (
    <group>
      {/* Lake */}
      <mesh ref={waterRef} position={[0, -0.9, zLake]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[8, 48]} />
        <meshStandardMaterial color="#0a1626" roughness={0.08} metalness={0.4} envMapIntensity={1.4} />
      </mesh>

      {/* Waterfall */}
      <mesh position={[0, 2.5, zFall]}>
        <planeGeometry args={[5, 7]} />
        <meshBasicMaterial ref={fallMatRef} map={fallTexture} transparent depthWrite={false} />
      </mesh>

      {/* Splash particles */}
      <points ref={splashRef} geometry={splashGeom}>
        <pointsMaterial color="#dceaff" size={0.08} transparent opacity={0.7} depthWrite={false} />
      </points>

      {/* Trees */}
      {trees.map((t, i) => (
        <mesh key={i} position={t.pos} scale={[t.scale, t.scale * 2, t.scale]}>
          <coneGeometry args={[0.6, 2.2, 6]} />
          <meshStandardMaterial color="#15291b" roughness={1} />
        </mesh>
      ))}

      {/* Cabin: box + roof */}
      <group position={[2, (geometry.userData.heightAt?.(2, zCabin) ?? 1) + 0.5, zCabin]}>
        <mesh castShadow>
          <boxGeometry args={[2.2, 1.2, 1.8]} />
          <meshStandardMaterial color="#3a2418" roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.05, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[1.7, 1.0, 4]} />
          <meshStandardMaterial color="#1a1410" roughness={0.95} />
        </mesh>
        <pointLight position={[0, 0.6, 1.2]} intensity={3} distance={8} color="#ffb259" />
      </group>

      {/* Ice cave arch */}
      <group position={[0, 1, zCave]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.6, 0.7, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#0a1822" emissive="#3aa8ff" emissiveIntensity={0.5} roughness={0.6} />
        </mesh>
        <pointLight intensity={2} distance={10} color="#5ec8ff" />
      </group>
    </group>
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

function CameraRig({
  progress,
  reduced,
  heightAt,
}: {
  progress: React.MutableRefObject<number>;
  reduced: boolean;
  heightAt: ((x: number, z: number) => number) | null;
}) {
  const current = useRef(0);
  const frozenT = useRef<number | null>(null);
  useFrame(({ camera }) => {
    let t: number;
    if (reduced) {
      if (frozenT.current === null) frozenT.current = progress.current;
      t = frozenT.current;
    } else {
      current.current += (progress.current - current.current) * 0.12;
      t = current.current;
    }
    t = THREE.MathUtils.clamp(t, 0, 1);

    const z = -t * TERRAIN_LENGTH;
    const x = Math.sin(t * Math.PI * 6) * 1.8;
    const groundHere = heightAt ? heightAt(x, z) : 0;
    const groundAhead = heightAt ? heightAt(x, z - 4) : 0;
    const margin = 3.5;
    const y = Math.max(groundHere, groundAhead) + margin;

    camera.position.set(x, y, z);

    const lookZ = z - 12;
    const lookGround = heightAt ? heightAt(x, lookZ) : 0;
    camera.lookAt(x, lookGround + 0.5, lookZ);
  });
  return null;
}

export function MountainBackdrop() {
  const progress = useScrollProgress();
  const [isMobile, setIsMobile] = useState(false);
  const [reduced, setReduced] = useState(false);
  const heightFn = useMemo(() => {
    const noise = createNoise2D();
    return (x: number, z: number) => terrainHeight(x, z, noise);
  }, []);

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
        camera={{ position: [0, 22, 2], fov: 60, near: 0.1, far: 600 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#0a0a0a"]} />
        <fog attach="fog" args={["#0a0a0a", 30, 180]} />
        <Suspense fallback={null}>
          <Environment preset="sunset" background={false} />
          <Mountain isMobile={isMobile} />
        </Suspense>
        <ambientLight intensity={0.08} />
        <directionalLight position={[8, 5, -6]} intensity={0.25} color="#ff5a3a" />
        <CameraRig progress={progress} reduced={reduced} heightAt={heightFn} />
        <EffectComposer>
          <DepthOfField focusDistance={0.01} focalLength={0.05} bokehScale={isMobile ? 1.5 : 3} />
          <Bloom intensity={0.4} luminanceThreshold={0.6} mipmapBlur />
          <Vignette eskil={false} offset={0.3} darkness={0.6} />
          <Noise opacity={0.02} />
        </EffectComposer>
      </Canvas>
      {/* Vignette + red glow accents */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/70" />
      <div className="absolute top-1/4 -left-32 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[180px]" />
      <div className="absolute bottom-1/4 -right-32 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[180px]" />
    </div>
  );
}

export default MountainBackdrop;