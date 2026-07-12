type Props = {
  variant?: "wave" | "cut" | "peaks";
  flip?: boolean;
  className?: string;
};

const SvgDivider = ({ variant = "wave", flip = false, className = "" }: Props) => {
  const paths: Record<string, string> = {
    wave:
      "M0,60 C240,110 480,10 720,45 C960,80 1200,120 1440,60 L1440,120 L0,120 Z",
    cut: "M0,120 L1440,0 L1440,120 Z",
    peaks:
      "M0,120 L120,60 L240,95 L380,30 L520,90 L680,20 L860,80 L1040,25 L1200,90 L1340,45 L1440,80 L1440,120 Z",
  };
  return (
    <div className={`relative w-full pointer-events-none select-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full h-[60px] md:h-[110px]"
        style={{ transform: flip ? "scaleY(-1)" : undefined, display: "block" }}
      >
        <defs>
          <linearGradient id={`grad-${variant}-${flip}`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="hsl(205 90% 42%)" stopOpacity="0.08" />
            <stop offset="50%" stopColor="hsl(205 90% 55%)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="hsl(205 90% 42%)" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <path d={paths[variant]} fill={`url(#grad-${variant}-${flip})`} />
        <path
          d={paths[variant]}
          fill="none"
          stroke="hsl(205 90% 48% / 0.35)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};

export default SvgDivider;