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

const ROMANS = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];

const CampanileClock = ({ city, code, tz, now }: { city: string; code: string; tz: string; now: Date }) => {
  const { h, m, s, h24 } = getParts(tz, now);
  const hourDeg = h * 30 + m * 0.5;
  const minDeg = m * 6 + s * 0.1;
  const secDeg = s * 6;
  const timeLabel = `${String(h24).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  const ampm = h24 < 12 ? "AM" : "PM";
  const isNight = h24 < 6 || h24 >= 20;

  const gold = "#c9a24c";
  const goldSoft = "#e8c878";

  const dialBg = isNight
    ? "radial-gradient(circle at 35% 30%, #1a1a24, #060608 78%)"
    : "radial-gradient(circle at 35% 30%, #1a160e, #0a0805 78%)";

  return (
    <div className="flex flex-col items-center group" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
      {/* SPIRE — fine cross + ball finial */}
      <div className="relative flex flex-col items-center" style={{ marginBottom: "-1px" }}>
        <span className="block w-px h-3" style={{ background: `linear-gradient(to top, ${gold}, transparent)` }} />
        <span className="block w-[5px] h-[5px] rounded-full -mt-[2px]" style={{ background: gold, boxShadow: `0 0 6px ${gold}` }} />
        <span className="block w-px h-2 -mt-[1px]" style={{ background: gold }} />
        {/* cross */}
        <span className="block w-2 h-px" style={{ background: gold, marginTop: "-1px" }} />
      </div>

      {/* CUPOLA / ROOF */}
      <div className="relative w-[78px] md:w-[92px] flex justify-center">
        <div
          className="w-full"
          style={{
            height: "22px",
            background: `linear-gradient(180deg, #2a2118 0%, #15110b 100%)`,
            clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
            borderBottom: `1px solid ${gold}`,
          }}
        />
        {/* gold ring under cupola */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[3px]"
          style={{ background: `linear-gradient(90deg, transparent, ${gold} 20%, ${goldSoft} 50%, ${gold} 80%, transparent)` }}
        />
      </div>

      {/* BELFRY — clock chamber */}
      <div
        className="relative w-[78px] md:w-[92px] px-2 py-2"
        style={{
          background: "linear-gradient(180deg, #14110c 0%, #1d1812 50%, #14110c 100%)",
          borderLeft: `1px solid ${gold}40`,
          borderRight: `1px solid ${gold}40`,
          boxShadow: `inset 0 0 18px rgba(0,0,0,0.6), inset 0 1px 0 ${gold}25`,
        }}
      >
        {/* corner pinnacles */}
        <span className="absolute -top-1 left-0 w-px h-2" style={{ background: gold }} />
        <span className="absolute -top-1 right-0 w-px h-2" style={{ background: gold }} />
        <span className="absolute -top-[6px] left-[-1px] w-[3px] h-[3px] rounded-full" style={{ background: gold, boxShadow: `0 0 4px ${gold}` }} />
        <span className="absolute -top-[6px] right-[-1px] w-[3px] h-[3px] rounded-full" style={{ background: gold, boxShadow: `0 0 4px ${gold}` }} />

        {/* DIAL — luxury watch face */}
        <div
          className="relative mx-auto rounded-full"
          style={{
            width: "62px",
            height: "62px",
            background: `linear-gradient(145deg, ${goldSoft}, ${gold} 40%, #8a6d2c 100%)`,
            padding: "2px",
            boxShadow: `0 0 0 1px #2a2118, 0 4px 12px rgba(0,0,0,0.6), 0 0 14px ${gold}30`,
          }}
        >
          <div
            className="relative w-full h-full rounded-full overflow-hidden"
            style={{
              background: dialBg,
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.7), inset 0 -2px 6px rgba(0,0,0,0.5)",
            }}
          >
            {/* roman numerals */}
            {ROMANS.map((r, n) => (
              <span
                key={n}
                className="absolute left-1/2 top-1/2 text-[6.5px] md:text-[7px] font-semibold leading-none"
                style={{
                  color: goldSoft,
                  transform: `translate(-50%, -50%) rotate(${n * 30}deg) translateY(-22px) rotate(${-n * 30}deg)`,
                  textShadow: `0 0 3px ${gold}80`,
                }}
              >
                {r}
              </span>
            ))}

            {/* inner chapter ring */}
            <div
              className="absolute inset-[8px] rounded-full"
              style={{ border: `0.5px solid ${gold}30` }}
            />

            {/* hour hand — breguet style */}
            <span
              className="absolute left-1/2 top-1/2"
              style={{
                width: "1.5px",
                height: "15px",
                background: `linear-gradient(to top, transparent, ${goldSoft})`,
                transform: `translate(-50%, -100%) rotate(${hourDeg}deg)`,
                transformOrigin: "50% 100%",
                filter: `drop-shadow(0 0 2px ${gold})`,
              }}
            />
            {/* minute hand */}
            <span
              className="absolute left-1/2 top-1/2"
              style={{
                width: "1px",
                height: "22px",
                background: `linear-gradient(to top, transparent, ${goldSoft})`,
                transform: `translate(-50%, -100%) rotate(${minDeg}deg)`,
                transformOrigin: "50% 100%",
                filter: `drop-shadow(0 0 2px ${gold})`,
              }}
            />
            {/* second hand */}
            <span
              className="absolute left-1/2 top-1/2"
              style={{
                width: "0.5px",
                height: "26px",
                background: "#b91c1c",
                transform: `translate(-50%, -78%) rotate(${secDeg}deg)`,
                transformOrigin: "50% 78%",
                boxShadow: "0 0 4px #b91c1c",
                transition: "transform 0.15s cubic-bezier(.4, 2.3, .6, 1)",
              }}
            />
            {/* center pivot */}
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: "4px",
                height: "4px",
                background: `radial-gradient(circle, ${goldSoft}, ${gold})`,
                boxShadow: `0 0 0 0.5px #2a2118, 0 0 4px ${gold}`,
              }}
            />
          </div>
        </div>
      </div>

      {/* CORNICE band under belfry */}
      <div
        className="w-[88px] md:w-[104px] h-[5px]"
        style={{
          background: `linear-gradient(180deg, ${gold} 0%, #6b5121 50%, ${gold} 100%)`,
          boxShadow: `0 1px 3px rgba(0,0,0,0.6)`,
        }}
      />

      {/* TOWER SHAFT — stone with arched window */}
      <div
        className="relative w-[68px] md:w-[80px] flex flex-col items-center pt-2 pb-2"
        style={{
          background:
            "linear-gradient(180deg, #1a1612 0%, #100d09 100%), repeating-linear-gradient(0deg, transparent 0 8px, rgba(255,255,255,0.02) 8px 9px)",
          backgroundBlendMode: "overlay",
          borderLeft: `1px solid ${gold}30`,
          borderRight: `1px solid ${gold}30`,
          boxShadow: `inset 0 0 14px rgba(0,0,0,0.7)`,
        }}
      >
        {/* arched window */}
        <div
          className="w-[10px] h-[16px]"
          style={{
            background: `linear-gradient(180deg, ${gold}50, transparent)`,
            borderTopLeftRadius: "999px",
            borderTopRightRadius: "999px",
            border: `0.5px solid ${gold}60`,
            boxShadow: `inset 0 0 4px ${gold}40`,
          }}
        />

        {/* CITY NAMEPLATE — engraved brass plaque */}
        <div
          className="mt-2 px-2 py-[3px] rounded-[2px]"
          style={{
            background: `linear-gradient(180deg, ${gold}, #8a6d2c)`,
            boxShadow: `0 1px 2px rgba(0,0,0,0.6), inset 0 1px 0 ${goldSoft}`,
          }}
        >
          <span
            className="block text-[7.5px] md:text-[8px] font-bold uppercase tracking-[0.22em] leading-none text-center"
            style={{ color: "#1a1208", fontFamily: "'Cormorant Garamond', serif" }}
          >
            {city}
          </span>
        </div>
      </div>

      {/* BASE / PLINTH */}
      <div
        className="w-[80px] md:w-[94px] h-[7px]"
        style={{
          background: "linear-gradient(180deg, #2a2118 0%, #0a0805 100%)",
          borderTop: `1px solid ${gold}80`,
          boxShadow: `0 2px 6px rgba(0,0,0,0.7)`,
        }}
      />

      {/* DIGITAL READOUT — under tower */}
      <div className="mt-2 flex flex-col items-center leading-tight">
        <span
          className="font-mono text-[10px] md:text-[12px] font-semibold tabular-nums tracking-[0.15em]"
          style={{ color: goldSoft, textShadow: `0 0 6px ${gold}40` }}
        >
          {timeLabel}
          <span className="text-[7px] md:text-[8px] opacity-60 ml-1 font-normal">{ampm}</span>
        </span>
        <span className="text-[6.5px] md:text-[7px] font-mono uppercase tracking-[0.3em] mt-0.5" style={{ color: `${gold}90` }}>
          {code}
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
      className="relative inline-flex items-end gap-8 md:gap-14 px-8 md:px-12 pt-14 pb-6 rounded-[2px]"
      style={{
        background:
          "linear-gradient(180deg, #0a0805 0%, #14110c 50%, #0a0805 100%)",
        border: "1px solid #c9a24c30",
        boxShadow:
          "inset 0 1px 0 #c9a24c20, inset 0 -1px 0 #c9a24c20, 0 20px 60px -20px rgba(0,0,0,0.8), 0 0 40px -10px #c9a24c15",
      }}
    >
      {/* ornate corner flourishes */}
      <span className="absolute top-2 left-2 w-3 h-3 border-l border-t" style={{ borderColor: "#c9a24c80" }} />
      <span className="absolute top-2 right-2 w-3 h-3 border-r border-t" style={{ borderColor: "#c9a24c80" }} />
      <span className="absolute bottom-2 left-2 w-3 h-3 border-l border-b" style={{ borderColor: "#c9a24c80" }} />
      <span className="absolute bottom-2 right-2 w-3 h-3 border-r border-b" style={{ borderColor: "#c9a24c80" }} />

      {/* engraved title */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <span className="w-4 h-px" style={{ background: "linear-gradient(90deg, transparent, #c9a24c)" }} />
        <span className="text-[7px] md:text-[8px] uppercase tracking-[0.45em] font-semibold" style={{ color: "#c9a24c", fontFamily: "'Cormorant Garamond', serif" }}>
          Tempi del Mondo
        </span>
        <span className="w-4 h-px" style={{ background: "linear-gradient(90deg, #c9a24c, transparent)" }} />
      </div>

      {CITIES.map((c) => (
        <CampanileClock key={c.name} city={c.name} code={c.code} tz={c.tz} now={now} />
      ))}

      {/* ground line */}
      <span className="absolute bottom-4 left-8 right-8 h-px" style={{ background: "linear-gradient(90deg, transparent, #c9a24c40 20%, #c9a24c40 80%, transparent)" }} />
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
