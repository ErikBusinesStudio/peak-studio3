import { Trees, Droplets, Footprints, GitBranch, Tent, Home, Mountain, Snowflake, type LucideIcon } from "lucide-react";

interface SectionMarkerProps {
  numeral: string;
  title: string;
  shape?: "peak" | "forest" | "waterfall" | "lake" | "trail" | "bridge" | "camp" | "cabin";
  altitude?: string;
  weather?: string;
  /** position on the mountain 0 (base) → 100 (summit) */
  progress?: number;
}

type Meta = {
  icon: LucideIcon;
  tint: string;
  label: string;
  progress: number;
};

const stageMeta: Record<NonNullable<SectionMarkerProps["shape"]>, Meta> = {
  forest:    { icon: Trees,      tint: "hsl(150 60% 55%)", label: "Forest line",  progress: 18 },
  waterfall: { icon: Droplets,   tint: "hsl(195 85% 65%)", label: "Cascade",      progress: 32 },
  lake:      { icon: Snowflake,  tint: "hsl(200 70% 70%)", label: "Alpine lake",  progress: 38 },
  trail:     { icon: Footprints, tint: "hsl(40 90% 60%)",  label: "Switchback",   progress: 50 },
  bridge:    { icon: GitBranch,  tint: "hsl(22 90% 60%)",  label: "Ridge bridge", progress: 65 },
  camp:      { icon: Tent,       tint: "hsl(12 90% 62%)",  label: "Base camp",    progress: 80 },
  cabin:     { icon: Home,       tint: "hsl(38 95% 62%)",  label: "Refuge",       progress: 90 },
  peak:      { icon: Mountain,   tint: "hsl(210 95% 78%)", label: "Summit",       progress: 100 },
};

/** Stylized mountain silhouette with a moving waypoint at the given progress (0–100). */
const Altimeter = ({ tint, progress, Icon }: { tint: string; progress: number; Icon: LucideIcon }) => {
  // Map progress (0 base → 100 summit) onto svg path coordinates.
  // The trail rises from (12, 175) at base to (190, 30) at summit, with a kink at (95, 110).
  const baseX = 12, baseY = 175;
  const peakX = 190, peakY = 30;
  const midX = 95, midY = 110;
  const t = Math.max(0, Math.min(100, progress)) / 100;
  const x = t < 0.5 ? baseX + (midX - baseX) * (t / 0.5) : midX + (peakX - midX) * ((t - 0.5) / 0.5);
  const y = t < 0.5 ? baseY + (midY - baseY) * (t / 0.5) : midY + (peakY - midY) * ((t - 0.5) / 0.5);

  return (
    <svg viewBox="0 0 220 200" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id={`mtn-${tint}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={tint} stopOpacity="0.25" />
          <stop offset="100%" stopColor={tint} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`ridge-${tint}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(var(--foreground) / 0.4)" />
          <stop offset="100%" stopColor={tint} />
        </linearGradient>
      </defs>

      {/* far range */}
      <path
        d="M0 150 L40 120 L75 135 L115 95 L160 120 L200 100 L220 130 L220 200 L0 200 Z"
        fill="hsl(var(--foreground) / 0.04)"
        stroke="hsl(var(--foreground) / 0.08)"
        strokeWidth="0.5"
      />
      {/* main mountain */}
      <path
        d={`M0 190 L${baseX} ${baseY} L${midX} ${midY} L${peakX} ${peakY} L220 95 L220 200 L0 200 Z`}
        fill={`url(#mtn-${tint})`}
        stroke={`url(#ridge-${tint})`}
        strokeWidth="1.2"
      />
      {/* snow cap */}
      <path
        d={`M${midX - 18} ${midY + 8} L${midX} ${midY} L${peakX} ${peakY} L${peakX - 14} ${peakY + 18} L${midX + 22} ${midY + 28} Z`}
        fill={tint}
        opacity="0.18"
      />
      {/* trail (dashed) */}
      <path
        d={`M${baseX} ${baseY} L${midX} ${midY} L${peakX} ${peakY}`}
        fill="none"
        stroke={tint}
        strokeWidth="1.2"
        strokeDasharray="3 4"
        opacity="0.7"
      />
      {/* contour ticks */}
      {[170, 145, 120, 90, 60].map((cy, i) => (
        <line key={i} x1="200" y1={cy} x2="215" y2={cy} stroke={tint} strokeWidth="0.6" opacity={0.3 + i * 0.1} />
      ))}

      {/* waypoint pulse */}
      <circle cx={x} cy={y} r="9" fill={tint} opacity="0.18">
        <animate attributeName="r" values="7;13;7" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.05;0.3" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx={x} cy={y} r="4.5" fill={tint} stroke="hsl(var(--background))" strokeWidth="1.2" />
      {/* icon-as-foreignObject for crispness */}
      <foreignObject x={x - 8} y={y - 26} width="16" height="16">
        <Icon style={{ color: tint, width: 16, height: 16 }} />
      </foreignObject>
    </svg>
  );
};

const SectionMarker = ({ numeral, title, shape = "peak", altitude, weather, progress }: SectionMarkerProps) => {
  const meta = stageMeta[shape];
  const Icon = meta.icon;
  const pct = progress ?? meta.progress;

  return (
    <div className="relative z-10 w-full">
      <div className="container mx-auto px-4 pt-20 md:pt-28 pb-6 md:pb-10">
        {/* Stage band — bold, structural */}
        <div
          className="relative rounded-3xl border overflow-hidden"
          style={{
            borderColor: `${meta.tint}33`,
            background: `linear-gradient(135deg, ${meta.tint}10, transparent 55%), hsl(var(--background) / 0.5)`,
            boxShadow: `0 30px 80px -40px ${meta.tint}55, inset 0 1px 0 ${meta.tint}22`,
          }}
        >
          {/* grid texture */}
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(${meta.tint} 1px, transparent 1px), linear-gradient(90deg, ${meta.tint} 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
              maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            }}
          />

          <div className="relative grid md:grid-cols-[1fr_auto] gap-6 md:gap-10 p-6 md:p-10 items-center">
            {/* LEFT — chapter info */}
            <div className="flex items-start gap-5 md:gap-7">
              {/* Giant numeral */}
              <div className="relative shrink-0">
                <div
                  className="text-6xl md:text-8xl font-black font-mono leading-none tracking-tighter"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: `1.5px ${meta.tint}`,
                    textShadow: `0 0 40px ${meta.tint}55`,
                  }}
                >
                  {numeral}
                </div>
                <span
                  className="absolute -top-2 -right-3 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded"
                  style={{ background: "hsl(var(--accent-red))", color: "white" }}
                >
                  CH
                </span>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="inline-flex items-center justify-center w-7 h-7 rounded-md border"
                    style={{ borderColor: `${meta.tint}55`, background: `${meta.tint}15` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: meta.tint }} />
                  </span>
                  <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-foreground/50">
                    {meta.label} · You are here
                  </span>
                </div>
                <h3
                  className="text-2xl md:text-4xl font-black tracking-tight leading-[1.05] mb-3"
                  style={{ color: "hsl(var(--foreground))" }}
                >
                  {title.split("—")[0]}
                  {title.includes("—") && (
                    <span className="block md:inline" style={{ color: meta.tint }}>
                      {" — "}{title.split("—")[1].trim()}
                    </span>
                  )}
                </h3>

                {/* metadata strip */}
                <div className="flex flex-wrap items-center gap-2 md:gap-3 font-mono text-[10px] md:text-xs">
                  {altitude && (
                    <span className="px-2.5 py-1 rounded border border-foreground/15 bg-foreground/5 text-foreground/70">
                      ALT ↑ {altitude}
                    </span>
                  )}
                  {weather && (
                    <span
                      className="px-2.5 py-1 rounded border"
                      style={{ borderColor: `${meta.tint}55`, color: meta.tint, background: `${meta.tint}12` }}
                    >
                      {weather}
                    </span>
                  )}
                  <span className="px-2.5 py-1 rounded border border-foreground/15 bg-foreground/5 text-foreground/70">
                    {pct}% to summit
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-4 h-1.5 w-full rounded-full bg-foreground/10 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${pct}%`,
                      background: `linear-gradient(90deg, ${meta.tint}, ${meta.tint}aa)`,
                      boxShadow: `0 0 16px ${meta.tint}`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT — altimeter mountain */}
            <div className="w-full md:w-[260px] h-[180px] md:h-[200px] shrink-0">
              <Altimeter tint={meta.tint} progress={pct} Icon={Icon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionMarker;