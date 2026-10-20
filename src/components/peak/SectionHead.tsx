import { ReactNode, useRef } from "react";
import { useRevealOnce } from "@/hooks/peak";

/** Intestazione di sezione: quota (coerente con l'altimetro) + titolo gigante. */
const SectionHead = ({ id, kicker, quota, title, intro }: { id: string; kicker: string; quota: number; title: string; intro?: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useRevealOnce(ref);
  return (
    <div ref={ref} className={`reveal ${shown ? "is-in" : ""} mb-12 md:mb-16`}>
      <p className="kicker mb-5">
        {kicker} · {quota.toLocaleString("it-IT")} m
      </p>
      <h2 id={`${id}-title`} className="section-title">
        {title}
      </h2>
      {intro && <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">{intro}</p>}
    </div>
  );
};

export default SectionHead;
