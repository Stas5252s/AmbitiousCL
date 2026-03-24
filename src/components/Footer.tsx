import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Footer = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.08]);

  return (
    <footer ref={ref} className="relative overflow-hidden py-24 md:py-32 px-6 md:px-16 border-t border-border">
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ opacity }}
      >
        <span
          className="text-foreground text-display whitespace-nowrap"
          style={{ fontSize: 'clamp(6rem, 20vw, 20rem)' }}
        >
          AMBITIOUS
        </span>
      </motion.div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <p className="font-mono-label mb-2">© 2025 Ambitious</p>
          <p className="text-muted-foreground text-sm">
            We build. We earn. We lead.
          </p>
        </div>
        <div className="flex gap-8">
          <a href="#" className="font-mono-label hover:text-foreground transition-colors">Instagram</a>
          <a href="#" className="font-mono-label hover:text-foreground transition-colors">Discord</a>
          <a href="#" className="font-mono-label hover:text-foreground transition-colors">X</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
