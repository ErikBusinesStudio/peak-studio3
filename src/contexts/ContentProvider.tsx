import { Fragment, ReactNode, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { applyPortfolio, applyPrezzi, type PortfolioOverride, type PrezziOverride } from "@/config/overrides";

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
        for (const row of data) {
          if (row.key === "prezzi") applyPrezzi(row.value as PrezziOverride);
          if (row.key === "portfolio") applyPortfolio(row.value as PortfolioOverride);
        }
        setVersion((v) => v + 1);
      });
    return () => {
      alive = false;
    };
  }, []);

  return <Fragment key={version}>{children}</Fragment>;
};
