import { Mountain } from "lucide-react";

interface SectionMarkerProps {
  numeral: string;
  title: string;
  shape?: "peak" | "forest" | "waterfall" | "lake" | "trail" | "bridge" | "camp" | "cabin";
}

const Shape = ({ kind }: { kind: SectionMarkerProps["shape"] }) => {
  const common = "w-full h-12 md:h-16 text-foreground/20";
  switch (kind) {
    case "peak":
      return (
        <svg viewBox="0 0 400 60" className={common} preserveAspectRatio="none">
          <path d="M0 60 L120 10 L200 30 L300 5 L400 60 Z" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      );
    case "forest":
      return (
        <svg viewBox="0 0 400 60" className={common} preserveAspectRatio="none">
          {Array.from({ length: 14 }).map((_, i) => (
            <path key={i} d={`M${i * 30 + 10} 55 L${i * 30 + 20} 15 L${i * 30 + 30} 55 Z`} fill="none" stroke="currentColor" strokeWidth="1" />
          ))}
        </svg>
      );
    case "waterfall":
      return (
        <svg viewBox="0 0 400 60" className={common} preserveAspectRatio="none">
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={i} x1={i * 20 + 10} y1="0" x2={i * 20 + 4} y2="60" stroke="currentColor" strokeWidth="0.6" opacity={0.4 + (i % 3) * 0.2} />
          ))}
        </svg>
      );
    case "lake":
      return (
        <svg viewBox="0 0 400 60" className={common} preserveAspectRatio="none">
          <path d="M0 30 Q100 18 200 30 T400 30" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M0 42 Q100 30 200 42 T400 42" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
        </svg>
      );
    case "trail":
      return (
        <svg viewBox="0 0 400 60" className={common} preserveAspectRatio="none">
          <path d="M0 50 Q80 0 160 30 T320 30 T400 10" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
      );
    case "bridge":
      return (
        <svg viewBox="0 0 400 60" className={common} preserveAspectRatio="none">
          <path d="M20 40 Q200 -10 380 40" fill="none" stroke="currentColor" strokeWidth="1" />
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={i} x1={40 + i * 40} y1="40" x2={40 + i * 40} y2="55" stroke="currentColor" strokeWidth="0.6" />
          ))}
          <line x1="0" y1="55" x2="400" y2="55" stroke="currentColor" strokeWidth="1" />
        </svg>
      );
    case "camp":
      return (
        <svg viewBox="0 0 400 60" className={common} preserveAspectRatio="none">
          {Array.from({ length: 5 }).map((_, i) => (
            <path key={i} d={`M${i * 80 + 30} 55 L${i * 80 + 60} 15 L${i * 80 + 90} 55 Z`} fill="none" stroke="currentColor" strokeWidth="1" />
          ))}
        </svg>
      );
    case "cabin":
      return (
        <svg viewBox="0 0 400 60" className={common} preserveAspectRatio="none">
          <path d="M170 50 L200 15 L230 50 Z M180 50 L180 35 L220 35 L220 50" fill="none" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="55" x2="170" y2="55" stroke="currentColor" strokeWidth="0.6" />
          <line x1="230" y1="55" x2="400" y2="55" stroke="currentColor" strokeWidth="0.6" />
        </svg>
      );
    default:
      return null;
  }
};

const SectionMarker = ({ numeral, title, shape = "peak" }: SectionMarkerProps) => {
  return (
    <div className="relative z-10 container mx-auto px-4 pt-16 md:pt-24 pb-2">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.5em] text-[hsl(var(--accent-red))]">{numeral}</span>
        <div className="h-px flex-1 bg-gradient-to-r from-[hsl(var(--accent-red))]/40 via-foreground/10 to-transparent" />
        <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-foreground/60">{title}</span>
      </div>
      <Shape kind={shape} />
    </div>
  );
};

export default SectionMarker;