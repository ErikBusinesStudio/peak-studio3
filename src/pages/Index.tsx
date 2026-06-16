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
import MountainBackdrop from "@/components/MountainBackdrop";
import SnowOverlay from "@/components/SnowOverlay";
import AltitudeNav from "@/components/AltitudeNav";

const Index = () => {
  return (
    <>
      <MountainBackdrop />
      <SnowOverlay />
      <Header />
      <AltitudeNav />
      <main>
        <section id="hero"><HeroSection /></section>
        <ServicesSection />
        <WhyMeSection />
        <section id="sentiero"><HowItWorksSection /></section>
        <section id="crepaccio"><UrgencySection /></section>
        <PortfolioSection />
        <PricingTeaser />
        <ReviewsSection />
        <FaqSection />
        <CtaSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
};

export default Index;
