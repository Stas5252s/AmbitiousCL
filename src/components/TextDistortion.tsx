import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const TextDistortion = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const skewY = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [8, 0, 0, 0, -8]);
  const scaleX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const letterSpacing = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [40, 0, 0, 40]);
  const blur = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [10, 0, 0, 10]);

  return (
    <section ref={ref} className="py-24 md:py-40 overflow-hidden">
      <motion.div
        className="flex items-center justify-center"
        style={{
          skewY,
          scaleX,
          opacity,
          filter: useTransform(blur, (v) => `blur(${v}px)`),
        }}
      >
        <motion.h2
          className="text-display text-foreground/[0.06] text-center select-none whitespace-nowrap"
          style={{
            fontSize: "clamp(4rem, 12vw, 10rem)",
            letterSpacing: useTransform(letterSpacing, (v) => `${v}px`),
          }}
        >
          NO LIMITS
        </motion.h2>
      </motion.div>
    </section>
  );
};

export default TextDistortion;
