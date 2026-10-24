import { MouseEvent, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Globe, Layout, PenTool, Server, MapPin, Wrench } from "lucide-react";
import { useCopy } from "@/config/copy";
import { SERVIZI } from "@/config/site";
import { isFinePointer, useReducedMotion } from "@/hooks/peak";
import SectionHead from "./SectionHead";

export const SERVICE_ICONS: Record<string, typeof Globe> = { vetrina: Globe, landing: Layout, logo: PenTool, dominio: Server, google: MapPin, manutenzione: Wrench };

/** Card servizio cliccabile: tilt leggero, immagine dedicata, freccia che ruota, riflesso. */
export const ServiceCard = ({ id, i, title, desc, img, cta, big = false }: { id: string; i: number; title: string; desc: string; img: string; cta: string; big?: boolean }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const Icon = SERVICE_ICONS[id] ?? Globe;
  const move = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || reduced || !isFinePointer()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * 5}deg) rotateY(${(px - 0.5) * 7}deg) translateY(-4px)`;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <Link
      ref={ref}
      to={`/servizi/${id}`}
      onMouseMove={move}
      onMouseLeave={leave}
      className={`svc-card group ${big ? "svc-card-big" : ""}`}
    >
      <div className="svc-media">
        <img src={img} alt="" width={1024} height={768} loading="lazy" decoding="async" className="svc-img" />
        <span className="svc-num hud">S-{String(i + 1).padStart(2, "0")}</span>
        <span className="svc-icon"><Icon aria-hidden className="h-5 w-5" /></span>
      </div>
      <div className="relative flex flex-1 flex-col p-6 md:p-7">
        <h3 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">{title}</h3>
        <p className="mt-3 text-muted-foreground">{desc}</p>
        <span className="svc-cta hud mt-auto pt-6">
          {cta}
          <span className="svc-arrow"><ArrowUpRight aria-hidden className="h-4 w-4" /></span>
        </span>
      </div>
      <span aria-hidden className="ice-card-shine" />
    </Link>
  );
};

const Services = () => {
  const { c, lang } = useCopy();
  return (
    <section id="servizi" aria-labelledby="servizi-title" className="zone-ice-2 relative py-24 md:py-32">
      <div aria-hidden className="tech-grid" />
      <div className="wrap relative">
        <SectionHead id="servizi" kicker={c.services.kicker} quota={1400} title={c.services.title} intro={c.services.intro} />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {SERVIZI.map((s, i) => (
            <li key={s.id} className={`flex ${i < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}>
              <ServiceCard id={s.id} i={i} title={s.titolo[lang]} desc={s.desc[lang]} img={s.img} cta={c.services.open} big={i < 2} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Services;
