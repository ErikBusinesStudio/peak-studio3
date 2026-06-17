import { Globe, Paintbrush, Rocket, BarChart3 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useI18n } from "@/contexts/I18nContext";

const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useI18n();

  const services = [
    { icon: Paintbrush, title: t("services.s1.title"), description: t("services.s1.desc"), number: "01" },
    { icon: Globe, title: t("services.s2.title"), description: t("services.s2.desc"), number: "02" },
    { icon: Rocket, title: t("services.s3.title"), description: t("services.s3.desc"), number: "03" },
    { icon: BarChart3, title: t("services.s4.title"), description: t("services.s4.desc"), number: "04" },
  ];

  return (
    <section id="servizi" className="section-padding relative overflow-hidden">
      <div className="hidden md:block absolute top-0 right-0 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[250px] animate-pulse-slow" />
      <div className="hidden md:block absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[200px] animate-float" />
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[60%] bg-gradient-to-b from-transparent via-primary/10 to-transparent" />

      <div className="container mx-auto relative z-10" ref={ref}>
        <div className={`mb-10 md:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="eyebrow mb-4 md:mb-6">II — The Forest</p>
          <h2 className="text-2xl md:text-5xl font-black mb-3">{t("services.title")}</h2>
          <p className="text-muted-foreground max-w-md text-base md:text-lg">{t("services.subtitle")}</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {services.map((s, i) => (
            <div key={s.number} className={`group bg-card border border-border rounded-xl p-4 md:p-8 hover:border-primary/40 hover:scale-[1.04] transition-all duration-500 relative overflow-hidden ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${i * 100}ms` }}>
              <span className="absolute top-2 right-4 text-6xl font-black text-foreground/[0.03] select-none hidden md:block">{s.number}</span>
              <div className="relative z-10">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 md:mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <s.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <h3 className="text-sm md:text-lg font-bold mb-1 md:mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
