import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect, useState, Suspense } from "react";
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";
import { Environment, useTexture } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField, Vignette, Noise } from "@react-three/postprocessing";

function useProceduralMountain(segments: number, heightSegments: number) {
  return useMemo(() => {
    const noise2D = createNoise2D();
    const geometry = new THREE.ConeGeometry(12, 9, segments, heightSegments, true);
    const pos = geometry.attributes.position;
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
    }
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    return geometry;
  }, [segments, heightSegments]);
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
  const geometry = useProceduralMountain(isMobile ? 48 : 96, isMobile ? 20 : 40);
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
    // inject snow textures + height-based mix
    (mat as any).onBeforeCompile = (shader: any) => {
      shader.uniforms.snowMap = { value: snow[0] };
      shader.uniforms.snowNormal = { value: snow[1] };
      shader.uniforms.snowRough = { value: snow[2] };
      shader.uniforms.minY = { value: -4.5 };
      shader.uniforms.maxY = { value: 4.5 };

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
          vec2 uvR = vMountUv * 4.0;
          vec4 rockTex = texture2D( map, uvR );
          vec4 snowTex = texture2D( snowMap, uvR );
          float h = clamp((vHeight - minY) / (maxY - minY), 0.0, 1.0);
          float mixT = smoothstep(0.55, 0.85, h);
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
          vec4 rRock = texture2D( roughnessMap, vMountUv * 4.0 );
          vec4 rSnow = texture2D( snowRough, vMountUv * 4.0 );
          float hR = clamp((vHeight - minY) / (maxY - minY), 0.0, 1.0);
          float mixR = smoothstep(0.55, 0.85, hR);
          roughnessFactor *= mix(rRock.g, rSnow.g, mixR);
          `
        )
        .replace(
          "#include <normal_fragment_maps>",
          `
          vec3 nRock = texture2D( normalMap, vMountUv * 4.0 ).xyz * 2.0 - 1.0;
          vec3 nSnow = texture2D( snowNormal, vMountUv * 4.0 ).xyz * 2.0 - 1.0;
          float hN = clamp((vHeight - minY) / (maxY - minY), 0.0, 1.0);
          float mixN = smoothstep(0.55, 0.85, hN);
          vec3 mapN = normalize(mix(nRock, nSnow, mixN));
          mapN.xy *= normalScale;
          normal = normalize( tbn * mapN );
          `
        );
    };
    return mat;
  }, [snow, rock]);

  return (
    <mesh geometry={geometry} material={material} castShadow={!isMobile} receiveShadow={!isMobile} />
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
        <Suspense fallback={null}>
          <Environment preset="sunset" background={false} />
          <Mountain isMobile={isMobile} />
        </Suspense>
        <ambientLight intensity={0.08} />
        <directionalLight position={[8, 5, -6]} intensity={0.25} color="#ff5a3a" />
        <CameraRig progress={progress} reduced={reduced} />
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