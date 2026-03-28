import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const words = ["AMBITION", "IS", "NOT", "GIVEN.", "IT'S", "TAKEN."];

const PerspectiveWarp = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Entire block rotates in 3D as you scroll
  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [60, 15, 0, -15, -60]);
  const scaleBlock = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65, 1], [0.4, 0.9, 1, 0.9, 0.4]);
  const opacityBlock = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 0.5, 1, 1, 0.5, 0]);
  const blurBlock = useTransform(scrollYProgress, [0, 0.25, 0.4, 0.6, 0.75, 1], [30, 8, 0, 0, 8, 30]);

  // Vertical spread — words start stacked, then separate
  const spread = useTransform(scrollYProgress, [0.15, 0.45, 0.55, 0.85], [0, 1, 1, 0]);

  // Horizontal accent lines
  const lineW = useTransform(scrollYProgress, [0.2, 0.45, 0.55, 0.8], ["0%", "60%", "60%", "0%"]);
  const lineOp = useTransform(scrollYProgress, [0.2, 0.3, 0.7, 0.8], [0, 0.15, 0.15, 0]);

  return (
    <section ref={ref} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center" style={{ perspective: "800px" }}>
        {/* Accent lines */}
        <motion.div
          className="absolute top-[20%] left-[10%] h-px bg-foreground/15"
          style={{ width: lineW, opacity: lineOp }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[10%] h-px bg-foreground/15"
          style={{ width: lineW, opacity: lineOp }}
        />

        <motion.div
          className="flex flex-col items-center"
          style={{
            rotateX,
            scale: scaleBlock,
            opacity: opacityBlock,
            filter: useTransform(blurBlock, (v) => `blur(${v}px)`),
            transformStyle: "preserve-3d",
          }}
        >
          {words.map((word, i) => {
            const yOffset = (i - (words.length - 1) / 2) * 60;
            return (
              <motion.span
                key={i}
                className="text-display text-foreground/90 block select-none"
                style={{
                  fontSize: "clamp(2rem, 7vw, 5rem)",
                  y: useTransform(spread, (s) => s * yOffset),
                  opacity: useTransform(
                    scrollYProgress,
                    [0.15 + i * 0.03, 0.25 + i * 0.03],
                    [0, 1]
                  ),
                  x: useTransform(
                    scrollYProgress,
                    [0.15 + i * 0.03, 0.25 + i * 0.03],
                    [i % 2 === 0 ? -50 : 50, 0]
                  ),
                }}
              >
                {word}
              </motion.span>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default PerspectiveWarp;
