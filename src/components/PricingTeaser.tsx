import { Link } from "react-router-dom";
import { Globe, Wrench, QrCode, Sparkles, ArrowRight, FileText, Megaphone } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const cubes = [
  {
    icon: Globe,
    title: "Siti Web",
    desc: "Da 300€",
    sub: "Landing page, siti professionali e premium",
    to: "/prezzi#siti-web",
  },
  {
    icon: Megaphone,
    title: "Abbonamenti",
    desc: "Da 299€/mese",
    sub: "Gestione social, contenuti e immagine online",
    to: "/prezzi#abbonamenti",
  },
  {
    icon: Wrench,
    title: "Gestione Sito",
    desc: "Da 30€/mese",
    sub: "Hosting, sicurezza e aggiornamenti",
    to: "/prezzi#gestione-sito",
  },
  {
    icon: QrCode,
    title: "QR Code",
    desc: "Da 20€",
    sub: "QR statici e dinamici personalizzati",
    to: "/prezzi#qr-code",
  },
  {
    icon: FileText,
    title: "Volantini",
    desc: "Da 120€",
    sub: "Design, stampa e distribuzione sul territorio",
    to: "/prezzi#volantini",
  },
  {
    icon: Sparkles,
    title: "Branding & Extra",
    desc: "Da 80€",
    sub: "Logo, shooting, eventi e identità visiva",
    to: "/prezzi#extra",
  },
];

const PricingTeaser = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="prezzi" className="section-padding relative overflow-hidden">
      <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[230px]" />

      <div className="container mx-auto relative z-10" ref={ref}>
        <div className={`text-center mb-10 md:mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="red-line mx-auto mb-4" />
          <h2 className="text-2xl md:text-4xl font-black mb-3">
            I nostri <span className="text-gradient">servizi e prezzi</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Scopri tutti i piani, abbonamenti e servizi extra in un'unica pagina.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto mb-10">
          {cubes.map((c, i) => (
            <Link
              key={c.title}
              to={c.to}
              className={`group relative bg-card border border-border rounded-2xl p-6 md:p-7 hover:border-primary/60 hover:scale-[1.03] hover:glow transition-all duration-500 flex flex-col ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <c.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-lg md:text-xl font-black mb-1">{c.title}</h3>
              <p className="text-primary font-bold text-sm mb-2">{c.desc}</p>
              <p className="text-muted-foreground text-xs md:text-sm flex-1">{c.sub}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary">
                Scopri <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/prezzi"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md text-sm font-bold uppercase tracking-wider hover:scale-105 transition-all glow"
          >
            Vedi tutti i prezzi <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingTeaser;