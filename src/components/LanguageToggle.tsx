import { useI18n, languages } from "@/contexts/I18nContext";
import { useState } from "react";

const LanguageToggle = () => {
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useI18n();

  const currentLang = languages.find((l) => l.code === lang) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
        aria-label="Traduci"
      >
        <span className="text-base">{currentLang.flag}</span>
        {currentLang.code.toUpperCase()}
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-2 bg-card border border-border rounded-lg shadow-xl py-2 min-w-[160px] animate-fade-in-up z-50">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 transition-colors ${
                l.code === lang
                  ? "text-primary font-bold"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <span className="text-lg">{l.flag}</span>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;
