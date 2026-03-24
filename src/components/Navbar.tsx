import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-5 backdrop-blur-xl bg-background/80 border-b border-border"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="text-foreground font-bold text-lg tracking-tight">AMBITIOUS</span>
      <a
        href="#apply"
        className="font-mono-label px-5 py-2.5 border border-foreground text-foreground btn-fill-hover transition-colors"
      >
        Apply Now
      </a>
    </motion.nav>
  );
};

export default Navbar;
