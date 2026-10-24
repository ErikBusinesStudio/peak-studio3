// Fonte unica per tutti i dati variabili del sito Peak Studio.
// Compila i valori segnati con "DA COMPILARE".

import workEriutility from "@/assets/work-eriutility.webp";
import workCts from "@/assets/work-cts.webp";
import workSafety from "@/assets/work-safety.webp";
import workCgcars from "@/assets/work-cgcars.webp";
import workAdhd from "@/assets/work-adhd.webp";
import workEvent from "@/assets/work-event.webp";
import svcVetrina from "@/assets/svc/vetrina.webp";
import svcLanding from "@/assets/svc/landing.webp";
import svcLogo from "@/assets/svc/logo.webp";
import svcDominio from "@/assets/svc/dominio.webp";
import svcGoogle from "@/assets/svc/google.webp";
import svcManutenzione from "@/assets/svc/manutenzione.webp";

/** Numero reale di siti consegnati. DA COMPILARE (null = la voce non viene mostrata). */
export const SITI_REALIZZATI: number | null = null;

/** Unica promessa di consegna del sito, in giorni dalla ricezione del materiale. */
export const GIORNI_CONSEGNA = 7;

export const DOMINIO_PRINCIPALE = "https://peakstudio.click";

export const CONTATTI = {
  whatsapp: "393913168231",
  telefono: "+39 391 316 8231",
  email: "erikbaraca119@gmail.com",
};

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${CONTATTI.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const DATI_LEGALI = {
  titolare: "Erik Baraca",
  ditta: "Peak Studio di Erik Baraca",
  /** Dicitura IVA mostrata sotto i prezzi. DA COMPILARE secondo il tuo regime fiscale. */
  notaIva: { it: "Prezzi indicativi, IVA esclusa se dovuta.", en: "Indicative prices, VAT excluded where applicable." },
};

type L = { it: string; en: string };

export type Piano = {
  id: string;
  nome: string;
  /** null = preventivo personalizzato, nessuna cifra mostrata */
  prezzoDa: number | null;
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
    prezzoDa: null,
    include: [
      { it: "Progetto costruito sulle tue esigenze", en: "Project built around your needs" },
      { it: "Funzioni personalizzate", en: "Custom features" },
    ],
  },
];

export type AddonCat = "visibilita" | "contenuti" | "funzioni" | "crescita";
export const ADDON_CATEGORIE: { id: AddonCat; nome: L }[] = [
  { id: "visibilita", nome: { it: "Visibilità", en: "Visibility" } },
  { id: "contenuti", nome: { it: "Contenuti", en: "Content" } },
  { id: "funzioni", nome: { it: "Funzioni", en: "Features" } },
  { id: "crescita", nome: { it: "Crescita", en: "Growth" } },
];

export type Addon = {
  id: string;
  cat: AddonCat;
  nome: L;
  desc: L;
  /** null = prezzo non ancora definito: si mostra "su preventivo" */
  prezzo: number | null;
  /** piani che lo includono già: non viene conteggiato due volte */
  inclusoIn?: string[];
};

export const ADDON: Addon[] = [
  { id: "gbp", cat: "visibilita", prezzo: 40, nome: { it: "Scheda Google Business", en: "Google Business Profile" }, desc: { it: "Ti trovano su Maps con orari, foto e indicazioni.", en: "Be found on Maps with hours, photos and directions." } },
  { id: "seo", cat: "visibilita", prezzo: null, nome: { it: "SEO avanzata", en: "Advanced SEO" }, desc: { it: "Ricerca delle parole chiave e pagine pensate per salire su Google.", en: "Keyword research and pages built to climb on Google." } },
  { id: "analytics", cat: "visibilita", prezzo: null, nome: { it: "Statistiche e conversioni", en: "Analytics and conversions" }, desc: { it: "Sai quante persone ti trovano e quante ti contattano.", en: "Know how many people find you and how many get in touch." } },
  { id: "copy", cat: "contenuti", prezzo: null, nome: { it: "Testi professionali", en: "Professional copywriting" }, desc: { it: "Scrivo io i testi delle pagine, chiari e su misura.", en: "I write the page copy, clear and tailored." } },
  { id: "lingua", cat: "contenuti", prezzo: null, inclusoIn: ["business"], nome: { it: "Lingua aggiuntiva", en: "Extra language" }, desc: { it: "Il sito anche in un'altra lingua per chi arriva da fuori.", en: "The site in another language for visitors from abroad." } },
  { id: "foto", cat: "contenuti", prezzo: null, nome: { it: "Selezione immagini", en: "Image selection" }, desc: { it: "Scelgo e preparo immagini adatte alla tua attività.", en: "I pick and prepare images that suit your business." } },
  { id: "prenotazioni", cat: "funzioni", prezzo: null, inclusoIn: ["premium"], nome: { it: "Prenotazioni online", en: "Online bookings" }, desc: { it: "Appuntamenti e richieste senza telefonate.", en: "Appointments and requests without phone calls." } },
  { id: "moduli", cat: "funzioni", prezzo: null, nome: { it: "Moduli di preventivo", en: "Quote request forms" }, desc: { it: "Domande guidate che ti portano richieste già complete.", en: "Guided questions that bring you complete requests." } },
  { id: "newsletter", cat: "funzioni", prezzo: null, nome: { it: "Newsletter", en: "Newsletter" }, desc: { it: "Raccogli contatti e scrivi ai tuoi clienti.", en: "Collect contacts and write to your customers." } },
  { id: "migrazione", cat: "crescita", prezzo: null, nome: { it: "Migrazione dal vecchio sito", en: "Migration from your old site" }, desc: { it: "Porto contenuti e indirizzo senza perdere nulla.", en: "I move content and address without losing anything." } },
  { id: "automazioni", cat: "crescita", prezzo: null, nome: { it: "Automazioni e CRM", en: "Automations and CRM" }, desc: { it: "Le richieste arrivano dove lavori già, senza copia-incolla.", en: "Requests land where you already work, no copy-paste." } },
];

/** Totale una tantum: piano (se ha un prezzo) + aggiunte con prezzo non già incluse nel piano. */
export const totalePreventivo = (pianoId: string, addonIds: string[]) => {
  const piano = PIANI.find((p) => p.id === pianoId);
  let totale = piano?.prezzoDa ?? 0;
  let daDefinire = piano?.prezzoDa == null;
  for (const id of addonIds) {
    const a = ADDON.find((x) => x.id === id);
    if (!a || a.inclusoIn?.includes(pianoId)) continue;
    if (a.prezzo == null) daDefinire = true;
    else totale += a.prezzo;
  }
  return { totale, daDefinire };
};

export const MANUTENZIONE = {
  prezzoMese: 50,
  include: [
    { it: "Aggiornamenti grafici e tecnici", en: "Design and technical updates" },
    { it: "Backup mensile completo su server esterno", en: "Full monthly backup on an external server" },
    { it: "Scansione di sicurezza mensile", en: "Monthly security scan" },
    { it: "Recap mensile delle visite su richiesta", en: "Monthly visits recap on request" },
  ] as L[],
};

export const SERVIZI: { id: string; titolo: L; desc: L; img: string }[] = [
  { id: "vetrina", titolo: { it: "Siti vetrina", en: "Showcase websites" }, desc: { it: "Il biglietto da visita online della tua attività, chiaro e veloce.", en: "Your business card online, clear and fast." }, img: svcVetrina },
  { id: "landing", titolo: { it: "Landing page", en: "Landing pages" }, desc: { it: "Una pagina sola, un obiettivo: farti contattare.", en: "One page, one goal: getting you contacted." }, img: svcLanding },
  { id: "logo", titolo: { it: "Logo e identità visiva", en: "Logo and visual identity" }, desc: { it: "Un segno riconoscibile, coerente su sito, insegna e social.", en: "A recognisable mark, consistent on web, signage and social." }, img: svcLogo },
  { id: "dominio", titolo: { it: "Dominio, hosting ed email professionali", en: "Domain, hosting and business email" }, desc: { it: "Ci penso io: indirizzo tuo, email con il tuo nome.", en: "I take care of it: your own address and branded email." }, img: svcDominio },
  { id: "google", titolo: { it: "Scheda Google Business", en: "Google Business Profile" }, desc: { it: "Ti trovano su Maps con orari, foto e indicazioni.", en: "Be found on Maps with hours, photos and directions." }, img: svcGoogle },
  { id: "manutenzione", titolo: { it: "Manutenzione mensile", en: "Monthly maintenance" }, desc: { it: "Il sito resta aggiornato, sicuro e con backup.", en: "Your site stays updated, secure and backed up." }, img: svcManutenzione },
];

export type Caso = {
  id: string;
  nome: string;
  settore: L;
  fatto: L;
  anno: number | null; // DA COMPILARE
  img: string;
  url: string;
  categoria: CategoriaPortfolio;
};

export type CategoriaPortfolio = "vetrina" | "hospitality" | "professionali" | "personalizzati";
export const CATEGORIE_PORTFOLIO: { id: CategoriaPortfolio; nome: L }[] = [
  { id: "vetrina", nome: { it: "Siti vetrina", en: "Showcase sites" } },
  { id: "hospitality", nome: { it: "Turismo e tempo libero", en: "Tourism and leisure" } },
  { id: "professionali", nome: { it: "Servizi professionali", en: "Professional services" } },
  { id: "personalizzati", nome: { it: "Progetti personalizzati", en: "Custom projects" } },
];

export const CASI_PORTFOLIO: Caso[] = [
  { id: "eriutility", nome: "E-Riutility", settore: { it: "Mercatino dell'usato", en: "Second-hand shop" }, fatto: { it: "Sito vetrina con catalogo", en: "Showcase site with catalogue" }, anno: null, img: workEriutility, url: "https://e-riutility.it", categoria: "vetrina" },
  { id: "cgcars", nome: "C.G. Cars", settore: { it: "Concessionaria auto multimarca", en: "Multi-brand car dealer" }, fatto: { it: "Sito vetrina con parco auto e servizi", en: "Showcase site with car stock and services" }, anno: null, img: workCgcars, url: "https://cgcars.it", categoria: "vetrina" },
  { id: "safety", nome: "Safety Solutions", settore: { it: "Sicurezza sul lavoro", en: "Workplace safety" }, fatto: { it: "Sito vetrina dei servizi", en: "Services showcase site" }, anno: null, img: workSafety, url: "https://safetysolutionproject.lovable.app", categoria: "professionali" },
  { id: "cts", nome: "CTS Cuvio", settore: { it: "Centro turistico sportivo", en: "Sports and tourism centre" }, fatto: { it: "Sito con attività e contatti", en: "Site with activities and contacts" }, anno: null, img: workCts, url: "https://centrocuvio.it", categoria: "hospitality" },
  { id: "adhd", nome: "ADHD e Biscotti", settore: { it: "Divulgazione e blog", en: "Awareness and blog" }, fatto: { it: "Sito su misura con blog, guida e area riservata", en: "Custom site with blog, guide and members area" }, anno: null, img: workAdhd, url: "https://adhdebiscotti.it", categoria: "personalizzati" },
  { id: "crv", nome: "CRV · Centro Revisioni Valcuvia", settore: { it: "Revisioni e officina", en: "Vehicle inspections and garage" }, fatto: { it: "Sito dei servizi bilingue con galleria", en: "Bilingual services site with gallery" }, anno: null, img: workEvent, url: "https://eventmotorsport.com", categoria: "professionali" },
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
  { id: "chi-sono", quota: 3300, nome: { it: "Cresta · Chi sono", en: "Ridge · Who I am" } },
  { id: "faq", quota: 3700, nome: { it: "Anticima · FAQ", en: "Fore-summit · FAQ" } },
  { id: "contatti", quota: 4000, nome: { it: "Vetta · Contatti", en: "Summit · Contact" } },
] as const;

export const QUOTA_MAX = 4000;
export const temperatura = (quota: number) => Math.round(4 - (quota / QUOTA_MAX) * 32);
