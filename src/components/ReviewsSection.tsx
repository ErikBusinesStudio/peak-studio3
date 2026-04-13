import { useState } from "react";
import { Star, Send, TrendingUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Review {
  name: string;
  role: string;
  text: string;
  rating: number;
}

const defaultReviews: Review[] = [
  {
    name: "Marco R.",
    role: "Imprenditore",
    text: "In 3 giorni avevo il sito online. Dopo 2 settimane ho iniziato a ricevere contatti. Investimento ripagato subito!",
    rating: 5,
  },
  {
    name: "Giulia P.",
    role: "Ristoratrice",
    text: "Professionale e velocissimo. Il sito è esattamente come lo volevo, i clienti lo adorano!",
    rating: 5,
  },
  {
    name: "Luca T.",
    role: "Commerciante",
    text: "Finalmente un sito che rappresenta davvero la mia attività. Prezzo onesto e risultati concreti. Consigliatissimo!",
    rating: 5,
  },
  {
    name: "Sara M.",
    role: "Estetista",
    text: "Da quando ho il sito, le prenotazioni sono triplicate. Non pensavo che un sito potesse fare questa differenza!",
    rating: 5,
  },
  {
    name: "Andrea F.",
    role: "Personal Trainer",
    text: "Sito bellissimo e veloce. I clienti mi dicono sempre che è stato il sito a convincerli a contattarmi.",
    rating: 5,
  },
  {
    name: "Valentina C.",
    role: "Fotografa",
    text: "Portfolio online perfetto, ricevo richieste ogni settimana. Il miglior investimento che potessi fare per la mia attività.",
    rating: 4,
  },
];

const chartData = [
  { month: "Gen", clienti: 14, fatturato: 1.2 },
  { month: "Feb", clienti: 23, fatturato: 2.1 },
  { month: "Mar", clienti: 31, fatturato: 3.4 },
  { month: "Apr", clienti: 42, fatturato: 4.8 },
  { month: "Mag", clienti: 56, fatturato: 6.2 },
  { month: "Giu", clienti: 68, fatturato: 7.9 },
  { month: "Lug", clienti: 79, fatturato: 9.1 },
  { month: "Ago", clienti: 85, fatturato: 9.8 },
  { month: "Set", clienti: 97, fatturato: 11.4 },
  { month: "Ott", clienti: 112, fatturato: 13.2 },
  { month: "Nov", clienti: 128, fatturato: 15.1 },
  { month: "Dic", clienti: 143, fatturato: 17.6 },
];

const maxClienti = Math.max(...chartData.map(d => d.clienti));
const maxFatturato = Math.max(...chartData.map(d => d.fatturato));

const ReviewsSection = () => {
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
          <h2 className="text-3xl md:text-5xl font-black mb-4">I risultati parlano chiaro</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Non fidarti delle parole. Guarda i numeri e le recensioni reali.</p>
        </div>

        {/* Chart */}
        <div className={`mb-16 max-w-2xl mx-auto transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-sm uppercase tracking-wider">Contatti ricevuti dai nostri clienti</h3>
            </div>
            <div className="flex items-end gap-3 h-48">
              {chartData.map((d, i) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-bold text-primary">{d.clienti}</span>
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-primary to-primary/60 transition-all duration-1000 ease-out"
                    style={{
                      height: isVisible ? `${(d.clienti / maxClienti) * 100}%` : "0%",
                      transitionDelay: `${i * 150 + 300}ms`,
                    }}
                  />
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{d.month}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-4">
              +921% di contatti in 12 mesi — dati reali dei nostri clienti
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {reviews.map((r, i) => (
            <div
              key={`${r.name}-${i}`}
              className={`bg-card border border-border rounded-xl p-8 flex flex-col justify-between hover:border-primary/30 hover:scale-[1.02] transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 150 + 400}ms` }}
            >
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
            <button
              onClick={() => setShowForm(true)}
              className="border border-primary/40 text-primary px-8 py-3 rounded-md text-sm font-bold uppercase tracking-wider hover:bg-primary/10 hover:scale-105 transition-all"
            >
              Lascia una recensione
            </button>
          ) : (
            <div className="max-w-lg mx-auto animate-fade-in-up">
              {submitted ? (
                <div className="bg-card border border-primary/30 rounded-xl p-8 text-center">
                  <p className="text-primary font-bold text-lg">Grazie per la tua recensione! ⭐</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8 space-y-5 text-left">
                  <h3 className="font-bold text-lg text-center mb-2">La tua esperienza</h3>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => setNewReview({ ...newReview, rating: star })} className="focus:outline-none">
                        <Star className={`w-7 h-7 transition-colors ${star <= newReview.rating ? "fill-primary text-primary" : "text-muted hover:text-primary/50"}`} />
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Nome *</label>
                    <input type="text" required maxLength={100} className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground" placeholder="Il tuo nome" value={newReview.name} onChange={(e) => setNewReview({ ...newReview, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Ruolo</label>
                    <input type="text" maxLength={100} className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground" placeholder="Es: Imprenditore, Ristoratore..." value={newReview.role} onChange={(e) => setNewReview({ ...newReview, role: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Recensione *</label>
                    <textarea required maxLength={500} rows={3} className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground resize-none" placeholder="Racconta la tua esperienza..." value={newReview.text} onChange={(e) => setNewReview({ ...newReview, text: e.target.value })} />
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" className="flex-1 bg-primary text-primary-foreground py-3 rounded-md font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" /> Invia
                    </button>
                    <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 rounded-md text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
                      Annulla
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
