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
            "linear-gradient(180deg, hsl(210 40% 99% / 0.85) 0%, hsl(210 40% 99% / 0.78) 50%, hsl(210 40% 99% / 0.92) 100%)",
        }}
      />
      {/* Animated wine blobs */}
      <div
        className="absolute -top-[20%] -left-[10%] w-[55vw] h-[55vw] rounded-full opacity-50 blur-[140px] animate-blob"
        style={{ background: "radial-gradient(circle, #1e6bd6 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full opacity-40 blur-[160px] animate-blob-2"
        style={{ background: "radial-gradient(circle, #0b3a80 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-[40%] left-[40%] w-[35vw] h-[35vw] rounded-full opacity-25 blur-[120px] animate-blob"
        style={{ background: "radial-gradient(circle, #eaf2fb 0%, transparent 70%)", animationDelay: "-6s" }}
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
