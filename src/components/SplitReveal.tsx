import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const SplitReveal = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Two halves of screen split apart revealing text
  const leftX = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], ["0%", "-55%", "-55%", "0%"]);
  const rightX = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], ["0%", "55%", "55%", "0%"]);
  const panelOp = useTransform(scrollYProgress, [0, 0.1, 0.35, 0.65, 0.9, 1], [0, 1, 1, 1, 1, 0]);

  // Inner text
  const textScale = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0.5, 1, 1, 0.5]);
  const textOp = useTransform(scrollYProgress, [0.2, 0.35, 0.65, 0.8], [0, 1, 1, 0]);
  const textBlur = useTransform(scrollYProgress, [0.2, 0.35, 0.65, 0.8], [20, 0, 0, 20]);
  const textRotate = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [-5, 0, 0, 5]);

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Left panel */}
        <motion.div
          className="absolute top-0 left-0 w-1/2 h-full bg-foreground/[0.03]"
          style={{ x: leftX, opacity: panelOp }}
        >
          <motion.div
            className="absolute right-0 top-0 w-px h-full bg-foreground/10"
            style={{ opacity: panelOp }}
          />
        </motion.div>

        {/* Right panel */}
        <motion.div
          className="absolute top-0 right-0 w-1/2 h-full bg-foreground/[0.03]"
          style={{ x: rightX, opacity: panelOp }}
        >
          <motion.div
            className="absolute left-0 top-0 w-px h-full bg-foreground/10"
            style={{ opacity: panelOp }}
          />
        </motion.div>

        {/* Revealed text */}
        <motion.div
          className="relative z-10 text-center px-6"
          style={{
            scale: textScale,
            opacity: textOp,
            rotate: textRotate,
            filter: useTransform(textBlur, (v) => `blur(${v}px)`),
          }}
        >
          <p className="font-mono-label mb-4 text-foreground/40">THE TRUTH</p>
          <h2
            className="text-display text-foreground"
            style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
          >
            AGE IS
          </h2>
          <h2
            className="text-display text-foreground"
            style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
          >
            LEVERAGE
          </h2>
        </motion.div>
      </div>
    </section>
  );
};

export default SplitReveal;
