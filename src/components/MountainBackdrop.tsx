import { Canvas, useFrame } from "@react-three/fiber";
import { ReactNode, useEffect, useMemo, useRef, useState, Suspense } from "react";
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";
import { Environment, ScrollControls, Scroll, useScroll, useTexture } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField, Vignette, Noise } from "@react-three/postprocessing";

// ---------------------------------------------------------------------------
// Single procedural mountain. Camera spirals around it as scroll progresses.
// ---------------------------------------------------------------------------
const MOUNTAIN_RADIUS = 6;     // base radius
const MOUNTAIN_HEIGHT = 14;    // total height (base to summit)
const PAGES = 10;              // 10 sections of 100vh

// Three-octave radial+vertical displacement field shared between mesh build
// and prop placement (so trees/cabin/etc sit on the actual surface).
function makeMountainField() {
  const noise = createNoise2D();
  // Big peaks: dominant low-freq angular variation (2-3 peaks)
  const bigA = 2.6;          // amplitude (world units of radial displacement)
  const medA = bigA * 0.25;  // 1/4
  const fineA = bigA / 15;   // 1/15

  const heightField = (angle: number, t: number) => {
    // t in [0,1], 0=base, 1=summit
    const big =
      Math.cos(angle * 2.0 + 0.3) * 0.6 +
      Math.cos(angle * 3.0 - 1.1) * 0.4;
    const med = noise(Math.cos(angle * 4) * 2, Math.sin(angle * 4) * 2 + t * 2);
    const fine = noise(Math.cos(angle * 16) * 6 + t * 8, Math.sin(angle * 16) * 6);
    // Carved features: narrow notches at specific (angle, height) zones.
    let carve = 0;
    const glacierAngle = Math.PI * 0.25;
    const crepaccioAngle = -Math.PI * 0.6;
    const caveAngle = Math.PI * 1.15;
    // Glacier crevasse: high band, thin angular slit
    const dGlac = Math.atan2(Math.sin(angle - glacierAngle), Math.cos(angle - glacierAngle));
    if (t > 0.55 && t < 0.85 && Math.abs(dGlac) < 0.08) carve -= 1.4;
    // Crepaccio: mid band, darker deeper
    const dCrep = Math.atan2(Math.sin(angle - crepaccioAngle), Math.cos(angle - crepaccioAngle));
    if (t > 0.35 && t < 0.6 && Math.abs(dCrep) < 0.07) carve -= 1.8;
    // Cave arch: low band
    const dCave = Math.atan2(Math.sin(angle - caveAngle), Math.cos(angle - caveAngle));
    if (t > 0.12 && t < 0.28 && Math.abs(dCave) < 0.12) carve -= 1.6;
    return bigA * big + medA * med + fineA * fine + carve;
  };

  // Returns world (x,y,z) on mountain surface at given angle and height-t
  const surfacePoint = (angle: number, t: number) => {
    const taper = 1 - t * 0.92; // narrows toward summit
    const r = MOUNTAIN_RADIUS * taper + heightField(angle, t) * 0.35;
    const y = t * MOUNTAIN_HEIGHT + heightField(angle, t) * 0.15;
    return new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r);
  };

  return { heightField, surfacePoint };
}

function useMountainGeometry(field: ReturnType<typeof makeMountainField>, isMobile: boolean) {
  return useMemo(() => {
    const radial = isMobile ? 64 : 128;
    const heightSeg = isMobile ? 48 : 96;
    const geom = new THREE.CylinderGeometry(
      0.05,                // topRadius
      MOUNTAIN_RADIUS,     // bottomRadius
      MOUNTAIN_HEIGHT,
      radial,
      heightSeg,
      true,                // openEnded
    );
    // shift so base sits at y=0
    geom.translate(0, MOUNTAIN_HEIGHT / 2, 0);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const t = THREE.MathUtils.clamp(y / MOUNTAIN_HEIGHT, 0, 1);
      const angle = Math.atan2(z, x);
      const h = field.heightField(angle, t);
      const r = Math.sqrt(x * x + z * z);
      const newR = r + h * 0.35;
      const nx = Math.cos(angle) * newR;
      const nz = Math.sin(angle) * newR;
      pos.setX(i, nx);
      pos.setY(i, y + h * 0.15);
      pos.setZ(i, nz);
    }
    geom.computeVertexNormals();
    return geom;
  }, [field, isMobile]);
}

// ---------------------------------------------------------------------------
// Textures (snow + rock)
// ---------------------------------------------------------------------------
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

function Mountain({ isMobile, field }: { isMobile: boolean; field: ReturnType<typeof makeMountainField> }) {
  const geometry = useMountainGeometry(field, isMobile);
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
      side: THREE.DoubleSide,
    });
    (mat as any).onBeforeCompile = (shader: any) => {
      shader.uniforms.snowMap = { value: snow[0] };
      shader.uniforms.snowNormal = { value: snow[1] };
      shader.uniforms.snowRough = { value: snow[2] };
      shader.uniforms.mossColor = { value: new THREE.Color("#1f3a22") };
      shader.vertexShader = shader.vertexShader
        .replace("#include <common>", `#include <common>\nvarying float vT;`)
        .replace(
          "#include <begin_vertex>",
          `#include <begin_vertex>\nvT = clamp(position.y / ${MOUNTAIN_HEIGHT.toFixed(2)}, 0.0, 1.0);`,
        );
      shader.fragmentShader = shader.fragmentShader
        .replace(
          "#include <common>",
          `#include <common>\nuniform sampler2D snowMap;\nuniform sampler2D snowNormal;\nuniform sampler2D snowRough;\nuniform vec3 mossColor;\nvarying float vT;`,
        )
        .replace(
          "#include <map_fragment>",
          `
          vec4 rockTex = texture2D( map, vMapUv );
          vec4 snowTex = texture2D( snowMap, vMapUv );
          float snowMix = smoothstep(0.55, 0.78, vT);
          float mossMix = 1.0 - smoothstep(0.0, 0.22, vT);
          vec3 baseCol = mix(rockTex.rgb, snowTex.rgb, snowMix);
          baseCol = mix(baseCol, mossColor, mossMix * 0.7);
          vec4 sampledDiffuseColor = vec4(baseCol, 1.0);
          diffuseColor *= sampledDiffuseColor;
          `,
        )
        .replace(
          "#include <roughnessmap_fragment>",
          `
          float roughnessFactor = roughness;
          vec4 rRock = texture2D( roughnessMap, vMapUv );
          vec4 rSnow = texture2D( snowRough, vMapUv );
          float mR = smoothstep(0.55, 0.78, vT);
          roughnessFactor *= mix(rRock.g, rSnow.g, mR);
          `,
        )
        .replace(
          "#include <normal_fragment_maps>",
          `
          vec3 nRock = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
          vec3 nSnow = texture2D( snowNormal, vNormalMapUv ).xyz * 2.0 - 1.0;
          float mN = smoothstep(0.55, 0.78, vT);
          vec3 mapN = normalize(mix(nRock, nSnow, mN));
          mapN.xy *= normalScale;
          normal = normalize( tbn * mapN );
          `,
        );
    };
    return mat;
  }, [snow, rock]);

  return (
    <>
      <mesh geometry={geometry} material={material} receiveShadow={!isMobile} castShadow={!isMobile} />
      <SceneProps isMobile={isMobile} field={field} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Surface props: glacier ice, crepaccio glow, trees, base camp, cabin, cave, lake+waterfall
// ---------------------------------------------------------------------------
function SceneProps({ isMobile, field }: { isMobile: boolean; field: ReturnType<typeof makeMountainField> }) {
  const splashRef = useRef<THREE.Points>(null);
  const fallMatRef = useRef<THREE.MeshBasicMaterial>(null);

  const ANG = {
    glacier: Math.PI * 0.25,
    crepaccio: -Math.PI * 0.6,
    forest: Math.PI * 0.85,
    base: -Math.PI * 0.15,
    cabin: Math.PI * 0.55,
    cave: Math.PI * 1.15,
    lake: -Math.PI * 0.9,
    waterfall: -Math.PI * 0.88,
  };

  // Trees scattered around forest band
  const trees = useMemo(() => {
    const n = isMobile ? 26 : 38;
    const arr: { pos: THREE.Vector3; scale: number }[] = [];
    for (let i = 0; i < n; i++) {
      const a = ANG.forest + (Math.random() - 0.5) * 1.2;
      const t = 0.18 + Math.random() * 0.22;
      const p = field.surfacePoint(a, t);
      arr.push({ pos: p, scale: 0.5 + Math.random() * 0.6 });
    }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, field]);

  // Procedural waterfall texture
  const fallTexture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 64; c.height = 256;
    const ctx = c.getContext("2d")!;
    const g = ctx.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0, "rgba(220,235,255,0.0)");
    g.addColorStop(0.5, "rgba(220,235,255,0.7)");
    g.addColorStop(1, "rgba(220,235,255,0.2)");
    ctx.fillStyle = g; ctx.fillRect(0, 0, 64, 256);
    for (let i = 0; i < 80; i++) {
      ctx.fillStyle = `rgba(255,255,255,${0.05 + Math.random() * 0.25})`;
      ctx.fillRect(Math.random() * 64, Math.random() * 256, 1 + Math.random() * 2, 8 + Math.random() * 24);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, []);

  // Splash particles geometry
  const lakePos = useMemo(() => field.surfacePoint(ANG.lake, 0.04), [field, ANG.lake]);
  const fallTop = useMemo(() => field.surfacePoint(ANG.waterfall, 0.35), [field, ANG.waterfall]);
  const splashGeom = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = lakePos.x + (Math.random() - 0.5) * 2.5;
      positions[i * 3 + 1] = lakePos.y + Math.random() * 1.2;
      positions[i * 3 + 2] = lakePos.z + (Math.random() - 0.5) * 2.5;
    }
    const gg = new THREE.BufferGeometry();
    gg.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return gg;
  }, [lakePos]);

  useFrame((_, dt) => {
    if (fallMatRef.current && fallMatRef.current.map) {
      fallMatRef.current.map.offset.y -= dt * 1.2;
    }
    if (splashRef.current) {
      const pos = splashRef.current.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) {
        let y = pos.getY(i) - dt * 1.4;
        if (y < lakePos.y) y = lakePos.y + 1.2 + Math.random() * 0.5;
        pos.setY(i, y);
      }
      pos.needsUpdate = true;
    }
  });

  // Helpers
  const placeOnSurface = (angle: number, t: number) => field.surfacePoint(angle, t);

  const glacierP = placeOnSurface(ANG.glacier, 0.7);
  const crepP = placeOnSurface(ANG.crepaccio, 0.48);
  const baseP = placeOnSurface(ANG.base, 0.05);
  const cabinP = placeOnSurface(ANG.cabin, 0.32);
  const caveP = placeOnSurface(ANG.cave, 0.2);

  // Direction outward (radial) for facing props
  const outward = (p: THREE.Vector3) => Math.atan2(p.x, p.z);

  return (
    <group>
      {/* Glacier ice slab inside the slit */}
      <mesh position={glacierP} rotation={[0, outward(glacierP), 0]}>
        <boxGeometry args={[0.4, 2.6, 1.2]} />
        <meshStandardMaterial color="#cfe7ff" emissive="#5fa8d9" emissiveIntensity={0.25} roughness={0.25} metalness={0.1} />
      </mesh>

      {/* Crepaccio: dark deep box with red glow at bottom */}
      <group position={crepP} rotation={[0, outward(crepP), 0]}>
        <mesh>
          <boxGeometry args={[0.35, 2.2, 1.0]} />
          <meshStandardMaterial color="#05060a" roughness={1} />
        </mesh>
        <pointLight position={[0, -0.9, 0]} intensity={2.4} distance={4} color="#ff3a2e" />
        <mesh position={[0, -1.0, 0]}>
          <sphereGeometry args={[0.25, 12, 12]} />
          <meshStandardMaterial color="#000" emissive="#ff2a1c" emissiveIntensity={2.2} />
        </mesh>
      </group>

      {/* Forest */}
      {trees.map((t, i) => (
        <mesh key={i} position={t.pos} scale={[t.scale, t.scale * 2.2, t.scale]}>
          <coneGeometry args={[0.35, 1.2, 6]} />
          <meshStandardMaterial color="#13261a" roughness={1} />
        </mesh>
      ))}

      {/* Base camp tent + flag */}
      <group position={baseP} rotation={[0, outward(baseP), 0]}>
        <mesh position={[0, 0.3, 0]}>
          <coneGeometry args={[0.55, 0.7, 4]} />
          <meshStandardMaterial color="#c54a2e" roughness={0.85} />
        </mesh>
        <mesh position={[0.6, 0.6, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1.2]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        <mesh position={[0.78, 1.0, 0]}>
          <planeGeometry args={[0.32, 0.2]} />
          <meshStandardMaterial color="#e11d2a" side={THREE.DoubleSide} emissive="#e11d2a" emissiveIntensity={0.2} />
        </mesh>
      </group>

      {/* Cabin */}
      <group position={cabinP} rotation={[0, outward(cabinP), 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.4, 0.8, 1.1]} />
          <meshStandardMaterial color="#3a2418" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.7, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[1.05, 0.7, 4]} />
          <meshStandardMaterial color="#1a1410" roughness={0.95} />
        </mesh>
        {/* warm window */}
        <mesh position={[0, 0.0, 0.56]}>
          <planeGeometry args={[0.35, 0.28]} />
          <meshStandardMaterial color="#ffba63" emissive="#ffa040" emissiveIntensity={2.4} />
        </mesh>
        <pointLight position={[0, 0.2, 1.2]} intensity={2.2} distance={5} color="#ffb259" />
      </group>

      {/* Ice cave arch */}
      <group position={caveP} rotation={[0, outward(caveP), 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.9, 0.18, 16, 28, Math.PI]} />
          <meshStandardMaterial color="#0a1822" emissive="#3aa8ff" emissiveIntensity={0.55} roughness={0.55} />
        </mesh>
        <mesh position={[0, 0, -0.05]}>
          <circleGeometry args={[0.8, 24]} />
          <meshBasicMaterial color="#03070b" />
        </mesh>
        <pointLight intensity={1.6} distance={4} color="#5ec8ff" />
      </group>

      {/* Lake (flat ellipse) */}
      <mesh position={[lakePos.x, lakePos.y - 0.05, lakePos.z]} rotation={[-Math.PI / 2, 0, 0]} scale={[1.6, 1, 1]}>
        <circleGeometry args={[2.2, 48]} />
        <meshStandardMaterial color="#0a1626" roughness={0.05} metalness={0.6} envMapIntensity={1.6} />
      </mesh>

      {/* Waterfall plane */}
      <mesh position={[(fallTop.x + lakePos.x) / 2, (fallTop.y + lakePos.y) / 2, (fallTop.z + lakePos.z) / 2]}
        rotation={[0, outward(fallTop), 0]}>
        <planeGeometry args={[0.8, Math.max(0.5, fallTop.y - lakePos.y)]} />
        <meshBasicMaterial ref={fallMatRef} map={fallTexture} transparent depthWrite={false} />
      </mesh>

      {/* Splash particles at lake */}
      <points ref={splashRef} geometry={splashGeom}>
        <pointsMaterial color="#dceaff" size={0.06} transparent opacity={0.7} depthWrite={false} />
      </points>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Camera: spiral around mountain driven by drei useScroll
// ---------------------------------------------------------------------------
function CameraRig({ reduced }: { reduced: boolean }) {
  const data = useScroll();
  const frozen = useRef<number | null>(null);
  useFrame(({ camera }) => {
    let t = data.offset;
    if (reduced) {
      if (frozen.current === null) frozen.current = t;
      t = frozen.current;
    }
    t = THREE.MathUtils.clamp(t, 0, 1);
    const turns = 2.5;                  // 2-3 full turns
    const angle = t * Math.PI * 2 * turns;
    const radius = THREE.MathUtils.lerp(18, 6, t);
    const y = THREE.MathUtils.lerp(MOUNTAIN_HEIGHT - 4, -2, t);
    camera.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
    const lookY = THREE.MathUtils.lerp(MOUNTAIN_HEIGHT * 0.95, 0.5, t) + 1.5;
    camera.lookAt(0, lookY, 0);
  });
  return null;
}

// ---------------------------------------------------------------------------
// Public component
// ---------------------------------------------------------------------------
export function MountainBackdrop({ children }: { children?: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [reduced, setReduced] = useState(false);
  const field = useMemo(() => makeMountainField(), []);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="fixed inset-0 bg-background">
      <Canvas
        shadows={!isMobile}
        dpr={[1, isMobile ? 1.5 : 2]}
        camera={{ position: [0, 12, 18], fov: 55, near: 0.1, far: 200 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#07080c"]} />
        <fog attach="fog" args={["#07080c", 22, 90]} />
        <ambientLight intensity={0.12} />
        <directionalLight position={[10, 14, -8]} intensity={0.35} color="#ff8a4a" castShadow={!isMobile} />
        <Suspense fallback={null}>
          <Environment preset="sunset" background={false} />
          <ScrollControls pages={PAGES} damping={0.18}>
            <Mountain isMobile={isMobile} field={field} />
            <CameraRig reduced={reduced} />
            <Scroll html style={{ width: "100%" }}>
              {children}
            </Scroll>
          </ScrollControls>
        </Suspense>
        <EffectComposer>
          <DepthOfField focusDistance={0.012} focalLength={0.06} bokehScale={isMobile ? 1.2 : 2.6} />
          <Bloom intensity={0.45} luminanceThreshold={0.55} mipmapBlur />
          <Vignette eskil={false} offset={0.3} darkness={0.6} />
          <Noise opacity={0.02} />
        </EffectComposer>
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/70" />
    </div>
  );
}

export default MountainBackdrop;

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