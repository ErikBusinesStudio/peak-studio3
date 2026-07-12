import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1600;
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 2.2);
      setProgress(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(step);
      else {
        setFading(true);
        setTimeout(() => setHidden(true), 700);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (hidden) document.body.style.overflow = "";
    else document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [hidden]);

  if (hidden) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-700 ${fading ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, hsl(205 90% 42% / 0.35), hsl(220 40% 8%) 65%), hsl(220 40% 6%)",
      }}
    >
      <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.9'/></svg>\")",
        }} />

      <div className="relative flex flex-col items-center gap-8 md:gap-12 px-6 text-center">
        <img
          src={logo}
          alt="Peak Studio"
          className="h-16 md:h-24 w-auto animate-float-slow"
          style={{ filter: "drop-shadow(0 0 40px hsl(205 90% 55% / 0.7))" }}
        />
        <p className="font-display italic text-white/90 text-2xl md:text-5xl leading-[1.05] tracking-tight max-w-3xl">
          Ogni vetta ha un inizio.<br />
          <span className="text-gradient not-italic">Il tuo è adesso.</span>
        </p>
        <div className="w-[220px] md:w-[360px] flex flex-col gap-2">
          <div className="h-px w-full bg-white/15 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-white/40 via-white to-white/40 transition-[width] duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-white/60">
            <span>Preparazione</span>
            <span>{progress.toString().padStart(3, "0")}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;