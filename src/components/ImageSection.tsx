import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ParallaxImage from "./ParallaxImage";

const ImageSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const leftX = useTransform(scrollYProgress, [0, 0.3], ["-100%", "0%"]);
  const rightX = useTransform(scrollYProgress, [0.05, 0.35], ["100%", "0%"]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const imgBlur = useTransform(scrollYProgress, [0, 0.25], [15, 0]);

  const wideScale = useTransform(scrollYProgress, [0.35, 0.6], [0.3, 1]);
  const wideOpacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
  const wideBlur = useTransform(scrollYProgress, [0.35, 0.55], [20, 0]);

  const labelOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  const textY = useTransform(scrollYProgress, [0.6, 0.8], [60, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.6, 0.75], [0, 1]);

  return (
    <section ref={ref} id="network" className="py-32 md:py-48 px-6 md:px-16 overflow-hidden">
      <motion.p className="font-mono-label mb-16" style={{ opacity: labelOpacity }}>
        003 — The Network
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
        <motion.div
          className="aspect-[3/4] overflow-hidden"
          style={{
            x: leftX,
            opacity: imgOpacity,
            filter: useTransform(imgBlur, (v) => `blur(${v}px)`),
          }}
        >
          <ParallaxImage
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80"
            alt="Stock market charts on screen"
            className="h-full"
          />
        </motion.div>
        <motion.div
          className="aspect-[3/4] overflow-hidden"
          style={{
            x: rightX,
            opacity: imgOpacity,
            filter: useTransform(imgBlur, (v) => `blur(${v}px)`),
          }}
        >
          <ParallaxImage
            src="https://images.unsplash.com/photo-1618044733300-9472054094ee?w=800&q=80"
            alt="Luxury watch close-up"
            className="h-full"
          />
        </motion.div>
      </div>

      <motion.div
        className="mt-16 aspect-[21/9] overflow-hidden"
        style={{
          scale: wideScale,
          opacity: wideOpacity,
          filter: useTransform(wideBlur, (v) => `blur(${v}px)`),
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80"
          alt="Modern architecture skyscraper"
          className="w-full h-full object-cover grayscale"
        />
      </motion.div>

      <motion.div className="mt-12 max-w-lg" style={{ y: textY, opacity: textOpacity }}>
        <p className="text-muted-foreground leading-relaxed text-sm">
          Our members are building apps, launching brands, trading markets, 
          and closing deals — all before turning 20.
        </p>
      </motion.div>
    </section>
  );
};

export default ImageSection;
