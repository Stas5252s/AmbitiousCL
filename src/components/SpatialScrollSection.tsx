import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const pillars = [
  {
    number: "01",
    title: "BUILD",
    description: "Launch real products. Ship code. Create value that outlasts the hype.",
    stat: "40+",
    statLabel: "projects shipped",
  },
  {
    number: "02",
    title: "EARN",
    description: "Revenue before graduation. No allowance needed. Real income, real impact.",
    stat: "$2M+",
    statLabel: "combined revenue",
  },
  {
    number: "03",
    title: "CONNECT",
    description: "Network with builders, not followers. Relationships that compound over decades.",
    stat: "12",
    statLabel: "countries",
  },
  {
    number: "04",
    title: "LEAD",
    description: "Set the standard. Others follow. Age is leverage, not limitation.",
    stat: "150+",
    statLabel: "members",
  },
];

const SpatialScrollSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Background giant text that scrolls through
  const bgTextY = useTransform(scrollYProgress, [0, 1], ["20%", "-60%"]);
  const bgTextOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 0.03, 0.03, 0]);

  // Horizontal progress line
  const progressW = useTransform(scrollYProgress, [0.05, 0.85], ["0%", "100%"]);
  const progressOpacity = useTransform(scrollYProgress, [0, 0.08, 0.9, 1], [0, 0.3, 0.3, 0]);

  // Vertical side ruler
  const rulerH = useTransform(scrollYProgress, [0.05, 0.8], ["0%", "70%"]);
  const rulerOpacity = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [0, 0.15, 0.15, 0]);

  // Active pillar index indicator
  const activeIndex = useTransform(scrollYProgress, [0.05, 0.23, 0.41, 0.59, 0.77], [0, 1, 2, 3, 3]);

  return (
    <section ref={ref} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Giant background watermark text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          style={{ opacity: bgTextOpacity }}
        >
          <motion.span
            className="text-display text-foreground whitespace-nowrap"
            style={{
              fontSize: "clamp(10rem, 30vw, 25rem)",
              y: bgTextY,
            }}
          >
            PILLARS
          </motion.span>
        </motion.div>

        {/* Left vertical ruler */}
        <motion.div
          className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 w-px bg-foreground/20"
          style={{ height: rulerH, opacity: rulerOpacity }}
        />
        {/* Ruler tick marks */}
        {[0, 1, 2, 3].map((i) => {
          const tickStart = 0.1 + i * 0.18;
          return (
            <motion.div
              key={`tick-${i}`}
              className="absolute left-5 md:left-9 w-3 h-px bg-foreground/30"
              style={{
                top: `${30 + i * 12}%`,
                opacity: useTransform(scrollYProgress, [tickStart, tickStart + 0.08], [0, 0.4]),
                scaleX: useTransform(scrollYProgress, [tickStart, tickStart + 0.08], [0, 1]),
              }}
            />
          );
        })}

        {/* Horizontal progress line at bottom */}
        <motion.div
          className="absolute bottom-16 left-6 md:left-16 h-px bg-foreground/15"
          style={{ width: progressW, opacity: progressOpacity }}
        />
        <motion.div
          className="absolute bottom-[52px] left-6 md:left-16"
          style={{ opacity: progressOpacity }}
        >
          <span className="font-mono-label text-[10px] text-muted-foreground">PROGRESS</span>
        </motion.div>

        {/* Main content */}
        <div className="w-full px-6 md:px-16 pl-12 md:pl-24">
          <motion.p
            className="font-mono-label mb-12"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.06], [0, 1]) }}
          >
            002 — Pillars
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
            {pillars.map((pillar, i) => {
              const start = 0.05 + i * 0.18;
              const end = start + 0.14;
              const lineEnd = start + 0.1;
              const statStart = end;
              const statEnd = statStart + 0.06;

              return (
                <motion.div
                  key={pillar.number}
                  className="relative"
                  style={{
                    opacity: useTransform(scrollYProgress, [start, end], [0, 1]),
                    y: useTransform(scrollYProgress, [start, end], [100, 0]),
                    filter: useTransform(
                      useTransform(scrollYProgress, [start, end], [20, 0]),
                      (v: number) => `blur(${v}px)`
                    ),
                  }}
                >
                  {/* Top horizontal accent line that draws in */}
                  <motion.div
                    className="h-px bg-foreground/20 mb-6"
                    style={{
                      width: useTransform(scrollYProgress, [start, lineEnd], ["0%", "100%"]),
                      transformOrigin: "left",
                    }}
                  />

                  {/* Number */}
                  <motion.span
                    className="font-mono-label text-foreground/20 text-xs block mb-4"
                    style={{
                      opacity: useTransform(scrollYProgress, [start + 0.02, end], [0, 0.5]),
                    }}
                  >
                    {pillar.number}
                  </motion.span>

                  {/* Title with scale entrance */}
                  <motion.h3
                    className="text-display text-foreground mb-4"
                    style={{
                      fontSize: "clamp(1.8rem, 4vw, 3rem)",
                      scale: useTransform(scrollYProgress, [start, end], [0.8, 1]),
                    }}
                  >
                    {pillar.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    className="text-muted-foreground text-sm leading-relaxed mb-6"
                    style={{
                      opacity: useTransform(scrollYProgress, [start + 0.04, end + 0.02], [0, 1]),
                      y: useTransform(scrollYProgress, [start + 0.04, end + 0.02], [15, 0]),
                    }}
                  >
                    {pillar.description}
                  </motion.p>

                  {/* Stat that reveals after the card */}
                  <motion.div
                    className="border-t border-foreground/10 pt-4"
                    style={{
                      opacity: useTransform(scrollYProgress, [statStart, statEnd], [0, 1]),
                      y: useTransform(scrollYProgress, [statStart, statEnd], [10, 0]),
                    }}
                  >
                    <span className="text-display text-foreground text-2xl md:text-3xl block">
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
          className="absolute top-[18%] right-[8%] w-px bg-foreground/10"
          style={{
            height: useTransform(scrollYProgress, [0.1, 0.5], [0, 120]),
            opacity: useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.95], [0, 0.3, 0.3, 0]),
          }}
        />
        <motion.div
          className="absolute bottom-[22%] right-[12%] h-px bg-foreground/10"
          style={{
            width: useTransform(scrollYProgress, [0.3, 0.6], [0, 80]),
            opacity: useTransform(scrollYProgress, [0.3, 0.4, 0.8, 0.95], [0, 0.2, 0.2, 0]),
          }}
        />
        <motion.div
          className="absolute top-[40%] right-[5%] w-8 h-8 border border-foreground/10"
          style={{
            rotate: useTransform(scrollYProgress, [0, 1], [0, 180]),
            scale: useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]),
            opacity: useTransform(scrollYProgress, [0.2, 0.35, 0.7, 0.85], [0, 0.15, 0.15, 0]),
          }}
        />
      </div>
    </section>
  );
};

export default SpatialScrollSection;
