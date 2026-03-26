import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type TransitionVariant = "wipe" | "converge" | "diamond" | "slash";

const SectionTransition = ({ variant = "wipe" }: { variant?: TransitionVariant }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  if (variant === "converge") {
    const leftW = useTransform(scrollYProgress, [0.2, 0.5, 0.8], ["0%", "50%", "0%"]);
    const rightW = useTransform(scrollYProgress, [0.2, 0.5, 0.8], ["0%", "50%", "0%"]);
    const lineOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);

    return (
      <section ref={ref} className="h-32 md:h-48 relative overflow-hidden flex items-center">
        <motion.div
          className="absolute left-0 h-px bg-muted-foreground/20"
          style={{ width: leftW, opacity: lineOpacity }}
        />
        <motion.div
          className="absolute right-0 h-px bg-muted-foreground/20"
          style={{ width: rightW, opacity: lineOpacity }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary/30 rounded-full"
          style={{ opacity: lineOpacity, scale: useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]) }}
        />
      </section>
    );
  }

  if (variant === "diamond") {
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
    const scale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
    const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 0.15, 0.15, 0]);

    return (
      <section ref={ref} className="h-32 md:h-48 relative overflow-hidden flex items-center justify-center">
        <motion.div
          className="w-12 h-12 border border-muted-foreground/20"
          style={{ rotate, scale, opacity }}
        />
      </section>
    );
  }

  if (variant === "slash") {
    const x = useTransform(scrollYProgress, [0.1, 0.5, 0.9], ["-100%", "0%", "100%"]);
    const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 0.3, 0.3, 0]);

    return (
      <section ref={ref} className="h-24 md:h-32 relative overflow-hidden flex items-center justify-center">
        <motion.div
          className="w-full h-px bg-gradient-to-r from-transparent via-muted-foreground/20 to-transparent"
          style={{ x, opacity }}
        />
      </section>
    );
  }

  // Default: wipe
  const width = useTransform(scrollYProgress, [0.2, 0.5, 0.8], ["0%", "100%", "0%"]);
  const wipeOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="h-24 md:h-32 relative overflow-hidden flex items-center px-6 md:px-16">
      <motion.div
        className="h-px bg-border"
        style={{ width, opacity: wipeOpacity }}
      />
    </section>
  );
};

export default SectionTransition;
