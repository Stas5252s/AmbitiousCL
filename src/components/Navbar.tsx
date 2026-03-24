import { motion } from "framer-motion";

const Navbar = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-5 backdrop-blur-xl bg-background/80 border-b border-border"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <a
        href="#top"
        onClick={(e) => handleClick(e, "top")}
        className="text-foreground font-bold text-lg tracking-tight cursor-pointer"
      >
        AMBITIOUS
      </a>
      <div className="flex items-center gap-8">
        <a
          href="#manifesto"
          onClick={(e) => handleClick(e, "manifesto")}
          className="hidden md:block font-mono-label hover:text-foreground transition-colors cursor-pointer"
        >
          Manifesto
        </a>
        <a
          href="#pillars"
          onClick={(e) => handleClick(e, "pillars")}
          className="hidden md:block font-mono-label hover:text-foreground transition-colors cursor-pointer"
        >
          Pillars
        </a>
        <a
          href="#network"
          onClick={(e) => handleClick(e, "network")}
          className="hidden md:block font-mono-label hover:text-foreground transition-colors cursor-pointer"
        >
          Network
        </a>
        <a
          href="#apply"
          onClick={(e) => handleClick(e, "apply")}
          className="font-mono-label px-5 py-2.5 border border-foreground text-foreground btn-fill-hover transition-colors cursor-pointer"
        >
          Apply Now
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
