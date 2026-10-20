import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "it" | "en";

export const languages: { code: Lang; label: string }[] = [
  { code: "it", label: "Italiano" },
  { code: "en", label: "English" },
];

type Ctx = { lang: Lang; setLang: (l: Lang) => void };

const I18nContext = createContext<Ctx>({ lang: "it", setLang: () => {} });

const initialLang = (): Lang => {
  if (typeof window === "undefined") return "it";
  const q = new URLSearchParams(window.location.search).get("lang");
  if (q === "en" || q === "it") return q;
  try {
    return window.localStorage.getItem("peak-lang") === "en" ? "en" : "it";
  } catch {
    return "it";
  }
};

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem("peak-lang", l);
    } catch {
      /* storage non disponibile */
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return <I18nContext.Provider value={{ lang, setLang }}>{children}</I18nContext.Provider>;
};

export const useI18n = () => useContext(I18nContext);
