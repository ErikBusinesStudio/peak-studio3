const CtaSection = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-primary/10 via-background to-primary/5">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-black mb-6">
          Vuoi più <span className="text-gradient">clienti</span>?
        </h2>
        <p className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto">
          Il tuo sito può essere online in 48 ore. Contattami e parliamo del tuo progetto.
        </p>
        <a
          href="#contatti"
          className="inline-block bg-primary text-primary-foreground px-10 py-4 rounded-lg text-base font-bold hover:opacity-90 transition-opacity glow"
        >
          Contattami ora
        </a>
      </div>
    </section>
  );
};

export default CtaSection;
