import { useId, useRef, useState } from "react";
import { useCopy } from "@/config/copy";
import { stimaMensile } from "@/config/site";
import { useReducedMotion, useScrollProgress } from "@/hooks/peak";
import SectionHead from "./SectionHead";
import Odometer from "./fx/Odometer";

const Slider = ({ label, value, min, max, step = 1, onChange, suffix = "" }: { label: string; value: number; min: number; max: number; step?: number; onChange: (n: number) => void; suffix?: string }) => {
  const id = useId();
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-base font-medium">{label}</label>
        <output htmlFor={id} className="hud shrink-0 text-base font-semibold">{value}{suffix}</output>
      </div>
      <input id={id} type="range" className="slider" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  );
};

/** Blocco di ghiaccio che si scioglie con lo scroll. */
const IceBlock = ({ p }: { p: number }) => {
  const top = 30 + p * 150; // il ghiaccio si abbassa
  return (
    <svg viewBox="0 0 240 260" className="h-auto w-full max-w-[260px]" aria-hidden>
      <defs>
        <linearGradient id="ice-g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="hsl(209 100% 92%)" />
          <stop offset="1" stopColor="hsl(210 71% 62%)" />
        </linearGradient>
        <clipPath id="melt">
          <path d={`M20 ${top} Q60 ${top - 10} 90 ${top + 6} T160 ${top} T220 ${top + 4} V215 H20 Z`} />
        </clipPath>
      </defs>
      <g clipPath="url(#melt)">
        <rect x="30" y="30" width="180" height="185" rx="18" fill="url(#ice-g)" />
        <path d="M60 60 L110 120 M150 50 L130 100 L170 140" stroke="white" strokeOpacity="0.7" strokeWidth="2" fill="none" />
      </g>
      {[50, 100, 150, 190].map((x, i) => (
        <circle key={x} cx={x} cy={220 + ((p * 400 + i * 25) % 30)} r={3} fill="hsl(210 71% 55%)" opacity={p > 0.05 && p < 0.98 ? 0.9 : 0} />
      ))}
      <ellipse cx="120" cy="245" rx={30 + p * 90} ry={4 + p * 8} fill="hsl(210 71% 55% / 0.35)" />
      {p > 0.9 && <ellipse cx="120" cy="245" rx="40" ry="6" fill="none" stroke="hsl(213 79% 37%)" className="ripple" />}
    </svg>
  );
};

const Thaw = () => {
  const { c } = useCopy();
  const ref = useRef<HTMLElement>(null);
  const p = useScrollProgress(ref, "pass");
  const reduced = useReducedMotion();
  const [a, setA] = useState(20);
  const [b, setB] = useState(150);
  const [cc, setC] = useState(3);
  const result = stimaMensile(a, b, cc);

  return (
    <section ref={ref} id="disgelo" aria-labelledby="disgelo-title" className="zone-ice relative py-24 md:py-32">
      <div className="wrap">
        <SectionHead id="disgelo" kicker={c.thaw.kicker} quota={900} title={c.thaw.title} intro={c.thaw.intro} />
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="surface space-y-8 p-6 md:p-10 lg:col-span-7">
            <Slider label={c.thaw.a} value={a} min={0} max={100} onChange={setA} />
            <Slider label={c.thaw.b} value={b} min={10} max={3000} step={10} onChange={setB} suffix=" €" />
            <Slider label={c.thaw.c} value={cc} min={1} max={10} onChange={setC} />
            <div className="border-t border-border pt-6">
              <p className="hud font-semibold text-muted-foreground">{c.thaw.result}</p>
              <p className="mt-2 font-display text-5xl font-extrabold tracking-tight md:text-7xl" aria-live="polite">
                <Odometer value={result} animate={!reduced} /> €
              </p>
              <p className="hud mt-3 normal-case tracking-normal text-muted-foreground">= {c.thaw.formula}</p>
              <p className="mt-4 text-sm text-muted-foreground">{c.thaw.note}</p>
            </div>
          </div>
          <div className="flex justify-center lg:col-span-5">
            <IceBlock p={reduced ? 0.5 : p} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Thaw;
