import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Loader2, Mail, MessageCircle, Phone } from "lucide-react";
import { useCopy } from "@/config/copy";
import { CONTATTI, whatsappUrl } from "@/config/site";
import { isValidReach } from "@/lib/contact";
import SectionHead from "./SectionHead";

const Contact = () => {
  const { c } = useCopy();
  const [f, setF] = useState({ name: "", reach: "", business: "", message: "", privacy: false });
  const [tipo, setTipo] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [err, setErr] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    if (!isValidReach(f.reach)) {
      setErr(c.contact.invalid);
      return;
    }
    setErr("");
    setStatus("loading");
    const message = `${tipo ? `{${tipo}} ` : ""}${f.business ? `[${f.business.trim()}] ` : ""}${f.message.trim()}`;
    const { supabase } = await import("@/integrations/supabase/client");
    const { error } = await supabase.functions.invoke("submit-contact", {
      body: { name: f.name.trim(), email: f.reach.trim(), message },
    });
    if (error) {
      setStatus("error");
      return;
    }
    setStatus("ok");
    setF({ name: "", reach: "", business: "", message: "", privacy: false });
    setTipo("");
  };

  return (
    <section id="contatti" aria-labelledby="contatti-title" className="zone-deep aurora relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="aurora-layer" />
      <div aria-hidden className="stars" />
      {/* titolo a tutta larghezza sopra la griglia: il modulo non può più coprirlo */}
      <div className="wrap relative">
        <SectionHead id="contatti" kicker={c.contact.kicker} quota={4000} title={c.contact.title} intro={c.contact.intro} />
      </div>
      <div className="wrap relative grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="space-y-6 lg:col-span-4">
          <div className="surface p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{c.contact.direct}</p>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-4 w-full">
              <MessageCircle aria-hidden className="h-5 w-5" />
              {c.contact.whatsapp}
            </a>
            <ul className="mt-6 space-y-4">
              <li className="flex items-center gap-3">
                <Phone aria-hidden className="h-5 w-5 shrink-0 text-[hsl(var(--cyan))]" />
                <span className="sr-only">{c.contact.phone}</span>
                <a href={`tel:${CONTATTI.telefono.replace(/\s/g, "")}`} className="underline underline-offset-4">{CONTATTI.telefono}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail aria-hidden className="h-5 w-5 shrink-0 text-[hsl(var(--cyan))]" />
                <span className="sr-only">Email</span>
                <a href={`mailto:${CONTATTI.email}`} className="break-all underline underline-offset-4">{CONTATTI.email}</a>
              </li>
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">{c.contact.reply}</p>
          </div>
          <div className="surface p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{c.contact.stepsTitle}</p>
            <ol className="mt-4 space-y-4">
              {c.contact.steps.map((s, i) => (
                <li key={s} className="flex items-start gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[hsl(var(--cyan)/0.5)] font-mono text-sm">{i + 1}</span>
                  <span className="pt-1">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <form onSubmit={submit} className="surface space-y-5 p-6 md:p-10 lg:col-span-8" noValidate={false}>
          <h3 className="font-display text-2xl font-extrabold">{c.contact.formTitle}</h3>
          <fieldset>
            <legend className="mb-3 font-medium">{c.contact.typeLabel}</legend>
            <div className="flex flex-wrap gap-2">
              {c.contact.types.map((t) => (
                <button key={t} type="button" aria-pressed={tipo === t} onClick={() => setTipo(tipo === t ? "" : t)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${tipo === t ? "border-[hsl(var(--cyan))] bg-[hsl(var(--cyan)/0.15)]" : "border-[hsl(var(--foreground)/0.25)] hover:border-[hsl(var(--foreground)/0.6)]"}`}>
                  {t}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="cf-name" className="mb-2 block font-medium">{c.contact.name}</label>
              <input id="cf-name" required maxLength={100} autoComplete="name" className="field" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
            </div>
            <div>
              <label htmlFor="cf-reach" className="mb-2 block font-medium">{c.contact.reach}</label>
              <input id="cf-reach" required maxLength={200} autoComplete="email" aria-invalid={!!err} aria-describedby={err ? "cf-err" : undefined} className="field" value={f.reach} onChange={(e) => setF({ ...f, reach: e.target.value })} />
            </div>
          </div>
          <div>
            <label htmlFor="cf-biz" className="mb-2 block font-medium">{c.contact.business}</label>
            <input id="cf-biz" maxLength={100} className="field" value={f.business} onChange={(e) => setF({ ...f, business: e.target.value })} />
          </div>
          <div>
            <label htmlFor="cf-msg" className="mb-2 block font-medium">{c.contact.message}</label>
            <textarea id="cf-msg" required rows={4} maxLength={2000} className="field resize-y" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
          </div>
          <div className="flex items-start gap-3">
            <input id="cf-privacy" type="checkbox" required checked={f.privacy} onChange={(e) => setF({ ...f, privacy: e.target.checked })} className="mt-1 h-5 w-5 shrink-0 accent-[hsl(var(--cyan))]" />
            <label htmlFor="cf-privacy" className="text-sm text-muted-foreground">
              {c.contact.privacy} <Link to="/privacy" className="underline underline-offset-4">({c.contact.privacyLink})</Link>
            </label>
          </div>
          {err && <p id="cf-err" role="alert" className="text-sm font-semibold text-[hsl(var(--cyan))]">{err}</p>}
          <button type="submit" disabled={status === "loading"} className="btn btn-primary w-full disabled:opacity-70">
            {status === "loading" && <Loader2 aria-hidden className="h-4 w-4 animate-spin" />}
            {status === "ok" && <CheckCircle2 aria-hidden className="h-4 w-4" />}
            {status === "loading" ? c.contact.sending : c.contact.send}
          </button>
          <p role="status" aria-live="polite" className="min-h-[1.5em] text-sm">
            {status === "ok" && c.contact.sent}
            {status === "error" && c.contact.error}
          </p>
        </form>
      </div>
    </section>
  );
};

export default Contact;
