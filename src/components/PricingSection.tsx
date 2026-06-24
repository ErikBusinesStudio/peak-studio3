import { useState } from "react";
import { ArrowRight } from "lucide-react";
import StarFour from "@/components/icons/StarFour";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import planSites from "@/assets/plan-sites.jpg";
import planMonthly from "@/assets/plan-monthly.jpg";
import serviceBranding from "@/assets/service-branding.jpg";
import serviceVolantini from "@/assets/service-volantini.jpg";
import serviceQrcode from "@/assets/service-qrcode.jpg";
import serviceGestione from "@/assets/service-gestione.jpg";
import serviceAbbonamenti from "@/assets/service-abbonamenti.jpg";
import serviceSitiWeb from "@/assets/service-siti-web.jpg";
import sceneSignpost from "@/assets/scene-signpost.jpg";
import sceneCabin from "@/assets/scene-cabin.jpg";

const wa =
  "https://wa.me/393913168231?text=Ciao%2C%20vorrei%20ricevere%20informazioni%20sui%20vostri%20servizi.";

type Category = "sites" | "monthly" | "extra";

/* ---------- DATA ---------- */

const siteTypes = [
  { code: "01", name: "Landing Page", price: "€150–300", desc: "Pagina singola per campagne, lanci, eventi." },
  { code: "02", name: "Sito Vetrina Starter", price: "€200", desc: "Fino a 3 pagine — la base per esistere online." },
  { code: "03", name: "Sito Business", price: "€500", desc: "Fino a 6 pagine — attrai e converti clienti.", badge: "Più scelto" },
  { code: "04", name: "Sito Premium su misura", price: "€1.200", desc: "Brand completo o multi-sezione illimitato." },
  { code: "05", name: "E-commerce", price: "da €1.200", desc: "Catalogo, carrello, pagamenti, gestione ordini." },
  { code: "06", name: "Booking / Prenotazioni", price: "da €600", desc: "Calendario, slot, conferme automatiche." },
  { code: "07", name: "Portfolio creativo", price: "da €400", desc: "Per fotografi, designer, artigiani, studi." },
  { code: "08", name: "Menù / Catalogo QR", price: "€80–120", desc: "Pagina digitale aggiornabile + QR stampabile." },
  { code: "09", name: "Restyling sito esistente", price: "€150–400", desc: "Rinasce moderno, veloce, mobile-first." },
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

const monthlyPlans = [
  { code: "01", name: "Manutenzione Base", price: "€50", priceNote: "/mese", desc: "Sito sempre online, sicuro e aggiornato." },
  { code: "02", name: "Crescita", price: "€120", priceNote: "/mese", desc: "Visibilità che cresce ogni mese.", badge: "Consigliato" },
  { code: "03", name: "Pro Scalabile", price: "€200", priceNote: "/mese", desc: "Supporto prioritario + automazioni." },
  { code: "04", name: "Gestione Google Business", price: "€80", priceNote: "/mese", desc: "Post, foto, risposte recensioni." },
  { code: "05", name: "Automazione WhatsApp", price: "€60", priceNote: "/mese", desc: "Risposte e flussi automatici." },
  { code: "06", name: "Hosting Dedicato", price: "€20", priceNote: "/mese", desc: "Hosting performante con backup." },
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

type ExtraTile = {
  name: string;
  price: string;
  priceNote?: string;
  desc: string;
  image: string;
  size: "lg" | "md" | "sm" | "wide" | "tall";
};

const extras: ExtraTile[] = [
  { name: "Logo & Branding", price: "€80–150", desc: "Identità visiva + palette + file pronti.", image: serviceBranding, size: "lg" },
  { name: "Biglietti da visita", price: "€50", desc: "Fronte/retro stampa-ready.", image: serviceVolantini, size: "sm" },
  { name: "Menù QR Digitali", price: "€80–120", priceNote: "+ canone", desc: "QR + pagina aggiornabile.", image: serviceQrcode, size: "md" },
  { name: "Google Business Setup", price: "€100–150", desc: "Scheda ottimizzata + recensioni.", image: sceneSignpost, size: "wide" },
  { name: "Volantini & Flyer", price: "€50–80", desc: "Design promozionale stampa.", image: serviceVolantini, size: "sm" },
  { name: "Automazione singola", price: "€150–250", desc: "WhatsApp / email / recensioni.", image: serviceAbbonamenti, size: "tall" },
  { name: "Landing per campagne", price: "€150–300", desc: "Pagina singola ad alta conversione.", image: serviceSitiWeb, size: "md" },
  { name: "Gestione contenuti", price: "su misura", desc: "Aggiornamenti regolari per il tuo sito.", image: serviceGestione, size: "sm" },
  { name: "Restyling completo", price: "€150–400", desc: "Sito vecchio? Lo rendo memorabile.", image: sceneCabin, size: "md" },
];

const sizeClasses: Record<ExtraTile["size"], string> = {
  lg: "col-span-6 row-span-2 md:col-span-4 md:row-span-2 min-h-[280px] md:min-h-[420px]",
  md: "col-span-3 row-span-1 md:col-span-2 md:row-span-1 min-h-[140px] md:min-h-[200px]",
  sm: "col-span-3 row-span-1 md:col-span-2 md:row-span-1 min-h-[140px] md:min-h-[200px]",
  wide: "col-span-6 row-span-1 md:col-span-4 md:row-span-1 min-h-[140px] md:min-h-[200px]",
  tall: "col-span-3 row-span-2 md:col-span-2 md:row-span-2 min-h-[280px] md:min-h-[420px]",
};

/* ---------- COMPONENTS ---------- */

const EditorialRow = ({
  code,
  name,
  price,
  priceNote,
  desc,
  badge,
  index,
}: {
  code: string;
  name: string;
  price: string;
  priceNote?: string;
  desc: string;
  badge?: string;
  index: number;
}) => (
  <a
    href={wa}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative grid grid-cols-[auto_1fr_auto] md:grid-cols-[60px_1fr_auto_auto] gap-3 md:gap-6 items-center py-4 md:py-6 px-3 md:px-5 border-t border-border/60 hover:bg-primary/5 transition-colors"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary/70">
      {code}
    </span>
    <div className="min-w-0">
      <div className="flex items-center gap-2 flex-wrap">
        <h4 className="font-display text-base md:text-2xl leading-tight">{name}</h4>
        {badge && (
          <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30">
            {badge}
          </span>
        )}
      </div>
      <p className="text-xs md:text-sm text-muted-foreground mt-0.5 md:mt-1 leading-snug">{desc}</p>
    </div>
    <div className="hidden md:block font-display text-2xl md:text-3xl whitespace-nowrap">
      <span className="text-gradient-pink">{price}</span>
      {priceNote && <span className="text-sm text-muted-foreground ml-0.5">{priceNote}</span>}
    </div>
    <span className="hidden md:inline-flex items-center justify-center w-10 h-10 rounded-full border border-border group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
    </span>
    {/* mobile price */}
    <div className="md:hidden col-span-3 flex items-center justify-between pt-1">
      <span className="font-display text-lg text-gradient-pink">
        {price}
        {priceNote && <span className="text-xs text-muted-foreground ml-0.5">{priceNote}</span>}
      </span>
      <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 transition-transform" />
    </div>
  </a>
);

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
    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
    <div className="relative p-5 md:p-10 lg:p-14">
      <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-primary mb-3 md:mb-5">
        {eyebrow}
      </p>
      <h3 className="font-display text-2xl md:text-5xl lg:text-6xl leading-[0.95] max-w-2xl">{title}</h3>
      <p className="text-sm md:text-base text-muted-foreground mt-3 md:mt-5 max-w-xl leading-relaxed">{subtitle}</p>
    </div>
  </div>
);

const ExtrasBento = () => (
  <div className="grid grid-cols-6 md:grid-cols-8 auto-rows-min gap-2 md:gap-3">
    {extras.map((tile, i) => (
      <a
        key={tile.name}
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative overflow-hidden rounded-xl md:rounded-2xl border border-border hover:border-primary/60 transition-all ${sizeClasses[tile.size]}`}
        style={{ animationDelay: `${i * 60}ms` }}
      >
        <img
          src={tile.image}
          alt={tile.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: "linear-gradient(135deg, hsl(348 78% 36% / 0.4), transparent 70%)" }}
        />

        <div className="absolute inset-0 p-3 md:p-5 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <StarFour size={10} className="text-primary/80" />
            <span className="font-display text-xs md:text-base text-foreground/90 whitespace-nowrap">
              {tile.price}
              {tile.priceNote && <span className="text-[10px] text-muted-foreground ml-1">{tile.priceNote}</span>}
            </span>
          </div>
          <div>
            <h4 className={`font-display leading-tight ${tile.size === "lg" ? "text-xl md:text-3xl" : "text-sm md:text-lg"}`}>
              {tile.name}
            </h4>
            <p
              className={`text-muted-foreground mt-1 leading-snug ${
                tile.size === "lg" ? "text-xs md:text-sm max-w-[80%]" : "text-[10px] md:text-xs hidden md:block"
              }`}
            >
              {tile.desc}
            </p>
          </div>
        </div>
      </a>
    ))}
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

            <div className="rounded-2xl md:rounded-3xl border border-border bg-card/40 overflow-hidden">
              <div className="px-3 md:px-5 py-3 md:py-4 flex items-center justify-between border-b border-border/60">
                <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-muted-foreground">
                  Tipi di sito disponibili
                </p>
                <span className="font-mono text-[10px] md:text-xs text-primary/70">{siteTypes.length} formati</span>
              </div>
              {siteTypes.map((s, i) => (
                <EditorialRow key={s.name} {...s} index={i} />
              ))}
            </div>

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

            <div className="rounded-2xl md:rounded-3xl border border-border bg-card/40 overflow-hidden">
              <div className="px-3 md:px-5 py-3 md:py-4 flex items-center justify-between border-b border-border/60">
                <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-muted-foreground">
                  Canoni & abbonamenti
                </p>
                <span className="font-mono text-[10px] md:text-xs text-primary/70">nessun vincolo</span>
              </div>
              {monthlyPlans.map((p, i) => (
                <EditorialRow key={p.name} {...p} index={i} />
              ))}
            </div>

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
                  Tutto il resto che ti serve per costruire un brand coerente.
                </p>
              </div>
              <span className="hidden md:block font-mono text-xs uppercase tracking-[0.35em] text-primary/70">
                {extras.length} servizi
              </span>
            </div>

            <ExtrasBento />
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
