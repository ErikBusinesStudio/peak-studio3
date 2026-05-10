import { Check, Zap, Crown, Sparkles, QrCode, Smartphone, Globe, Wrench, TrendingUp, Headphones, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type Plan = {
  name: string;
  price: string;
  priceSuffix?: string;
  desc: string;
  badge?: string;
  badgeIcon?: React.ReactNode;
  highlighted?: boolean;
  features: string[];
  cta: string;
  icon?: React.ReactNode;
};

const sitePlans: Plan[] = [
  {
    name: "Base",
    price: "300",
    priceSuffix: "una tantum",
    desc: "Ideale per piccole attività che vogliono iniziare online",
    icon: <Globe className="w-5 h-5" />,
    features: [
      "1 pagina (landing page)",
      "Informazioni principali (contatti, servizi, orari)",
      "Design semplice e pulito",
      "Ottimizzazione mobile",
      "Pronto per essere trovato su Google",
    ],
    cta: "Richiedi informazioni",
  },
  {
    name: "Standard",
    price: "500",
    priceSuffix: "una tantum",
    desc: "La scelta migliore per attrarre e convertire più clienti",
    badge: "Più scelto",
    badgeIcon: <Zap className="w-3 h-3" />,
    highlighted: true,
    icon: <Sparkles className="w-5 h-5" />,
    features: [
      "3-5 pagine professionali",
      "Design moderno e curato",
      "Ottimizzazione mobile",
      "1 revisione inclusa",
      "Struttura pensata per convertire clienti",
    ],
    cta: "Richiedi informazioni",
  },
  {
    name: "Premium",
    price: "800+",
    priceSuffix: "una tantum",
    desc: "Per chi vuole il massimo: sito completo e personalizzato",
    icon: <Crown className="w-5 h-5" />,
    features: [
      "Sito completo personalizzato",
      "Design professionale avanzato",
      "Integrazioni (WhatsApp, prenotazioni, ecc.)",
      "Più revisioni incluse",
      "Priorità nella consegna",
    ],
    cta: "Richiedi informazioni",
  },
];

const managementPlans: Plan[] = [
  {
    name: "Basic",
    price: "30",
    priceSuffix: "/mese",
    desc: "Il tuo sito sempre online e sicuro, senza pensieri",
    icon: <Wrench className="w-5 h-5" />,
    features: [
      "Hosting e sicurezza inclusi",
      "Aggiornamenti tecnici base",
      "Backup periodici",
    ],
    cta: "Attiva ora",
  },
  {
    name: "Growth",
    price: "50",
    priceSuffix: "/mese",
    desc: "Mantieni il sito vivo con modifiche e supporto rapido",
    badge: "Consigliato",
    badgeIcon: <TrendingUp className="w-3 h-3" />,
    highlighted: true,
    icon: <Sparkles className="w-5 h-5" />,
    features: [
      "Tutto del piano Basic",
      "Piccole modifiche ai contenuti",
      "Supporto rapido",
    ],
    cta: "Attiva ora",
  },
  {
    name: "Pro",
    price: "80–100",
    priceSuffix: "/mese",
    desc: "Per chi vuole crescere davvero, con consigli e priorità",
    icon: <Headphones className="w-5 h-5" />,
    features: [
      "Tutto del piano Growth",
      "Modifiche frequenti",
      "Priorità supporto",
      "Consigli base di marketing",
    ],
    cta: "Attiva ora",
  },
];

const qrPlans: Plan[] = [
  {
    name: "QR Code Base",
    price: "20",
    priceSuffix: "una tantum",
    desc: "La soluzione semplice per portare i clienti dove vuoi tu",
    icon: <QrCode className="w-5 h-5" />,
    features: [
      "Link diretto a menu, contatti o recensioni",
      "Grafica personalizzata",
      "Pronto da stampare",
    ],
    cta: "Richiedi informazioni",
  },
  {
    name: "QR Code Dinamico",
    price: "5–10",
    priceSuffix: "/mese",
    desc: "Cambia la destinazione quando vuoi, perfetto per le promozioni",
    badge: "Flessibile",
    badgeIcon: <Sparkles className="w-3 h-3" />,
    highlighted: true,
    icon: <Smartphone className="w-5 h-5" />,
    features: [
      "Modificabile nel tempo",
      "Perfetto per campagne e promozioni",
      "Statistiche di scansione",
    ],
    cta: "Richiedi informazioni",
  },
];

const subscriptionPlans: Plan[] = [
  {
    name: "Start",
    price: "299",
    priceSuffix: "/mese",
    desc: "Presenza online base ma professionale — bar, pizzerie, kebab, negozi locali",
    icon: <Zap className="w-5 h-5" />,
    features: [
      "Gestione Instagram base",
      "1 contenuto a settimana (post o reel)",
      "3–5 stories a settimana",
      "Ottimizzazione profilo Instagram",
      "1 locandina promozionale al mese",
      "Aggiornamenti semplici sito",
      "Assistenza WhatsApp",
    ],
    cta: "Inizia con Start",
  },
  {
    name: "Growth",
    price: "549",
    priceSuffix: "/mese",
    desc: "Crescita reale e costante online — ristoranti, cocktail bar, locali attivi",
    badge: "Più scelto",
    badgeIcon: <TrendingUp className="w-3 h-3" />,
    highlighted: true,
    icon: <Sparkles className="w-5 h-5" />,
    features: [
      "Tutto del piano Start +",
      "2 contenuti a settimana (reel/post)",
      "Stories quasi giornaliere",
      "Grafiche promozionali illimitate",
      "1 shooting foto/video al mese",
      "Gestione Google Business Profile",
      "Menù digitali / eventi",
      "Analisi profilo + consigli crescita",
      "Priorità assistenza",
    ],
    cta: "Scegli Growth",
  },
  {
    name: "Premium",
    price: "999",
    priceSuffix: "/mese",
    desc: "Branding completo + presenza forte + status premium",
    icon: <Crown className="w-5 h-5" />,
    features: [
      "Tutto del piano Growth +",
      "3–5 reel a settimana",
      "Gestione completa Instagram + TikTok",
      "Shooting professionali frequenti",
      "Copertura eventi",
      "Aggiornamento continuo sito",
      "Mini campagne ads Meta",
      "Strategia contenuti personalizzata",
      "Design grafico avanzato",
      "Assistenza prioritaria totale",
    ],
    cta: "Vai Premium",
  },
];

const extraServices: Plan[] = [
  {
    name: "Branding",
    price: "150–500",
    priceSuffix: "una tantum",
    desc: "Identità visiva completa per il tuo brand",
    icon: <Sparkles className="w-5 h-5" />,
    features: ["Logo professionale", "Palette colori", "Font dedicati", "Identità visiva completa"],
    cta: "Richiedi preventivo",
  },
  {
    name: "Shooting Singolo",
    price: "80–250",
    priceSuffix: "una tantum",
    desc: "Contenuti foto/video professionali",
    badge: "Pronto all'uso",
    badgeIcon: <Sparkles className="w-3 h-3" />,
    highlighted: true,
    icon: <Smartphone className="w-5 h-5" />,
    features: ["Shooting dedicato", "Foto + video professionali", "Editing incluso", "Pronti per i social"],
    cta: "Prenota shooting",
  },
  {
    name: "Eventi",
    price: "100–400",
    priceSuffix: "a evento",
    desc: "Copertura completa dei tuoi eventi",
    icon: <Crown className="w-5 h-5" />,
    features: ["Copertura evento", "Foto + reel", "Contenuti social pronti", "Consegna rapida"],
    cta: "Richiedi info",
  },
];

const PlanCard = ({ plan, delay, isVisible }: { plan: Plan; delay: number; isVisible: boolean }) => (
  <div
    className={`relative rounded-2xl p-5 md:p-7 border transition-all duration-500 hover:scale-[1.02] flex flex-col ${
      plan.highlighted
        ? "border-primary/60 bg-card glow md:scale-[1.03]"
        : "border-border bg-card hover:border-border/80"
    } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    {plan.badge && (
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 whitespace-nowrap">
        {plan.badgeIcon}
        {plan.badge}
      </span>
    )}

    <div className="flex items-center gap-2 mb-2">
      {plan.icon && (
        <span className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${plan.highlighted ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>
          {plan.icon}
        </span>
      )}
      <h4 className="text-xl md:text-2xl font-black">{plan.name}</h4>
    </div>

    <p className="text-muted-foreground text-xs md:text-sm mt-1">{plan.desc}</p>

    <div className="mt-4 mb-5 flex items-baseline gap-2">
      <span className="text-4xl md:text-5xl font-black">€{plan.price}</span>
      {plan.priceSuffix && (
        <span className="text-muted-foreground text-xs md:text-sm">{plan.priceSuffix}</span>
      )}
    </div>

    <ul className="space-y-2 md:space-y-2.5 mb-6 flex-1">
      {plan.features.map((f) => (
        <li key={f} className="flex items-start gap-2 text-xs md:text-sm">
          <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <span>{f}</span>
        </li>
      ))}
    </ul>

    <a
      href="#contatti"
      className={`group/cta ${plan.highlighted ? "btn-cta" : "btn-cta-soft"} w-full`}
    >
      {plan.cta}
      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
    </a>
  </div>
);

const PricingSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="prezzi" className="section-padding relative overflow-hidden scroll-mt-24">
      <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/12 rounded-full blur-[250px]" />

      <div className="container mx-auto relative z-10" ref={ref}>
        {/* Sezione 1 — Creazione sito */}
        <div id="siti-web" className={`scroll-mt-24 text-center mb-10 md:mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="red-line mx-auto mb-4" />
          <h2 className="text-2xl md:text-4xl font-black mb-3">
            Scegli la <span className="text-gradient">soluzione giusta</span> per la tua attività
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Siti pensati per attirare nuovi clienti e migliorare la tua presenza online.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mb-16 md:mb-24">
          {sitePlans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} delay={i * 120} isVisible={isVisible} />
          ))}
        </div>

        {/* Sezione 2 — Gestione mensile */}
        <div id="gestione-sito" className={`scroll-mt-24 text-center mb-8 md:mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-2xl md:text-4xl font-black mb-3">
            Mantieni il tuo sito <span className="text-gradient">sempre aggiornato</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Pensiamo a tutto noi, così tu puoi concentrarti sul tuo lavoro.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mb-16 md:mb-24">
          {managementPlans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} delay={i * 120} isVisible={isVisible} />
          ))}
        </div>

        {/* Sezione 3 — QR Code */}
        <div id="qr-code" className={`scroll-mt-24 text-center mb-8 md:mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-2xl md:text-4xl font-black mb-3">
            Più recensioni e clienti con i <span className="text-gradient">QR Code</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Uno strumento semplice per portare i clienti esattamente dove vuoi tu.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
          {qrPlans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} delay={i * 120} isVisible={isVisible} />
          ))}
        </div>

        {/* Sezione 4 — Abbonamenti mensili */}
        <div id="abbonamenti" className={`scroll-mt-24 text-center mt-20 md:mt-28 mb-8 md:mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="red-line mx-auto mb-4" />
          <h2 className="text-2xl md:text-4xl font-black mb-3">
            Piani <span className="text-gradient">abbonamento mensile</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Gestione completa di social, contenuti e immagine online. Tutto incluso, ogni mese.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mb-16 md:mb-24">
          {subscriptionPlans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} delay={i * 120} isVisible={isVisible} />
          ))}
        </div>

        {/* Sezione 5 — Servizi extra */}
        <div id="extra" className={`scroll-mt-24 text-center mb-8 md:mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-2xl md:text-4xl font-black mb-3">
            Servizi <span className="text-gradient">extra</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Aggiungi solo ciò che ti serve, quando ti serve.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {extraServices.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} delay={i * 120} isVisible={isVisible} />
          ))}
        </div>

        <p className="text-center text-xs md:text-sm text-muted-foreground mt-10 md:mt-14">
          ⚡ Posti limitati ogni mese — contattaci per fissare la tua consulenza gratuita.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
