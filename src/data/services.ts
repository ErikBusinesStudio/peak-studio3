import { Globe, Wrench, QrCode, Sparkles, FileText, Megaphone, Crown, Zap, TrendingUp, Smartphone, Headphones, type LucideIcon } from "lucide-react";
import imgSitiWeb from "@/assets/service-siti-web.jpg";
import imgAbbonamenti from "@/assets/service-abbonamenti.jpg";
import imgGestione from "@/assets/service-gestione.jpg";
import imgQrCode from "@/assets/service-qrcode.jpg";
import imgVolantini from "@/assets/service-volantini.jpg";
import imgBranding from "@/assets/service-branding.jpg";

export type ServicePlan = {
  key: string; // plan key, used to build translation paths
  price: string;
  badge?: boolean;
  highlighted?: boolean;
  featuresCount: number;
  icon: LucideIcon;
};

export type Service = {
  slug: string;
  image: string;
  icon: LucideIcon;
  heroPrice: string;
  benefitsCount: number;
  stepsCount?: number;
  plans: ServicePlan[];
  faqCount: number;
};

export const services: Service[] = [
  {
    slug: "siti-web",
    image: imgSitiWeb,
    icon: Globe,
    heroPrice: "Da 300€",
    benefitsCount: 5,
    plans: [
      { key: "base", price: "300", featuresCount: 5, icon: Globe },
      { key: "standard", price: "500", featuresCount: 5, badge: true, highlighted: true, icon: Sparkles },
      { key: "premium", price: "1200+", featuresCount: 6, icon: Crown },
    ],
    faqCount: 6,
  },
  {
    slug: "abbonamenti",
    image: imgAbbonamenti,
    icon: Megaphone,
    heroPrice: "Da 299€/mese",
    benefitsCount: 5,
    plans: [
      { key: "start", price: "299", featuresCount: 7, icon: Zap },
      { key: "growth", price: "549", featuresCount: 9, badge: true, highlighted: true, icon: TrendingUp },
    ],
    faqCount: 4,
  },
  {
    slug: "gestione-sito",
    image: imgGestione,
    icon: Wrench,
    heroPrice: "Da 30€/mese",
    benefitsCount: 5,
    plans: [
      { key: "basic", price: "30", featuresCount: 3, icon: Wrench },
      { key: "growth", price: "50", featuresCount: 3, badge: true, highlighted: true, icon: Sparkles },
      { key: "pro", price: "80", featuresCount: 4, icon: Headphones },
    ],
    faqCount: 4,
  },
  {
    slug: "qr-code",
    image: imgQrCode,
    icon: QrCode,
    heroPrice: "Da 20€",
    benefitsCount: 3,
    plans: [
      { key: "base", price: "20", featuresCount: 3, icon: QrCode },
    ],
    faqCount: 3,
  },
  {
    slug: "volantini",
    image: imgVolantini,
    icon: FileText,
    heroPrice: "Da 120€",
    benefitsCount: 5,
    stepsCount: 3,
    plans: [
      { key: "base", price: "120–200", featuresCount: 3, icon: FileText },
      { key: "business", price: "250–450", featuresCount: 3, badge: true, highlighted: true, icon: Sparkles },
      { key: "growth", price: "500–900", featuresCount: 3, icon: Crown },
    ],
    faqCount: 4,
  },
  {
    slug: "extra",
    image: imgBranding,
    icon: Sparkles,
    heroPrice: "Da 150€",
    benefitsCount: 5,
    plans: [
      { key: "branding", price: "150", featuresCount: 4, icon: Sparkles },
      { key: "shooting", price: "200", featuresCount: 4, badge: true, highlighted: true, icon: Smartphone },
      { key: "eventi", price: "250", featuresCount: 4, icon: Crown },
    ],
    faqCount: 3,
  },
];

export const getServiceBySlug = (slug?: string) => services.find((s) => s.slug === slug);
