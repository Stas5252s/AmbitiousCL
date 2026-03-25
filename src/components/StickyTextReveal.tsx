import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const words = ["How", "we", "operate.", "We", "build.", "We", "earn.", "We", "lead."];

const Word = ({
  word,
  index,
  total,
  scrollYProgress,
}: {
  word: string;
  index: number;
  total: number;
  scrollYProgress: any;
}) => {
  const start = index / total;
  const end = Math.min(start + 1 / total, 1);
  const mid = Math.min(start + 0.5 / total, 1);

  const opacity = useTransform(scrollYProgress, [start, mid], [0.1, 1]);
  const y = useTransform(scrollYProgress, [start, end], [20, 0]);
  const blur = useTransform(scrollYProgress, [start, mid], [8, 0]);

  return (
    <motion.span
      className="inline-block mr-[0.35em]"
      style={{
        opacity,
        y,
        filter: blur.get ? undefined : undefined,
      }}
    >
      <motion.span style={{ filter: useTransform(blur, (v) => `blur(${v}px)`) }}>
        {word}
      </motion.span>
    </motion.span>
  );
};

const StickyTextReveal = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={ref} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen flex items-center px-6 md:px-16">
        <div className="max-w-4xl">
          <p className="font-mono-label mb-8">OUR WAY</p>
          <h2
            className="text-headline text-foreground flex flex-wrap"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
          >
            {words.map((word, i) => (
              <Word
                key={i}
                word={word}
                index={i}
                total={words.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default StickyTextReveal;
