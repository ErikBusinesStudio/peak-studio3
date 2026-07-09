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
      <div className={`max-w-3xl ${align === "right" ? "ml-auto mr-0 md:mr-8" : "mr-auto ml-0 md:ml-8"}`}>
        <div
          className={`relative overflow-hidden rounded-xl border border-primary/25 shadow-[0_10px_30px_-15px_hsl(212_90%_45%/0.55)] transition-all duration-700 ${
            isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${align === "right" ? "translate-x-8" : "-translate-x-8"}`
          }`}
        >
          <div
            className="h-[110px] md:h-[140px] w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, hsl(212 90% 20% / 0.60), transparent 65%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-gradient" />
          <div className="absolute inset-0 flex items-center p-4 md:p-6">
            <div className="glass rounded-lg px-3 py-2 md:px-4 md:py-2.5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.3em] text-primary mb-0.5">
                <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                {location}
              </div>
              <h3 className="font-display text-lg md:text-2xl uppercase tracking-tight text-foreground leading-none">
                {name}
              </h3>
              <div className="mt-0.5 font-mono text-[10px] md:text-xs text-foreground/70 tabular-nums">
                {elevation}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MountainInterlude;
