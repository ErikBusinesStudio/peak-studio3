import { useState } from "react";
import portfolioEriutility from "@/assets/portfolio-eriutility.png.asset.json";
import portfolioCtsCuvio from "@/assets/portfolio-cts-cuvio.webp.asset.json";
import portfolioShop from "@/assets/portfolio-shop.jpg";
import volantinoImg from "@/assets/service-volantini.jpg";
import { ExternalLink, Globe, FileText } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useI18n } from "@/contexts/I18nContext";

const sites = [
  { img: portfolioEriutility.url, title: "E-Riutility", category: "Mercatino dell'usato", url: "https://e-riutility.it" },
  { img: portfolioCtsCuvio.url, title: "CTS Cuvio", category: "Centro Turistico Sportivo", url: "https://centrocuvio.it" },
  { img: portfolioShop, title: "Coming soon", category: "Prossimo progetto", url: "#" },
];

const flyers = [
  { img: volantinoImg, titleKey: "portfolio.flyer1.title", catKey: "portfolio.flyer1.cat" },
  { img: volantinoImg, titleKey: "portfolio.flyer2.title", catKey: "portfolio.flyer2.cat" },
  { img: volantinoImg, titleKey: "portfolio.flyer3.title", catKey: "portfolio.flyer3.cat" },
  { img: volantinoImg, titleKey: "portfolio.flyer4.title", catKey: "portfolio.flyer4.cat" },
];

type Tab = "sites" | "flyers";

const PortfolioSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useI18n();
  const [tab, setTab] = useState<Tab>("sites");

  return (
    <section id="portfolio" className="section-padding relative overflow-hidden">
      <div className="hidden md:block absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[180px]" />
      <div className="container mx-auto relative z-10" ref={ref}>
        <div className={`text-center mb-10 md:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="red-line mx-auto mb-4 md:mb-6" />
          <h2 className="text-2xl md:text-5xl font-black mb-3">{t("portfolio.title")}</h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base">{t("portfolio.subtitle")}</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 md:mb-10">
          <div className="inline-flex p-1 bg-card border border-border rounded-full">
            {([
              { id: "sites", labelKey: "portfolio.tab.sites", Icon: Globe },
              { id: "flyers", labelKey: "portfolio.tab.flyers", Icon: FileText },
            ] as const).map((opt) => (
              <button
                key={opt.id}
                onClick={() => setTab(opt.id)}
                className={`inline-flex items-center gap-2 px-4 md:px-5 py-2 text-xs md:text-sm font-bold uppercase tracking-wider rounded-full transition-all duration-300 ${
                  tab === opt.id
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_-4px_hsl(var(--primary)/0.6)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <opt.Icon className="w-3.5 h-3.5" />
                {t(opt.labelKey)}
              </button>
            ))}
          </div>
        </div>

        {/* Sites */}
        {tab === "sites" && (
          <div key="sites" className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 animate-fade-in">
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
        )}

        {/* Flyers — compact grid */}
        {tab === "flyers" && (
          <div key="flyers" className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 animate-fade-in">
            {flyers.map((f, i) => (
              <div
                key={f.titleKey + i}
                className="group rounded-lg overflow-hidden border border-border bg-card hover:border-primary/40 hover:-translate-y-1 transition-all duration-500"
                style={{ animation: `fade-in 0.5s ease-out ${i * 80}ms both` }}
              >
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img src={f.img} alt={t(f.titleKey)} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                </div>
                <div className="p-3">
                  <span className="text-[9px] font-bold text-primary uppercase tracking-[0.15em]">{t(f.catKey)}</span>
                  <h3 className="font-bold text-sm mt-0.5 truncate">{t(f.titleKey)}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
