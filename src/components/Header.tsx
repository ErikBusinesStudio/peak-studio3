import { useState, useEffect } from "react";
import LanguageToggle from "./LanguageToggle";
import { Briefcase, Image, CreditCard, Star, MessageCircle } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#servizi", label: t("header.services"), icon: Briefcase },
    { href: "#portfolio", label: t("header.portfolio"), icon: Image },
    { href: "#prezzi", label: t("header.pricing"), icon: CreditCard },
    { href: "#recensioni", label: t("header.reviews"), icon: Star },
    { href: "#contatti", label: t("header.contacts"), icon: MessageCircle },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/60 py-1"
            : "bg-transparent"
        }`}
      >
        <div className={`container mx-auto flex items-center justify-between transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
          <a href="#" className="font-display text-xl font-bold tracking-tight">
            PEAK<span className="text-primary">.</span>STUDIO
          </a>

          <div className="hidden md:flex items-center gap-4">
            <LanguageToggle />
            <a
              href="#contatti"
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider hover:opacity-90 hover:scale-105 transition-all"
            >
              {t("header.contact")}
            </a>
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden bg-background/98 backdrop-blur-lg border-t border-border px-6 py-8 flex flex-col gap-5 animate-fade-in-up">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
              >
                <l.icon className="w-4 h-4" />
                {l.label}
              </a>
            ))}
            <LanguageToggle />
            <a
              href="#contatti"
              onClick={() => setMenuOpen(false)}
              className="bg-primary text-primary-foreground px-5 py-3 rounded-md text-sm font-bold text-center uppercase tracking-wider"
            >
              {t("header.contact")}
            </a>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
