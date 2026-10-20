import { Check } from "lucide-react";
import { useCopy } from "@/config/copy";
import { ADDON, DATI_LEGALI, MANUTENZIONE, PIANI } from "@/config/site";
import SectionHead from "./SectionHead";

const eur = (n: number) => `${n.toLocaleString("it-IT")} €`;

const Pricing = () => {
  const { c, lang } = useCopy();
  return (
    <section id="prezzi" aria-labelledby="prezzi-title" className="zone-mid py-24 md:py-32">
      <div className="wrap">
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
              <p className="mt-4">
                <span className="hud text-muted-foreground">{c.pricing.from} </span>
                <span className="font-display text-5xl font-extrabold tracking-tight">{eur(p.prezzoDa)}</span>
              </p>
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

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="surface p-6 md:p-8">
            <h3 className="font-display text-2xl font-extrabold">{c.pricing.addons}</h3>
            <ul className="mt-4 space-y-2">
              {ADDON.map((a) => (
                <li key={a.id} className="flex justify-between gap-4">
                  <span>{a.nome[lang]}</span>
                  <span className="font-semibold">{eur(a.prezzo)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="surface p-6 md:p-8">
            <h3 className="flex flex-wrap items-baseline justify-between gap-2 font-display text-2xl font-extrabold">
              {c.pricing.maint}
              <span>
                {eur(MANUTENZIONE.prezzoMese)}
                <span className="text-base font-semibold text-muted-foreground">{c.pricing.perMonth}</span>
              </span>
            </h3>
            <ul className="mt-4 space-y-2">
              {MANUTENZIONE.include.map((v) => (
                <li key={v.it} className="flex gap-3">
                  <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-[hsl(var(--cyan))]" />
                  <span>{v[lang]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">{DATI_LEGALI.notaIva[lang]}</p>
      </div>
    </section>
  );
};

export default Pricing;
