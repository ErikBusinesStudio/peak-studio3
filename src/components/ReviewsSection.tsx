import { useEffect, useState } from "react";
import { Send, Users, ThumbsUp, Award } from "lucide-react";
import StarFour from "@/components/icons/StarFour";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useI18n } from "@/contexts/I18nContext";
import { supabase } from "@/integrations/supabase/client";

interface Review {
  name: string;
  role: string;
  text: string;
  rating: number;
}

const ReviewsSection = () => {
  const { t } = useI18n();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", role: "", text: "", rating: 5 });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    supabase
      .from("reviews")
      .select("name, role, text, rating")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setReviews(data as Review[]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.text.trim()) return;
    setSubmitting(true);
    setError(null);
    const { data, error: fnError } = await supabase.functions.invoke("submit-review", {
      body: {
        name: newReview.name.trim(),
        role: newReview.role.trim() || "Cliente",
        text: newReview.text.trim(),
        rating: newReview.rating,
      },
    });
    setSubmitting(false);
    if (fnError || !data?.success) {
      setError("Errore nell'invio. Riprova.");
      return;
    }
    setNewReview({ name: "", role: "", text: "", rating: 5 });
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setShowForm(false); }, 3000);
  };

  return (
    <section id="recensioni" className="section-padding relative overflow-hidden">
      <div className="hidden md:block absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[250px]" />
      <div className="hidden md:block absolute top-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[200px]" />

      <div className="container mx-auto relative z-10" ref={ref}>
        <div className={`text-center mb-10 md:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="red-line mx-auto mb-4 md:mb-6" />
          <h2 className="text-2xl md:text-5xl font-black mb-3">{t("reviews.title")}</h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base">{t("reviews.subtitle")}</p>
        </div>

        {reviews.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-12">
            {reviews.map((r, i) => (
              <div key={`${r.name}-${i}`} className={`bg-card border border-border rounded-xl p-5 md:p-8 flex flex-col justify-between hover:border-primary/30 hover:scale-[1.02] transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${i * 150 + 200}ms` }}>
                <div>
                  <div className="flex gap-1 mb-3 md:mb-4">
                    {[...Array(5)].map((_, j) => (
                      <StarFour key={j} className={j < r.rating ? "text-primary" : "text-muted"} size={14} />
                    ))}
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4 md:mb-6">"{r.text}"</p>
                </div>
                <div>
                  <p className="font-bold text-xs md:text-sm">{r.name}</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground">{r.role}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`max-w-2xl mx-auto mb-10 md:mb-12 bg-card border border-dashed border-primary/30 rounded-2xl p-8 md:p-12 text-center transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <StarFour className="text-primary" size={24} />
            </div>
            <h3 className="font-black text-lg md:text-2xl mb-3">Sii il primo a lasciare una recensione</h3>
            <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
              Preferisco costruire questa sezione con recensioni vere dei miei clienti. Se hai lavorato con me, la tua opinione è preziosa.
            </p>
          </div>
        )}

        <div className="text-center">
          {!showForm ? (
            <button onClick={() => setShowForm(true)} className="border border-primary/40 text-primary px-6 md:px-8 py-2.5 md:py-3 rounded-md text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-primary/10 hover:scale-105 transition-all">
              {t("reviews.leaveReview")}
            </button>
          ) : (
            <div className="max-w-lg mx-auto animate-fade-in-up">
              {submitted ? (
                <div className="bg-card border border-primary/30 rounded-xl p-6 md:p-8 text-center">
                  <p className="text-primary font-bold text-base md:text-lg mb-2">{t("reviews.thanks")}</p>
                  <p className="text-muted-foreground text-xs md:text-sm">La tua recensione sarà pubblicata dopo l'approvazione.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-4 md:space-y-5 text-left">
                  <h3 className="font-bold text-base md:text-lg text-center mb-2">{t("reviews.yourExperience")}</h3>
                  {error && <p className="text-destructive text-sm text-center">{error}</p>}
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => setNewReview({ ...newReview, rating: star })} className="focus:outline-none">
                        <StarFour className={`transition-colors ${star <= newReview.rating ? "text-primary" : "text-muted hover:text-primary/50"}`} size={26} />
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">{t("reviews.name")} *</label>
                    <input type="text" required maxLength={100} className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground" placeholder={t("contact.namePlaceholder")} value={newReview.name} onChange={(e) => setNewReview({ ...newReview, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">{t("reviews.role")}</label>
                    <input type="text" maxLength={100} className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground" value={newReview.role} onChange={(e) => setNewReview({ ...newReview, role: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">{t("reviews.review")} *</label>
                    <textarea required maxLength={500} rows={3} className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground resize-none" value={newReview.text} onChange={(e) => setNewReview({ ...newReview, text: e.target.value })} />
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" disabled={submitting} className="flex-1 bg-primary text-primary-foreground py-3 rounded-md font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50">
                      <Send className="w-4 h-4" /> {submitting ? "Invio..." : t("reviews.send")}
                    </button>
                    <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 rounded-md text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
                      {t("reviews.cancel")}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
