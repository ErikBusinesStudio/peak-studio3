import { Check, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const plans = [
  {
    name: "Starter",
    price: "99",
    desc: "Il primo passo per battere la concorrenza",
    recommended: false,
    features: [
      "Sito one-page d'impatto",
      "Design moderno e aggressivo",
      "Ottimizzazione mobile perfetta",
      "Sezione contatti (telefono + WhatsApp)",
      "Google Maps integrata",
      "Consegna in 48h",
    ],
  },
  {
    name: "Business",
    price: "149",
    desc: "La scelta dei vincenti",
    recommended: true,
    features: [
      "Sito 3–5 pagine strategiche",
      "Design personalizzato premium",
      "Velocità ottimizzata al massimo",
      "WhatsApp + form contatti avanzato",
      "Struttura studiata per vendere",
      "SEO per farti trovare su Google",
      "1 funzione a scelta (menu, prenotazioni, orari)",
    ],
  },
  {
    name: "Pro",
    price: "199",
    desc: "Per chi vuole dominare il mercato",
    recommended: false,
    features: [
      "Tutto del Business incluso",
      "Pagine extra illimitate",
      "SEO avanzato professionale",
      "Testi persuasivi scritti per te",
      "Sistema ordini o prenotazioni",
      "Priorità assoluta di consegna",
    ],
  },
];

const PricingSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="prezzi" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/15 rounded-full blur-[250px]" />

      <div className="container mx-auto relative z-10" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="red-line mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Investi poco. <span className="text-gradient">Guadagna tanto.</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Paghi una volta sola. Il sito è tuo per sempre. Zero abbonamenti, zero sorprese.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative rounded-xl p-8 border transition-all duration-500 hover:scale-[1.03] ${
                plan.recommended
                  ? "border-primary/60 bg-card glow scale-[1.02] md:scale-105"
                  : "border-border bg-card hover:border-border/80"
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {plan.recommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Più scelto
                </span>
              )}
              <h3 className="text-2xl font-black">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mt-1">{plan.desc}</p>
              <div className="mt-6 mb-6">
                <span className="text-5xl font-black">€{plan.price}</span>
                <span className="text-muted-foreground text-sm ml-2">una tantum</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contatti"
                className={`block text-center py-3.5 rounded-md font-bold text-sm uppercase tracking-wider transition-all hover:scale-105 ${
                  plan.recommended
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
              >
                Lo voglio →
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8 animate-pulse">
          ⚡ Offerta limitata — Prezzi in aumento a breve
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
