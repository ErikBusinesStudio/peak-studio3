import { Check } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const plans = [
  {
    name: "Starter",
    price: "149",
    desc: "Perfetto per iniziare online",
    recommended: false,
    features: [
      "Sito one-page",
      "Design moderno",
      "Ottimizzazione mobile",
      "Sezione contatti (telefono + WhatsApp)",
      "Google Maps integrata",
      "Consegna veloce",
    ],
  },
  {
    name: "Business",
    price: "249",
    desc: "La scelta più popolare",
    recommended: true,
    features: [
      "Sito 3–5 pagine",
      "Design personalizzato",
      "Ottimizzazione mobile + velocità",
      "WhatsApp + form contatti",
      "Struttura strategica (home, servizi, contatti)",
      "SEO base",
      "1 funzione a scelta (menu digitale, servizi, orari)",
    ],
  },
  {
    name: "Pro",
    price: "349",
    desc: "Per chi vuole il massimo",
    recommended: false,
    features: [
      "Tutto del Business",
      "Pagine extra personalizzate",
      "SEO avanzato base",
      "Testi ottimizzati inclusi",
      "Sistema ordini o prenotazioni",
      "Priorità consegna",
    ],
  },
];

const PricingSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="prezzi" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px]" />

      <div className="container mx-auto relative z-10" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="red-line mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Prezzi semplici e trasparenti
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Nessun costo nascosto. Paghi una volta, il sito è tuo.
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
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  Consigliato
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
