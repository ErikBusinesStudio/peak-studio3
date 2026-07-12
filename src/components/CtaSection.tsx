import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Zap, Shield, Clock } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import sceneBasecamp from "@/assets/scene-basecamp.jpg";

const CtaSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useI18n();

  return (
    <section className="section-padding relative overflow-hidden">
      <img src={sceneBasecamp} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-[0.22] pointer-events-none select-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/60 to-background pointer-events-none" />
      <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/15" />
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-primary/15 rounded-full blur-[250px]" />
      <div className="container mx-auto text-center relative z-10" ref={ref}>
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl md:text-6xl font-black mb-4 md:mb-6 leading-tight">
            {t("cta.title1")}<br /><span className="text-gradient">{t("cta.title2")}</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg mb-5 md:mb-6 max-w-lg mx-auto">{t("cta.subtitle")}</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8 md:mb-10">
            <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground"><Clock className="w-4 h-4 text-primary" /><span>{t("cta.ready")}</span></div>
            <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground"><Shield className="w-4 h-4 text-primary" /><span>{t("cta.guarantee")}</span></div>
            <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground"><Zap className="w-4 h-4 text-primary" /><span>{t("cta.from")}</span></div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <a href="#contatti" className="inline-block bg-primary text-primary-foreground px-8 py-3 md:px-12 md:py-4 rounded-md text-sm font-bold uppercase tracking-wider hover:opacity-90 hover:scale-105 transition-all glow">{t("cta.cta1")}</a>
            <a href="https://wa.me/393913168231?text=Ciao!%20Vorrei%20un%20preventivo%20gratuito%20per%20il%20mio%20sito%20web." target="_blank" rel="noopener noreferrer" className="inline-block bg-primary/10 text-primary px-8 py-3 md:px-12 md:py-4 rounded-md text-sm font-bold uppercase tracking-wider hover:bg-primary/20 hover:scale-105 transition-all">{t("cta.cta2")}</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
