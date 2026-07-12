import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import CallButton from "@/components/CallButton";
import serviceBranding from "@/assets/service-branding.jpg";
import serviceSitiWeb from "@/assets/service-siti-web.jpg";
import serviceHosting from "@/assets/service-hosting.jpg";
import serviceEcommerce from "@/assets/service-ecommerce.jpg";

const ServicesSection = () => {
  const { t } = useI18n();

  const features: Record<string, string[]> = {
    s1: [
      "Design 100% su misura, mai template",
      "Direzione artistica coerente col brand",
      "Layout costruito attorno alla tua offerta",
      "Micro-interazioni e animazioni cinematografiche",
    ],
    s2: [
      "Dominio, hosting e certificato SSL",
      "SEO tecnica e on-page inclusa",
      "Google Business, Analytics, Search Console",
      "Struttura pensata per farti trovare",
    ],
    s3: [
      "Punteggio PageSpeed sopra 90",
      "Immagini ottimizzate automaticamente",
      "Caricamento sotto i 2 secondi",
      "Codice pulito, niente WordPress lento",
    ],
    s4: [
      "Ogni pixel al servizio della conversione",
      "CTA studiate per l'azione",
      "Form, WhatsApp e prenotazioni integrati",
      "Report e monitoraggio dei risultati",
    ],
  };

  const blocks = [
    { n: "01", title: t("services.s1.title"), desc: t("services.s1.desc"), img: serviceBranding, feats: features.s1 },
    { n: "02", title: t("services.s2.title"), desc: t("services.s2.desc"), img: serviceSitiWeb, feats: features.s2 },
    { n: "03", title: t("services.s3.title"), desc: t("services.s3.desc"), img: serviceHosting, feats: features.s3 },
    { n: "04", title: t("services.s4.title"), desc: t("services.s4.desc"), img: serviceEcommerce, feats: features.s4 },
  ];

  return (
    <section id="servizi" className="relative overflow-hidden py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-10 md:mb-20">
        <p className="eyebrow mb-4 md:mb-6">II — Unicità</p>
        <h2 className="font-display text-3xl md:text-6xl leading-[0.9] tracking-tight uppercase max-w-4xl">
          {t("services.title")}<br />
          <span className="text-gradient italic">senza compromessi.</span>
        </h2>
        <p className="text-muted-foreground max-w-xl text-base md:text-lg mt-4 md:mt-6">
          {t("services.subtitle")}
        </p>
      </div>

      <div className="flex flex-col">
        {blocks.map((b, i) => (
          <article
            key={b.n}
            className={`relative w-full grid md:grid-cols-2 gap-0 items-stretch border-t border-foreground/10 ${
              i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
            }`}
          >
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[520px] overflow-hidden group">
              <img
                src={b.img}
                alt={b.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/10 to-transparent" />
              <span className="absolute top-6 left-6 font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/90 mix-blend-difference">
                Servizio {b.n}
              </span>
              <span
                className="absolute -bottom-4 md:-bottom-10 -right-2 md:-right-6 font-display leading-none select-none"
                style={{
                  fontSize: "clamp(6rem, 16vw, 14rem)",
                  color: "hsl(var(--primary) / 0.18)",
                  WebkitTextStroke: "1px hsl(var(--primary) / 0.35)",
                }}
              >
                {b.n}
              </span>
            </div>

            <div className="flex flex-col justify-center gap-6 p-6 md:p-16 lg:p-24 relative">
              <h3 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight uppercase">
                {b.title}
              </h3>
              <p className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed">
                {b.desc}
              </p>
              <ul className="flex flex-col gap-2 md:gap-3 mt-2">
                {b.feats.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm md:text-base">
                    <span
                      className="mt-2 w-2 h-2 rounded-full shrink-0"
                      style={{ background: "hsl(var(--primary))" }}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-4 mt-4">
                <CallButton variant="soft" label="Richiedi consulenza" />
                <a
                  href="#prezzi"
                  className="inline-flex items-center gap-1 text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-primary hover:opacity-80"
                >
                  Vedi i piani <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
