import { useEffect, useRef, useState } from "react";
import portfolioEriutility from "@/assets/portfolio-eriutility.png.asset.json";
import portfolioCtsCuvio from "@/assets/portfolio-cts-cuvio.webp.asset.json";
import portfolioSafetySolutions from "@/assets/portfolio-safety-solutions.png.asset.json";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const sites = [
  { img: portfolioEriutility.url, title: "E-Riutility", category: "Mercatino dell'usato", url: "https://e-riutility.it" },
  { img: portfolioCtsCuvio.url, title: "CTS Cuvio", category: "Centro Turistico Sportivo", url: "https://centrocuvio.it" },
  { img: portfolioSafetySolutions.url, title: "Safety Solutions", category: " Sicurezza sul lavoro", url: "https://safetysolutionproject.lovable.app" },
];

const PortfolioSection = () => {
  const { t } = useI18n();
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const state = useRef({ startX: 0, startLeft: 0, moved: 0 });

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onDown = (e: PointerEvent) => {
      state.current = { startX: e.clientX, startLeft: el.scrollLeft, moved: 0 };
      setDragging(true);
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!el.hasPointerCapture(e.pointerId)) return;
      const dx = e.clientX - state.current.startX;
      state.current.moved = Math.abs(dx);
      el.scrollLeft = state.current.startLeft - dx;
    };
    const onUp = (e: PointerEvent) => {
      setDragging(false);
      try { el.releasePointerCapture(e.pointerId); } catch {}
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const nudge = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <section id="portfolio" className="relative overflow-hidden py-16 md:py-28">
      <div className="hidden md:block absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[220px]" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-8 md:mb-14 gap-6">
          <div>
            <p className="eyebrow mb-3 md:mb-4">V — Portfolio</p>
            <h2 className="font-display text-3xl md:text-6xl leading-[0.9] tracking-tight uppercase">
              {t("portfolio.title")}<br />
              <span className="text-gradient italic">selezionati.</span>
            </h2>
            <p className="text-muted-foreground max-w-md text-sm md:text-base mt-3">
              {t("portfolio.subtitle")}
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => nudge(-1)}
              aria-label="Precedente"
              className="w-12 h-12 rounded-full border border-border bg-card hover:border-primary/60 hover:text-primary transition flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => nudge(1)}
              aria-label="Successivo"
              className="w-12 h-12 rounded-full border border-border bg-card hover:border-primary/60 hover:text-primary transition flex items-center justify-center"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className={`no-scrollbar flex gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory px-4 md:px-16 pb-4 select-none ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ scrollBehavior: dragging ? "auto" : "smooth" }}
      >
        {sites.map((p, i) => (
          <a
            key={p.title}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (state.current.moved > 6) e.preventDefault();
            }}
            draggable={false}
            className="group relative shrink-0 snap-center w-[85vw] md:w-[62vw] lg:w-[54vw] max-w-[900px] rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-colors"
            style={{ animation: `fade-in 0.6s ease-out ${i * 120}ms both` }}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={p.img}
                alt={p.title}
                draggable={false}
                className="w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.35em] text-white/90 mix-blend-difference">
                Progetto · 0{i + 1}
              </span>
              <span className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <ExternalLink className="w-4 h-4" />
              </span>
            </div>
            <div className="p-5 md:p-7 flex items-end justify-between gap-4">
              <div>
                <span className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-[0.25em]">
                  {p.category}
                </span>
                <h3 className="font-display text-xl md:text-3xl leading-tight mt-1">{p.title}</h3>
              </div>
              <span className="hidden md:inline font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Visita ↗
              </span>
            </div>
          </a>
        ))}

        <div className="shrink-0 snap-center w-[70vw] md:w-[40vw] max-w-[500px] flex items-center justify-center">
          <div className="text-center p-8">
            <p className="eyebrow justify-center mb-4">Prossimo</p>
            <p className="font-display text-2xl md:text-4xl leading-tight uppercase">
              Il prossimo caso studio<br />
              <span className="text-gradient italic">potrebbe essere il tuo.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
