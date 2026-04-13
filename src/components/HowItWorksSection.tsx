import { MessageSquare, Code2, Rocket } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Contattami",
    desc: "Scrivimi su WhatsApp o compila il form. Mi racconti la tua attività e in 5 minuti capiamo cosa ti serve.",
  },
  {
    icon: Code2,
    number: "02",
    title: "Sviluppo il sito",
    desc: "In 24-48 ore costruisco il tuo sito su misura: design aggressivo, velocità estrema, ottimizzato per vendere.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Vai online e vendi",
    desc: "Il tuo sito è live. Inizi a ricevere clienti dal primo giorno. Tu lavori, il sito vende per te 24/7.",
  },
];

const HowItWorksSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[220px]" />

      <div className="container mx-auto relative z-10" ref={ref}>
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="red-line mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            3 step. <span className="text-gradient">Zero complicazioni.</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Dal primo messaggio al sito online in meno di 48 ore.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`relative text-center p-8 rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:scale-[1.03] ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 text-primary/40 text-2xl font-bold">
                  →
                </div>
              )}
              <div className="text-5xl font-black text-primary/20 mb-4">
                {step.number}
              </div>
              <div className="w-14 h-14 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-black mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
