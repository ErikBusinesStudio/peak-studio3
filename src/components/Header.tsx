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
              style={{ filter: "drop-shadow(0 0 12px hsl(212 90% 45% / 0.5))" }}
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

      <nav className="fixed right-3 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-2">
        {/* Vertical hairline that connects all icons */}
        <span
          className="absolute right-[27px] top-2 bottom-2 w-px pointer-events-none"
          style={{ background: "linear-gradient(180deg, transparent, hsl(212 90% 55% / 0.4), transparent)" }}
        />
        {links.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            className="group relative flex items-center gap-3 py-1.5"
            style={{ animation: `fade-in 0.5s ease-out ${i * 80}ms both` }}
          >
            {/* Label appears on hover, slides in from the right */}
            <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[10px] font-mono font-bold uppercase tracking-[0.25em] px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-md border border-border text-foreground whitespace-nowrap pointer-events-none shadow-lg">
              {l.label}
            </span>
            <span className="relative inline-flex items-center justify-center w-[54px] h-[54px]">
              {/* Outer ring (animated on hover) */}
              <span
                className="absolute inset-0 rounded-full border border-border group-hover:border-primary/70 transition-colors duration-300"
                style={{ background: "hsl(210 40% 99% / 0.55)", backdropFilter: "blur(8px)" }}
              />
              {/* Gradient halo on hover */}
              <span
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
                style={{ background: "radial-gradient(circle, hsl(212 90% 55% / 0.55), transparent 70%)" }}
              />
              {/* Number tag */}
              <span className="absolute -left-1 -top-1 text-[8px] font-mono font-bold text-primary opacity-60 group-hover:opacity-100 transition-opacity">
                0{i + 1}
              </span>
              <l.icon className="relative w-[18px] h-[18px] text-foreground/70 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
            </span>
          </a>
        ))}
      </nav>
    </>
  );
};

export default Header;
