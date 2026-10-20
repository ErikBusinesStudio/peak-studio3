import { MouseEvent, useRef } from "react";
import { Globe, Layout, PenTool, Server, MapPin, Wrench } from "lucide-react";
import heroImg from "@/assets/hero-glacier-m.webp";
import { useCopy } from "@/config/copy";
import { SERVIZI } from "@/config/site";
import { isFinePointer, useReducedMotion } from "@/hooks/peak";
import SectionHead from "./SectionHead";

const ICONS = [Globe, Layout, PenTool, Server, MapPin, Wrench];
const POS = ["20% 30%", "50% 20%", "80% 35%", "35% 55%", "65% 45%", "90% 20%"];

/** Card "blocco di ghiaccio": tilt 3D, riflesso speculare, immagine che si disgela all'hover. */
const IceCard = ({ i, title, desc }: { i: number; title: string; desc: string }) => {
  const ref = useRef<HTMLLIElement>(null);
  const reduced = useReducedMotion();
  const Icon = ICONS[i % ICONS.length];
  const move = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || reduced || !isFinePointer()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 8}deg) rotateY(${(px - 0.5) * 10}deg) translate(${(px - 0.5) * 6}px, ${(py - 0.5) * 6}px)`;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <li ref={ref} onMouseMove={move} onMouseLeave={leave} className="ice-card surface group relative overflow-hidden p-0 transition-transform duration-300 ease-out">
      <div aria-hidden className="ice-card-img h-40 bg-cover md:h-48" style={{ backgroundImage: `url(${heroImg})`, backgroundPosition: POS[i % POS.length] }} />
      <div className="p-6 md:p-8">
        <Icon aria-hidden className="mb-4 h-7 w-7 text-[hsl(var(--glacier-700))]" />
        <h3 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">{title}</h3>
        <p className="mt-3 text-muted-foreground">{desc}</p>
      </div>
      <span aria-hidden className="ice-card-shine" />
    </li>
  );
};

const Services = () => {
  const { c, lang } = useCopy();
  return (
    <section id="servizi" aria-labelledby="servizi-title" className="zone-ice-2 py-24 md:py-32">
      <div className="wrap">
        <SectionHead id="servizi" kicker={c.services.kicker} quota={1400} title={c.services.title} intro={c.services.intro} />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVIZI.map((s, i) => (
            <IceCard key={s.id} i={i} title={s.titolo[lang]} desc={s.desc[lang]} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Services;
