import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Zap, Shield, Clock } from "lucide-react";

const CtaSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/15" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-primary/15 rounded-full blur-[250px]" />

      <div className="container mx-auto text-center relative z-10" ref={ref}>
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Ogni giorno senza sito<br />
            <span className="text-gradient">perdi clienti.</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-6 max-w-lg mx-auto">
            I tuoi competitor stanno già vendendo online. Quanto ancora vuoi restare a guardare?
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <span>Pronto in 24h</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-primary" />
              <span>Soddisfatti o rimborsati</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 text-primary" />
              <span>Da €99 una tantum</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contatti"
              className="inline-block bg-primary text-primary-foreground px-12 py-4 rounded-md text-sm font-bold uppercase tracking-wider hover:opacity-90 hover:scale-105 transition-all glow"
            >
              Richiedi il tuo sito in 24h →
            </a>
            <a
              href="https://wa.me/393913168231?text=Ciao!%20Vorrei%20un%20preventivo%20gratuito%20per%20il%20mio%20sito%20web."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary/10 text-primary px-12 py-4 rounded-md text-sm font-bold uppercase tracking-wider hover:bg-primary/20 hover:scale-105 transition-all"
            >
              Preventivo gratuito su WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
