import logo from "@/assets/logo.png";
import { useI18n } from "@/contexts/I18nContext";

const HeroSection = () => {
  const { t } = useI18n();

  return (
    <div className="hero-mountain-wobble relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto relative z-10 px-4 pt-20 md:pt-24">
        <p className="text-center font-display text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 animate-fade-in-up">
          {t("alt.peakEyebrow")}
        </p>
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-5">
          <img src={logo} alt="Peak Studio" className="w-56 md:w-[420px] lg:w-[500px] drop-shadow-2xl animate-fade-in-up" width={1024} height={512} />

          <div className="space-y-4 md:space-y-6 max-w-3xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h1 className="font-display text-3xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              {t("hero.title1")}
              <br />
              <span className="text-gradient">{t("hero.title2")}</span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-xl mx-auto">{t("hero.subtitle")}</p>
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
              <p className="font-display text-2xl md:text-4xl font-bold text-primary">50+</p>
              <p className="text-[10px] md:text-xs uppercase tracking-wider text-muted-foreground mt-1">{t("hero.stat1")}</p>
            </div>
            <div className="text-center">
              <p className="font-display text-2xl md:text-4xl font-bold text-primary">48h</p>
              <p className="text-[10px] md:text-xs uppercase tracking-wider text-muted-foreground mt-1">{t("hero.stat2")}</p>
            </div>
            <div className="text-center">
              <p className="font-display text-2xl md:text-4xl font-bold text-primary">100%</p>
              <p className="text-[10px] md:text-xs uppercase tracking-wider text-muted-foreground mt-1">{t("hero.stat3")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
