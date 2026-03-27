import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const GlitchReveal = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const text = "AMBITIOUS";

  // Clean monochrome reveal — scale in from massive, compress to normal
  const mainScale = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [4, 1, 1, 0.3]);
  const mainOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const mainBlur = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [40, 0, 0, 30]);
  const letterSpacing = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], ["1em", "0.2em", "0.2em", "0.6em"]);

  // Horizontal scan line
  const scanY = useTransform(scrollYProgress, [0.15, 0.85], ["-50%", "150%"]);
  const scanOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.75, 0.85], [0, 0.4, 0.4, 0]);

  // Side decoration bars
  const barH = useTransform(scrollYProgress, [0.2, 0.5], ["0%", "60%"]);
  const barOpacity = useTransform(scrollYProgress, [0.15, 0.3, 0.7, 0.85], [0, 0.15, 0.15, 0]);

  // Horizontal lines that expand
  const line1W = useTransform(scrollYProgress, [0.2, 0.5], ["0%", "80%"]);
  const line2W = useTransform(scrollYProgress, [0.25, 0.55], ["0%", "60%"]);

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Side decorative bars */}
        <motion.div
          className="absolute left-8 top-1/2 -translate-y-1/2 w-px bg-foreground/20"
          style={{ height: barH, opacity: barOpacity }}
        />
        <motion.div
          className="absolute right-8 top-1/2 -translate-y-1/2 w-px bg-foreground/20"
          style={{ height: barH, opacity: barOpacity }}
        />

        {/* Horizontal accent lines */}
        <motion.div
          className="absolute top-[30%] left-1/2 -translate-x-1/2 h-px bg-foreground/10"
          style={{ width: line1W, opacity: mainOpacity }}
        />
        <motion.div
          className="absolute bottom-[30%] left-1/2 -translate-x-1/2 h-px bg-foreground/10"
          style={{ width: line2W, opacity: mainOpacity }}
        />

        {/* Horizontal scan line */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent"
          style={{ top: scanY, opacity: scanOpacity }}
        />

        {/* Main text — clean monochrome */}
        <motion.div
          className="relative z-10 flex items-center justify-center"
          style={{
            scale: mainScale,
            opacity: mainOpacity,
            filter: useTransform(mainBlur, (v) => `blur(${v}px)`),
          }}
        >
          <motion.span
            className="text-display text-foreground/[0.07] select-none whitespace-nowrap"
            style={{
              fontSize: "clamp(3rem, 12vw, 10rem)",
              letterSpacing,
            }}
          >
            {text}
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
};

export default GlitchReveal;
