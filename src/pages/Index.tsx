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
import ParallaxStripes from "@/components/ParallaxStripes";
import NumbersReveal from "@/components/NumbersReveal";
import HorizontalReveal from "@/components/HorizontalReveal";
import ZoomOnScroll from "@/components/ZoomOnScroll";
import PerspectiveWarp from "@/components/PerspectiveWarp";
import MagneticLines from "@/components/MagneticLines";
import TextCascade from "@/components/TextCascade";
import DepthReveal from "@/components/DepthReveal";
import InfinityWipe from "@/components/InfinityWipe";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <SectionTransition variant="glitch" />
      <ManifestoSection />
      <InfinityWipe />
      <SpatialScrollSection />
      <SectionTransition variant="shatter" />
      <PerspectiveWarp />
      <StatsSection />
      <NumbersReveal />
      <MagneticLines />
      <HorizontalReveal />
      <SectionTransition variant="crosshair" />
      <TextCascade />
      <ZoomOnScroll />
      <StickyTextReveal />
      <DepthReveal />
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
