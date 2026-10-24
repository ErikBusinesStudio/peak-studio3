// Contenuti delle pagine dedicate ai servizi (/servizi/:id). Ogni testo ha it + en.
import { GIORNI_CONSEGNA as g } from "./site";

type L = { it: string; en: string };
export type Layout = "split" | "center" | "overlay" | "stack";

export type ServizioDettaglio = {
  id: string;
  layout: Layout;
  zone: "zone-snow" | "zone-ice" | "zone-mid" | "zone-deep";
  sub: L;
  about: L[];
  problemi: L[];
  vantaggi: { t: L; d: L }[];
  funzioni: L[];
  passi: { t: L; d: L }[];
  faq: { q: L; a: L }[];
  correlati: string[];
  /** mostra i lavori reali del portfolio come esempi */
  esempiPortfolio?: boolean;
};

const passiSito = [
  { t: { it: "Ci sentiamo", en: "We talk" }, d: { it: "Mi racconti l'attività, a chi ti rivolgi e cosa vuoi ottenere.", en: "You tell me about the business, who it's for and what you want to achieve." } },
  { t: { it: "Progetto e costruisco", en: "I design and build" }, d: { it: `Ricevuto il materiale, consegno entro ${g} giorni.`, en: `Once I have the material, I deliver within ${g} days.` } },
  { t: { it: "Online e oltre", en: "Live and beyond" }, d: { it: "Pubblico il sito e resto il tuo riferimento per le modifiche.", en: "I publish the site and stay your contact for changes." } },
];

export const SERVIZI_DETTAGLIO: ServizioDettaglio[] = [
  {
    id: "vetrina",
    layout: "split",
    zone: "zone-snow",
    sub: { it: "Il posto online dove la tua attività si presenta come merita: chiaro, veloce, facile da contattare.", en: "The place online where your business presents itself as it deserves: clear, fast, easy to contact." },
    about: [
      { it: "Un sito vetrina racconta chi sei, cosa fai e come raggiungerti. Lo progetto partendo da chi lo visita: cosa cerca, cosa deve capire subito, quale azione deve fare.", en: "A showcase site tells people who you are, what you do and how to reach you. I design it from the visitor's point of view: what they look for, what they must grasp at once, what action they should take." },
      { it: "Non uso modelli già pronti: struttura, testi e immagini sono pensati per la tua attività, e il sito si adatta a telefono, tablet e computer.", en: "I don't use ready-made templates: structure, copy and images are designed for your business, and the site adapts to phone, tablet and desktop." },
    ],
    problemi: [
      { it: "Chi ti cerca online non trova informazioni chiare o aggiornate.", en: "People searching for you online can't find clear or up-to-date information." },
      { it: "Hai solo una pagina social e non controlli come ti presenti.", en: "You only have a social page and don't control how you present yourself." },
      { it: "Il sito che hai è lento, datato o illeggibile dal telefono.", en: "Your current site is slow, dated or unreadable on a phone." },
    ],
    vantaggi: [
      { t: { it: "Più fiducia", en: "More trust" }, d: { it: "Un'immagine curata fa capire che lavori con cura.", en: "A polished image shows that you work with care." } },
      { t: { it: "Contatto immediato", en: "Instant contact" }, d: { it: "WhatsApp, telefono e modulo sempre a un tocco.", en: "WhatsApp, phone and form always one tap away." } },
      { t: { it: "Tutto in un posto", en: "All in one place" }, d: { it: "Servizi, orari, foto e indicazioni insieme.", en: "Services, hours, photos and directions together." } },
    ],
    funzioni: [
      { it: "Pagine su misura per servizi e prodotti", en: "Custom pages for services and products" },
      { it: "Menù o catalogo consultabile", en: "Browsable menu or catalogue" },
      { it: "Pulsante WhatsApp e modulo contatti", en: "WhatsApp button and contact form" },
      { it: "Mappa e indicazioni", en: "Map and directions" },
      { it: "Ottimizzazione di base per Google", en: "Basic Google optimisation" },
      { it: "Seconda lingua", en: "Second language" },
    ],
    passi: passiSito,
    faq: [
      { q: { it: "Quante pagine posso avere?", en: "How many pages can I have?" }, a: { it: "Dipende dal piano: da una pagina singola fino a pagine illimitate. Scegliamo insieme quello che serve davvero.", en: "It depends on the plan: from a single page up to unlimited pages. We choose together what you really need." } },
      { q: { it: "Posso aggiungere pagine in futuro?", en: "Can I add pages later?" }, a: { it: "Sì, il sito cresce con te. Le modifiche le faccio io.", en: "Yes, the site grows with you. I make the changes." } },
      { q: { it: "Devo fornire io i testi?", en: "Do I need to provide the copy?" }, a: { it: "Mi servono le informazioni di base. Se vuoi, i testi li posso scrivere io.", en: "I need the basic information. If you like, I can write the copy." } },
    ],
    correlati: ["landing", "logo", "google"],
    esempiPortfolio: true,
  },
  {
    id: "landing",
    layout: "center",
    zone: "zone-ice",
    sub: { it: "Una pagina, un obiettivo. Pensata per trasformare chi arriva in una richiesta concreta.", en: "One page, one goal. Designed to turn visitors into a concrete request." },
    about: [
      { it: "La landing page serve quando hai una cosa precisa da proporre: un servizio, una promozione, un evento. Niente distrazioni, solo il messaggio e l'azione da compiere.", en: "A landing page is for when you have one specific thing to offer: a service, a promotion, an event. No distractions, just the message and the action to take." },
      { it: "Costruisco la pagina in sequenza: il problema, la soluzione, i dettagli, le domande, il pulsante. Ogni blocco ha un motivo per esserci.", en: "I build the page as a sequence: the problem, the solution, the details, the questions, the button. Every block has a reason to be there." },
    ],
    problemi: [
      { it: "Fai pubblicità ma chi clicca arriva su una pagina generica.", en: "You advertise but clicks land on a generic page." },
      { it: "Hai una proposta nuova e nessun posto dove spiegarla bene.", en: "You have a new offer and nowhere to explain it well." },
      { it: "Ricevi visite ma poche richieste.", en: "You get visits but few requests." },
    ],
    vantaggi: [
      { t: { it: "Messaggio chiaro", en: "Clear message" }, d: { it: "Una sola idea, detta bene.", en: "One idea, said well." } },
      { t: { it: "Un'azione", en: "One action" }, d: { it: "Il visitatore sa sempre cosa fare.", en: "Visitors always know what to do." } },
      { t: { it: "Tempi rapidi", en: "Fast turnaround" }, d: { it: `Online entro ${g} giorni dal materiale.`, en: `Live within ${g} days of the material.` } },
    ],
    funzioni: [
      { it: "Struttura persuasiva in sezioni", en: "Persuasive section structure" },
      { it: "Modulo di richiesta o pulsante WhatsApp", en: "Request form or WhatsApp button" },
      { it: "Domande frequenti integrate", en: "Built-in FAQ" },
      { it: "Pensata prima per il telefono", en: "Designed phone-first" },
      { it: "Statistiche delle visite (su richiesta)", en: "Visit statistics (on request)" },
    ],
    passi: passiSito,
    faq: [
      { q: { it: "Che differenza c'è con un sito vetrina?", en: "How is it different from a showcase site?" }, a: { it: "Il sito vetrina presenta tutta l'attività; la landing spinge una sola proposta.", en: "A showcase site presents the whole business; a landing page pushes one offer." } },
      { q: { it: "Posso usarla per una campagna?", en: "Can I use it for a campaign?" }, a: { it: "Sì, è il suo uso ideale.", en: "Yes, that's its ideal use." } },
      { q: { it: "Si può trasformare in sito completo?", en: "Can it become a full site?" }, a: { it: "Sì, si può ampliare con altre pagine in seguito.", en: "Yes, it can be extended with more pages later." } },
    ],
    correlati: ["vetrina", "google", "manutenzione"],
  },
  {
    id: "logo",
    layout: "overlay",
    zone: "zone-deep",
    sub: { it: "Un segno semplice da ricordare, che funziona sul sito, sull'insegna e sui social.", en: "A simple mark to remember, working on your site, sign and social media." },
    about: [
      { it: "Un logo non è un disegno decorativo: è il modo in cui le persone ti riconoscono. Parto da cosa ti distingue e lo traduco in forma, colori e carattere tipografico.", en: "A logo isn't decoration: it's how people recognise you. I start from what sets you apart and turn it into shape, colours and typeface." },
      { it: "Insieme al logo definisco poche regole d'uso, così l'immagine resta coerente ovunque.", en: "Along with the logo I define a few usage rules, so your image stays consistent everywhere." },
    ],
    problemi: [
      { it: "Il logo attuale è poco leggibile o non ti rappresenta più.", en: "Your current logo is hard to read or no longer represents you." },
      { it: "Usi colori e caratteri diversi ogni volta.", en: "You use different colours and fonts every time." },
      { it: "Non hai i file giusti per stampa e web.", en: "You don't have the right files for print and web." },
    ],
    vantaggi: [
      { t: { it: "Riconoscibilità", en: "Recognition" }, d: { it: "Un segno che resta in mente.", en: "A mark that sticks." } },
      { t: { it: "Coerenza", en: "Consistency" }, d: { it: "Stessa immagine su ogni supporto.", en: "The same image on every medium." } },
      { t: { it: "File pronti", en: "Ready files" }, d: { it: "Versioni per stampa, web e social.", en: "Versions for print, web and social." } },
    ],
    funzioni: [
      { it: "Logo principale e varianti", en: "Main logo and variants" },
      { it: "Palette colori", en: "Colour palette" },
      { it: "Caratteri tipografici", en: "Typefaces" },
      { it: "Icona per social e favicon", en: "Social icon and favicon" },
      { it: "Regole d'uso essenziali", en: "Essential usage rules" },
    ],
    passi: [
      { t: { it: "Ascolto", en: "Listening" }, d: { it: "Capisco valori, clienti e concorrenti.", en: "I understand values, customers and competitors." } },
      { t: { it: "Proposte", en: "Proposals" }, d: { it: "Ti mostro le direzioni e scegliamo insieme.", en: "I show you the directions and we choose together." } },
      { t: { it: "Consegna", en: "Delivery" }, d: { it: "Ricevi i file finali pronti all'uso.", en: "You get the final files ready to use." } },
    ],
    faq: [
      { q: { it: "Posso partire dal logo che ho?", en: "Can we start from my current logo?" }, a: { it: "Sì, a volte basta rinnovarlo invece di rifarlo.", en: "Yes, sometimes a refresh is enough." } },
      { q: { it: "In che formati lo ricevo?", en: "Which formats do I get?" }, a: { it: "Formati per stampa e per web, con fondo chiaro e scuro.", en: "Print and web formats, for light and dark backgrounds." } },
      { q: { it: "Il logo è mio?", en: "Do I own the logo?" }, a: { it: "Sì, una volta consegnato è tuo.", en: "Yes, once delivered it's yours." } },
    ],
    correlati: ["vetrina", "landing", "google"],
  },
  {
    id: "dominio",
    layout: "stack",
    zone: "zone-mid",
    sub: { it: "Il tuo indirizzo online e le email con il tuo nome. Alla parte tecnica penso io.", en: "Your own web address and branded email. I handle the technical side." },
    about: [
      { it: "Scelgo con te il nome del dominio, lo registro a nome tuo e lo collego al sito. Configuro le email professionali, così scrivi ai clienti da un indirizzo che ispira fiducia.", en: "I pick the domain name with you, register it in your name and connect it to the site. I set up business email, so you write to customers from an address that inspires trust." },
      { it: "Dominio ed email restano tuoi: non sei legato a me per usarli.", en: "Domain and email stay yours: you're not tied to me to use them." },
    ],
    problemi: [
      { it: "Usi un'email generica che sembra poco professionale.", en: "You use a generic email that looks unprofessional." },
      { it: "Non sai dove è registrato il tuo dominio né chi lo controlla.", en: "You don't know where your domain is registered or who controls it." },
      { it: "Configurazioni tecniche che non hai tempo di seguire.", en: "Technical setup you have no time for." },
    ],
    vantaggi: [
      { t: { it: "Credibilità", en: "Credibility" }, d: { it: "Email con il nome della tua attività.", en: "Email with your business name." } },
      { t: { it: "Proprietà", en: "Ownership" }, d: { it: "Il dominio è registrato a tuo nome.", en: "The domain is registered in your name." } },
      { t: { it: "Zero pensieri", en: "No hassle" }, d: { it: "La configurazione la seguo io.", en: "I take care of the setup." } },
    ],
    funzioni: [
      { it: "Scelta e registrazione del dominio", en: "Domain choice and registration" },
      { it: "Collegamento al sito", en: "Connection to the site" },
      { it: "Email professionali", en: "Business email" },
      { it: "Certificato di sicurezza (https)", en: "Security certificate (https)" },
      { it: "Spostamento da un fornitore precedente", en: "Transfer from a previous provider" },
    ],
    passi: [
      { t: { it: "Scelta del nome", en: "Choosing the name" }, d: { it: "Verifichiamo quali nomi sono liberi.", en: "We check which names are available." } },
      { t: { it: "Configurazione", en: "Setup" }, d: { it: "Registro, collego e attivo le email.", en: "I register, connect and activate email." } },
      { t: { it: "Consegna accessi", en: "Access handover" }, d: { it: "Ti spiego come usare la tua casella.", en: "I show you how to use your mailbox." } },
    ],
    faq: [
      { q: { it: "Ho già un dominio, va bene?", en: "I already have a domain, is that fine?" }, a: { it: "Sì, lo collego al nuovo sito.", en: "Yes, I connect it to the new site." } },
      { q: { it: "Quante caselle email posso avere?", en: "How many mailboxes can I have?" }, a: { it: "Lo decidiamo in base alle tue esigenze nel preventivo.", en: "We decide based on your needs in the quote." } },
      { q: { it: "Di chi è il dominio?", en: "Who owns the domain?" }, a: { it: "Tuo, registrato a tuo nome.", en: "You do, it's registered in your name." } },
    ],
    correlati: ["vetrina", "manutenzione", "landing"],
  },
  {
    id: "google",
    layout: "split",
    zone: "zone-ice",
    sub: { it: "Quando qualcuno cerca la tua attività su Google o Maps, trova orari, foto e indicazioni giuste.", en: "When someone searches for your business on Google or Maps, they find the right hours, photos and directions." },
    about: [
      { it: "La scheda Google Business è spesso la prima cosa che le persone vedono di te. La creo o la sistemo con informazioni complete, categorie corrette, foto e collegamento al sito.", en: "Your Google Business Profile is often the first thing people see of you. I create or fix it with complete information, correct categories, photos and a link to your site." },
      { it: "Ti spiego anche come rispondere alle recensioni e tenere aggiornati gli orari.", en: "I also show you how to reply to reviews and keep hours up to date." },
    ],
    problemi: [
      { it: "La tua attività non compare su Maps o compare con dati sbagliati.", en: "Your business doesn't show on Maps, or shows wrong details." },
      { it: "Orari e telefono non aggiornati fanno perdere clienti.", en: "Outdated hours and phone cost you customers." },
      { it: "Scheda senza foto e senza collegamento al sito.", en: "A profile with no photos and no link to your site." },
    ],
    vantaggi: [
      { t: { it: "Ti trovano", en: "You get found" }, d: { it: "Presenza curata su Google e Maps.", en: "A polished presence on Google and Maps." } },
      { t: { it: "Informazioni giuste", en: "Correct info" }, d: { it: "Orari, contatti e indicazioni chiari.", en: "Clear hours, contacts and directions." } },
      { t: { it: "Collegata al sito", en: "Linked to your site" }, d: { it: "Chi ti trova arriva subito al sito.", en: "People who find you reach your site." } },
    ],
    funzioni: [
      { it: "Creazione o verifica della scheda", en: "Profile creation or verification" },
      { it: "Categorie e descrizione", en: "Categories and description" },
      { it: "Foto e logo", en: "Photos and logo" },
      { it: "Orari e servizi", en: "Hours and services" },
      { it: "Collegamento al sito web", en: "Link to the website" },
    ],
    passi: [
      { t: { it: "Controllo", en: "Check" }, d: { it: "Vedo cosa c'è già e cosa manca.", en: "I see what's there and what's missing." } },
      { t: { it: "Sistemazione", en: "Setup" }, d: { it: "Completo e ordino tutte le informazioni.", en: "I complete and organise all the information." } },
      { t: { it: "Affidamento", en: "Handover" }, d: { it: "Ti lascio la scheda pronta e ti spiego come usarla.", en: "I leave you the profile ready and show you how to use it." } },
    ],
    faq: [
      { q: { it: "Serve un sito per avere la scheda?", en: "Do I need a website for a profile?" }, a: { it: "No, ma collegarli aiuta chi ti cerca.", en: "No, but linking them helps people who look for you." } },
      { q: { it: "Quanto costa?", en: "How much is it?" }, a: { it: "È un'aggiunta da 40 €.", en: "It's a €40 add-on." } },
      { q: { it: "La scheda resta mia?", en: "Does the profile stay mine?" }, a: { it: "Sì, è associata al tuo account.", en: "Yes, it's linked to your account." } },
    ],
    correlati: ["vetrina", "landing", "logo"],
  },
  {
    id: "manutenzione",
    layout: "center",
    zone: "zone-deep",
    sub: { it: "Il sito resta aggiornato, sicuro e salvato. Quando serve una modifica, mi scrivi e la faccio io.", en: "Your site stays updated, secure and backed up. When you need a change, you message me and I do it." },
    about: [
      { it: "Un sito è uno strumento vivo: orari che cambiano, nuove foto, nuovi servizi. Con la manutenzione mensile non devi pensarci tu.", en: "A website is a living tool: changing hours, new photos, new services. With monthly maintenance you don't have to think about it." },
      { it: "Ogni mese controllo, salvo e aggiorno. Tutte le modifiche dopo la consegna le faccio io.", en: "Every month I check, back up and update. All changes after delivery are made by me." },
    ],
    problemi: [
      { it: "Il sito invecchia e nessuno lo aggiorna.", en: "The site ages and nobody updates it." },
      { it: "Hai paura di perdere tutto per un problema tecnico.", en: "You fear losing everything to a technical issue." },
      { it: "Non hai tempo per seguire la parte tecnica.", en: "You have no time for the technical side." },
    ],
    vantaggi: [
      { t: { it: "Sicurezza", en: "Security" }, d: { it: "Scansione mensile e backup esterno.", en: "Monthly scan and external backup." } },
      { t: { it: "Sempre aggiornato", en: "Always current" }, d: { it: "Aggiornamenti grafici e tecnici.", en: "Design and technical updates." } },
      { t: { it: "Un riferimento", en: "One contact" }, d: { it: "Scrivi a me, sempre.", en: "You always write to me." } },
    ],
    funzioni: [
      { it: "Aggiornamenti grafici e tecnici", en: "Design and technical updates" },
      { it: "Backup mensile su server esterno", en: "Monthly backup on an external server" },
      { it: "Scansione di sicurezza mensile", en: "Monthly security scan" },
      { it: "Recap delle visite su richiesta", en: "Visits recap on request" },
    ],
    passi: [
      { t: { it: "Attivazione", en: "Activation" }, d: { it: "Parte dal mese dopo la consegna.", en: "Starts the month after delivery." } },
      { t: { it: "Controllo mensile", en: "Monthly check" }, d: { it: "Backup, sicurezza e aggiornamenti.", en: "Backup, security and updates." } },
      { t: { it: "Richieste", en: "Requests" }, d: { it: "Mi scrivi le modifiche e le applico.", en: "You send me changes and I apply them." } },
    ],
    faq: [
      { q: { it: "Quanto costa?", en: "How much is it?" }, a: { it: "50 € al mese.", en: "€50 per month." } },
      { q: { it: "Chi fa le modifiche?", en: "Who makes changes?" }, a: { it: "Le faccio io: mi scrivi cosa cambiare.", en: "I do: tell me what to change." } },
      { q: { it: "È obbligatoria?", en: "Is it mandatory?" }, a: { it: "Ne parliamo nel preventivo in base alle tue esigenze.", en: "We discuss it in the quote based on your needs." } },
    ],
    correlati: ["vetrina", "dominio", "google"],
  },
];
