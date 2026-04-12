import heroMockup from "@/assets/hero-mockup.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center section-padding pt-32">
      {/* Subtle gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
              Creo siti web che portano{" "}
              <span className="text-gradient">clienti</span>, non solo visite
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
              Siti moderni per palestre, ristoranti e attività locali. Veloci, belli e pensati per convertire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contatti"
                className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-base font-bold hover:opacity-90 transition-opacity text-center glow"
              >
                Richiedi il tuo sito
              </a>
              <a
                href="#portfolio"
                className="border border-border text-foreground px-8 py-4 rounded-lg text-base font-bold hover:bg-secondary transition-colors text-center"
              >
                Guarda esempi
              </a>
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <img
              src={heroMockup}
              alt="Esempio sito web su smartphone"
              className="w-[400px] animate-float drop-shadow-2xl"
              width={800}
              height={800}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
