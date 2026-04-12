import portfolioGym from "@/assets/portfolio-gym.jpg";
import portfolioPizzeria from "@/assets/portfolio-pizzeria.jpg";
import portfolioShop from "@/assets/portfolio-shop.jpg";

const projects = [
  { img: portfolioGym, title: "FitGym Pro", category: "Palestra", desc: "Sito per palestra con prenotazione corsi e prova gratuita" },
  { img: portfolioPizzeria, title: "Pizzeria da Mario", category: "Ristorante", desc: "Menu digitale con QR code e prenotazione online" },
  { img: portfolioShop, title: "Boutique Locale", category: "Negozio", desc: "E-commerce vetrina per boutique con catalogo prodotti" },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="section-padding">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
          I miei lavori
        </h2>
        <p className="text-muted-foreground text-center mb-16 max-w-md mx-auto">
          Alcuni esempi di siti creati per attività locali
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p.title}
              className="group rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-colors"
            >
              <div className="overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width={800}
                  height={512}
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {p.category}
                </span>
                <h3 className="font-bold text-lg mt-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
