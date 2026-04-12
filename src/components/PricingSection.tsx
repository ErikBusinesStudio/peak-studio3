import { Check } from "lucide-react";

const plans = [
  {
    name: "Base",
    price: "297",
    desc: "Sito vetrina professionale",
    recommended: false,
    features: [
      "Sito one-page responsive",
      "Design moderno e personalizzato",
      "Ottimizzazione SEO base",
      "Modulo contatti",
      "Collegamento social media",
      "Consegna in 48-72h",
    ],
  },
  {
    name: "Pro",
    price: "497",
    desc: "Sito completo con funzionalità avanzate",
    recommended: true,
    features: [
      "Tutto del piano Base",
      "Menu digitale / Catalogo prodotti",
      "Sistema prenotazioni / ordini",
      "QR Code personalizzato",
      "Google Maps integrato",
      "Supporto prioritario 30 giorni",
    ],
  },
];

const PricingSection = () => {
  return (
    <section id="prezzi" className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
          Prezzi semplici
        </h2>
        <p className="text-muted-foreground text-center mb-16 max-w-md mx-auto">
          Nessun costo nascosto. Scegli il piano giusto per te.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 border ${
                plan.recommended
                  ? "border-primary bg-card glow"
                  : "border-border bg-card"
              }`}
            >
              {plan.recommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                  Consigliato
                </span>
              )}
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mt-1">{plan.desc}</p>
              <div className="mt-6 mb-8">
                <span className="text-4xl font-black">€{plan.price}</span>
                <span className="text-muted-foreground text-sm ml-1">una tantum</span>
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
                className={`block text-center py-3 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90 ${
                  plan.recommended
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
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
