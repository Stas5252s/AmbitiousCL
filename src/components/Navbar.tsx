import { motion } from "framer-motion";
import { Github, Send } from "lucide-react";
import { Link } from "react-router-dom";
import logoImg from "@/assets/logo.png";

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
  </svg>
);

const socials = [
  { icon: Send, label: "TG", href: "https://t.me/ambitis" },
  { icon: DiscordIcon, label: "DC", href: "https://discord.gg/cPmD5VTQ", isCustom: true },
  { icon: Github, label: "GH", href: "#" },
];

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
        className="flex items-center gap-2 text-foreground font-bold text-lg tracking-tight cursor-pointer"
      >
        <img src={logoImg} alt="Ambitious logo" className="w-7 h-7 invert" />
        AMBITIOUS
      </a>

      <div className="flex items-center gap-6">
        <a href="#manifesto" onClick={(e) => handleClick(e, "manifesto")} className="hidden md:block font-mono-label hover:text-foreground transition-colors cursor-pointer">Manifesto</a>
        <a href="#pillars" onClick={(e) => handleClick(e, "pillars")} className="hidden md:block font-mono-label hover:text-foreground transition-colors cursor-pointer">Pillars</a>
        <a href="#network" onClick={(e) => handleClick(e, "network")} className="hidden md:block font-mono-label hover:text-foreground transition-colors cursor-pointer">Network</a>
        <Link to="/contact" className="hidden md:block font-mono-label hover:text-foreground transition-colors cursor-pointer">Contact</Link>

        <div className="hidden md:flex items-center gap-1 ml-2 border-l border-border pl-4">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label={s.label}>
              {s.isCustom ? <s.icon className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
            </a>
          ))}
        </div>

        <a href="#apply" onClick={(e) => handleClick(e, "apply")} className="font-mono-label px-5 py-2.5 border border-foreground text-foreground btn-fill-hover transition-colors cursor-pointer">
          Apply Now
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
