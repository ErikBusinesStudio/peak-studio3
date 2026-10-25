import Header from "@/components/peak/Header";
import Footer from "@/components/peak/Footer";
import CookieBanner from "@/components/peak/CookieBanner";
import { useCopy } from "@/config/copy";
import { CONTATTI, DATI_LEGALI } from "@/config/site";
import { usePageMeta } from "@/hooks/peak";

type Block = { h: string; p: string };

const content = (kind: "privacy" | "cookie", lang: "it" | "en"): { title: string; blocks: Block[] } => {
  const who = `${DATI_LEGALI.ditta}, ${CONTATTI.email}`;
  if (kind === "privacy")
    return lang === "en"
      ? { title: "Privacy Policy", blocks: [
          { h: "Data controller", p: who },
          { h: "Data collected", p: "Name, phone or email, type of business and the message you send via the contact form or WhatsApp." },
          { h: "Purpose and legal basis", p: "Replying to your request and preparing a quote (pre-contractual measures, art. 6.1.b GDPR)." },
          { h: "Retention", p: "Data is kept for the time needed to handle the request and for up to 24 months afterwards, unless a contract follows." },
          { h: "Your rights", p: `You can request access, correction, deletion or restriction of your data by writing to ${CONTATTI.email}. You can also lodge a complaint with the Italian Data Protection Authority.` },
        ] }
      : { title: "Informativa privacy", blocks: [
          { h: "Titolare del trattamento", p: who },
          { h: "Dati raccolti", p: "Nome, telefono o email, tipo di attività e il messaggio che invii dal modulo contatti o su WhatsApp." },
          { h: "Finalità e base giuridica", p: "Rispondere alla tua richiesta e preparare un preventivo (misure precontrattuali, art. 6.1.b GDPR)." },
          { h: "Conservazione", p: "I dati sono conservati per il tempo necessario a gestire la richiesta e fino a 24 mesi successivi, salvo instaurazione di un contratto." },
          { h: "I tuoi diritti", p: `Puoi chiedere accesso, rettifica, cancellazione o limitazione dei tuoi dati scrivendo a ${CONTATTI.email}. Puoi anche proporre reclamo al Garante per la protezione dei dati personali.` },
        ] };
  return lang === "en"
    ? { title: "Cookie Policy", blocks: [
        { h: "Who is responsible", p: `${who}. This policy explains what this site stores on your device and why, under the GDPR (EU Regulation 2016/679), Legislative Decree 196/2003 and the Italian Data Protection Authority guidelines on cookies of 10 June 2021.` },
        { h: "What cookies are", p: "Cookies and similar technologies (such as the browser's local or session storage) are small pieces of information a site saves on your device to work properly or to remember your choices." },
        { h: "Technical storage used by this site", p: "Language chosen (IT/EN), kept until you change it; cookie banner choice, kept only for the current visit; intro animation already seen, kept for the current visit. These are strictly necessary and do not require consent." },
        { h: "Profiling and advertising cookies", p: "This site does not use profiling, advertising or retargeting cookies, and does not sell or share your data for marketing." },
        { h: "Measurement cookies", p: "No analytics tools are active right now. If anonymous measurement is added in the future, it will start only after you press Accept and this page will be updated with the provider's name." },
        { h: "Third-party services", p: "When you click on WhatsApp, a portfolio project or another external link, you leave this site: those services apply their own cookie policies, which I do not control. The site fonts are served by the same server as the site." },
        { h: "Why the banner appears at every visit", p: "Your choice is stored only for the current visit. Every time you come back, the banner asks you again, so you always decide freshly and nothing is remembered about you between visits." },
        { h: "How to change or revoke your choice", p: "Close the tab and reopen the site to choose again. You can also delete this site's data or block cookies from your browser settings (Chrome, Safari, Firefox, Edge all offer this in the privacy section). Blocking technical storage may stop the language choice from being remembered." },
        { h: "Your rights", p: `You can ask for information, access or deletion at any time by writing to ${CONTATTI.email}, and lodge a complaint with the Italian Data Protection Authority (garanteprivacy.it). See also the Privacy Policy.` },
        { h: "Updates", p: "This policy may change if the site changes. The current version is always on this page." },
      ] }
    : { title: "Cookie Policy", blocks: [
        { h: "Chi è responsabile", p: `${who}. Questa informativa spiega cosa salva il sito sul tuo dispositivo e perché, secondo il GDPR (Regolamento UE 2016/679), il D.Lgs. 196/2003 e le Linee guida del Garante privacy sui cookie del 10 giugno 2021.` },
        { h: "Cosa sono i cookie", p: "I cookie e le tecnologie simili (come la memoria locale o di sessione del browser) sono piccole informazioni che un sito salva sul tuo dispositivo per funzionare bene o ricordare le tue scelte." },
        { h: "Memorizzazioni tecniche usate dal sito", p: "Lingua scelta (IT/EN), conservata finché non la cambi; scelta sul banner cookie, conservata solo per la visita in corso; animazione iniziale già vista, conservata per la visita in corso. Sono strettamente necessarie e non richiedono consenso." },
        { h: "Cookie di profilazione e pubblicitari", p: "Il sito non usa cookie di profilazione, pubblicitari o di retargeting, e non vendo né cedo i tuoi dati per scopi di marketing." },
        { h: "Cookie di misurazione", p: "Al momento non è attivo nessuno strumento di statistica. Se in futuro aggiungerò una misurazione anonima, partirà solo dopo che premi Accetta e questa pagina verrà aggiornata con il nome del fornitore." },
        { h: "Servizi di terze parti", p: "Quando clicchi su WhatsApp, su un progetto del portfolio o su un altro link esterno esci dal sito: quei servizi applicano le proprie regole sui cookie, che non controllo. I caratteri del sito sono serviti dallo stesso server del sito." },
        { h: "Perché il banner compare a ogni visita", p: "La tua scelta viene conservata solo per la visita in corso. Ogni volta che torni il banner te lo richiede, così decidi sempre da capo e tra una visita e l'altra non viene ricordato nulla di te." },
        { h: "Come modificare o revocare la scelta", p: "Chiudi la scheda e riapri il sito per scegliere di nuovo. Puoi anche cancellare i dati di questo sito o bloccare i cookie dalle impostazioni del browser (Chrome, Safari, Firefox ed Edge lo permettono nella sezione privacy). Bloccare le memorizzazioni tecniche può impedire che la lingua scelta venga ricordata." },
        { h: "I tuoi diritti", p: `Puoi chiedere informazioni, accesso o cancellazione in qualsiasi momento scrivendo a ${CONTATTI.email}, e proporre reclamo al Garante per la protezione dei dati personali (garanteprivacy.it). Vedi anche l'Informativa privacy.` },
        { h: "Aggiornamenti", p: "Questa informativa può cambiare se cambia il sito. La versione in vigore è sempre in questa pagina." },
      ] };
};

const Legal = ({ kind }: { kind: "privacy" | "cookie" }) => {
  const { lang } = useCopy();
  const { title, blocks } = content(kind, lang);
  usePageMeta(`${title} | Peak Studio`, title);
  return (
    <>
      <Header />
      <main id="contenuto" tabIndex={-1} className="zone-snow min-h-screen pt-28 outline-none">
        <article className="wrap max-w-3xl pb-24">
          <h1 className="section-title !text-[clamp(2.5rem,9vw,6rem)]">{title}</h1>
          {blocks.map((b) => (
            <section key={b.h} className="mt-10">
              <h2 className="font-display text-2xl font-extrabold">{b.h}</h2>
              <p className="mt-3 text-muted-foreground">{b.p}</p>
            </section>
          ))}
        </article>
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
};

export default Legal;
