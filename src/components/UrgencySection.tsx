import { SearchX, AlertTriangle, TrendingDown, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useI18n } from "@/contexts/I18nContext";

const CITIES = [
  { name: "Roma", tz: "Europe/Rome" },
  { name: "New York", tz: "America/New_York" },
  { name: "Tokyo", tz: "Asia/Tokyo" },
  { name: "Sydney", tz: "Australia/Sydney" },
];

function getParts(tz: string, now: Date) {
  const parts = new Intl.DateTimeFormat("it-IT", {
    timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  }).formatToParts(now);
  const get = (t: string) => parseInt(parts.find((p) => p.type === t)?.value ?? "0", 10);
  return { h: get("hour") % 12, m: get("minute"), s: get("second"), h24: get("hour") };
}

const MiniClock = ({ city, tz, now }: { city: string; tz: string; now: Date }) => {
  const { h, m, s, h24 } = getParts(tz, now);
  const hourDeg = h * 30 + m * 0.5;
  const minDeg = m * 6;
  const secDeg = s * 6;
  const timeLabel = `${String(h24).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  const isNight = h24 < 6 || h24 >= 20;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="relative w-12 h-12 md:w-14 md:h-14 rounded-full border"
        style={{
          borderColor: "hsl(348 78% 42% / 0.5)",
          background: isNight
            ? "radial-gradient(circle at 30% 30%, hsl(220 40% 14%), hsl(230 50% 6%))"
            : "radial-gradient(circle at 30% 30%, hsl(0 0% 100% / 0.08), hsl(0 0% 100% / 0.02))",
          boxShadow: "inset 0 0 12px hsl(0 0% 0% / 0.4), 0 0 18px -8px hsl(348 78% 36% / 0.5)",
        }}
      >
        {/* ticks */}
        {[0, 3, 6, 9].map((n) => (
          <span
            key={n}
            className="absolute left-1/2 top-1/2 w-px h-1.5 md:h-2 bg-foreground/40"
            style={{ transform: `translate(-50%, -50%) rotate(${n * 30}deg) translateY(-44%)` }}
          />
        ))}
        {/* hour hand */}
        <span
          className="absolute left-1/2 top-1/2 w-[2px] h-3 md:h-3.5 bg-foreground rounded-full origin-bottom"
          style={{ transform: `translate(-50%, -100%) rotate(${hourDeg}deg)`, transformOrigin: "50% 100%" }}
        />
        {/* minute hand */}
        <span
          className="absolute left-1/2 top-1/2 w-px h-4 md:h-5 bg-foreground/90 rounded-full"
          style={{ transform: `translate(-50%, -100%) rotate(${minDeg}deg)`, transformOrigin: "50% 100%" }}
        />
        {/* second hand */}
        <span
          className="absolute left-1/2 top-1/2 w-px h-5 md:h-6"
          style={{
            background: "hsl(348 78% 55%)",
            transform: `translate(-50%, -100%) rotate(${secDeg}deg)`,
            transformOrigin: "50% 100%",
          }}
        />
        {/* center */}
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background: "hsl(348 78% 55%)" }} />
      </div>
      <div className="flex flex-col items-center leading-none">
        <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/70">{city}</span>
        <span className="font-mono text-[10px] md:text-xs text-foreground mt-0.5 tabular-nums">{timeLabel}</span>
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
    <div className="inline-flex items-center gap-4 md:gap-7 px-4 md:px-6 py-3 md:py-3.5 rounded-2xl border border-destructive/25 bg-card/60 backdrop-blur">
      {CITIES.map((c) => (
        <MiniClock key={c.name} city={c.name} tz={c.tz} now={now} />
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
