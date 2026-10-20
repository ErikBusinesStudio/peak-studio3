import { useCopy } from "@/config/copy";
import { TESTIMONIANZE } from "@/config/site";

/** Mostrata solo quando TESTIMONIANZE contiene recensioni reali. */
const Testimonials = () => {
  const { lang } = useCopy();
  if (TESTIMONIANZE.length === 0) return null;
  return (
    <section aria-label={lang === "en" ? "Testimonials" : "Testimonianze"} className="zone-mid py-20">
      <ul className="wrap grid gap-5 md:grid-cols-2">
        {TESTIMONIANZE.map((t) => (
          <li key={t.nome} className="surface p-6">
            <blockquote className="text-lg">“{t.testo[lang]}”</blockquote>
            <p className="mt-4 font-semibold">{t.nome} · <span className="text-muted-foreground">{t.attivita}</span></p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Testimonials;
