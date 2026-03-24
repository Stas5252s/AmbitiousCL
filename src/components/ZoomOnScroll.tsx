import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ZoomOnScrollProps {
  children: React.ReactNode;
  className?: string;
}

const ZoomOnScroll = ({ children, className = "" }: ZoomOnScrollProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.6, 1.05, 1.05, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [0, 1, 1, 0.3]);
  const rotateX = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [8, 0, 0, -5]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ scale, opacity, rotateX, perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
};

export default ZoomOnScroll;
