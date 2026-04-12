import { useState, useEffect } from "react";
import LanguageToggle from "./LanguageToggle";
import { Briefcase, Image, CreditCard, Star, MessageCircle } from "lucide-react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#servizi", label: "Servizi", icon: Briefcase },
    { href: "#portfolio", label: "Portfolio", icon: Image },
    { href: "#prezzi", label: "Prezzi", icon: CreditCard },
    { href: "#recensioni", label: "Recensioni", icon: Star },
    { href: "#contatti", label: "Contatti", icon: MessageCircle },
  ];

  return (
    <>
      {/* Top header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-background/95 backdrop-blur-lg border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between py-4">
          <a href="#" className="text-xl font-black tracking-tight">
            PEAK<span className="text-primary">.</span>STUDIO
          </a>

          <div className="hidden md:flex items-center gap-4">
            <LanguageToggle />
            <a
              href="#contatti"
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider hover:opacity-90 hover:scale-105 transition-all"
            >
              Contattami
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
              Contattami
            </a>
          </nav>
        )}
      </header>

      {/* Right side vertical nav - always show labels */}
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
