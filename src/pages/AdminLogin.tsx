import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import logoDark from "@/assets/logo-dark.webp";

const AdminLogin = () => {
  const nav = useNavigate();
  const [mode, setMode] = useState<"in" | "up" | "reset">("in");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    document.title = "Area riservata · Peak Studio";
    const { data } = supabase.auth.onAuthStateChange((_e, s) => {
      if (s) nav("/admin", { replace: true });
    });
    supabase.auth.getSession().then(({ data: d }) => {
      if (d.session) nav("/admin", { replace: true });
    });
    return () => data.subscription.unsubscribe();
  }, [nav]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      if (mode === "in") {
        const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
        if (error) setMsg("Email o password non corretti.");
      } else if (mode === "up") {
        const { error } = await supabase.auth.signUp({ email, password: pw, options: { emailRedirectTo: `${window.location.origin}/admin` } });
        setMsg(error ? error.message : "Controlla la tua email e clicca il link di conferma, poi accedi.");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
        setMsg(error ? error.message : "Ti ho inviato un'email per reimpostare la password.");
      }
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}/admin/login` });
    if (r.error) setMsg("Accesso con Google non riuscito.");
  };

  return (
    <main className="zone-snow flex min-h-screen items-center justify-center bg-background px-4 py-12 text-foreground">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-sm">
        <Link to="/" className="mb-6 block">
          <img src={logoDark} alt="Peak Studio" width={320} height={136} className="h-10 w-auto" />
        </Link>
        <h1 className="font-display text-2xl font-extrabold">Area riservata</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "in" ? "Accedi al pannello di controllo." : mode === "up" ? "Crea il tuo accesso (solo la prima volta)." : "Reimposta la password."}
        </p>

        <button type="button" onClick={google} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-border px-4 py-3 text-sm font-semibold hover:bg-secondary">
          Continua con Google
        </button>
        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />oppure<span className="h-px flex-1 bg-border" /></div>

        <form onSubmit={submit} className="space-y-3">
          <label className="block text-sm font-medium">Email
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5" autoComplete="email" />
          </label>
          {mode !== "reset" && (
            <label className="block text-sm font-medium">Password
              <input type="password" required minLength={8} value={pw} onChange={(e) => setPw(e.target.value)} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5" autoComplete={mode === "up" ? "new-password" : "current-password"} />
            </label>
          )}
          <button disabled={busy} className="btn btn-primary w-full">
            {mode === "in" ? "Accedi" : mode === "up" ? "Crea accesso" : "Invia link"}
          </button>
        </form>
        {msg && <p role="status" className="mt-4 text-sm">{msg}</p>}
        <div className="mt-6 flex justify-between text-xs text-muted-foreground">
          <button type="button" className="underline" onClick={() => setMode(mode === "up" ? "in" : "up")}>{mode === "up" ? "Ho già un accesso" : "Primo accesso"}</button>
          <button type="button" className="underline" onClick={() => setMode("reset")}>Password dimenticata?</button>
        </div>
      </div>
    </main>
  );
};

export default AdminLogin;
