import { ArrowUpRight, Globe, Wrench, Sparkles, Star } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import heroMountain from "@/assets/hero-mountain.jpg";

const HeroSection = () => {
  const { t } = useI18n();

  return (
    <section className="relative pt-28 md:pt-36 pb-12 md:pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top meta strip */}
        <div className="flex items-center justify-between mb-8 md:mb-12 text-[10px] md:text-xs font-medium uppercase tracking-[0.35em] text-foreground/60">
          <span className="flex items-center gap-3">
            <span className="w-8 h-px" style={{ background: "hsl(var(--accent-red))" }} />
            Issue Nº 01 · Peak Studio
          </span>
          <span className="hidden md:inline">Est. 2024 · Italia</span>
          <span>2026</span>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-12 grid-rows-[auto] gap-3 md:gap-4">
          {/* Headline card — large */}
          <div className="col-span-12 lg:col-span-8 row-span-2 relative bg-card border border-foreground/10 p-6 md:p-12 flex flex-col justify-between min-h-[460px] md:min-h-[560px] overflow-hidden">
            <div>
              <p className="eyebrow mb-6 md:mb-8">Chapter I · The Ascent</p>
              <h1 className="font-display text-[14vw] leading-[0.88] md:text-[7.5rem] lg:text-[9rem] tracking-[-0.04em] uppercase">
                {t("hero.title1").replace(".", "")}
                <br />
                <span className="ink-underline">{t("hero.title2").replace(".", "")}</span>
                <span style={{ color: "hsl(var(--accent-red))" }}>.</span>
              </h1>
            </div>

            <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <p className="text-base md:text-lg max-w-md text-foreground/70 leading-relaxed">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#contatti" className="btn-cta">
                  {t("hero.cta1")} <ArrowUpRight className="w-4 h-4" />
                </a>
                <a href="#portfolio" className="btn-cta-soft">{t("hero.cta2")}</a>
              </div>
            </div>

            {/* corner crosshair */}
            <span className="absolute top-3 right-3 text-[9px] font-mono uppercase tracking-widest text-foreground/40">+ 46°N</span>
            <span className="absolute bottom-3 left-3 text-[9px] font-mono uppercase tracking-widest text-foreground/40">— 11°E</span>
          </div>

          {/* Mountain image card — tall */}
          <div className="col-span-12 lg:col-span-4 row-span-2 relative overflow-hidden border border-foreground/10 min-h-[280px] lg:min-h-0">
            <img
              src={heroMountain}
              alt="Vetta nel bosco"
              width={1536}
              height={1024}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, hsl(0 0% 5% / 0.65))" }} />
            <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-7" style={{ color: "hsl(var(--paper))" }}>
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] opacity-80">Fig. 01</span>
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] opacity-80">2.847 m</span>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.35em] opacity-70 mb-2">The Summit</p>
                <p className="font-display text-2xl md:text-3xl leading-none">Climb above<br/>the noise.</p>
              </div>
            </div>
          </div>

          {/* Stat 1 */}
          <div className="col-span-6 md:col-span-4 lg:col-span-3 bg-secondary border border-foreground/10 p-5 md:p-6 flex flex-col justify-between min-h-[140px]">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-foreground/60">01</span>
            <div>
              <p className="font-display text-4xl md:text-5xl leading-none">50+</p>
              <p className="text-xs uppercase tracking-wider text-foreground/60 mt-2">{t("hero.stat1")}</p>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="col-span-6 md:col-span-4 lg:col-span-3 border border-foreground/15 p-5 md:p-6 flex flex-col justify-between min-h-[140px]" style={{ background: "hsl(var(--ink))", color: "hsl(var(--paper))" }}>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-60">02</span>
            <div>
              <p className="font-display text-4xl md:text-5xl leading-none">48<span style={{ color: "hsl(var(--accent-red))" }}>h</span></p>
              <p className="text-xs uppercase tracking-wider opacity-70 mt-2">{t("hero.stat2")}</p>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="col-span-12 md:col-span-4 lg:col-span-2 bg-card border border-foreground/10 p-5 md:p-6 flex flex-col justify-between min-h-[140px]">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-foreground/60">03</span>
            <div>
              <p className="font-display text-4xl md:text-5xl leading-none">100%</p>
              <p className="text-xs uppercase tracking-wider text-foreground/60 mt-2">{t("hero.stat3")}</p>
            </div>
          </div>

          {/* Quick rating card */}
          <div className="col-span-12 lg:col-span-4 bg-card border border-foreground/10 p-5 md:p-6 flex items-center gap-4 min-h-[140px]">
            <div className="flex" style={{ color: "hsl(var(--accent-red))" }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <div className="flex-1">
              <p className="font-display text-lg leading-tight">Clienti felici, dalle Dolomiti a Milano.</p>
              <p className="text-[10px] uppercase tracking-wider text-foreground/60 mt-1">Recensioni verificate</p>
            </div>
          </div>
        </div>

        {/* Trail strip below bento */}
        <div className="mt-10 md:mt-14 grid grid-cols-3 gap-3 md:gap-4 text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-foreground/60">
          {[
            { n: "II", l: "About" },
            { n: "III", l: "Servizi" },
            { n: "IV", l: "Portfolio" },
          ].map((s) => (
            <div key={s.n} className="flex items-center gap-3 border-t border-foreground/20 pt-3">
              <span style={{ color: "hsl(var(--accent-red))" }}>{s.n}</span>
              <span>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
