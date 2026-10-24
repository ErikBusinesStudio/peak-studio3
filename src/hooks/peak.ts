import { RefObject, useEffect, useState } from "react";
import { useCopy } from "@/config/copy";

export const useReducedMotion = () => {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return reduced;
};

export const isFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;

/** true finché l'elemento è (quasi) visibile: serve a mettere in pausa gli effetti fuori schermo. */
export const useInView = (ref: RefObject<Element>, rootMargin = "100px") => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return inView;
};

/** Diventa true la prima volta che l'elemento entra in vista. */
export const useRevealOnce = (ref: RefObject<Element>) => {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShown(true), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, shown]);
  return shown;
};

/**
 * Avanzamento 0→1 mentre l'elemento attraversa la finestra.
 * mode "pass": da quando il top entra dal basso a quando il bottom esce in alto.
 * mode "pin": da top=0 a bottom=altezza finestra (per sezioni fissate).
 */
export const useScrollProgress = (ref: RefObject<HTMLElement>, mode: "pass" | "pin" | "enter" | "line" = "pass") => {
  const [p, setP] = useState(0);
  const inView = useInView(ref, "200px");
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const calc = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let v: number;
      if (mode === "pin") v = -r.top / Math.max(1, r.height - vh);
      else if (mode === "line") v = (vh * 0.78 - r.top) / (vh * 0.48);
      else if (mode === "enter") v = (vh - r.top) / Math.max(1, r.height * 0.9);
      else v = (vh - r.top) / (vh + r.height);
      setP(Math.min(1, Math.max(0, v)));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, [inView, ref, mode]);
  return p;
};

/** Aggiorna title, description e og/twitter in base alla lingua. */
export const usePageMeta = (title?: string, description?: string) => {
  const { c, lang } = useCopy();
  const t = title ?? c.meta.title;
  const d = description ?? c.meta.description;
  useEffect(() => {
    document.title = t;
    const set = (sel: string, v: string) => document.querySelector(sel)?.setAttribute("content", v);
    set('meta[name="description"]', d);
    set('meta[property="og:title"]', t);
    set('meta[name="twitter:title"]', t);
    set('meta[property="og:description"]', d);
    set('meta[name="twitter:description"]', d);
    set('meta[property="og:locale"]', lang === "en" ? "en_GB" : "it_IT");
  }, [t, d, lang]);
};

export const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  // sposta il focus per chi naviga da tastiera
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  (el as HTMLElement).focus({ preventScroll: true });
};
