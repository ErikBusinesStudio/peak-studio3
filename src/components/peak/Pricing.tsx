import { useState } from "react";
import { BarChart3, ChevronDown, Check, Globe2, ImageIcon, Languages, Mail, MapPin, PenLine, Repeat, Search, CalendarCheck, ClipboardList, Workflow } from "lucide-react";
import { useCopy } from "@/config/copy";
import { ADDON, ADDON_CATEGORIE, DATI_LEGALI, MANUTENZIONE, PIANI, totalePreventivo } from "@/config/site";
import SectionHead from "./SectionHead";
import Cta from "./Cta";

const eur = (n: number | null | undefined) => (n == null ? "" : `${n.toLocaleString("it-IT")} €`);
const ADDON_ICONS: Record<string, typeof Check> = {
  gbp: MapPin, seo: Search, analytics: BarChart3, copy: PenLine, lingua: Languages, foto: ImageIcon,
  prenotazioni: CalendarCheck, moduli: ClipboardList, newsletter: Mail, migrazione: Repeat, automazioni: Workflow,
};

const Pricing = () => {
  const { c, lang } = useCopy();
  const [plan, setPlan] = useState("business");
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState<string[]>([]);
  const toggle = (id: string) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const { totale, daDefinire } = totalePreventivo(plan, sel);
  const current = PIANI.find((p) => p.id === plan)!;

  return (
    <section id="prezzi" aria-labelledby="prezzi-title" className="zone-mid relative py-24 md:py-32">
      <div aria-hidden className="tech-grid" />
      <div className="wrap relative">
        <SectionHead id="prezzi" kicker={c.pricing.kicker} quota={2900} title={c.pricing.title} intro={c.pricing.intro} />
        <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {PIANI.map((p) => (
            <li key={p.id} className={`surface relative flex flex-col p-6 md:p-8 ${p.consigliato ? "ring-2 ring-[hsl(var(--cyan))]" : ""}`}>
              {p.consigliato && (
                <span className="hud absolute -top-3 left-6 rounded-full bg-[hsl(var(--cyan))] px-3 py-1 font-semibold text-[hsl(var(--deep-900))]">
                  {c.pricing.recommended}
                </span>
              )}
              <h3 className="font-display text-3xl font-extrabold tracking-tight">{p.nome}</h3>
              {p.prezzoDa != null ? (
                <p className="mt-4">
                  <span className="hud text-muted-foreground">{c.pricing.from} </span>
                  <span className="font-display text-5xl font-extrabold tracking-tight">{eur(p.prezzoDa)}</span>
                </p>
              ) : (
                <div className="mt-4">
                  <p className="font-display text-3xl font-extrabold leading-tight tracking-tight">{c.pricing.custom}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{c.pricing.customNote}</p>
                </div>
              )}
              <ul className="mt-6 space-y-3">
                {p.include.map((v) => (
                  <li key={v.it} className="flex gap-3">
                    <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-[hsl(var(--cyan))]" />
                    <span>{v[lang]}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {/* Componi il preventivo */}
        <div className="surface mt-8 overflow-hidden">
          <button type="button" aria-expanded={open} aria-controls="builder-panel" onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 p-6 text-left md:px-10">
            <span>
              <span className="block font-display text-2xl font-extrabold tracking-tight md:text-3xl">{c.pricing.builder}</span>
              <span className="mt-1 block text-sm text-muted-foreground md:text-base">{c.pricing.builderIntro}</span>
            </span>
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border">
              <ChevronDown aria-hidden className={`h-5 w-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
            </span>
          </button>
          <div id="builder-panel" hidden={!open} className="grid gap-8 border-t border-border p-6 md:p-10 lg:grid-cols-12">
          <div className="lg:col-span-8">

            <fieldset className="mt-6">
              <legend className="hud mb-3 text-muted-foreground">{c.pricing.plan}</legend>
              <div className="flex flex-wrap gap-2">
                {PIANI.map((p) => (
                  <button key={p.id} type="button" aria-pressed={plan === p.id} onClick={() => setPlan(p.id)} className="pf-chip">
                    {p.nome}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-8 space-y-7">
              <h4 className="font-display text-2xl font-extrabold">{c.pricing.addons}</h4>
              {ADDON_CATEGORIE.map((cat) => (
                <fieldset key={cat.id}>
                  <legend className="hud mb-3 text-muted-foreground">{cat.nome[lang]}</legend>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {ADDON.filter((a) => a.cat === cat.id).map((a) => {
                      const Icon = ADDON_ICONS[a.id] ?? Globe2;
                      const incl = a.inclusoIn?.includes(plan);
                      const on = incl || sel.includes(a.id);
                      return (
                        <li key={a.id}>
                          <button type="button" aria-pressed={on} disabled={incl} onClick={() => toggle(a.id)} className={`addon ${on ? "is-on" : ""}`}>
                            <span className="addon-icon"><Icon aria-hidden className="h-5 w-5" /></span>
                            <span className="flex-1 text-left">
                              <span className="block font-semibold">{a.nome[lang]}</span>
                              <span className="block text-sm text-muted-foreground">{a.desc[lang]}</span>
                            </span>
                            <span className="hud shrink-0 text-right">
                              {incl ? c.pricing.included : a.prezzo != null ? `+${eur(a.prezzo)}` : c.pricing.soon}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </fieldset>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="quote-box lg:sticky lg:top-28">
              <p className="hud text-muted-foreground">{c.pricing.total}</p>
              <p className="mt-2 font-display text-5xl font-extrabold tracking-tight" aria-live="polite">
                {current.prezzoDa == null && totale === 0 ? c.pricing.onlyQuote : eur(totale)}
              </p>
              {daDefinire && !(current.prezzoDa == null && totale === 0) && <p className="mt-2 text-sm text-muted-foreground">{c.pricing.plusQuote}</p>}
              <ul className="mt-5 space-y-1 text-sm">
                <li className="flex justify-between gap-3"><span>{current.nome}</span><span>{current.prezzoDa != null ? eur(current.prezzoDa) : c.pricing.onQuote}</span></li>
                {sel.map((id) => {
                  const a = ADDON.find((x) => x.id === id)!;
                  if (a.inclusoIn?.includes(plan)) return null;
                  return <li key={id} className="flex justify-between gap-3 text-muted-foreground"><span>{a.nome[lang]}</span><span>{a.prezzo != null ? eur(a.prezzo) : c.pricing.soon}</span></li>;
                })}
              </ul>
              <Cta kind="primary" className="mt-6 w-full" />
            </div>
          </aside>
          </div>
        </div>

        <div className="surface mt-5 p-6 md:p-8">
          <h3 className="flex flex-wrap items-baseline justify-between gap-2 font-display text-2xl font-extrabold">
            {c.pricing.maint}
            <span>
              {eur(MANUTENZIONE.prezzoMese)}
              <span className="text-base font-semibold text-muted-foreground">{c.pricing.perMonth}</span>
            </span>
          </h3>
          <ul className="mt-4 grid gap-2 md:grid-cols-2">
            {MANUTENZIONE.include.map((v) => (
              <li key={v.it} className="flex gap-3">
                <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-[hsl(var(--cyan))]" />
                <span>{v[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">{DATI_LEGALI.notaIva[lang]}</p>
      </div>
    </section>
  );
};

export default Pricing;
