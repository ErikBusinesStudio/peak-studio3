import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Auto-attaches fade+slide-up reveal to every <h2> inside <main>. */
export function useHeadingReveal() {
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;
    const headings = main.querySelectorAll<HTMLElement>("h2");
    const triggers: ScrollTrigger[] = [];

    headings.forEach((h) => {
      if (h.dataset.revealed === "1") return;
      h.dataset.revealed = "1";
      gsap.set(h, { y: 40, opacity: 0, filter: "blur(6px)" });
      const anim = gsap.to(h, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: h, start: "top 88%", once: true },
      });
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);
}