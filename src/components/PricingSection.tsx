import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "297",
    desc: "Sito vetrina professionale",
    recommended: false,
    features: [
      "Sito one-page responsive",
      "Design personalizzato",
      "Ottimizzazione SEO base",
      "Modulo contatti",
      "Link social media",
      "Consegna in 48-72h",
    ],
  },
  {
    name: "Business",
    price: "497",
    desc: "Sito completo con funzionalità avanzate",
    recommended: true,
    features: [
      "Tutto del piano Starter",
      "Fino a 5 pagine",
      "Sistema prenotazioni / ordini",
      "Google Maps integrato",
      "Analytics e tracking",
      "Supporto prioritario 30 giorni",
    ],
  },
];

const PricingSection = () => {
  return (
    <section id="prezzi" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="red-line mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Prezzi chiari
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Nessun costo nascosto. Paghi una volta, il sito è tuo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl p-8 md:p-10 border transition-all duration-300 ${
                plan.recommended
                  ? "border-primary/60 bg-card glow"
                  : "border-border bg-card hover:border-border/80"
              }`}
            >
              {plan.recommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  Consigliato
                </span>
              )}
              <h3 className="text-2xl font-black">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mt-1">{plan.desc}</p>
              <div className="mt-8 mb-8">
                <span className="text-5xl font-black">€{plan.price}</span>
                <span className="text-muted-foreground text-sm ml-2">una tantum</span>
              </div>
              <ul className="space-y-4 mb-10">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contatti"
                className={`block text-center py-3.5 rounded-md font-bold text-sm uppercase tracking-wider transition-all ${
                  plan.recommended
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                Scegli {plan.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
