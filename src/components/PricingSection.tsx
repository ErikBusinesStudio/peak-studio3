import { useState } from "react";
import {
  Check,
  ArrowRight,
  Globe,
  Sparkles,
  Crown,
  Wrench,
  TrendingUp,
  Headphones,
  MapPin,
  Palette,
  CreditCard,
  FileText,
  LayoutTemplate,
  QrCode,
  Bot,
  RefreshCw,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useI18n } from "@/contexts/I18nContext";

const contactWhatsAppLink =
  "https://wa.me/393913168231?text=Ciao%2C%20vorrei%20ricevere%20informazioni%20sui%20vostri%20servizi.";

type Category = "sites" | "monthly" | "extra";

type Plan = {
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  icon: React.ReactNode;
  highlighted?: boolean;
  badge?: string;
  features: string[];
  cta: string;
};

const categories: { key: Category; label: string; eyebrow: string; plans: Plan[] }[] = [
  {
    key: "sites",
    label: "Siti Web",
    eyebrow: "III — The Forge",
    plans: [
      {
        name: "STARTER",
        price: "€200",
        description: "max 3 pagine — ideale per piccole attività che vogliono iniziare online.",
        icon: <Globe className="w-5 h-5" />,
        features: [
          "Sito 1-3 pagine (Home, Chi siamo, Contatti)",
          "Design moderno e mobile-first",
          "Form di contatto",
          "Dominio incluso 1° anno",
          "SEO base",
          "QR Code",
          "Menù / catalogo digitale",
        ],
        cta: "Richiedi Starter",
      },
      {
        name: "BUSINESS",
        price: "€500",
        description: "fino a 6 pagine — la scelta per attrarre e convertire più clienti.",
        icon: <Sparkles className="w-5 h-5" />,
        highlighted: true,
        badge: "Più scelto",
        features: [
          "Sito fino a 6 pagine",
          "Design moderno e mobile-first",
          "SEO base (titoli, meta, velocità)",
          "Form di contatto + mappa",
          "QR Code personalizzato",
          "Dominio + hosting 1° anno incluso",
          "Menù / catalogo digitale",
          "Branding completo",
        ],
        cta: "Richiedi Business",
      },
      {
        name: "PREMIUM",
        price: "€1.200",
        description: "Brand completo o e-commerce — per chi vuole il massimo.",
        icon: <Crown className="w-5 h-5" />,
        features: [
          "Sito illimitato o e-commerce",
          "Design su misura + branding",
          "SEO avanzato",
          "Menù / catalogo digitale",
          "QR Code personalizzato",
          "Logo incluso",
          "Dominio + hosting 1° anno incluso",
          "Automazione base inclusa",
        ],
        cta: "Richiedi Premium",
      },
    ],
  },
  {
    key: "monthly",
    label: "Canoni Mensili",
    eyebrow: "IV — The Ascent",
    plans: [
      {
        name: "MANUTENZIONE BASE",
        price: "€50",
        priceNote: "/mese",
        description: "Il tuo sito sempre online, sicuro e aggiornato.",
        icon: <Wrench className="w-5 h-5" />,
        features: [
          "Aggiornamenti contenuti (testi, foto)",
          "Backup mensile",
          "Monitoraggio sito attivo",
          "1 modifica/mese inclusa",
          "Google Business",
          "Automazioni",
        ],
        cta: "Attiva Base",
      },
      {
        name: "CRESCITA",
        price: "€120",
        priceNote: "/mese",
        description: "Crescita costante della tua visibilità online.",
        icon: <TrendingUp className="w-5 h-5" />,
        highlighted: true,
        badge: "Consigliato",
        features: [
          "Tutto del piano Base",
          "Gestione Google Business (post, foto, info)",
          "Risposta alle recensioni",
          "Report mensile visibilità",
          "3 modifiche/mese incluse",
          "Automazioni WhatsApp/email",
        ],
        cta: "Attiva Crescita",
      },
      {
        name: "PRO SCALABILE",
        price: "€200",
        priceNote: "/mese",
        description: "Per chi vuole crescere davvero, con supporto prioritario.",
        icon: <Headphones className="w-5 h-5" />,
        features: [
          "Tutto del piano Crescita",
          "1 automazione attiva (WhatsApp / recensioni / email)",
          "Aggiornamenti illimitati",
          "Supporto prioritario entro 24h",
          "Report mensile completo",
        ],
        cta: "Attiva Pro",
      },
    ],
  },
  {
    key: "extra",
    label: "Servizi Extra",
    eyebrow: "V — The Toolkit",
    plans: [
      {
        name: "GOOGLE BUSINESS SETUP",
        price: "€100-150",
        description: "Creazione + ottimizzazione scheda.",
        icon: <MapPin className="w-5 h-5" />,
        features: ["Ottimizzazione completa scheda", "Foto e descrizioni", "Attivazione recensioni"],
        cta: "Richiedi setup",
      },
      {
        name: "LOGO BRANDING",
        price: "€80-150",
        description: "Identità visiva + varianti.",
        icon: <Palette className="w-5 h-5" />,
        features: ["Logo professionale", "Palette colori", "Font dedicati", "File pronti all'uso"],
        cta: "Richiedi branding",
      },
      {
        name: "BIGLIETTI DA VISITA",
        price: "€50",
        description: "Design + file pronti per stampa.",
        icon: <CreditCard className="w-5 h-5" />,
        features: ["Design fronte/retro", "File stampa PDF", "Varianti colore"],
        cta: "Richiedi biglietti",
      },
      {
        name: "VOLANTINI",
        price: "€50-80",
        description: "Design promozionale.",
        icon: <FileText className="w-5 h-5" />,
        features: ["Design accattivante", "File stampa pronto", "Formato A5/A6"],
        cta: "Richiedi volantini",
      },
      {
        name: "LANDING PAGE",
        price: "€150-300",
        description: "Pagina singola per campagne.",
        icon: <LayoutTemplate className="w-5 h-5" />,
        features: ["Design focalizzato", "Copy persuasivo", "Form/CTA", "Ottimizzazione mobile"],
        cta: "Richiedi landing",
      },
      {
        name: "MENÙ QR DIGITALI",
        price: "€80-120",
        priceNote: "+ canone mensile",
        description: "QR Code + pagina aggiornabile.",
        icon: <QrCode className="w-5 h-5" />,
        features: ["QR Code personalizzato", "Pagina digitale editabile", "Design su misura"],
        cta: "Richiedi menù QR",
      },
      {
        name: "AUTOMAZIONE SINGOLA",
        price: "€150-250",
        description: "Setup WhatsApp / email / recensioni.",
        icon: <Bot className="w-5 h-5" />,
        features: ["Flusso automatizzato", "Integrazione WhatsApp/email", "Sconti per pacchetti"],
        cta: "Richiedi automazione",
      },
      {
        name: "RESTYLING SITO ESISTENTE",
        price: "€150-400",
        description: "Redesign grafico + ottimizzazione.",
        icon: <RefreshCw className="w-5 h-5" />,
        features: ["Nuovo design moderno", "Ottimizzazione velocità", "SEO on-page", "Mobile-first"],
        cta: "Richiedi restyling",
      },
    ],
  },
];

const PlanCard = ({
  plan,
  delay,
  isVisible,
}: {
  plan: Plan;
  delay: number;
  isVisible: boolean;
}) => {
  return (
    <div
      className={`relative rounded-2xl p-6 md:p-8 border transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 flex flex-col ${
        plan.highlighted
          ? "border-primary/60 bg-card glow md:scale-[1.03]"
          : "border-border bg-card/80 hover:border-primary/30"
      } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {plan.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 whitespace-nowrap">
          {plan.badge}
        </span>
      )}

      <div className="flex items-center gap-3 mb-4">
        <span
          className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${
            plan.highlighted ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
          }`}
        >
          {plan.icon}
        </span>
        <div>
          <h4 className="text-xl md:text-2xl font-black leading-tight">{plan.name}</h4>
          <p className="text-muted-foreground text-xs md:text-sm leading-snug">{plan.description}</p>
        </div>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <span className="w-5 h-5 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3 h-3" strokeWidth={3} />
            </span>
            <span className="leading-snug">{f}</span>
          </li>
        ))}
      </ul>

      <a
        href={contactWhatsAppLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`group/cta ${plan.highlighted ? "btn-cta" : "btn-cta-soft"} w-full`}
      >
        {plan.cta}
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
      </a>
    </div>
  );
};

const PricingSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useI18n();
  const [active, setActive] = useState<Category>("sites");

  const activeCategory = categories.find((c) => c.key === active)!;

  // Grid layout depends on number of plans in active category
  const gridCols =
    activeCategory.plans.length === 2
      ? "md:grid-cols-2 max-w-3xl"
      : activeCategory.plans.length >= 4
      ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      : "md:grid-cols-3";

  return (
    <section id="prezzi" className="section-padding relative overflow-hidden scroll-mt-24">
      {/* Decorative atmosphere */}
      <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-primary/8 rounded-full blur-[280px] animate-pulse-slow" />
      <div className="hidden md:block absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[220px] animate-float" />
      <div className="hidden md:block absolute top-1/4 left-0 w-px h-[50%] bg-gradient-to-b from-transparent via-primary/10 to-transparent animate-pulse-slow" />
      <div className="hidden md:block absolute top-1/4 right-0 w-px h-[50%] bg-gradient-to-b from-transparent via-primary/10 to-transparent animate-pulse-slow" style={{ animationDelay: "1.5s" }} />

      <div className="container mx-auto relative z-10" ref={ref}>
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="eyebrow mx-auto justify-center mb-4">{activeCategory.eyebrow}</p>
          <h2 className="text-2xl md:text-5xl font-black mb-3">
            Scegli il tuo <span className="text-gradient">percorso</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Piani chiari, pensati per far crescere la tua attività senza sorprese.
          </p>
        </div>

        {/* Tabs */}
        <div
          className={`flex flex-wrap justify-center gap-2 md:gap-4 mb-10 md:mb-14 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`relative px-5 md:px-8 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                active === cat.key
                  ? "bg-primary text-primary-foreground shadow-[0_0_30px_-4px_hsl(var(--primary)/0.5)]"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              {cat.label}
              {active === cat.key && (
                <span className="absolute inset-0 rounded-full border border-primary/30 animate-pulse pointer-events-none" />
              )}
            </button>
          ))}
        </div>

        {/* Plans grid */}
        <div
          className={`grid gap-4 md:gap-6 ${gridCols} mx-auto transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {activeCategory.plans.map((plan, i) => (
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
