import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const GlitchReveal = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const text = "AMBITIOUS";

  // Main text transforms
  const mainScale = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [3, 1, 1, 0.5]);
  const mainOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.9], [0, 1, 1, 0]);
  const mainBlur = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [30, 0, 0, 20]);
  const letterSpacing = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], ["0.8em", "0.15em", "0.15em", "0.5em"]);

  // Glitch layers
  const glitch1X = useTransform(scrollYProgress, [0.2, 0.25, 0.3, 0.35, 0.4], [0, -8, 5, -3, 0]);
  const glitch1Y = useTransform(scrollYProgress, [0.2, 0.25, 0.3, 0.35, 0.4], [0, 3, -5, 2, 0]);
  const glitch2X = useTransform(scrollYProgress, [0.2, 0.28, 0.33, 0.38, 0.4], [0, 6, -4, 7, 0]);
  const glitchOpacity = useTransform(scrollYProgress, [0.18, 0.22, 0.38, 0.42], [0, 0.3, 0.3, 0]);

  // Horizontal scan line
  const scanY = useTransform(scrollYProgress, [0.15, 0.85], ["-50%", "150%"]);
  const scanOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.75, 0.85], [0, 0.6, 0.6, 0]);

  // Side decoration bars
  const barH = useTransform(scrollYProgress, [0.2, 0.5], ["0%", "60%"]);
  const barOpacity = useTransform(scrollYProgress, [0.15, 0.3, 0.7, 0.85], [0, 0.2, 0.2, 0]);

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Side decorative bars */}
        <motion.div
          className="absolute left-8 top-1/2 -translate-y-1/2 w-px bg-primary/30"
          style={{ height: barH, opacity: barOpacity }}
        />
        <motion.div
          className="absolute right-8 top-1/2 -translate-y-1/2 w-px bg-primary/30"
          style={{ height: barH, opacity: barOpacity }}
        />

        {/* Horizontal scan line */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          style={{ top: scanY, opacity: scanOpacity }}
        />

        {/* Glitch layer 1 (red-shifted) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ x: glitch1X, y: glitch1Y, opacity: glitchOpacity }}
        >
          <span
            className="text-display select-none"
            style={{
              fontSize: "clamp(3rem, 12vw, 10rem)",
              color: "hsl(0 70% 50% / 0.15)",
              letterSpacing: "0.15em",
            }}
          >
            {text}
          </span>
        </motion.div>

        {/* Glitch layer 2 (blue-shifted) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ x: glitch2X, opacity: glitchOpacity }}
        >
          <span
            className="text-display select-none"
            style={{
              fontSize: "clamp(3rem, 12vw, 10rem)",
              color: "hsl(220 70% 50% / 0.15)",
              letterSpacing: "0.15em",
            }}
          >
            {text}
          </span>
        </motion.div>

        {/* Main text */}
        <motion.div
          className="relative z-10 flex items-center justify-center"
          style={{
            scale: mainScale,
            opacity: mainOpacity,
            filter: useTransform(mainBlur, (v) => `blur(${v}px)`),
          }}
        >
          <motion.span
            className="text-display text-foreground/[0.08] select-none whitespace-nowrap"
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
