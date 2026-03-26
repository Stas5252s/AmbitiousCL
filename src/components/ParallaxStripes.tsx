import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ParallaxStripes = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const stripes = Array.from({ length: 8 }, (_, i) => i);

  return (
    <section ref={ref} className="relative h-[50vh] overflow-hidden">
      {stripes.map((i) => {
        const speed = 0.5 + i * 0.15;
        const direction = i % 2 === 0 ? 1 : -1;
        const startX = direction > 0 ? "-60%" : "60%";
        const endX = direction > 0 ? "60%" : "-60%";

        return (
          <motion.div
            key={i}
            className="absolute whitespace-nowrap"
            style={{
              top: `${8 + i * 11}%`,
              x: useTransform(scrollYProgress, [0, 1], [startX, endX]),
              opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.04 + i * 0.01, 0.04 + i * 0.01, 0]),
              skewX: useTransform(scrollYProgress, [0, 0.5, 1], [-5 * direction, 0, 5 * direction]),
            }}
          >
            <span
              className="text-display text-foreground select-none"
              style={{ fontSize: `clamp(${1.5 + i * 0.3}rem, ${3 + i}vw, ${4 + i}rem)` }}
            >
              {i % 3 === 0
                ? "BUILD · EARN · CONNECT · LEAD · GROW · SCALE · "
                : i % 3 === 1
                ? "HUSTLE · VISION · EMPIRE · NETWORK · DISCIPLINE · "
                : "AMBITION · FREEDOM · LEVERAGE · EXECUTE · WIN · "}
            </span>
          </motion.div>
        );
      })}

      {/* Center focal point */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          opacity: useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]),
        }}
      >
        <motion.div
          className="w-32 h-32 border border-primary/20"
          style={{
            rotate: useTransform(scrollYProgress, [0, 1], [0, 180]),
            scale: useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.3, 1, 0.3]),
          }}
        />
      </motion.div>
    </section>
  );
};

export default ParallaxStripes;
