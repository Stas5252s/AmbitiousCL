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
    description: "Builders only. No spectators.",
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
    description: "Break industries. Rewrite rules.",
    stat: "8",
    statLabel: "industries entered",
  },
  {
    number: "06",
    title: "SCALE",
    description: "Zero to global. No ceiling.",
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

  // Giant background number
  const counterOpacity = useTransform(scrollYProgress, [0, 0.04, 0.92, 1], [0, 0.04, 0.04, 0]);

  // Vertical progress rail
  const progressH = useTransform(scrollYProgress, [0.02, 0.9], ["0%", "100%"]);
  const progressOp = useTransform(scrollYProgress, [0, 0.04, 0.92, 1], [0, 0.4, 0.4, 0]);

  // Scanner beam sweeps across
  const scannerX = useTransform(scrollYProgress, [0, 1], ["-15%", "115%"]);
  const scannerOp = useTransform(scrollYProgress, [0, 0.04, 0.92, 1], [0, 0.12, 0.12, 0]);

  // Perspective tilt of entire card grid
  const gridRotateX = useTransform(scrollYProgress, [0, 0.08, 0.5, 0.92, 1], [8, 0, 0, 0, -5]);
  const gridRotateY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [3, 0, 0, -3]);
  const gridScale = useTransform(scrollYProgress, [0, 0.06, 0.92, 1], [0.92, 1, 1, 0.95]);

  // Row 1 (cards 0-2): appear early, Row 2 (cards 3-5): appear after
  const row1Range = [0.03, 0.25]; // row 1 fully visible by 25%
  const row2Range = [0.25, 0.50]; // row 2 fully visible by 50%

  return (
    <section ref={ref} className="relative h-[450vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center" style={{ perspective: "1200px" }}>

        {/* Giant background counter */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ opacity: counterOpacity }}
        >
          <span
            className="text-display text-foreground tabular-nums"
            style={{ fontSize: "clamp(18rem, 50vw, 40rem)" }}
          >
            {String(activeIdx + 1).padStart(2, "0")}
          </span>
        </motion.div>

        {/* Horizontal scanner beam */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 h-px w-[35%]"
          style={{
            left: scannerX,
            opacity: scannerOp,
            background: "linear-gradient(90deg, transparent, hsl(var(--foreground) / 0.25), transparent)",
          }}
        />

        {/* Second scanner (slower, offset) */}
        <motion.div
          className="absolute top-[35%] h-px w-[20%]"
          style={{
            right: scannerX,
            opacity: useTransform(scrollYProgress, [0.1, 0.15, 0.85, 0.95], [0, 0.08, 0.08, 0]),
            background: "linear-gradient(90deg, transparent, hsl(var(--foreground) / 0.15), transparent)",
          }}
        />

        {/* Left vertical progress rail */}
        <div className="absolute left-6 md:left-10 top-[12%] bottom-[12%] w-px bg-foreground/5">
          <motion.div className="w-full bg-foreground/30 origin-top" style={{ height: progressH, opacity: progressOp }} />
        </div>

        {/* Tick marks */}
        {pillars.map((_, i) => {
          const tickPos = (i / (pillars.length - 1)) * 76 + 12;
          const t = i < 3 ? row1Range[0] + (i / 3) * (row1Range[1] - row1Range[0]) : row2Range[0] + ((i - 3) / 3) * (row2Range[1] - row2Range[0]);
          return (
            <motion.div
              key={`tick-${i}`}
              className="absolute left-5 md:left-9 w-3 h-px bg-foreground/30"
              style={{
                top: `${tickPos}%`,
                opacity: useTransform(scrollYProgress, [t, t + 0.04], [0, 0.5]),
                scaleX: useTransform(scrollYProgress, [t, t + 0.04], [0, 1]),
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

        {/* Counter display top right */}
        <motion.div
          className="absolute top-8 right-6 md:right-16 font-mono-label text-foreground/30"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.04, 0.95, 1], [0, 1, 1, 0]) }}
        >
          <span className="text-foreground/60 tabular-nums">{String(activeIdx + 1).padStart(2, "0")}</span>
          <span className="mx-1">/</span>
          <span className="tabular-nums">{String(pillars.length).padStart(2, "0")}</span>
        </motion.div>

        {/* Bottom progress bar */}
        <motion.div
          className="absolute bottom-10 left-12 md:left-24 right-12 md:right-24 h-px bg-foreground/5"
          style={{ opacity: progressOp }}
        >
          <motion.div
            className="h-full bg-foreground/20 origin-left"
            style={{ width: useTransform(scrollYProgress, [0.03, 0.9], ["0%", "100%"]) }}
          />
        </motion.div>
        <motion.span
          className="absolute bottom-6 left-12 md:left-24 font-mono-label text-[9px] text-foreground/20"
          style={{ opacity: progressOp }}
        >
          SCROLL
        </motion.span>

        {/* Card grid with 3D perspective tilt */}
        <motion.div
          className="w-full px-6 md:px-16 pl-12 md:pl-24"
          style={{
            rotateX: gridRotateX,
            rotateY: gridRotateY,
            scale: gridScale,
            transformStyle: "preserve-3d",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10 md:gap-y-12">
            {pillars.map((pillar, i) => {
              const isRow1 = i < 3;
              const rowIdx = isRow1 ? i : i - 3;
              const range = isRow1 ? row1Range : row2Range;
              const cardStart = range[0] + (rowIdx / 3) * (range[1] - range[0]);
              const cardEnd = cardStart + 0.08;
              const statEnd = cardEnd + 0.06;

              // Stagger direction: odd cards come from right, even from left
              const xDir = i % 2 === 0 ? -40 : 40;

              return (
                <motion.div
                  key={pillar.number}
                  className="relative"
                  style={{
                    opacity: useTransform(scrollYProgress, [cardStart, cardEnd], [0, 1]),
                    y: useTransform(scrollYProgress, [cardStart, cardEnd], [80, 0]),
                    x: useTransform(scrollYProgress, [cardStart, cardEnd], [xDir, 0]),
                    scale: useTransform(scrollYProgress, [cardStart, cardEnd], [0.8, 1]),
                    rotateY: useTransform(scrollYProgress, [cardStart, cardEnd], [i % 2 === 0 ? -8 : 8, 0]),
                    filter: useTransform(
                      useTransform(scrollYProgress, [cardStart, cardEnd], [20, 0]),
                      (v: number) => `blur(${v}px)`
                    ),
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Top line draws in */}
                  <motion.div
                    className="h-px bg-foreground/20 mb-5"
                    style={{
                      width: useTransform(scrollYProgress, [cardStart, cardEnd], ["0%", "100%"]),
                      transformOrigin: i % 2 === 0 ? "left" : "right",
                    }}
                  />

                  <motion.span
                    className="font-mono-label text-foreground/15 text-[10px] block mb-3"
                    style={{ opacity: useTransform(scrollYProgress, [cardStart, cardEnd], [0, 0.6]) }}
                  >
                    {pillar.number}
                  </motion.span>

                  <motion.h3
                    className="text-display text-foreground mb-3"
                    style={{
                      fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                      scale: useTransform(scrollYProgress, [cardStart, cardEnd], [0.6, 1]),
                    }}
                  >
                    {pillar.title}
                  </motion.h3>

                  <motion.p
                    className="text-muted-foreground text-sm leading-relaxed mb-5"
                    style={{
                      opacity: useTransform(scrollYProgress, [cardStart + 0.02, cardEnd + 0.02], [0, 1]),
                    }}
                  >
                    {pillar.description}
                  </motion.p>

                  <motion.div
                    className="border-t border-foreground/10 pt-3"
                    style={{
                      opacity: useTransform(scrollYProgress, [cardEnd, statEnd], [0, 1]),
                      y: useTransform(scrollYProgress, [cardEnd, statEnd], [10, 0]),
                    }}
                  >
                    <span className="text-display text-foreground text-xl md:text-2xl block tabular-nums">
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
        </motion.div>

        {/* Floating geometric accents */}
        <motion.div
          className="absolute top-[14%] right-[5%] w-px bg-foreground/10"
          style={{
            height: useTransform(scrollYProgress, [0.08, 0.4], [0, 180]),
            opacity: useTransform(scrollYProgress, [0.08, 0.15, 0.85, 0.95], [0, 0.25, 0.25, 0]),
          }}
        />
        <motion.div
          className="absolute bottom-[16%] right-[8%] h-px bg-foreground/10"
          style={{
            width: useTransform(scrollYProgress, [0.25, 0.55], [0, 120]),
            opacity: useTransform(scrollYProgress, [0.25, 0.35, 0.85, 0.95], [0, 0.2, 0.2, 0]),
          }}
        />
        {/* Crosshair */}
        <motion.div
          className="absolute bottom-[28%] right-[3%]"
          style={{ opacity: useTransform(scrollYProgress, [0.35, 0.45, 0.8, 0.9], [0, 0.15, 0.15, 0]) }}
        >
          <div className="relative w-12 h-12">
            <motion.div
              className="absolute top-1/2 left-0 w-full h-px bg-foreground/15"
              style={{ scaleX: useTransform(scrollYProgress, [0.35, 0.5], [0, 1]) }}
            />
            <motion.div
              className="absolute left-1/2 top-0 h-full w-px bg-foreground/15"
              style={{ scaleY: useTransform(scrollYProgress, [0.38, 0.53], [0, 1]) }}
            />
          </div>
        </motion.div>

        {/* Diagonal slashes */}
        <motion.div
          className="absolute top-[30%] right-[14%] w-px origin-top"
          style={{
            height: 70,
            rotate: 35,
            background: "hsl(var(--foreground) / 0.08)",
            scaleY: useTransform(scrollYProgress, [0.15, 0.4], [0, 1]),
            opacity: useTransform(scrollYProgress, [0.15, 0.25, 0.8, 0.9], [0, 0.2, 0.2, 0]),
          }}
        />
        <motion.div
          className="absolute bottom-[35%] right-[18%] w-px origin-bottom"
          style={{
            height: 50,
            rotate: -25,
            background: "hsl(var(--foreground) / 0.06)",
            scaleY: useTransform(scrollYProgress, [0.4, 0.6], [0, 1]),
            opacity: useTransform(scrollYProgress, [0.4, 0.5, 0.75, 0.9], [0, 0.15, 0.15, 0]),
          }}
        />
      </div>
    </section>
  );
};

export default SpatialScrollSection;
