import serviceBranding from "@/assets/service-branding.jpg";
import serviceVolantini from "@/assets/service-volantini.jpg";
import serviceQrcode from "@/assets/service-qrcode.jpg";
import serviceGestione from "@/assets/service-gestione.jpg";
import serviceAbbonamenti from "@/assets/service-abbonamenti.jpg";
import serviceSitiWeb from "@/assets/service-siti-web.jpg";
import sceneSignpost from "@/assets/scene-signpost.jpg";
import sceneCabin from "@/assets/scene-cabin.jpg";

export type ExtraSize = "lg" | "md" | "sm" | "wide" | "tall";

export type ExtraService = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  size: ExtraSize;
  includes: string[];
  process: { title: string; desc: string }[];
  faq?: { q: string; a: string }[];
};

export const extras: ExtraService[] = [
  {
    slug: "logo-branding",
    name: "Logo & Branding",
    tagline: "L'identità visiva che ti rende riconoscibile.",
    description:
      "Creo l'identità visiva completa della tua attività: logo principale, varianti, palette colori, font e file pronti per stampa e web. Un brand coerente vale più di mille pubblicità.",
    image: serviceBranding,
    size: "lg",
    includes: [
      "Logo principale + 2 varianti (orizzontale, monogramma)",
      "Palette colori coordinata",
      "Coppia font (titoli + testo)",
      "File pronti: SVG, PNG, PDF, favicon",
      "Mini brand guide PDF",
      "Revisioni illimitate fino all'approvazione",
    ],
    process: [
      { title: "Brief", desc: "Capiamo insieme valori, target e concorrenti." },
      { title: "Concept", desc: "Ti mostro 2–3 direzioni visive diverse." },
      { title: "Consegna", desc: "Affiniamo la scelta e ti consegno tutti i file." },
    ],
    faq: [
      { q: "Quanto tempo serve?", a: "In media 5–10 giorni dal brief." },
      { q: "Posso modificarlo dopo?", a: "Sì, ricevi i sorgenti modificabili." },
    ],
  },
  {
    slug: "biglietti-visita",
    name: "Biglietti da visita",
    tagline: "Il primo handshake digitale, ma su carta.",
    description:
      "Design fronte/retro pronto per la stampa professionale. Lavoro su carte premium con finiture eleganti che ti distinguono dai biglietti anonimi.",
    image: serviceVolantini,
    size: "sm",
    includes: [
      "Design fronte/retro su misura",
      "File stampa-ready (PDF con abbondanze)",
      "Consigli su carta e finiture",
      "Versione QR opzionale",
      "2 round di revisioni",
    ],
    process: [
      { title: "Layout", desc: "Imposto il design con il tuo brand." },
      { title: "Bozza", desc: "Anteprima fronte/retro per approvazione." },
      { title: "Print-ready", desc: "Ti consegno il PDF pronto per qualsiasi tipografia." },
    ],
  },
  {
    slug: "menu-qr",
    name: "Menù QR Digitali",
    tagline: "Il menù che aggiorni dal telefono in 30 secondi.",
    description:
      "Pagina digitale con menù sempre aggiornabile + QR code stampabile da mettere sui tavoli. Niente più ristampe ogni volta che cambi un piatto o un prezzo.",
    image: serviceQrcode,
    size: "md",
    includes: [
      "Pagina menù mobile-first",
      "Categorie, prezzi, foto piatti",
      "Aggiornamenti istantanei via dashboard",
      "QR code personalizzato",
      "Versione multilingua opzionale",
      "Allergeni e info nutrizionali",
    ],
    process: [
      { title: "Setup", desc: "Imposto categorie e voci a partire dal tuo menù attuale." },
      { title: "Personalizzazione", desc: "Adattiamo grafica e foto al tuo locale." },
      { title: "QR & stampa", desc: "Ricevi il QR pronto da stampare." },
    ],
    faq: [
      { q: "Posso modificarlo io?", a: "Sì, accesso a dashboard semplice da telefono." },
      { q: "Funziona anche senza app?", a: "Sì, è una pagina web aperta da qualsiasi camera." },
    ],
  },
  {
    slug: "google-business",
    name: "Google Business Setup",
    tagline: "Apparire su Google Maps quando ti cercano davvero.",
    description:
      "Configuro e ottimizzo la tua scheda Google Business per farti trovare nelle ricerche locali. Foto, categorie, orari, recensioni: tutto pensato per convertire chi ti cerca in cliente.",
    image: sceneSignpost,
    size: "wide",
    includes: [
      "Apertura o reclamo scheda esistente",
      "Ottimizzazione completa (categorie, attributi, descrizione SEO)",
      "Caricamento foto professionali",
      "Impostazione orari, servizi, area",
      "Strategia recensioni iniziali",
      "Mini guida per gestirla in autonomia",
    ],
    process: [
      { title: "Verifica", desc: "Controllo o creo la scheda con verifica ufficiale Google." },
      { title: "Ottimizzazione", desc: "Configuro ogni campo per massima visibilità locale." },
      { title: "Lancio", desc: "Ti consegno scheda attiva + guida d'uso." },
    ],
  },
  {
    slug: "volantini",
    name: "Volantini & Flyer",
    tagline: "Design che si nota, anche tra cento volantini.",
    description:
      "Volantini promozionali pensati per attirare l'occhio. Lavoro su gerarchie chiare, foto efficaci e CTA dirette: il volantino deve dire una cosa sola, ma dirla bene.",
    image: serviceVolantini,
    size: "sm",
    includes: [
      "Design A5 o A4 fronte/retro",
      "Copywriting promozionale incluso",
      "File stampa-ready (PDF + abbondanze)",
      "Versione digitale per social/WhatsApp",
      "2 round di revisioni",
    ],
    process: [
      { title: "Brief", desc: "Definiamo offerta, target e canale di distribuzione." },
      { title: "Design", desc: "Realizzo layout e ti mostro 2 varianti." },
      { title: "Consegna", desc: "Ricevi file print + versione social." },
    ],
  },
  {
    slug: "automazione",
    name: "Automazione singola",
    tagline: "Una macchina che lavora mentre dormi.",
    description:
      "Configuro un'automazione su misura: risposta automatica WhatsApp, email di benvenuto, raccolta recensioni post-acquisto, prenotazioni con conferma. Setup unico, vantaggio continuo.",
    image: serviceAbbonamenti,
    size: "tall",
    includes: [
      "Analisi flusso attuale",
      "Setup automazione (WhatsApp / email / form)",
      "Integrazione con Google Sheet o CRM",
      "Test completo + go-live",
      "Documentazione passo-passo",
      "30 giorni di supporto post-lancio",
    ],
    process: [
      { title: "Mappa", desc: "Disegno il flusso ottimale per il tuo caso." },
      { title: "Build", desc: "Configuro strumenti e collegamenti." },
      { title: "Test", desc: "Verifichiamo insieme prima di attivare." },
    ],
    faq: [
      { q: "Servono abbonamenti esterni?", a: "Dipende: ti propongo sempre la versione più economica e sostenibile." },
    ],
  },
  {
    slug: "landing-campagne",
    name: "Landing per campagne",
    tagline: "Una pagina, un obiettivo, conversioni vere.",
    description:
      "Landing page singola pensata per una campagna specifica (Google Ads, Meta, evento). Struttura testata per convertire: heading, prove sociali, offerta, CTA chiara.",
    image: serviceSitiWeb,
    size: "md",
    includes: [
      "Pagina singola ad alta conversione",
      "Copywriting persuasivo incluso",
      "Form contatto + tracking conversioni",
      "Integrazione pixel Meta / Google",
      "Mobile-first, caricamento < 2s",
      "A/B test opzionale",
    ],
    process: [
      { title: "Strategia", desc: "Definiamo offerta e singolo obiettivo da spingere." },
      { title: "Pagina", desc: "Realizzo struttura testata + design su misura." },
      { title: "Tracking", desc: "Collego pixel/conversioni e pubblichiamo." },
    ],
  },
  {
    slug: "gestione-contenuti",
    name: "Gestione contenuti",
    tagline: "Il tuo sito sempre fresco, senza pensarci tu.",
    description:
      "Mi occupo io di aggiornare regolarmente il tuo sito: nuovi prodotti, foto stagionali, blog post, promo. Tu mandi materiale o feedback, io pubblico.",
    image: serviceGestione,
    size: "sm",
    includes: [
      "Aggiornamenti mensili concordati",
      "Pubblicazione articoli / news",
      "Sostituzione foto e contenuti",
      "Piccole modifiche grafiche",
      "Report mensile delle modifiche",
    ],
    process: [
      { title: "Onboarding", desc: "Definiamo frequenza e tipologie di aggiornamento." },
      { title: "Materiali", desc: "Mi invii contenuti via WhatsApp o drive." },
      { title: "Pubblicazione", desc: "Pubblico entro 48h dalla ricezione." },
    ],
  },
];

export const getExtraBySlug = (slug?: string) =>
  extras.find((e) => e.slug === slug);