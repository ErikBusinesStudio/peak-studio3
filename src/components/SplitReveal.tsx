import { ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  /** split by "word" (default) or "char" */
  by?: "word" | "char";
  as?: keyof JSX.IntrinsicElements;
}

/** Wraps text so each word/char animates in on scroll. Works on any inline text. */
const SplitReveal = ({ children, className, delay = 0, stagger = 0.06, by = "word", as: Tag = "span" }: Props) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parts = el.querySelectorAll<HTMLElement>("[data-split-part]");
    if (!parts.length) return;
    gsap.set(parts, { yPercent: 110, opacity: 0 });
    const anim = gsap.to(parts, {
      yPercent: 0,
      opacity: 1,
      duration: 0.9,
      ease: "expo.out",
      stagger,
      delay,
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [delay, stagger]);

  const text = typeof children === "string" ? children : "";
  const units = by === "word" ? text.split(/(\s+)/) : Array.from(text);

  const Comp = Tag as any;
  return (
    <Comp ref={ref as any} className={className} style={{ display: "inline-block" }}>
      {text
        ? units.map((u, i) => {
            if (/^\s+$/.test(u)) return <span key={i}>{u}</span>;
            return (
              <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
                <span data-split-part style={{ display: "inline-block", willChange: "transform, opacity" }}>
                  {u}
                </span>
              </span>
            );
          })
        : children}
    </Comp>
  );
};

export default SplitReveal;