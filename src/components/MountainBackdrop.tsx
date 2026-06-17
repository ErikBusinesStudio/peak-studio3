import { Canvas, useFrame } from "@react-three/fiber";
import { ReactNode, useEffect, useMemo, useRef, useState, Suspense, type MutableRefObject } from "react";
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";
import { Environment, ScrollControls, Scroll, useContextBridge, useScroll, useTexture } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField, Vignette, Noise } from "@react-three/postprocessing";
import { UNSAFE_LocationContext, UNSAFE_NavigationContext, UNSAFE_RouteContext } from "react-router-dom";
import { I18nContext } from "@/contexts/I18nContext";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [reduced, setReduced] = useState(false);
  const field = useMemo(() => makeMountainField(), []);
  const ContextBridge = useContextBridge(
    I18nContext,
    UNSAFE_NavigationContext,
    UNSAFE_LocationContext,
    UNSAFE_RouteContext,
  );

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 bg-background">
      <Canvas
        shadows={!isMobile}
        dpr={[1, isMobile ? 1.5 : 2]}
        camera={{ position: [0, 12, 18], fov: 55, near: 0.1, far: 200 }}
        eventSource={containerRef as MutableRefObject<HTMLElement>}
        eventPrefix="client"
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#07080c"]} />
        <fog attach="fog" args={["#07080c", 22, 90]} />
        <ambientLight intensity={0.12} />
        <directionalLight position={[10, 14, -8]} intensity={0.35} color="#ff8a4a" castShadow={!isMobile} />
        <Suspense fallback={null}>
          <Environment preset="sunset" background={false} />
          <ScrollControls
            pages={PAGES}
            damping={0.18}
            style={{ touchAction: "pan-y", overscrollBehavior: "contain", WebkitOverflowScrolling: "touch" }}
          >
            <Mountain isMobile={isMobile} field={field} />
            <CameraRig reduced={reduced} />
            <Scroll html style={{ width: "100%", zIndex: 10 }}>
              <ContextBridge>{children}</ContextBridge>
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
