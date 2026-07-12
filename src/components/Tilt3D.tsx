import { useRef, ReactNode, CSSProperties } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  max?: number; // max degrees
  scale?: number;
}

/** Awwwards-style 3D tilt on mouse move. Disabled on mobile. */
const Tilt3D = ({ children, className = "", style, max = 8, scale = 1.02 }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const onMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg) scale(${scale})`;
    const img = el.querySelector<HTMLElement>("[data-tilt-media]");
    if (img) img.style.transform = `translate3d(${px * -14}px, ${py * -14}px, 0) scale(1.08)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    const img = el.querySelector<HTMLElement>("[data-tilt-media]");
    if (img) img.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ transformStyle: "preserve-3d", transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)", ...style }}
    >
      {children}
    </div>
  );
};

export default Tilt3D;