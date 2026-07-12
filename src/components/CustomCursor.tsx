import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

/** Awwwards-style magnetic cursor. Desktop only. */
const CustomCursor = () => {
  const isMobile = useIsMobile();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const state = useRef({ x: 0, y: 0, tx: 0, ty: 0, rx: 0, ry: 0, hover: false });

  useEffect(() => {
    if (isMobile) return;
    const s = state.current;

    const onMove = (e: MouseEvent) => {
      s.x = e.clientX;
      s.y = e.clientY;
    };
    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest(
        "a, button, [role='button'], .btn-cta, .btn-cta-soft, input, textarea, [data-cursor='hover']"
      );
      s.hover = !!el;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    let raf = 0;
    const tick = () => {
      s.tx += (s.x - s.tx) * 0.9;
      s.ty += (s.y - s.ty) * 0.9;
      s.rx += (s.x - s.rx) * 0.18;
      s.ry += (s.y - s.ry) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${s.tx}px, ${s.ty}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        const scale = s.hover ? 1.9 : 1;
        ringRef.current.style.transform = `translate3d(${s.rx}px, ${s.ry}px, 0) translate(-50%, -50%) scale(${scale})`;
        ringRef.current.style.opacity = s.hover ? "1" : "0.55";
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    document.documentElement.classList.add("cursor-none-desktop");

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("cursor-none-desktop");
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-10 h-10 rounded-full border transition-[opacity] duration-200 ease-out"
        style={{
          borderColor: "hsl(205 90% 48% / 0.75)",
          mixBlendMode: "difference",
          willChange: "transform",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-1.5 h-1.5 rounded-full"
        style={{ background: "hsl(205 90% 55%)", willChange: "transform" }}
      />
    </>
  );
};

export default CustomCursor;