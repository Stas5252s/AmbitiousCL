import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HorizontalReveal = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["100%", "-100%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-80%", "80%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      <motion.div className="whitespace-nowrap" style={{ x, opacity }}>
        <span
          className="text-display text-foreground/[0.05] select-none"
          style={{ fontSize: "clamp(5rem, 15vw, 14rem)" }}
        >
          HUSTLE · BUILD · EARN · CONNECT · REPEAT ·
        </span>
      </motion.div>
      <motion.div className="whitespace-nowrap mt-4" style={{ x: x2, opacity }}>
        <span
          className="text-display text-primary/[0.08] select-none"
          style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
        >
          WEALTH · VISION · EMPIRE · NETWORK · GROWTH · AMBITION ·
        </span>
      </motion.div>
    </section>
  );
};

export default HorizontalReveal;
