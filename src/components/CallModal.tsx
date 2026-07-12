import { useEffect, useState } from "react";
import { X, Phone, MessageCircle } from "lucide-react";

export const openCallModal = () => {
  window.dispatchEvent(new CustomEvent("peak:open-call"));
};

const CallModal = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("peak:open-call", onOpen);
    return () => window.removeEventListener("peak:open-call", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  const message = `Ciao Peak Studio, sono ${name || "..."}. Vorrei una consulenza. Contatto: ${contact || "..."}`;
  const waHref = `https://wa.me/393913168231?text=${encodeURIComponent(message)}`;
  const mailHref = `mailto:erikbaraca119@gmail.com?subject=${encodeURIComponent("Richiesta consulenza — " + (name || ""))}&body=${encodeURIComponent(message)}`;

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center p-4 animate-fade-in"
      style={{ background: "hsl(220 40% 8% / 0.72)", backdropFilter: "blur(6px)" }}
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-primary/30 bg-card p-6 md:p-9 shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Chiudi"
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center hover:bg-muted transition"
        >
          <X className="w-4 h-4" />
        </button>

        <p className="eyebrow mb-3">Consulenza · Gratuita · 15 min</p>
        <h3 className="font-display text-2xl md:text-4xl leading-[0.95] tracking-tight mb-2">
          Ti richiamo <span className="text-gradient">entro 24 ore.</span>
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Lasciami due righe, ti scrivo io. Nessun impegno, nessuna mail commerciale.
        </p>

        <div className="flex flex-col gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Il tuo nome"
            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary/60 focus:outline-none text-sm"
          />
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Telefono o email"
            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary/60 focus:outline-none text-sm"
          />

          <div className="grid grid-cols-2 gap-3 mt-2">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta !py-3 !text-xs justify-center"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <a href={mailHref} className="btn-cta-soft !py-3 !text-xs justify-center">
              <Phone className="w-4 h-4" /> Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallModal;