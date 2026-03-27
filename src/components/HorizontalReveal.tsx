import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HorizontalReveal = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["80%", "-80%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-60%", "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  // Motion blur based on scroll edges
  const blur1 = useTransform(scrollYProgress, [0, 0.15, 0.4, 0.6, 0.85, 1], [8, 0, 0, 0, 0, 8]);
  const skew = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [-2, 0, 0, 0, 2]);

  return (
    <section ref={ref} className="relative py-16 md:py-24 overflow-hidden">
      <motion.div
        className="whitespace-nowrap"
        style={{
          x,
          opacity,
          skewX: skew,
          filter: useTransform(blur1, (v) => `blur(${v}px)`),
        }}
      >
        <span
          className="text-display text-foreground/[0.04] select-none"
          style={{ fontSize: "clamp(5rem, 15vw, 14rem)" }}
        >
          HUSTLE · BUILD · EARN · CONNECT · REPEAT ·
        </span>
      </motion.div>
      <motion.div
        className="whitespace-nowrap mt-4"
        style={{
          x: x2,
          opacity,
          skewX: useTransform(skew, (v) => -v),
          filter: useTransform(blur1, (v) => `blur(${v * 0.6}px)`),
        }}
      >
        <span
          className="text-display text-foreground/[0.03] select-none"
          style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
        >
          WEALTH · VISION · EMPIRE · NETWORK · GROWTH · AMBITION ·
        </span>
      </motion.div>
    </section>
  );
};

export default HorizontalReveal;
