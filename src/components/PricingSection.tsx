import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import StarFour from "@/components/icons/StarFour";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Tilt3D from "@/components/Tilt3D";
import planSites from "@/assets/plan-sites.jpg";
import planMonthly from "@/assets/plan-monthly.jpg";
import serviceBranding from "@/assets/service-branding.jpg";
import serviceQrcode from "@/assets/service-qrcode.jpg";
import serviceGestione from "@/assets/service-gestione.jpg";
import serviceAbbonamenti from "@/assets/service-abbonamenti.jpg";
import serviceSitiWeb from "@/assets/service-siti-web.jpg";
import serviceEcommerce from "@/assets/service-ecommerce.jpg";
import serviceBooking from "@/assets/service-booking.jpg";
import serviceStarter from "@/assets/service-starter.jpg";
import serviceRestyling from "@/assets/service-restyling.jpg";
import serviceGoogleBusiness from "@/assets/service-google-business.jpg";
import serviceWhatsapp from "@/assets/service-whatsapp.jpg";
import serviceHosting from "@/assets/service-hosting.jpg";
import sceneCabin from "@/assets/scene-cabin.jpg";
import { extras as extrasData } from "@/data/extras";

const wa =
  "https://wa.me/393913168231?text=Ciao%2C%20vorrei%20ricevere%20informazioni%20sui%20vostri%20servizi.";

type Category = "sites" | "monthly" | "extra";

/* ---------- DATA ---------- */

type BentoTile = {
  name: string;
  desc: string;
  image: string;
  size: "lg" | "md" | "sm" | "wide" | "tall";
  badge?: string;
  href?: string;
  internal?: boolean;
};

const siteTiles: BentoTile[] = [
  { name: "Sito Business", desc: "Fino a 6 pagine, pensato per attrarre e convertire clienti.", image: planSites, size: "lg", badge: "Più scelto" },
  { name: "Landing Page", desc: "Pagina singola per campagne, lanci, eventi.", image: serviceSitiWeb, size: "md" },
  { name: "Sito Vetrina Starter", desc: "Fino a 3 pagine — la base per esistere online.", image: serviceStarter, size: "md" },
  { name: "Sito Premium su misura", desc: "Brand completo, multi-sezione illimitato.", image: sceneCabin, size: "wide" },
  { name: "E-commerce", desc: "Catalogo, carrello, pagamenti, ordini.", image: serviceEcommerce, size: "tall" },
  { name: "Booking / Prenotazioni", desc: "Calendario, slot, conferme automatiche.", image: serviceBooking, size: "md" },
  { name: "Portfolio creativo", desc: "Per fotografi, designer, artigiani, studi.", image: serviceBranding, size: "sm" },
  { name: "Menù / Catalogo QR", desc: "Pagina digitale aggiornabile + QR stampabile.", image: serviceQrcode, size: "sm" },
  { name: "Restyling sito esistente", desc: "Rinasce moderno, veloce, mobile-first.", image: serviceRestyling, size: "wide" },
];

const sitesIncluded = [
  "Design su misura, mai template",
  "Mobile-first, perfetto da telefono",
  "Animazioni fluide e moderne",
  "SEO base inclusa (titoli, meta, velocità)",
  "Dominio + hosting primo anno",
  "Form di contatto + mappa",
  "QR Code personalizzato",
  "Connessione WhatsApp diretta",
  "Integrazione Google Maps",
  "Connessione email automatica",
  "Cookie banner & GDPR",
  "Google Analytics & Search Console",
  "Multi-lingua su richiesta",
  "Consegna entro 7 giorni dal materiale",
  "Revisioni illimitate fino al lancio",
  "Codice pulito, niente WordPress lento",
];

const monthlyTiles: BentoTile[] = [
  { name: "Crescita", desc: "Visibilità che cresce ogni mese, contenuti e SEO continua.", image: planMonthly, size: "lg", badge: "Consigliato" },
  { name: "Manutenzione Base", desc: "Sito sempre online, sicuro e aggiornato.", image: serviceGestione, size: "md" },
  { name: "Pro Scalabile", desc: "Supporto prioritario + automazioni dedicate.", image: serviceAbbonamenti, size: "md" },
  { name: "Gestione Google Business", desc: "Post, foto, risposte recensioni.", image: serviceGoogleBusiness, size: "wide" },
  { name: "Automazione WhatsApp", desc: "Risposte e flussi automatici 24/7.", image: serviceWhatsapp, size: "tall" },
  { name: "Hosting Dedicato", desc: "Hosting performante con backup automatici.", image: serviceHosting, size: "wide" },
];

const monthlyIncluded = [
  "Aggiornamenti contenuti (testi, foto)",
  "Backup mensile automatico",
  "Monitoraggio uptime 24/7",
  "Modifiche incluse ogni mese",
  "Gestione Google Business",
  "Risposta alle recensioni",
  "Report mensile visibilità",
  "Automazioni WhatsApp/email",
  "Supporto prioritario 24h",
  "Patch di sicurezza",
  "SEO continua e monitoring",
  "Nessun vincolo, disdici quando vuoi",
];

const extraTiles: BentoTile[] = extrasData.map((e) => ({
  name: e.name,
  desc: e.tagline,
  image: e.image,
  size: e.size,
  href: `/extra/${e.slug}`,
  internal: true,
}));

const sizeClasses: Record<BentoTile["size"], string> = {
  lg: "col-span-6 row-span-2 md:col-span-4 md:row-span-2 min-h-[280px] md:min-h-[420px]",
  md: "col-span-3 row-span-1 md:col-span-2 md:row-span-1 min-h-[140px] md:min-h-[200px]",
  sm: "col-span-3 row-span-1 md:col-span-2 md:row-span-1 min-h-[140px] md:min-h-[200px]",
  wide: "col-span-6 row-span-1 md:col-span-4 md:row-span-1 min-h-[140px] md:min-h-[200px]",
  tall: "col-span-3 row-span-2 md:col-span-2 md:row-span-2 min-h-[280px] md:min-h-[420px]",
};

/* ---------- COMPONENTS ---------- */

const IncludedGrid = ({ items, title }: { items: string[]; title: string }) => (
  <div className="mt-10 md:mt-16">
    <div className="flex items-center gap-3 mb-5 md:mb-8">
      <StarFour size={14} className="text-primary" />
      <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-muted-foreground">
        {title}
      </p>
      <div className="flex-1 h-px bg-border" />
    </div>
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
      {items.map((f, i) => (
        <li
          key={f}
          className="flex items-start gap-2 p-3 md:p-4 rounded-xl border border-border bg-card/50 hover:border-primary/40 hover:bg-card transition-all"
          style={{ animationDelay: `${i * 30}ms` }}
        >
          <StarFour size={10} className="text-primary mt-1 shrink-0" />
          <span className="text-xs md:text-sm leading-snug">{f}</span>
        </li>
      ))}
    </ul>
  </div>
);

const CategoryHeader = ({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  image: string;
}) => (
  <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-border mb-8 md:mb-12">
    <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" loading="lazy" />
    <div className="absolute inset-0 bg-gradient-to-r from-primary/25 via-primary/10 to-transparent" />
    <div className="relative p-5 md:p-10 lg:p-14">
      <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-primary mb-3 md:mb-5">
        {eyebrow}
      </p>
      <h3 className="font-display text-2xl md:text-5xl lg:text-6xl leading-[0.95] max-w-2xl">{title}</h3>
      <p className="text-sm md:text-base text-muted-foreground mt-3 md:mt-5 max-w-xl leading-relaxed">{subtitle}</p>
    </div>
  </div>
);

const BentoGrid = ({ tiles, ctaLabel }: { tiles: BentoTile[]; ctaLabel: string }) => (
  <div className="grid grid-cols-6 md:grid-cols-8 auto-rows-min gap-2 md:gap-3">
    {tiles.map((tile, i) => {
      const inner = (
        <>
          <img
            data-tilt-media
            src={tile.image}
            alt={tile.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/35 via-primary/10 to-transparent" />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: "linear-gradient(135deg, hsl(205 90% 48% / 0.4), transparent 70%)" }}
          />
          <div className="absolute inset-0 p-3 md:p-5 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2">
              <StarFour size={10} className="text-primary/80 mt-0.5" />
              {tile.badge && (
                <span className="text-[8px] md:text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/40 backdrop-blur whitespace-nowrap">
                  {tile.badge}
                </span>
              )}
            </div>
            <div>
              <h4
                className={`font-display leading-tight ${
                  tile.size === "lg" ? "text-xl md:text-3xl" : "text-sm md:text-lg"
                }`}
              >
                {tile.name}
              </h4>
              <p
                className={`text-muted-foreground mt-1 leading-snug ${
                  tile.size === "lg" ? "text-xs md:text-sm max-w-[85%]" : "text-[10px] md:text-xs hidden md:block"
                }`}
              >
                {tile.desc}
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                {ctaLabel} <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </>
      );

      const className = `group relative overflow-hidden rounded-xl md:rounded-2xl border border-border hover:border-primary/60 transition-all ${sizeClasses[tile.size]}`;
      const style = { animationDelay: `${i * 60}ms` } as React.CSSProperties;

      if (tile.internal && tile.href) {
        return (
          <Tilt3D key={tile.name} className={sizeClasses[tile.size]} style={style} max={6}>
            <Link to={tile.href} className={`${className} block w-full h-full`}>
              {inner}
            </Link>
          </Tilt3D>
        );
      }
      return (
        <Tilt3D key={tile.name} className={sizeClasses[tile.size]} style={style} max={6}>
          <a
            href={tile.href ?? wa}
            target={tile.href ? undefined : "_blank"}
            rel={tile.href ? undefined : "noopener noreferrer"}
            className={`${className} block w-full h-full`}
          >
            {inner}
          </a>
        </Tilt3D>
      );
    })}
  </div>
);

/* ---------- MAIN ---------- */

const PricingSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [active, setActive] = useState<Category>("sites");

  const tabs: { key: Category; label: string }[] = [
    { key: "sites", label: "Siti Web" },
    { key: "monthly", label: "Canoni Mensili" },
    { key: "extra", label: "Servizi Extra" },
  ];

  return (
    <section id="prezzi" className="section-padding relative overflow-hidden scroll-mt-24">
      {/* Atmosphere */}
      <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-primary/8 rounded-full blur-[280px] animate-pulse-slow" />
      <div className="hidden md:block absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[220px] animate-float" />

      <div className="container mx-auto relative z-10 px-4 md:px-8" ref={ref}>
        {/* Hero header */}
        <div
          className={`text-center mb-8 md:mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="eyebrow mx-auto justify-center mb-3 md:mb-4">III — La Forgia</p>
          <h2 className="text-3xl md:text-6xl font-black mb-3 md:mb-4 tracking-tight">
            Scegli il tuo <span className="text-gradient">percorso</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base px-2">
            Tutto chiaro, tutto a tuo nome. Nessun template, nessuna sorpresa in fattura.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-1.5 md:gap-3 mb-8 md:mb-14 -mx-4 md:mx-0 px-4 md:px-0 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`relative px-4 md:px-7 py-2 md:py-3 rounded-full text-[11px] md:text-sm font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                active === tab.key
                  ? "bg-primary text-primary-foreground shadow-[0_0_30px_-4px_hsl(var(--primary)/0.5)]"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              {tab.label}
              {active === tab.key && (
                <span className="absolute inset-0 rounded-full border border-primary/30 animate-pulse pointer-events-none" />
              )}
            </button>
          ))}
        </div>

        {/* ===== SITES ===== */}
        {active === "sites" && (
          <div className="animate-rise">
            <CategoryHeader
              eyebrow="III.A — Costruzione"
              title={<>Ogni progetto<br/><span className="text-gradient-pink">una vetta diversa.</span></>}
              subtitle="Dalla landing a una pagina al sito multi-sezione: ti costruisco esattamente quello che serve alla tua attività, niente di più, niente di meno."
              image={planSites}
            />
            <BentoGrid tiles={siteTiles} ctaLabel="Richiedi" />
            <IncludedGrid items={sitesIncluded} title="Tutto questo è sempre incluso" />
          </div>
        )}

        {/* ===== MONTHLY ===== */}
        {active === "monthly" && (
          <div className="animate-rise">
            <CategoryHeader
              eyebrow="IV — L'Ascesa"
              title={<>Crescere<br/><span className="text-gradient-pink">non è un evento.</span></>}
              subtitle="Il sito è solo l'inizio. Con un canone mensile lo mantengo veloce, sicuro e in costante crescita su Google e sui social."
              image={planMonthly}
            />
            <BentoGrid tiles={monthlyTiles} ctaLabel="Richiedi" />
            <IncludedGrid items={monthlyIncluded} title="Cosa puoi avere ogni mese" />
          </div>
        )}

        {/* ===== EXTRA ===== */}
        {active === "extra" && (
          <div className="animate-rise">
            <div className="flex items-end justify-between mb-5 md:mb-8 gap-4">
              <div>
                <p className="eyebrow mb-2 md:mb-3">V — Il Kit</p>
                <h3 className="font-display text-2xl md:text-5xl leading-[0.95]">
                  Servizi <span className="text-gradient-pink">extra</span>
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground mt-2 md:mt-3 max-w-md">
                  Tutto il resto che ti serve per costruire un brand coerente. Tocca una card per scoprire dettagli, processo e cosa include.
                </p>
              </div>
              <span className="hidden md:block font-mono text-xs uppercase tracking-[0.35em] text-primary/70">
                {extraTiles.length} servizi
              </span>
            </div>
            <BentoGrid tiles={extraTiles} ctaLabel="Scopri" />
          </div>
        )}

        <p className="text-center text-xs md:text-sm text-muted-foreground mt-10 md:mt-16 px-4">
          ⚡ Posti limitati ogni mese — scrivimi per fissare una consulenza gratuita.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
