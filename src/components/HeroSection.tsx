import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Hero elements react to scroll - blur + scale + fade as user leaves
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);
  const titleBlur = useTransform(scrollYProgress, [0, 0.4], [0, 20]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.3], [0.03, 0.08]);
  const gridScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);

  // Floating accent lines that drift on scroll
  const line1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const line2Y = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const line3X = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section ref={ref} id="top" className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Animated grid overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: gridOpacity,
          scale: gridScale,
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Floating geometric accents */}
      <motion.div
        className="absolute top-[15%] left-[10%] w-px h-32 bg-primary/20"
        style={{ y: line1Y }}
      />
      <motion.div
        className="absolute top-[25%] right-[15%] w-24 h-px bg-muted-foreground/15"
        style={{ y: line2Y }}
      />
      <motion.div
        className="absolute bottom-[30%] left-[20%] w-16 h-16 border border-muted-foreground/10"
        style={{ y: line2Y, x: line3X, rotate: useTransform(scrollYProgress, [0, 1], [0, 90]) }}
      />

      <motion.p
        className="font-mono-label mb-8"
        style={{ opacity: contentOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Est. 2025
      </motion.p>

      <motion.h1
        className="text-display text-foreground text-center"
        style={{
          fontSize: 'clamp(3rem, 15vw, 10rem)',
          scale: titleScale,
          y: titleY,
          filter: useTransform(titleBlur, (v) => `blur(${v}px)`),
        }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        AMBITIOUS
      </motion.h1>

      <motion.p
        className="text-muted-foreground text-center max-w-md mt-8 text-base md:text-lg leading-relaxed"
        style={{ opacity: contentOpacity }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        A network of young builders who refuse to wait for permission.
      </motion.p>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        style={{ opacity: contentOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <motion.div
          className="w-px h-12 bg-muted-foreground/40"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
