import { useState, useEffect } from "react";
import LanguageToggle from "./LanguageToggle";
import { Briefcase, Image, CreditCard, Star, MessageCircle } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import logo from "@/assets/logo.png";

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
          scrolled ? "bg-background/95 backdrop-blur-lg border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between py-4">
          <a href="#" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="Peak Studio"
              className="h-9 md:h-11 w-auto transition-transform group-hover:scale-105"
              style={{ filter: "drop-shadow(0 0 12px hsl(348 78% 36% / 0.5))" }}
            />
            <span className="font-display text-base md:text-lg tracking-tight hidden sm:inline">
              PEAK<span style={{ color: "hsl(var(--accent-red))" }}>.</span>STUDIO
            </span>
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

      <nav className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-1 pr-4">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="group flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-300 hover:bg-card/80 hover:backdrop-blur-lg"
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-all duration-300 whitespace-nowrap">
              {l.label}
            </span>
            <div className="w-9 h-9 rounded-lg bg-card/60 backdrop-blur-sm border border-border flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
              <l.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            </div>
          </a>
        ))}
      </nav>
    </>
  );
};

export default Header;
