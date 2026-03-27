import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ZoomOnScroll = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.1, 0.5, 1, 2, 8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.45, 0.55, 0.75], [0, 1, 1, 0.8, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.25, 0.4, 0.6, 0.8], [20, 5, 0, 0, 30]);
  const letterSpacing = useTransform(scrollYProgress, [0, 0.3, 0.5, 1], ["0.5em", "0.2em", "0.05em", "-0.05em"]);

  const lineW = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], ["0%", "100%", "100%", "0%"]);
  const lineOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.9], [0, 0.2, 0.2, 0]);

  return (
    <section ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <motion.div
          className="absolute top-[25%] left-0 h-px bg-foreground/15"
          style={{ width: lineW, opacity: lineOpacity }}
        />
        <motion.div
          className="absolute bottom-[25%] right-0 h-px bg-foreground/15"
          style={{ width: lineW, opacity: lineOpacity }}
        />

        <motion.div
          className="select-none"
          style={{
            scale,
            opacity,
            filter: useTransform(blur, (v) => `blur(${v}px)`),
          }}
        >
          <motion.span
            className="text-display text-foreground/[0.06] whitespace-nowrap block"
            style={{
              fontSize: "clamp(2rem, 8vw, 6rem)",
              letterSpacing,
            }}
          >
            NO PERMISSION NEEDED
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
};

export default ZoomOnScroll;
