import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useI18n } from "@/contexts/I18nContext";

const ContactSection = () => {
  const [formData, setFormData] = useState({ nome: "", email: "", messaggio: "" });
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useI18n();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(`Ciao, mi chiamo ${formData.nome}. ${formData.messaggio} (Email: ${formData.email})`);
    window.open(`https://wa.me/393913168231?text=${msg}`, "_blank");
  };

  return (
    <section id="contatti" className="section-padding relative overflow-hidden">
      <div className="hidden md:block absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[200px]" />
      <div className="container mx-auto relative z-10" ref={ref}>
        <div className={`text-center mb-10 md:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="red-line mx-auto mb-4 md:mb-6" />
          <h2 className="text-2xl md:text-5xl font-black mb-3">{t("contact.title")}</h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base">{t("contact.subtitle")}</p>
        </div>
        <div className={`grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="space-y-6 md:space-y-8">
            <div>
              <h3 className="font-bold text-lg md:text-xl mb-1 md:mb-2">Peak Studio</h3>
              <p className="text-muted-foreground text-xs md:text-sm">Erik Baraca — Web Site Creator</p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <a href="tel:+393913168231" className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"><Phone className="w-4 h-4 md:w-5 md:h-5 text-primary" /> +39 391 316 8231</a>
              <a href="mailto:erikbaraca119@gmail.com" className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"><Mail className="w-4 h-4 md:w-5 md:h-5 text-primary" /> erikbaraca119@gmail.com</a>
              <div className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground"><MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary" /> Via Libertà 84, Casalzuigno (VA) 21030</div>
            </div>
            <a href="https://wa.me/393913168231" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold text-xs md:text-sm hover:opacity-90 hover:scale-105 transition-all">
              <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.553 4.107 1.519 5.834L0 24l6.335-1.652A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.97 0-3.839-.517-5.47-1.482l-.392-.232-3.76.98.998-3.648-.255-.404A9.716 9.716 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
              {t("contact.whatsapp")}
            </a>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <div>
              <label className="text-xs md:text-sm font-medium mb-2 block">{t("contact.name")}</label>
              <input type="text" required maxLength={100} className="w-full bg-card border border-border rounded-lg px-4 py-2.5 md:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground" placeholder={t("contact.namePlaceholder")} value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} />
            </div>
            <div>
              <label className="text-xs md:text-sm font-medium mb-2 block">{t("contact.email")}</label>
              <input type="email" required maxLength={255} className="w-full bg-card border border-border rounded-lg px-4 py-2.5 md:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground" placeholder={t("contact.emailPlaceholder")} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div>
              <label className="text-xs md:text-sm font-medium mb-2 block">{t("contact.message")}</label>
              <textarea required maxLength={1000} rows={3} className="w-full bg-card border border-border rounded-lg px-4 py-2.5 md:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground resize-none" placeholder={t("contact.messagePlaceholder")} value={formData.messaggio} onChange={(e) => setFormData({ ...formData, messaggio: e.target.value })} />
            </div>
            <button type="submit" className="w-full bg-primary text-primary-foreground py-2.5 md:py-3 rounded-lg font-semibold text-sm hover:opacity-90 hover:scale-105 transition-all">{t("contact.send")}</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
