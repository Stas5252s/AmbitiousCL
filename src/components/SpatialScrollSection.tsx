import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

const pillars = [
  {
    number: "01",
    title: "BUILD",
    description: "Ship products. Make money. No theory.",
    stat: "40+",
    statLabel: "projects shipped",
  },
  {
    number: "02",
    title: "EARN",
    description: "Revenue before graduation. Real income.",
    stat: "$2M+",
    statLabel: "combined revenue",
  },
  {
    number: "03",
    title: "CONNECT",
    description: "Builders only. No spectators allowed.",
    stat: "12",
    statLabel: "countries",
  },
  {
    number: "04",
    title: "LEAD",
    description: "Set the standard. Others follow.",
    stat: "150+",
    statLabel: "members",
  },
  {
    number: "05",
    title: "DISRUPT",
    description: "Break industries. Rewrite the rules.",
    stat: "8",
    statLabel: "industries entered",
  },
  {
    number: "06",
    title: "SCALE",
    description: "From zero to global. No ceiling.",
    stat: "3x",
    statLabel: "avg yearly growth",
  },
];

const SpatialScrollSection = () => {
  const ref = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(Math.floor(v * pillars.length), pillars.length - 1);
    setActiveIdx(Math.max(0, idx));
  });

  // Giant counter that shows active pillar number
  const counterY = useTransform(scrollYProgress, [0, 1], ["10%", "-80%"]);
  const counterOpacity = useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0, 0.04, 0.04, 0]);

  // Vertical progress
  const progressH = useTransform(scrollYProgress, [0.02, 0.95], ["0%", "100%"]);
  const progressOpacity = useTransform(scrollYProgress, [0, 0.05, 0.92, 1], [0, 0.4, 0.4, 0]);

  // Horizontal scanner line
  const scannerX = useTransform(scrollYProgress, [0, 1], ["-10%", "110%"]);
  const scannerOpacity = useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0, 0.15, 0.15, 0]);

  const step = 1 / pillars.length;

  return (
    <section ref={ref} className="relative" style={{ height: `${pillars.length * 120 + 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">

        {/* Giant background number */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ opacity: counterOpacity }}
        >
          <motion.span
            className="text-display text-foreground tabular-nums"
            style={{
              fontSize: "clamp(15rem, 45vw, 35rem)",
              y: counterY,
            }}
          >
            {String(activeIdx + 1).padStart(2, "0")}
          </motion.span>
        </motion.div>

        {/* Horizontal scanner beam */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 h-px w-[30%]"
          style={{
            left: scannerX,
            opacity: scannerOpacity,
            background: "linear-gradient(90deg, transparent, hsl(var(--foreground) / 0.3), transparent)",
          }}
        />

        {/* Left vertical progress rail */}
        <div className="absolute left-6 md:left-10 top-[15%] bottom-[15%] w-px bg-foreground/5">
          <motion.div
            className="w-full bg-foreground/30 origin-top"
            style={{ height: progressH, opacity: progressOpacity }}
          />
        </div>

        {/* Tick marks on rail */}
        {pillars.map((_, i) => {
          const tickPos = (i / (pillars.length - 1)) * 70 + 15;
          const tickStart = i * step;
          return (
            <motion.div
              key={`tick-${i}`}
              className="absolute left-5 md:left-9 w-3 h-px bg-foreground/30"
              style={{
                top: `${tickPos}%`,
                opacity: useTransform(scrollYProgress, [tickStart, tickStart + 0.05], [0, 0.5]),
                scaleX: useTransform(scrollYProgress, [tickStart, tickStart + 0.05], [0, 1]),
              }}
            />
          );
        })}

        {/* Section label */}
        <motion.p
          className="absolute top-8 left-12 md:left-24 font-mono-label"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.04], [0, 1]) }}
        >
          002 — Pillars
        </motion.p>

        {/* Active pillar counter - top right */}
        <motion.div
          className="absolute top-8 right-6 md:right-16 font-mono-label text-foreground/30"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.04, 0.95, 1], [0, 1, 1, 0]) }}
        >
          <span className="text-foreground/60">{String(activeIdx + 1).padStart(2, "0")}</span>
          <span className="mx-1">/</span>
          <span>{String(pillars.length).padStart(2, "0")}</span>
        </motion.div>

        {/* Main cards - 3-column grid for 6 cards */}
        <div className="w-full px-6 md:px-16 pl-12 md:pl-24 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {pillars.map((pillar, i) => {
              const cardStart = i * step + 0.02;
              const cardEnd = cardStart + step * 0.6;
              const lineEnd = cardStart + step * 0.4;
              const statStart = cardEnd;
              const statEnd = statStart + step * 0.25;

              return (
                <motion.div
                  key={pillar.number}
                  className="relative"
                  style={{
                    opacity: useTransform(scrollYProgress, [cardStart, cardEnd], [0, 1]),
                    y: useTransform(scrollYProgress, [cardStart, cardEnd], [120, 0]),
                    scale: useTransform(scrollYProgress, [cardStart, cardEnd], [0.85, 1]),
                    filter: useTransform(
                      useTransform(scrollYProgress, [cardStart, cardEnd], [25, 0]),
                      (v: number) => `blur(${v}px)`
                    ),
                  }}
                >
                  {/* Accent line draws in */}
                  <motion.div
                    className="h-px bg-foreground/20 mb-5"
                    style={{
                      width: useTransform(scrollYProgress, [cardStart, lineEnd], ["0%", "100%"]),
                      transformOrigin: "left",
                    }}
                  />

                  {/* Number */}
                  <motion.span
                    className="font-mono-label text-foreground/15 text-[10px] block mb-3"
                    style={{
                      opacity: useTransform(scrollYProgress, [cardStart, cardEnd], [0, 0.6]),
                    }}
                  >
                    {pillar.number}
                  </motion.span>

                  {/* Title with massive scale entrance */}
                  <motion.h3
                    className="text-display text-foreground mb-3"
                    style={{
                      fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
                      scale: useTransform(scrollYProgress, [cardStart, cardEnd], [0.7, 1]),
                      x: useTransform(scrollYProgress, [cardStart, cardEnd], [-30, 0]),
                    }}
                  >
                    {pillar.title}
                  </motion.h3>

                  {/* Description - short and rough */}
                  <motion.p
                    className="text-muted-foreground text-sm leading-relaxed mb-5"
                    style={{
                      opacity: useTransform(scrollYProgress, [cardStart + 0.02, cardEnd], [0, 1]),
                      y: useTransform(scrollYProgress, [cardStart + 0.02, cardEnd], [20, 0]),
                    }}
                  >
                    {pillar.description}
                  </motion.p>

                  {/* Stat reveal */}
                  <motion.div
                    className="border-t border-foreground/10 pt-3"
                    style={{
                      opacity: useTransform(scrollYProgress, [statStart, statEnd], [0, 1]),
                      y: useTransform(scrollYProgress, [statStart, statEnd], [15, 0]),
                    }}
                  >
                    <span className="text-display text-foreground text-xl md:text-2xl block">
                      {pillar.stat}
                    </span>
                    <span className="font-mono-label text-[10px] text-muted-foreground mt-1 block">
                      {pillar.statLabel}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Floating geometric accents */}
        <motion.div
          className="absolute top-[15%] right-[6%] w-px bg-foreground/10"
          style={{
            height: useTransform(scrollYProgress, [0.1, 0.5], [0, 150]),
            opacity: useTransform(scrollYProgress, [0.1, 0.2, 0.85, 0.95], [0, 0.25, 0.25, 0]),
          }}
        />
        <motion.div
          className="absolute bottom-[18%] right-[10%] h-px bg-foreground/10"
          style={{
            width: useTransform(scrollYProgress, [0.3, 0.65], [0, 100]),
            opacity: useTransform(scrollYProgress, [0.3, 0.4, 0.85, 0.95], [0, 0.2, 0.2, 0]),
          }}
        />
        {/* Crosshair accent */}
        <motion.div
          className="absolute bottom-[30%] right-[4%]"
          style={{
            opacity: useTransform(scrollYProgress, [0.4, 0.5, 0.8, 0.9], [0, 0.15, 0.15, 0]),
          }}
        >
          <div className="relative w-10 h-10">
            <motion.div
              className="absolute top-1/2 left-0 w-full h-px bg-foreground/20"
              style={{ scaleX: useTransform(scrollYProgress, [0.4, 0.55], [0, 1]) }}
            />
            <motion.div
              className="absolute left-1/2 top-0 h-full w-px bg-foreground/20"
              style={{ scaleY: useTransform(scrollYProgress, [0.45, 0.6], [0, 1]) }}
            />
          </div>
        </motion.div>

        {/* Diagonal slash accent */}
        <motion.div
          className="absolute top-[35%] right-[15%] w-px bg-foreground/8 origin-top"
          style={{
            height: 60,
            rotate: 45,
            scaleY: useTransform(scrollYProgress, [0.2, 0.45], [0, 1]),
            opacity: useTransform(scrollYProgress, [0.2, 0.3, 0.75, 0.9], [0, 0.2, 0.2, 0]),
          }}
        />
      </div>
    </section>
  );
};

export default SpatialScrollSection;
