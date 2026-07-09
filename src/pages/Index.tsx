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
import MountainInterlude from "@/components/MountainInterlude";
import ParallaxBand from "@/components/ParallaxBand";
import mtEverest from "@/assets/mountains/everest.jpg";
import mtK2 from "@/assets/mountains/k2.jpg";
import mtCervino from "@/assets/mountains/cervino.jpg";
import mtFuji from "@/assets/mountains/fuji.jpg";
import mtDenali from "@/assets/mountains/denali.jpg";

const ChapterDivider = ({ numeral, label, kicker }: { numeral: string; label: string; kicker?: string }) => (
  <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 md:py-8">
    <div className="flex items-end justify-between border-b border-foreground/20 pb-3">
      <div className="flex items-baseline gap-4 md:gap-6">
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em]" style={{ color: "hsl(var(--accent-red))" }}>
          Chapter {numeral}
        </span>
        <h2 className="font-display text-2xl md:text-5xl uppercase tracking-tight">{label}</h2>
      </div>
      {kicker && <span className="hidden md:inline font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50">{kicker}</span>}
    </div>
  </div>
);

const Index = () => {
  return (
    <>
      <Header />
      <Atmosphere />
      <main className="relative z-10">
        <HeroSection />

        <ChapterDivider numeral="II" label="About" kicker="Chi sono · Cosa offro" />
        <WhyMeSection />
        <MountainInterlude image={mtEverest} name="Everest" elevation="8.848 m · Himalaya" location="Nepal / Tibet" align="left" />

        <ChapterDivider numeral="III" label="Servizi" kicker="Siti · Canoni · Extra" />
        <PricingTeaser />
        <MountainInterlude image={mtK2} name="K2" elevation="8.611 m · Karakoram" location="Pakistan / Cina" align="right" />

        <ChapterDivider numeral="IV" label="Processo" kicker="Dal brief al lancio" />
        <div className="relative">
          <div className="absolute inset-0 bg-primary/[0.035] pointer-events-none" />
          <div className="relative"><HowItWorksSection /></div>
        </div>
        <MountainInterlude image={mtCervino} name="Cervino" elevation="4.478 m · Alpi Pennine" location="Italia / Svizzera" align="left" />

        <ParallaxBand />

        <ChapterDivider numeral="V" label="Lavori" kicker="Portfolio selezionato" />
        <UrgencySection />
        <PortfolioSection />
        <MountainInterlude image={mtFuji} name="Fuji" elevation="3.776 m · Honshu" location="Giappone" align="right" />

        <ChapterDivider numeral="VI" label="Recensioni" kicker="Cosa dicono i clienti" />
        <div className="relative">
          <div className="absolute inset-0 bg-primary/[0.04] pointer-events-none" />
          <div className="relative"><ReviewsSection /></div>
        </div>
        <FaqSection />
        <MountainInterlude image={mtDenali} name="Denali" elevation="6.190 m · Alaska Range" location="Stati Uniti" align="left" />

        <ChapterDivider numeral="VII" label="Contatto" kicker="Scrivimi · Risposta in 24h" />
        <CtaSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
};

export default Index;
