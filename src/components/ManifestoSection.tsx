import ScrollReveal from "./ScrollReveal";

const ManifestoSection = () => {
  const lines = [
    "We don't wait for opportunities.",
    "We create them.",
    "Age is not a limitation —",
    "it's an advantage.",
  ];

  return (
    <section className="py-32 md:py-48 px-6 md:px-16">
      <ScrollReveal>
        <p className="font-mono-label mb-12">001 — Manifesto</p>
      </ScrollReveal>

      <div className="max-w-4xl">
        {lines.map((line, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <h2 className="text-headline text-foreground text-3xl md:text-5xl lg:text-6xl mb-4">
              {line}
            </h2>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.4} className="mt-16 max-w-lg">
        <p className="text-muted-foreground leading-relaxed">
          Ambitious is a collective of teenagers who build real businesses, 
          forge genuine connections, and prove that the best time to start 
          is now. No gatekeepers. No excuses. Only results.
        </p>
      </ScrollReveal>
    </section>
  );
};

export default ManifestoSection;
