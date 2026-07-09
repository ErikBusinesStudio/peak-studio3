import heroBg from "@/assets/hero-mountains-bg.png.asset.json";

const ParallaxBand = () => (
  <section
    className="relative w-full h-[260px] md:h-[420px] my-6 md:my-10 overflow-hidden"
    aria-hidden="true"
  >
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `url(${heroBg.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        filter: "saturate(1.15) contrast(1.08)",
      }}
    />
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(180deg, hsl(210 40% 99% / 0.35), transparent 30%, transparent 70%, hsl(210 40% 99% / 0.35))",
      }}
    />
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
    <div className="relative z-10 h-full flex items-center justify-center px-6">
      <div className="glass rounded-2xl px-6 py-4 md:px-10 md:py-6 text-center max-w-2xl">
        <div className="eyebrow justify-center mb-2">Alpine Route</div>
        <div className="font-display text-2xl md:text-4xl uppercase tracking-tight text-foreground">
          Ogni progetto è una vetta
        </div>
      </div>
    </div>
  </section>
);

export default ParallaxBand;