import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoDark from "@/assets/logo-dark.webp";
import { useCopy } from "@/config/copy";
import { whatsappUrl } from "@/config/site";

const LangSwitch = () => {
  const { c, lang, setLang } = useCopy();
  return (
    <div role="group" aria-label={c.nav.lang} className="hud flex items-center rounded-full border border-border p-1">
      {(["it", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          lang={l}
          className={`min-h-[36px] min-w-[40px] rounded-full px-2 font-semibold transition-colors ${
            lang === l ? "bg-foreground text-background" : "text-foreground hover:bg-secondary"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

const Header = () => {
  const { c } = useCopy();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const clicks = useRef<number[]>([]);
  const { pathname } = useLocation();
  const base = pathname === "/" ? "" : "/";

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  const onLogo = () => {
    const now = Date.now();
    clicks.current = [...clicks.current.filter((t) => now - t < 2500), now];
    if (clicks.current.length >= 5) {
      clicks.current = [];
      window.dispatchEvent(new Event("peak:avalanche"));
    }
  };

  const links = [
    { id: "servizi", label: c.nav.servizi },
    { id: "lavori", label: c.nav.lavori },
    { id: "prezzi", label: c.nav.prezzi },
    { id: "chi-sono", label: c.nav.chi },
    { id: "contatti", label: c.nav.contatti },
  ];

  return (
    <>
      <a href="#contenuto" className="skip-link">
        {c.skip}
      </a>
      <header
        className={`zone-snow fixed inset-x-0 top-0 z-50 border-b transition-[background-color,box-shadow] duration-300 ${
          scrolled ? "border-border shadow-[0_8px_30px_-18px_hsl(var(--deep-900)/0.4)]" : "border-transparent"
        }`}
        style={{ backgroundColor: scrolled ? "hsl(var(--snow) / 0.9)" : "hsl(var(--snow) / 0.55)", backdropFilter: "blur(14px)" }}
      >
        <div className="wrap flex h-16 items-center justify-between gap-4 md:h-20">
          <Link to="/" onClick={onLogo} aria-label={c.nav.home} className="shrink-0">
            <img src={logoDark} alt="Peak Studio" width={320} height={136} className="h-9 w-auto md:h-11" />
          </Link>

          <nav aria-label={c.nav.nav} className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {links.map((l) => (
                <li key={l.id}>
                  <a href={`${base}#${l.id}`} className="nav-link text-[15px] font-medium">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <LangSwitch />
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary hidden !min-h-[44px] !px-5 !text-sm sm:inline-flex"
            >
              {c.cta.header}
            </a>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? c.nav.close : c.nav.menu}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav id="menu-mobile" aria-label={c.nav.nav} className="zone-snow border-t border-border lg:hidden">
            <ul className="wrap flex flex-col py-4">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`${base}#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-display text-3xl font-extrabold uppercase tracking-tight"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-3 sm:hidden">
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
                  {c.cta.header}
                </a>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
