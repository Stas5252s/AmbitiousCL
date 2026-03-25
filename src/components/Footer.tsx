import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Github, Mail, Send, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const socials = [
  { icon: Send, label: "Telegram", href: "https://t.me/ambitis" },
  { icon: MessageCircle, label: "Discord", href: "#" },
  { icon: Mail, label: "Gmail", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
];

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
        <span className="text-foreground text-display whitespace-nowrap" style={{ fontSize: 'clamp(6rem, 20vw, 20rem)' }}>
          AMBITIOUS
        </span>
      </motion.div>

      <div className="relative z-10 flex flex-col gap-16">
        <div className="flex flex-wrap gap-4">
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group flex items-center gap-3 px-6 py-4 border border-border hover:border-foreground transition-colors duration-300"
            >
              <s.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="font-mono-label group-hover:text-foreground transition-colors">
                {s.label}
              </span>
            </motion.a>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <p className="font-mono-label mb-2">© 2025 Ambitious</p>
            <p className="text-muted-foreground text-sm">
              We build. We earn. We lead.
            </p>
          </div>
          <Link to="/contact" className="font-mono-label hover:text-foreground transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
