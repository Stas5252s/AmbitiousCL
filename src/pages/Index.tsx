import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import ManifestoSection from "@/components/ManifestoSection";
import SpatialScrollSection from "@/components/SpatialScrollSection";
import StatsSection from "@/components/StatsSection";
import StickyTextReveal from "@/components/StickyTextReveal";
import ImageSection from "@/components/ImageSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SectionTransition from "@/components/SectionTransition";
import GlitchReveal from "@/components/GlitchReveal";
import ParallaxStripes from "@/components/ParallaxStripes";
import NumbersReveal from "@/components/NumbersReveal";
import HorizontalReveal from "@/components/HorizontalReveal";
import ZoomOnScroll from "@/components/ZoomOnScroll";
import PerspectiveWarp from "@/components/PerspectiveWarp";
import SplitReveal from "@/components/SplitReveal";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <SectionTransition variant="glitch" />
      <ManifestoSection />
      <SectionTransition variant="waveform" />
      <SpatialScrollSection />
      <SectionTransition variant="shatter" />
      <PerspectiveWarp />
      <StatsSection />
      <NumbersReveal />
      <SplitReveal />
      <HorizontalReveal />
      <SectionTransition variant="crosshair" />
      <GlitchReveal />
      <ZoomOnScroll />
      <StickyTextReveal />
      <SectionTransition variant="scanner" />
      <ParallaxStripes />
      <ImageSection />
      <SectionTransition variant="waveform" />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
