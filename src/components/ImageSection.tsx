import ScrollReveal from "./ScrollReveal";
import ParallaxImage from "./ParallaxImage";

const ImageSection = () => {
  return (
    <section className="py-32 md:py-48 px-6 md:px-16">
      <ScrollReveal>
        <p className="font-mono-label mb-16">003 — The Network</p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ScrollReveal className="aspect-[3/4]">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
            alt="Young entrepreneurs collaborating"
            className="h-full"
          />
        </ScrollReveal>
        <ScrollReveal delay={0.2} className="aspect-[3/4]">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80"
            alt="Working on ideas together"
            className="h-full"
          />
        </ScrollReveal>
      </div>

      <ScrollReveal className="mt-12 max-w-lg">
        <p className="text-muted-foreground leading-relaxed text-sm">
          Our members are building apps, launching brands, trading markets, 
          and closing deals — all before turning 20.
        </p>
      </ScrollReveal>
    </section>
  );
};

export default ImageSection;
