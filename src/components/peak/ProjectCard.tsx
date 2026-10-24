import { ArrowUpRight } from "lucide-react";
import { useCopy } from "@/config/copy";
import { CATEGORIE_PORTFOLIO, type Caso } from "@/config/site";

const host = (u: string) => u.replace(/^https?:\/\//, "").replace(/\/$/, "");

/** Mini-presentazione di un progetto reale: finestra browser, categoria, stato online, link. */
const ProjectCard = ({ w, i, eager = false }: { w: Caso; i: number; eager?: boolean }) => {
  const { c, lang } = useCopy();
  const cat = CATEGORIE_PORTFOLIO.find((k) => k.id === w.categoria);
  return (
    <article className="project-card group">
      <a href={w.url} target="_blank" rel="noopener noreferrer" className="block" tabIndex={-1} aria-hidden>
        <div className="pc-window">
          <div className="pc-bar">
            <i /><i /><i />
            <span className="pc-url">{host(w.url)}</span>
          </div>
          <div className="pc-shot">
            <img src={w.img} alt="" width={1200} height={800} loading={eager ? "eager" : "lazy"} decoding="async" draggable={false} />
          </div>
        </div>
      </a>
      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="hud text-muted-foreground">
          P-{String(i + 1).padStart(2, "0")} · {cat?.nome[lang]}
        </p>
        <p className="hud flex items-center gap-2 text-muted-foreground">
          <span aria-hidden className="pc-live" /> {c.works.online}
        </p>
      </div>
      <h3 className="mt-2 font-display text-3xl font-extrabold tracking-tight md:text-4xl">{w.nome}</h3>
      <p className="mt-1 text-muted-foreground">
        {w.settore[lang]} · {w.fatto[lang]}
      </p>
      <a href={w.url} target="_blank" rel="noopener noreferrer" className="pc-link hud mt-4">
        {c.works.visit} <span className="sr-only">{w.nome}</span>
        <ArrowUpRight aria-hidden className="h-4 w-4" />
      </a>
    </article>
  );
};

export default ProjectCard;
