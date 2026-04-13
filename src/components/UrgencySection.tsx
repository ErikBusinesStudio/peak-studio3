import { SearchX, AlertTriangle, TrendingDown, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const losses = [
  {
    icon: SearchX,
    stat: "46%",
    title: "dei clienti cerca su Google prima di comprare",
    desc: "Se non ti trovano, vanno dal tuo concorrente. Ogni giorno perdi decine di clienti che non sapranno mai che esisti.",
  },
  {
    icon: AlertTriangle,
    stat: "73%",
    title: "delle persone giudica un'attività dal sito web",
    desc: "Nessun sito = nessuna credibilità. I clienti pensano che la tua attività sia chiusa o poco seria.",
  },
  {
    icon: Users,
    stat: "3 su 4",
    title: "scelgono il concorrente con il sito migliore",
    desc: "I tuoi competitor stanno già raccogliendo i clienti che dovrebbero essere tuoi. Ogni giorno che aspetti, loro crescono.",
  },
  {
    icon: TrendingDown,
    stat: "€1.200+",
    title: "persi ogni mese senza presenza online",
    desc: "Clienti che non chiamano, prenotazioni perse, preventivi mai richiesti. Il costo di NON avere un sito è molto più alto del sito stesso.",
  },
];

const UrgencySection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-destructive/5 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-destructive/10 rounded-full blur-[250px]" />

      <div className="container mx-auto relative z-10" ref={ref}>
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="red-line mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Guarda quanto stai <span className="text-gradient">perdendo</span> senza sito
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Mentre leggi questo, i tuoi concorrenti stanno rubando i tuoi clienti. Ecco i numeri che non vuoi sentire.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {losses.map((item, i) => (
            <div
              key={i}
              className={`relative rounded-xl p-6 border border-destructive/20 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-destructive/40 hover:scale-[1.03] group ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4 group-hover:bg-destructive/20 transition-colors">
                <item.icon className="w-6 h-6 text-destructive" />
              </div>
              <div className="text-3xl font-black text-destructive mb-2">{item.stat}</div>
              <h3 className="font-bold text-sm mb-2 leading-snug">{item.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className={`text-center mt-12 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-lg font-bold mb-4">
            ⏰ Ogni giorno che passa, <span className="text-destructive">perdi soldi.</span>
          </p>
          <a
            href="#prezzi"
            className="inline-block bg-primary text-primary-foreground px-10 py-4 rounded-md text-sm font-bold uppercase tracking-wider hover:opacity-90 hover:scale-105 transition-all glow"
          >
            Smetti di perdere clienti →
          </a>
        </div>
      </div>
    </section>
  );
};

export default UrgencySection;
