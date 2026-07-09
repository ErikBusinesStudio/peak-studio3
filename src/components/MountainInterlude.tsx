import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type Props = {
  image: string;
  name: string;
  elevation: string;
  location: string;
  align?: "left" | "right";
};

const MountainInterlude = ({ image, name, elevation, location, align = "left" }: Props) => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section ref={ref} className="relative py-4 md:py-6 px-4 md:px-8">
      <div
        className={`max-w-5xl mx-auto flex items-stretch gap-4 md:gap-6 ${
          align === "right" ? "flex-row-reverse" : "flex-row"
        } transition-all duration-700 ${
          isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${align === "right" ? "translate-x-8" : "-translate-x-8"}`
        }`}
      >
        {/* Portrait mountain image — lateral, tall */}
        <div className="relative shrink-0 w-[130px] md:w-[200px] h-[220px] md:h-[340px] rounded-2xl overflow-hidden border border-primary/30 shadow-[0_20px_50px_-20px_hsl(212_90%_35%/0.55)]">
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 40%, hsl(212 90% 15% / 0.55) 100%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-gradient" />
          <div className="absolute left-2 top-2 md:left-3 md:top-3 flex items-center gap-1.5 text-[8px] md:text-[10px] font-mono uppercase tracking-[0.3em] text-white/95">
            <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
            {location}
          </div>
          <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
            <div className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-primary-foreground/80">Peak</div>
            <h3 className="font-display text-xl md:text-3xl uppercase tracking-tight text-primary-foreground leading-none">
              {name}
            </h3>
          </div>
        </div>

        {/* Info column beside the image */}
        <div className={`flex-1 flex flex-col justify-center ${align === "right" ? "items-end text-right" : "items-start text-left"}`}>
          <span className="eyebrow mb-2 md:mb-3">Interlude · Vetta</span>
          <div className="font-display text-2xl md:text-4xl uppercase tracking-tight text-foreground leading-[0.95]">
            {name}
          </div>
          <div className="mt-2 font-mono text-xs md:text-sm text-foreground/70 tabular-nums">{elevation}</div>
          <div className="mt-1 text-xs md:text-sm text-muted-foreground">{location}</div>
          <div className={`mt-3 h-px w-24 md:w-40 bg-gradient-to-r from-primary/70 to-transparent ${align === "right" ? "ml-auto rotate-180" : ""}`} />
        </div>
      </div>
    </section>
  );
};

export default MountainInterlude;
