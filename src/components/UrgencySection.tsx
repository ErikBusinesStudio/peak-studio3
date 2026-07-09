import { SearchX, AlertTriangle, TrendingDown, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useI18n } from "@/contexts/I18nContext";

const CITIES: { name: string; tz: string; code: string }[] = [
  { name: "Roma",     tz: "Europe/Rome",       code: "ROM" },
  { name: "London",   tz: "Europe/London",     code: "LDN" },
  { name: "New York", tz: "America/New_York",  code: "NYC" },
  { name: "Tokyo",    tz: "Asia/Tokyo",        code: "TYO" },
];

function getParts(tz: string, now: Date) {
  const parts = new Intl.DateTimeFormat("it-IT", {
    timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, weekday: "short",
  }).formatToParts(now);
  const get = (t: string) => parseInt(parts.find((p) => p.type === t)?.value ?? "0", 10);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  return { h: get("hour") % 12, m: get("minute"), s: get("second"), h24: get("hour"), weekday };
}

const ROMANS = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];
const ARABIC = ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

/* ---------------- Reusable dial ---------------- */

type DialProps = {
  size: number;
  hourDeg: number;
  minDeg: number;
  secDeg: number;
  faceBg: string;
  ringColor: string;
  numeralColor: string;
  numerals: string[];
  handColor: string;
  secondColor: string;
  centerColor: string;
  serif?: boolean;
};

const Dial = ({ size, hourDeg, minDeg, secDeg, faceBg, ringColor, numeralColor, numerals, handColor, secondColor, centerColor, serif }: DialProps) => {
  const r = size / 2;
  const numR = r - size * 0.13;
  const hourLen = r * 0.55;
  const minLen = r * 0.78;
  const secLen = r * 0.85;
  return (
    <div
      className="relative rounded-full"
      style={{
        width: size, height: size,
        background: faceBg,
        boxShadow: `inset 0 1px 3px rgba(0,0,0,0.6), inset 0 -2px 6px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.5)`,
        border: `1px solid ${ringColor}`,
      }}
    >
      {/* minute ticks */}
      {Array.from({ length: 60 }).map((_, i) => (
        <span key={i}
          className="absolute left-1/2 top-1/2"
          style={{
            width: i % 5 === 0 ? "1.2px" : "0.5px",
            height: i % 5 === 0 ? size * 0.07 : size * 0.035,
            background: numeralColor,
            opacity: i % 5 === 0 ? 0.9 : 0.4,
            transform: `translate(-50%, -${r - 1}px) rotate(${i * 6}deg)`,
            transformOrigin: `50% ${r - 1}px`,
          }}
        />
      ))}
      {/* numerals */}
      {numerals.map((n, i) => (
        <span
          key={i}
          className="absolute left-1/2 top-1/2 leading-none"
          style={{
            color: numeralColor,
            fontFamily: serif ? "'Cormorant Garamond', serif" : "ui-sans-serif, system-ui",
            fontWeight: serif ? 600 : 700,
            fontSize: size * 0.13,
            transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-${numR}px) rotate(${-i * 30}deg)`,
            textShadow: `0 0 3px rgba(0,0,0,0.6)`,
          }}
        >
          {n}
        </span>
      ))}
      {/* hour hand */}
      <span className="absolute left-1/2 top-1/2"
        style={{
          width: "2px", height: hourLen,
          background: handColor,
          borderRadius: "1px",
          transform: `translate(-50%, -100%) rotate(${hourDeg}deg)`,
          transformOrigin: "50% 100%",
          boxShadow: `0 0 2px rgba(0,0,0,0.7)`,
        }}
      />
      {/* minute hand */}
      <span className="absolute left-1/2 top-1/2"
        style={{
          width: "1.5px", height: minLen,
          background: handColor,
          borderRadius: "1px",
          transform: `translate(-50%, -100%) rotate(${minDeg}deg)`,
          transformOrigin: "50% 100%",
          boxShadow: `0 0 2px rgba(0,0,0,0.7)`,
        }}
      />
      {/* second hand */}
      <span className="absolute left-1/2 top-1/2"
        style={{
          width: "0.7px", height: secLen,
          background: secondColor,
          transform: `translate(-50%, -82%) rotate(${secDeg}deg)`,
          transformOrigin: "50% 82%",
          boxShadow: `0 0 4px ${secondColor}`,
          transition: "transform 0.18s cubic-bezier(.4, 2.3, .6, 1)",
        }}
      />
      {/* center pivot */}
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: size * 0.08, height: size * 0.08,
          background: centerColor,
          boxShadow: `0 0 0 1px rgba(0,0,0,0.6)`,
        }}
      />
    </div>
  );
};

/* ---------------- Landmark architectures ---------------- */

/* ---------------- City clock card ---------------- */

const CityClock = ({ name, code, tz, now }: { name: string; code: string; tz: string; now: Date }) => {
  const { h, m, s, h24 } = getParts(tz, now);
  const hourDeg = h * 30 + m * 0.5;
  const minDeg = m * 6 + s * 0.1;
  const secDeg = s * 6;
  const timeLabel = `${String(h24).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  const isNight = h24 < 6 || h24 >= 20;

  return (
    <div className="flex flex-col items-center gap-1.5 md:gap-2 group">
      <div className="relative">
        {/* ambient halo */}
        <div
          className="absolute inset-0 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity"
          style={{
            background: isNight
              ? "radial-gradient(circle, hsl(var(--primary) / 0.35), transparent 70%)"
              : "radial-gradient(circle, hsl(var(--primary) / 0.25), transparent 70%)",
          }}
        />
        <Dial
          size={56}
          hourDeg={hourDeg}
          minDeg={minDeg}
          secDeg={secDeg}
          faceBg="radial-gradient(circle at 35% 30%, hsl(var(--card)), hsl(var(--background)) 85%)"
          ringColor="hsl(var(--primary) / 0.35)"
          numeralColor="hsl(var(--muted-foreground))"
          numerals={ARABIC}
          handColor="hsl(var(--foreground))"
          secondColor="hsl(var(--primary))"
          centerColor="hsl(var(--primary))"
        />
      </div>
      <div className="flex flex-col items-center leading-none">
        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/90">
          {name}
        </span>
        <span className="font-mono text-[10px] md:text-[11px] font-semibold tabular-nums text-primary mt-0.5">
          {timeLabel}
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
    <div className="relative inline-flex items-center gap-3 md:gap-6 px-4 md:px-8 py-3 md:py-4 rounded-2xl border border-primary/20 bg-card/40 backdrop-blur-sm shadow-[0_10px_40px_-15px_hsl(var(--primary)/0.4)]">
      <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-background border border-primary/30 text-[8px] md:text-[9px] font-mono uppercase tracking-[0.35em] text-primary flex items-center gap-1.5 whitespace-nowrap">
        <span className="w-1 h-1 rounded-full bg-primary animate-pulse" /> Live
      </span>
      {CITIES.map((c, i) => (
        <div key={c.name} className="flex items-center gap-3 md:gap-6">
          <CityClock {...c} now={now} />
          {i < CITIES.length - 1 && (
            <span className="hidden sm:block h-10 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
          )}
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
      <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[250px]" />
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
            <div key={i} className={`relative rounded-xl p-4 md:p-6 border border-primary/20 bg-card/60 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:scale-[1.03] group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${i * 120}ms` }}>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div className="text-xl md:text-3xl font-black text-primary mb-1 md:mb-2">{item.stat}</div>
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
