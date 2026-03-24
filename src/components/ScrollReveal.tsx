import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  blur?: boolean;
}

const ScrollReveal = ({ children, className = "", delay = 0, blur = true }: ScrollRevealProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.5"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const filter = useTransform(scrollYProgress, [0, 1], blur ? ["blur(12px)", "blur(0px)"] : ["blur(0px)", "blur(0px)"]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        opacity,
        y,
        filter,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
