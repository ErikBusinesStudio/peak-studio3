import { KeyboardEvent, PointerEvent, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { useCopy } from "@/config/copy";
import { CASI_PORTFOLIO } from "@/config/site";
import { useReducedMotion, useScrollProgress } from "@/hooks/peak";
import SectionHead from "./SectionHead";

/**
 * "Carota di ghiaccio": sezione fissata con scorrimento orizzontale.
 * Ogni strato è un progetto reale. Rotellina/scroll, trascinamento, swipe e frecce da tastiera.
 */
const Works = () => {
  const { c, lang } = useCopy();
  const outer = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const p = useScrollProgress(outer, "pin");
  const [maxX, setMaxX] = useState(0);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const n = CASI_PORTFOLIO.length;

  useEffect(() => {
    const m = () => {
      if (track.current && viewport.current) setMaxX(Math.max(0, track.current.scrollWidth - viewport.current.clientWidth));
    };
    m();
    window.addEventListener("resize", m);
    return () => window.removeEventListener("resize", m);
  }, []);

  const active = Math.min(n - 1, Math.round(p * (n - 1)));

  const goTo = (i: number) => {
    const el = outer.current;
    if (!el) return;
    const k = Math.min(n - 1, Math.max(0, i));
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (n > 1 ? (k / (n - 1)) * range : 0), behavior: reduced ? "auto" : "smooth" });
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); goTo(active + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); goTo(active - 1); }
    if (e.key === "Home") { e.preventDefault(); goTo(0); }
    if (e.key === "End") { e.preventDefault(); goTo(n - 1); }
  };

  const down = (e: PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { x: e.clientX, y: window.scrollY };
  };
  const moveP = (e: PointerEvent) => {
    if (!drag.current || !outer.current) return;
    const dx = e.clientX - drag.current.x;
    const range = outer.current.offsetHeight - window.innerHeight;
    if (maxX > 0) window.scrollTo({ top: drag.current.y - (dx / maxX) * range });
  };
  const up = () => (drag.current = null);

  return (
    <section
      ref={outer}
      id="lavori"
      aria-labelledby="lavori-title"
      className="zone-mid relative"
      style={{ height: `calc(100vh + ${Math.max(1, n - 1) * 70}vh)` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-20">
        <div className="wrap">
          <SectionHead id="lavori" kicker={c.works.kicker} quota={2400} title={c.works.title} intro={c.works.intro} />
        </div>
        <div
          ref={viewport}
          role="region"
          aria-roledescription="carousel"
          aria-label={c.works.core}
          tabIndex={0}
          onKeyDown={onKey}
          onPointerDown={down}
          onPointerMove={moveP}
          onPointerUp={up}
          onPointerCancel={up}
          onPointerLeave={up}
          className="relative cursor-grab touch-pan-y select-none active:cursor-grabbing"
        >
          <ol
            ref={track}
            className="flex w-max gap-5 px-5 md:gap-8 md:px-[max(2rem,calc((100vw-1280px)/2+2rem))]"
            style={{ transform: `translate3d(${-p * maxX}px,0,0)` }}
          >
            {CASI_PORTFOLIO.map((w, i) => (
              <li
                key={w.id}
                aria-roledescription="slide"
                aria-label={`${i + 1} / ${n}: ${w.nome}`}
                className={`core-layer relative w-[82vw] max-w-[620px] shrink-0 overflow-hidden rounded-[28px] border p-4 transition-[opacity,transform] duration-500 md:p-6 ${
                  i === active ? "opacity-100" : "opacity-80"
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="hud font-semibold text-muted-foreground">
                    {w.anno ? `${w.anno} · ` : ""}{w.settore[lang]}
                  </p>
                  <p className="hud text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
                </div>
                <h3 className="mt-2 font-display text-3xl font-extrabold tracking-tight md:text-5xl">{w.nome}</h3>
                <p className="mt-1 text-muted-foreground">{w.fatto[lang]}</p>
                <img src={w.img} alt={`${c.works.screenshot}: ${w.nome}`} width={1200} height={800} loading="lazy" decoding="async" draggable={false} className="mt-4 aspect-[3/2] w-full rounded-2xl object-cover object-top" />
                <a href={w.url} target="_blank" rel="noopener noreferrer" className="hud mt-4 inline-flex min-h-[44px] items-center gap-2 font-semibold underline-offset-4 hover:underline" onFocus={() => goTo(i)}>
                  {c.works.visit} <span className="sr-only">{w.nome}</span>
                  <ExternalLink aria-hidden className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ol>
        </div>
        <div className="wrap mt-6 flex items-center gap-3">
          <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label={c.works.prev} className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border disabled:opacity-40">
            <ArrowLeft aria-hidden className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => goTo(active + 1)} disabled={active === n - 1} aria-label={c.works.next} className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border disabled:opacity-40">
            <ArrowRight aria-hidden className="h-5 w-5" />
          </button>
          <p className="hud text-muted-foreground" aria-live="polite">
            {active + 1} / {n}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Works;
