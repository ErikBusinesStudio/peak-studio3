import { useEffect, useState } from "react";
import { useI18n } from "@/contexts/I18nContext";

export function AltitudeNav() {
  const { t } = useI18n();
  const [active, setActive] = useState("hero");

  const ZONES = [
    { id: "hero", labelKey: "alt.peak", quota: "4.810m" },
    { id: "servizi", labelKey: "header.services", quota: "4.200m" },
    { id: "sentiero", labelKey: "alt.path", quota: "3.600m" },
    { id: "crepaccio", labelKey: "alt.risk", quota: "3.000m" },
    { id: "portfolio", labelKey: "header.portfolio", quota: "2.400m" },
    { id: "prezzi", labelKey: "header.pricing", quota: "1.800m" },
    { id: "recensioni", labelKey: "header.reviews", quota: "1.200m" },
    { id: "contatti", labelKey: "header.contacts", quota: "0m" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    ZONES.forEach((z) => {
      const el = document.getElementById(z.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav
      aria-label="Altimetro"
      className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-1 md:flex"
    >
      {ZONES.map((z) => {
        const isActive = active === z.id;
        return (
          <a
            key={z.id}
            href={`#${z.id}`}
            className="group flex items-center gap-3 rounded-lg px-3 py-1.5 transition-all hover:bg-card/60 hover:backdrop-blur"
          >
            <span
              className={`font-display text-[10px] uppercase tracking-[0.15em] transition-all ${
                isActive
                  ? "text-primary opacity-100"
                  : "text-muted-foreground opacity-0 group-hover:opacity-100"
              }`}
            >
              {t(z.labelKey)} · {z.quota}
            </span>
            <span
              className={`block h-2 w-2 rounded-full border transition-all ${
                isActive
                  ? "scale-125 border-primary bg-primary shadow-[0_0_12px_hsl(0_85%_55%/0.7)]"
                  : "border-border bg-transparent"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}

export default AltitudeNav;