import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Quanto tempo ci vuole per avere il sito pronto?",
    a: "Il sito viene consegnato in 24-48 ore dalla conferma del progetto. Nessuna attesa infinita come le agenzie tradizionali.",
  },
  {
    q: "Devo pagare ogni mese?",
    a: "Il sito è tuo con un pagamento unico. Se vuoi, puoi aggiungere un piano di gestione mensile o annuale per aggiornamenti, SEO e manutenzione — ma non è obbligatorio.",
  },
  {
    q: "Posso modificare il sito da solo dopo la consegna?",
    a: "Certo. Ti fornisco un pannello semplice per modificare testi e immagini. Per modifiche strutturali, ci penso io.",
  },
  {
    q: "Il sito sarà ottimizzato per Google (SEO)?",
    a: "Assolutamente sì. Ogni sito è costruito con le migliori pratiche SEO: velocità, struttura, meta tag e contenuti ottimizzati per farti trovare dai tuoi clienti.",
  },
  {
    q: "Cosa succede se non sono soddisfatto?",
    a: "Garanzia soddisfatti o rimborsati. Se il sito non ti convince, ti restituisco tutto. Zero rischi per te.",
  },
  {
    q: "Offrite assistenza dopo la consegna?",
    a: "Sì. Hai 30 giorni di supporto gratuito incluso. Dopo, puoi attivare un piano di gestione per assistenza continua.",
  },
];

const FaqSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="faq" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px]" />

      <div className="container mx-auto relative z-10 max-w-3xl" ref={ref}>
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="red-line mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Domande <span className="text-gradient">frequenti</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Tutto quello che devi sapere, senza giri di parole.
          </p>
        </div>

        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border rounded-lg px-6 bg-card/50 backdrop-blur-sm"
              >
                <AccordionTrigger className="text-left font-bold text-sm md:text-base hover:no-underline hover:text-primary transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
