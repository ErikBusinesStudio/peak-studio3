import { ReactNode } from "react";

interface Props {
  image: string;
  children: ReactNode;
  /** intensity of dark overlay 0-100, default 70 */
  overlay?: number;
  /** vignette intensity, default true */
  vignette?: boolean;
  /** id to forward to wrapper (for anchor scrolling) */
  id?: string;
  className?: string;
}

const SceneBackdrop = ({ image, children, overlay = 72, vignette = true, id, className = "" }: Props) => {
  return (
    <div id={id} className={`relative isolate grain-overlay ${className}`}>
      {/* Cinematic background image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat md:bg-fixed"
        style={{ backgroundImage: `url(${image})` }}
      />
      {/* Dark overlay for legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: `linear-gradient(180deg, hsl(220 15% 4% / ${overlay / 100}) 0%, hsl(220 15% 4% / ${Math.min(overlay + 8, 95) / 100}) 100%)` }}
      />
      {/* Top + bottom blend for seamless section transitions */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-24 -z-10 bg-gradient-to-b from-background to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-24 -z-10 bg-gradient-to-t from-background to-transparent" />
      {/* Vignette */}
      {vignette && (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 0%, transparent 50%, hsl(220 15% 4% / 0.6) 100%)" }}
        />
      )}
      {children}
    </div>
  );
};

export default SceneBackdrop;