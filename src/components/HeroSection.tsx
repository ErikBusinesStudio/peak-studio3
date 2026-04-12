import logo from "@/assets/logo.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Red accent blurs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-72 h-72 bg-primary/8 rounded-full blur-[100px]" />

      <div className="container mx-auto relative z-10 px-4 pt-24">
        <div className="flex flex-col items-center text-center space-y-10">
          {/* Big logo */}
          <img
            src={logo}
            alt="Peak Studio"
            className="w-64 md:w-80 lg:w-96 drop-shadow-2xl"
            width={800}
            height={600}
          />

          {/* Headline */}
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
              Il tuo sito web.
              <br />
              <span className="text-gradient">Il tuo successo.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
              Siti web moderni, veloci e progettati per portarti clienti reali.
              Pronti in 48 ore.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contatti"
              className="bg-primary text-primary-foreground px-10 py-4 rounded-md text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-all glow"
            >
              Inizia ora
            </a>
            <a
              href="#portfolio"
              className="border border-border/60 text-foreground px-10 py-4 rounded-md text-sm font-bold uppercase tracking-wider hover:border-primary/40 hover:bg-primary/5 transition-all"
            >
              Vedi i lavori
            </a>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 pt-8 border-t border-border/40 mt-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-black text-primary">50+</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Siti creati</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-black text-primary">48h</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Consegna media</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-black text-primary">100%</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Clienti soddisfatti</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
