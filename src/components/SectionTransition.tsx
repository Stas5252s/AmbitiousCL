import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type TransitionVariant = "glitch" | "shatter" | "scanner" | "crosshair" | "waveform";

const SectionTransition = ({ variant = "glitch" }: { variant?: TransitionVariant }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  if (variant === "glitch") {
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
        <motion.div
          className="absolute w-16 h-4 bg-primary/5"
          style={{
            left: useTransform(scrollYProgress, [0.2, 0.5], ["10%", "80%"]),
            top: "40%",
            opacity: useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 0.8, 0, 0.4]),
            scaleX: useTransform(scrollYProgress, [0.2, 0.35, 0.5], [0.5, 2, 0.3]),
          }}
        />
      </section>
    );
  }

  if (variant === "shatter") {
    // Grid fragments that scatter apart
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

  if (variant === "crosshair") {
    // Crosshair / targeting lines that converge
    const masterOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.7, 0.85], [0, 1, 1, 0]);
    const lineLen = useTransform(scrollYProgress, [0.15, 0.45], ["0%", "45%"]);
    const gap = useTransform(scrollYProgress, [0.15, 0.4, 0.6, 0.85], [80, 0, 0, 80]);
    const dotScale = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0]);

    return (
      <section ref={ref} className="h-40 md:h-56 relative overflow-hidden flex items-center justify-center">
        <motion.div className="relative" style={{ opacity: masterOpacity }}>
          {/* Horizontal lines */}
          <motion.div className="absolute h-px bg-foreground/20" style={{ width: lineLen, right: "50%", top: 0, x: useTransform(gap, v => -v) }} />
          <motion.div className="absolute h-px bg-foreground/20" style={{ width: lineLen, left: "50%", top: 0, x: gap }} />
          {/* Vertical lines */}
          <motion.div className="absolute w-px bg-foreground/20" style={{ height: lineLen, bottom: "50%", left: 0, y: useTransform(gap, v => -v) }} />
          <motion.div className="absolute w-px bg-foreground/20" style={{ height: lineLen, top: "50%", left: 0, y: gap }} />
          {/* Center dot */}
          <motion.div
            className="absolute w-1.5 h-1.5 bg-foreground/40 -translate-x-1/2 -translate-y-1/2"
            style={{ scale: dotScale, left: 0, top: 0 }}
          />
        </motion.div>
      </section>
    );
  }

  if (variant === "waveform") {
    // Audio waveform-like bars
    const barCount = 24;
    const masterOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.75, 0.9], [0, 1, 1, 0]);

    return (
      <section ref={ref} className="h-40 md:h-56 relative overflow-hidden flex items-center justify-center">
        <motion.div className="flex items-center gap-[3px] h-16" style={{ opacity: masterOpacity }}>
          {Array.from({ length: barCount }, (_, i) => {
            const center = barCount / 2;
            const distFromCenter = Math.abs(i - center) / center;
            const maxH = 1 - distFromCenter * 0.7;
            const delay = i * 0.015;

            return (
              <motion.div
                key={i}
                className="w-[2px] bg-foreground/20"
                style={{
                  height: useTransform(
                    scrollYProgress,
                    [0.1 + delay, 0.3 + delay, 0.5, 0.7 - delay, 0.9 - delay],
                    ["0%", `${maxH * 100}%`, `${maxH * 60}%`, `${maxH * 100}%`, "0%"]
                  ),
                }}
              />
            );
          })}
        </motion.div>
      </section>
    );
  }

  // scanner
  const scanX = useTransform(scrollYProgress, [0.1, 0.5, 0.9], ["-10%", "50%", "110%"]);
  const scanOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.85, 0.95], [0, 1, 1, 0]);
  const trailW = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], ["0%", "40%", "40%", "0%"]);

  return (
    <section ref={ref} className="h-32 md:h-48 relative overflow-hidden flex items-center">
      <motion.div
        className="absolute h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent left-0"
        style={{ width: trailW, opacity: scanOpacity }}
      />
      <motion.div
        className="absolute h-8 w-px"
        style={{
          left: scanX,
          opacity: scanOpacity,
          background: 'linear-gradient(to bottom, transparent, hsl(var(--primary) / 0.4), transparent)',
        }}
      />
      <motion.div
        className="absolute w-1.5 h-1.5 bg-primary/60"
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
