/** Paper grain + subtle structural rules — Paper & Ink editorial atmosphere */
const Atmosphere = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {/* paper grain */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] mix-blend-multiply" xmlns="http://www.w3.org/2000/svg">
        <filter id="paper-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#paper-noise)" />
      </svg>
      {/* warm paper vignette */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, hsl(40 25% 88% / 0.5) 100%)" }} />
    </div>
  );
};

export default Atmosphere;
