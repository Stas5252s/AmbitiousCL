import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const pillars = [
  {
    num: "01",
    title: "Build",
    desc: "Launch real projects. Ship products. Generate revenue before you graduate.",
  },
  {
    num: "02",
    title: "Connect",
    desc: "Find your co-founders, mentors, and first customers inside the network.",
  },
  {
    num: "03",
    title: "Learn",
    desc: "Access resources, playbooks, and strategies from members who've done it.",
  },
];

const PillarCard = ({
  pillar,
  index,
  scrollYProgress,
}: {
  pillar: (typeof pillars)[0];
  index: number;
  scrollYProgress: any;
}) => {
  const start = 0.1 + index * 0.2;
  const end = Math.min(start + 0.35, 1);
  const mid = Math.min(start + 0.15, 1);

  const opacity = useTransform(scrollYProgress, [start, mid], [0, 1]);
  const y = useTransform(scrollYProgress, [start, mid], [80, 0]);
  const rotateX = useTransform(scrollYProgress, [start, mid, end], [15, 0, -5]);
  const scale = useTransform(scrollYProgress, [start, mid], [0.9, 1]);
  const blur = useTransform(scrollYProgress, [start, mid], [10, 0]);

  // Accent line that expands
  const lineWidth = useTransform(scrollYProgress, [mid, end], ["0%", "100%"]);

  return (
    <motion.div
      className="bg-background p-8 md:p-12 relative"
      style={{
        opacity,
        y,
        rotateX,
        scale,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
        transformPerspective: 800,
        transformOrigin: "bottom center",
      }}
    >
      <span className="font-mono-label text-primary">{pillar.num}</span>
      <h3 className="text-headline text-foreground text-3xl md:text-4xl mt-4 mb-6">
        {pillar.title}
      </h3>
      <p className="text-muted-foreground leading-relaxed text-sm">
        {pillar.desc}
      </p>
      {/* Animated bottom accent */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-primary/40"
        style={{ width: lineWidth }}
      />
    </motion.div>
  );
};

const PillarsSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  });

  const labelOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const labelY = useTransform(scrollYProgress, [0, 0.15], [30, 0]);

  return (
    <section ref={ref} id="pillars" className="py-32 md:py-48 px-6 md:px-16">
      <motion.p
        className="font-mono-label mb-16"
        style={{ opacity: labelOpacity, y: labelY }}
      >
        002 — The Pillars
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
        {pillars.map((p, i) => (
          <PillarCard
            key={p.num}
            pillar={p}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
};

export default PillarsSection;
