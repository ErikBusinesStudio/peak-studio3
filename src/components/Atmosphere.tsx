/** Wine-red atmosphere — mountain backdrop, blobs, grain */
import sceneForest from "@/assets/scene-forest.jpg";
const Atmosphere = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {/* Mountain backdrop, very faded */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `url(${sceneForest})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "saturate(0.4) contrast(1.1)",
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
