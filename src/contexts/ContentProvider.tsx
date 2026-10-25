import { Fragment, ReactNode, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { applyPortfolio, applyPrezzi, type NuovoCaso, type PortfolioOverride, type PrezziOverride } from "@/config/overrides";

/** Carica i valori modificati dal pannello e ri-renderizza il sito una sola volta. */
export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let alive = true;
    supabase
      .from("site_content")
      .select("key,value")
      .then(({ data }) => {
        if (!alive || !data?.length) return;
        const m = Object.fromEntries(data.map((r) => [r.key, r.value]));
        if (m.prezzi) applyPrezzi(m.prezzi as PrezziOverride);
        if (m.portfolio || m.portfolio_nuovi)
          applyPortfolio((m.portfolio as PortfolioOverride) ?? {}, (m.portfolio_nuovi as NuovoCaso[]) ?? []);
        setVersion((v) => v + 1);
      });
    return () => {
      alive = false;
    };
  }, []);

  return <Fragment key={version}>{children}</Fragment>;
};
