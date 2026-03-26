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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <SectionTransition variant="converge" />
      <ManifestoSection />
      <MorphingDivider />
      <PillarsSection />
      <SectionTransition variant="slash" />
      <StatsSection />
      <HorizontalReveal />
      <SectionTransition variant="diamond" />
      <SpatialScrollSection />
      <StickyTextReveal />
      <SectionTransition variant="converge" />
      <ImageSection />
      <SectionTransition variant="wipe" />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
