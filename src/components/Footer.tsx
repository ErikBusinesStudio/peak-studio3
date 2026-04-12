import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/8 rounded-full blur-[200px]" />

      <div className="container mx-auto relative z-10 py-16 px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-black mb-4">
              PEAK<span className="text-primary">.</span>STUDIO
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Creo siti web moderni e performanti per attività locali che vogliono crescere online.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Navigazione</h4>
            <div className="space-y-3">
              {[
                { href: "#servizi", label: "Servizi" },
                { href: "#portfolio", label: "Portfolio" },
                { href: "#prezzi", label: "Prezzi" },
                { href: "#recensioni", label: "Recensioni" },
                { href: "#contatti", label: "Contatti" },
              ].map((l) => (
                <a key={l.href} href={l.href} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Contatti</h4>
            <div className="space-y-3">
              <a href="tel:+393913168231" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-4 h-4 text-primary" /> +39 391 316 8231
              </a>
              <a href="mailto:erikbaraca119@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4 text-primary" /> erikbaraca119@gmail.com
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" /> Via Libertà 84, Casalzuigno (VA)
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Peak Studio — Erik Baraca. Tutti i diritti riservati.
          </p>
          <p className="text-xs text-muted-foreground">
            P.IVA in corso · Made with ❤️ in Italia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
