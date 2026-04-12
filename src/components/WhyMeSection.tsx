import { Zap, Eye, Clock, Shield } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const reasons = [
  { icon: Zap, title: "Tecnologia Moderna", desc: "Utilizzo le ultime tecnologie per siti performanti e sicuri." },
  { icon: Eye, title: "Focus sui Risultati", desc: "Ogni decisione di design è pensata per convertire visitatori in clienti." },
  { icon: Clock, title: "Pronto in 48-72h", desc: "Il tuo sito online in tempi record, senza sacrificare la qualità." },
  { icon: Shield, title: "Supporto Continuo", desc: "Non ti lascio solo. Assistenza e aggiornamenti anche dopo la consegna." },
];

const WhyMeSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[200px]" />

      <div className="container mx-auto relative z-10" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="red-line mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-black">Perché scegliere me</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className={`text-center group transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="w-16 h-16 mx-auto rounded-xl bg-card border border-border flex items-center justify-center mb-5 group-hover:border-primary/50 group-hover:scale-110 group-hover:glow-subtle transition-all duration-300">
                <r.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">{r.title}</h3>
              <p className="text-muted-foreground text-sm">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyMeSection;
