import { useEffect, useRef, useState } from "react";
import { useCopy } from "@/config/copy";
import { useReducedMotion, useScrollProgress } from "@/hooks/peak";
import SectionHead from "./SectionHead";

/** "La cordata": la corda si disegna con lo scroll e accende i tre campi. */
const Process = () => {
  const { c } = useCopy();
  const ref = useRef<HTMLElement>(null);
  const path = useRef<SVGPathElement>(null);
  const reduced = useReducedMotion();
  const raw = useScrollProgress(ref, "enter");
  const p = reduced ? 1 : Math.min(1, Math.max(0, (raw - 0.25) / 0.6));
  const [len, setLen] = useState(1000);
  const [dot, setDot] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (path.current) setLen(path.current.getTotalLength());
  }, []);
  useEffect(() => {
    if (!path.current) return;
    const pt = path.current.getPointAtLength(len * p);
    setDot({ x: pt.x, y: pt.y });
  }, [p, len]);

  const lit = (i: number) => p >= [0.02, 0.5, 0.97][i];

  return (
    <section ref={ref} id="processo" aria-labelledby="processo-title" className="zone-snow relative py-24 md:py-32">
      <div className="wrap">
        <SectionHead id="processo" kicker={c.process.kicker} quota={1900} title={c.process.title} />
        <div className="relative">
          <svg viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden className="absolute left-0 right-0 top-6 hidden h-[120px] w-full md:block">
            <path d="M80 60 C 250 0, 350 120, 500 60 S 760 0, 920 60" fill="none" stroke="hsl(var(--border))" strokeWidth="3" strokeDasharray="6 8" />
            <path ref={path} d="M80 60 C 250 0, 350 120, 500 60 S 760 0, 920 60" fill="none" stroke="hsl(var(--glacier-700))" strokeWidth="4" strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} />
            <circle cx={dot.x} cy={dot.y} r="9" fill="hsl(var(--cyan))" stroke="hsl(var(--deep-900))" strokeWidth="3" />
          </svg>
          <ol className="relative grid gap-6 md:grid-cols-3 md:gap-8 md:pt-40">
            {c.process.steps.map((s, i) => (
              <li key={s.t} className={`surface p-6 transition-[box-shadow,transform] duration-500 md:p-8 ${lit(i) ? "lantern-on" : ""}`}>
                <span className={`lantern mb-5 flex h-14 w-14 items-center justify-center rounded-full font-display text-2xl font-extrabold ${lit(i) ? "bg-[hsl(var(--glacier-700))] text-[hsl(0_0%_100%)]" : "bg-secondary text-foreground"}`}>
                  {i + 1}
                </span>
                <h3 className="font-display text-3xl font-extrabold tracking-tight">{s.t}</h3>
                <p className="mt-3 text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Process;
