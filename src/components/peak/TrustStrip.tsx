import { useCopy } from "@/config/copy";
import { SITI_REALIZZATI } from "@/config/site";

const TrustStrip = () => {
  const { c } = useCopy();
  const items = [
    SITI_REALIZZATI !== null ? `${c.trust.siti}: ${SITI_REALIZZATI}` : null,
    c.trust.consegna,
    c.trust.assistenza,
    c.trust.zona,
  ].filter(Boolean) as string[];

  return (
    <section id="fiducia" aria-label={c.trust.label} className="zone-snow border-y border-border py-8">
      <ul className="wrap grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((t) => (
          <li key={t} className="flex items-center gap-3 text-base font-semibold md:text-lg">
            <span aria-hidden className="h-2.5 w-2.5 shrink-0 rotate-45 bg-[hsl(var(--glacier-700))]" />
            {t}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TrustStrip;
