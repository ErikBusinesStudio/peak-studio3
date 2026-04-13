import { Check, Zap, Crown } from "lucide-react";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useI18n } from "@/contexts/I18nContext";

const PricingSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const { t } = useI18n();

  const sitePlans = [
    {
      name: "Starter", price: "99", desc: t("pricing.starter.desc"), recommended: false,
      features: [t("pricing.starter.f1"), t("pricing.starter.f2"), t("pricing.starter.f3"), t("pricing.starter.f4"), t("pricing.starter.f5"), t("pricing.starter.f6"), t("pricing.starter.f7")],
    },
    {
      name: "Business", price: "149", desc: t("pricing.business.desc"), recommended: true,
      features: [t("pricing.business.f1"), t("pricing.business.f2"), t("pricing.business.f3"), t("pricing.business.f4"), t("pricing.business.f5"), t("pricing.business.f6"), t("pricing.business.f7"), t("pricing.business.f8")],
    },
    {
      name: "Pro", price: "199", desc: t("pricing.pro.desc"), recommended: false,
      features: [t("pricing.pro.f1"), t("pricing.pro.f2"), t("pricing.pro.f3"), t("pricing.pro.f4"), t("pricing.pro.f5"), t("pricing.pro.f6"), t("pricing.pro.f7")],
    },
  ];

  const subscriptionPlans = [
    {
      name: t("pricing.sub1.name"), monthlyPrice: "29", yearlyPrice: "290", yearlySaving: "58", desc: t("pricing.sub1.desc"), popular: false,
      features: [t("pricing.sub1.f1"), t("pricing.sub1.f2"), t("pricing.sub1.f3"), t("pricing.sub1.f4"), t("pricing.sub1.f5")],
    },
    {
      name: t("pricing.sub2.name"), monthlyPrice: "59", yearlyPrice: "590", yearlySaving: "118", desc: t("pricing.sub2.desc"), popular: true,
      features: [t("pricing.sub2.f1"), t("pricing.sub2.f2"), t("pricing.sub2.f3"), t("pricing.sub2.f4"), t("pricing.sub2.f5"), t("pricing.sub2.f6")],
    },
    {
      name: t("pricing.sub3.name"), monthlyPrice: "19", yearlyPrice: "190", yearlySaving: "38", desc: t("pricing.sub3.desc"), popular: false,
      features: [t("pricing.sub3.f1"), t("pricing.sub3.f2"), t("pricing.sub3.f3"), t("pricing.sub3.f4"), t("pricing.sub3.f5"), t("pricing.sub3.f6")],
    },
  ];

  return (
    <section id="prezzi" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/15 rounded-full blur-[250px]" />
      <div className="container mx-auto relative z-10" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="red-line mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-black mb-4">{t("pricing.title1")} <span className="text-gradient">{t("pricing.title2")}</span></h2>
          <p className="text-muted-foreground max-w-lg mx-auto">{t("pricing.subtitle")}</p>
        </div>

        <div className={`mb-20 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h3 className="text-2xl md:text-3xl font-black text-center mb-2">{t("pricing.sites.title")}</h3>
          <p className="text-center text-muted-foreground text-sm mb-10">{t("pricing.sites.subtitle")}</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {sitePlans.map((plan, i) => (
              <div key={plan.name} className={`relative rounded-xl p-8 border transition-all duration-500 hover:scale-[1.03] ${plan.recommended ? "border-primary/60 bg-card glow scale-[1.02] md:scale-105" : "border-border bg-card hover:border-border/80"} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${i * 150}ms` }}>
                {plan.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <Zap className="w-3 h-3" /> {t("pricing.mostChosen")}
                  </span>
                )}
                <h4 className="text-2xl font-black">{plan.name}</h4>
                <p className="text-muted-foreground text-sm mt-1">{plan.desc}</p>
                <div className="mt-6 mb-6">
                  <span className="text-5xl font-black">€{plan.price}</span>
                  <span className="text-muted-foreground text-sm ml-2">{t("pricing.oneTime")}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm"><Check className="w-4 h-4 text-primary mt-0.5 shrink-0" /><span>{f}</span></li>
                  ))}
                </ul>
                <a href="#contatti" className={`block text-center py-3.5 rounded-md font-bold text-sm uppercase tracking-wider transition-all hover:scale-105 ${plan.recommended ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-primary/10 text-primary hover:bg-primary/20"}`}>{t("pricing.wantIt")}</a>
              </div>
            ))}
          </div>
        </div>

        <div className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h3 className="text-2xl md:text-3xl font-black text-center mb-2">{t("pricing.subs.title")}</h3>
          <p className="text-center text-muted-foreground text-sm mb-6">{t("pricing.subs.subtitle")}</p>
          <div className="flex items-center justify-center gap-4 mb-10">
            <button onClick={() => setBillingPeriod("monthly")} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${billingPeriod === "monthly" ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"}`}>{t("pricing.monthly")}</button>
            <button onClick={() => setBillingPeriod("yearly")} className={`px-5 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${billingPeriod === "yearly" ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"}`}>
              {t("pricing.yearly")}
              <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-bold">{t("pricing.freeMonths")}</span>
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {subscriptionPlans.map((plan, i) => (
              <div key={plan.name} className={`relative rounded-xl p-8 border transition-all duration-500 hover:scale-[1.03] ${plan.popular ? "border-primary/60 bg-card glow" : "border-border bg-card hover:border-border/80"} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${(i + 3) * 150}ms` }}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <Crown className="w-3 h-3" /> {t("pricing.recommended")}
                  </span>
                )}
                <h4 className="text-2xl font-black">{plan.name}</h4>
                <p className="text-muted-foreground text-sm mt-1">{plan.desc}</p>
                <div className="mt-6 mb-2">
                  <span className="text-5xl font-black">€{billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}</span>
                  <span className="text-muted-foreground text-sm ml-2">/{billingPeriod === "monthly" ? t("pricing.month") : t("pricing.year")}</span>
                </div>
                {billingPeriod === "yearly" && <p className="text-green-400 text-xs font-bold mb-4">{t("pricing.save")} €{plan.yearlySaving}/{t("pricing.year")}</p>}
                {billingPeriod === "monthly" && <div className="mb-4" />}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm"><Check className="w-4 h-4 text-primary mt-0.5 shrink-0" /><span>{f}</span></li>
                  ))}
                </ul>
                <a href="#contatti" className={`block text-center py-3.5 rounded-md font-bold text-sm uppercase tracking-wider transition-all hover:scale-105 ${plan.popular ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-primary/10 text-primary hover:bg-primary/20"}`}>{t("pricing.activate")}</a>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-10 animate-pulse">{t("pricing.limited")}</p>
      </div>
    </section>
  );
};

export default PricingSection;
