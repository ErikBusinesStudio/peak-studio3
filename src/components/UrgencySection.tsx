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

type LandmarkProps = { hourDeg: number; minDeg: number; secDeg: number };

/* BIG BEN — gothic clock tower, sandstone, gold dial with Roman numerals */
const BigBen = ({ hourDeg, minDeg, secDeg }: LandmarkProps) => {
  const stone = "#b89968";
  const stoneDark = "#6b5634";
  const gold = "#d4a84a";
  return (
    <div className="flex flex-col items-center" style={{ width: 110 }}>
      {/* spire */}
      <div className="relative flex flex-col items-center" style={{ marginBottom: -1 }}>
        <span className="block w-[2px] h-3" style={{ background: `linear-gradient(to top, ${gold}, transparent)` }} />
        <span className="block w-[3px] h-[3px] rounded-full -mt-[1px]" style={{ background: gold, boxShadow: `0 0 4px ${gold}` }} />
      </div>
      {/* gothic spire */}
      <div className="w-[42px] h-[36px] -mb-px" style={{
        background: `linear-gradient(180deg, ${stoneDark}, ${stone})`,
        clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
      }} />
      {/* belfry ornament */}
      <div className="w-[58px] h-[10px] flex justify-around items-end" style={{
        background: `linear-gradient(180deg, ${stoneDark}, ${stone})`,
      }}>
        {[0,1,2,3].map(i => <span key={i} className="block w-[2px] h-[7px]" style={{ background: stoneDark }} />)}
      </div>
      {/* clock chamber w/ pointed arch frame */}
      <div className="relative w-[78px] flex justify-center pt-1 pb-2 px-2" style={{
        background: `linear-gradient(180deg, ${stone}, ${stoneDark})`,
        boxShadow: `inset 0 0 10px rgba(0,0,0,0.4)`,
      }}>
        <Dial size={62} hourDeg={hourDeg} minDeg={minDeg} secDeg={secDeg}
          faceBg={`radial-gradient(circle at 35% 30%, #fdf6e3, #e8d49a 80%)`}
          ringColor="#3a2a14" numeralColor="#1a0f06" numerals={ROMANS}
          handColor="#0a0500" secondColor="#a93226" centerColor="#1a0f06" serif
        />
      </div>
      {/* cornice */}
      <div className="w-[88px] h-[4px]" style={{ background: `linear-gradient(180deg, ${stone}, ${stoneDark})` }} />
      {/* shaft */}
      <div className="w-[60px] h-[34px] relative" style={{
        background: `linear-gradient(180deg, ${stone}, ${stoneDark}), repeating-linear-gradient(0deg, transparent 0 6px, rgba(0,0,0,0.15) 6px 7px)`,
        backgroundBlendMode: "overlay",
        boxShadow: `inset 0 0 8px rgba(0,0,0,0.4)`,
      }}>
        <span className="absolute left-1/2 -translate-x-1/2 top-2 w-[8px] h-[14px]" style={{
          background: "#1a1208", borderTopLeftRadius: 999, borderTopRightRadius: 999,
          boxShadow: `inset 0 0 3px ${gold}80`,
        }} />
      </div>
      {/* base */}
      <div className="w-[70px] h-[5px]" style={{ background: `linear-gradient(180deg, ${stoneDark}, #2a1f10)` }} />
    </div>
  );
};

/* MUSÉE D'ORSAY — giant railway-station arch clock with iron tracery */
const OrsayClock = ({ hourDeg, minDeg, secDeg }: LandmarkProps) => {
  const cream = "#e8dec4";
  const iron = "#1a1410";
  const brass = "#c08a3e";
  return (
    <div className="flex flex-col items-center" style={{ width: 110 }}>
      {/* keystone */}
      <div className="w-[14px] h-[6px]" style={{ background: cream, clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0 100%)" }} />
      {/* huge arched frame */}
      <div className="relative" style={{
        width: 96, height: 96,
        background: `radial-gradient(circle at 50% 50%, ${cream} 58%, transparent 60%), linear-gradient(180deg, ${iron}, #0a0806)`,
        borderTopLeftRadius: 96, borderTopRightRadius: 96,
        border: `1.5px solid ${cream}`,
        boxShadow: `0 6px 16px rgba(0,0,0,0.6), inset 0 0 12px rgba(0,0,0,0.5)`,
      }}>
        {/* iron tracery spokes */}
        {[0, 45, 90, 135].map(deg => (
          <span key={deg} className="absolute left-1/2 top-1/2 origin-center"
            style={{ width: 96, height: "1px", background: iron, opacity: 0.6, transform: `translate(-50%, -50%) rotate(${deg}deg)` }}
          />
        ))}
        {/* dial centered */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Dial size={66} hourDeg={hourDeg} minDeg={minDeg} secDeg={secDeg}
            faceBg={`radial-gradient(circle at 40% 30%, ${cream}, #b8a878 90%)`}
            ringColor={iron} numeralColor={iron} numerals={ROMANS}
            handColor={iron} secondColor={brass} centerColor={brass} serif
          />
        </div>
      </div>
      {/* ornate base block */}
      <div className="w-[100px] h-[10px] -mt-px" style={{
        background: `linear-gradient(180deg, ${cream}, #8a7a52)`,
        boxShadow: `0 2px 4px rgba(0,0,0,0.5)`,
      }}>
        <div className="w-full h-full flex justify-around items-center">
          {[0,1,2,3,4].map(i => <span key={i} className="block w-[1px] h-[5px]" style={{ background: iron }} />)}
        </div>
      </div>
      <div className="w-[80px] h-[5px]" style={{ background: `linear-gradient(180deg, #6a5a36, #1a1408)` }} />
    </div>
  );
};

/* WAKO GINZA — neoclassical tower with verdigris copper dome */
const WakoTower = ({ hourDeg, minDeg, secDeg }: LandmarkProps) => {
  const stone = "#d8d1c4";
  const stoneDark = "#7a7060";
  const copper = "#3e8a7a";   // verdigris
  const copperDark = "#1f4a40";
  const brass = "#c9a24c";
  return (
    <div className="flex flex-col items-center" style={{ width: 110 }}>
      {/* finial */}
      <div className="relative flex flex-col items-center" style={{ marginBottom: -1 }}>
        <span className="block w-[5px] h-[5px] rounded-full" style={{ background: brass, boxShadow: `0 0 4px ${brass}` }} />
        <span className="block w-[1px] h-[3px]" style={{ background: brass }} />
      </div>
      {/* verdigris dome */}
      <div className="w-[64px] h-[28px]" style={{
        background: `radial-gradient(ellipse at 50% 110%, ${copper}, ${copperDark} 75%)`,
        borderTopLeftRadius: "100% 100%",
        borderTopRightRadius: "100% 100%",
        boxShadow: `inset 0 -3px 6px rgba(0,0,0,0.4)`,
      }} />
      {/* drum w/ columns */}
      <div className="relative w-[80px] h-[10px] flex items-center justify-around px-2" style={{
        background: `linear-gradient(180deg, ${stone}, ${stoneDark})`,
      }}>
        {[0,1,2,3,4].map(i => <span key={i} className="block w-[2px] h-full" style={{ background: stoneDark }} />)}
      </div>
      {/* clock chamber — pediment style */}
      <div className="relative w-[88px] flex justify-center pt-2 pb-2 px-2" style={{
        background: `linear-gradient(180deg, ${stone}, #b8b0a0)`,
        borderLeft: `1px solid ${stoneDark}`,
        borderRight: `1px solid ${stoneDark}`,
      }}>
        <Dial size={64} hourDeg={hourDeg} minDeg={minDeg} secDeg={secDeg}
          faceBg={`radial-gradient(circle at 35% 30%, #faf6ec, #d8cfb8 85%)`}
          ringColor={copperDark} numeralColor={copperDark} numerals={ROMANS}
          handColor={copperDark} secondColor="#b91c1c" centerColor={brass} serif
        />
      </div>
      {/* entablature */}
      <div className="w-[94px] h-[4px]" style={{ background: `linear-gradient(180deg, ${stone}, ${stoneDark})` }} />
      {/* main facade w/ pilasters */}
      <div className="relative w-[80px] h-[28px]" style={{
        background: `linear-gradient(180deg, ${stone}, ${stoneDark})`,
      }}>
        {[12, 36, 60].map((x, i) => (
          <span key={i} className="absolute top-0 bottom-0 w-[3px]" style={{ left: x, background: `linear-gradient(180deg, ${stone}, ${stoneDark})`, boxShadow: `inset -1px 0 0 rgba(0,0,0,0.25)` }} />
        ))}
      </div>
      <div className="w-[90px] h-[5px]" style={{ background: `linear-gradient(180deg, ${stoneDark}, #2a2418)` }} />
    </div>
  );
};

/* GRAND CENTRAL — 4-sided opal clock crowned with sculpted figures */
const GrandCentralClock = ({ hourDeg, minDeg, secDeg }: LandmarkProps) => {
  const brass = "#c9a24c";
  const brassDark = "#7a5a20";
  const stone = "#cfc3a8";
  const opal = "#f4ead0";
  return (
    <div className="flex flex-col items-center" style={{ width: 110 }}>
      {/* eagle / silhouette crest */}
      <svg width="56" height="22" viewBox="0 0 56 22" style={{ marginBottom: -2 }}>
        <path d="M28 2 L20 12 L4 14 L18 16 L14 22 L28 18 L42 22 L38 16 L52 14 L36 12 Z"
          fill={brassDark} stroke={brass} strokeWidth="0.6" />
        <circle cx="28" cy="8" r="2" fill={brass} />
      </svg>
      {/* plinth */}
      <div className="w-[68px] h-[5px]" style={{ background: `linear-gradient(180deg, ${stone}, #8a7d5a)` }} />
      {/* opal 4-sided clock cube */}
      <div className="relative" style={{ width: 86, height: 78 }}>
        {/* side facets (perspective hint) */}
        <span className="absolute top-2 left-0 bottom-2 w-[8px]"
          style={{ background: `linear-gradient(90deg, ${brassDark}, ${brass})`, clipPath: "polygon(0 10%, 100% 0, 100% 100%, 0 90%)" }} />
        <span className="absolute top-2 right-0 bottom-2 w-[8px]"
          style={{ background: `linear-gradient(90deg, ${brass}, ${brassDark})`, clipPath: "polygon(0 0, 100% 10%, 100% 90%, 0 100%)" }} />
        {/* main face frame */}
        <div className="absolute inset-x-[8px] inset-y-0 rounded-[6px]" style={{
          background: `linear-gradient(145deg, ${brass}, ${brassDark} 70%)`,
          padding: 4,
          boxShadow: `0 8px 18px rgba(0,0,0,0.5), inset 0 1px 0 #f0d78c`,
        }}>
          <div className="w-full h-full rounded-[4px] flex items-center justify-center" style={{
            background: `radial-gradient(circle at 35% 30%, ${opal}, #c4b890 90%)`,
            boxShadow: `inset 0 0 10px rgba(0,0,0,0.3)`,
          }}>
            <Dial size={60} hourDeg={hourDeg} minDeg={minDeg} secDeg={secDeg}
              faceBg="transparent"
              ringColor="transparent" numeralColor={brassDark} numerals={ROMANS}
              handColor={brassDark} secondColor="#b91c1c" centerColor={brass} serif
            />
          </div>
        </div>
      </div>
      {/* stepped base */}
      <div className="w-[90px] h-[4px]" style={{ background: `linear-gradient(180deg, ${stone}, ${brassDark})` }} />
      <div className="w-[100px] h-[5px]" style={{ background: `linear-gradient(180deg, ${brassDark}, #1a1208)` }} />
    </div>
  );
};

/* ---------------- Landmark switch ---------------- */

const Landmark = ({ kind, hourDeg, minDeg, secDeg }: { kind: LandmarkKey } & LandmarkProps) => {
  switch (kind) {
    case "bigben":       return <BigBen        hourDeg={hourDeg} minDeg={minDeg} secDeg={secDeg} />;
    case "orsay":        return <OrsayClock    hourDeg={hourDeg} minDeg={minDeg} secDeg={secDeg} />;
    case "wako":         return <WakoTower     hourDeg={hourDeg} minDeg={minDeg} secDeg={secDeg} />;
    case "grandcentral": return <GrandCentralClock hourDeg={hourDeg} minDeg={minDeg} secDeg={secDeg} />;
  }
};

/* ---------------- Card ---------------- */

const LandmarkCard = ({
  name, country, code, tz, landmark, subtitle, now,
}: { name: string; country: string; code: string; tz: string; landmark: LandmarkKey; subtitle: string; now: Date }) => {
  const { h, m, s, h24 } = getParts(tz, now);
  const hourDeg = h * 30 + m * 0.5;
  const minDeg = m * 6 + s * 0.1;
  const secDeg = s * 6;
  const timeLabel = `${String(h24).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  const isNight = h24 < 6 || h24 >= 20;

  return (
    <div className="relative flex flex-col items-center group">
      {/* glow halo */}
      <div className="absolute -inset-x-4 top-6 bottom-12 rounded-full opacity-50 group-hover:opacity-80 transition-opacity"
        style={{ background: isNight ? "radial-gradient(ellipse, #4a3a78 0%, transparent 70%)" : "radial-gradient(ellipse, #c9a24c30 0%, transparent 70%)", filter: "blur(20px)" }}
      />
      <div className="relative">
        <Landmark kind={landmark} hourDeg={hourDeg} minDeg={minDeg} secDeg={secDeg} />
      </div>

      {/* brass plaque — city + landmark name */}
      <div className="mt-3 px-3 py-1.5 rounded-[2px] text-center relative"
        style={{
          background: "linear-gradient(180deg, #d4a84a, #8a6d2c)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.6), inset 0 1px 0 #f0d78c",
          minWidth: 110,
        }}
      >
        <span className="block text-[9px] md:text-[10px] font-bold uppercase tracking-[0.28em] leading-none"
          style={{ color: "#1a1208", fontFamily: "'Cormorant Garamond', serif" }}>
          {name}
        </span>
        <span className="block text-[6px] md:text-[7px] uppercase tracking-[0.22em] leading-none mt-1 opacity-80"
          style={{ color: "#1a1208" }}>
          {subtitle}
        </span>
      </div>

      {/* digital readout */}
      <div className="mt-2 flex flex-col items-center leading-tight">
        <span className="font-mono text-[11px] md:text-[13px] font-semibold tabular-nums tracking-[0.18em]"
          style={{ color: "#e8c878", textShadow: "0 0 6px #c9a24c50" }}>
          {timeLabel}
        </span>
        <span className="text-[6.5px] md:text-[7px] font-mono uppercase tracking-[0.35em] mt-0.5"
          style={{ color: "#c9a24c90" }}>
          {code} · {country}
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
      className="relative grid grid-cols-2 md:grid-cols-4 items-end gap-x-4 md:gap-x-10 gap-y-10 px-5 md:px-12 pt-14 pb-8 rounded-[3px] max-w-[680px] md:max-w-none"
      style={{
        background:
          "linear-gradient(180deg, #0a0805 0%, #14110c 50%, #0a0805 100%)",
        border: "1px solid #c9a24c30",
        boxShadow:
          "inset 0 1px 0 #c9a24c20, inset 0 -1px 0 #c9a24c20, 0 20px 60px -20px rgba(0,0,0,0.8), 0 0 40px -10px #c9a24c15",
      }}
    >
      {/* corner flourishes */}
      <span className="absolute top-2 left-2 w-3 h-3 border-l border-t" style={{ borderColor: "#c9a24c80" }} />
      <span className="absolute top-2 right-2 w-3 h-3 border-r border-t" style={{ borderColor: "#c9a24c80" }} />
      <span className="absolute bottom-2 left-2 w-3 h-3 border-l border-b" style={{ borderColor: "#c9a24c80" }} />
      <span className="absolute bottom-2 right-2 w-3 h-3 border-r border-b" style={{ borderColor: "#c9a24c80" }} />

      {/* engraved title */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 col-span-full">
        <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, transparent, #c9a24c)" }} />
        <span className="text-[8px] md:text-[10px] uppercase tracking-[0.45em] font-semibold whitespace-nowrap"
          style={{ color: "#c9a24c", fontFamily: "'Cormorant Garamond', serif" }}>
          Orologi Iconici del Mondo
        </span>
        <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, #c9a24c, transparent)" }} />
      </div>

      {CITIES.map((c) => (
        <LandmarkCard key={c.name} {...c} now={now} />
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
