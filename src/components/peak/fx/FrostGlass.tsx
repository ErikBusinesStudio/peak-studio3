import { useEffect, useRef, useState } from "react";
import { isFinePointer, useInView } from "@/hooks/peak";

/**
 * "Alito sul vetro": una brina spessa copre la foto; il cursore la scioglie con un
 * alone che si allarga in base alla velocità, con una lente che segue il puntatore.
 * Touch: ogni tocco apre un'onda che si espande. La brina ricresce in pochi secondi.
 * Nessuno stato React per frame: tutto in canvas + transform.
 */
const FrostGlass = ({ hint, hintTouch }: { hint: string; hintTouch: string }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const lens = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [touched, setTouched] = useState(false);
  const [fine] = useState(isFinePointer);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !inView) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement!;
    const SCALE = 0.25;
    let w = 0, h = 0, raf = 0, last = performance.now();
    let px = -999, py = -999, speed = 0, radius = 0, over = false;
    const bursts: { x: number; y: number; t: number }[] = [];
    const frost = document.createElement("canvas");
    const mask = document.createElement("canvas");
    const mctx = mask.getContext("2d")!;

    const build = () => {
      w = canvas.width = parent.clientWidth;
      h = canvas.height = parent.clientHeight;
      frost.width = w; frost.height = h;
      const f = frost.getContext("2d")!;
      const g = f.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "rgba(246,250,255,0.62)");
      g.addColorStop(0.6, "rgba(232,243,255,0.5)");
      g.addColorStop(1, "rgba(230,242,255,0.2)");
      f.fillStyle = g; f.fillRect(0, 0, w, h);
      for (let i = 0; i < (w * h) / 700; i++) {
        const x = Math.random() * w, y = Math.random() * h, s = Math.random() * 2.6 + 0.4;
        f.fillStyle = `rgba(255,255,255,${Math.random() * 0.55 + 0.2})`;
        f.fillRect(x, y, s, s);
      }
      // venature di ghiaccio
      f.strokeStyle = "rgba(255,255,255,0.35)"; f.lineWidth = 1;
      for (let i = 0; i < 40; i++) {
        let x = Math.random() * w, y = Math.random() * h;
        f.beginPath(); f.moveTo(x, y);
        for (let k = 0; k < 5; k++) { x += (Math.random() - 0.5) * 80; y += (Math.random() - 0.5) * 80; f.lineTo(x, y); }
        f.stroke();
      }
      mask.width = Math.ceil(w * SCALE); mask.height = Math.ceil(h * SCALE);
      mctx.fillStyle = "#000"; mctx.fillRect(0, 0, mask.width, mask.height);
    };
    build();

    const hole = (x: number, y: number, r: number, a = 1) => {
      mctx.globalCompositeOperation = "destination-out";
      const sx = x * SCALE, sy = y * SCALE, sr = r * SCALE;
      const g = mctx.createRadialGradient(sx, sy, 0, sx, sy, sr);
      g.addColorStop(0, `rgba(0,0,0,${a})`); g.addColorStop(0.6, `rgba(0,0,0,${a * 0.8})`); g.addColorStop(1, "rgba(0,0,0,0)");
      mctx.fillStyle = g;
      mctx.beginPath(); mctx.arc(sx, sy, sr, 0, Math.PI * 2); mctx.fill();
      mctx.globalCompositeOperation = "source-over";
    };

    const tick = () => {
      const now = performance.now();
      // alone: più veloce = più largo, morbido in entrata/uscita
      const target = over ? 90 + Math.min(120, speed * 2.2) : 0;
      radius += (target - radius) * 0.12;
      speed *= 0.9;
      if (radius > 2) hole(px, py, radius);
      for (let i = bursts.length - 1; i >= 0; i--) {
        const k = (now - bursts[i].t) / 700;
        if (k >= 1) { bursts.splice(i, 1); continue; }
        hole(bursts[i].x, bursts[i].y, 40 + k * 220, 1 - k * 0.6);
      }
      mctx.fillStyle = "rgba(0,0,0,0.014)";
      mctx.fillRect(0, 0, mask.width, mask.height);
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(frost, 0, 0);
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(mask, 0, 0, w, h);
      if (lens.current) {
        const s = Math.max(0, radius / 100);
        lens.current.style.transform = `translate3d(${px}px,${py}px,0) translate(-50%,-50%) scale(${s.toFixed(3)})`;
        lens.current.style.opacity = over ? "1" : "0";
      }
      raf = now - last < 6000 || bursts.length ? requestAnimationFrame(tick) : 0;
    };
    tick();
    const wake = () => { last = performance.now(); if (!raf) raf = requestAnimationFrame(tick); };

    const pos = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top, inside: e.clientY >= r.top && e.clientY <= r.bottom };
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const p = pos(e);
      over = p.inside;
      if (px > -999) speed = Math.max(speed, Math.hypot(p.x - px, p.y - py));
      px = p.x; py = p.y;
      setTouched(true);
      wake();
    };
    const down = (e: PointerEvent) => {
      const p = pos(e);
      if (!p.inside) return;
      bursts.push({ x: p.x, y: p.y, t: performance.now() });
      setTouched(true);
      wake();
    };
    const leave = () => { over = false; wake(); };
    parent.addEventListener("pointermove", move, { passive: true });
    parent.addEventListener("pointerdown", down, { passive: true });
    parent.addEventListener("pointerleave", leave, { passive: true });
    const onResize = () => { build(); wake(); };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      parent.removeEventListener("pointermove", move);
      parent.removeEventListener("pointerdown", down);
      parent.removeEventListener("pointerleave", leave);
      window.removeEventListener("resize", onResize);
    };
  }, [inView]);

  return (
    <>
      <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-0" />
      <div ref={lens} aria-hidden className="frost-lens" />
      {!touched && (
        <p aria-hidden className="frost-hint hud pointer-events-none absolute bottom-6 right-5 rounded-full border border-border bg-[hsl(var(--snow)/0.85)] px-3 py-2 text-muted-foreground md:right-8">
          <span className="frost-hint-dot" /> {fine ? hint : hintTouch}
        </p>
      )}
    </>
  );
};

export default FrostGlass;
