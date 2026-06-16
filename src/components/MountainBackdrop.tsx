import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import mountainImg from "@/assets/mountain.jpg";

export function MountainBackdrop() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();

  const translateY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-55%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-2, 2]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [1.05, 1, 1.1]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <motion.div
        style={{ y: translateY, rotate, scale }}
        className="absolute left-1/2 top-0 h-[220vh] w-[120vw] -translate-x-1/2 will-change-transform"
      >
        <img
          src={mountainImg}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-[0.55] [filter:grayscale(1)_contrast(1.1)_brightness(0.75)]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/55 to-background" />
      </motion.div>
      {/* Red glow accents */}
      <div className="absolute top-1/4 -left-32 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[180px]" />
      <div className="absolute bottom-1/4 -right-32 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[180px]" />
    </div>
  );
}

export default MountainBackdrop;