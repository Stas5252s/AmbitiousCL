import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import ManifestoSection from "@/components/ManifestoSection";
import PillarsSection from "@/components/PillarsSection";
import HorizontalReveal from "@/components/HorizontalReveal";
import SpatialScrollSection from "@/components/SpatialScrollSection";
import StickyTextReveal from "@/components/StickyTextReveal";
import ImageSection from "@/components/ImageSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <ManifestoSection />
      <PillarsSection />
      <HorizontalReveal />
      <SpatialScrollSection />
      <StickyTextReveal />
      <ImageSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
