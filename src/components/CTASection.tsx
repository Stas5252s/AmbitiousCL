import ScrollReveal from "./ScrollReveal";

const CTASection = () => {
  return (
    <section id="apply" className="py-32 md:py-48 px-6 md:px-16 border-t border-border">
      <ScrollReveal>
        <p className="font-mono-label mb-12">004 — Join</p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <h2 className="text-headline text-foreground text-4xl md:text-6xl lg:text-7xl max-w-3xl mb-8">
          The age of permission is over.
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <p className="text-muted-foreground max-w-md mb-12 leading-relaxed">
          We're looking for doers, not dreamers. If you're under 20 and 
          building something real, this is your network.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.3}>
        <a
          href="#"
          className="inline-block font-mono-label px-10 py-4 bg-primary text-primary-foreground btn-fill-hover transition-colors duration-500"
        >
          Initiate Application
        </a>
      </ScrollReveal>
    </section>
  );
};

export default CTASection;
