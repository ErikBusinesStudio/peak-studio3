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
        { h: "Technical cookies", p: "The site uses only technical storage needed to work: language choice, cookie choice and the intro animation. They do not require consent." },
        { h: "Measurement cookies", p: "No profiling or advertising cookies are used. Any anonymous measurement is activated only if you press Accept." },
        { h: "Changing your choice", p: "You can clear the choice at any time by deleting this site's data from your browser settings." },
        { h: "Contact", p: who },
      ] }
    : { title: "Cookie Policy", blocks: [
        { h: "Cookie tecnici", p: "Il sito usa solo memorizzazioni tecniche necessarie al funzionamento: lingua scelta, scelta sui cookie e animazione iniziale. Non richiedono consenso." },
        { h: "Cookie di misurazione", p: "Non uso cookie di profilazione o pubblicitari. Un'eventuale misurazione anonima si attiva solo se premi Accetta." },
        { h: "Modificare la scelta", p: "Puoi revocare la scelta in qualsiasi momento cancellando i dati di questo sito dalle impostazioni del browser." },
        { h: "Contatti", p: who },
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
