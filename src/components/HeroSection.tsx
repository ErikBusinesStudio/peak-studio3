import logo from "@/assets/logo.png";
import { useI18n } from "@/contexts/I18nContext";

const HeroSection = () => {
  const { t } = useI18n();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/25 rounded-full blur-[250px]" />
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-primary/20 rounded-full blur-[220px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/10 rounded-full blur-[300px]" />
      <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[200px] animate-pulse" />
      <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] bg-primary/12 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto relative z-10 px-4 pt-24">
        <div className="flex flex-col items-center text-center space-y-5">
          <img src={logo} alt="Peak Studio" className="w-80 md:w-[420px] lg:w-[500px] drop-shadow-2xl animate-fade-in-up" width={1024} height={512} />

          <div className="space-y-6 max-w-3xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
              {t("hero.title1")}
              <br />
              <span className="text-gradient">{t("hero.title2")}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">{t("hero.subtitle")}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <a href="#contatti" className="bg-primary text-primary-foreground px-10 py-4 rounded-md text-sm font-bold uppercase tracking-wider hover:scale-105 transition-all glow">
              {t("hero.cta1")}
            </a>
            <a href="#portfolio" className="border border-border/60 text-foreground px-10 py-4 rounded-md text-sm font-bold uppercase tracking-wider hover:border-primary/40 hover:bg-primary/5 hover:scale-105 transition-all">
              {t("hero.cta2")}
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16 pt-8 border-t border-border/40 mt-8 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-black text-primary">50+</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{t("hero.stat1")}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-black text-primary">48h</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{t("hero.stat2")}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-black text-primary">100%</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{t("hero.stat3")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
