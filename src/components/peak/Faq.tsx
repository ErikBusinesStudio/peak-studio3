import { ChevronDown } from "lucide-react";
import { useCopy } from "@/config/copy";
import SectionHead from "./SectionHead";

/** Accordion nativo (details/summary): tastiera e lettori di schermo funzionano senza script. */
const Faq = () => {
  const { c } = useCopy();
  return (
    <section id="faq" aria-labelledby="faq-title" className="zone-deep border-t border-border py-24 md:py-32">
      <div className="wrap max-w-4xl">
        <SectionHead id="faq" kicker={c.faq.kicker} quota={3700} title={c.faq.title} />
        <div className="space-y-3">
          {c.faq.items.map((f) => (
            <details key={f.q} className="faq surface group px-5 md:px-7">
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-semibold md:text-xl [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown aria-hidden className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="pb-5 text-base text-muted-foreground md:text-lg">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
