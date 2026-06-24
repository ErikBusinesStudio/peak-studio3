import { Palette, Printer, MapPin, Check, Users, Target, Zap, ShieldCheck } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import flyerRistorante from "@/assets/flyers/ristorante.jpg";
import flyerEvento from "@/assets/flyers/evento.jpg";
import flyerYoga from "@/assets/flyers/yoga.jpg";
import flyerNegozio from "@/assets/flyers/negozio.jpg";

type Pkg = {
  name: string;
  price: string;
  tone: "base" | "business" | "growth";
  features: string[];
  highlighted?: boolean;
};

const packages: Pkg[] = [
  {
    name: "Base",
    price: "120€ – 200€",
    tone: "base",
    features: ["Design semplice", "1.000 volantini stampati", "Distribuzione inclusa"],
  },
  {
    name: "Business",
    price: "250€ – 450€",
    tone: "business",
    highlighted: true,
    features: ["Design professionale con revisioni", "3.000 volantini", "Distribuzione mirata"],
  },
  {
    name: "Growth",
    price: "500€ – 900€",
    tone: "growth",
    features: ["Design branding avanzato", "5.000 volantini", "Distribuzione + report zone"],
  },
];

const steps = [
  { icon: Palette, title: "Design professionale", desc: "Creiamo un volantino efficace, moderno e pensato per vendere." },
  { icon: Printer, title: "Stampa inclusa", desc: "Stampiamo e prepariamo tutto il materiale necessario." },
  { icon: MapPin, title: "Distribuzione sul territorio", desc: "Portiamo fisicamente i volantini nelle zone strategiche per il tuo business." },
];

const benefits = [
  { icon: Users, text: "Più clienti nel tuo locale" },
  { icon: Zap, text: "Pubblicità fisica ancora altamente efficace" },
  { icon: ShieldCheck, text: "Nessuna gestione per te, facciamo tutto noi" },
  { icon: Target, text: "Target locale preciso" },
  { icon: Check, text: "Risultati rapidi e misurabili" },
];

const dotColor = (tone: Pkg["tone"]) =>
  tone === "base" ? "bg-emerald-500" : tone === "business" ? "bg-amber-400" : "bg-primary";

const FlyersSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="volantini" className="section-padding relative overflow-hidden">
      <div className="hidden md:block absolute top-20 left-0 w-[600px] h-[600px] bg-primary/12 rounded-full blur-[230px]" />
      <div className="hidden md:block absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[200px]" />

      <div className="container mx-auto relative z-10" ref={ref}>
        {/* Hero */}
        <div className={`text-center max-w-3xl mx-auto mb-12 md:mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="red-line mx-auto mb-4" />
          <span className="text-xs md:text-sm uppercase tracking-[0.25em] text-primary font-bold">Volantini & Distribuzione</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mt-4 mb-5 leading-[1.05]">
            Volantini che portano <span className="text-gradient">clienti reali</span> al tuo business
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mb-8">
            Design, stampa e distribuzione gestita in un unico servizio. Tu pensi alla tua attività, noi portiamo le persone da te.
          </p>
          <a
            href="#contatti"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md text-sm font-bold uppercase tracking-wider hover:scale-105 transition-all glow"
          >
            Richiedi un preventivo
          </a>
        </div>

        {/* Come funziona */}
        <div className="mb-16 md:mb-24">
          <h3 className={`text-center text-2xl md:text-4xl font-black mb-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            Come <span className="text-gradient">funziona</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className={`relative bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-primary/40 hover:scale-[1.02] transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <span className="absolute top-4 right-5 text-5xl font-black text-primary/10 select-none">0{i + 1}</span>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-lg md:text-xl font-bold mb-2">{s.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Galleria locandine */}
        <div className="mb-16 md:mb-24">
          <div className={`text-center mb-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h3 className="text-2xl md:text-4xl font-black mb-3">
              Alcuni <span className="text-gradient">esempi</span>
            </h3>
            <p className="text-muted-foreground text-sm md:text-base">Locandine pensate per catturare l'attenzione e portare clienti.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
            {[
              { src: flyerRistorante, alt: "Locandina per ristorante italiano", title: "Ristorante", category: "Food & beverage" },
              { src: flyerEvento, alt: "Locandina per evento live", title: "Evento live", category: "Nightlife" },
              { src: flyerYoga, alt: "Locandina per yoga e wellness", title: "Yoga & Wellness", category: "Benessere" },
              { src: flyerNegozio, alt: "Locandina per apertura negozio", title: "Grand Opening", category: "Retail" },
            ].map((f, i) => (
              <div
                key={f.title}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-card hover:border-primary/40 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={f.src}
                    alt={f.alt}
                    loading="lazy"
                    width={768}
                    height={1024}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/80 to-transparent p-4 md:p-5">
                  <p className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-primary mb-1">{f.category}</p>
                  <h4 className="font-display text-lg md:text-xl font-bold">{f.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pacchetti */}
        <div className="mb-16 md:mb-24">
          <div className={`text-center mb-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h3 className="text-2xl md:text-4xl font-black mb-3">
              Scegli il <span className="text-gradient">pacchetto</span> giusto
            </h3>
            <p className="text-muted-foreground text-sm md:text-base">Trasparenza totale: scegli e parti.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {packages.map((p, i) => (
              <div
                key={p.name}
                className={`relative rounded-2xl p-6 md:p-7 border transition-all duration-500 hover:scale-[1.02] flex flex-col ${
                  p.highlighted ? "border-primary/60 bg-card glow md:scale-[1.03]" : "border-border bg-card hover:border-border/80"
                } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {p.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                    Più scelto
                  </span>
                )}
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-3 h-3 rounded-full ${dotColor(p.tone)}`} />
                  <h4 className="text-xl md:text-2xl font-black">Pacchetto {p.name}</h4>
                </div>
                <div className="mt-3 mb-5">
                  <span className="text-3xl md:text-4xl font-black">{p.price}</span>
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contatti"
                  className={`block text-center py-3 rounded-md font-bold text-xs md:text-sm uppercase tracking-wider transition-all hover:scale-[1.03] ${
                    p.highlighted ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-primary/10 text-primary hover:bg-primary/20"
                  }`}
                >
                  Richiedi preventivo
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Vantaggi */}
        <div className={`max-w-4xl mx-auto mb-16 md:mb-24 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h3 className="text-center text-2xl md:text-4xl font-black mb-8">
            Perché <span className="text-gradient">funziona</span>
          </h3>
          <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
            {benefits.map((b) => (
              <div key={b.text} className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-4 hover:border-primary/40 transition-all">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <b.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm md:text-base font-medium">{b.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA finale */}
        <div className={`relative max-w-3xl mx-auto text-center bg-card border border-primary/30 rounded-2xl p-8 md:p-12 glow transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h3 className="text-2xl md:text-4xl font-black mb-4">
            Vuoi <span className="text-gradient">riempire il tuo locale?</span>
          </h3>
          <p className="text-muted-foreground mb-6 text-sm md:text-base">Posti limitati ogni mese — fissa la tua consulenza gratuita.</p>
          <a
            href="#contatti"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md text-sm font-bold uppercase tracking-wider hover:scale-105 transition-all"
          >
            Parliamo del tuo progetto
          </a>
        </div>
      </div>
    </section>
  );
};

export default FlyersSection;
