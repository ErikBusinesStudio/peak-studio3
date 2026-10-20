import { useEffect, useRef, useState } from "react";

type Crack = { id: number; x: number; y: number; paths: string[] };

const makeCrack = (): string[] =>
  Array.from({ length: 5 }, (_, i) => {
    let a = (i / 5) * Math.PI * 2 + Math.random() * 0.6, x = 0, y = 0, d = "M0 0";
    for (let s = 0; s < 4; s++) {
      a += (Math.random() - 0.5) * 0.9;
      x += Math.cos(a) * (10 + Math.random() * 12);
      y += Math.sin(a) * (10 + Math.random() * 12);
      d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    return d;
  });

/** Cursore a cristallo (solo desktop) con crepe al click che svaniscono in 1,5 s. */
const Cursor = () => {
  const dot = useRef<HTMLDivElement>(null);
  const [cracks, setCracks] = useState<Crack[]>([]);

  useEffect(() => {
    document.documentElement.classList.add("has-crystal-cursor");
    let x = 0, y = 0, raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0;
        if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px) rotate(45deg)`;
      });
    };
    const click = (e: PointerEvent) => {
      const id = Date.now() + Math.random();
      setCracks((c) => [...c.slice(-4), { id, x: e.clientX, y: e.clientY, paths: makeCrack() }]);
      window.setTimeout(() => setCracks((c) => c.filter((k) => k.id !== id)), 1500);
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", click, { passive: true });
    return () => {
      document.documentElement.classList.remove("has-crystal-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", click);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <div ref={dot} className="crystal-cursor" />
      {cracks.map((k) => (
        <svg key={k.id} className="crack" style={{ left: k.x, top: k.y }} width="120" height="120" viewBox="-60 -60 120 120">
          {k.paths.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </svg>
      ))}
    </div>
  );
};

export default Cursor;
