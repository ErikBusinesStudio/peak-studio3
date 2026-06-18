import { Trees, Droplets, Footprints, GitBranch, Tent, Home, Mountain, Snowflake } from "lucide-react";

interface SectionMarkerProps {
  numeral: string;
  title: string;
  shape?: "peak" | "forest" | "waterfall" | "lake" | "trail" | "bridge" | "camp" | "cabin";
  altitude?: string;
  weather?: string;
}

const stageMeta: Record<NonNullable<SectionMarkerProps["shape"]>, { icon: any; tint: string; bgGradient: string }> = {
  peak:      { icon: Mountain,   tint: "hsl(210 90% 75%)", bgGradient: "from-[hsl(220_40%_8%)] via-[hsl(220_30%_10%)] to-transparent" },
  forest:    { icon: Trees,      tint: "hsl(150 55% 55%)", bgGradient: "from-[hsl(150_30%_8%)] via-[hsl(150_20%_9%)] to-transparent" },
  waterfall: { icon: Droplets,   tint: "hsl(195 80% 65%)", bgGradient: "from-[hsl(195_40%_8%)] via-[hsl(200_25%_9%)] to-transparent" },
  trail:     { icon: Footprints, tint: "hsl(35 70% 60%)",  bgGradient: "from-[hsl(35_30%_8%)] via-[hsl(30_20%_9%)] to-transparent" },
  bridge:    { icon: GitBranch,  tint: "hsl(20 75% 60%)",  bgGradient: "from-[hsl(20_30%_8%)] via-[hsl(20_20%_9%)] to-transparent" },
  camp:      { icon: Tent,       tint: "hsl(15 85% 60%)",  bgGradient: "from-[hsl(15_35%_8%)] via-[hsl(15_25%_9%)] to-transparent" },
  cabin:     { icon: Home,       tint: "hsl(40 80% 60%)",  bgGradient: "from-[hsl(40_30%_8%)] via-[hsl(40_20%_9%)] to-transparent" },
  lake:      { icon: Snowflake,  tint: "hsl(200 70% 70%)", bgGradient: "from-[hsl(200_30%_8%)] via-[hsl(200_20%_9%)] to-transparent" },
};

const Shape = ({ kind }: { kind: SectionMarkerProps["shape"] }) => {
  const common = "w-full h-28 md:h-44";
  switch (kind) {
    case "peak":
      return (
        <svg viewBox="0 0 400 160" className={common} preserveAspectRatio="none">
          <defs>
            <linearGradient id="peakFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="hsl(210 90% 75%)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="hsl(210 90% 75%)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 160 L80 70 L140 100 L220 30 L290 80 L360 50 L400 90 L400 160 Z" fill="url(#peakFill)" />
          <path d="M0 160 L80 70 L140 100 L220 30 L290 80 L360 50 L400 90" fill="none" stroke="hsl(210 90% 80%)" strokeWidth="1.4" />
          <path d="M200 50 L220 30 L240 55 L235 60 L220 48 L210 60 Z" fill="hsl(0 0% 100% / 0.7)" />
        </svg>
      );
    case "forest":
      return (
        <svg viewBox="0 0 400 160" className={common} preserveAspectRatio="none">
          <defs>
            <linearGradient id="forestFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="hsl(150 55% 50%)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="hsl(150 55% 30%)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {Array.from({ length: 22 }).map((_, i) => {
            const x = i * 19 + 6;
            const h = 60 + ((i * 37) % 50);
            return (
              <g key={i}>
                <path d={`M${x} 150 L${x + 12} ${150 - h} L${x + 24} 150 Z`} fill="url(#forestFill)" stroke="hsl(150 55% 60%)" strokeWidth="0.8" />
                <line x1={x + 12} y1="150" x2={x + 12} y2={155} stroke="hsl(30 30% 25%)" strokeWidth="1" />
              </g>
            );
          })}
          <line x1="0" y1="152" x2="400" y2="152" stroke="hsl(150 30% 40% / 0.4)" strokeWidth="1" />
        </svg>
      );
    case "waterfall":
      return (
        <svg viewBox="0 0 400 160" className={common} preserveAspectRatio="none">
          <defs>
            <linearGradient id="waterFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="hsl(195 90% 80%)" stopOpacity="0.7" />
              <stop offset="100%" stopColor="hsl(210 80% 50%)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 0 L0 40 L130 40 L150 60 L150 120 L250 120 L270 140 L270 160 L0 160 Z" fill="hsl(220 30% 10%)" stroke="hsl(195 40% 50%)" strokeWidth="1" />
          <rect x="150" y="40" width="100" height="80" fill="url(#waterFill)" />
          <rect x="270" y="120" width="130" height="40" fill="url(#waterFill)" />
          {Array.from({ length: 30 }).map((_, i) => (
            <line key={i} x1={155 + i * 3} y1="40" x2={152 + i * 3} y2="120" stroke="hsl(195 95% 90%)" strokeWidth="0.5" opacity={0.3 + (i % 4) * 0.15} />
          ))}
          {Array.from({ length: 40 }).map((_, i) => (
            <line key={i} x1={273 + i * 3} y1="120" x2={270 + i * 3} y2="160" stroke="hsl(195 95% 90%)" strokeWidth="0.5" opacity={0.3 + (i % 4) * 0.15} />
          ))}
        </svg>
      );
    case "lake":
      return (
        <svg viewBox="0 0 400 160" className={common} preserveAspectRatio="none">
          <path d="M0 80 Q100 60 200 80 T400 80 L400 160 L0 160 Z" fill="hsl(200 50% 25% / 0.5)" />
          <path d="M0 80 Q100 60 200 80 T400 80" fill="none" stroke="hsl(200 80% 75%)" strokeWidth="1.4" />
        </svg>
      );
    case "trail":
      return (
        <svg viewBox="0 0 400 160" className={common} preserveAspectRatio="none">
          <defs>
            <linearGradient id="trailGround" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="hsl(35 40% 25%)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(35 40% 15%)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 160 L0 110 Q120 60 220 90 T400 60 L400 160 Z" fill="url(#trailGround)" />
          <path d="M0 130 Q90 80 200 110 T400 80" fill="none" stroke="hsl(35 70% 65%)" strokeWidth="2.4" strokeDasharray="10 8" strokeLinecap="round" />
          {[60, 140, 220, 310, 370].map((x, i) => (
            <g key={i}>
              <circle cx={x} cy={[120,100,108,95,80][i]} r="3" fill="hsl(35 70% 60%)" />
            </g>
          ))}
        </svg>
      );
    case "bridge":
      return (
        <svg viewBox="0 0 400 160" className={common} preserveAspectRatio="none">
          <path d="M0 160 L0 120 L60 120 L60 160 Z" fill="hsl(220 30% 10%)" stroke="hsl(20 60% 45%)" strokeWidth="1" />
          <path d="M340 160 L340 120 L400 120 L400 160 Z" fill="hsl(220 30% 10%)" stroke="hsl(20 60% 45%)" strokeWidth="1" />
          <path d="M60 110 Q200 30 340 110" fill="none" stroke="hsl(20 75% 65%)" strokeWidth="2" />
          <path d="M60 120 L340 120" stroke="hsl(20 75% 65%)" strokeWidth="2" />
          {Array.from({ length: 14 }).map((_, i) => {
            const x = 60 + (i + 1) * (280 / 15);
            const t = (i + 1) / 15;
            const y = 110 + Math.sin(Math.PI * t) * -80;
            return <line key={i} x1={x} y1={y} x2={x} y2="120" stroke="hsl(20 60% 55%)" strokeWidth="1" />;
          })}
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={i} x1={60 + i * 14} y1="120" x2={60 + i * 14} y2="128" stroke="hsl(20 50% 40%)" strokeWidth="1" />
          ))}
        </svg>
      );
    case "camp":
      return (
        <svg viewBox="0 0 400 160" className={common} preserveAspectRatio="none">
          <line x1="0" y1="145" x2="400" y2="145" stroke="hsl(15 40% 35%)" strokeWidth="1" />
          {[60, 200, 340].map((cx, i) => (
            <g key={i}>
              <path d={`M${cx - 35} 145 L${cx} 75 L${cx + 35} 145 Z`} fill="hsl(15 60% 25% / 0.6)" stroke="hsl(15 85% 65%)" strokeWidth="1.4" />
              <line x1={cx} y1="75" x2={cx} y2="55" stroke="hsl(15 85% 65%)" strokeWidth="1" />
              <circle cx={cx} cy="55" r="2" fill="hsl(15 90% 70%)" />
            </g>
          ))}
          <g>
            <circle cx="130" cy="135" r="10" fill="hsl(20 95% 60% / 0.5)" />
            <path d="M124 140 L130 120 L136 140 Z" fill="hsl(40 95% 65%)" />
            <path d="M127 140 L130 128 L133 140 Z" fill="hsl(15 95% 55%)" />
          </g>
          {Array.from({ length: 25 }).map((_, i) => (
            <circle key={i} cx={(i * 53) % 400} cy={(i * 31) % 40 + 5} r="0.9" fill="hsl(50 90% 85%)" opacity={0.4 + (i % 3) * 0.2} />
          ))}
        </svg>
      );
    case "cabin":
      return (
        <svg viewBox="0 0 400 160" className={common} preserveAspectRatio="none">
          <line x1="0" y1="148" x2="400" y2="148" stroke="hsl(40 30% 30%)" strokeWidth="1" />
          <g>
            <path d="M150 148 L150 90 L200 50 L250 90 L250 148 Z" fill="hsl(40 40% 14%)" stroke="hsl(40 80% 65%)" strokeWidth="1.6" />
            <path d="M140 92 L200 45 L260 92" fill="none" stroke="hsl(40 80% 70%)" strokeWidth="2" />
            <rect x="185" y="110" width="30" height="38" fill="hsl(45 95% 60% / 0.85)" stroke="hsl(40 80% 65%)" strokeWidth="1" />
            <line x1="200" y1="110" x2="200" y2="148" stroke="hsl(40 40% 14%)" strokeWidth="1" />
            <line x1="185" y1="129" x2="215" y2="129" stroke="hsl(40 40% 14%)" strokeWidth="1" />
            <rect x="160" y="100" width="14" height="14" fill="hsl(45 95% 60% / 0.7)" />
            <rect x="226" y="100" width="14" height="14" fill="hsl(45 95% 60% / 0.7)" />
            <rect x="195" y="20" width="6" height="35" fill="hsl(40 40% 20%)" />
            <path d="M193 22 Q198 10 203 22 Q200 14 197 22 Z" fill="hsl(220 10% 40% / 0.6)" />
          </g>
          {[40, 90, 320, 360].map((x, i) => (
            <path key={i} d={`M${x} 148 L${x + 8} 110 L${x + 16} 148 Z`} fill="none" stroke="hsl(150 40% 50%)" strokeWidth="1" />
          ))}
        </svg>
      );
    default:
      return null;
  }
};

const SectionMarker = ({ numeral, title, shape = "peak", altitude, weather }: SectionMarkerProps) => {
  const meta = stageMeta[shape];
  const Icon = meta.icon;
  return (
    <div className="relative z-10 w-full">
      {/* Ambient gradient band */}
      <div className={`absolute inset-x-0 top-0 h-full bg-gradient-to-b ${meta.bgGradient} pointer-events-none`} />

      <div className="relative container mx-auto px-4 pt-16 md:pt-28 pb-4 md:pb-8">
        {/* Stage badge — large, marked */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-6">
          <div className="flex items-center gap-4">
            <div
              className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center border shrink-0"
              style={{
                background: `linear-gradient(135deg, ${meta.tint}22, transparent)`,
                borderColor: `${meta.tint}55`,
                boxShadow: `0 0 40px -10px ${meta.tint}66, inset 0 1px 0 ${meta.tint}33`,
              }}
            >
              <Icon className="w-7 h-7 md:w-9 md:h-9" style={{ color: meta.tint }} />
              <span
                className="absolute -top-2 -right-2 text-[10px] md:text-xs font-mono font-bold px-2 py-0.5 rounded-md"
                style={{ background: "hsl(var(--accent-red))", color: "white" }}
              >
                {numeral}
              </span>
            </div>
            <div>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-foreground/50 mb-1">
                Chapter {numeral} · You are here
              </p>
              <h3 className="text-xl md:text-3xl font-black tracking-tight" style={{ color: meta.tint }}>
                {title}
              </h3>
            </div>
          </div>

          {/* Altitude + weather chips */}
          <div className="flex items-center gap-2 md:gap-3 font-mono text-[10px] md:text-xs">
            {altitude && (
              <span className="px-3 py-1.5 rounded-full border border-foreground/15 bg-foreground/5 text-foreground/70">
                ↑ {altitude}
              </span>
            )}
            {weather && (
              <span
                className="px-3 py-1.5 rounded-full border"
                style={{ borderColor: `${meta.tint}40`, color: meta.tint, background: `${meta.tint}10` }}
              >
                {weather}
              </span>
            )}
          </div>
        </div>

        {/* Marker line with dot */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2 h-2 rounded-full" style={{ background: meta.tint, boxShadow: `0 0 12px ${meta.tint}` }} />
          <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${meta.tint}88, transparent)` }} />
          <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.4em] text-foreground/40">
            stage {numeral}/VII
          </span>
        </div>

        {/* Illustrated scene */}
        <div className="relative rounded-xl overflow-hidden border border-foreground/5" style={{ background: `radial-gradient(120% 100% at 50% 0%, ${meta.tint}10, transparent 60%)` }}>
          <Shape kind={shape} />
        </div>
      </div>
    </div>
  );
};

export default SectionMarker;