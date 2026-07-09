import { SearchX, AlertTriangle, TrendingDown, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useI18n } from "@/contexts/I18nContext";

const UrgencySection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useI18n();

  const losses = [
    { icon: SearchX,       stat: t("urgency.l1.stat"), title: t("urgency.l1.title"), desc: t("urgency.l1.desc") },
    { icon: AlertTriangle, stat: t("urgency.l2.stat"), title: t("urgency.l2.title"), desc: t("urgency.l2.desc") },
    { icon: Users,         stat: t("urgency.l3.stat"), title: t("urgency.l3.title"), desc: t("urgency.l3.desc") },
    { icon: TrendingDown,  stat: t("urgency.l4.stat"), title: t("urgency.l4.title"), desc: t("urgency.l4.desc") },
  ];

  return (
    <section className="section-padding relative">
      <div className="container mx-auto relative z-10" ref={ref}>
        <div className={`max-w-3xl mb-10 md:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-4 mb-6">
            <span className="w-10 h-px bg-primary" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-semibold text-primary">Perché ora</span>
          </div>
          <h2 className="text-3xl md:text-6xl font-display uppercase leading-[0.9] tracking-tight mb-4">
            {t("urgency.title1")} <span className="text-primary">{t("urgency.title2")}</span> {t("urgency.title3")}
          </h2>
          <p className="text-muted-foreground max-w-lg text-sm md:text-base leading-relaxed">{t("urgency.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-border">
          {losses.map((item, i) => (
            <div
              key={i}
              className={`relative p-6 md:p-8 border-b border-r border-border last:border-r-0 md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <item.icon className="w-6 h-6 text-primary mb-6" strokeWidth={1.5} />
              <div className="font-display text-3xl md:text-5xl text-foreground mb-3">{item.stat}</div>
              <h3 className="font-semibold text-sm mb-2 leading-snug uppercase tracking-wide">{item.title}</h3>
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className={`mt-12 md:mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-border pt-8 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">Disponibilità mensile</p>
            <p className="font-display text-xl md:text-2xl text-foreground uppercase">3 nuovi progetti · questo mese</p>
          </div>
          <a href="#prezzi" className="btn-cta">
            {t("urgency.cta")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default UrgencySection;
