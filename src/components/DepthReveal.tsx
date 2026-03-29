import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const DepthReveal = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Layers at different depths rush toward camera
  const layers = [
    { z: -800, text: "NETWORK", opacity: 0.03 },
    { z: -500, text: "AMBITION", opacity: 0.05 },
    { z: -200, text: "EMPIRE", opacity: 0.08 },
    { z: 0, text: "BUILD", opacity: 0.12 },
  ];

  const masterOp = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative h-[180vh]">
      <div
        className="sticky top-0 h-screen overflow-hidden flex items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        <motion.div className="absolute inset-0" style={{ opacity: masterOp }}>
          {layers.map((layer, i) => {
            const start = 0.05 + i * 0.08;
            const mid = start + 0.2;
            const end = mid + 0.25;

            return (
              <motion.div
                key={i}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  z: useTransform(scrollYProgress, [start, mid, end], [layer.z, layer.z + 300, layer.z + 900]),
                  opacity: useTransform(scrollYProgress, [start, mid, end], [0, layer.opacity, 0]),
                  scale: useTransform(scrollYProgress, [start, mid, end], [0.5, 1, 2.5]),
                }}
              >
                <span
                  className="text-display text-foreground select-none whitespace-nowrap"
                  style={{ fontSize: "clamp(4rem, 14vw, 12rem)" }}
                >
                  {layer.text}
                </span>
              </motion.div>
            );
          })}

          {/* Grid of dots that scale with depth */}
          {Array.from({ length: 25 }, (_, i) => {
            const row = Math.floor(i / 5);
            const col = i % 5;
            const x = 15 + col * 17.5;
            const y = 20 + row * 15;
            const delay = (row + col) * 0.015;

            return (
              <motion.div
                key={`dot-${i}`}
                className="absolute w-px h-px bg-foreground/20"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  scale: useTransform(
                    scrollYProgress,
                    [0.1 + delay, 0.3 + delay, 0.7 - delay, 0.9 - delay],
                    [0, 1, 1, 0]
                  ),
                  opacity: useTransform(
                    scrollYProgress,
                    [0.1 + delay, 0.25 + delay, 0.75 - delay, 0.9 - delay],
                    [0, 0.4, 0.4, 0]
                  ),
                }}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default DepthReveal;
