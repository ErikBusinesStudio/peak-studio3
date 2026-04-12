import { useState } from "react";
import { Globe } from "lucide-react";

const LanguageToggle = () => {
  const [open, setOpen] = useState(false);

  const translate = (lang: string) => {
    setOpen(false);
    // Use Google Translate widget
    const url = `https://translate.google.com/translate?sl=it&tl=${lang}&u=${encodeURIComponent(window.location.href)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
        aria-label="Traduci"
      >
        <Globe className="w-4 h-4" />
        IT
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-2 bg-card border border-border rounded-lg shadow-xl py-2 min-w-[120px] animate-fade-in-up z-50">
          {[
            { code: "en", label: "English" },
            { code: "de", label: "Deutsch" },
            { code: "fr", label: "Français" },
            { code: "es", label: "Español" },
          ].map((l) => (
            <button
              key={l.code}
              onClick={() => translate(l.code)}
              className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;
