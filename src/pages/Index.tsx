import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import ManifestoSection from "@/components/ManifestoSection";
import PillarsSection from "@/components/PillarsSection";
import StatsSection from "@/components/StatsSection";
import MorphingDivider from "@/components/MorphingDivider";
import HorizontalReveal from "@/components/HorizontalReveal";
import SpatialScrollSection from "@/components/SpatialScrollSection";
import StickyTextReveal from "@/components/StickyTextReveal";
import ImageSection from "@/components/ImageSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SectionTransition from "@/components/SectionTransition";
import GlitchReveal from "@/components/GlitchReveal";
import ParallaxStripes from "@/components/ParallaxStripes";
import NumbersReveal from "@/components/NumbersReveal";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <SectionTransition variant="glitch" />
      <ManifestoSection />
      <SectionTransition variant="pulse-ring" />
      <MorphingDivider />
      <PillarsSection />
      <SectionTransition variant="shatter" />
      <StatsSection />
      <NumbersReveal />
      <HorizontalReveal />
      <SectionTransition variant="vortex" />
      <GlitchReveal />
      <SpatialScrollSection />
      <StickyTextReveal />
      <SectionTransition variant="scanner" />
      <ParallaxStripes />
      <ImageSection />
      <SectionTransition variant="pulse-ring" />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
