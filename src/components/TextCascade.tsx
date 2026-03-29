import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const phrases = [
  { text: "WE DON'T ASK", size: "clamp(2rem, 8vw, 7rem)", weight: "bold" },
  { text: "FOR PERMISSION", size: "clamp(1.5rem, 5vw, 4rem)", weight: "normal" },
  { text: "WE BUILD", size: "clamp(3rem, 12vw, 10rem)", weight: "bold" },
  { text: "EMPIRES", size: "clamp(2.5rem, 10vw, 8rem)", weight: "bold" },
  { text: "BEFORE BREAKFAST", size: "clamp(1rem, 3vw, 2.5rem)", weight: "normal" },
];

const TextCascade = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={ref} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
        {/* Massive vertical line that draws first */}
        <motion.div
          className="absolute left-1/2 top-0 w-px bg-foreground/10 origin-top"
          style={{
            height: "100%",
            scaleY: useTransform(scrollYProgress, [0, 0.15], [0, 1]),
            opacity: useTransform(scrollYProgress, [0, 0.05, 0.85, 0.95], [0, 0.3, 0.3, 0]),
          }}
        />

        {/* Horizontal accent lines that grow from center */}
        {[0.2, 0.4, 0.6, 0.8].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-foreground/[0.06]"
            style={{
              top: `${pos * 100}%`,
              left: "50%",
              width: useTransform(
                scrollYProgress,
                [0.05 + i * 0.08, 0.2 + i * 0.08],
                ["0%", `${40 + i * 15}%`]
              ),
              x: "-50%",
              opacity: useTransform(scrollYProgress, [0.05, 0.15, 0.85, 0.95], [0, 0.4, 0.4, 0]),
            }}
          />
        ))}

        {phrases.map((phrase, i) => {
          const segmentSize = 0.8 / phrases.length;
          const start = 0.05 + i * segmentSize;
          const peak = start + segmentSize * 0.4;
          const end = start + segmentSize * 0.9;
          const next = Math.min(start + segmentSize * 1.3, 0.95);

          const isHero = phrase.weight === "bold" && i === 2;

          return (
            <motion.div
              key={i}
              className="absolute w-full text-center px-4"
              style={{
                opacity: useTransform(scrollYProgress, [start, peak, end, next], [0, 1, 1, 0]),
                y: useTransform(scrollYProgress, [start, peak, end, next], [120, 0, 0, -80]),
                scale: useTransform(
                  scrollYProgress,
                  [start, peak, end, next],
                  [isHero ? 0.3 : 0.7, 1, 1, isHero ? 1.5 : 0.9]
                ),
                filter: useTransform(
                  useTransform(scrollYProgress, [start, peak, end, next], [25, 0, 0, 15]),
                  (v: number) => `blur(${v}px)`
                ),
                rotateX: useTransform(scrollYProgress, [start, peak], [15, 0]),
              }}
            >
              <span
                className={`text-display ${isHero ? "text-foreground" : "text-foreground/70"} block select-none`}
                style={{
                  fontSize: phrase.size,
                  fontWeight: phrase.weight === "bold" ? 700 : 300,
                  letterSpacing: isHero ? "0.05em" : "0.15em",
                }}
              >
                {phrase.text}
              </span>
            </motion.div>
          );
        })}

        {/* Progress indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0, 0.4, 0.4, 0]) }}
        >
          {phrases.map((_, i) => {
            const segStart = 0.05 + i * (0.8 / phrases.length);
            const segEnd = segStart + 0.8 / phrases.length;
            return (
              <motion.div
                key={i}
                className="h-px bg-foreground/30"
                style={{
                  width: 24,
                  scaleX: useTransform(scrollYProgress, [segStart, segEnd], [0, 1]),
                  transformOrigin: "left",
                  opacity: useTransform(scrollYProgress, [segStart, segEnd], [0.2, 1]),
                }}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TextCascade;
