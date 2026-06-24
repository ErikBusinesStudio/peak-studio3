import { SearchX, AlertTriangle, TrendingDown, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useI18n } from "@/contexts/I18nContext";

const CITIES = [
  { name: "Roma", tz: "Europe/Rome", code: "RM" },
  { name: "New York", tz: "America/New_York", code: "NY" },
  { name: "Tokyo", tz: "Asia/Tokyo", code: "TYO" },
  { name: "Sydney", tz: "Australia/Sydney", code: "SYD" },
];

function getParts(tz: string, now: Date) {
  const parts = new Intl.DateTimeFormat("it-IT", {
    timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, weekday: "short",
  }).formatToParts(now);
  const get = (t: string) => parseInt(parts.find((p) => p.type === t)?.value ?? "0", 10);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  return { h: get("hour") % 12, m: get("minute"), s: get("second"), h24: get("hour"), weekday };
}

const MiniClock = ({ city, code, tz, now }: { city: string; code: string; tz: string; now: Date }) => {
  const { h, m, s, h24, weekday } = getParts(tz, now);
  const hourDeg = h * 30 + m * 0.5;
  const minDeg = m * 6 + s * 0.1;
  const secDeg = s * 6;
  const timeLabel = `${String(h24).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  const ampm = h24 < 12 ? "AM" : "PM";
  const isNight = h24 < 6 || h24 >= 20;
  const isDawn = h24 >= 6 && h24 < 9;
  const isDusk = h24 >= 17 && h24 < 20;

  // day progression (0-1) → conic ring sweep
  const dayProgress = ((h24 * 3600 + m * 60 + s) / 86400) * 360;

  const faceBg = isNight
    ? "radial-gradient(circle at 32% 28%, hsl(225 50% 16%), hsl(232 60% 5%) 75%)"
    : isDawn || isDusk
    ? "radial-gradient(circle at 32% 28%, hsl(20 60% 22%), hsl(348 50% 10%) 75%)"
    : "radial-gradient(circle at 32% 28%, hsl(210 30% 22%), hsl(220 35% 8%) 75%)";

  const accent = "hsl(348 90% 58%)";

  return (
    <div className="flex flex-col items-center gap-2 group">
      <div className="relative w-16 h-16 md:w-[72px] md:h-[72px]">
        {/* outer conic ring — day progression */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from -90deg, ${accent} 0deg, ${accent} ${dayProgress}deg, hsl(0 0% 100% / 0.06) ${dayProgress}deg 360deg)`,
            padding: "1.5px",
            filter: "drop-shadow(0 0 8px hsl(348 90% 50% / 0.35))",
          }}
        >
          <div className="w-full h-full rounded-full bg-background" />
        </div>

        {/* face */}
        <div
          className="absolute inset-[3px] rounded-full overflow-hidden"
          style={{
            background: faceBg,
            boxShadow:
              "inset 0 1px 0 hsl(0 0% 100% / 0.08), inset 0 -8px 18px hsl(0 0% 0% / 0.5), inset 0 0 0 1px hsl(0 0% 100% / 0.04)",
          }}
        >
          {/* starfield for night */}
          {isNight && (
            <>
              <span className="absolute w-px h-px bg-white/70 rounded-full" style={{ top: "22%", left: "30%" }} />
              <span className="absolute w-px h-px bg-white/50 rounded-full" style={{ top: "35%", left: "70%" }} />
              <span className="absolute w-px h-px bg-white/60 rounded-full" style={{ top: "65%", left: "25%" }} />
              <span className="absolute w-px h-px bg-white/40 rounded-full" style={{ top: "72%", left: "60%" }} />
            </>
          )}

          {/* 12 ticks */}
          {Array.from({ length: 12 }).map((_, n) => {
            const major = n % 3 === 0;
            return (
              <span
                key={n}
                className="absolute left-1/2 top-1/2 rounded-full"
                style={{
                  width: major ? 2 : 1,
                  height: major ? 5 : 3,
                  background: major ? "hsl(0 0% 100% / 0.85)" : "hsl(0 0% 100% / 0.3)",
                  transform: `translate(-50%, -50%) rotate(${n * 30}deg) translateY(-26px)`,
                }}
              />
            );
          })}

          {/* sun/moon indicator at top */}
          <span
            className="absolute left-1/2 top-[14%] -translate-x-1/2 text-[7px] font-mono tracking-widest"
            style={{ color: isNight ? "hsl(220 30% 70%)" : "hsl(40 90% 70%)" }}
          >
            {isNight ? "◐" : "☼"}
          </span>

          {/* hour hand */}
          <span
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: 2.5,
              height: 16,
              background: "linear-gradient(to top, transparent, hsl(0 0% 100% / 0.95))",
              transform: `translate(-50%, -100%) rotate(${hourDeg}deg)`,
              transformOrigin: "50% 100%",
              boxShadow: "0 0 4px hsl(0 0% 100% / 0.3)",
            }}
          />
          {/* minute hand */}
          <span
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: 1.5,
              height: 22,
              background: "linear-gradient(to top, transparent, hsl(0 0% 100% / 0.9))",
              transform: `translate(-50%, -100%) rotate(${minDeg}deg)`,
              transformOrigin: "50% 100%",
            }}
          />
          {/* second hand */}
          <span
            className="absolute left-1/2 top-1/2"
            style={{
              width: 1,
              height: 26,
              background: accent,
              transform: `translate(-50%, -78%) rotate(${secDeg}deg)`,
              transformOrigin: "50% 78%",
              boxShadow: `0 0 6px ${accent}`,
              transition: "transform 0.15s cubic-bezier(.4, 2.3, .6, 1)",
            }}
          />
          {/* counterweight tail */}
          <span
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: 3,
              height: 3,
              background: accent,
              transform: `translate(-50%, -50%) rotate(${secDeg}deg) translateY(7px)`,
              transformOrigin: "50% 50%",
              transition: "transform 0.15s cubic-bezier(.4, 2.3, .6, 1)",
            }}
          />
          {/* center pivot */}
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
            style={{
              background: "hsl(0 0% 98%)",
              boxShadow: `0 0 0 1.5px ${accent}, 0 0 8px ${accent}`,
            }}
          />
        </div>
      </div>

      <div className="flex flex-col items-center leading-tight">
        <span className="text-[8px] md:text-[9px] font-mono uppercase tracking-[0.25em] text-foreground/55">
          {code} · {weekday}
        </span>
        <span className="font-mono text-[11px] md:text-[13px] font-bold text-foreground mt-0.5 tabular-nums tracking-wider">
          {timeLabel}
          <span className="text-[8px] md:text-[9px] text-foreground/40 ml-1 font-normal">{ampm}</span>
        </span>
      </div>
    </div>
  );
};

const WorldClocks = () => {
  const [now, setNow] = useState<Date>(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div
      className="relative inline-flex items-center gap-5 md:gap-8 px-5 md:px-8 py-4 md:py-5 rounded-2xl border border-destructive/30 backdrop-blur-xl overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, hsl(0 0% 8% / 0.7), hsl(348 30% 10% / 0.5))",
        boxShadow:
          "inset 0 1px 0 hsl(0 0% 100% / 0.06), 0 20px 40px -20px hsl(348 78% 30% / 0.4), 0 0 0 1px hsl(0 0% 100% / 0.02)",
      }}
    >
      {/* live dot */}
      <div className="absolute top-2 left-3 flex items-center gap-1.5">
        <span className="relative flex w-1.5 h-1.5">
          <span className="absolute inset-0 rounded-full bg-destructive animate-ping opacity-75" />
          <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-destructive" />
        </span>
        <span className="text-[7px] md:text-[8px] font-mono uppercase tracking-[0.3em] text-destructive/80">
          Live · UTC
        </span>
      </div>
      {CITIES.map((c, i) => (
        <div key={c.name} className="flex items-center gap-5 md:gap-8">
          {i > 0 && <div className="w-px h-12 md:h-14 bg-gradient-to-b from-transparent via-foreground/15 to-transparent" />}
          <MiniClock city={c.name} code={c.code} tz={c.tz} now={now} />
        </div>
      ))}
    </div>
  );
};

const UrgencySection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useI18n();

  const losses = [
    { icon: SearchX, stat: t("urgency.l1.stat"), title: t("urgency.l1.title"), desc: t("urgency.l1.desc") },
    { icon: AlertTriangle, stat: t("urgency.l2.stat"), title: t("urgency.l2.title"), desc: t("urgency.l2.desc") },
    { icon: Users, stat: t("urgency.l3.stat"), title: t("urgency.l3.title"), desc: t("urgency.l3.desc") },
    { icon: TrendingDown, stat: t("urgency.l4.stat"), title: t("urgency.l4.title"), desc: t("urgency.l4.desc") },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-destructive/5 via-transparent to-transparent" />
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-destructive/10 rounded-full blur-[250px]" />
      <div className="container mx-auto relative z-10" ref={ref}>
        <div className={`text-center mb-10 md:mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="red-line mx-auto mb-4 md:mb-6" />
          <h2 className="text-2xl md:text-5xl font-black mb-3">
            {t("urgency.title1")} <span className="text-gradient">{t("urgency.title2")}</span> {t("urgency.title3")}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base">{t("urgency.subtitle")}</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 max-w-5xl mx-auto">
          {losses.map((item, i) => (
            <div key={i} className={`relative rounded-xl p-4 md:p-6 border border-destructive/20 bg-card/50 transition-all duration-500 hover:border-destructive/40 hover:scale-[1.03] group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${i * 120}ms` }}>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-destructive/20 transition-colors">
                <item.icon className="w-5 h-5 md:w-6 md:h-6 text-destructive" />
              </div>
              <div className="text-xl md:text-3xl font-black text-destructive mb-1 md:mb-2">{item.stat}</div>
              <h3 className="font-bold text-xs md:text-sm mb-1 md:mb-2 leading-snug">{item.title}</h3>
              <p className="text-muted-foreground text-[10px] md:text-xs leading-relaxed hidden md:block">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className={`text-center mt-8 md:mt-12 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="mb-4 md:mb-5 flex justify-center"><WorldClocks /></div>
          <a href="#prezzi" className="inline-block bg-primary text-primary-foreground px-8 py-3 md:px-10 md:py-4 rounded-md text-sm font-bold uppercase tracking-wider hover:opacity-90 hover:scale-105 transition-all glow">{t("urgency.cta")}</a>
        </div>
      </div>
    </section>
  );
};

export default UrgencySection;
