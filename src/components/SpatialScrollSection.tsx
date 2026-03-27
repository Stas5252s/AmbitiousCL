import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const pillars = [
  { number: "01", title: "BUILD", description: "Launch real products. Ship code. Create value." },
  { number: "02", title: "EARN", description: "Revenue before graduation. No allowance needed." },
  { number: "03", title: "CONNECT", description: "Network with builders, not followers." },
  { number: "04", title: "LEAD", description: "Set the standard. Others follow." },
];

const SpatialScrollSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={ref} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="w-full px-6 md:px-16">
          <motion.p
            className="font-mono-label mb-16"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.08], [0, 1]) }}
          >
            002 — Pillars
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            {pillars.map((pillar, i) => {
              const start = 0.05 + i * 0.18;
              const end = start + 0.15;
              const midStart = start + 0.05;

              return (
                <motion.div
                  key={pillar.number}
                  className="relative"
                  style={{
                    opacity: useTransform(scrollYProgress, [start, end], [0, 1]),
                    y: useTransform(scrollYProgress, [start, end], [80, 0]),
                    filter: useTransform(
                      useTransform(scrollYProgress, [start, end], [15, 0]),
                      (v: number) => `blur(${v}px)`
                    ),
                  }}
                >
                  <motion.div
                    className="w-px bg-foreground/15 mb-6"
                    style={{ height: useTransform(scrollYProgress, [midStart, end], [0, 48]) }}
                  />
                  <span className="font-mono-label text-primary/60 text-xs block mb-3">{pillar.number}</span>
                  <h3 className="text-display text-foreground mb-3" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpatialScrollSection;
