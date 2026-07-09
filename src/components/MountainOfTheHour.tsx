import { useEffect, useState } from "react";
import StarFour from "@/components/icons/StarFour";
import everest from "@/assets/mountains/everest.jpg";
import k2 from "@/assets/mountains/k2.jpg";
import cervino from "@/assets/mountains/cervino.jpg";
import monteBianco from "@/assets/mountains/monte-bianco.jpg";
import denali from "@/assets/mountains/denali.jpg";
import aconcagua from "@/assets/mountains/aconcagua.jpg";
import kilimanjaro from "@/assets/mountains/kilimanjaro.jpg";
import fuji from "@/assets/mountains/fuji.jpg";
import eiger from "@/assets/mountains/eiger.jpg";
import grandTeton from "@/assets/mountains/grand-teton.jpg";
import cook from "@/assets/mountains/cook.jpg";
import torresPaine from "@/assets/mountains/torres-paine.jpg";

type Mountain = {
  name: string;
  country: string;
  height: number; // meters
  tz: string;
  coords: string;
  image: string;
};

const MOUNTAINS: Mountain[] = [
  { name: "Everest", country: "Nepal · Tibet", height: 8848, tz: "Asia/Kathmandu", coords: "27°59'N · 86°55'E", image: everest },
  { name: "K2", country: "Pakistan · Cina", height: 8611, tz: "Asia/Karachi", coords: "35°52'N · 76°30'E", image: k2 },
  { name: "Cervino", country: "Italia · Svizzera", height: 4478, tz: "Europe/Rome", coords: "45°58'N · 7°39'E", image: cervino },
  { name: "Monte Bianco", country: "Italia · Francia", height: 4808, tz: "Europe/Rome", coords: "45°50'N · 6°51'E", image: monteBianco },
  { name: "Denali", country: "Alaska, USA", height: 6190, tz: "America/Anchorage", coords: "63°04'N · 151°00'W", image: denali },
  { name: "Aconcagua", country: "Argentina", height: 6961, tz: "America/Argentina/Mendoza", coords: "32°39'S · 70°00'W", image: aconcagua },
  { name: "Kilimanjaro", country: "Tanzania", height: 5895, tz: "Africa/Dar_es_Salaam", coords: "3°04'S · 37°21'E", image: kilimanjaro },
  { name: "Fuji", country: "Giappone", height: 3776, tz: "Asia/Tokyo", coords: "35°21'N · 138°43'E", image: fuji },
  { name: "Eiger", country: "Svizzera", height: 3967, tz: "Europe/Zurich", coords: "46°34'N · 8°00'E", image: eiger },
  { name: "Grand Teton", country: "Wyoming, USA", height: 4199, tz: "America/Denver", coords: "43°44'N · 110°48'W", image: grandTeton },
  { name: "Aoraki / Cook", country: "Nuova Zelanda", height: 3724, tz: "Pacific/Auckland", coords: "43°35'S · 170°08'E", image: cook },
  { name: "Torres del Paine", country: "Cile · Patagonia", height: 2500, tz: "America/Santiago", coords: "50°56'S · 73°24'W", image: torresPaine },
];

function getLocalHour(tz: string, now: Date): number {
  const h = new Intl.DateTimeFormat("it-IT", { timeZone: tz, hour: "2-digit", hour12: false }).format(now);
  return parseInt(h, 10);
}

function formatLocalTime(tz: string, now: Date): string {
  return new Intl.DateTimeFormat("it-IT", { timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false }).format(now);
}

function timePhase(hour: number): { label: string; overlay: string; tint: string } {
  // alba 5-8, giorno 8-17, tramonto 17-20, notte 20-5
  if (hour >= 5 && hour < 8) {
    return {
      label: "Alba",
      overlay: "linear-gradient(180deg, hsl(20 80% 55% / 0.45) 0%, hsl(212 60% 60% / 0.18) 40%, hsl(210 40% 99% / 0.85) 100%)",
      tint: "saturate(1.05) contrast(1.05) brightness(1.02)",
    };
  }
  if (hour >= 8 && hour < 17) {
    return {
      label: "Giorno",
      overlay: "linear-gradient(180deg, hsl(210 60% 60% / 0.10) 0%, transparent 40%, hsl(210 40% 99% / 0.75) 100%)",
      tint: "saturate(1.1) contrast(1.05)",
    };
  }
  if (hour >= 17 && hour < 20) {
    return {
      label: "Tramonto",
      overlay: "linear-gradient(180deg, hsl(15 90% 50% / 0.45) 0%, hsl(210 70% 60% / 0.25) 45%, hsl(210 40% 99% / 0.9) 100%)",
      tint: "saturate(1.15) contrast(1.08) brightness(0.98)",
    };
  }
  return {
    label: "Notte",
    overlay: "linear-gradient(180deg, hsl(210 60% 30% / 0.65) 0%, hsl(220 60% 25% / 0.55) 45%, hsl(210 40% 99% / 0.95) 100%)",
    tint: "saturate(0.7) contrast(1.15) brightness(0.55) hue-rotate(-10deg)",
  };
}

const MountainOfTheHour = () => {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    // tick every 30s so seconds/minutes update; mountain rotation is hourly anyway
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  // Rotate mountain by absolute hour since epoch so it changes on the hour, same for all viewers
  const epochHours = Math.floor(now.getTime() / 3_600_000);
  const index = ((epochHours % MOUNTAINS.length) + MOUNTAINS.length) % MOUNTAINS.length;
  const m = MOUNTAINS[index];

  const localHour = getLocalHour(m.tz, now);
  const phase = timePhase(localHour);
  const localTime = formatLocalTime(m.tz, now);
  const nextIndex = (index + 1) % MOUNTAINS.length;

  // minutes until next swap (top of next hour, viewer's clock)
  const minutesToSwap = 60 - now.getMinutes();

  return (
    <div
      key={index}
      className="col-span-12 lg:col-span-4 row-span-2 relative overflow-hidden rounded-2xl md:rounded-3xl gradient-border min-h-[260px] md:min-h-[300px] lg:min-h-0 animate-rise"
      style={{ animationDelay: "0.15s" }}
    >
      {/* Drone-style orbiting image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={m.image}
          alt={`${m.name} vista aerea drone`}
          width={1024}
          height={1280}
          className="absolute left-1/2 top-1/2 w-[140%] h-[140%] object-cover animate-drone-orbit"
          style={{
            transform: "translate(-50%, -50%)",
            filter: phase.tint,
            willChange: "transform",
          }}
        />
      </div>

      {/* Time-of-day overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: phase.overlay }} />
      {/* Subtle scanlines for "feed drone" feel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07] mix-blend-overlay"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 3px)" }}
      />

      {/* HUD content */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6 text-foreground">
        {/* Top row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.3em] opacity-85">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full animate-ping" style={{ background: "hsl(212 90% 55%)" }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "hsl(212 90% 55%)" }} />
            </span>
            DRONE · LIVE
          </div>
          <span
            className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.35em] px-2 py-1 rounded-full text-primary backdrop-blur flex items-center gap-1.5"
            style={{ background: "hsl(212 90% 45% / 0.28)", border: "1px solid hsl(212 90% 55% / 0.5)" }}
          >
            <StarFour size={9} /> {phase.label}
          </span>
        </div>

        {/* Middle: corner crosshairs */}
        <div className="absolute inset-3 md:inset-4 pointer-events-none">
          {(["tl", "tr", "bl", "br"] as const).map((corner) => (
            <span
              key={corner}
              className="absolute w-3 h-3 md:w-4 md:h-4"
              style={{
                top: corner.startsWith("t") ? 0 : "auto",
                bottom: corner.startsWith("b") ? 0 : "auto",
                left: corner.endsWith("l") ? 0 : "auto",
                right: corner.endsWith("r") ? 0 : "auto",
                borderTop: corner.startsWith("t") ? "1px solid hsl(200 95% 65% / 0.8)" : "none",
                borderBottom: corner.startsWith("b") ? "1px solid hsl(200 95% 65% / 0.8)" : "none",
                borderLeft: corner.endsWith("l") ? "1px solid hsl(200 95% 65% / 0.8)" : "none",
                borderRight: corner.endsWith("r") ? "1px solid hsl(200 95% 65% / 0.8)" : "none",
              }}
            />
          ))}
        </div>

        {/* Bottom: data */}
        <div className="space-y-3">
          <div>
            <p className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.35em] opacity-70 mb-1.5 flex items-center gap-2">
              <StarFour size={8} /> Montagna dell'ora · Nº {String(index + 1).padStart(2, "0")}/{MOUNTAINS.length}
            </p>
            <p className="font-display text-2xl md:text-4xl leading-none uppercase tracking-tight">
              {m.name}
            </p>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-foreground/70 mt-1.5">
              {m.country}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10">
            <div>
              <p className="text-[8px] md:text-[9px] font-mono uppercase tracking-[0.3em] opacity-60">Altezza</p>
              <p className="font-display text-base md:text-xl leading-none mt-1">
                {m.height.toLocaleString("it-IT")}<span className="text-[10px] md:text-xs opacity-60 ml-0.5">m</span>
              </p>
            </div>
            <div>
              <p className="text-[8px] md:text-[9px] font-mono uppercase tracking-[0.3em] opacity-60">Ora locale</p>
              <p className="font-display text-base md:text-xl leading-none mt-1 text-gradient-pink">
                {localTime}
              </p>
            </div>
            <div>
              <p className="text-[8px] md:text-[9px] font-mono uppercase tracking-[0.3em] opacity-60">Coord.</p>
              <p className="font-mono text-[9px] md:text-[11px] leading-tight mt-1 opacity-85">
                {m.coords}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-[8px] md:text-[9px] font-mono uppercase tracking-[0.3em] opacity-55 pt-1">
            <span>Prossima · {MOUNTAINS[nextIndex].name}</span>
            <span>in {minutesToSwap}min</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MountainOfTheHour;