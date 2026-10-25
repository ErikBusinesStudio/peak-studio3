import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BarChart3, Download, ExternalLink, Inbox, LogOut, Mail, MessageCircle, Phone, Settings, Star, Tag, Trash2, Briefcase, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { ADDON, PIANI } from "@/config/site";
import { DEFAULTS, type PortfolioOverride, type PrezziOverride } from "@/config/overrides";
import logoDark from "@/assets/logo-dark.webp";

type Contact = Tables<"contacts">;
type Review = Tables<"reviews">;
type EmailLog = Tables<"email_send_log">;
type Tab = "panoramica" | "messaggi" | "recensioni" | "prezzi" | "portfolio" | "email" | "account";

const TABS: { id: Tab; label: string; icon: typeof Inbox }[] = [
  { id: "panoramica", label: "Panoramica", icon: BarChart3 },
  { id: "messaggi", label: "Messaggi", icon: Inbox },
  { id: "recensioni", label: "Recensioni", icon: Star },
  { id: "prezzi", label: "Prezzi", icon: Tag },
  { id: "portfolio", label: "Portfolio", icon: Briefcase },
  { id: "email", label: "Email inviate", icon: Send },
  { id: "account", label: "Account", icon: Settings },
];

const STATI = [
  { id: "nuovo", label: "Nuovo" },
  { id: "letto", label: "Letto" },
  { id: "in_corso", label: "In trattativa" },
  { id: "chiuso", label: "Chiuso" },
  { id: "archiviato", label: "Archiviato" },
];

const fmt = (d: string) => new Date(d).toLocaleString("it-IT", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
const isEmail = (s: string) => s.includes("@");
const card = "rounded-2xl border border-border bg-card p-5";
const input = "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm";

const Admin = () => {
  const nav = useNavigate();
  const [state, setState] = useState<"loading" | "denied" | "ok">("loading");
  const [email, setEmail] = useState("");
  const [tab, setTab] = useState<Tab>("panoramica");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [content, setContent] = useState<{ prezzi: PrezziOverride; portfolio: PortfolioOverride }>({ prezzi: {}, portfolio: {} });
  const [toast, setToast] = useState<string | null>(null);

  const flash = (m: string) => {
    setToast(m);
    window.setTimeout(() => setToast(null), 2500);
  };

  const load = useCallback(async () => {
    const [c, r, l, s] = await Promise.all([
      supabase.from("contacts").select("*").order("created_at", { ascending: false }),
      supabase.from("reviews").select("*").order("created_at", { ascending: false }),
      supabase.from("email_send_log").select("*").order("created_at", { ascending: false }).limit(200),
      supabase.from("site_content").select("key,value"),
    ]);
    setContacts(c.data ?? []);
    setReviews(r.data ?? []);
    setLogs(l.data ?? []);
    const map = Object.fromEntries((s.data ?? []).map((x) => [x.key, x.value]));
    setContent({ prezzi: (map.prezzi as PrezziOverride) ?? {}, portfolio: (map.portfolio as PortfolioOverride) ?? {} });
  }, []);

  useEffect(() => {
    document.title = "Pannello · Peak Studio";
    const check = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return nav("/admin/login", { replace: true });
      setEmail(data.user.email ?? "");
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id);
      if (!roles?.some((r) => r.role === "admin")) return setState("denied");
      setState("ok");
      load();
    };
    check();
    const { data } = supabase.auth.onAuthStateChange((e) => {
      if (e === "SIGNED_OUT") nav("/admin/login", { replace: true });
    });
    return () => data.subscription.unsubscribe();
  }, [nav, load]);

  const logout = () => supabase.auth.signOut();

  if (state === "loading") return <div className="zone-snow min-h-screen bg-background p-10 text-foreground">Caricamento…</div>;
  if (state === "denied")
    return (
      <main className="zone-snow flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-6 text-center text-foreground">
        <h1 className="font-display text-2xl font-extrabold">Accesso non autorizzato</h1>
        <p className="text-muted-foreground">L'account {email} non ha accesso al pannello.</p>
        <button onClick={logout} className="btn btn-secondary">Esci</button>
      </main>
    );

  const nuovi = contacts.filter((c) => c.status === "nuovo").length;
  const pending = reviews.filter((r) => r.status === "pending").length;

  return (
    <div className="zone-snow min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-3">
            <Link to="/"><img src={logoDark} alt="Peak Studio" width={320} height={136} className="h-8 w-auto" /></Link>
            <span className="hud hidden text-xs text-muted-foreground sm:inline">Pannello di controllo</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="hidden text-muted-foreground md:inline">{email}</span>
            <a href="/" target="_blank" rel="noreferrer" className="rounded-full border border-border px-3 py-2 hover:bg-secondary">Vedi sito</a>
            <button onClick={logout} aria-label="Esci" className="rounded-full border border-border p-2 hover:bg-secondary"><LogOut className="h-4 w-4" /></button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Sezioni pannello" className="flex gap-2 overflow-x-auto lg:flex-col">
          {TABS.map((t) => {
            const badge = t.id === "messaggi" ? nuovi : t.id === "recensioni" ? pending : 0;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} aria-current={tab === t.id ? "page" : undefined}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${tab === t.id ? "bg-foreground text-background" : "hover:bg-secondary"}`}>
                <t.icon className="h-4 w-4" aria-hidden />
                <span className="flex-1">{t.label}</span>
                {badge > 0 && <span className="rounded-full bg-primary px-2 text-xs text-primary-foreground">{badge}</span>}
              </button>
            );
          })}
        </nav>

        <main>
          {tab === "panoramica" && <Overview contacts={contacts} reviews={reviews} logs={logs} go={setTab} />}
          {tab === "messaggi" && <Messages contacts={contacts} setContacts={setContacts} flash={flash} />}
          {tab === "recensioni" && <Reviews reviews={reviews} setReviews={setReviews} flash={flash} />}
          {tab === "prezzi" && <Prices value={content.prezzi} onSaved={(p) => setContent((c) => ({ ...c, prezzi: p }))} flash={flash} />}
          {tab === "portfolio" && <PortfolioEditor value={content.portfolio} onSaved={(p) => setContent((c) => ({ ...c, portfolio: p }))} flash={flash} />}
          {tab === "email" && <EmailLogs logs={logs} />}
          {tab === "account" && <Account email={email} flash={flash} />}
        </main>
      </div>
      {toast && <div role="status" className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-foreground px-5 py-3 text-sm text-background shadow-lg">{toast}</div>}
    </div>
  );
};

/* ---------- Panoramica ---------- */
const Overview = ({ contacts, reviews, logs, go }: { contacts: Contact[]; reviews: Review[]; logs: EmailLog[]; go: (t: Tab) => void }) => {
  const now = Date.now();
  const days = (n: number) => contacts.filter((c) => now - new Date(c.created_at).getTime() < n * 864e5).length;
  const series = useMemo(() => {
    const out: { giorno: string; richieste: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now - i * 864e5);
      const key = d.toDateString();
      out.push({ giorno: d.toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit" }), richieste: contacts.filter((c) => new Date(c.created_at).toDateString() === key).length });
    }
    return out;
  }, [contacts, now]);
  const approvate = reviews.filter((r) => r.status === "approved");
  const media = approvate.length ? (approvate.reduce((s, r) => s + r.rating, 0) / approvate.length).toFixed(1) : "–";
  const emailFail = logs.filter((l) => ["failed", "dlq", "bounced"].includes(l.status)).length;
  const stats = [
    { label: "Messaggi totali", v: contacts.length, t: "messaggi" as Tab },
    { label: "Da leggere", v: contacts.filter((c) => c.status === "nuovo").length, t: "messaggi" as Tab },
    { label: "Ultimi 7 giorni", v: days(7), t: "messaggi" as Tab },
    { label: "Ultimi 30 giorni", v: days(30), t: "messaggi" as Tab },
    { label: "Recensioni in attesa", v: reviews.filter((r) => r.status === "pending").length, t: "recensioni" as Tab },
    { label: "Voto medio", v: media, t: "recensioni" as Tab },
    { label: "In trattativa", v: contacts.filter((c) => c.status === "in_corso").length, t: "messaggi" as Tab },
    { label: "Email con problemi", v: emailFail, t: "email" as Tab },
  ];
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-extrabold">Ciao Erik</h1>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((s) => (
          <button key={s.label} onClick={() => go(s.t)} className={`${card} text-left transition-colors hover:border-primary`}>
            <div className="text-xs text-muted-foreground">{s.label}</div>
            <div className="mt-1 font-display text-3xl font-extrabold">{s.v}</div>
          </button>
        ))}
      </div>
      <section className={card}>
        <h2 className="mb-4 font-semibold">Richieste negli ultimi 30 giorni</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="giorno" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" interval={4} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" width={28} />
              <Tooltip />
              <Area type="monotone" dataKey="richieste" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
      <section className={card}>
        <h2 className="mb-3 font-semibold">Ultimi messaggi</h2>
        {contacts.length === 0 ? <p className="text-sm text-muted-foreground">Nessun messaggio ancora.</p> : (
          <ul className="divide-y divide-border">
            {contacts.slice(0, 5).map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                <span className="font-medium">{c.name}</span>
                <span className="truncate text-muted-foreground">{c.message.slice(0, 60)}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{fmt(c.created_at)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

/* ---------- Messaggi ---------- */
const Messages = ({ contacts, setContacts, flash }: { contacts: Contact[]; setContacts: (f: (c: Contact[]) => Contact[]) => void; flash: (m: string) => void }) => {
  const [q, setQ] = useState("");
  const [filtro, setFiltro] = useState("tutti");
  const [open, setOpen] = useState<string | null>(null);
  const list = contacts.filter((c) => (filtro === "tutti" || c.status === filtro) && `${c.name} ${c.email} ${c.message}`.toLowerCase().includes(q.toLowerCase()));

  const update = async (id: string, patch: Partial<Contact>) => {
    const { error } = await supabase.from("contacts").update(patch).eq("id", id);
    if (error) return flash("Salvataggio non riuscito");
    setContacts((cs) => cs.map((c) => (c.id === id ? { ...c, ...patch } : c)));
    flash("Salvato");
  };
  const remove = async (id: string) => {
    if (!confirm("Eliminare definitivamente questo messaggio?")) return;
    const { error } = await supabase.from("contacts").delete().eq("id", id);
    if (error) return flash("Eliminazione non riuscita");
    setContacts((cs) => cs.filter((c) => c.id !== id));
    flash("Eliminato");
  };
  const toggle = (c: Contact) => {
    setOpen(open === c.id ? null : c.id);
    if (c.status === "nuovo") update(c.id, { status: "letto" });
  };
  const exportCsv = () => {
    const esc = (s: string | null) => `"${(s ?? "").replace(/"/g, '""')}"`;
    const rows = [["Data", "Nome", "Contatto", "Stato", "Messaggio", "Note"], ...list.map((c) => [fmt(c.created_at), c.name, c.email, c.status, c.message, c.notes ?? ""])];
    const blob = new Blob(["\ufeff" + rows.map((r) => r.map(esc).join(";")).join("\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `messaggi-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-extrabold">Messaggi</h1>
        <button onClick={exportCsv} className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary"><Download className="h-4 w-4" />Esporta Excel (CSV)</button>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cerca per nome, contatto o testo…" className={input} aria-label="Cerca messaggi" />
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)} className={`${input} sm:w-52`} aria-label="Filtra per stato">
          <option value="tutti">Tutti gli stati</option>
          {STATI.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
      </div>
      {list.length === 0 && <p className={`${card} text-sm text-muted-foreground`}>Nessun messaggio trovato.</p>}
      <ul className="space-y-3">
        {list.map((c) => (
          <li key={c.id} className={card}>
            <button onClick={() => toggle(c)} className="flex w-full items-start justify-between gap-3 text-left" aria-expanded={open === c.id}>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  {c.status === "nuovo" && <span className="h-2 w-2 rounded-full bg-primary" aria-label="Nuovo" />}
                  <span className="font-semibold">{c.name}</span>
                  <span className="text-sm text-muted-foreground">{c.email}</span>
                </div>
                <p className={`mt-1 text-sm text-muted-foreground ${open === c.id ? "" : "line-clamp-1"}`}>{c.message}</p>
              </div>
              <div className="shrink-0 text-right text-xs text-muted-foreground">
                <div>{fmt(c.created_at)}</div>
                <div className="mt-1 rounded-full border border-border px-2 py-0.5">{STATI.find((s) => s.id === c.status)?.label ?? c.status}</div>
              </div>
            </button>
            {open === c.id && (
              <div className="mt-4 space-y-3 border-t border-border pt-4">
                <p className="whitespace-pre-wrap text-sm">{c.message}</p>
                <div className="flex flex-wrap gap-2 text-sm">
                  {isEmail(c.email) ? (
                    <a href={`mailto:${c.email}?subject=${encodeURIComponent("Il tuo progetto con Peak Studio")}`} className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 hover:bg-secondary"><Mail className="h-4 w-4" />Rispondi via email</a>
                  ) : (
                    <>
                      <a href={`tel:${c.email.replace(/\s/g, "")}`} className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 hover:bg-secondary"><Phone className="h-4 w-4" />Chiama</a>
                      <a href={`https://wa.me/${c.email.replace(/\D/g, "").replace(/^(?!39)/, "39")}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 hover:bg-secondary"><MessageCircle className="h-4 w-4" />WhatsApp</a>
                    </>
                  )}
                  <select value={c.status} onChange={(e) => update(c.id, { status: e.target.value })} className="rounded-full border border-border bg-background px-3 py-1.5" aria-label="Stato">
                    {STATI.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                  <button onClick={() => remove(c.id)} className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-destructive hover:bg-secondary"><Trash2 className="h-4 w-4" />Elimina</button>
                </div>
                <NoteBox initial={c.notes ?? ""} onSave={(n) => update(c.id, { notes: n })} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const NoteBox = ({ initial, onSave }: { initial: string; onSave: (n: string) => void }) => {
  const [v, setV] = useState(initial);
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">Note private
        <textarea value={v} onChange={(e) => setV(e.target.value)} rows={3} className={`${input} mt-1`} placeholder="Preventivo inviato, da richiamare lunedì…" />
      </label>
      <button onClick={() => onSave(v)} disabled={v === initial} className="mt-2 rounded-full bg-foreground px-4 py-1.5 text-sm text-background disabled:opacity-40">Salva note</button>
    </div>
  );
};

/* ---------- Recensioni ---------- */
const Reviews = ({ reviews, setReviews, flash }: { reviews: Review[]; setReviews: (f: (r: Review[]) => Review[]) => void; flash: (m: string) => void }) => {
  const [filtro, setFiltro] = useState<"tutte" | Review["status"]>("pending");
  const list = reviews.filter((r) => filtro === "tutte" || r.status === filtro);
  const setStatus = async (id: string, status: Review["status"]) => {
    const patch = { status, reviewed_at: new Date().toISOString() };
    const { error } = await supabase.from("reviews").update(patch).eq("id", id);
    if (error) return flash("Operazione non riuscita");
    setReviews((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    flash(status === "approved" ? "Recensione pubblicata" : "Recensione rifiutata");
  };
  const remove = async (id: string) => {
    if (!confirm("Eliminare la recensione?")) return;
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) return flash("Eliminazione non riuscita");
    setReviews((rs) => rs.filter((r) => r.id !== id));
  };
  const label = { pending: "In attesa", approved: "Pubblicata", rejected: "Rifiutata" };
  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl font-extrabold">Recensioni</h1>
      <div className="flex flex-wrap gap-2">
        {(["pending", "approved", "rejected", "tutte"] as const).map((f) => (
          <button key={f} onClick={() => setFiltro(f)} aria-pressed={filtro === f} className={`rounded-full px-4 py-1.5 text-sm ${filtro === f ? "bg-foreground text-background" : "border border-border"}`}>
            {f === "tutte" ? "Tutte" : label[f]}
          </button>
        ))}
      </div>
      {list.length === 0 && <p className={`${card} text-sm text-muted-foreground`}>Nessuna recensione in questa lista.</p>}
      <ul className="space-y-3">
        {list.map((r) => (
          <li key={r.id} className={card}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div><span className="font-semibold">{r.name}</span> <span className="text-sm text-muted-foreground">· {r.role}</span></div>
              <div className="text-sm" aria-label={`${r.rating} stelle su 5`}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
            </div>
            <p className="mt-2 text-sm">{r.text}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-xs text-muted-foreground">{fmt(r.created_at)} · {label[r.status]}</span>
              <span className="flex-1" />
              {r.status !== "approved" && <button onClick={() => setStatus(r.id, "approved")} className="rounded-full bg-foreground px-4 py-1.5 text-background">Pubblica</button>}
              {r.status !== "rejected" && <button onClick={() => setStatus(r.id, "rejected")} className="rounded-full border border-border px-4 py-1.5">Rifiuta</button>}
              <button onClick={() => remove(r.id)} aria-label="Elimina" className="rounded-full border border-border p-2 text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* ---------- Salvataggio contenuti ---------- */
const saveContent = async (key: string, value: unknown) =>
  supabase.from("site_content").upsert({ key, value: value as never, updated_at: new Date().toISOString() });

const priceInput = (v: number | null | undefined, set: (n: number | null) => void, allowNull: boolean) => (
  <div className="flex items-center gap-2">
    <span className="text-sm text-muted-foreground">€</span>
    <input type="number" min={0} step={1} value={v ?? ""} placeholder={allowNull ? "Prezzo in arrivo" : ""} onChange={(e) => set(e.target.value === "" ? null : Number(e.target.value))} className={`${input} w-36`} />
  </div>
);

/* ---------- Prezzi ---------- */
const Prices = ({ value, onSaved, flash }: { value: PrezziOverride; onSaved: (p: PrezziOverride) => void; flash: (m: string) => void }) => {
  const [piani, setPiani] = useState<Record<string, number | null>>({ ...DEFAULTS.piani, ...value.piani });
  const [addon, setAddon] = useState<Record<string, number | null>>({ ...DEFAULTS.addon, ...value.addon });
  const [man, setMan] = useState<number>(value.manutenzione ?? DEFAULTS.manutenzione);
  const save = async () => {
    const p: PrezziOverride = { piani, addon, manutenzione: man };
    const { error } = await saveContent("prezzi", p);
    if (error) return flash("Salvataggio non riuscito");
    onSaved(p);
    flash("Prezzi aggiornati sul sito");
  };
  const reset = () => {
    setPiani({ ...DEFAULTS.piani });
    setAddon({ ...DEFAULTS.addon });
    setMan(DEFAULTS.manutenzione);
  };
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-extrabold">Prezzi</h1>
        <div className="flex gap-2">
          <button onClick={reset} className="rounded-full border border-border px-4 py-2 text-sm">Ripristina originali</button>
          <button onClick={save} className="btn btn-primary !min-h-[40px] !px-5 !text-sm">Salva e pubblica</button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">Lascia vuoto un campo per mostrare "Preventivo personalizzato" (piani) o "Prezzo in arrivo" (extra).</p>
      <section className={card}>
        <h2 className="mb-3 font-semibold">Piani (prezzo "da")</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {PIANI.map((p) => (
            <div key={p.id} className="flex items-center justify-between gap-3 rounded-xl border border-border p-3">
              <span className="font-medium">{p.nome}</span>
              {priceInput(piani[p.id], (n) => setPiani((s) => ({ ...s, [p.id]: n })), true)}
            </div>
          ))}
        </div>
      </section>
      <section className={card}>
        <h2 className="mb-3 font-semibold">Manutenzione mensile</h2>
        {priceInput(man, (n) => setMan(n ?? 0), false)}
      </section>
      <section className={card}>
        <h2 className="mb-3 font-semibold">Extra del preventivatore</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {ADDON.map((a) => (
            <div key={a.id} className="flex items-center justify-between gap-3 rounded-xl border border-border p-3">
              <span className="text-sm font-medium">{a.nome.it}</span>
              {priceInput(addon[a.id], (n) => setAddon((s) => ({ ...s, [a.id]: n })), true)}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

/* ---------- Portfolio ---------- */
const toWebp = (file: File): Promise<string> =>
  new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => {
      const w = Math.min(1200, img.width);
      const h = Math.round((img.height / img.width) * w);
      const cv = document.createElement("canvas");
      cv.width = w;
      cv.height = h;
      cv.getContext("2d")!.drawImage(img, 0, 0, w, h);
      res(cv.toDataURL("image/webp", 0.78));
      URL.revokeObjectURL(img.src);
    };
    img.onerror = rej;
    img.src = URL.createObjectURL(file);
  });

const emptyNew = (): NuovoCaso => ({ id: "", nome: "", settore: { it: "", en: "" }, fatto: { it: "", en: "" }, anno: new Date().getFullYear(), img: "", url: "", categoria: "vetrina" });

const PortfolioEditor = ({ value, nuovi: nuoviInit, onSaved, flash }: { value: PortfolioOverride; nuovi: NuovoCaso[]; onSaved: (p: PortfolioOverride, n: NuovoCaso[]) => void; flash: (m: string) => void }) => {
  const [o, setO] = useState<PortfolioOverride>(value);
  const [nuovi, setNuovi] = useState<NuovoCaso[]>(nuoviInit);
  const [bozza, setBozza] = useState<NuovoCaso | null>(null);
  const set = (id: string, patch: PortfolioOverride[string]) => setO((s) => ({ ...s, [id]: { ...s[id], ...patch } }));

  const persist = async (po: PortfolioOverride, pn: NuovoCaso[]) => {
    const [a, b] = await Promise.all([saveContent("portfolio", po), saveContent("portfolio_nuovi", pn)]);
    if (a.error || b.error) {
      flash("Salvataggio non riuscito");
      return false;
    }
    onSaved(po, pn);
    flash("Portfolio aggiornato sul sito");
    return true;
  };

  const aggiungi = async () => {
    if (!bozza) return;
    if (!bozza.nome.trim() || !bozza.img || !/^https?:\/\//.test(bozza.url) || !bozza.settore.it || !bozza.fatto.it) return flash("Compila nome, link (https://…), immagine e testi in italiano");
    const n: NuovoCaso = {
      ...bozza,
      id: `p-${Date.now().toString(36)}`,
      settore: { it: bozza.settore.it, en: bozza.settore.en || bozza.settore.it },
      fatto: { it: bozza.fatto.it, en: bozza.fatto.en || bozza.fatto.it },
    };
    const next = [...nuovi, n];
    if (await persist(o, next)) {
      setNuovi(next);
      setBozza(null);
    }
  };

  const rimuovi = async (id: string) => {
    if (!confirm("Eliminare questo progetto dal portfolio?")) return;
    const next = nuovi.filter((n) => n.id !== id);
    if (await persist(o, next)) setNuovi(next);
  };

  const field = (label: string, el: ReactNode) => <label className="text-xs text-muted-foreground">{label}<div className="mt-1">{el}</div></label>;
  const tutti = [...DEFAULTS.portfolio.map((c) => ({ c, nuovo: false })), ...nuovi.map((c) => ({ c, nuovo: true }))];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-extrabold">Portfolio</h1>
        <div className="flex gap-2">
          <button onClick={() => setBozza(emptyNew())} className="rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary">+ Nuovo progetto</button>
          <button onClick={() => persist(o, nuovi)} className="btn btn-primary !min-h-[40px] !px-5 !text-sm">Salva e pubblica</button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">Modifica anno, link e descrizioni in italiano e inglese, nascondi un progetto o aggiungine uno nuovo con la sua immagine. Se lasci vuoto il testo inglese, resta quello originale.</p>

      {bozza && (
        <section className={`${card} space-y-3 border-primary`}>
          <h2 className="font-semibold">Nuovo progetto</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {field("Nome progetto / cliente *", <input value={bozza.nome} onChange={(e) => setBozza({ ...bozza, nome: e.target.value })} className={input} />)}
            {field("Link al sito *", <input type="url" placeholder="https://…" value={bozza.url} onChange={(e) => setBozza({ ...bozza, url: e.target.value })} className={input} />)}
            {field("Categoria", (
              <select value={bozza.categoria} onChange={(e) => setBozza({ ...bozza, categoria: e.target.value as NuovoCaso["categoria"] })} className={input}>
                {CATEGORIE_PORTFOLIO.map((k) => <option key={k.id} value={k.id}>{k.nome.it}</option>)}
              </select>
            ))}
            {field("Anno", <input type="number" min={2000} max={2100} value={bozza.anno ?? ""} onChange={(e) => setBozza({ ...bozza, anno: e.target.value ? Number(e.target.value) : null })} className={input} />)}
            {field("Settore (IT) *", <input value={bozza.settore.it} onChange={(e) => setBozza({ ...bozza, settore: { ...bozza.settore, it: e.target.value } })} className={input} />)}
            {field("Settore (EN)", <input value={bozza.settore.en} onChange={(e) => setBozza({ ...bozza, settore: { ...bozza.settore, en: e.target.value } })} className={input} />)}
            {field("Cosa ho fatto (IT) *", <input value={bozza.fatto.it} onChange={(e) => setBozza({ ...bozza, fatto: { ...bozza.fatto, it: e.target.value } })} className={input} />)}
            {field("Cosa ho fatto (EN)", <input value={bozza.fatto.en} onChange={(e) => setBozza({ ...bozza, fatto: { ...bozza.fatto, en: e.target.value } })} className={input} />)}
          </div>
          {field("Immagine di anteprima * (screenshot del sito, orizzontale)", (
            <input type="file" accept="image/*" onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              try { setBozza({ ...bozza, img: await toWebp(f) }); } catch { flash("Immagine non valida"); }
            }} className="text-sm" />
          ))}
          {bozza.img && <img src={bozza.img} alt="Anteprima" className="h-40 rounded-lg object-cover" />}
          <div className="flex gap-2">
            <button onClick={aggiungi} className="btn btn-primary !min-h-[40px] !px-5 !text-sm">Aggiungi e pubblica</button>
            <button onClick={() => setBozza(null)} className="rounded-full border border-border px-4 py-2 text-sm">Annulla</button>
          </div>
        </section>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {tutti.map(({ c, nuovo }) => {
          const x = o[c.id] ?? {};
          return (
            <article key={c.id} className={`${card} ${x.nascosto ? "opacity-60" : ""}`}>
              <div className="flex gap-3">
                <img src={c.img} alt="" className="h-16 w-24 rounded-lg object-cover" loading="lazy" />
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold">{c.nome} {nuovo && <span className="ml-1 rounded-full bg-secondary px-2 text-[10px]">aggiunto</span>}</h2>
                  <a href={x.url || c.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 truncate text-xs text-muted-foreground underline">{x.url || c.url}<ExternalLink className="h-3 w-3" /></a>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <label className="flex items-center gap-2 text-xs">
                    <input type="checkbox" checked={!x.nascosto} onChange={(e) => set(c.id, { nascosto: !e.target.checked })} />Visibile
                  </label>
                  {nuovo && <button onClick={() => rimuovi(c.id)} aria-label={`Elimina ${c.nome}`} className="text-destructive"><Trash2 className="h-4 w-4" /></button>}
                </div>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {field("Anno", <input type="number" min={2000} max={2100} value={x.anno !== undefined ? x.anno ?? "" : c.anno ?? ""} onChange={(e) => set(c.id, { anno: e.target.value ? Number(e.target.value) : null })} className={input} />)}
                {field("Link", <input type="url" value={x.url ?? c.url} onChange={(e) => set(c.id, { url: e.target.value })} className={input} />)}
                {field("Settore (IT)", <input value={x.settoreIt ?? c.settore.it} onChange={(e) => set(c.id, { settoreIt: e.target.value })} className={input} />)}
                {field("Settore (EN)", <input value={x.settoreEn ?? c.settore.en} onChange={(e) => set(c.id, { settoreEn: e.target.value })} className={input} />)}
                {field("Cosa ho fatto (IT)", <input value={x.fattoIt ?? c.fatto.it} onChange={(e) => set(c.id, { fattoIt: e.target.value })} className={input} />)}
                {field("Cosa ho fatto (EN)", <input value={x.fattoEn ?? c.fatto.en} onChange={(e) => set(c.id, { fattoEn: e.target.value })} className={input} />)}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

/* ---------- Email ---------- */
const EmailLogs = ({ logs }: { logs: EmailLog[] }) => {
  const latest = useMemo(() => {
    const seen = new Set<string>();
    return logs.filter((l) => {
      const k = l.message_id ?? l.id;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }, [logs]);
  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl font-extrabold">Email inviate</h1>
      <p className="text-sm text-muted-foreground">Gli avvisi che il sito ti manda quando arriva un messaggio o una recensione.</p>
      {latest.length === 0 ? <p className={`${card} text-sm text-muted-foreground`}>Nessuna email registrata.</p> : (
        <div className={`${card} overflow-x-auto p-0`}>
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-muted-foreground"><tr><th className="p-3">Data</th><th className="p-3">Tipo</th><th className="p-3">Destinatario</th><th className="p-3">Stato</th></tr></thead>
            <tbody>
              {latest.map((l) => (
                <tr key={l.id} className="border-t border-border">
                  <td className="p-3 whitespace-nowrap">{fmt(l.created_at)}</td>
                  <td className="p-3">{l.template_name}</td>
                  <td className="p-3">{l.recipient_email}</td>
                  <td className="p-3">{l.status === "sent" ? "Inviata" : l.status === "pending" ? "In coda" : `Problema (${l.status})`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

/* ---------- Account ---------- */
const Account = ({ email, flash }: { email: string; flash: (m: string) => void }) => {
  const [cur, setCur] = useState("");
  const [pw, setPw] = useState("");
  const change = async () => {
    const { error } = await supabase.auth.updateUser({ password: pw, current_password: cur } as never);
    if (error) return flash("Cambio password non riuscito");
    setCur("");
    setPw("");
    flash("Password aggiornata");
  };
  return (
    <div className="max-w-md space-y-4">
      <h1 className="font-display text-3xl font-extrabold">Account</h1>
      <div className={card}><div className="text-xs text-muted-foreground">Accesso come</div><div className="font-medium">{email}</div></div>
      <div className={`${card} space-y-3`}>
        <h2 className="font-semibold">Cambia password</h2>
        <p className="text-xs text-muted-foreground">Se accedi solo con Google non serve.</p>
        <input type="password" value={cur} onChange={(e) => setCur(e.target.value)} placeholder="Password attuale" className={input} aria-label="Password attuale" />
        <input type="password" minLength={8} value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Nuova password (min. 8 caratteri)" className={input} aria-label="Nuova password" />
        <button onClick={change} disabled={pw.length < 8} className="rounded-full bg-foreground px-4 py-2 text-sm text-background disabled:opacity-40">Aggiorna</button>
      </div>
      <button onClick={() => supabase.auth.signOut({ scope: "global" })} className="rounded-full border border-border px-4 py-2 text-sm">Esci da tutti i dispositivi</button>
    </div>
  );
};

export default Admin;
