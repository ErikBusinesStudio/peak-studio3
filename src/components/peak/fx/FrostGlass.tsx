import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/peak";

/** "Alito sul vetro": brina che si pulisce col cursore/dito e ricresce in ~4 s. */
const FrostGlass = ({ hint }: { hint: string }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const inView = useInView(ref);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !inView) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement!;
    const SCALE = 0.25; // maschera a bassa risoluzione
    let w = 0, h = 0, raf = 0, last = performance.now();
    const frost = document.createElement("canvas");
    const mask = document.createElement("canvas");
    const mctx = mask.getContext("2d")!;

    const build = () => {
      w = canvas.width = parent.clientWidth;
      h = canvas.height = parent.clientHeight;
      frost.width = w; frost.height = h;
      const f = frost.getContext("2d")!;
      const g = f.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "rgba(246,250,255,0.42)");
      g.addColorStop(1, "rgba(230,242,255,0.30)");
      f.fillStyle = g; f.fillRect(0, 0, w, h);
      // cristalli
      for (let i = 0; i < (w * h) / 900; i++) {
        const x = Math.random() * w, y = Math.random() * h, s = Math.random() * 2.2 + 0.4;
        f.fillStyle = `rgba(255,255,255,${Math.random() * 0.5 + 0.15})`;
        f.fillRect(x, y, s, s);
      }
      mask.width = Math.ceil(w * SCALE); mask.height = Math.ceil(h * SCALE);
      mctx.fillStyle = "#000"; mctx.fillRect(0, 0, mask.width, mask.height);
    };
    build();

    const wipe = (x: number, y: number) => {
      mctx.globalCompositeOperation = "destination-out";
      const r = 60 * SCALE;
      const g = mctx.createRadialGradient(x * SCALE, y * SCALE, 0, x * SCALE, y * SCALE, r);
      g.addColorStop(0, "rgba(0,0,0,1)"); g.addColorStop(1, "rgba(0,0,0,0)");
      mctx.fillStyle = g;
      mctx.beginPath(); mctx.arc(x * SCALE, y * SCALE, r, 0, Math.PI * 2); mctx.fill();
      mctx.globalCompositeOperation = "source-over";
      last = performance.now();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      // ricrescita
      mctx.fillStyle = "rgba(0,0,0,0.012)";
      mctx.fillRect(0, 0, mask.width, mask.height);
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(frost, 0, 0);
      ctx.globalCompositeOperation = "destination-in";
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(mask, 0, 0, w, h);
      raf = performance.now() - last < 6000 ? requestAnimationFrame(tick) : 0;
    };
    tick();

    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) return;
      wipe(e.clientX - r.left, e.clientY - r.top);
      setTouched(true);
    };
    parent.addEventListener("pointermove", move, { passive: true });
    parent.addEventListener("pointerdown", move, { passive: true });
    const onResize = () => { build(); tick(); };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      parent.removeEventListener("pointermove", move);
      parent.removeEventListener("pointerdown", move);
      window.removeEventListener("resize", onResize);
    };
  }, [inView]);

  return (
    <>
      <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-0" />
      {!touched && (
        <p aria-hidden className="hud pointer-events-none absolute bottom-6 right-6 hidden rounded-full bg-[hsl(var(--snow)/0.85)] px-3 py-2 text-muted-foreground md:block">
          {hint}
        </p>
      )}
    </>
  );
};

export default FrostGlass;
