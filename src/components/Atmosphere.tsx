/** Alpine atmosphere — mountain backdrop, blue blobs, silhouette band */
import sceneForest from "@/assets/scene-forest.jpg";
import mountainBand from "@/assets/mountain-silhouette-band.jpg";
const Atmosphere = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {/* Snowy mountain backdrop, very faded */}
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: `url(${sceneForest})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          filter: "saturate(0.9) contrast(1.02)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(210 40% 99% / 0.80) 0%, hsl(210 60% 96% / 0.72) 50%, hsl(210 40% 99% / 0.92) 100%)",
        }}
      />
      {/* Silhouette band across the middle */}
      <div
        className="absolute left-0 right-0 top-[40%] h-[50vh] opacity-[0.35] mix-blend-multiply"
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
        className="absolute -top-[20%] -left-[10%] w-[55vw] h-[55vw] rounded-full opacity-50 blur-[140px] animate-blob"
        style={{ background: "radial-gradient(circle, #6cbcff 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full opacity-40 blur-[160px] animate-blob-2"
        style={{ background: "radial-gradient(circle, #b8dcff 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-[40%] left-[40%] w-[35vw] h-[35vw] rounded-full opacity-25 blur-[120px] animate-blob"
        style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)", animationDelay: "-6s" }}
      />

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
