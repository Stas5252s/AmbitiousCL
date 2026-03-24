import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const SpatialScrollSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const z1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const z2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const z3 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, -3]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, 2]);
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [150, -50]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 0.95]);
  const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 1.05]);

  const words = ["WEALTH", "VISION", "EMPIRE"];

  return (
    <section
      ref={ref}
      className="relative py-48 md:py-64 overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* Floating spatial elements */}
      <motion.div
        className="absolute top-1/4 left-[10%] w-48 h-48 border border-border opacity-20"
        style={{ y: y1, scale: scale1, rotateZ: rotate1, translateZ: z1 }}
      />
      <motion.div
        className="absolute top-1/3 right-[15%] w-32 h-32 bg-primary/5"
        style={{ y: y2, scale: scale2, rotateZ: rotate2, translateZ: z2 }}
      />
      <motion.div
        className="absolute bottom-1/4 left-[20%] w-px h-64 bg-muted-foreground/10"
        style={{ y: y3, translateZ: z3 }}
      />

      <div className="relative z-10 px-6 md:px-16 flex flex-col items-center gap-8">
        {words.map((word, i) => {
          const yWord = useTransform(scrollYProgress, [0, 1], [80 * (i + 1), -40 * (i + 1)]);
          const opacityWord = useTransform(scrollYProgress, [0.1 + i * 0.1, 0.3 + i * 0.1, 0.7, 0.9], [0, 1, 1, 0.3]);
          const scaleWord = useTransform(scrollYProgress, [0.1 + i * 0.1, 0.4 + i * 0.1], [0.85, 1]);

          return (
            <motion.span
              key={word}
              className="text-display text-foreground/10 block"
              style={{
                y: yWord,
                opacity: opacityWord,
                scale: scaleWord,
                fontSize: "clamp(3rem, 12vw, 9rem)",
              }}
            >
              {word}
            </motion.span>
          );
        })}
      </div>
    </section>
  );
};

export default SpatialScrollSection;
