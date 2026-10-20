import { useRef } from "react";
import { useReducedMotion, useScrollProgress } from "@/hooks/peak";

/**
 * Bordo frastagliato tra due sezioni ("crepaccio") che si apre in parallasse
 * con un bagliore blu nella fessura. from/to = classi zona.
 */
const Crevasse = ({ from, to }: { from: string; to: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const p = useScrollProgress(ref, "pass");
  const gap = reduced ? 10 : 4 + Math.sin(p * Math.PI) * 26;
  return (
    <div ref={ref} aria-hidden className={`relative h-16 overflow-hidden md:h-24 ${from}`}>
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--cyan) / 0.9), hsl(var(--glacier-500)), hsl(var(--cyan) / 0.9), transparent)", filter: "blur(6px)" }} />
      <div
        className={`crevasse-edge absolute inset-x-0 bottom-0 ${to}`}
        style={{ top: `${gap}px`, transform: reduced ? undefined : `translateY(${(0.5 - p) * 10}px)` }}
      />
    </div>
  );
};

export default Crevasse;
