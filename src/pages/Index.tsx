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

        <SectionMarker numeral="II" title="The Forest — About" shape="forest" altitude="1.200 m" weather="Pine air · 12°" />
        <WhyMeSection />

        <SectionMarker numeral="III" title="The Waterfall — Services" shape="waterfall" altitude="1.650 m" weather="Mist · 9°" />
        <PricingTeaser />

        <SectionMarker numeral="IV" title="The Trail — Process" shape="trail" altitude="2.100 m" weather="Clear sky · 6°" />
        <HowItWorksSection />

        <SectionMarker numeral="V" title="The Bridge — Work" shape="bridge" altitude="2.480 m" weather="Crosswind · 4°" />
        <UrgencySection />
        <PortfolioSection />

        <SectionMarker numeral="VI" title="The Base Camp — Trust" shape="camp" altitude="2.890 m" weather="Starlit · -2°" />
        <ReviewsSection />
        <FaqSection />

        <SectionMarker numeral="VII" title="The Cabin — Contact" shape="cabin" altitude="3.150 m" weather="Warm hearth · -5°" />
        <CtaSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
};

export default Index;
