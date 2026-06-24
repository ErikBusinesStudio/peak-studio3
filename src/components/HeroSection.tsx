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

        {/* Marquee tagline strip */}
        <div className="relative overflow-hidden mb-6 md:mb-10 py-3 border-y border-primary/20" style={{ background: "linear-gradient(90deg, transparent, hsl(340 100% 50% / 0.08), transparent)" }}>
          <div className="flex gap-12 whitespace-nowrap animate-marquee font-display uppercase text-xl md:text-3xl tracking-tight" style={{ width: "max-content" }}>
            {Array.from({ length: 2 }).map((_, group) => (
              <div key={group} className="flex gap-12 items-center">
                {["Web Design", "★", "Branding", "★", "SEO", "★", "Automazioni", "★", "QR Menu", "★", "Landing Pages", "★"].map((w, i) => (
                  <span key={i} className={i % 2 === 1 ? "text-gradient-pink" : "text-foreground/80"}>{w}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-12 grid-rows-[auto] gap-3 md:gap-4">
          {/* Headline card — large */}
          <div className="col-span-12 lg:col-span-8 row-span-2 relative gradient-border rounded-3xl bg-card p-6 md:p-12 flex flex-col justify-between min-h-[460px] md:min-h-[580px] overflow-hidden animate-rise" style={{ animationDelay: "0.05s" }}>
            {/* Animated gradient blob inside card */}
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-50 blur-3xl animate-blob pointer-events-none" style={{ background: "radial-gradient(circle, #FF0054 0%, transparent 70%)" }} />
            <div>
              <p className="eyebrow mb-6 md:mb-8">
                <span className="inline-block w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
                Chapter I · The Ascent
              </p>
              <h1 className="font-display leading-[0.9] tracking-[-0.03em] uppercase break-words relative" style={{ fontSize: "clamp(2.25rem, 6vw, 5rem)" }}>
                <span className="text-foreground">{t("hero.title1").replace(".", "")}</span>
                <br />
                <span className="text-gradient">{t("hero.title2").replace(".", "")}</span>
                <span className="text-gradient-pink">.</span>
              </h1>
            </div>

            <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <p className="text-base md:text-lg max-w-md text-foreground/75 leading-relaxed">
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
          <div className="col-span-12 lg:col-span-4 row-span-2 relative overflow-hidden rounded-3xl gradient-border min-h-[280px] lg:min-h-0 animate-rise" style={{ animationDelay: "0.15s" }}>
            <img
              src={heroMountain}
              alt="Vetta nel bosco"
              width={1536}
              height={1024}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[6s] hover:scale-110"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, hsl(338 100% 4% / 0.3) 0%, transparent 35%, hsl(338 100% 4% / 0.85) 100%), linear-gradient(135deg, hsl(340 100% 50% / 0.15), transparent 60%)" }} />
            <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-7 text-foreground">
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] opacity-80">Fig. 01</span>
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] px-2 py-1 rounded-full text-primary" style={{ background: "hsl(340 100% 50% / 0.15)", border: "1px solid hsl(340 100% 50% / 0.4)" }}>2.847 m</span>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.35em] opacity-70 mb-2">The Summit</p>
                <p className="font-display text-2xl md:text-3xl leading-none">Climb above<br/><span className="text-gradient-pink">the noise.</span></p>
              </div>
            </div>
          </div>

          {/* Stat 1 */}
          <div className="col-span-6 md:col-span-4 lg:col-span-3 rounded-2xl gradient-border bg-card p-5 md:p-6 flex flex-col justify-between min-h-[140px] animate-rise" style={{ animationDelay: "0.25s" }}>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-foreground/60">01</span>
            <div>
              <p className="font-display text-4xl md:text-5xl leading-none text-gradient">50+</p>
              <p className="text-xs uppercase tracking-wider text-foreground/60 mt-2">{t("hero.stat1")}</p>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="col-span-6 md:col-span-4 lg:col-span-3 rounded-2xl p-5 md:p-6 flex flex-col justify-between min-h-[140px] text-primary-foreground animate-rise animate-glow-pulse" style={{ background: "var(--gradient-brand)", backgroundSize: "200% 200%", animationDelay: "0.35s" }}>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-80">02</span>
            <div>
              <p className="font-display text-4xl md:text-5xl leading-none">48<span className="opacity-70">h</span></p>
              <p className="text-xs uppercase tracking-wider opacity-90 mt-2">{t("hero.stat2")}</p>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="col-span-12 md:col-span-4 lg:col-span-2 rounded-2xl gradient-border bg-card p-5 md:p-6 flex flex-col justify-between min-h-[140px] animate-rise" style={{ animationDelay: "0.45s" }}>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-foreground/60">03</span>
            <div>
              <p className="font-display text-4xl md:text-5xl leading-none text-gradient">100%</p>
              <p className="text-xs uppercase tracking-wider text-foreground/60 mt-2">{t("hero.stat3")}</p>
            </div>
          </div>

          {/* Quick rating card */}
          <div className="col-span-12 lg:col-span-4 rounded-2xl gradient-border bg-card p-5 md:p-6 flex items-center gap-4 min-h-[140px] animate-rise" style={{ animationDelay: "0.55s" }}>
            <div className="flex text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <div className="flex-1">
              <p className="font-display text-lg leading-tight">Clienti felici, dalle <span className="text-gradient-pink">Dolomiti a Milano.</span></p>
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
            <div key={s.n} className="group flex items-center gap-3 pt-3 relative">
              <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary/60 via-primary/20 to-transparent" />
              <span className="text-primary">{s.n}</span>
              <span>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
