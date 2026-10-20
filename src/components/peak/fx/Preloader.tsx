import { useEffect, useState } from "react";
import { useCopy } from "@/config/copy";

const KEY = "peak-preloaded";

/** Cristallo che si forma: max 1,2 s, saltabile, solo alla prima visita della sessione. */
const Preloader = () => {
  const { c } = useCopy();
  const [show, setShow] = useState(() => {
    try { return !window.sessionStorage.getItem(KEY); } catch { return false; }
  });
  useEffect(() => {
    if (!show) return;
    try { window.sessionStorage.setItem(KEY, "1"); } catch { /* ignore */ }
    const id = window.setTimeout(() => setShow(false), 1200);
    return () => window.clearTimeout(id);
  }, [show]);
  if (!show) return null;
  return (
    <div className="preloader pointer-events-none fixed inset-x-0 bottom-8 z-[90] flex flex-col items-center" role="status" aria-label={c.preloader}>
      <svg viewBox="-50 -50 100 100" width="64" height="64" aria-hidden className="crystal-form">
        {[0, 60, 120].map((r) => (
          <g key={r} transform={`rotate(${r})`}>
            <path d="M0 -42 V42 M-10 -30 L0 -20 L10 -30 M-10 30 L0 20 L10 30" />
          </g>
        ))}
      </svg>
      <button type="button" onClick={() => setShow(false)} className="hud pointer-events-auto mt-3 min-h-[44px] rounded-full border border-border bg-[hsl(var(--snow))] px-5 font-semibold">
        {c.skipIntro}
      </button>
    </div>
  );
};

export default Preloader;
