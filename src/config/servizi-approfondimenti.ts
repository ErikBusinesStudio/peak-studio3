// Approfondimenti per le pagine servizio: per chi è, cosa ricevi, cosa mi serve da te. Ogni testo ha it + en.
type L = { it: string; en: string };
export type Approfondimento = { perChi: L[]; ricevi: L[]; serve: L[] };

export const APPROFONDIMENTI: Record<string, Approfondimento> = {
  vetrina: {
    perChi: [
      { it: "Negozi, artigiani e attività locali", en: "Shops, craftspeople and local businesses" },
      { it: "Professionisti e studi", en: "Freelancers and studios" },
      { it: "Ristoranti, bar e strutture ricettive", en: "Restaurants, bars and accommodation" },
      { it: "Associazioni e centri sportivi", en: "Associations and sports centres" },
    ],
    ricevi: [
      { it: "Sito progettato su misura, non un modello", en: "A site designed from scratch, not a template" },
      { it: "Versione perfetta per telefono, tablet e computer", en: "Polished on phone, tablet and desktop" },
      { it: "Pagine veloci e leggibili anche con connessione lenta", en: "Fast, readable pages even on slow connections" },
      { it: "Collegamento a WhatsApp, telefono, email e mappa", en: "Links to WhatsApp, phone, email and map" },
      { it: "Impostazioni di base per comparire su Google", en: "Basic settings to show up on Google" },
      { it: "Pubblicazione online e un riferimento diretto: io", en: "Publishing online and one direct contact: me" },
    ],
    serve: [
      { it: "Logo e colori, se li hai già", en: "Logo and colours, if you already have them" },
      { it: "Foto dell'attività o dei prodotti", en: "Photos of the business or products" },
      { it: "Servizi, orari e contatti", en: "Services, hours and contacts" },
    ],
  },
  landing: {
    perChi: [
      { it: "Chi lancia un servizio o un prodotto nuovo", en: "Anyone launching a new service or product" },
      { it: "Campagne pubblicitarie su Google o social", en: "Ad campaigns on Google or social media" },
      { it: "Eventi, corsi e promozioni a tempo", en: "Events, courses and limited-time offers" },
    ],
    ricevi: [
      { it: "Una pagina costruita attorno a un solo obiettivo", en: "One page built around a single goal" },
      { it: "Testi ordinati per guidare verso la richiesta", en: "Copy ordered to lead towards the request" },
      { it: "Modulo o pulsante di contatto sempre visibile", en: "Contact form or button always in view" },
      { it: "Sezione domande frequenti per togliere i dubbi", en: "FAQ section to clear doubts" },
      { it: "Pronta per collegare statistiche e campagne", en: "Ready to connect analytics and campaigns" },
    ],
    serve: [
      { it: "La proposta e a chi è rivolta", en: "The offer and who it's for" },
      { it: "L'azione che vuoi far compiere", en: "The action you want people to take" },
      { it: "Eventuali immagini o video", en: "Any images or videos" },
    ],
  },
  logo: {
    perChi: [
      { it: "Attività appena nate", en: "Brand-new businesses" },
      { it: "Chi ha un logo datato o poco leggibile", en: "Anyone with a dated or hard-to-read logo" },
      { it: "Chi vuole un'immagine coerente ovunque", en: "Anyone wanting a consistent look everywhere" },
    ],
    ricevi: [
      { it: "Proposte di logo pensate per la tua attività", en: "Logo proposals designed for your business" },
      { it: "Versioni a colori, in bianco e in nero", en: "Colour, white and black versions" },
      { it: "Palette colori e caratteri consigliati", en: "Suggested colour palette and typefaces" },
      { it: "File pronti per sito, social, stampa e insegna", en: "Files ready for web, social, print and signage" },
    ],
    serve: [
      { it: "Nome dell'attività ed eventuale slogan", en: "Business name and any tagline" },
      { it: "Cosa ti piace e cosa no, anche con esempi", en: "What you like and dislike, even with examples" },
    ],
  },
  dominio: {
    perChi: [
      { it: "Chi usa ancora un'email gratuita per lavoro", en: "Anyone still using a free email for work" },
      { it: "Chi non sa dove sia registrato il proprio sito", en: "Anyone unsure where their site is registered" },
      { it: "Chi vuole un indirizzo che parli di sé", en: "Anyone wanting an address that speaks for them" },
    ],
    ricevi: [
      { it: "Scelta e registrazione del nome del sito", en: "Choice and registration of the site name" },
      { it: "Spazio online affidabile per il sito", en: "Reliable hosting for the site" },
      { it: "Caselle email con il tuo nome", en: "Mailboxes with your own name" },
      { it: "Configurazione su telefono e computer", en: "Setup on phone and computer" },
      { it: "Certificato di sicurezza (il lucchetto)", en: "Security certificate (the padlock)" },
    ],
    serve: [
      { it: "Il nome che vorresti usare", en: "The name you'd like to use" },
      { it: "Quante caselle email ti servono", en: "How many mailboxes you need" },
    ],
  },
  google: {
    perChi: [
      { it: "Attività con una sede dove ricevere clienti", en: "Businesses with a place to welcome customers" },
      { it: "Chi lavora in una zona precisa", en: "Anyone working in a specific area" },
      { it: "Chi vuole raccogliere recensioni vere", en: "Anyone wanting to collect genuine reviews" },
    ],
    ricevi: [
      { it: "Scheda creata o sistemata da zero", en: "Profile created or fixed from scratch" },
      { it: "Categorie, orari, servizi e foto curati", en: "Curated categories, hours, services and photos" },
      { it: "Collegamento al sito e a WhatsApp", en: "Link to your website and WhatsApp" },
      { it: "Consigli per chiedere recensioni ai clienti", en: "Tips for asking customers for reviews" },
    ],
    serve: [
      { it: "Indirizzo e orari dell'attività", en: "Business address and hours" },
      { it: "Alcune foto reali", en: "A few real photos" },
    ],
  },
  manutenzione: {
    perChi: [
      { it: "Chi vuole un sito sempre aggiornato senza pensarci", en: "Anyone wanting an always-updated site without thinking about it" },
      { it: "Chi cambia spesso orari, prezzi o offerte", en: "Anyone who often changes hours, prices or offers" },
    ],
    ricevi: [
      { it: "Modifiche a testi e immagini fatte da me", en: "Text and image changes done by me" },
      { it: "Aggiornamenti tecnici e controlli di sicurezza", en: "Technical updates and security checks" },
      { it: "Backup mensile su server esterno", en: "Monthly backup on an external server" },
      { it: "Riepilogo visite su richiesta", en: "Visits recap on request" },
    ],
    serve: [
      { it: "Un messaggio quando vuoi cambiare qualcosa", en: "A message whenever you want to change something" },
    ],
  },
};
