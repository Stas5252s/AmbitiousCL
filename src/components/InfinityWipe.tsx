import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const InfinityWipe = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Massive horizontal wipe bars that reveal content
  const wipe1 = useTransform(scrollYProgress, [0.05, 0.35], ["-100%", "0%"]);
  const wipe2 = useTransform(scrollYProgress, [0.1, 0.4], ["100%", "0%"]);
  const wipe3 = useTransform(scrollYProgress, [0.15, 0.45], ["-100%", "0%"]);
  const wipe4 = useTransform(scrollYProgress, [0.2, 0.5], ["100%", "0%"]);
  const wipe5 = useTransform(scrollYProgress, [0.25, 0.55], ["-100%", "0%"]);

  const exitWipe = useTransform(scrollYProgress, [0.6, 0.9], ["0%", "100%"]);
  const masterOp = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);

  const bars = [
    { x: wipe1, h: "8%" },
    { x: wipe2, h: "15%" },
    { x: wipe3, h: "25%" },
    { x: wipe4, h: "12%" },
    { x: wipe5, h: "6%" },
  ];

  // Accumulate tops
  const tops = ["10%", "22%", "42%", "70%", "85%"];

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="absolute inset-0" style={{ opacity: masterOp }}>
          {bars.map((bar, i) => (
            <motion.div
              key={i}
              className="absolute left-0 w-full bg-foreground/[0.03]"
              style={{
                top: tops[i],
                height: bar.h,
                x: bar.x,
              }}
            >
              <motion.div
                className="absolute bottom-0 left-0 w-full h-px bg-foreground/10"
                style={{
                  scaleX: useTransform(
                    scrollYProgress,
                    [0.1 + i * 0.05, 0.4 + i * 0.03],
                    [0, 1]
                  ),
                  transformOrigin: i % 2 === 0 ? "left" : "right",
                }}
              />
            </motion.div>
          ))}

          {/* Vertical scan line */}
          <motion.div
            className="absolute top-0 h-full w-px bg-foreground/15"
            style={{
              left: useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]),
              opacity: useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [0, 0.3, 0.3, 0]),
            }}
          />

          {/* Exit: bars slide away */}
          <motion.div
            className="absolute inset-0 bg-background"
            style={{
              x: exitWipe,
              opacity: useTransform(scrollYProgress, [0.6, 0.65], [0, 1]),
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default InfinityWipe;
