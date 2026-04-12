import { useState } from "react";
import { Star, Send } from "lucide-react";

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
];

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>(defaultReviews);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", role: "", text: "", rating: 5 });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.text.trim()) return;

    setReviews([...reviews, { ...newReview, name: newReview.name.trim(), role: newReview.role.trim() || "Cliente", text: newReview.text.trim() }]);
    setNewReview({ name: "", role: "", text: "", rating: 5 });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
    }, 2000);
  };

  return (
    <section id="recensioni" className="section-padding bg-card/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="red-line mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Cosa dicono i clienti
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Le recensioni di chi ha già scelto Peak Studio.
          </p>
        </div>

        {/* Reviews grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {reviews.map((r, i) => (
            <div
              key={`${r.name}-${i}`}
              className="bg-card border border-border rounded-xl p-8 flex flex-col justify-between hover:border-primary/30 transition-colors"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className={`w-4 h-4 ${j < r.rating ? "fill-primary text-primary" : "text-muted"}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  "{r.text}"
                </p>
              </div>
              <div>
                <p className="font-bold text-sm">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Add review */}
        <div className="text-center">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="border border-primary/40 text-primary px-8 py-3 rounded-md text-sm font-bold uppercase tracking-wider hover:bg-primary/10 transition-all"
            >
              Lascia una recensione
            </button>
          ) : (
            <div className="max-w-lg mx-auto">
              {submitted ? (
                <div className="bg-card border border-primary/30 rounded-xl p-8 text-center">
                  <p className="text-primary font-bold text-lg">Grazie per la tua recensione! ⭐</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8 space-y-5 text-left">
                  <h3 className="font-bold text-lg text-center mb-2">La tua esperienza</h3>

                  {/* Rating */}
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-7 h-7 transition-colors ${
                            star <= newReview.rating ? "fill-primary text-primary" : "text-muted hover:text-primary/50"
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Nome *</label>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                      placeholder="Il tuo nome"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Ruolo</label>
                    <input
                      type="text"
                      maxLength={100}
                      className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                      placeholder="Es: Imprenditore, Ristoratore..."
                      value={newReview.role}
                      onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Recensione *</label>
                    <textarea
                      required
                      maxLength={500}
                      rows={3}
                      className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground resize-none"
                      placeholder="Racconta la tua esperienza..."
                      value={newReview.text}
                      onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-primary text-primary-foreground py-3 rounded-md font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" /> Invia
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-6 py-3 rounded-md text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
                    >
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
