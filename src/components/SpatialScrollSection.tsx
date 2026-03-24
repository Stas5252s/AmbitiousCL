import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const SpatialWord = ({ word, index, scrollYProgress }: { word: string; index: number; scrollYProgress: any }) => {
  const y = useTransform(scrollYProgress, [0, 1], [80 * (index + 1), -40 * (index + 1)]);
  const opacity = useTransform(scrollYProgress, [0.1 + index * 0.1, 0.3 + index * 0.1, 0.7, 0.9], [0, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0.1 + index * 0.1, 0.4 + index * 0.1], [0.85, 1]);

  return (
    <motion.span
      className="text-display text-foreground/10 block"
      style={{
        y,
        opacity,
        scale,
        fontSize: "clamp(3rem, 12vw, 9rem)",
      }}
    >
      {word}
    </motion.span>
  );
};

const SpatialScrollSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [150, -50]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 0.95]);
  const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 1.05]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, -3]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, 2]);

  const words = ["WEALTH", "VISION", "EMPIRE"];

  return (
    <section
      ref={ref}
      className="relative py-48 md:py-64 overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        className="absolute top-1/4 left-[10%] w-48 h-48 border border-border opacity-20"
        style={{ y: y1, scale: scale1, rotateZ: rotate1 }}
      />
      <motion.div
        className="absolute top-1/3 right-[15%] w-32 h-32 bg-primary/5"
        style={{ y: y2, scale: scale2, rotateZ: rotate2 }}
      />
      <motion.div
        className="absolute bottom-1/4 left-[20%] w-px h-64 bg-muted-foreground/10"
        style={{ y: y3 }}
      />

      <div className="relative z-10 px-6 md:px-16 flex flex-col items-center gap-8">
        {words.map((word, i) => (
          <SpatialWord key={word} word={word} index={i} scrollYProgress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
};

export default SpatialScrollSection;
