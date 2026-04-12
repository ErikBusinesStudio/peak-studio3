import portfolioGym from "@/assets/portfolio-gym.jpg";
import portfolioPizzeria from "@/assets/portfolio-pizzeria.jpg";
import portfolioShop from "@/assets/portfolio-shop.jpg";
import { ExternalLink } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const projects = [
  { img: portfolioGym, title: "FitGym Pro", category: "Fitness & Sport" },
  { img: portfolioPizzeria, title: "Pizzeria da Mario", category: "Food & Beverage" },
  { img: portfolioShop, title: "Boutique Locale", category: "Retail & Shopping" },
];

const PortfolioSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="portfolio" className="section-padding bg-card/50 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[180px]" />

      <div className="container mx-auto relative z-10" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="red-line mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-black mb-4">I miei lavori</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Alcuni progetti recenti che hanno aiutato attività reali a crescere online.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div
              key={p.title}
              className={`group rounded-xl overflow-hidden border border-border bg-card hover:border-primary/40 hover:scale-[1.03] transition-all duration-500 cursor-pointer ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  width={800}
                  height={512}
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center">
                  <ExternalLink className="w-8 h-8 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <div className="p-6">
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{p.category}</span>
                <h3 className="font-bold text-lg mt-2">{p.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
