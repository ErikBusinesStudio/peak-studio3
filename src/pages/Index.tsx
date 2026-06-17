import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyMeSection from "@/components/WhyMeSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import UrgencySection from "@/components/UrgencySection";
import PortfolioSection from "@/components/PortfolioSection";
import PricingTeaser from "@/components/PricingTeaser";
import ReviewsSection from "@/components/ReviewsSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import ContactSection from "@/components/ContactSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import SceneBackdrop from "@/components/SceneBackdrop";
import scenePeak from "@/assets/scene-peak.jpg";
import sceneForest from "@/assets/scene-forest.jpg";
import sceneWaterfall from "@/assets/scene-waterfall.jpg";
import sceneSignpost from "@/assets/scene-signpost.jpg";
import sceneBridge from "@/assets/scene-bridge.jpg";
import sceneCabin from "@/assets/scene-cabin.jpg";
import sceneBasecamp from "@/assets/scene-basecamp.jpg";

const Index = () => {
  return (
    <>
      <Header />
      <main className="relative">
        <SceneBackdrop image={scenePeak} overlay={55}>
          <HeroSection />
        </SceneBackdrop>

        <SceneBackdrop image={sceneForest} overlay={70}>
          <ServicesSection />
          <WhyMeSection />
        </SceneBackdrop>

        <SceneBackdrop image={sceneSignpost} overlay={72}>
          <HowItWorksSection />
        </SceneBackdrop>

        <SceneBackdrop image={sceneBridge} overlay={75}>
          <UrgencySection />
          <PortfolioSection />
        </SceneBackdrop>

        <SceneBackdrop image={sceneWaterfall} overlay={72}>
          <PricingTeaser />
        </SceneBackdrop>

        <SceneBackdrop image={sceneCabin} overlay={70}>
          <ReviewsSection />
          <FaqSection />
        </SceneBackdrop>

        <SceneBackdrop image={sceneBasecamp} overlay={70}>
          <CtaSection />
          <ContactSection />
        </SceneBackdrop>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
};

export default Index;
