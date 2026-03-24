import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const TunnelRing = ({
  scrollYProgress,
  offset,
  index,
}: {
  scrollYProgress: any;
  offset: number;
  index: number;
}) => {
  const ringZ = useTransform(scrollYProgress, [0, 1], [-400 - index * 600, 1200]);
  const ringOpacity = useTransform(
    scrollYProgress,
    [offset, offset + 0.08, offset + 0.3, offset + 0.45],
    [0, 0.12, 0.12, 0]
  );
  const ringScale = useTransform(scrollYProgress, [offset, offset + 0.4], [0.2, 3]);

  return (
    <motion.div
      className="absolute border border-muted-foreground/20 rounded-none"
      style={{
        width: 300,
        height: 300,
        z: ringZ,
        opacity: ringOpacity,
        scale: ringScale,
      }}
    />
  );
};

const ScrollIndicator = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.15], [1, 1, 0]);
  return (
    <motion.p className="absolute bottom-8 font-mono-label" style={{ opacity }}>
      Scroll to enter
    </motion.p>
  );
};

const layers = [
  { text: "AMBITION", depth: 800 },
  { text: "STARTS", depth: 1600 },
  { text: "HERE", depth: 2400 },
];

const ZLayer = ({
  text,
  depth,
  scrollYProgress,
}: {
  text: string;
  depth: number;
  scrollYProgress: any;
}) => {
  const startAppear = depth / 4000;
  const endDisappear = Math.min(startAppear + 0.35, 1);
  
  const z = useTransform(
    scrollYProgress,
    [0, 1],
    [-depth, depth * 0.8]
  );
  const opacity = useTransform(
    scrollYProgress,
    [
      Math.max(startAppear - 0.05, 0),
      startAppear + 0.08,
      endDisappear - 0.1,
      endDisappear,
    ],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [startAppear, endDisappear],
    [0.5, 2.5]
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ z, opacity, scale }}
    >
      <span
        className="text-display text-foreground/[0.07] whitespace-nowrap select-none"
        style={{ fontSize: "clamp(4rem, 14vw, 12rem)" }}
      >
        {text}
      </span>
    </motion.div>
  );
};

const FloatingShape = ({
  scrollYProgress,
  startOffset,
  x,
  y,
  size,
  type,
}: {
  scrollYProgress: any;
  startOffset: number;
  x: string;
  y: string;
  size: number;
  type: "square" | "line" | "dot";
}) => {
  const z = useTransform(scrollYProgress, [0, 1], [-600 - startOffset * 1000, 800]);
  const opacity = useTransform(
    scrollYProgress,
    [startOffset, startOffset + 0.1, startOffset + 0.5, startOffset + 0.7],
    [0, 0.3, 0.3, 0]
  );
  const scale = useTransform(scrollYProgress, [startOffset, startOffset + 0.5], [0.3, 1.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180 * (startOffset > 0.3 ? -1 : 1)]);

  return (
    <motion.div
      className="absolute"
      style={{
        left: x,
        top: y,
        z,
        opacity,
        scale,
        rotateZ: rotate,
      }}
    >
      {type === "square" && (
        <div
          className="border border-muted-foreground/30"
          style={{ width: size, height: size }}
        />
      )}
      {type === "line" && (
        <div
          className="bg-muted-foreground/20"
          style={{ width: 1, height: size }}
        />
      )}
      {type === "dot" && (
        <div
          className="rounded-full bg-primary/20"
          style={{ width: size, height: size }}
        />
      )}
    </motion.div>
  );
};

const SpatialScrollSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Center crosshair that pulses
  const crosshairOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 0.15, 0.15, 0]);
  const crosshairScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 1.5]);

  return (
    <section ref={ref} className="relative h-[400vh]">
      <div
        className="sticky top-0 h-screen overflow-hidden flex items-center justify-center"
        style={{ perspective: "1000px", perspectiveOrigin: "50% 50%" }}
      >
        {/* Center crosshair */}
        <motion.div
          className="absolute z-10 flex items-center justify-center"
          style={{ opacity: crosshairOpacity, scale: crosshairScale }}
        >
          <div className="w-px h-16 bg-muted-foreground/30 absolute" />
          <div className="h-px w-16 bg-muted-foreground/30 absolute" />
        </motion.div>

        {/* Text layers flying through z-axis */}
        {layers.map((layer) => (
          <ZLayer
            key={layer.text}
            text={layer.text}
            depth={layer.depth}
            scrollYProgress={scrollYProgress}
          />
        ))}

        {/* Floating geometric shapes at different depths */}
        <FloatingShape scrollYProgress={scrollYProgress} startOffset={0.05} x="15%" y="20%" size={80} type="square" />
        <FloatingShape scrollYProgress={scrollYProgress} startOffset={0.15} x="75%" y="30%" size={120} type="line" />
        <FloatingShape scrollYProgress={scrollYProgress} startOffset={0.25} x="25%" y="70%" size={60} type="square" />
        <FloatingShape scrollYProgress={scrollYProgress} startOffset={0.35} x="80%" y="65%" size={10} type="dot" />
        <FloatingShape scrollYProgress={scrollYProgress} startOffset={0.1} x="60%" y="15%" size={6} type="dot" />
        <FloatingShape scrollYProgress={scrollYProgress} startOffset={0.45} x="10%" y="45%" size={150} type="line" />
        <FloatingShape scrollYProgress={scrollYProgress} startOffset={0.3} x="85%" y="80%" size={40} type="square" />
        <FloatingShape scrollYProgress={scrollYProgress} startOffset={0.5} x="45%" y="85%" size={8} type="dot" />
        <FloatingShape scrollYProgress={scrollYProgress} startOffset={0.2} x="50%" y="10%" size={100} type="line" />

        {/* Tunnel rings */}
        {[0.1, 0.25, 0.4, 0.55, 0.7].map((offset, i) => {
          const ringZ = useTransform(scrollYProgress, [0, 1], [-400 - i * 600, 1200]);
          const ringOpacity = useTransform(
            scrollYProgress,
            [offset, offset + 0.08, offset + 0.3, offset + 0.45],
            [0, 0.12, 0.12, 0]
          );
          const ringScale = useTransform(scrollYProgress, [offset, offset + 0.4], [0.2, 3]);

          return (
            <motion.div
              key={i}
              className="absolute border border-muted-foreground/20 rounded-none"
              style={{
                width: 300,
                height: 300,
                z: ringZ,
                opacity: ringOpacity,
                scale: ringScale,
              }}
            />
          );
        })}

        {/* Scroll indicator */}
        <motion.p
          className="absolute bottom-8 font-mono-label"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.05, 0.15], [1, 1, 0]),
          }}
        >
          Scroll to enter
        </motion.p>
      </div>
    </section>
  );
};

export default SpatialScrollSection;
