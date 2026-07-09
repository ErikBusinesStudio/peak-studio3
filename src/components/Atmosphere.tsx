/** Alpine atmosphere — aerial mountain backdrop, animated blue accents */
import heroBg from "@/assets/hero-mountains-bg.png.asset.json";
import mountainBand from "@/assets/mountain-silhouette-band.jpg";
const Atmosphere = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {/* Aerial snowy mountain range backdrop */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `url(${heroBg.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          filter: "saturate(1.2) contrast(1.1)",
        }}
      />
      {/* Very light blue-tinted wash — keeps image visible, no white haze */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(212 90% 55% / 0.08) 0%, transparent 40%, hsl(212 60% 92% / 0.18) 100%)",
        }}
      />
      {/* Silhouette band across the middle */}
      <div
        className="absolute left-0 right-0 top-[45%] h-[45vh] opacity-[0.28] mix-blend-multiply"
        style={{
          backgroundImage: `url(${mountainBand})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          maskImage: "linear-gradient(180deg, transparent 0%, black 45%, black 85%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 45%, black 85%, transparent 100%)",
        }}
      />
      {/* Animated blue blobs */}
      <div
        className="absolute -top-[20%] -left-[10%] w-[55vw] h-[55vw] rounded-full opacity-60 blur-[140px] animate-blob"
        style={{ background: "radial-gradient(circle, #6cbcff 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full opacity-50 blur-[160px] animate-blob-2"
        style={{ background: "radial-gradient(circle, #b8dcff 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-[40%] left-[40%] w-[35vw] h-[35vw] rounded-full opacity-30 blur-[120px] animate-blob"
        style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)", animationDelay: "-6s" }}
      />
      <div
        className="absolute top-[10%] right-[15%] w-[28vw] h-[28vw] rounded-full opacity-40 blur-[100px] animate-drift-slow"
        style={{ background: "radial-gradient(circle, #3d8ce8 0%, transparent 70%)" }}
      />

      {/* Floating light particles */}
      {Array.from({ length: 22 }).map((_, i) => {
        const left = (i * 53) % 100;
        const size = 2 + ((i * 7) % 5);
        const dur = 14 + ((i * 3) % 18);
        const delay = -(i * 1.7);
        return (
          <span
            key={i}
            className="absolute rounded-full bg-white/70 animate-particle"
            style={{
              left: `${left}%`,
              bottom: `-10px`,
              width: `${size}px`,
              height: `${size}px`,
              boxShadow: "0 0 8px rgba(180,220,255,0.85)",
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
