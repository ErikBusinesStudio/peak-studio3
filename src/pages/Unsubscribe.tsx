import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const Unsubscribe = () => {
  const [state, setState] = useState<"loading" | "valid" | "already" | "invalid" | "success" | "error">("loading");
  const token = new URLSearchParams(window.location.search).get("token") || "";

  useEffect(() => {
    if (!token) { setState("invalid"); return; }
    fetch(`${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`, {
      headers: { apikey: ANON_KEY },
    })
      .then(r => r.json())
      .then(d => {
        if (d.valid) setState("valid");
        else if (d.reason === "already_unsubscribed") setState("already");
        else setState("invalid");
      })
      .catch(() => setState("invalid"));
  }, [token]);

  const confirm = async () => {
    const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", { body: { token } });
    if (error || !data?.success) setState("error");
    else setState("success");
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 text-center">
        <h1 className="text-2xl font-black mb-4">Disiscrizione</h1>
        {state === "loading" && <p className="text-muted-foreground">Verifica in corso…</p>}
        {state === "valid" && (
          <>
            <p className="text-muted-foreground mb-6">Confermi di voler annullare l'iscrizione alle email da Peak Studio?</p>
            <button onClick={confirm} className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-bold uppercase tracking-wider text-sm hover:opacity-90 transition">Conferma disiscrizione</button>
          </>
        )}
        {state === "already" && <p className="text-muted-foreground">Sei già disiscritto.</p>}
        {state === "invalid" && <p className="text-destructive">Link non valido o scaduto.</p>}
        {state === "success" && <p className="text-primary font-bold">Disiscrizione completata.</p>}
        {state === "error" && <p className="text-destructive">Errore. Riprova più tardi.</p>}
      </div>
    </main>
  );
};

export default Unsubscribe;