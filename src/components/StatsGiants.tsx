import { useI18n } from "@/contexts/I18nContext";

const StatsGiants = () => {
  const { t } = useI18n();

  const stats = [
    { big: "50+", suffix: "", label: t("hero.stat1"), note: "Dal 2022" },
    { big: "7", suffix: "gg", label: "Consegna massima", note: "Dal brief al lancio" },
    { big: "100", suffix: "%", label: t("hero.stat3"), note: "Zero template" },
    { big: "4.9", suffix: "/5", label: "Valutazione media", note: "Recensioni verificate" },
  ];

  return (
    <section id="numeri" className="relative overflow-hidden py-16 md:py-32 px-4 md:px-8">
      <div className="hidden md:block absolute -top-24 right-1/3 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[220px] animate-pulse-slow" />

      <div className="max-w-7xl mx-auto">
        <div className="mb-10 md:mb-20 flex items-end justify-between border-b border-foreground/15 pb-4">
          <div>
            <p className="eyebrow mb-3 md:mb-4">Indicatori · Peak Studio</p>
            <h2 className="font-display text-3xl md:text-6xl leading-[0.9] tracking-tight uppercase">
              I numeri<br />
              <span className="text-gradient">di chi consegna.</span>
            </h2>
          </div>
          <span className="hidden md:inline font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/50">
            Aggiornato · Q1 2026
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-y-24 gap-x-10">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="group relative border-t border-foreground/10 pt-6 md:pt-10"
              style={{ animation: `fade-in 0.7s ease-out ${i * 120}ms both` }}
            >
              <span className="absolute top-4 right-0 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
                0{i + 1} / 04
              </span>
              <div className="flex items-end gap-2 leading-none">
                <span
                  className="font-display text-gradient tracking-[-0.05em]"
                  style={{ fontSize: "clamp(4.5rem, 16vw, 15rem)", lineHeight: 0.85 }}
                >
                  {s.big}
                </span>
                <span className="font-display text-2xl md:text-5xl text-foreground/70 pb-3 md:pb-6">
                  {s.suffix}
                </span>
              </div>
              <p className="mt-4 font-display text-lg md:text-2xl uppercase tracking-tight">
                {s.label}
              </p>
              <p className="mt-1 text-xs md:text-sm text-muted-foreground">{s.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsGiants;