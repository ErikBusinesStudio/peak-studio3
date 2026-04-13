import { useState } from "react";
import { Star, Send, Users, ThumbsUp, Award } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useI18n } from "@/contexts/I18nContext";

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
    { icon: Star, value: "4.9/5", label: t("reviews.stat1"), color: "text-primary" },
    { icon: Users, value: "143+", label: t("reviews.stat2"), color: "text-primary" },
    { icon: ThumbsUp, value: "98%", label: t("reviews.stat3"), color: "text-primary" },
    { icon: Award, value: "100%", label: t("reviews.stat4"), color: "text-primary" },
  ];

  const [reviews, setReviews] = useState<Review[]>(defaultReviews);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", role: "", text: "", rating: 5 });
  const [submitted, setSubmitted] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.text.trim()) return;
    setReviews([...reviews, { ...newReview, name: newReview.name.trim(), role: newReview.role.trim() || "Cliente", text: newReview.text.trim() }]);
    setNewReview({ name: "", role: "", text: "", rating: 5 });
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setShowForm(false); }, 2000);
  };

  return (
    <section id="recensioni" className="section-padding bg-card/50 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[250px]" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[200px]" />

      <div className="container mx-auto relative z-10" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="red-line mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-black mb-4">{t("reviews.title")}</h2>
          <p className="text-muted-foreground max-w-md mx-auto">{t("reviews.subtitle")}</p>
        </div>

        <div className={`mb-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {stats.map((stat, i) => (
            <div key={stat.label} className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/30 hover:scale-[1.03] transition-all duration-500" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-3xl font-black mb-1">{stat.value}</div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
          <div className="col-span-2 md:col-span-4 flex justify-center items-center gap-2 mt-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-sm font-bold">4.9 {t("reviews.outOf")}</span>
            <span className="text-xs text-muted-foreground">{t("reviews.basedOn")}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {reviews.map((r, i) => (
            <div key={`${r.name}-${i}`} className={`bg-card border border-border rounded-xl p-8 flex flex-col justify-between hover:border-primary/30 hover:scale-[1.02] transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${i * 150 + 400}ms` }}>
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={`w-4 h-4 ${j < r.rating ? "fill-primary text-primary" : "text-muted"}`} />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{r.text}"</p>
              </div>
              <div>
                <p className="font-bold text-sm">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          {!showForm ? (
            <button onClick={() => setShowForm(true)} className="border border-primary/40 text-primary px-8 py-3 rounded-md text-sm font-bold uppercase tracking-wider hover:bg-primary/10 hover:scale-105 transition-all">
              {t("reviews.leaveReview")}
            </button>
          ) : (
            <div className="max-w-lg mx-auto animate-fade-in-up">
              {submitted ? (
                <div className="bg-card border border-primary/30 rounded-xl p-8 text-center">
                  <p className="text-primary font-bold text-lg">{t("reviews.thanks")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8 space-y-5 text-left">
                  <h3 className="font-bold text-lg text-center mb-2">{t("reviews.yourExperience")}</h3>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => setNewReview({ ...newReview, rating: star })} className="focus:outline-none">
                        <Star className={`w-7 h-7 transition-colors ${star <= newReview.rating ? "fill-primary text-primary" : "text-muted hover:text-primary/50"}`} />
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
                    <button type="submit" className="flex-1 bg-primary text-primary-foreground py-3 rounded-md font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" /> {t("reviews.send")}
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
