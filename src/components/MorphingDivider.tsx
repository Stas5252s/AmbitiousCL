import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const MorphingDivider = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const width1 = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "100%", "0%"]);
  const width2 = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], ["100%", "0%", "0%", "100%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const y1 = useTransform(scrollYProgress, [0, 0.5, 1], [0, -20, 0]);
  const y2 = useTransform(scrollYProgress, [0, 0.5, 1], [0, 20, 0]);

  return (
    <section ref={ref} className="py-16 px-6 md:px-16 overflow-hidden">
      <div className="relative h-24 flex flex-col items-center justify-center gap-3">
        <motion.div
          className="h-px bg-primary/20"
          style={{ width: width1, y: y1 }}
        />
        <motion.div
          className="w-3 h-3 border border-muted-foreground/20"
          style={{ rotate }}
        />
        <motion.div
          className="h-px bg-muted-foreground/15"
          style={{ width: width2, y: y2 }}
        />
      </div>
    </section>
  );
};

export default MorphingDivider;
