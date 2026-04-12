import { Zap, Eye, Clock, Shield } from "lucide-react";

const reasons = [
  { icon: Zap, title: "Tecnologia Moderna", desc: "Utilizzo le ultime tecnologie per siti performanti e sicuri." },
  { icon: Eye, title: "Focus sui Risultati", desc: "Ogni decisione di design è pensata per convertire visitatori in clienti." },
  { icon: Clock, title: "Pronto in 48-72h", desc: "Il tuo sito online in tempi record, senza sacrificare la qualità." },
  { icon: Shield, title: "Supporto Continuo", desc: "Non ti lascio solo. Assistenza e aggiornamenti anche dopo la consegna." },
];

const WhyMeSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="red-line mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-black">
            Perché scegliere me
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((r) => (
            <div key={r.title} className="text-center group">
              <div className="w-16 h-16 mx-auto rounded-xl bg-card border border-border flex items-center justify-center mb-5 group-hover:border-primary/50 group-hover:glow-subtle transition-all duration-300">
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
