import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ContactSection from "@/components/ContactSection";

const Pricing = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      // Wait for layout
      setTimeout(tryScroll, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <>
      <Header />
      <main className="pt-24">
        <div className="container mx-auto px-4 md:px-8 mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna alla home
          </Link>
        </div>
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
};

export default Pricing;