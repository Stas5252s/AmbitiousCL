import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const NumbersReveal = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const numbers = ["001", "002", "003", "004"];

  return (
    <section ref={ref} className="relative h-32 overflow-hidden flex items-center px-6 md:px-16">
      <div className="flex w-full justify-between">
        {numbers.map((num, i) => {
          const start = 0.1 + i * 0.12;
          const end = Math.min(start + 0.2, 0.99);

          return (
            <motion.span
              key={num}
              className="font-mono-label text-primary/30"
              style={{
                opacity: useTransform(scrollYProgress, [start, end], [0, 0.5]),
                y: useTransform(scrollYProgress, [start, end], [20, 0]),
                scale: useTransform(scrollYProgress, [start, end], [0.5, 1]),
              }}
            >
              {num}
            </motion.span>
          );
        })}
      </div>
    </section>
  );
};

export default NumbersReveal;
