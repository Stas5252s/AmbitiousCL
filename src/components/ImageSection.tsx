import ScrollReveal from "./ScrollReveal";
import ParallaxImage from "./ParallaxImage";
import ZoomOnScroll from "./ZoomOnScroll";

const ImageSection = () => {
  return (
    <section id="network" className="py-32 md:py-48 px-6 md:px-16">
      <ScrollReveal>
        <p className="font-mono-label mb-16">003 — The Network</p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ScrollReveal className="aspect-[3/4]">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80"
            alt="Stock market charts on screen"
            className="h-full"
          />
        </ScrollReveal>
        <ScrollReveal delay={0.2} className="aspect-[3/4]">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1618044733300-9472054094ee?w=800&q=80"
            alt="Luxury watch close-up"
            className="h-full"
          />
        </ScrollReveal>
      </div>

      <ZoomOnScroll className="mt-16">
        <div className="aspect-[21/9] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80"
            alt="Modern architecture skyscraper"
            className="w-full h-full object-cover grayscale"
          />
        </div>
      </ZoomOnScroll>

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
