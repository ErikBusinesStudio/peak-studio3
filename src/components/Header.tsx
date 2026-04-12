import { useState, useEffect } from "react";
import LanguageToggle from "./LanguageToggle";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#servizi", label: "Servizi" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#prezzi", label: "Prezzi" },
    { href: "#recensioni", label: "Recensioni" },
    { href: "#contatti", label: "Contatti" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-lg border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4">
        <a href="#" className="text-xl font-black tracking-tight">
          PEAK<span className="text-primary">.</span>STUDIO
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <LanguageToggle />
          <a
            href="#contatti"
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            Contattami
          </a>
        </nav>

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
              className="text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <LanguageToggle />
          <a
            href="#contatti"
            onClick={() => setMenuOpen(false)}
            className="bg-primary text-primary-foreground px-5 py-3 rounded-md text-sm font-bold text-center uppercase tracking-wider"
          >
            Contattami
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
