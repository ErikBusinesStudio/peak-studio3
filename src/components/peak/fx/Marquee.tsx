import { useRef } from "react";
import { useCopy } from "@/config/copy";
import { useInView } from "@/hooks/peak";

/**
 * Striscia scorrevole a velocità costante, indipendente dallo scroll.
 * Due copie identiche + translateX(-50%) in CSS = loop senza giunture.
 * Si ferma fuori schermo e con prefers-reduced-motion (vedi .marquee-track in index.css).
 */
const Marquee = () => {
  const { c } = useCopy();
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap);
  const items = c.marquee.split("✦").map((t) => t.trim()).filter(Boolean);
  const Group = () => (
    <div className="flex shrink-0 items-center">
      {items.map((t) => (
        <span key={t} className="flex items-center">
          <span className="px-6 md:px-10">{t}</span>
          <span aria-hidden className="marquee-star" />
        </span>
      ))}
    </div>
  );
  return (
    <div ref={wrap} className="zone-ice-2 relative overflow-hidden border-y border-border py-6 md:py-10" role="img" aria-label={items.join(" · ")}>
      <div aria-hidden className={`marquee-track font-display text-[clamp(2.5rem,8vw,7.5rem)] font-extrabold uppercase leading-none tracking-tight ${inView ? "" : "is-paused"}`}>
        <Group />
        <Group />
      </div>
    </div>
  );
};

export default Marquee;
