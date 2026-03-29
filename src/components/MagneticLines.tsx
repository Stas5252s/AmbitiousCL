import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const LINE_COUNT = 18;

const MagneticLines = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const masterOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <motion.div className="absolute inset-0" style={{ opacity: masterOpacity }}>
          {Array.from({ length: LINE_COUNT }, (_, i) => {
            const angle = (i / LINE_COUNT) * 360;
            const rad = (angle * Math.PI) / 180;
            const startX = 50 + Math.cos(rad) * 60;
            const startY = 50 + Math.sin(rad) * 60;

            return (
              <motion.div
                key={i}
                className="absolute bg-foreground/[0.08]"
                style={{
                  left: `${startX}%`,
                  top: `${startY}%`,
                  width: "1px",
                  height: useTransform(
                    scrollYProgress,
                    [0.1 + i * 0.01, 0.35 + i * 0.005, 0.65 - i * 0.005, 0.9 - i * 0.01],
                    [0, 120 + i * 8, 120 + i * 8, 0]
                  ),
                  rotate: angle + 90,
                  transformOrigin: "top center",
                  x: useTransform(
                    scrollYProgress,
                    [0.15, 0.45, 0.55, 0.85],
                    [0, (50 - startX) * 0.7, (50 - startX) * 0.7, 0]
                  ),
                  y: useTransform(
                    scrollYProgress,
                    [0.15, 0.45, 0.55, 0.85],
                    [0, (50 - startY) * 0.7, (50 - startY) * 0.7, 0]
                  ),
                }}
              />
            );
          })}

          {/* Center convergence point */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              scale: useTransform(scrollYProgress, [0.3, 0.5, 0.5, 0.7], [0, 1, 1, 0]),
              opacity: useTransform(scrollYProgress, [0.3, 0.45, 0.55, 0.7], [0, 0.6, 0.6, 0]),
            }}
          >
            <div className="w-2 h-2 bg-foreground/30" />
          </motion.div>

          {/* Radiating rings */}
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-foreground/[0.04]"
              style={{
                width: ring * 180,
                height: ring * 180,
                borderRadius: "0%",
                rotate: useTransform(scrollYProgress, [0.2, 0.8], [0, 45 * ring]),
                scale: useTransform(
                  scrollYProgress,
                  [0.15 + ring * 0.05, 0.4 + ring * 0.03, 0.6 - ring * 0.03, 0.85 - ring * 0.05],
                  [0, 1, 1, 0]
                ),
                opacity: useTransform(
                  scrollYProgress,
                  [0.2 + ring * 0.05, 0.35 + ring * 0.03, 0.65 - ring * 0.03, 0.8 - ring * 0.05],
                  [0, 0.3, 0.3, 0]
                ),
              }}
            />
          ))}
        </motion.div>

        {/* Center text that fades in at convergence */}
        <motion.div
          className="relative z-10 text-center"
          style={{
            opacity: useTransform(scrollYProgress, [0.35, 0.48, 0.52, 0.65], [0, 1, 1, 0]),
            scale: useTransform(scrollYProgress, [0.35, 0.48, 0.52, 0.65], [0.5, 1, 1, 0.5]),
            filter: useTransform(
              useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [20, 0, 0, 20]),
              (v: number) => `blur(${v}px)`
            ),
          }}
        >
          <p className="font-mono-label text-foreground/40 mb-3">CONVERGENCE</p>
          <h2
            className="text-display text-foreground"
            style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}
          >
            EVERYTHING
          </h2>
          <h2
            className="text-display text-foreground/60"
            style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}
          >
            CONNECTS
          </h2>
        </motion.div>
      </div>
    </section>
  );
};

export default MagneticLines;
