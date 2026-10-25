import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const ResetPassword = () => {
  const nav = useNavigate();
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password: pw });
    if (error) setMsg(error.message);
    else nav("/admin", { replace: true });
  };
  return (
    <main className="zone-snow flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-2xl border border-border bg-card p-8">
        <h1 className="font-display text-2xl font-extrabold">Nuova password</h1>
        <input type="password" required minLength={8} value={pw} onChange={(e) => setPw(e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2.5" aria-label="Nuova password" />
        <button className="btn btn-primary w-full">Salva</button>
        {msg && <p className="text-sm">{msg}</p>}
      </form>
    </main>
  );
};
export default ResetPassword;
