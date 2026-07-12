import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import CallButton from "@/components/CallButton";

const Footer = () => {
  const { t } = useI18n();

  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/8 rounded-full blur-[200px]" />
      <div className="container mx-auto relative z-10 py-10 md:py-16 px-4">
        <div className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 md:pb-12 border-b border-border">
          <div>
            <p className="eyebrow mb-3">Pronti a partire</p>
            <h3 className="font-display text-3xl md:text-6xl leading-[0.9] tracking-tight uppercase">
              Costruiamo<br />
              <span className="text-gradient italic">la tua vetta.</span>
            </h3>
          </div>
          <CallButton label="Richiedi una chiamata" />
        </div>

        <nav aria-label="Naviga il sito" className="mb-10 md:mb-14 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-3">
          {[
            { href: "#servizi", label: "Servizi" },
            { href: "#prezzi", label: "Piani & Prezzi" },
            { href: "#numeri", label: "Numeri" },
            { href: "#portfolio", label: "Portfolio" },
            { href: "#recensioni", label: "Recensioni" },
            { href: "#contatti", label: "Contatti" },
          ].map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className="group flex items-center justify-between border-t border-border pt-3 text-sm md:text-base font-display uppercase tracking-tight hover:text-primary transition-colors"
            >
              <span>
                <span className="font-mono text-[10px] text-primary mr-2 opacity-60">0{i + 1}</span>
                {l.label}
              </span>
              <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          ))}
        </nav>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          <div>
            <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4">PEAK<span className="text-primary">.</span>STUDIO</h3>
            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{t("footer.desc")}</p>
          </div>
          <div>
            <h4 className="font-bold text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4">{t("footer.nav")}</h4>
            <div className="space-y-2 md:space-y-3">
              {[
                { href: "#servizi", label: t("header.services") },
                { href: "#portfolio", label: t("header.portfolio") },
                { href: "#prezzi", label: t("header.pricing") },
                { href: "#recensioni", label: t("header.reviews") },
                { href: "#contatti", label: t("header.contacts") },
              ].map((l) => (
                <a key={l.href} href={l.href} className="block text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors">{l.label}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4">{t("footer.contacts")}</h4>
            <div className="space-y-2 md:space-y-3">
              <a href="tel:+393913168231" className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"><Phone className="w-4 h-4 text-primary" /> +39 391 316 8231</a>
              <a href="mailto:erikbaraca119@gmail.com" className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"><Mail className="w-4 h-4 text-primary" /> erikbaraca119@gmail.com</a>
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground"><MapPin className="w-4 h-4 text-primary" /> Via Libertà 84, Casalzuigno (VA)</div>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
          <p className="text-[10px] md:text-xs text-muted-foreground">© {new Date().getFullYear()} Peak Studio — Erik Baraca. {t("footer.rights")}</p>
          <p className="text-[10px] md:text-xs text-muted-foreground">{t("footer.vat")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
