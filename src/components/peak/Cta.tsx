import { MouseEvent, ReactNode, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useCopy } from "@/config/copy";
import { isFinePointer, scrollToId, useReducedMotion } from "@/hooks/peak";

type Props = { kind: "primary" | "secondary"; className?: string };

/**
 * Le uniche due CTA del sito.
 * primary → scorre al modulo contatti · secondary → scorre ai lavori.
 */
const Cta = ({ kind, className = "" }: Props) => {
  const { c } = useCopy();
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const target = kind === "primary" ? "contatti" : "lavori";

  const onMove = (e: MouseEvent) => {
    if (reduced || !isFinePointer() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.18;
    const y = (e.clientY - r.top - r.height / 2) * 0.28;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    // fuori dalla home: torna alla home sulla sezione giusta
    if (!document.getElementById(target)) {
      window.location.assign(`/#${target}`);
      return;
    }
    const el = ref.current;
    if (!reduced && el) {
      el.classList.remove("shatter");
      void el.offsetWidth;
      el.classList.add("shatter");
      window.setTimeout(() => scrollToId(target), 260);
    } else scrollToId(target);
  };

  const label: ReactNode = kind === "primary" ? c.cta.primary : c.cta.secondary;

  return (
    <a
      ref={ref}
      href={`#${target}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={`btn frost-btn ${kind === "primary" ? "btn-primary" : "btn-secondary"} ${className}`}
    >
      <span>{label}</span>
      <ArrowRight aria-hidden className="h-4 w-4 shrink-0" />
      <i aria-hidden className="frost-crystals" />
    </a>
  );
};

export default Cta;
