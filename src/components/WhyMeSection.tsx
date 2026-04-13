import { Zap, Eye, Clock, Shield } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useI18n } from "@/contexts/I18nContext";

const WhyMeSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useI18n();

  const reasons = [
    { icon: Zap, title: t("why.r1.title"), desc: t("why.r1.desc") },
    { icon: Eye, title: t("why.r2.title"), desc: t("why.r2.desc") },
    { icon: Clock, title: t("why.r3.title"), desc: t("why.r3.desc") },
    { icon: Shield, title: t("why.r4.title"), desc: t("why.r4.desc") },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-primary/12 rounded-full blur-[250px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[200px]" />
      <div className="container mx-auto relative z-10" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="red-line mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-black mb-4">{t("why.title")}</h2>
          <p className="text-muted-foreground max-w-md mx-auto">{t("why.subtitle")}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <div key={r.title} className={`text-center p-8 rounded-xl bg-card border border-border hover:border-primary/30 hover:scale-[1.04] transition-all duration-500 group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${i * 120}ms` }}>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <r.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">{r.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyMeSection;
