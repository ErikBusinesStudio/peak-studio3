import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoLight from "@/assets/logo-light.webp";
import { useCopy } from "@/config/copy";
import { CONTATTI, DATI_LEGALI } from "@/config/site";
import everest from "@/assets/thumbs/everest.webp";
import k2 from "@/assets/thumbs/k2.webp";
import cervino from "@/assets/thumbs/cervino.webp";
import bianco from "@/assets/thumbs/monte-bianco.webp";
import denali from "@/assets/thumbs/denali.webp";
import aconcagua from "@/assets/thumbs/aconcagua.webp";
import kilimanjaro from "@/assets/thumbs/kilimanjaro.webp";
import fuji from "@/assets/thumbs/fuji.webp";
import eiger from "@/assets/thumbs/eiger.webp";
import teton from "@/assets/thumbs/grand-teton.webp";
import cook from "@/assets/thumbs/cook.webp";
import paine from "@/assets/thumbs/torres-paine.webp";

const MONTI = [
  { n: "Everest", q: 8848, tz: "Asia/Kathmandu", img: everest },
  { n: "K2", q: 8611, tz: "Asia/Karachi", img: k2 },
  { n: "Cervino", q: 4478, tz: "Europe/Rome", img: cervino },
  { n: "Monte Bianco", q: 4808, tz: "Europe/Rome", img: bianco },
  { n: "Denali", q: 6190, tz: "America/Anchorage", img: denali },
  { n: "Aconcagua", q: 6961, tz: "America/Argentina/Mendoza", img: aconcagua },
  { n: "Kilimanjaro", q: 5895, tz: "Africa/Dar_es_Salaam", img: kilimanjaro },
  { n: "Fuji", q: 3776, tz: "Asia/Tokyo", img: fuji },
  { n: "Eiger", q: 3967, tz: "Europe/Zurich", img: eiger },
  { n: "Grand Teton", q: 4199, tz: "America/Denver", img: teton },
  { n: "Aoraki / Cook", q: 3724, tz: "Pacific/Auckland", img: cook },
  { n: "Torres del Paine", q: 2500, tz: "America/Santiago", img: paine },
];

const MountainOfTheHour = () => {
  const { c, lang } = useCopy();
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(id);
  }, []);
  const m = MONTI[now.getHours() % MONTI.length];
  const time = new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "it-IT", { hour: "2-digit", minute: "2-digit", timeZone: m.tz }).format(now);
  return (
    <div className="surface flex items-center gap-4 p-3">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
        <img src={m.img} alt={m.n} width={64} height={64} loading="lazy" className="h-full w-full object-cover" />
        <span className="hud absolute bottom-0 left-0 right-0 bg-[hsl(var(--deep-900)/0.8)] text-center !text-[10px] leading-5">{c.footer.photo}</span>
      </div>
      <div>
        <p className="hud text-muted-foreground">{c.footer.mountain}</p>
        <p className="font-semibold">{m.n} · {m.q.toLocaleString("it-IT")} m</p>
        <p className="text-sm text-muted-foreground">{time} {c.footer.local}</p>
      </div>
    </div>
  );
};

const Footer = () => {
  const { c } = useCopy();
  return (
    <footer className="zone-deep border-t border-border py-12">
      <div className="wrap grid gap-8 md:grid-cols-12 md:items-center">
        <div className="md:col-span-5">
          <img src={logoLight} alt="Peak Studio" width={320} height={136} loading="lazy" className="h-10 w-auto" />
          <p className="mt-4 text-sm text-muted-foreground">
            {DATI_LEGALI.ditta} · {DATI_LEGALI.sede} · P.IVA {DATI_LEGALI.piva}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            <a href={`mailto:${CONTATTI.email}`} className="underline underline-offset-4">{CONTATTI.email}</a> · <a href={`tel:${CONTATTI.telefono.replace(/\s/g, "")}`} className="underline underline-offset-4">{CONTATTI.telefono}</a>
          </p>
        </div>
        <nav aria-label="Legal" className="md:col-span-3">
          <ul className="flex gap-6">
            <li><Link to="/privacy" className="underline underline-offset-4">{c.footer.privacy}</Link></li>
            <li><Link to="/cookie" className="underline underline-offset-4">{c.footer.cookie}</Link></li>
          </ul>
        </nav>
        <div className="md:col-span-4">
          <MountainOfTheHour />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
