import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Vertical topographic GPS trail that draws itself as you scroll.
 * Fixed on the right edge, with checkpoint markers matching chapter sections.
 */
const checkpoints = [
  { id: "about", label: "II" },
  { id: "servizi", label: "III" },
  { id: "portfolio", label: "IV" },
  { id: "recensioni", label: "VI" },
  { id: "contatti", label: "VII" },
];

const TrailPath = () => {
  const isMobile = useIsMobile();
  const pathRef = useRef<SVGPathElement>(null);
  const [progress, setProgress] = useState(0);
  const [len, setLen] = useState(1);

  useEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength());
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const total = h.scrollHeight - h.clientHeight;
        const p = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
        setProgress(p);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (isMobile) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 right-3 lg:right-6 z-30 h-screen w-16 hidden md:flex flex-col items-center justify-center"
    >
      <svg
        viewBox="0 0 40 800"
        preserveAspectRatio="none"
        className="h-[85vh] w-10 overflow-visible"
        fill="none"
      >
        {/* faint base */}
        <path
          d="M20 10 C 32 120, 8 220, 22 320 S 34 500, 18 600 S 28 720, 20 790"
          stroke="hsl(205 90% 48% / 0.18)"
          strokeWidth="1.2"
          strokeDasharray="3 5"
        />
        {/* drawn progress */}
        <path
          ref={pathRef}
          d="M20 10 C 32 120, 8 220, 22 320 S 34 500, 18 600 S 28 720, 20 790"
          stroke="hsl(205 90% 48%)"
          strokeWidth="1.8"
          strokeLinecap="round"
          style={{
            strokeDasharray: len,
            strokeDashoffset: len * (1 - progress),
            filter: "drop-shadow(0 0 6px hsl(205 90% 55% / 0.7))",
            transition: "stroke-dashoffset 0.12s linear",
          }}
        />
        {/* checkpoint markers */}
        {checkpoints.map((c, i) => {
          const y = 10 + ((790 - 10) * (i + 1)) / (checkpoints.length + 1);
          const reached = progress >= (i + 1) / (checkpoints.length + 1) - 0.03;
          return (
            <g key={c.id}>
              <circle
                cx={20}
                cy={y}
                r={reached ? 5 : 3.2}
                fill={reached ? "hsl(205 90% 48%)" : "hsl(0 0% 100%)"}
                stroke="hsl(205 90% 48%)"
                strokeWidth="1.2"
                style={{
                  filter: reached ? "drop-shadow(0 0 8px hsl(205 90% 55%))" : "none",
                  transition: "all 0.3s ease",
                }}
              />
            </g>
          );
        })}
        {/* summit flag at top */}
        <g transform="translate(20 10)">
          <path d="M0 0 L0 -14 L10 -10 L0 -6" fill="hsl(205 90% 48%)" />
        </g>
      </svg>
      {/* chapter labels */}
      <div className="absolute inset-y-0 right-full pr-2 flex flex-col justify-center gap-0 h-[85vh] my-auto">
        {checkpoints.map((c, i) => {
          const reached = progress >= (i + 1) / (checkpoints.length + 1) - 0.03;
          return (
            <div
              key={c.id}
              className="font-mono text-[9px] tracking-[0.3em] uppercase transition-colors"
              style={{
                color: reached ? "hsl(205 90% 42%)" : "hsl(220 15% 45% / 0.5)",
                marginTop: i === 0 ? 0 : "calc((85vh - 60px) / 6)",
              }}
            >
              {c.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrailPath;