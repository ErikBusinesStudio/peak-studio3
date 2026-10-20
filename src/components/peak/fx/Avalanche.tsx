import { useEffect, useRef, useState } from "react";
import { useCopy } from "@/config/copy";
import { whatsappUrl } from "@/config/site";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

/** Easter egg: 5 click sul logo o codice Konami = valanga di 3 s e messaggio. */
const Avalanche = () => {
  const { c } = useCopy();
  const [phase, setPhase] = useState<"off" | "snow" | "msg">("off");
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let seq: string[] = [];
    const go = () => setPhase("snow");
    const key = (e: KeyboardEvent) => {
      seq = [...seq, e.key.length === 1 ? e.key.toLowerCase() : e.key].slice(-KONAMI.length);
      if (seq.join() === KONAMI.join()) go();
    };
    window.addEventListener("peak:avalanche", go);
    window.addEventListener("keydown", key);
    return () => { window.removeEventListener("peak:avalanche", go); window.removeEventListener("keydown", key); };
  }, []);

  useEffect(() => {
    if (phase !== "snow") return;
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    const w = (cv.width = window.innerWidth), h = (cv.height = window.innerHeight);
    const fl = Array.from({ length: 400 }, () => ({ x: Math.random() * w, y: -Math.random() * h, r: Math.random() * 3 + 1, v: Math.random() * 6 + 4 }));
    document.body.classList.add("shake");
    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      for (const f of fl) { f.y += f.v; f.x += Math.sin(f.y / 40); ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 7); ctx.fill(); }
      raf = requestAnimationFrame(loop);
    };
    loop();
    const id = window.setTimeout(() => setPhase("msg"), 3000);
    return () => { cancelAnimationFrame(raf); window.clearTimeout(id); document.body.classList.remove("shake"); };
  }, [phase]);

  if (phase === "off") return null;
  return (
    <div className="fixed inset-0 z-[95]" onClick={() => phase === "msg" && setPhase("off")}>
      {phase === "snow" && <canvas ref={canvas} aria-hidden className="h-full w-full bg-[hsl(var(--deep-900)/0.35)]" />}
      {phase === "msg" && (
        <div className="flex h-full items-center justify-center bg-[hsl(var(--deep-900)/0.6)] p-6">
          <div role="dialog" aria-modal="true" aria-label="Easter egg" className="zone-snow max-w-md rounded-2xl p-8 text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <p className="font-display text-2xl font-extrabold">{c.egg}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href={whatsappUrl("VETTA")} target="_blank" rel="noopener noreferrer" className="btn btn-primary">WhatsApp</a>
              <button type="button" autoFocus onClick={() => setPhase("off")} className="btn btn-secondary">OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avalanche;
