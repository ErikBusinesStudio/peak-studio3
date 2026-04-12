import { Zap, Eye, Clock, Shield } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const reasons = [
  { icon: Zap, title: "Tecnologia all'Avanguardia", desc: "Stack moderno e performance estreme. Il tuo sito sarà più veloce del 95% dei competitor." },
  { icon: Eye, title: "Ossessionato dai Risultati", desc: "Non creo siti belli. Creo siti che vendono. Ogni elemento è pensato per portarti clienti." },
  { icon: Clock, title: "Pronto in 48 Ore", desc: "Mentre altri ci mettono settimane, il tuo sito sarà online e operativo in 2 giorni." },
  { icon: Shield, title: "Zero Rischi", desc: "Garanzia soddisfatti o rimborsati. Se non ti piace, non paghi. Punto." },
];

const WhyMeSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-primary/12 rounded-full blur-[250px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[200px]" />

      <div className="container mx-auto relative z-10" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="red-line mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-black mb-4">Perché scegliere me?</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Perché non sono il solito web designer. Sono il tuo partner per crescere.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className={`text-center p-8 rounded-xl bg-card border border-border hover:border-primary/30 hover:scale-[1.04] transition-all duration-500 group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <r.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">{r.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyMeSection;
