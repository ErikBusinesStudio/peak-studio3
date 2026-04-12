import { Globe, Paintbrush, Rocket, BarChart3 } from "lucide-react";

const services = [
  {
    icon: Paintbrush,
    title: "Design su Misura",
    description: "Nessun template. Ogni sito è unico, progettato per riflettere il tuo brand e catturare l'attenzione dei tuoi clienti.",
    number: "01",
  },
  {
    icon: Globe,
    title: "Presenza Online Completa",
    description: "Dominio, hosting, SEO e tutto ciò che serve per farti trovare su Google dai tuoi clienti ideali.",
    number: "02",
  },
  {
    icon: Rocket,
    title: "Velocità Estrema",
    description: "Siti ultrarapidi che si caricano in meno di 2 secondi. Nessun visitatore perso per la lentezza.",
    number: "03",
  },
  {
    icon: BarChart3,
    title: "Risultati Misurabili",
    description: "Ogni sito è ottimizzato per convertire. Più visite, più contatti, più clienti per la tua attività.",
    number: "04",
  },
];

const ServicesSection = () => {
  return (
    <section id="servizi" className="section-padding">
      <div className="container mx-auto">
        <div className="mb-16">
          <div className="red-line mb-6" />
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Cosa faccio
          </h2>
          <p className="text-muted-foreground max-w-md text-lg">
            Tutto ciò che serve per portare la tua attività online e farla crescere.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="group bg-card border border-border rounded-xl p-8 md:p-10 hover:border-primary/40 transition-all duration-300 relative overflow-hidden"
            >
              {/* Number bg */}
              <span className="absolute top-4 right-6 text-7xl font-black text-foreground/[0.03] select-none">
                {s.number}
              </span>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
