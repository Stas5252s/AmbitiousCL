import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const CTASection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const headingScale = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);
  const headingBlur = useTransform(scrollYProgress, [0, 0.4], [25, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  const labelOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const bodyOpacity = useTransform(scrollYProgress, [0.3, 0.55], [0, 1]);
  const bodyY = useTransform(scrollYProgress, [0.3, 0.55], [40, 0]);
  const btnOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const btnY = useTransform(scrollYProgress, [0.45, 0.65], [30, 0]);

  const accentScale = useTransform(scrollYProgress, [0.2, 0.7], [0, 1]);
  const accentOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.9, 1], [0, 0.06, 0.06, 0]);

  return (
    <section ref={ref} id="apply" className="relative py-32 md:py-48 px-6 md:px-16 overflow-hidden" style={{ background: 'hsl(var(--card))' }}>
      <motion.div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-muted-foreground/10"
        style={{ scale: accentScale, opacity: accentOpacity }}
      />

      {/* Subtle top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <motion.p className="font-mono-label mb-12 relative z-10 text-primary" style={{ opacity: labelOpacity }}>
        004 — Join
      </motion.p>

      <motion.h2
        className="text-headline text-foreground text-4xl md:text-6xl lg:text-8xl max-w-4xl mb-10 relative z-10"
        style={{
          scale: headingScale,
          y: headingY,
          opacity: headingOpacity,
          filter: useTransform(headingBlur, (v) => `blur(${v}px)`),
          transformOrigin: "left center",
        }}
      >
        The age of permission is over.
      </motion.h2>

      <motion.p
        className="text-foreground/80 max-w-lg mb-14 leading-relaxed text-base md:text-lg relative z-10"
        style={{ opacity: bodyOpacity, y: bodyY }}
      >
        We're looking for doers, not dreamers. If you're under 20 and 
        building something real, this is your network.
      </motion.p>

      <motion.div style={{ opacity: btnOpacity, y: btnY }} className="relative z-10">
        <Link
          to="/contact"
          className="inline-block font-mono-label text-sm px-12 py-5 border border-foreground text-foreground btn-fill-hover transition-colors duration-500"
        >
          Initiate Application
        </Link>
      </motion.div>
    </section>
  );
};

export default CTASection;
