import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ManifestoSection from "@/components/ManifestoSection";
import PillarsSection from "@/components/PillarsSection";
import SpatialScrollSection from "@/components/SpatialScrollSection";
import ImageSection from "@/components/ImageSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ManifestoSection />
      <PillarsSection />
      <SpatialScrollSection />
      <ImageSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
