# Peak Studio – regole tecniche

- All variable business data (delivery days, prices, services, portfolio, legal data, altimeter camps) lives in `src/config/site.ts`; components must read from it, never hardcode. Why: one source of truth for promises and prices.
- All visible copy lives in `src/config/copy.ts` with matching `it` and `en` keys, read via `useCopy()`. Why: the IT/EN toggle must translate everything, including meta and alt.
- Section backgrounds/text use `.zone-*` classes in `index.css` that redefine tokens per zone. Why: guarantees AA contrast as the page shifts from snow to deep blue.
- Heavy visual effects live in `src/components/peak/fx/`, are lazy-loaded, pause outside the viewport and are disabled with prefers-reduced-motion. Why: keep Lighthouse mobile ≥ 90.
- Only two CTA kinds exist (`Cta` primary/secondary); don't add other CTA variants. Why: explicit product rule.
- Rules in `src/config/site.ts` are covered by `src/test/site-rules.test.ts`; update tests when values change.
- Service detail pages (`/servizi/:id`) read structure/copy from `src/config/servizi-dettaglio.ts`; the portfolio page (`/portfolio`) reads `CASI_PORTFOLIO`/`CATEGORIE_PORTFOLIO`. Why: adding a service or project needs only config edits.
- Quote builder totals come from `totalePreventivo()` in `site.ts`; add-ons without a defined price stay "on quote". Why: never invent prices in UI.
