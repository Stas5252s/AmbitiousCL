import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type TransitionVariant = "glitch" | "shatter" | "vortex" | "pulse-ring" | "scanner";

const SectionTransition = ({ variant = "glitch" }: { variant?: TransitionVariant }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  if (variant === "glitch") {
    // Multiple horizontal lines that glitch in and out at different speeds
    const line1W = useTransform(scrollYProgress, [0.1, 0.3, 0.35, 0.5], ["0%", "70%", "20%", "100%"]);
    const line2W = useTransform(scrollYProgress, [0.15, 0.25, 0.4, 0.55], ["0%", "100%", "40%", "0%"]);
    const line3W = useTransform(scrollYProgress, [0.2, 0.45, 0.5, 0.6], ["0%", "50%", "90%", "0%"]);
    const line1X = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "30%"]);
    const line2X = useTransform(scrollYProgress, [0.15, 0.55], ["100%", "-20%"]);
    const masterOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.55, 0.65], [0, 1, 1, 0]);

    return (
      <section ref={ref} className="h-40 md:h-56 relative overflow-hidden flex flex-col items-center justify-center gap-3">
        <motion.div className="h-px bg-foreground/20 absolute top-[35%]" style={{ width: line1W, x: line1X, opacity: masterOpacity }} />
        <motion.div className="h-[2px] bg-primary/30 absolute top-[50%]" style={{ width: line2W, x: line2X, opacity: masterOpacity }} />
        <motion.div className="h-px bg-foreground/10 absolute top-[65%]" style={{ width: line3W, opacity: masterOpacity }} />
        {/* Glitch blocks */}
        <motion.div
          className="absolute w-16 h-4 bg-primary/5"
          style={{
            left: useTransform(scrollYProgress, [0.2, 0.5], ["10%", "80%"]),
            top: "40%",
            opacity: useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 0.8, 0, 0.4]),
            scaleX: useTransform(scrollYProgress, [0.2, 0.35, 0.5], [0.5, 2, 0.3]),
          }}
        />
        <motion.div
          className="absolute w-24 h-2 bg-foreground/5"
          style={{
            right: useTransform(scrollYProgress, [0.15, 0.55], ["5%", "60%"]),
            top: "55%",
            opacity: useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.45], [0, 0.6, 0, 0.3]),
          }}
        />
      </section>
    );
  }

  if (variant === "shatter") {
    // Grid of squares that explode outward
    const cells = Array.from({ length: 12 }, (_, i) => i);
    const masterOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.7, 0.8], [0, 1, 1, 0]);
    
    return (
      <section ref={ref} className="h-40 md:h-56 relative overflow-hidden flex items-center justify-center">
        <motion.div className="relative w-48 h-12 flex flex-wrap gap-1" style={{ opacity: masterOpacity }}>
          {cells.map((i) => {
            const row = Math.floor(i / 4);
            const col = i % 4;
            const angle = Math.atan2(row - 1, col - 1.5);
            const dist = 80 + (i % 3) * 40;
            const explodeX = Math.cos(angle) * dist;
            const explodeY = Math.sin(angle) * dist;
            
            return (
              <motion.div
                key={i}
                className="w-[22%] h-[45%] border border-muted-foreground/20"
                style={{
                  x: useTransform(scrollYProgress, [0.2, 0.45, 0.55, 0.8], [0, explodeX, explodeX, 0]),
                  y: useTransform(scrollYProgress, [0.2, 0.45, 0.55, 0.8], [0, explodeY, explodeY, 0]),
                  rotate: useTransform(scrollYProgress, [0.2, 0.45, 0.55, 0.8], [0, (i - 6) * 30, (i - 6) * 30, 0]),
                  scale: useTransform(scrollYProgress, [0.2, 0.45, 0.55, 0.8], [1, 0.5, 0.5, 1]),
                  opacity: useTransform(scrollYProgress, [0.2, 0.35, 0.65, 0.8], [0.3, 0.8, 0.8, 0.3]),
                }}
              />
            );
          })}
        </motion.div>
      </section>
    );
  }

  if (variant === "vortex") {
    // Concentric rotating rings
    const rings = [0, 1, 2, 3, 4];
    const masterOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.7, 0.85], [0, 1, 1, 0]);
    
    return (
      <section ref={ref} className="h-48 md:h-64 relative overflow-hidden flex items-center justify-center">
        <motion.div className="relative" style={{ opacity: masterOpacity }}>
          {rings.map((i) => {
            const size = 40 + i * 35;
            const direction = i % 2 === 0 ? 1 : -1;
            return (
              <motion.div
                key={i}
                className="absolute border border-muted-foreground/15"
                style={{
                  width: size,
                  height: size,
                  left: -size / 2,
                  top: -size / 2,
                  rotate: useTransform(scrollYProgress, [0, 1], [0, 360 * direction]),
                  scale: useTransform(scrollYProgress, [0.15, 0.4, 0.6, 0.85], [0, 1, 1, 0]),
                  borderRadius: i % 2 === 0 ? "0%" : "50%",
                }}
              />
            );
          })}
          {/* Center dot */}
          <motion.div
            className="absolute w-2 h-2 bg-primary/40 rounded-full"
            style={{
              left: -4,
              top: -4,
              scale: useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1.5, 0]),
            }}
          />
        </motion.div>
      </section>
    );
  }

  if (variant === "pulse-ring") {
    // Expanding ring pulse
    const ringCount = 5;
    const masterOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.75, 0.9], [0, 1, 1, 0]);
    
    return (
      <section ref={ref} className="h-40 md:h-56 relative overflow-hidden flex items-center justify-center">
        <motion.div className="relative" style={{ opacity: masterOpacity }}>
          {Array.from({ length: ringCount }, (_, i) => {
            const delay = i * 0.08;
            return (
              <motion.div
                key={i}
                className="absolute border border-primary/20 rounded-full"
                style={{
                  width: 20,
                  height: 20,
                  left: -10,
                  top: -10,
                  scale: useTransform(
                    scrollYProgress,
                    [0.15 + delay, 0.4 + delay, 0.6 + delay],
                    [0, 4 + i * 2, 6 + i * 3]
                  ),
                  opacity: useTransform(
                    scrollYProgress,
                    [0.15 + delay, 0.3 + delay, 0.55 + delay],
                    [0.6, 0.3, 0]
                  ),
                }}
              />
            );
          })}
          {/* Center flash */}
          <motion.div
            className="absolute w-3 h-3 bg-primary/50 rounded-full"
            style={{
              left: -6,
              top: -6,
              scale: useTransform(scrollYProgress, [0.1, 0.2, 0.4], [0, 1, 0]),
              opacity: useTransform(scrollYProgress, [0.1, 0.2, 0.35], [0, 1, 0]),
            }}
          />
        </motion.div>
      </section>
    );
  }

  // scanner - a line that sweeps across with a trailing glow
  const scanX = useTransform(scrollYProgress, [0.1, 0.5, 0.9], ["-10%", "50%", "110%"]);
  const scanOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.85, 0.95], [0, 1, 1, 0]);
  const trailW = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], ["0%", "40%", "40%", "0%"]);

  return (
    <section ref={ref} className="h-32 md:h-48 relative overflow-hidden flex items-center">
      {/* Trail */}
      <motion.div
        className="absolute h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent left-0"
        style={{ width: trailW, opacity: scanOpacity }}
      />
      {/* Scanner beam */}
      <motion.div
        className="absolute h-8 w-px"
        style={{
          left: scanX,
          opacity: scanOpacity,
          background: 'linear-gradient(to bottom, transparent, hsl(var(--primary) / 0.4), transparent)',
        }}
      />
      {/* Scan dot */}
      <motion.div
        className="absolute w-1.5 h-1.5 bg-primary/60 rounded-full"
        style={{
          left: scanX,
          opacity: scanOpacity,
          boxShadow: '0 0 12px hsl(var(--primary) / 0.4)',
        }}
      />
    </section>
  );
};

export default SectionTransition;
