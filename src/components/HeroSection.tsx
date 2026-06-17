import logo from "@/assets/logo.png";
import { useI18n } from "@/contexts/I18nContext";

const HeroSection = () => {
  const { t } = useI18n();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Atmospheric light rays */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 left-1/4 w-[2px] h-[160%] bg-gradient-to-b from-white/12 via-white/4 to-transparent rotate-[14deg] blur-sm" />
        <div className="absolute -top-20 left-1/3 w-[3px] h-[160%] bg-gradient-to-b from-white/16 via-white/5 to-transparent rotate-[10deg] blur-sm" />
        <div className="absolute -top-20 left-1/2 w-[3px] h-[160%] bg-gradient-to-b from-white/20 via-white/6 to-transparent rotate-[6deg] blur-sm" />
        <div className="absolute -top-20 left-2/3 w-[2px] h-[160%] bg-gradient-to-b from-white/12 via-white/4 to-transparent rotate-[-4deg] blur-sm" />
        <div className="absolute -top-20 left-3/4 w-[2px] h-[160%] bg-gradient-to-b from-white/10 via-white/3 to-transparent rotate-[-10deg] blur-sm" />
        {/* Floating particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30 animate-particle"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 80}%`,
              animationDuration: `${10 + Math.random() * 15}s`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      {/* Subtle orb glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[180px] animate-pulse-slow" />


      <div className="container mx-auto relative z-10 px-4 pt-20 md:pt-24">
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-5">
          <img src={logo} alt="Peak Studio" className="w-56 md:w-[420px] lg:w-[500px] drop-shadow-2xl animate-fade-in-up" width={1024} height={512} />

          <div className="space-y-4 md:space-y-6 max-w-3xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <p className="eyebrow mx-auto justify-center">I — The Peak</p>
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
              {t("hero.title1")}
              <br />
              <span className="text-gradient">{t("hero.title2")}</span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-xl mx-auto font-light">{t("hero.subtitle")}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <a href="#contatti" className="bg-primary text-primary-foreground px-8 py-3 md:px-10 md:py-4 rounded-md text-sm font-bold uppercase tracking-wider hover:scale-105 transition-all glow">
              {t("hero.cta1")}
            </a>
            <a href="#portfolio" className="border border-border/60 text-foreground px-8 py-3 md:px-10 md:py-4 rounded-md text-sm font-bold uppercase tracking-wider hover:border-primary/40 hover:bg-primary/5 hover:scale-105 transition-all">
              {t("hero.cta2")}
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-16 pt-6 md:pt-8 border-t border-border/40 mt-6 md:mt-8 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <div className="text-center">
              <p className="text-2xl md:text-4xl font-black text-primary">50+</p>
              <p className="text-[10px] md:text-xs uppercase tracking-wider text-muted-foreground mt-1">{t("hero.stat1")}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-4xl font-black text-primary">48h</p>
              <p className="text-[10px] md:text-xs uppercase tracking-wider text-muted-foreground mt-1">{t("hero.stat2")}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-4xl font-black text-primary">100%</p>
              <p className="text-[10px] md:text-xs uppercase tracking-wider text-muted-foreground mt-1">{t("hero.stat3")}</p>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/50 animate-fade-in-up" style={{ animationDelay: "1s" }}>
          <span className="text-[10px] uppercase tracking-[0.4em]">Descend</span>
          <div className="w-px h-12 bg-gradient-to-b from-foreground/50 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
