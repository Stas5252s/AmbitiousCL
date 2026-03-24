import ScrollReveal from "./ScrollReveal";

const pillars = [
  {
    num: "01",
    title: "Build",
    desc: "Launch real projects. Ship products. Generate revenue before you graduate.",
  },
  {
    num: "02",
    title: "Connect",
    desc: "Find your co-founders, mentors, and first customers inside the network.",
  },
  {
    num: "03",
    title: "Learn",
    desc: "Access resources, playbooks, and strategies from members who've done it.",
  },
];

const PillarsSection = () => {
  return (
    <section className="py-32 md:py-48 px-6 md:px-16">
      <ScrollReveal>
        <p className="font-mono-label mb-16">002 — The Pillars</p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
        {pillars.map((p, i) => (
          <ScrollReveal key={p.num} delay={i * 0.15} className="bg-background p-8 md:p-12">
            <span className="font-mono-label text-primary">{p.num}</span>
            <h3 className="text-headline text-foreground text-3xl md:text-4xl mt-4 mb-6">
              {p.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {p.desc}
            </p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default PillarsSection;
