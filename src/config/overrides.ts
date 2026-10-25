// Valori modificabili dal pannello di controllo (/admin), salvati nel database.
// Vengono applicati sopra i valori di default di site.ts all'avvio del sito.
import { ADDON, CASI_PORTFOLIO, MANUTENZIONE, PIANI, type Caso } from "./site";

export type PrezziOverride = {
  piani?: Record<string, number | null>;
  addon?: Record<string, number | null>;
  manutenzione?: number;
};
export type PortfolioOverride = Record<
  string,
  { anno?: number | null; url?: string; nascosto?: boolean; settoreIt?: string; fattoIt?: string }
>;

export const DEFAULTS = {
  piani: Object.fromEntries(PIANI.map((p) => [p.id, p.prezzoDa])) as Record<string, number | null>,
  addon: Object.fromEntries(ADDON.map((a) => [a.id, a.prezzo])) as Record<string, number | null>,
  manutenzione: MANUTENZIONE.prezzoMese,
  portfolio: CASI_PORTFOLIO.map((c) => ({ ...c, settore: { ...c.settore }, fatto: { ...c.fatto } })) as Caso[],
};

const okPrice = (v: unknown): v is number | null => v === null || (typeof v === "number" && v >= 0 && v < 1e6);

export const applyPrezzi = (o: PrezziOverride) => {
  for (const p of PIANI) {
    const v = o.piani?.[p.id];
    if (v !== undefined && okPrice(v)) p.prezzoDa = v;
  }
  for (const a of ADDON) {
    const v = o.addon?.[a.id];
    if (v !== undefined && okPrice(v)) a.prezzo = v;
  }
  if (typeof o.manutenzione === "number" && o.manutenzione >= 0) MANUTENZIONE.prezzoMese = o.manutenzione;
};

export const applyPortfolio = (o: PortfolioOverride) => {
  const next = DEFAULTS.portfolio
    .map((c) => {
      const x = o[c.id];
      if (!x) return { ...c };
      return {
        ...c,
        anno: x.anno !== undefined ? x.anno : c.anno,
        url: x.url || c.url,
        settore: x.settoreIt ? { ...c.settore, it: x.settoreIt } : c.settore,
        fatto: x.fattoIt ? { ...c.fatto, it: x.fattoIt } : c.fatto,
        _hide: !!x.nascosto,
      };
    })
    .filter((c) => !("_hide" in c && c._hide))
    .map(({ _hide, ...c }: Caso & { _hide?: boolean }) => c as Caso);
  CASI_PORTFOLIO.splice(0, CASI_PORTFOLIO.length, ...next);
};
