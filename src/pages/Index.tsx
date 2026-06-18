import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
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
import Atmosphere from "@/components/Atmosphere";
import SceneBackdrop from "@/components/SceneBackdrop";
import SectionMarker from "@/components/SectionMarker";
import scenePeak from "@/assets/scene-peak.jpg";


const Index = () => {
  return (
    <>
      <Header />
      <Atmosphere />
      <main className="relative z-10">

        <SceneBackdrop image={scenePeak} overlay={55}>
          <HeroSection />
        </SceneBackdrop>

        <SectionMarker numeral="II" title="The Forest — About" shape="forest" />
        <WhyMeSection />

        <SectionMarker numeral="III" title="The Waterfall — Services" shape="waterfall" />
        <PricingTeaser />

        <SectionMarker numeral="IV" title="The Trail — Process" shape="trail" />
        <HowItWorksSection />

        <SectionMarker numeral="V" title="The Bridge — Work" shape="bridge" />
        <UrgencySection />
        <PortfolioSection />

        <SectionMarker numeral="VI" title="The Base Camp — Trust" shape="camp" />
        <ReviewsSection />
        <FaqSection />

        <SectionMarker numeral="VII" title="The Cabin — Contact" shape="cabin" />
        <CtaSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
};

export default Index;
