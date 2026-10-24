import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { RotateCcw, Search } from "lucide-react";
import Header from "@/components/peak/Header";
import Footer from "@/components/peak/Footer";
import CookieBanner from "@/components/peak/CookieBanner";
import ProjectCard from "@/components/peak/ProjectCard";
import Cta from "@/components/peak/Cta";
import { useCopy } from "@/config/copy";
import { CASI_PORTFOLIO, CATEGORIE_PORTFOLIO, type CategoriaPortfolio } from "@/config/site";
import { usePageMeta } from "@/hooks/peak";

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

/** Filtra per testo (nome, settore, descrizione) e categoria insieme. */
export const filtraProgetti = (q: string, cat: CategoriaPortfolio | "all", lang: "it" | "en") =>
  CASI_PORTFOLIO.filter((w) => {
    if (cat !== "all" && w.categoria !== cat) return false;
    if (!q.trim()) return true;
    const hay = norm(`${w.nome} ${w.settore[lang]} ${w.fatto[lang]} ${w.url}`);
    return hay.includes(norm(q.trim()));
  });

const Portfolio = () => {
  const { c, lang } = useCopy();
  usePageMeta(c.portfolio.metaTitle, c.portfolio.metaDesc);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CategoriaPortfolio | "all">("all");
  const list = useMemo(() => filtraProgetti(q, cat, lang), [q, cat, lang]);
  const dirty = q !== "" || cat !== "all";
  const reset = () => { setQ(""); setCat("all"); };
  const chips: { id: CategoriaPortfolio | "all"; label: string; n: number }[] = [
    { id: "all", label: c.portfolio.all, n: CASI_PORTFOLIO.length },
    ...CATEGORIE_PORTFOLIO.map((k) => ({ id: k.id, label: k.nome[lang], n: CASI_PORTFOLIO.filter((w) => w.categoria === k.id).length })),
  ];

  return (
    <>
      <Header />
      <main id="contenuto" tabIndex={-1} className="outline-none">
        <section className="zone-mid relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-44">
          <div aria-hidden className="tech-grid" />
          <div aria-hidden className="pf-orbit" />
          <div className="wrap relative">
            <nav aria-label="Breadcrumb" className="hud mb-8 text-muted-foreground">
              <Link to="/" className="underline-offset-4 hover:underline">Home</Link> <span aria-hidden>/</span> <span aria-current="page">Portfolio</span>
            </nav>
            <p className="kicker mb-5">{c.portfolio.kicker} · {String(CASI_PORTFOLIO.length).padStart(2, "0")}</p>
            <h1 className="giant !text-[clamp(3rem,11vw,10rem)]">{c.portfolio.title}</h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">{c.portfolio.intro}</p>
          </div>
        </section>

        <section className="zone-snow py-16 md:py-24" aria-label={c.portfolio.title}>
          <div className="wrap">
            <div className="pf-tools">
              <label className="pf-search">
                <Search aria-hidden className="h-5 w-5 shrink-0 text-muted-foreground" />
                <span className="sr-only">{c.portfolio.search}</span>
                <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={c.portfolio.search} className="w-full bg-transparent py-3 text-base outline-none" />
              </label>
              <div role="group" aria-label={c.portfolio.filters} className="flex flex-wrap gap-2">
                {chips.map((k) => (
                  <button key={k.id} type="button" aria-pressed={cat === k.id} onClick={() => setCat(k.id)} className="pf-chip">
                    {k.label} <span className="pf-chip-n">{k.n}</span>
                  </button>
                ))}
                <button type="button" onClick={reset} disabled={!dirty} className="pf-reset">
                  <RotateCcw aria-hidden className="h-4 w-4" /> {c.portfolio.reset}
                </button>
              </div>
            </div>
            <p className="hud mt-6 text-muted-foreground" aria-live="polite">{c.portfolio.count(list.length)}</p>

            {list.length ? (
              <ul className="mt-8 grid gap-x-8 gap-y-14 md:grid-cols-2">
                {list.map((w) => (
                  <li key={w.id}>
                    <ProjectCard w={w} i={CASI_PORTFOLIO.indexOf(w)} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="pf-empty mt-8">
                <p className="font-display text-3xl font-extrabold tracking-tight">{c.portfolio.empty}</p>
                <button type="button" onClick={reset} className="pf-reset mt-6">
                  <RotateCcw aria-hidden className="h-4 w-4" /> {c.portfolio.reset}
                </button>
              </div>
            )}

            <div className="mt-20 flex flex-wrap gap-3 border-t border-border pt-10">
              <Cta kind="primary" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
};

export default Portfolio;
