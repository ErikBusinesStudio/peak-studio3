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

  const defaultReviews: Review[] = [
    { name: t("reviews.r1.name"), role: t("reviews.r1.role"), text: t("reviews.r1.text"), rating: 5 },
    { name: t("reviews.r2.name"), role: t("reviews.r2.role"), text: t("reviews.r2.text"), rating: 5 },
    { name: t("reviews.r3.name"), role: t("reviews.r3.role"), text: t("reviews.r3.text"), rating: 5 },
    { name: t("reviews.r4.name"), role: t("reviews.r4.role"), text: t("reviews.r4.text"), rating: 5 },
    { name: t("reviews.r5.name"), role: t("reviews.r5.role"), text: t("reviews.r5.text"), rating: 5 },
    { name: t("reviews.r6.name"), role: t("reviews.r6.role"), text: t("reviews.r6.text"), rating: 4 },
  ];

  const stats = [
    { icon: StarFour, value: "4.9/5", label: t("reviews.stat1"), color: "text-primary" },
    { icon: Users, value: "143+", label: t("reviews.stat2"), color: "text-primary" },
    { icon: ThumbsUp, value: "98%", label: t("reviews.stat3"), color: "text-primary" },
    { icon: Award, value: "100%", label: t("reviews.stat4"), color: "text-primary" },
  ];

  const [reviews, setReviews] = useState<Review[]>(defaultReviews);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", role: "", text: "", rating: 5 });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  // Google-style rating distribution
  const total = reviews.length;
  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    return { star, count, pct: total ? Math.round((count / total) * 100) : 0 };
  });
  const average = total ? (reviews.reduce((s, r) => s + r.rating, 0) / total).toFixed(1) : "0.0";

  useEffect(() => {
    supabase
      .from("reviews")
      .select("name, role, text, rating")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setReviews([...data as Review[], ...defaultReviews]);
        }
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

        <div className={`mb-10 md:mb-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-4xl mx-auto transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {stats.map((stat, i) => (
            <div key={stat.label} className="bg-card border border-border rounded-xl p-4 md:p-6 text-center hover:border-primary/30 hover:scale-[1.03] transition-all duration-500" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 md:mb-3 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
              </div>
              <div className="text-xl md:text-3xl font-black mb-1">{stat.value}</div>
              <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
          <div className="col-span-2 md:col-span-4 flex justify-center items-center gap-2 mt-1 md:mt-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <StarFour key={i} className="text-primary" size={20} />
              ))}
            </div>
            <span className="text-xs md:text-sm font-bold">4.9 {t("reviews.outOf")}</span>
            <span className="text-[10px] md:text-xs text-muted-foreground">{t("reviews.basedOn")}</span>
          </div>
        </div>

        {/* Google Reviews Chart */}
        <div className={`max-w-4xl mx-auto mb-10 md:mb-16 rounded-2xl border border-primary/20 bg-card/60 backdrop-blur-sm p-5 md:p-8 transition-all duration-700 delay-200 relative overflow-hidden ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-pulse-slow" />
          <div className="relative grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-center">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 mb-3">
                <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden="true">
                  <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
                  <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
                  <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"/>
                  <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
                </svg>
                <span className="text-xs md:text-sm font-bold uppercase tracking-wider">Google Reviews</span>
              </div>
              <div className="text-5xl md:text-6xl font-black text-gradient leading-none">{average}</div>
              <div className="flex gap-0.5 mt-2">
                {[...Array(5)].map((_, i) => (
                  <StarFour key={i} className="text-primary" size={16} />
                ))}
              </div>
              <p className="text-[10px] md:text-xs text-muted-foreground mt-1">{total} recensioni verificate</p>
            </div>
            <div className="space-y-2 md:space-y-3 w-full">
              {distribution.map((d, i) => (
                <div key={d.star} className="flex items-center gap-3">
                  <span className="text-xs md:text-sm font-bold w-4 text-right tabular-nums">{d.star}</span>
                  <StarFour className="text-primary shrink-0" size={12} />
                  <div className="flex-1 h-2 md:h-2.5 rounded-full bg-primary/10 overflow-hidden relative">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary/70 via-primary to-primary/70 relative"
                      style={{
                        width: isVisible ? `${d.pct}%` : "0%",
                        transition: `width 1s cubic-bezier(0.16,1,0.3,1) ${300 + i * 120}ms`,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-marquee" style={{ backgroundSize: "50% 100%" }} />
                    </div>
                  </div>
                  <span className="text-[10px] md:text-xs text-muted-foreground w-10 tabular-nums">{d.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-12">
          {reviews.map((r, i) => (
            <div key={`${r.name}-${i}`} className={`bg-card border border-border rounded-xl p-5 md:p-8 flex flex-col justify-between hover:border-primary/30 hover:scale-[1.02] transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${i * 150 + 400}ms` }}>
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
