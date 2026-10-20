import { useEffect, useState } from "react";
import { useCopy } from "@/config/copy";
import { CAMPI, QUOTA_MAX, temperatura } from "@/config/site";
import { scrollToId } from "@/hooks/peak";

/** Altimetro fisso: quota e temperatura seguono lo scroll; ogni campo porta alla sua sezione. */
const Altimeter = () => {
  const { c, lang } = useCopy();
  const [quota, setQuota] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const mid = window.innerHeight * 0.4;
      let idx = 0;
      let q = 0;
      for (let i = 0; i < CAMPI.length; i++) {
        const el = document.getElementById(CAMPI[i].id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= mid) {
          idx = i;
          const next = CAMPI[i + 1];
          const f = Math.min(1, Math.max(0, (mid - r.top) / Math.max(1, r.height)));
          q = CAMPI[i].quota + (next ? (next.quota - CAMPI[i].quota) * f : 0);
        }
      }
      setActive(idx);
      setQuota(Math.round(q / 10) * 10);
      document.documentElement.style.setProperty("--climb", String(q / QUOTA_MAX));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(calc); };
    calc();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);

  const t = temperatura(quota);
  const temp = `${t > 0 ? "+" : t < 0 ? "−" : ""}${Math.abs(t)} °C`;

  return (
    <>
      {/* desktop */}
      <nav aria-label={c.altimeter.label} className="altimeter fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
        <div className="zone-deep rounded-2xl border border-border p-4 shadow-2xl" style={{ backgroundColor: "hsl(var(--deep-900) / 0.92)" }}>
          <p className="hud font-semibold" aria-live="off">
            <span className="block text-2xl font-semibold tracking-normal">{quota.toLocaleString("it-IT")} m</span>
            <span className="text-muted-foreground">{temp}</span>
          </p>
          <ol className="relative mt-4 space-y-1 border-l border-border pl-3">
            <span aria-hidden className="absolute -left-px bottom-0 w-[2px] bg-[hsl(var(--cyan))] transition-[height] duration-300" style={{ height: `${(quota / QUOTA_MAX) * 100}%` }} />
            {[...CAMPI].reverse().map((cp) => {
              const i = CAMPI.indexOf(cp);
              const on = i === active;
              return (
                <li key={cp.id}>
                  <button
                    type="button"
                    onClick={() => scrollToId(cp.id)}
                    aria-current={on ? "location" : undefined}
                    aria-label={`${c.altimeter.goto} ${cp.nome[lang]}, ${cp.quota} m`}
                    className={`hud flex min-h-[28px] w-full items-center gap-2 rounded px-1 text-left !text-[12px] !tracking-[0.08em] transition-colors ${on ? "font-semibold text-[hsl(var(--cyan))]" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <span aria-hidden className={`h-1.5 w-1.5 rotate-45 ${on ? "bg-[hsl(var(--cyan))]" : "bg-current"}`} />
                    <span className="w-12 tabular-nums">{cp.quota}</span>
                    <span className="max-w-[150px] truncate">{cp.nome[lang]}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
      {/* mobile/tablet: indicatore compatto */}
      <div aria-hidden className="hud zone-deep fixed bottom-4 right-4 z-40 rounded-full border border-border px-3 py-2 font-semibold shadow-xl xl:hidden" style={{ backgroundColor: "hsl(var(--deep-900) / 0.92)" }}>
        {quota.toLocaleString("it-IT")} m · {temp}
      </div>
    </>
  );
};

export default Altimeter;
