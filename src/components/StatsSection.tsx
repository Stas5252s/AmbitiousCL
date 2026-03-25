import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 150, suffix: "+", label: "Members" },
  { value: 40, suffix: "+", label: "Projects launched" },
  { value: 12, suffix: "", label: "Countries" },
];

const AnimatedNumber = ({
  value,
  suffix,
  scrollYProgress,
  startAt,
}: {
  value: number;
  suffix: string;
  scrollYProgress: any;
  startAt: number;
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const endAt = Math.min(startAt + 0.4, 1);

  const raw = useTransform(scrollYProgress, [startAt, endAt], [0, value]);
  const springVal = useSpring(raw, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const unsubscribe = springVal.on("change", (v) => {
      setDisplayValue(Math.round(v));
    });
    return unsubscribe;
  }, [springVal]);

  return (
    <span className="tabular-nums">
      {displayValue}{suffix}
    </span>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  });

  const containerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-16 border-y border-border">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 md:divide-x divide-border"
        style={{ opacity: containerOpacity }}
      >
        {stats.map((stat, i) => {
          const startAt = 0.1 + i * 0.15;
          return (
            <motion.div
              key={stat.label}
              className="text-center"
              style={{
                opacity: useTransform(scrollYProgress, [startAt, Math.min(startAt + 0.2, 1)], [0, 1]),
                y: useTransform(scrollYProgress, [startAt, Math.min(startAt + 0.2, 1)], [40, 0]),
              }}
            >
              <p
                className="text-display text-foreground mb-2"
                style={{ fontSize: "clamp(3rem, 8vw, 5rem)" }}
              >
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  scrollYProgress={scrollYProgress}
                  startAt={startAt}
                />
              </p>
              <p className="font-mono-label">{stat.label}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default StatsSection;
