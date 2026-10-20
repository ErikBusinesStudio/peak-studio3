import { User } from "lucide-react";
import { useCopy } from "@/config/copy";
import SectionHead from "./SectionHead";

const Me = () => {
  const { c } = useCopy();
  return (
    <section id="chi-sono" aria-labelledby="chi-sono-title" className="zone-deep py-24 md:py-32">
      <div className="wrap grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHead id="chi-sono" kicker={c.me.kicker} quota={3300} title={c.me.title} />
          <p className="text-xl md:text-2xl">{c.me.p1}</p>
          <p className="mt-5 text-lg text-muted-foreground">{c.me.p2}</p>
        </div>
        {/* Slot foto: sostituisci con la tua foto */}
        <div className="surface flex aspect-[4/5] w-full max-w-sm items-center justify-center justify-self-center lg:col-span-5">
          <div className="text-center text-muted-foreground">
            <User aria-hidden className="mx-auto mb-3 h-12 w-12" />
            <p className="hud">{c.me.photo}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Me;
