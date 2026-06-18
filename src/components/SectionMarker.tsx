import { Trees, Droplets, Footprints, GitBranch, Tent, Home, Mountain, Snowflake } from "lucide-react";
import sceneForest from "@/assets/scene-forest.jpg";
import sceneWaterfall from "@/assets/scene-waterfall.jpg";
import sceneSignpost from "@/assets/scene-signpost.jpg";
import sceneBridge from "@/assets/scene-bridge.jpg";
import sceneBasecamp from "@/assets/scene-basecamp.jpg";
import sceneCabin from "@/assets/scene-cabin.jpg";
import scenePeak from "@/assets/scene-peak.jpg";

interface SectionMarkerProps {
  numeral: string;
  title: string;
  shape?: "peak" | "forest" | "waterfall" | "lake" | "trail" | "bridge" | "camp" | "cabin";
  altitude?: string;
  weather?: string;
}

const stageMeta: Record<NonNullable<SectionMarkerProps["shape"]>, { icon: any; tint: string; bgGradient: string; images: string[] }> = {
  peak:      { icon: Mountain,   tint: "hsl(210 90% 75%)", bgGradient: "from-[hsl(220_40%_8%)] via-[hsl(220_30%_10%)] to-transparent", images: [scenePeak, sceneBridge, sceneCabin] },
  forest:    { icon: Trees,      tint: "hsl(150 55% 55%)", bgGradient: "from-[hsl(150_30%_8%)] via-[hsl(150_20%_9%)] to-transparent", images: [sceneForest, sceneSignpost, sceneWaterfall] },
  waterfall: { icon: Droplets,   tint: "hsl(195 80% 65%)", bgGradient: "from-[hsl(195_40%_8%)] via-[hsl(200_25%_9%)] to-transparent", images: [sceneWaterfall, sceneForest, scenePeak] },
  trail:     { icon: Footprints, tint: "hsl(35 70% 60%)",  bgGradient: "from-[hsl(35_30%_8%)] via-[hsl(30_20%_9%)] to-transparent", images: [sceneSignpost, sceneForest, sceneBridge] },
  bridge:    { icon: GitBranch,  tint: "hsl(20 75% 60%)",  bgGradient: "from-[hsl(20_30%_8%)] via-[hsl(20_20%_9%)] to-transparent", images: [sceneBridge, scenePeak, sceneBasecamp] },
  camp:      { icon: Tent,       tint: "hsl(15 85% 60%)",  bgGradient: "from-[hsl(15_35%_8%)] via-[hsl(15_25%_9%)] to-transparent", images: [sceneBasecamp, sceneCabin, scenePeak] },
  cabin:     { icon: Home,       tint: "hsl(40 80% 60%)",  bgGradient: "from-[hsl(40_30%_8%)] via-[hsl(40_20%_9%)] to-transparent", images: [sceneCabin, sceneBasecamp, scenePeak] },
  lake:      { icon: Snowflake,  tint: "hsl(200 70% 70%)", bgGradient: "from-[hsl(200_30%_8%)] via-[hsl(200_20%_9%)] to-transparent", images: [sceneWaterfall, scenePeak, sceneForest] },
};

const ImageMarquee = ({ images, tint }: { images: string[]; tint: string }) => {
  // duplicate set for seamless loop
  const loop = [...images, ...images, ...images];
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-foreground/5 group">
      <div
        className="flex gap-4 animate-marquee-x py-2"
        style={{ width: "max-content" }}
      >
        {loop.map((src, i) => (
          <div
            key={i}
            className="relative h-40 md:h-56 w-[18rem] md:w-[26rem] shrink-0 overflow-hidden rounded-lg"
            style={{ boxShadow: `0 10px 40px -15px ${tint}80` }}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[6000ms] ease-out group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, transparent 40%, hsl(220 15% 4% / 0.55) 100%), linear-gradient(135deg, ${tint}22, transparent 60%)`,
              }}
            />
          </div>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
};

const SectionMarker = ({ numeral, title, shape = "peak", altitude, weather }: SectionMarkerProps) => {
  const meta = stageMeta[shape];
  const Icon = meta.icon;
  return (
    <div className="relative z-10 w-full">
      {/* Ambient gradient band */}
      <div className={`absolute inset-x-0 top-0 h-full bg-gradient-to-b ${meta.bgGradient} pointer-events-none`} />

      <div className="relative container mx-auto px-4 pt-16 md:pt-28 pb-4 md:pb-8">
        {/* Stage badge — large, marked */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-6">
          <div className="flex items-center gap-4">
            <div
              className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center border shrink-0"
              style={{
                background: `linear-gradient(135deg, ${meta.tint}22, transparent)`,
                borderColor: `${meta.tint}55`,
                boxShadow: `0 0 40px -10px ${meta.tint}66, inset 0 1px 0 ${meta.tint}33`,
              }}
            >
              <Icon className="w-7 h-7 md:w-9 md:h-9" style={{ color: meta.tint }} />
              <span
                className="absolute -top-2 -right-2 text-[10px] md:text-xs font-mono font-bold px-2 py-0.5 rounded-md"
                style={{ background: "hsl(var(--accent-red))", color: "white" }}
              >
                {numeral}
              </span>
            </div>
            <div>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-foreground/50 mb-1">
                Chapter {numeral} · You are here
              </p>
              <h3 className="text-xl md:text-3xl font-black tracking-tight" style={{ color: meta.tint }}>
                {title}
              </h3>
            </div>
          </div>

          {/* Altitude + weather chips */}
          <div className="flex items-center gap-2 md:gap-3 font-mono text-[10px] md:text-xs">
            {altitude && (
              <span className="px-3 py-1.5 rounded-full border border-foreground/15 bg-foreground/5 text-foreground/70">
                ↑ {altitude}
              </span>
            )}
            {weather && (
              <span
                className="px-3 py-1.5 rounded-full border"
                style={{ borderColor: `${meta.tint}40`, color: meta.tint, background: `${meta.tint}10` }}
              >
                {weather}
              </span>
            )}
          </div>
        </div>

        {/* Marker line with dot */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2 h-2 rounded-full" style={{ background: meta.tint, boxShadow: `0 0 12px ${meta.tint}` }} />
          <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${meta.tint}88, transparent)` }} />
          <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.4em] text-foreground/40">
            stage {numeral}/VII
          </span>
        </div>

        {/* Scrolling scene images */}
        <ImageMarquee images={meta.images} tint={meta.tint} />
      </div>
    </div>
  );
};

export default SectionMarker;