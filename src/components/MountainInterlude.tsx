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
    <section ref={ref} className="relative py-10 md:py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div
          className={`relative overflow-hidden rounded-2xl border border-primary/25 shadow-[0_20px_60px_-25px_hsl(212_90%_45%/0.55)] transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div
            className="h-[220px] md:h-[340px] w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
          {/* blue wash */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(120deg, hsl(212 90% 25% / 0.55), transparent 55%), linear-gradient(0deg, hsl(210 40% 99% / 0.15), transparent 50%)",
            }}
          />
          {/* animated glacier line */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-gradient" />
          {/* label */}
          <div
            className={`absolute inset-0 flex items-end ${
              align === "right" ? "justify-end" : "justify-start"
            } p-5 md:p-10`}
          >
            <div className="glass rounded-xl px-5 py-4 md:px-7 md:py-5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-[10px] md:text-xs font-mono uppercase tracking-[0.35em] text-primary mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {location}
              </div>
              <h3 className="font-display text-2xl md:text-4xl uppercase tracking-tight text-foreground">
                {name}
              </h3>
              <div className="mt-1 font-mono text-xs md:text-sm text-foreground/70 tabular-nums">
                {elevation}
              </div>
            </div>
          </div>
          {/* floating blue orb */}
          <div
            className="pointer-events-none absolute -top-8 -right-8 w-40 h-40 rounded-full blur-3xl opacity-70 animate-float-slow"
            style={{ background: "radial-gradient(circle, #6cbcff, transparent 70%)" }}
          />
        </div>
      </div>
    </section>
  );
};

export default MountainInterlude;
