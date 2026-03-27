import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const CharRevealLine = ({
  text,
  scrollYProgress,
  startAt,
  endAt,
}: {
  text: string;
  scrollYProgress: any;
  startAt: number;
  endAt: number;
}) => {
  const chars = text.split("");
  const totalChars = chars.length;

  return (
    <h2 className="text-headline text-foreground text-3xl md:text-5xl lg:text-6xl mb-4 flex flex-wrap">
      {chars.map((char, i) => {
        const charStart = startAt + (i / totalChars) * (endAt - startAt) * 0.7;
        const charEnd = Math.min(charStart + (endAt - startAt) * 0.25, endAt);

        return (
          <CharReveal
            key={i}
            char={char}
            scrollYProgress={scrollYProgress}
            start={charStart}
            end={charEnd}
          />
        );
      })}
    </h2>
  );
};

const CharReveal = ({
  char,
  scrollYProgress,
  start,
  end,
}: {
  char: string;
  scrollYProgress: any;
  start: number;
  end: number;
}) => {
  const clampedStart = Math.max(0, Math.min(start, 0.98));
  const clampedEnd = Math.max(clampedStart + 0.001, Math.min(end, 0.99));

  const opacity = useTransform(scrollYProgress, [clampedStart, clampedEnd], [0.08, 1]);
  const y = useTransform(scrollYProgress, [clampedStart, clampedEnd], [8, 0]);
  const blur = useTransform(scrollYProgress, [clampedStart, clampedEnd], [4, 0]);

  return (
    <motion.span
      style={{
        opacity,
        y,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
        display: "inline-block",
        whiteSpace: "pre",
      }}
    >
      {char}
    </motion.span>
  );
};

const ManifestoSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  const lines = [
    "We don't wait for opportunities.",
    "We create them.",
    "Age is not a limitation —",
    "it's an advantage.",
  ];

  const lineCount = lines.length;

  const lineWidth = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);
  const labelOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

  return (
    <section ref={ref} id="manifesto" className="py-32 md:py-48 px-6 md:px-16">
      <motion.p className="font-mono-label mb-12" style={{ opacity: labelOpacity }}>
        001 — Manifesto
      </motion.p>

      <motion.div
        className="h-px bg-primary/30 mb-12"
        style={{ width: lineWidth }}
      />

      <div className="max-w-4xl">
        {lines.map((line, i) => (
          <CharRevealLine
            key={i}
            text={line}
            scrollYProgress={scrollYProgress}
            startAt={(i / lineCount) * 0.7}
            endAt={Math.min(((i + 1) / lineCount) * 0.7 + 0.05, 0.75)}
          />
        ))}
      </div>

      <motion.div className="mt-16 max-w-lg" style={{ opacity: useTransform(scrollYProgress, [0.7, 0.85], [0, 1]) }}>
        <p className="text-muted-foreground leading-relaxed">
          Ambitious is a collective of teenagers who build real businesses, 
          forge genuine connections, and prove that the best time to start 
          is now. No gatekeepers. No excuses. Only results.
        </p>
      </motion.div>
    </section>
  );
};

export default ManifestoSection;
