import { Link } from "react-router-dom";
import { ArrowRight, Globe, Wrench, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useI18n } from "@/contexts/I18nContext";
import imgSitiWeb from "@/assets/service-siti-web.jpg";
import imgAbbonamenti from "@/assets/service-abbonamenti.jpg";
import imgBranding from "@/assets/service-branding.jpg";

const tiers = [
  {
    key: "sites",
    title: "Siti Web",
    image: imgSitiWeb,
    icon: Globe,
    eyebrow: "III — The Forge",
    desc: "Starter, Business e Premium. Un sito su misura per ogni fase della crescita.",
  },
  {
    key: "monthly",
    title: "Canoni Mensili",
    image: imgAbbonamenti,
    icon: Wrench,
    eyebrow: "IV — The Ascent",
    desc: "Manutenzione, crescita e supporto prioritario per tenere tutto sotto controllo.",
  },
  {
    key: "extra",
    title: "Servizi Extra",
    image: imgBranding,
    icon: Sparkles,
    eyebrow: "V — The Toolkit",
    desc: "Logo, volantini, Google Business, landing page, menu QR e automazioni.",
  },
];

const PricingTeaser = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useI18n();

  return (
    <section id="prezzi" className="section-padding relative overflow-hidden scroll-mt-24">
      {/* Decorative glow orbs */}
      <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[230px] animate-pulse-slow" />
      <div className="hidden md:block absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[180px] animate-float" />

      <div className="container mx-auto relative z-10" ref={ref}>
        <div
          className={`text-center mb-10 md:mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="eyebrow mx-auto justify-center mb-4">II — The Vista</p>
          <h2 className="text-2xl md:text-4xl font-black mb-3">
            I nostri <span className="text-gradient">piani</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Soluzioni chiare per ogni esigenza. Scegli la categoria e scopri il dettaglio.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto mb-10">
          {tiers.map((tier, i) => (
            <Link
              key={tier.key}
              to="/prezzi"
              className={`group relative rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/60 hover:scale-[1.03] hover:glow transition-all duration-500 flex flex-col ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={tier.image}
                  alt={tier.title}
                  loading="lazy"
                  width={768}
                  height={512}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-background/80 backdrop-blur flex items-center justify-center border border-border">
                  <tier.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="p-6 md:p-7 flex flex-col flex-1">
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-foreground/50 mb-2">
                  {tier.eyebrow}
                </p>
                <h3 className="text-lg md:text-xl font-black mb-1">{tier.title}</h3>
                <p className="text-muted-foreground text-xs md:text-sm flex-1">{tier.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary">
                  Scopri i piani <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/prezzi"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md text-sm font-bold uppercase tracking-wider hover:scale-105 transition-all glow"
          >
            {t("teaser.all")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingTeaser;
