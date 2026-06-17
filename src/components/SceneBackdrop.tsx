import { ReactNode, useEffect, useRef, useState } from "react";

interface Props {
  image: string;
  children: ReactNode;
  /** intensity of dark overlay 0-100, default 45 */
  overlay?: number;
  /** vignette intensity, default true */
  vignette?: boolean;
  /** id to forward to wrapper (for anchor scrolling) */
  id?: string;
  className?: string;
}

/**
 * Cinematic full-bleed backdrop with scroll-driven Ken Burns parallax,
 * smooth crossfade-on-enter and a soft pedestal gradient so on-image
 * typography feels "leant" on the photo instead of boxed off.
 */
const SceneBackdrop = ({
  image,
  children,
  overlay = 45,
  vignette = true,
  id,
  className = "",
}: Props) => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  // Reveal on enter
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Scroll-driven Ken Burns (translateY + subtle zoom)
  useEffect(() => {
    const el = wrapRef.current;
    const img = imgRef.current;
    if (!el || !img) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 when section bottom is at top of viewport, 1 when section top is at bottom
      const progress = Math.max(0, Math.min(1, 1 - (rect.top + rect.height * 0.3) / (vh + rect.height * 0.3)));
      const ty = (progress - 0.5) * 80; // -40..40 px
      const scale = 1.08 + progress * 0.06; // 1.08..1.14
      img.style.transform = `translate3d(0, ${ty}px, 0) scale(${scale})`;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const top = overlay / 100;
  const mid = Math.max(0, overlay - 18) / 100;
  const bot = Math.min(95, overlay + 25) / 100;

  return (
    <div
      id={id}
      ref={wrapRef}
      className={`relative isolate overflow-hidden ${className}`}
    >
      {/* Parallax Ken Burns image */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          ref={imgRef}
          aria-hidden="true"
          className={[
            "absolute -inset-[8%] bg-cover bg-center bg-no-repeat",
            "transition-[opacity,filter] duration-[1400ms] ease-out will-change-transform",
            visible ? "opacity-100 blur-0" : "opacity-0 blur-md",
          ].join(" ")}
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>

      {/* Soft pedestal gradient: light at top, denser at bottom — text "leans" on the image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: `linear-gradient(180deg,
            hsl(220 15% 4% / ${top}) 0%,
            hsl(220 15% 4% / ${mid}) 35%,
            hsl(220 15% 4% / ${mid}) 60%,
            hsl(220 15% 4% / ${bot}) 100%)`,
        }}
      />

      {/* Seamless section blends */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-32 -z-10 bg-gradient-to-b from-background to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-32 -z-10 bg-gradient-to-t from-background to-transparent" />

      {/* Vignette */}
      {vignette && (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, transparent 55%, hsl(220 15% 4% / 0.55) 100%)",
          }}
        />
      )}

      {/* Children fade/slide in once visible */}
      <div
        className={[
          "transition-all duration-1000 ease-out",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
};

export default SceneBackdrop;