import { Dumbbell, UtensilsCrossed, Store } from "lucide-react";

const services = [
  {
    icon: Dumbbell,
    title: "Siti per Palestre",
    description:
      "Landing page che cattura nuovi iscritti con orari, corsi, e prenotazione prova gratuita. Design potente e moderno.",
  },
  {
    icon: UtensilsCrossed,
    title: "Siti per Ristoranti",
    description:
      "Menu digitale con QR code, galleria piatti, prenotazione tavolo e integrazione con Google Maps. Tutto in un sito.",
  },
  {
    icon: Store,
    title: "Siti per Attività Locali",
    description:
      "Sito vetrina professionale per negozi, studi e servizi locali. Visibilità su Google e contatti facili per i clienti.",
  },
];

const ServicesSection = () => {
  return (
    <section id="servizi" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Cosa posso fare per te
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Soluzioni su misura per far crescere la tua attività online
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-colors group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <s.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
