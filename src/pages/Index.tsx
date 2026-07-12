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
import TrailPath from "@/components/TrailPath";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import ServicesSection from "@/components/ServicesSection";
import StatsGiants from "@/components/StatsGiants";
import SvgDivider from "@/components/SvgDivider";
import CallModal from "@/components/CallModal";
import CallButton from "@/components/CallButton";
import { useLenis } from "@/hooks/useLenis";
import { useHeadingReveal } from "@/hooks/useHeadingReveal";

const ChapterDivider = ({ numeral, label, kicker }: { numeral: string; label: string; kicker?: string }) => (
  <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
    <div className="flex items-end justify-between border-b border-foreground/20 pb-4">
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
  useLenis();
  useHeadingReveal();
  return (
    <>
      <Preloader />
      <Header />
      <Atmosphere />
      <CustomCursor />
      <TrailPath />
      <main className="relative z-10">
        <HeroSection />

        <ChapterDivider numeral="II" label="About" kicker="Chi sono · Cosa offro" />
        <WhyMeSection />

        <SvgDivider variant="wave" />
        <ServicesSection />

        <SvgDivider variant="peaks" flip />
        <StatsGiants />

        <ChapterDivider numeral="III" label="Piani" kicker="Siti · Canoni · Extra" />
        <PricingTeaser />

        <ChapterDivider numeral="IV" label="Processo" kicker="Dal brief al lancio" />
        <HowItWorksSection />

        <SvgDivider variant="cut" />
        <ChapterDivider numeral="V" label="Lavori" kicker="Portfolio selezionato" />
        <UrgencySection />
        <PortfolioSection />

        <ChapterDivider numeral="VI" label="Recensioni" kicker="Cosa dicono i clienti" />
        <ReviewsSection />
        <FaqSection />

        <SvgDivider variant="wave" flip />
        <ChapterDivider numeral="VII" label="Contatto" kicker="Scrivimi · Risposta in 24h" />
        <CtaSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <CallModal />
      <div className="fixed left-4 bottom-5 z-40 hidden md:block">
        <CallButton variant="soft" label="Consulenza gratuita" />
      </div>
    </>
  );
};

export default Index;
