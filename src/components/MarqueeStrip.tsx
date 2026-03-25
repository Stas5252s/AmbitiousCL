import { motion } from "framer-motion";

const items = ["AMBITIOUS", "·", "BUILD", "·", "EARN", "·", "CONNECT", "·", "LEAD", "·"];

const MarqueeStrip = () => {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden border-y border-border py-5">
      <motion.div
        className="flex whitespace-nowrap gap-8"
        animate={{ x: ["0%", "-25%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className={`font-mono-label text-sm ${
              item === "·" ? "text-primary" : ""
            }`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeStrip;
