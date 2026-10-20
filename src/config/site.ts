// Fonte unica per tutti i dati variabili del sito Peak Studio.
// Compila i valori segnati con "DA COMPILARE".

import workEriutility from "@/assets/work-eriutility.webp";
import workCts from "@/assets/work-cts.webp";
import workSafety from "@/assets/work-safety.webp";

/** Numero reale di siti consegnati. DA COMPILARE (null = la voce non viene mostrata). */
export const SITI_REALIZZATI: number | null = null;

/** Unica promessa di consegna del sito, in giorni dalla ricezione del materiale. */
export const GIORNI_CONSEGNA = 7;

export const DOMINIO_PRINCIPALE = "https://peakstudio.click";

export const CONTATTI = {
  whatsapp: "393913168231",
  telefono: "+39 391 316 8231",
  email: "erikbaraca119@gmail.com",
  indirizzo: "Via Libertà 84, 21030 Casalzuigno (VA)",
};

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${CONTATTI.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const DATI_LEGALI = {
  titolare: "Erik Baraca",
  ditta: "Peak Studio di Erik Baraca",
  sede: "Casalzuigno (VA)",
  /** DA COMPILARE */
  piva: "[P.IVA da inserire]",
  /** Dicitura IVA mostrata sotto i prezzi. DA COMPILARE secondo il tuo regime fiscale. */
  notaIva: { it: "Prezzi indicativi, IVA esclusa se dovuta.", en: "Indicative prices, VAT excluded where applicable." },
};

type L = { it: string; en: string };

export type Piano = {
  id: string;
  nome: string;
  prezzoDa: number;
  consigliato?: boolean;
  include: L[];
};

export const PIANI: Piano[] = [
  {
    id: "starter",
    nome: "Starter",
    prezzoDa: 250,
    include: [
      { it: "Sito a pagina singola", en: "Single-page website" },
      { it: "Design su misura, adatto a ogni schermo", en: "Custom design for every screen" },
      { it: "Pulsante WhatsApp e modulo contatti", en: "WhatsApp button and contact form" },
    ],
  },
  {
    id: "business",
    nome: "Business",
    prezzoDa: 590,
    consigliato: true,
    include: [
      { it: "Fino a 5 pagine", en: "Up to 5 pages" },
      { it: "Menù o catalogo", en: "Menu or catalogue" },
      { it: "Una lingua aggiuntiva", en: "One additional language" },
      { it: "Ottimizzazione per Google", en: "Google optimisation" },
    ],
  },
  {
    id: "premium",
    nome: "Premium",
    prezzoDa: 1290,
    include: [
      { it: "Pagine illimitate", en: "Unlimited pages" },
      { it: "Animazioni e sezioni avanzate", en: "Advanced animations and sections" },
      { it: "Prenotazioni o richieste online", en: "Online bookings or requests" },
    ],
  },
  {
    id: "custom",
    nome: "Su misura",
    prezzoDa: 2500,
    include: [
      { it: "Progetto costruito sulle tue esigenze", en: "Project built around your needs" },
      { it: "Funzioni personalizzate", en: "Custom features" },
    ],
  },
];

export const ADDON = [{ id: "gbp", nome: { it: "Scheda Google Business", en: "Google Business Profile" }, prezzo: 40 }];

export const MANUTENZIONE = {
  prezzoMese: 50,
  include: [
    { it: "Aggiornamenti grafici e tecnici", en: "Design and technical updates" },
    { it: "Backup mensile completo su server esterno", en: "Full monthly backup on an external server" },
    { it: "Scansione di sicurezza mensile", en: "Monthly security scan" },
    { it: "Recap mensile delle visite su richiesta", en: "Monthly visits recap on request" },
  ] as L[],
};

export const SERVIZI: { id: string; titolo: L; desc: L }[] = [
  { id: "vetrina", titolo: { it: "Siti vetrina", en: "Showcase websites" }, desc: { it: "Il biglietto da visita online della tua attività, chiaro e veloce.", en: "Your business card online, clear and fast." } },
  { id: "landing", titolo: { it: "Landing page", en: "Landing pages" }, desc: { it: "Una pagina sola, un obiettivo: farti contattare.", en: "One page, one goal: getting you contacted." } },
  { id: "logo", titolo: { it: "Logo e identità visiva", en: "Logo and visual identity" }, desc: { it: "Un segno riconoscibile, coerente su sito, insegna e social.", en: "A recognisable mark, consistent on web, signage and social." } },
  { id: "dominio", titolo: { it: "Dominio, hosting ed email professionali", en: "Domain, hosting and business email" }, desc: { it: "Ci penso io: indirizzo tuo, email con il tuo nome.", en: "I take care of it: your own address and branded email." } },
  { id: "google", titolo: { it: "Scheda Google Business", en: "Google Business Profile" }, desc: { it: "Ti trovano su Maps con orari, foto e indicazioni.", en: "Be found on Maps with hours, photos and directions." } },
  { id: "manutenzione", titolo: { it: "Manutenzione mensile", en: "Monthly maintenance" }, desc: { it: "Il sito resta aggiornato, sicuro e con backup.", en: "Your site stays updated, secure and backed up." } },
];

export type Caso = {
  id: string;
  nome: string;
  settore: L;
  fatto: L;
  anno: number | null; // DA COMPILARE
  img: string;
  url: string;
};

export const CASI_PORTFOLIO: Caso[] = [
  { id: "eriutility", nome: "E-Riutility", settore: { it: "Mercatino dell'usato", en: "Second-hand shop" }, fatto: { it: "Sito vetrina con catalogo", en: "Showcase site with catalogue" }, anno: null, img: workEriutility, url: "https://e-riutility.it" },
  { id: "cts", nome: "CTS Cuvio", settore: { it: "Centro turistico sportivo", en: "Sports and tourism centre" }, fatto: { it: "Sito con attività e contatti", en: "Site with activities and contacts" }, anno: null, img: workCts, url: "https://centrocuvio.it" },
  { id: "safety", nome: "Safety Solutions", settore: { it: "Sicurezza sul lavoro", en: "Workplace safety" }, fatto: { it: "Sito vetrina dei servizi", en: "Services showcase site" }, anno: null, img: workSafety, url: "https://safetysolutionproject.lovable.app" },
];

/** Vuoto finché non arrivano recensioni reali: la sezione resta nascosta. */
export const TESTIMONIANZE: { nome: string; attivita: string; testo: L }[] = [];

/** Calcolatore del disgelo: a × (c/10) × b */
export const stimaMensile = (contatti: number, valoreCliente: number, suDieci: number) =>
  Math.round(contatti * (suDieci / 10) * valoreCliente);

/** Tappe dell'altimetro, nello stesso ordine delle sezioni. */
export const CAMPI = [
  { id: "top", quota: 0, nome: { it: "Campo base", en: "Base camp" } },
  { id: "fiducia", quota: 400, nome: { it: "Morena", en: "Moraine" } },
  { id: "disgelo", quota: 900, nome: { it: "Il disgelo", en: "The thaw" } },
  { id: "servizi", quota: 1400, nome: { it: "Campo 1 · Servizi", en: "Camp 1 · Services" } },
  { id: "processo", quota: 1900, nome: { it: "Campo 2 · Processo", en: "Camp 2 · Process" } },
  { id: "lavori", quota: 2400, nome: { it: "Campo 3 · Lavori", en: "Camp 3 · Work" } },
  { id: "prezzi", quota: 2900, nome: { it: "Campo 4 · Prezzi", en: "Camp 4 · Pricing" } },
  { id: "chi-sono", quota: 3300, nome: { it: "Cresta · Chi sono", en: "Ridge · About me" } },
  { id: "faq", quota: 3700, nome: { it: "Anticima · FAQ", en: "Fore-summit · FAQ" } },
  { id: "contatti", quota: 4000, nome: { it: "Vetta · Contatti", en: "Summit · Contact" } },
] as const;

export const QUOTA_MAX = 4000;
export const temperatura = (quota: number) => Math.round(4 - (quota / QUOTA_MAX) * 32);
