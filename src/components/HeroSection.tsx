import { ArrowUpRight } from "lucide-react";
import StarFour from "@/components/icons/StarFour";
import { useI18n } from "@/contexts/I18nContext";
import logo from "@/assets/logo.png";
import heroStormPeakAsset from "@/assets/hero-k2-natural.jpg.asset.json";
const heroStormPeak = heroStormPeakAsset.url;
import sceneCabin from "@/assets/scene-cabin.jpg";
import sceneBridge from "@/assets/scene-bridge.jpg";
import MountainOfTheHour from "@/components/MountainOfTheHour";

const HeroSection = () => {
  const { t } = useI18n();

  return (
    <section className="relative pt-28 md:pt-36 pb-12 md:pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* BENTO GRID */}
        <div className="grid grid-cols-12 grid-rows-[auto] gap-3 md:gap-4">
          {/* Headline card — large */}
          <div className="col-span-12 lg:col-span-8 row-span-2 relative gradient-border rounded-2xl md:rounded-3xl bg-card p-5 md:p-12 flex flex-col justify-between min-h-[360px] md:min-h-[580px] overflow-hidden animate-rise" style={{ animationDelay: "0.05s" }}>
            {/* Animated gradient blob inside card */}
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-50 blur-3xl animate-blob pointer-events-none" style={{ background: "radial-gradient(circle, #1e6bd6 0%, transparent 70%)" }} />
            <div>
              <p className="eyebrow mb-6 md:mb-8">
                <span className="inline-block w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
                Capitolo I · L'Ascensione
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

          {/* Mountain of the hour — drone live feed card */}
          <MountainOfTheHour />

          {/* Stat 1 */}
          <div className="col-span-6 md:col-span-4 lg:col-span-3 relative overflow-hidden rounded-xl md:rounded-2xl gradient-border bg-card p-3.5 md:p-6 flex flex-col justify-between min-h-[100px] md:min-h-[140px] animate-rise" style={{ animationDelay: "0.25s" }}>
            <img src={sceneCabin} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-br from-card/85 via-card/70 to-card/95" />
            <div className="relative flex flex-col justify-between h-full">
            <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.3em] text-foreground/60">01</span>
            <div>
              <p className="font-display text-3xl md:text-5xl leading-none text-gradient">50+</p>
              <p className="text-[10px] md:text-xs uppercase tracking-wider text-foreground/60 mt-1.5 md:mt-2">{t("hero.stat1")}</p>
            </div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="col-span-6 md:col-span-4 lg:col-span-3 rounded-xl md:rounded-2xl p-3.5 md:p-6 flex flex-col justify-between min-h-[100px] md:min-h-[140px] text-primary-foreground animate-rise animate-glow-pulse" style={{ background: "var(--gradient-brand)", backgroundSize: "200% 200%", animationDelay: "0.35s" }}>
            <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.3em] opacity-80">02</span>
            <div>
              <p className="font-display text-3xl md:text-5xl leading-none">7<span className="opacity-70">gg</span></p>
              <p className="text-[10px] md:text-xs uppercase tracking-wider opacity-90 mt-1.5 md:mt-2">Consegna max</p>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="col-span-12 md:col-span-4 lg:col-span-2 relative overflow-hidden rounded-xl md:rounded-2xl gradient-border bg-card p-3.5 md:p-6 flex flex-col justify-between min-h-[100px] md:min-h-[140px] animate-rise" style={{ animationDelay: "0.45s" }}>
            <img src={sceneBridge} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-br from-card/85 via-card/70 to-card/95" />
            <div className="relative flex flex-col justify-between h-full">
            <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.3em] text-foreground/60">03</span>
            <div>
              <p className="font-display text-3xl md:text-5xl leading-none text-gradient">100%</p>
              <p className="text-[10px] md:text-xs uppercase tracking-wider text-foreground/60 mt-1.5 md:mt-2">{t("hero.stat3")}</p>
            </div>
            </div>
          </div>

          {/* Quick rating card */}
          <div className="col-span-12 lg:col-span-4 relative overflow-hidden rounded-xl md:rounded-2xl gradient-border bg-card p-3.5 md:p-6 flex items-center gap-3 md:gap-4 min-h-[100px] md:min-h-[140px] animate-rise" style={{ animationDelay: "0.55s" }}>
            <img src={heroStormPeak} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />
            <div className="absolute inset-0 bg-gradient-to-r from-card/90 via-card/70 to-card/90" />
            <div className="relative flex items-center gap-4 w-full">
            <div className="flex text-primary gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarFour key={i} size={14} />
              ))}
            </div>
            <div className="flex-1">
              <p className="font-display text-sm md:text-lg leading-tight">Clienti che tornano, <span className="text-gradient-pink">dalle Dolomiti a Milano.</span></p>
              <p className="text-[9px] md:text-[10px] uppercase tracking-wider text-foreground/60 mt-1">Recensioni verificate</p>
            </div>
            </div>
          </div>
        </div>

        {/* Marquee tagline strip — moved below the bento grid / 50+ stat */}
        <div className="relative overflow-hidden mt-5 md:mt-10 py-2.5 md:py-3 border-y border-primary/20" style={{ background: "linear-gradient(90deg, transparent, hsl(212 90% 45% / 0.10), transparent)" }}>
          <div className="flex gap-8 md:gap-12 whitespace-nowrap animate-marquee font-display uppercase text-lg md:text-3xl tracking-tight" style={{ width: "max-content" }}>
            {Array.from({ length: 2 }).map((_, group) => (
              <div key={group} className="flex gap-8 md:gap-12 items-center">
                {["Siti Su Misura", "Identità Visiva", "Posizionamento Google", "Menu Digitali", "Pagine d'Atterraggio", "Cura Continua"].map((w, i) => (
                  <span key={i} className="flex items-center gap-8 md:gap-12 text-foreground/85">
                    {w}
                    <StarFour size={18} style={{ color: "hsl(212 90% 55%)" }} />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Trail strip below bento */}
        <div className="mt-10 md:mt-14 grid grid-cols-3 gap-3 md:gap-4 text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-foreground/60">
          {[
            { n: "II", l: "Chi sono" },
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
