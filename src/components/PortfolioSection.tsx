import portfolioEriutility from "@/assets/portfolio-eriutility.png.asset.json";
import portfolioCtsCuvio from "@/assets/portfolio-cts-cuvio.webp.asset.json";
import portfolioSafetySolutions from "@/assets/portfolio-safety-solutions.png.asset.json";
import mountainBand from "@/assets/mountain-silhouette-band.jpg";
import { ExternalLink, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useI18n } from "@/contexts/I18nContext";

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
      <img
        src={mountainBand}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full h-40 md:h-56 object-cover opacity-20"
        loading="lazy"
      />
      <div className="container mx-auto relative z-10" ref={ref}>
        <div className={`text-center mb-10 md:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="red-line mx-auto mb-4 md:mb-6" />
          <h2 className="text-2xl md:text-5xl font-black mb-3">{t("portfolio.title")}</h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base">{t("portfolio.subtitle")}</p>
        </div>

        {/* Sites */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 animate-fade-in">
            {sites.map((p, i) => (
              <a
                key={p.title}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl overflow-hidden border border-border bg-card hover:border-primary/40 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 cursor-pointer block"
                style={{ animation: `fade-in 0.5s ease-out ${i * 100}ms both` }}
              >
                <div className="relative overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full h-32 md:h-56 object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" width={800} height={512} />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center">
                    <ExternalLink className="w-8 h-8 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="p-3 md:p-6">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{p.category}</span>
                  <h3 className="font-bold text-sm md:text-lg mt-1">{p.title}</h3>
                </div>
              </a>
            ))}
        </div>
        <div className="flex justify-center mt-8 md:mt-10">
            <a
              href="https://peakstudio.click/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full border border-primary/40 bg-primary/5 hover:bg-primary hover:text-primary-foreground text-primary text-xs md:text-sm font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:scale-105"
            >
              Vedi tutti i siti
              <ArrowRight className="w-4 h-4" />
            </a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
