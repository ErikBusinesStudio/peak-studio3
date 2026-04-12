import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marco R.",
    role: "Proprietario palestra",
    text: "In 3 giorni avevo il sito online. Dopo 2 settimane ho ricevuto 15 richieste di prova gratuita. Investimento ripagato subito!",
  },
  {
    name: "Giulia P.",
    role: "Titolare pizzeria",
    text: "Il menu con QR code ha cambiato tutto. I clienti ordinano più facilmente e il sito ci porta nuove prenotazioni ogni settimana.",
  },
  {
    name: "Luca T.",
    role: "Negozio di abbigliamento",
    text: "Professionale, veloce e il prezzo è onesto. Finalmente un sito che rappresenta davvero il mio negozio. Consigliatissimo!",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-16">
          Cosa dicono i clienti
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-card border border-border rounded-2xl p-8 space-y-4"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                "{t.text}"
              </p>
              <div>
                <p className="font-bold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
