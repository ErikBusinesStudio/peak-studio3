/** Alpine atmosphere — off-white paper with drifting mountain line-art */
const Atmosphere = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {/* Ice-blue diffuse light from the top-right */}
      <div
        className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full opacity-40 blur-[160px]"
        style={{ background: "radial-gradient(circle, hsl(199 89% 82%) 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-[30%] -left-[10%] w-[60vw] h-[60vw] rounded-full opacity-30 blur-[180px]"
        style={{ background: "radial-gradient(circle, hsl(217 91% 88%) 0%, transparent 70%)" }}
      />

      {/* Distant mountain silhouette (thin line art, Kokou no Hito style) */}
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 w-full h-full opacity-[0.12]"
      >
        <path
          d="M0 750 L180 480 L320 610 L520 300 L720 520 L900 200 L1120 480 L1300 340 L1600 620 L1600 900 L0 900 Z"
          fill="none"
          stroke="hsl(215 30% 25%)"
          strokeWidth="1"
        />
        <path
          d="M0 800 L220 560 L400 680 L620 400 L820 580 L1040 320 L1240 540 L1450 420 L1600 700"
          fill="none"
          stroke="hsl(215 30% 25%)"
          strokeWidth="0.6"
          strokeDasharray="4 6"
        />
        <path
          d="M0 860 L260 700 L520 780 L820 640 L1120 720 L1400 660 L1600 780"
          fill="none"
          stroke="hsl(199 60% 40%)"
          strokeWidth="0.5"
        />
      </svg>

      {/* Very subtle paper grain */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] mix-blend-multiply" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
};

export default Atmosphere;
