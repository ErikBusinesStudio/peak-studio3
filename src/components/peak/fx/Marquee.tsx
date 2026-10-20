import { useEffect, useRef } from "react";
import { useCopy } from "@/config/copy";
import { useInView, useReducedMotion } from "@/hooks/peak";

/** Marquee gigante: skew/stretch in base alla velocità di scroll, inverte salendo. */
const Marquee = () => {
  const { c } = useCopy();
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView || reduced) return;
    let x = 0, dir = -1, vel = 0, lastY = window.scrollY, raf = 0;
    const loop = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (dy !== 0) dir = dy > 0 ? -1 : 1;
      vel += (Math.min(60, Math.abs(dy)) - vel) * 0.1;
      x += dir * (0.6 + vel * 0.25);
      const el = track.current;
      if (el) {
        const half = el.scrollWidth / 2;
        if (x <= -half) x += half;
        if (x > 0) x -= half;
        el.style.transform = `translate3d(${x}px,0,0) skewX(${dir * -vel * 0.35}deg) scaleX(${1 + vel * 0.006})`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  return (
    <div ref={wrap} className="zone-ice-2 overflow-hidden border-y border-border py-6 md:py-10" aria-label={c.marquee.replace(/✦/g, "·")} role="img">
      <div ref={track} aria-hidden className="flex w-max whitespace-nowrap font-display text-[clamp(3rem,10vw,9rem)] font-extrabold uppercase leading-none tracking-tight will-change-transform">
        <span className="pr-8">{c.marquee}&nbsp;{c.marquee}</span>
        <span className="pr-8">{c.marquee}&nbsp;{c.marquee}</span>
      </div>
    </div>
  );
};

export default Marquee;
