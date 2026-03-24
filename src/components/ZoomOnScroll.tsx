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

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.6]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ scale, opacity }}
    >
      {children}
    </motion.div>
  );
};

export default ZoomOnScroll;
