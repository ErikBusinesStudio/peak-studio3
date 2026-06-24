import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import StarFour from "@/components/icons/StarFour";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { extras, getExtraBySlug } from "@/data/extras";

const wa =
  "https://wa.me/393913168231?text=Ciao%2C%20vorrei%20ricevere%20informazioni%20su%20un%20servizio%20extra.";

const ExtraDetail = () => {
  const { slug } = useParams();
  const extra = getExtraBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const { ref, isVisible } = useScrollAnimation();

  if (!extra) return <Navigate to="/" replace />;

  const others = extras.filter((e) => e.slug !== extra.slug).slice(0, 4);
  const words = extra.name.split(" ");
  const last = words.slice(-1).join(" ");
  const rest = words.length > 1 ? words.slice(0, -1).join(" ") : "";

  return (
    <>
      <Header />
      <main className="pt-24">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="hidden md:block absolute top-0 right-0 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[230px]" />
          <div className="container mx-auto px-4 md:px-8 py-10 md:py-16 relative z-10">
            <Link
              to="/#prezzi"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Torna ai servizi extra
            </Link>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <div className="red-line mb-4" />
                <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-primary mb-4">
                  V — Il Kit · Servizio Extra
                </p>
                <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
                  {rest && <>{rest} </>}
                  <span className="text-gradient">{last}</span>
                </h1>
                <p className="text-lg md:text-xl font-bold mb-3">{extra.tagline}</p>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                  {extra.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-cta">
                    Richiedi preventivo <ArrowRight className="w-4 h-4" />
                  </a>
                  <a href="#include" className="btn-cta-soft">
                    Cosa include
                  </a>
                </div>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border glow">
                <img
                  src={extra.image}
                  alt={extra.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* INCLUDE */}
        <section id="include" className="section-padding pt-0 scroll-mt-24" ref={ref}>
          <div className="container mx-auto">
            <div
              className={`max-w-5xl mx-auto bg-card border border-border rounded-2xl p-6 md:p-10 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <StarFour size={14} className="text-primary" />
                <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-muted-foreground">
                  Cosa include
                </p>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                {extra.includes.map((b, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm md:text-base">
                    <span className="w-6 h-6 rounded-md bg-primary/15 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="section-padding pt-0">
          <div className="container mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-black mb-3">
                Come <span className="text-gradient">lavoriamo</span>
              </h2>
              <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
                Processo chiaro in 3 step. Niente sorprese, niente sprechi di tempo.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
              {extra.process.map((s, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-2xl p-6 md:p-7 hover:border-primary/40 transition-all"
                >
                  <div className="text-primary text-3xl font-black mb-2">
                    0{i + 1}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        {extra.faq && extra.faq.length > 0 && (
          <section className="section-padding pt-0">
            <div className="container mx-auto max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-black mb-6 text-center">
                Domande <span className="text-gradient">frequenti</span>
              </h2>
              <div className="space-y-3">
                {extra.faq.map((f, i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-5">
                    <p className="font-bold mb-1">{f.q}</p>
                    <p className="text-muted-foreground text-sm">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* OTHERS */}
        <section className="section-padding pt-0">
          <div className="container mx-auto">
            <h2 className="text-xl md:text-2xl font-black mb-6 text-center">
              Altri servizi extra
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  to={`/extra/${o.slug}`}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card hover:border-primary/60 hover:scale-[1.02] transition-all aspect-[4/3]"
                >
                  <img
                    src={o.image}
                    alt={o.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <p className="font-display text-base md:text-lg leading-tight">
                      {o.name}
                    </p>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-primary mt-1 flex items-center gap-1">
                      Scopri <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
};

export default ExtraDetail;