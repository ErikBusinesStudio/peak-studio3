import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, X } from "lucide-react";
import Header from "@/components/peak/Header";
import Footer from "@/components/peak/Footer";
import CookieBanner from "@/components/peak/CookieBanner";
import Cta from "@/components/peak/Cta";
import ProjectCard from "@/components/peak/ProjectCard";
import { SERVICE_ICONS, ServiceCard } from "@/components/peak/Services";
import { useCopy } from "@/config/copy";
import { CASI_PORTFOLIO, SERVIZI } from "@/config/site";
import { SERVIZI_DETTAGLIO } from "@/config/servizi-dettaglio";
import { usePageMeta } from "@/hooks/peak";

const ServicePage = () => {
  const { id } = useParams();
  const { c, lang } = useCopy();
  const s = SERVIZI.find((x) => x.id === id);
  const d = SERVIZI_DETTAGLIO.find((x) => x.id === id);
  usePageMeta(s ? `${s.titolo[lang]} | Peak Studio` : undefined, d?.sub[lang]);
  useEffect(() => { window.scrollTo(0, 0); }, [id]);
  if (!s || !d) return <Navigate to="/404" replace />;

  const t = c.services.page;
  const i = SERVIZI.indexOf(s);
  const Icon = SERVICE_ICONS[s.id];
  const dark = d.zone === "zone-mid" || d.zone === "zone-deep";

  return (
    <>
      <Header />
      <main id="contenuto" tabIndex={-1} className={`outline-none svc-page svc-layout-${d.layout}`}>
        {/* HERO: composizione diversa per ogni servizio */}
        <section className={`${d.zone} relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-40`}>
          <div aria-hidden className="tech-grid" />
          {d.layout === "overlay" && (
            <img src={s.img} alt="" width={1024} height={768} className="absolute inset-0 h-full w-full object-cover opacity-30" />
          )}
          <div className="wrap relative">
            <nav aria-label="Breadcrumb" className="hud mb-8 flex flex-wrap items-center gap-2 text-muted-foreground">
              <Link to="/" className="underline-offset-4 hover:underline">{t.home}</Link>
              <span aria-hidden>/</span>
              <Link to="/#servizi" className="underline-offset-4 hover:underline">{t.crumb}</Link>
              <span aria-hidden>/</span>
              <span aria-current="page">{s.titolo[lang]}</span>
            </nav>
            <div className={`grid items-center gap-10 ${d.layout === "split" ? "lg:grid-cols-2" : ""} ${d.layout === "center" ? "text-center" : ""}`}>
              <div className={d.layout === "center" ? "mx-auto max-w-4xl" : ""}>
                <p className={`kicker mb-5 ${d.layout === "center" ? "justify-center" : ""}`}>S-{String(i + 1).padStart(2, "0")} · {t.crumb}</p>
                <h1 className="giant !text-[clamp(2.75rem,8vw,7.5rem)]">{s.titolo[lang]}</h1>
                <p className={`mt-6 max-w-2xl text-lg md:text-2xl ${d.layout === "center" ? "mx-auto" : ""}`}>{d.sub[lang]}</p>
                <div className={`mt-8 flex flex-wrap gap-3 ${d.layout === "center" ? "justify-center" : ""}`}>
                  <Cta kind="primary" />
                </div>
              </div>
              {d.layout === "split" && (
                <div className="svc-hero-frame">
                  <img src={s.img} alt={s.titolo[lang]} width={1024} height={768} className="h-full w-full object-cover" />
                  <span className="svc-hero-tag hud"><Icon aria-hidden className="h-4 w-4" /> {s.titolo[lang]}</span>
                </div>
              )}
            </div>
            {(d.layout === "center" || d.layout === "stack") && (
              <div className="svc-hero-wide mt-12">
                <img src={s.img} alt={s.titolo[lang]} width={1024} height={768} className="h-full w-full object-cover" />
              </div>
            )}
          </div>
        </section>

        {/* IL SERVIZIO + PROBLEMI */}
        <section className={`${dark ? "zone-snow" : "zone-deep"} py-20 md:py-28`}>
          <div className="wrap grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="kicker mb-5">01 · {t.about}</p>
              {d.about.map((p, k) => (
                <p key={k} className={k === 0 ? "text-xl md:text-2xl" : "mt-5 text-lg text-muted-foreground"}>{p[lang]}</p>
              ))}
            </div>
            <div className="lg:col-span-5">
              <p className="kicker mb-5">02 · {t.problems}</p>
              <ul className="space-y-3">
                {d.problemi.map((p) => (
                  <li key={p.it} className="svc-problem">
                    <X aria-hidden className="mt-1 h-4 w-4 shrink-0 text-[hsl(var(--glacier-500))]" />
                    <span>{p[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* VANTAGGI */}
        <section className="zone-ice py-20 md:py-28">
          <div className="wrap">
            <p className="kicker mb-8">03 · {t.benefits}</p>
            <ul className="grid gap-5 md:grid-cols-3">
              {d.vantaggi.map((v, k) => (
                <li key={v.t.it} className="surface svc-benefit p-6 md:p-8">
                  <span className="hud text-muted-foreground">V-0{k + 1}</span>
                  <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight">{v.t[lang]}</h2>
                  <p className="mt-3 text-muted-foreground">{v.d[lang]}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FUNZIONI + PROCESSO */}
        <section className="zone-snow py-20 md:py-28">
          <div className="wrap grid gap-14 lg:grid-cols-2">
            <div>
              <p className="kicker mb-6">04 · {t.features}</p>
              <ul className="svc-features">
                {d.funzioni.map((f, k) => (
                  <li key={f.it}>
                    <span className="hud text-muted-foreground">{String(k + 1).padStart(2, "0")}</span>
                    <span className="flex-1 text-lg font-semibold">{f[lang]}</span>
                    <Check aria-hidden className="h-5 w-5 text-[hsl(var(--glacier-700))]" />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="kicker mb-6">05 · {t.how}</p>
              <ol className="svc-steps">
                {d.passi.map((p, k) => (
                  <li key={p.t.it}>
                    <span className="svc-step-n">{k + 1}</span>
                    <div>
                      <h3 className="font-display text-2xl font-extrabold tracking-tight">{p.t[lang]}</h3>
                      <p className="mt-1 text-muted-foreground">{p.d[lang]}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ESEMPI */}
        <section className="zone-mid py-20 md:py-28">
          <div className="wrap">
            <p className="kicker mb-8">06 · {t.examples}</p>
            {d.esempiPortfolio ? (
              <ul className="grid gap-x-8 gap-y-12 md:grid-cols-3">
                {CASI_PORTFOLIO.map((w, k) => (
                  <li key={w.id}><ProjectCard w={w} i={k} /></li>
                ))}
              </ul>
            ) : (
              <figure className="pc-window mx-auto max-w-4xl">
                <div className="pc-bar"><i /><i /><i /><span className="pc-url">{t.mock}</span></div>
                <div className="pc-shot !aspect-[16/8]"><img src={s.img} alt={`${t.mock}: ${s.titolo[lang]}`} width={1024} height={768} loading="lazy" /></div>
              </figure>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section className="zone-deep py-20 md:py-28">
          <div className="wrap grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="kicker mb-5">07 · FAQ</p>
              <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight md:text-5xl">{t.faq}</h2>
            </div>
            <div className="space-y-3 lg:col-span-8">
              {d.faq.map((f) => (
                <details key={f.q.it} className="surface group p-5 md:p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                    {f.q[lang]}
                    <span aria-hidden className="text-2xl transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-muted-foreground">{f.a[lang]}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="zone-snow py-20 md:py-28">
          <div className="wrap svc-cta-box">
            <h2 className="section-title !text-[clamp(2.5rem,8vw,6rem)]">{t.ctaTitle}</h2>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">{t.ctaText}</p>
            <div className="mt-8 flex flex-wrap gap-3"><Cta kind="primary" /><Cta kind="secondary" /></div>
          </div>
        </section>

        {/* CORRELATI */}
        <section className="zone-ice-2 py-20 md:py-28">
          <div className="wrap">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <p className="kicker">08 · {t.related}</p>
              <Link to="/#servizi" className="explore-link"><ArrowLeft aria-hidden className="h-5 w-5" /><span>{t.back}</span></Link>
            </div>
            <ul className="grid gap-5 md:grid-cols-3">
              {d.correlati.map((rid) => {
                const r = SERVIZI.find((x) => x.id === rid);
                if (!r) return null;
                return (
                  <li key={rid} className="flex">
                    <ServiceCard id={r.id} i={SERVIZI.indexOf(r)} title={r.titolo[lang]} desc={r.desc[lang]} img={r.img} cta={c.services.open} />
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
};

export default ServicePage;
