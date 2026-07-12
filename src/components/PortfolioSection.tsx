import portfolioEriutility from "@/assets/portfolio-eriutility.png.asset.json";
import portfolioCtsCuvio from "@/assets/portfolio-cts-cuvio.webp.asset.json";
import portfolioSafetySolutions from "@/assets/portfolio-safety-solutions.png.asset.json";
import { ExternalLink } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useI18n } from "@/contexts/I18nContext";
import Tilt3D from "@/components/Tilt3D";

const sites = [
  { img: portfolioEriutility.url, title: "E-Riutility", category: "Mercatino dell'usato", url: "https://e-riutility.it" },
  { img: portfolioCtsCuvio.url, title: "CTS Cuvio", category: "Centro Turistico Sportivo", url: "https://centrocuvio.it" },
  { img: portfolioSafetySolutions.url, title: "Safety Solutions", category: " Sicurezza sul lavoro", url: "https://safetysolutionproject.lovable.app" },
];

const PortfolioSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useI18n();

  return (
    <section id="portfolio" className="section-padding relative overflow-hidden">
      <div className="hidden md:block absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[180px]" />
      <div className="container mx-auto relative z-10" ref={ref}>
        <div className={`text-center mb-10 md:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="red-line mx-auto mb-4 md:mb-6" />
          <h2 className="text-2xl md:text-5xl font-black mb-3">{t("portfolio.title")}</h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base">{t("portfolio.subtitle")}</p>
        </div>

        {/* Sites */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 animate-fade-in">
            {sites.map((p, i) => (
              <Tilt3D
                key={p.title}
                className="rounded-xl"
                style={{ animation: `fade-in 0.5s ease-out ${i * 100}ms both` }}
              >
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl overflow-hidden border border-border bg-card hover:border-primary/40 transition-colors duration-500 cursor-pointer block"
                >
                  <div className="relative overflow-hidden">
                    <img
                      data-tilt-media
                      src={p.img}
                      alt={p.title}
                      className="w-full h-32 md:h-56 object-cover transition-transform duration-500"
                      loading="lazy"
                      width={800}
                      height={512}
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center">
                      <ExternalLink className="w-8 h-8 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  <div className="p-3 md:p-6">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{p.category}</span>
                    <h3 className="font-bold text-sm md:text-lg mt-1">{p.title}</h3>
                  </div>
                </a>
              </Tilt3D>
            ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
