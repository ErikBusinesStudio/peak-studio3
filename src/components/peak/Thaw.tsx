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

/**
 * "Il sito che si costruisce": una finestra browser in cui struttura, contenuti,
 * contatti e messa online compaiono con lo scroll. Movimento continuo leggero in CSS.
 */
const SiteBuild = ({ p, layers }: { p: number; layers: string[] }) => {
  const stage = Math.min(4, Math.floor(p * 5.2));
  const on = (i: number) => (stage > i ? "is-on" : "");
  return (
    <div className="site-build w-full max-w-[460px]" aria-hidden>
      <div className="sb-window">
        <div className="sb-bar">
          <i /><i /><i />
          <span className="sb-url">peakstudio.click/<b>{stage >= 4 ? "online" : "build"}</b></span>
        </div>
        <div className="sb-body">
          <div className={`sb-grid ${on(0)}`} />
          <div className={`sb-block sb-nav ${on(0)}`}><span /><span /><span /></div>
          <div className={`sb-block sb-hero ${on(1)}`}>
            <span className="sb-line w-3/4" /><span className="sb-line w-1/2" />
            <span className="sb-img" />
          </div>
          <div className={`sb-cards ${on(1)}`}><span /><span /><span /></div>
          <div className={`sb-block sb-cta ${on(2)}`}><span className="sb-btn" /><span className="sb-caret" /></div>
          <div className={`sb-live ${on(3)}`}><span className="sb-pulse" />ONLINE · 200 OK</div>
          <span className="sb-scan" />
          <span className="sb-pointer" />
        </div>
      </div>
      <ol className="sb-steps">
        {layers.map((l, i) => (
          <li key={l} className={stage > i ? "is-on" : ""}>
            <span className="hud">0{i + 1}</span> {l}
          </li>
        ))}
      </ol>
    </div>
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
            <SiteBuild p={reduced ? 1 : Math.min(1, p * 1.6)} layers={c.thaw.layers} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Thaw;
