import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Loader2, Mail, MessageCircle } from "lucide-react";
import { useCopy } from "@/config/copy";
import { CONTATTI, whatsappUrl } from "@/config/site";
import { isValidReach } from "@/lib/contact";
import SectionHead from "./SectionHead";

const Contact = () => {
  const { c } = useCopy();
  const [f, setF] = useState({ name: "", reach: "", business: "", message: "", privacy: false });
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
    const message = `${f.business ? `[${f.business.trim()}] ` : ""}${f.message.trim()}`;
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
  };

  return (
    <section id="contatti" aria-labelledby="contatti-title" className="zone-deep aurora relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="aurora-layer" />
      <div aria-hidden className="stars" />
      <div className="wrap relative grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead id="contatti" kicker={c.contact.kicker} quota={4000} title={c.contact.title} intro={c.contact.intro} />
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <MessageCircle aria-hidden className="h-5 w-5" />
            {c.contact.whatsapp}
          </a>
          <p className="mt-6 flex items-center gap-3 text-lg">
            <Mail aria-hidden className="h-5 w-5 text-[hsl(var(--cyan))]" />
            <span className="sr-only">Email</span>
            <a href={`mailto:${CONTATTI.email}`} className="break-all underline underline-offset-4">{CONTATTI.email}</a>
          </p>
        </div>

        <form onSubmit={submit} className="surface space-y-5 p-6 md:p-10 lg:col-span-7" noValidate={false}>
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
