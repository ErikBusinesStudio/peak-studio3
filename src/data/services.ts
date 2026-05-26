import { Globe, Wrench, QrCode, Sparkles, FileText, Megaphone, Crown, Zap, TrendingUp, Smartphone, Headphones, type LucideIcon } from "lucide-react";
import imgSitiWeb from "@/assets/service-siti-web.jpg";
import imgAbbonamenti from "@/assets/service-abbonamenti.jpg";
import imgGestione from "@/assets/service-gestione.jpg";
import imgQrCode from "@/assets/service-qrcode.jpg";
import imgVolantini from "@/assets/service-volantini.jpg";
import imgBranding from "@/assets/service-branding.jpg";

export type ServicePlan = {
  name: string;
  price: string;
  priceSuffix?: string;
  desc: string;
  badge?: string;
  highlighted?: boolean;
  features: string[];
  icon: LucideIcon;
  cta: string;
};

export type Service = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  icon: LucideIcon;
  heroPrice: string;
  benefits: string[];
  steps?: { title: string; desc: string }[];
  plans: ServicePlan[];
  faq?: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "siti-web",
    title: "Siti Web",
    tagline: "Siti professionali che convertono visitatori in clienti",
    description:
      "Realizziamo siti moderni, veloci e ottimizzati per attrarre nuovi clienti. Dal sito vetrina alla landing page premium, ogni progetto è curato in ogni dettaglio per la tua attività.",
    image: imgSitiWeb,
    icon: Globe,
    heroPrice: "Da 300€",
    benefits: [
      "Design moderno su misura",
      "Ottimizzato mobile e SEO base",
      "Velocità e prestazioni elevate",
      "Pronto per essere trovato su Google",
      "Integrazioni WhatsApp, prenotazioni, mappe",
    ],
    plans: [
      {
        name: "Base",
        price: "300",
        priceSuffix: "una tantum",
        desc: "Ideale per piccole attività che vogliono iniziare online",
        icon: Globe,
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
        highlighted: true,
        icon: Sparkles,
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
        desc: "Per chi vuole il massimo: sito completo e personalizzato (+700€ per ecommerce collegato al sito Standard)",
        icon: Crown,
        features: [
          "Sito completo personalizzato",
          "Design professionale avanzato",
          "Integrazioni (WhatsApp, prenotazioni, ecc.)",
          "Più revisioni incluse",
          "Priorità nella consegna",
          "Add-on: +700€ ecommerce completo collegato al sito Standard",
        ],
        cta: "Richiedi informazioni",
      },
    ],
    faq: [
      { q: "In quanto tempo è pronto?", a: "Tipicamente 1–3 settimane in base alla complessità del progetto." },
      { q: "Posso modificarlo dopo?", a: "Sì, offriamo piani di gestione mensile per aggiornamenti continui." },
    ],
  },
  {
    slug: "abbonamenti",
    title: "Abbonamenti Mensili",
    tagline: "Gestione completa di social, contenuti e immagine online",
    description:
      "Pensiamo noi alla tua presenza online ogni mese: contenuti, social, grafiche e supporto. Tu ti concentri sul tuo locale, noi sui clienti.",
    image: imgAbbonamenti,
    icon: Megaphone,
    heroPrice: "Da 299€/mese",
    benefits: [
      "Contenuti professionali costanti",
      "Crescita reale del profilo",
      "Gestione totale senza pensieri",
      "Strategia personalizzata per la tua attività",
      "Supporto WhatsApp diretto",
    ],
    plans: [
      {
        name: "Start",
        price: "299",
        priceSuffix: "/mese",
        desc: "Presenza online base ma professionale — bar, pizzerie, kebab, negozi locali",
        icon: Zap,
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
        highlighted: true,
        icon: TrendingUp,
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
        desc: "Branding completo + presenza forte + status premium — lounge bar, ristoranti premium, locali eventi",
        icon: Crown,
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
    ],
    faq: [
      { q: "Posso cambiare piano in corsa?", a: "Certo, puoi salire o scendere di piano ogni mese." },
      { q: "Serve un impegno minimo?", a: "Consigliamo almeno 3 mesi per vedere risultati concreti." },
    ],
  },
  {
    slug: "gestione-sito",
    title: "Gestione Sito",
    tagline: "Il tuo sito sempre online, sicuro e aggiornato",
    description:
      "Pensiamo noi a hosting, sicurezza, backup e modifiche. Il tuo sito resta veloce, protetto e sempre aggiornato senza che tu debba preoccuparti di nulla.",
    image: imgGestione,
    icon: Wrench,
    heroPrice: "Da 30€/mese",
    benefits: [
      "Hosting e dominio gestiti",
      "Backup periodici e sicurezza",
      "Modifiche rapide ai contenuti",
      "Supporto tecnico veloce",
      "Monitoraggio continuo",
    ],
    plans: [
      {
        name: "Basic",
        price: "30",
        priceSuffix: "/mese",
        desc: "Il tuo sito sempre online e sicuro, senza pensieri",
        icon: Wrench,
        features: ["Hosting e sicurezza inclusi", "Aggiornamenti tecnici base", "Backup periodici"],
        cta: "Attiva ora",
      },
      {
        name: "Growth",
        price: "50",
        priceSuffix: "/mese",
        desc: "Mantieni il sito vivo con modifiche e supporto rapido",
        badge: "Consigliato",
        highlighted: true,
        icon: Sparkles,
        features: ["Tutto del piano Basic", "Piccole modifiche ai contenuti", "Supporto rapido"],
        cta: "Attiva ora",
      },
      {
        name: "Pro",
        price: "80–100",
        priceSuffix: "/mese",
        desc: "Per chi vuole crescere davvero, con consigli e priorità",
        icon: Headphones,
        features: [
          "Tutto del piano Growth",
          "Modifiche frequenti",
          "Priorità supporto",
          "Consigli base di marketing",
        ],
        cta: "Attiva ora",
      },
    ],
  },
  {
    slug: "qr-code",
    title: "QR Code",
    tagline: "Più recensioni, più clienti, zero attriti",
    description:
      "QR Code personalizzati che portano i clienti esattamente dove vuoi tu: menu, recensioni Google, prenotazioni, social. Statici o dinamici, sempre pronti da stampare.",
    image: imgQrCode,
    icon: QrCode,
    heroPrice: "Da 20€",
    benefits: [
      "Più recensioni Google in automatico",
      "Grafica personalizzata col tuo brand",
      "Pronto da stampare in alta qualità",
    ],
    plans: [
      {
        name: "QR Code Base",
        price: "20",
        priceSuffix: "una tantum",
        desc: "La soluzione semplice per portare i clienti dove vuoi tu",
        icon: QrCode,
        features: [
          "Link diretto a menu, contatti o recensioni",
          "Grafica personalizzata",
          "Pronto da stampare",
        ],
        cta: "Richiedi informazioni",
      },
    ],
  },
  {
    slug: "volantini",
    title: "Volantini & Distribuzione",
    tagline: "Volantini che portano clienti reali al tuo business",
    description:
      "Design, stampa e distribuzione gestiti in un unico servizio. Tu pensi alla tua attività, noi portiamo le persone da te con campagne fisiche mirate sul territorio.",
    image: imgVolantini,
    icon: FileText,
    heroPrice: "Da 120€",
    benefits: [
      "Aumento clienti locali",
      "Pubblicità fisica ancora altamente efficace",
      "Gestione completa: tu non pensi a nulla",
      "Target locale preciso",
      "Risultati rapidi e misurabili",
    ],
    steps: [
      { title: "Design del volantino", desc: "Creiamo un volantino efficace, moderno e pensato per vendere, in linea con la tua attività." },
      { title: "Stampa inclusa", desc: "Stampiamo e prepariamo tutto il materiale necessario, in base alla quantità richiesta." },
      { title: "Distribuzione sul territorio", desc: "Distribuiamo fisicamente i volantini nelle zone strategiche per raggiungere clienti reali." },
    ],
    plans: [
      {
        name: "Base",
        price: "120–200",
        priceSuffix: "una tantum",
        desc: "Perfetto per partire e testare la pubblicità fisica nella tua zona",
        icon: FileText,
        features: ["Design semplice", "1000 volantini stampati", "Distribuzione inclusa"],
        cta: "Richiedi preventivo",
      },
      {
        name: "Business",
        price: "250–450",
        priceSuffix: "una tantum",
        desc: "La scelta più scelta per attività che vogliono risultati concreti",
        badge: "Più scelto",
        highlighted: true,
        icon: Sparkles,
        features: ["Design professionale con revisioni", "3000 volantini", "Distribuzione mirata"],
        cta: "Richiedi preventivo",
      },
      {
        name: "Growth",
        price: "500–900",
        priceSuffix: "una tantum",
        desc: "Campagna ampia con copertura completa e report sulle zone",
        icon: Crown,
        features: ["Design branding avanzato", "5000 volantini", "Distribuzione + report zone"],
        cta: "Richiedi preventivo",
      },
    ],
  },
  {
    slug: "extra",
    title: "Branding & Extra",
    tagline: "Aggiungi solo ciò che ti serve, quando ti serve",
    description:
      "Servizi singoli per completare la tua immagine: identità visiva, shooting professionali e copertura eventi. Disponibili anche senza abbonamento.",
    image: imgBranding,
    icon: Sparkles,
    heroPrice: "Da 80€",
    benefits: [
      "Identità visiva forte e riconoscibile",
      "Contenuti professionali pronti all'uso",
      "Copertura eventi chiavi in mano",
      "Editing professionale incluso",
      "Consegna rapida",
    ],
    plans: [
      {
        name: "Branding",
        price: "150–500",
        priceSuffix: "una tantum",
        desc: "Identità visiva completa per il tuo brand",
        icon: Sparkles,
        features: ["Logo professionale", "Palette colori", "Font dedicati", "Identità visiva completa"],
        cta: "Richiedi preventivo",
      },
      {
        name: "Shooting Singolo",
        price: "80–250",
        priceSuffix: "una tantum",
        desc: "Contenuti foto/video professionali pronti per i social",
        badge: "Pronto all'uso",
        highlighted: true,
        icon: Smartphone,
        features: ["Shooting dedicato", "Foto + video professionali", "Editing incluso", "Pronti per i social"],
        cta: "Prenota shooting",
      },
      {
        name: "Eventi",
        price: "100–400",
        priceSuffix: "a evento",
        desc: "Copertura completa dei tuoi eventi",
        icon: Crown,
        features: ["Copertura evento", "Foto + reel", "Contenuti social pronti", "Consegna rapida"],
        cta: "Richiedi info",
      },
    ],
  },
];

export const getServiceBySlug = (slug?: string) => services.find((s) => s.slug === slug);