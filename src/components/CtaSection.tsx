import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const CtaSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-primary/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[200px]" />

      <div className="container mx-auto text-center relative z-10" ref={ref}>
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Vuoi più <span className="text-gradient">clienti</span>?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto">
            Il tuo sito web professionale può essere online domani. Parliamone.
          </p>
          <a
            href="#contatti"
            className="inline-block bg-primary text-primary-foreground px-12 py-4 rounded-md text-sm font-bold uppercase tracking-wider hover:opacity-90 hover:scale-105 transition-all glow"
          >
            Contattami ora
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
