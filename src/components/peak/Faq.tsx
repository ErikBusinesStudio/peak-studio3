import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useCopy } from "@/config/copy";
import SectionHead from "./SectionHead";

const Faq = () => {
  const { c } = useCopy();
  return (
    <section id="faq" aria-labelledby="faq-title" className="zone-deep border-t border-border py-24 md:py-32">
      <div className="wrap max-w-4xl">
        <SectionHead id="faq" kicker={c.faq.kicker} quota={3700} title={c.faq.title} />
        <Accordion type="single" collapsible className="space-y-3">
          {c.faq.items.map((f, i) => (
            <AccordionItem key={f.q} value={`f${i}`} className="surface border px-5 md:px-7">
              <AccordionTrigger className="py-5 text-left text-lg font-semibold hover:no-underline md:text-xl">{f.q}</AccordionTrigger>
              <AccordionContent className="pb-5 text-base text-muted-foreground md:text-lg">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
