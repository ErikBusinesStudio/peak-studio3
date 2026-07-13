import { MessageSquare, Code2, Rocket } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useI18n } from "@/contexts/I18nContext";

const HowItWorksSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useI18n();

  const steps = [
    { icon: MessageSquare, number: "01", title: t("how.s1.title"), desc: t("how.s1.desc") },
    { icon: Code2, number: "02", title: t("how.s2.title"), desc: t("how.s2.desc") },
    { icon: Rocket, number: "03", title: t("how.s3.title"), desc: t("how.s3.desc") },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="hidden md:block absolute bottom-0 left-0 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[220px]" />
      <div className="container mx-auto relative z-10" ref={ref}>
        <div className={`text-center mb-10 md:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="red-line mx-auto mb-4 md:mb-6" />
          <h2 className="text-2xl md:text-5xl font-black mb-3">
            {t("how.title1")} <span className="text-gradient">{t("how.title2")}</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base">{t("how.subtitle")}</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <div key={step.number} className={`relative text-center p-4 md:p-8 rounded-xl border border-border bg-card/50 transition-all duration-500 hover:border-primary/40 hover:scale-[1.03] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${i * 150}ms` }}>
              {i < steps.length - 1 && <div className="hidden md:block absolute top-1/2 -right-4 w-8 text-primary/40 text-2xl font-bold">→</div>}
              <div className="text-3xl md:text-5xl font-black text-primary/20 mb-2 md:mb-4">{step.number}</div>
              <div className="w-10 h-10 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                <step.icon className="w-5 h-5 md:w-7 md:h-7 text-primary" />
              </div>
              <h3 className="text-sm md:text-xl font-black mb-1 md:mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-[10px] md:text-sm leading-relaxed hidden md:block">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
