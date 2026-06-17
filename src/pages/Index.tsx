import { ReactNode } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import UrgencySection from "@/components/UrgencySection";
import PortfolioSection from "@/components/PortfolioSection";
import PricingTeaser from "@/components/PricingTeaser";
import ReviewsSection from "@/components/ReviewsSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MountainBackdrop from "@/components/MountainBackdrop";
import SnowOverlay from "@/components/SnowOverlay";

function Panel({
  id,
  side,
  children,
}: {
  id: string;
  side: "left" | "right";
  children: ReactNode;
}) {
  const align = side === "left" ? "justify-start" : "justify-end";
  const tilt = side === "left" ? "rotate-[2deg]" : "-rotate-[2deg]";
  return (
    <section
      id={id}
      className={`relative flex h-screen w-screen items-center px-4 md:px-10 ${align}`}
    >
      <div
        className={`pointer-events-auto w-full max-w-[480px] rounded-2xl border border-border/40 bg-background/85 p-6 shadow-2xl backdrop-blur-md md:p-8 ${tilt}`}
      >
        {children}
      </div>
    </section>
  );
}

const Index = () => {
  return (
    <>
      <SnowOverlay />
      <Header />
      <MountainBackdrop>
        <Panel id="hero" side="left"><HeroSection /></Panel>
        <Panel id="cresta" side="right"><ServicesSection /></Panel>
        <Panel id="ghiacciaio" side="left"><HowItWorksSection /></Panel>
        <Panel id="sentiero" side="right"><PortfolioSection /></Panel>
        <Panel id="crepaccio" side="left"><UrgencySection /></Panel>
        <Panel id="foresta" side="right"><PortfolioSection /></Panel>
        <Panel id="campo-base" side="left"><PricingTeaser /></Panel>
        <Panel id="rifugio" side="right"><ReviewsSection /></Panel>
        <Panel id="caverna" side="left"><FaqSection /></Panel>
        <Panel id="valle" side="right"><ContactSection /></Panel>
      </MountainBackdrop>
      <FloatingWhatsApp />
    </>
  );
};

export default Index;
