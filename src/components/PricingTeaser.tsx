import { Globe, Wrench, QrCode, Sparkles, ArrowRight, FileText, Megaphone } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useI18n } from "@/contexts/I18nContext";
import imgSitiWeb from "@/assets/service-siti-web.jpg";
import imgAbbonamenti from "@/assets/service-abbonamenti.jpg";
import imgGestione from "@/assets/service-gestione.jpg";
import imgQrCode from "@/assets/service-qrcode.jpg";
import imgVolantini from "@/assets/service-volantini.jpg";
import imgBranding from "@/assets/service-branding.jpg";

const cubes = [
  { icon: Globe, slug: "siti-web", image: imgSitiWeb },
  { icon: Megaphone, slug: "abbonamenti", image: imgAbbonamenti },
  { icon: Wrench, slug: "gestione-sito", image: imgGestione },
  { icon: QrCode, slug: "qr-code", image: imgQrCode },
  { icon: FileText, slug: "volantini", image: imgVolantini },
  { icon: Sparkles, slug: "extra", image: imgBranding },
];

const PricingTeaser = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useI18n();

  return (
    <section id="prezzi" className="section-padding relative overflow-hidden scroll-mt-24">
      <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[230px]" />

      <div className="container mx-auto relative z-10" ref={ref}>
        <div className={`text-center mb-10 md:mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="red-line mx-auto mb-4" />
          <h2 className="text-2xl md:text-4xl font-black mb-3">
            {t("teaser.title1")} <span className="text-gradient">{t("teaser.title2")}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">{t("teaser.subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto mb-10">
          {cubes.map((c, i) => (
            <a
              key={c.slug}
              href={`/servizi/${c.slug}`}
              className={`group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/60 hover:scale-[1.03] hover:glow transition-all duration-500 flex flex-col ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={c.image} alt={t(`svc.${c.slug}.title`)} loading="lazy" width={768} height={512}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-background/80 backdrop-blur flex items-center justify-center border border-border">
                  <c.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="p-6 md:p-7 flex flex-col flex-1">
                <h3 className="text-lg md:text-xl font-black mb-1">{t(`svc.${c.slug}.title`)}</h3>
                <p className="text-primary font-bold text-sm mb-2">{t(`svc.${c.slug}.heroPrice`)}</p>
                <p className="text-muted-foreground text-xs md:text-sm flex-1">{t(`svc.${c.slug}.teaserSub`)}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary">
                  {t("teaser.discover")} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <a href="/prezzi" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md text-sm font-bold uppercase tracking-wider hover:scale-105 transition-all glow">
            {t("teaser.all")} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PricingTeaser;
