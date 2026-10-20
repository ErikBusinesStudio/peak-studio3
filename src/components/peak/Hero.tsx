import { lazy, Suspense, useEffect, useState } from "react";
import heroImg from "@/assets/hero-glacier.webp";
import heroImgM from "@/assets/hero-glacier-m.webp";
import { useCopy } from "@/config/copy";
import { useReducedMotion } from "@/hooks/peak";
import Cta from "./Cta";

const FrostGlass = lazy(() => import("./fx/FrostGlass"));
const Snow = lazy(() => import("./fx/Snow"));

const Hero = () => {
  const { c } = useCopy();
  const reduced = useReducedMotion();
  const [fx, setFx] = useState(false);

  // effetti caricati dopo il primo disegno: il titolo resta subito visibile (LCP)
  useEffect(() => {
    const start = () => setFx(true);
    const id = window.setTimeout(start, 2500);
    window.addEventListener("pointermove", start, { once: true });
    return () => { window.clearTimeout(id); window.removeEventListener("pointermove", start); };
  }, []);

  return (
    <section id="top" aria-labelledby="hero-title" className="zone-snow relative isolate flex min-h-[100svh] items-end overflow-hidden pb-16 pt-28 md:pb-24">
      <picture className="absolute inset-0 -z-20">
        <source media="(max-width: 767px)" srcSet={heroImgM} type="image/webp" />
        <img
          src={heroImg}
          alt={c.hero.alt}
          width={1920}
          height={1088}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-top"
        />
      </picture>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[hsl(var(--snow)/0.55)] to-[hsl(var(--snow))]" />

      {fx && !reduced && (
        <Suspense fallback={null}>
          <Snow />
          <FrostGlass hint={c.hero.hint} />
        </Suspense>
      )}

      <div className="wrap relative">
        <p className="hud mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-[hsl(var(--snow)/0.8)] px-3 py-2 font-semibold text-muted-foreground">
          <span aria-hidden className="h-2 w-2 rotate-45 bg-[hsl(var(--cyan))] ring-1 ring-[hsl(var(--glacier-700))]" />
          {c.hero.hud}
        </p>
        <h1 id="hero-title" className="giant ice-text ice-filter -ml-[0.04em] !text-[clamp(3.25rem,10.5vw,10rem)]">
          <span className="block">{c.hero.l1}</span>
          <span className="block">{c.hero.l2}</span>
        </h1>
        <p className="mt-8 max-w-xl text-lg text-foreground md:text-xl">{c.hero.sub}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Cta kind="primary" />
          <Cta kind="secondary" />
        </div>
      </div>

      {/* filtro "ghiaccio" sottile per le lettere */}
      <svg aria-hidden width="0" height="0" className="absolute">
        <filter id="ice-distort">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.04" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="3" />
        </filter>
      </svg>
    </section>
  );
};

export default Hero;
