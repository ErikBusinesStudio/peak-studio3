import { ArrowRight } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const HeroSection = () => {
  const { t } = useI18n();

  return (
    <section className="relative pt-28 md:pt-40 pb-16 md:pb-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 border-l border-border">
        {/* Vertical margin branding */}
        <div className="hidden lg:flex lg:col-span-1 border-r border-border flex-col justify-between py-8 items-center min-h-[600px]">
          <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium whitespace-nowrap">Established · Italia 2024</span>
          <div className="w-px h-24 bg-border" />
          <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium whitespace-nowrap">Peak Studio Design</span>
        </div>

        {/* Main editorial column */}
        <div className="lg:col-span-11 p-6 md:p-16 lg:p-20 relative overflow-hidden">
          {/* Manga-style mountain lines behind headline */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg viewBox="0 0 800 400" fill="none" className="w-full h-full">
              <path d="M0 400L150 280L280 340L450 120L600 220L800 50" stroke="hsl(215 30% 25%)" strokeWidth="0.6" />
              <path d="M0 380L180 250L300 310L480 90L620 190L800 20" stroke="hsl(215 30% 25%)" strokeWidth="0.6" strokeDasharray="4 4" />
            </svg>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8 md:mb-12 animate-rise">
              <div className="w-12 h-px bg-primary" />
              <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-semibold text-primary">Studio Web Design · Italia</span>
            </div>

            <h1
              className="font-display leading-[0.85] tracking-tight text-foreground animate-rise"
              style={{ fontSize: "clamp(3rem, 11vw, 10rem)", animationDelay: "0.1s" }}
            >
              PEAK<br />STUDIO
            </h1>

            <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end animate-rise" style={{ animationDelay: "0.25s" }}>
              <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-md font-light">
                {t("hero.subtitle") || "Costruiamo la presenza digitale per"} <span className="text-foreground font-semibold">palestre</span>, <span className="text-foreground font-semibold">ristoranti</span> e attività che puntano alla vetta.
              </p>

              <div className="flex flex-col gap-5">
                <div className="h-px w-full bg-border" />
                <a href="#contatti" className="flex justify-between items-center group">
                  <span className="text-sm uppercase tracking-[0.25em] font-bold text-foreground">Inizia la scalata</span>
                  <span className="w-11 h-11 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                    <ArrowRight className="w-4 h-4 text-foreground group-hover:text-primary-foreground transition-colors" />
                  </span>
                </a>
                <div className="h-px w-full bg-border" />
                <a href="https://wa.me/393913168231?text=Ciao!%20Vorrei%20un%20preventivo%20per%20il%20mio%20sito%20web." target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-[0.25em] font-semibold text-primary hover:underline underline-offset-4">
                  → Scrivimi su WhatsApp
                </a>
              </div>
            </div>

            {/* Data points / stats minimal */}
            <div className="mt-20 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-8 md:pt-12 animate-rise" style={{ animationDelay: "0.4s" }}>
              {[
                { k: "Consegna", v: "7 giorni max" },
                { k: "Siti online", v: "50+" },
                { k: "Soddisfazione", v: "100%" },
                { k: "Base", v: "Casalzuigno · VA" },
              ].map((d) => (
                <div key={d.k} className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">{d.k}</span>
                  <span className="font-display text-xl md:text-2xl text-foreground">{d.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
