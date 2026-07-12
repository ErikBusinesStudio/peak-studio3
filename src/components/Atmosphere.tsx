/** Cinematic atmosphere — multi-layer parallax mountain backdrop, blobs, grain */
import { useEffect, useRef } from "react";
import sceneForest from "@/assets/scene-forest.jpg";
import cinematicSunrise from "@/assets/mountains/cinematic-sunrise.jpg";
import cinematicBluehour from "@/assets/mountains/cinematic-bluehour.jpg";

const Atmosphere = () => {
  const skyRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const nearRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (skyRef.current) skyRef.current.style.transform = `translate3d(0, ${y * 0.08}px, 0)`;
        if (midRef.current) midRef.current.style.transform = `translate3d(0, ${y * 0.22}px, 0)`;
        if (nearRef.current) nearRef.current.style.transform = `translate3d(0, ${y * 0.38}px, 0)`;
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {/* Parallax layer 1 — sky / distant range */}
      <div
        ref={skyRef}
        className="absolute -inset-[10%] opacity-[0.35] will-change-transform"
        style={{
          backgroundImage: `url(${cinematicBluehour})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          filter: "saturate(0.65) contrast(1.05) blur(1px)",
        }}
      />
      {/* Parallax layer 2 — mid mountains */}
      <div
        ref={midRef}
        className="absolute -inset-[10%] opacity-[0.28] will-change-transform"
        style={{
          backgroundImage: `url(${cinematicSunrise})`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          filter: "saturate(0.55) contrast(1.1)",
        }}
      />
      {/* Parallax layer 3 — foreground forest */}
      <div
        ref={nearRef}
        className="absolute -inset-[10%] opacity-[0.18] will-change-transform"
        style={{
          backgroundImage: `url(${sceneForest})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          filter: "saturate(0.4) contrast(1.15)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(0 0% 100% / 0.85) 0%, hsl(0 0% 100% / 0.78) 50%, hsl(0 0% 100% / 0.92) 100%)",
        }}
      />
      {/* Animated wine blobs */}
      <div
        className="absolute -top-[20%] -left-[10%] w-[55vw] h-[55vw] rounded-full opacity-50 blur-[140px] animate-blob"
        style={{ background: "radial-gradient(circle, #1e88e5 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full opacity-40 blur-[160px] animate-blob-2"
        style={{ background: "radial-gradient(circle, #0d47a1 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-[40%] left-[40%] w-[35vw] h-[35vw] rounded-full opacity-25 blur-[120px] animate-blob"
        style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)", animationDelay: "-6s" }}
      />

      {/* Animated blue grid */}
      <div
        className="absolute inset-0 opacity-[0.12] animate-drift-slow"
        style={{
          backgroundImage:
            "linear-gradient(hsl(205 90% 48% / 0.35) 1px, transparent 1px), linear-gradient(90deg, hsl(205 90% 48% / 0.35) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      {/* Floating blue particles */}
      {Array.from({ length: 18 }).map((_, i) => {
        const left = (i * 53) % 100;
        const size = 4 + (i % 5) * 3;
        const dur = 14 + (i % 7) * 3;
        const delay = -(i * 1.7);
        return (
          <span
            key={i}
            className="absolute rounded-full animate-particle"
            style={{
              left: `${left}%`,
              bottom: "-10vh",
              width: `${size}px`,
              height: `${size}px`,
              background: "radial-gradient(circle, #64b5f6 0%, transparent 70%)",
              boxShadow: "0 0 12px #64b5f6",
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
      {/* Subtle grain */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05] mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
};

export default Atmosphere;
