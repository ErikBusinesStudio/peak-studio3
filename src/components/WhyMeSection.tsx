import { Zap, Target, Clock, Wallet } from "lucide-react";

const reasons = [
  { icon: Zap, title: "Siti veloci e moderni", desc: "Tecnologie all'avanguardia per un sito veloce, sicuro e sempre aggiornato." },
  { icon: Target, title: "Ottimizzati per portare clienti", desc: "Ogni sito è pensato per convertire i visitatori in clienti reali." },
  { icon: Clock, title: "Consegna veloce (48-72h)", desc: "Il tuo sito pronto in tempi record, senza compromessi sulla qualità." },
  { icon: Wallet, title: "Prezzi accessibili", desc: "Qualità professionale a un prezzo onesto, pensato per le piccole attività." },
];

const WhyMeSection = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-16">
          Perché scegliere me
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((r) => (
            <div key={r.title} className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                <r.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg">{r.title}</h3>
              <p className="text-muted-foreground text-sm">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyMeSection;
