import { useRef } from "react";
import { useCopy } from "@/config/copy";
import { GIORNI_CONSEGNA } from "@/config/site";
import { useRevealOnce } from "@/hooks/peak";

/** Quadrante a 7 tacche che si riempiono in sequenza. */
const DialIcon = () => (
  <svg viewBox="0 0 64 64" className="badge-icon" aria-hidden>
    <circle cx="32" cy="32" r="27" fill="none" stroke="hsl(var(--border))" strokeWidth="2" />
    {Array.from({ length: GIORNI_CONSEGNA }, (_, i) => {
      const a = (i / GIORNI_CONSEGNA) * Math.PI * 2 - Math.PI / 2;
      return (
        <line key={i} className="dial-tick" style={{ animationDelay: `${i * 140}ms` }}
          x1={32 + Math.cos(a) * 18} y1={32 + Math.sin(a) * 18} x2={32 + Math.cos(a) * 25} y2={32 + Math.sin(a) * 25} />
      );
    })}
    <line className="dial-hand" x1="32" y1="32" x2="32" y2="13" />
    <circle cx="32" cy="32" r="3" fill="hsl(var(--glacier-700))" />
  </svg>
);

/** Due fumetti con un segnale che pulsa: dialogo diretto. */
const TalkIcon = () => (
  <svg viewBox="0 0 64 64" className="badge-icon" aria-hidden>
    <path d="M8 14h30a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H20l-8 7v-7H8a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4z" fill="none" stroke="hsl(var(--glacier-700))" strokeWidth="2.5" className="talk-a" />
    <path d="M30 30h26a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4h-2v6l-7-6H30a4 4 0 0 1-4-4V34a4 4 0 0 1 4-4z" fill="hsl(var(--glacier-700))" className="talk-b" />
    <circle cx="36" cy="41" r="2" fill="hsl(0 0% 100%)" className="talk-dot" />
    <circle cx="43" cy="41" r="2" fill="hsl(0 0% 100%)" className="talk-dot" style={{ animationDelay: ".15s" }} />
    <circle cx="50" cy="41" r="2" fill="hsl(0 0% 100%)" className="talk-dot" style={{ animationDelay: ".3s" }} />
  </svg>
);

/** Globo a meridiani che ruotano. */
const GlobeIcon = () => (
  <svg viewBox="0 0 64 64" className="badge-icon" aria-hidden>
    <circle cx="32" cy="32" r="25" fill="none" stroke="hsl(var(--glacier-700))" strokeWidth="2.5" />
    <ellipse cx="32" cy="32" rx="25" ry="9" fill="none" stroke="hsl(var(--border))" strokeWidth="1.5" />
    <g className="globe-spin">
      <ellipse cx="32" cy="32" rx="9" ry="25" fill="none" stroke="hsl(var(--glacier-700))" strokeWidth="1.5" />
      <ellipse cx="32" cy="32" rx="18" ry="25" fill="none" stroke="hsl(var(--glacier-500))" strokeWidth="1" />
    </g>
    <circle cx="27" cy="22" r="3.5" fill="hsl(var(--cyan))" stroke="hsl(var(--deep-900))" strokeWidth="1.5" className="globe-pin" />
  </svg>
);

const ICONS = [DialIcon, TalkIcon, GlobeIcon];

const TrustStrip = () => {
  const { c } = useCopy();
  const ref = useRef<HTMLUListElement>(null);
  const shown = useRevealOnce(ref);
  return (
    <section id="fiducia" aria-label={c.trust.label} className="zone-snow relative border-y border-border py-10 md:py-14">
      <div aria-hidden className="tech-grid" />
      <ul ref={ref} className={`wrap relative grid gap-4 md:grid-cols-3 md:gap-6 ${shown ? "badges-in" : ""}`}>
        {c.trust.badges.map((b, i) => {
          const Icon = ICONS[i];
          return (
            <li key={b.tag} className={`badge badge-${i + 1}`} style={{ transitionDelay: `${i * 120}ms` }}>
              <span aria-hidden className="badge-corner tl" />
              <span aria-hidden className="badge-corner br" />
              <div className="flex items-start justify-between gap-4">
                <p className="hud text-muted-foreground">B-0{i + 1} · {b.tag}</p>
                <Icon />
              </div>
              <p className="mt-4 flex items-baseline gap-2">
                <span className="badge-big">{b.big}</span>
                <span className="font-display text-xl font-extrabold uppercase tracking-tight text-[hsl(var(--glacier-700))]">{b.unit}</span>
              </p>
              <p className="mt-2 text-base text-muted-foreground">{b.d}</p>
              <span aria-hidden className="badge-bar" />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default TrustStrip;
