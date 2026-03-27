import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ParallaxStripes = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Clean horizontal lines that expand at different rates
  const lines = [
    { top: "15%", delay: 0, maxW: "90%" },
    { top: "28%", delay: 0.05, maxW: "65%" },
    { top: "41%", delay: 0.1, maxW: "80%" },
    { top: "54%", delay: 0.03, maxW: "45%" },
    { top: "67%", delay: 0.08, maxW: "70%" },
    { top: "80%", delay: 0.12, maxW: "55%" },
  ];

  const masterOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative h-[40vh] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ opacity: masterOpacity }}>
        {lines.map((line, i) => {
          const fromRight = i % 2 === 1;
          return (
            <motion.div
              key={i}
              className="absolute h-px bg-foreground/10"
              style={{
                top: line.top,
                [fromRight ? "right" : "left"]: 0,
                width: useTransform(
                  scrollYProgress,
                  [0.1 + line.delay, 0.5 + line.delay],
                  ["0%", line.maxW]
                ),
              }}
            />
          );
        })}

        {/* Center text that fades through */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: useTransform(scrollYProgress, [0.25, 0.45, 0.55, 0.75], [0, 0.04, 0.04, 0]),
          }}
        >
          <span
            className="text-display text-foreground select-none whitespace-nowrap"
            style={{ fontSize: "clamp(4rem, 12vw, 10rem)" }}
          >
            BUILD
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ParallaxStripes;
