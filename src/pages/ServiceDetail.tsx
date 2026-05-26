import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { getServiceBySlug, services } from "@/data/services";

const contactWhatsAppLink =
  "https://wa.me/393913168231?text=Ciao%2C%20vorrei%20ricevere%20informazioni%20sui%20vostri%20servizi.";

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const { ref, isVisible } = useScrollAnimation();

  if (!service) return <Navigate to="/prezzi" replace />;

  const Icon = service.icon;
  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="hidden md:block absolute top-0 right-0 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[230px]" />
          <div className="container mx-auto px-4 md:px-8 py-10 md:py-16 relative z-10">
            <Link
              to="/prezzi"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Tutti i servizi
            </Link>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <div className="red-line mb-4" />
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                  <Icon className="w-3.5 h-3.5" /> {service.heroPrice}
                </div>
                <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
                  {service.title.split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="text-gradient">{service.title.split(" ").slice(-1)}</span>
                </h1>
                <p className="text-lg md:text-xl font-bold mb-3">{service.tagline}</p>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href={contactWhatsAppLink} target="_blank" rel="noopener noreferrer" className="btn-cta">
                    Richiedi preventivo <ArrowRight className="w-4 h-4" />
                  </a>
                  <a href="#piani" className="btn-cta-soft">
                    Vedi i piani
                  </a>
                </div>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border glow">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-padding pt-0" ref={ref}>
          <div className="container mx-auto">
            <div
              className={`max-w-5xl mx-auto bg-card border border-border rounded-2xl p-6 md:p-10 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="text-xl md:text-2xl font-black mb-6">
                Perché sceglierci per <span className="text-gradient">{service.title}</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                {service.benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3 text-sm md:text-base">
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

        {/* Steps (if any) */}
        {service.steps && (
          <section className="section-padding pt-0">
            <div className="container mx-auto">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl md:text-4xl font-black mb-3">
                  Come <span className="text-gradient">funziona</span>
                </h2>
                <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
                  Un processo semplice e trasparente, dall'idea al risultato.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
                {service.steps.map((s, i) => (
                  <div key={s.title} className="bg-card border border-border rounded-2xl p-6 md:p-7 hover:border-primary/40 transition-all">
                    <div className="text-primary text-3xl font-black mb-2">0{i + 1}</div>
                    <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Plans */}
        <section id="piani" className="section-padding pt-0 scroll-mt-24">
          <div className="container mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <div className="red-line mx-auto mb-4" />
              <h2 className="text-2xl md:text-4xl font-black mb-3">
                Scegli il <span className="text-gradient">piano giusto</span>
              </h2>
              <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
                Soluzioni pensate per ogni tipo di attività e budget.
              </p>
            </div>

            <div
              className={`grid gap-4 md:gap-6 max-w-5xl mx-auto ${
                service.plans.length === 1
                  ? "md:grid-cols-1 max-w-md place-items-center"
                  : service.plans.length === 2
                  ? "md:grid-cols-2 max-w-3xl"
                  : "md:grid-cols-3"
              }`}
            >
              {service.plans.map((plan) => {
                const PIcon = plan.icon;
                return (
                  <div
                    key={plan.name}
                    className={`relative rounded-2xl p-5 md:p-7 border transition-all duration-500 hover:scale-[1.02] flex flex-col ${
                      plan.highlighted
                        ? "border-primary/60 bg-card glow md:scale-[1.03]"
                        : "border-border bg-card hover:border-border/80"
                    }`}
                  >
                    {plan.badge && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 whitespace-nowrap">
                        <Sparkles className="w-3 h-3" />
                        {plan.badge}
                      </span>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${
                          plan.highlighted ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                        }`}
                      >
                        <PIcon className="w-5 h-5" />
                      </span>
                      <h3 className="text-xl md:text-2xl font-black">{plan.name}</h3>
                    </div>
                    <p className="text-muted-foreground text-xs md:text-sm">{plan.desc}</p>
                    <div className="mt-4 mb-5 flex items-baseline gap-2">
                      <span className="text-4xl md:text-5xl font-black">€{plan.price}</span>
                      {plan.priceSuffix && (
                        <span className="text-muted-foreground text-xs md:text-sm">{plan.priceSuffix}</span>
                      )}
                    </div>
                    <ul className="space-y-2 md:space-y-2.5 mb-6 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs md:text-sm">
                          <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={contactWhatsAppLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group/cta ${plan.highlighted ? "btn-cta" : "btn-cta-soft"} w-full`}
                    >
                      {plan.cta}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        {service.faq && (
          <section className="section-padding pt-0">
            <div className="container mx-auto max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-black mb-6 text-center">
                Domande <span className="text-gradient">frequenti</span>
              </h2>
              <div className="space-y-3">
                {service.faq.map((f) => (
                  <div key={f.q} className="bg-card border border-border rounded-xl p-5">
                    <p className="font-bold mb-1">{f.q}</p>
                    <p className="text-muted-foreground text-sm">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Other services */}
        <section className="section-padding pt-0">
          <div className="container mx-auto">
            <h2 className="text-xl md:text-2xl font-black mb-6 text-center">Altri servizi</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {otherServices.map((s) => {
                const OIcon = s.icon;
                return (
                  <Link
                    key={s.slug}
                    to={`/servizi/${s.slug}`}
                    className="group bg-card border border-border rounded-xl p-5 hover:border-primary/60 hover:scale-[1.02] transition-all flex items-center gap-4"
                  >
                    <span className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <OIcon className="w-5 h-5" />
                    </span>
                    <div className="flex-1">
                      <p className="font-bold">{s.title}</p>
                      <p className="text-primary text-xs font-bold">{s.heroPrice}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                );
              })}
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

export default ServiceDetail;