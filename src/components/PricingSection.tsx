import { Check, Zap, Crown } from "lucide-react";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const sitePlans = [
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
      "Consegna in 24–48h",
      "30 giorni di supporto incluso",
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
      "30 giorni di supporto incluso",
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
      "60 giorni di supporto incluso",
    ],
  },
];

const subscriptionPlans = [
  {
    name: "Gestione Base",
    monthlyPrice: "29",
    yearlyPrice: "290",
    yearlySaving: "58",
    desc: "Manutenzione e aggiornamenti essenziali",
    features: [
      "Aggiornamenti contenuti (testi e immagini)",
      "Backup settimanale del sito",
      "Monitoraggio uptime 24/7",
      "Supporto email prioritario",
      "Fix bug e problemi tecnici",
    ],
  },
  {
    name: "Gestione Pro",
    monthlyPrice: "59",
    yearlyPrice: "590",
    yearlySaving: "118",
    desc: "Crescita continua e posizionamento",
    popular: true,
    features: [
      "Tutto della Gestione Base",
      "SEO mensile (report + ottimizzazioni)",
      "Modifiche grafiche illimitate",
      "Analisi traffico e conversioni",
      "Consulenza strategica mensile",
      "Priorità assoluta nel supporto",
    ],
  },
  {
    name: "QR Menu Digitale",
    monthlyPrice: "19",
    yearlyPrice: "190",
    yearlySaving: "38",
    desc: "Menu digitale per ristoranti e bar",
    features: [
      "Menu digitale personalizzato",
      "QR Code stampabile incluso",
      "Aggiornamenti piatti illimitati",
      "Design brandizzato",
      "Supporto multilingua",
      "Categorie e foto piatti",
    ],
  },
];

const PricingSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  return (
    <section id="prezzi" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/15 rounded-full blur-[250px]" />

      <div className="container mx-auto relative z-10" ref={ref}>
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="red-line mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Investi poco. <span className="text-gradient">Guadagna tanto.</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Nessun costo nascosto. Un investimento, risultati per sempre. Scegli il piano perfetto per la tua attività.
          </p>
        </div>

        {/* SITI WEB - One-time */}
        <div className={`mb-20 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h3 className="text-2xl md:text-3xl font-black text-center mb-2">
            🚀 Siti Web — Pagamento Unico
          </h3>
          <p className="text-center text-muted-foreground text-sm mb-10">
            Paghi una volta, il sito è tuo per sempre. Nessun canone.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {sitePlans.map((plan, i) => (
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
                <h4 className="text-2xl font-black">{plan.name}</h4>
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
        </div>

        {/* ABBONAMENTI */}
        <div className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h3 className="text-2xl md:text-3xl font-black text-center mb-2">
            🔄 Servizi Continuativi — Abbonamento
          </h3>
          <p className="text-center text-muted-foreground text-sm mb-6">
            Fai crescere il tuo sito ogni mese. Gestione, SEO, menu digitale e altro.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                billingPeriod === "monthly"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              Mensile
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                billingPeriod === "yearly"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              Annuale
              <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-bold">
                -2 MESI GRATIS
              </span>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {subscriptionPlans.map((plan, i) => (
              <div
                key={plan.name}
                className={`relative rounded-xl p-8 border transition-all duration-500 hover:scale-[1.03] ${
                  plan.popular
                    ? "border-primary/60 bg-card glow"
                    : "border-border bg-card hover:border-border/80"
                } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${(i + 3) * 150}ms` }}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <Crown className="w-3 h-3" /> Consigliato
                  </span>
                )}
                <h4 className="text-2xl font-black">{plan.name}</h4>
                <p className="text-muted-foreground text-sm mt-1">{plan.desc}</p>
                <div className="mt-6 mb-2">
                  <span className="text-5xl font-black">
                    €{billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                  </span>
                  <span className="text-muted-foreground text-sm ml-2">
                    /{billingPeriod === "monthly" ? "mese" : "anno"}
                  </span>
                </div>
                {billingPeriod === "yearly" && (
                  <p className="text-green-400 text-xs font-bold mb-4">
                    Risparmi €{plan.yearlySaving}/anno
                  </p>
                )}
                {billingPeriod === "monthly" && <div className="mb-4" />}
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
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "bg-primary/10 text-primary hover:bg-primary/20"
                  }`}
                >
                  Attiva ora →
                </a>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-10 animate-pulse">
          ⚡ Offerta limitata — Prezzi in aumento a breve
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
