import { useEffect, useRef } from "react";
import { isMobile, useInView } from "@/hooks/peak";

/** Neve di sottofondo: max 80 particelle (30 su mobile), in pausa fuori viewport. */
const Snow = ({ color = "255,255,255", className = "" }: { color?: string; className?: string }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const inView = useInView(ref);

  useEffect(() => {
    const c = ref.current;
    if (!c || !inView) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const n = isMobile() ? 30 : 80;
    let w = (c.width = c.offsetWidth), h = (c.height = c.offsetHeight);
    const flakes = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h, r: Math.random() * 2 + 0.6, v: Math.random() * 0.6 + 0.3, d: Math.random() * Math.PI * 2,
    }));
    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      for (const f of flakes) {
        f.y += f.v; f.d += 0.01; f.x += Math.sin(f.d) * 0.4;
        if (f.y > h) { f.y = -4; f.x = Math.random() * w; }
        ctx.beginPath();
        ctx.fillStyle = `rgba(${color},${0.5 + f.r / 6})`;
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    const rs = () => { w = c.width = c.offsetWidth; h = c.height = c.offsetHeight; };
    window.addEventListener("resize", rs);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", rs); };
  }, [inView, color]);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
};

export default Snow;
