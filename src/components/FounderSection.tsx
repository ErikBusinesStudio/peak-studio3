import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const FounderSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="founder" className="section-padding relative overflow-hidden">
      <div className="hidden md:block absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[220px]" />

      <div className="container mx-auto relative z-10" ref={ref}>
        <div
          className={`max-w-4xl mx-auto bg-card border border-border rounded-2xl p-6 md:p-12 transition-all duration-700 hover:border-primary/40 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid md:grid-cols-[auto,1fr] gap-6 md:gap-10 items-center">
            <div className="relative mx-auto md:mx-0">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-primary to-[hsl(15,90%,60%)] flex items-center justify-center text-4xl md:text-5xl font-black text-primary-foreground glow">
                E
              </div>
              <span className="absolute -bottom-1 -right-1 bg-background border border-primary/40 text-primary text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
                Founder
              </span>
            </div>

            <div className="text-center md:text-left">
              <div className="red-line mx-auto md:mx-0 mb-3" />
              <span className="text-xs uppercase tracking-[0.25em] text-primary font-bold">Chi c'è dietro</span>
              <h2 className="text-2xl md:text-4xl font-black mt-2 mb-1">Erik</h2>
              <p className="text-sm md:text-base text-muted-foreground font-semibold mb-4">
                Founder &amp; Creative Director
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Specializzato in <span className="text-foreground font-semibold">hospitality branding</span> e
                presenza digitale per ristoranti, bar e attività locali. Aiuto i brand a comunicare in modo
                professionale, moderno e affidabile online.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
