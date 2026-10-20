import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCopy } from "@/config/copy";

const KEY = "peak-cookie-consent";

const CookieBanner = () => {
  const { c } = useCopy();
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      setShow(!window.localStorage.getItem(KEY));
    } catch {
      setShow(true);
    }
  }, []);
  const choose = (v: "accepted" | "rejected") => {
    try { window.localStorage.setItem(KEY, v); } catch { /* ignore */ }
    setShow(false);
  };
  if (!show) return null;
  return (
    <div role="region" aria-label={c.cookie.label} className="zone-snow fixed inset-x-3 bottom-3 z-[60] rounded-2xl border border-border p-4 shadow-2xl md:inset-x-auto md:left-6 md:max-w-md md:p-5">
      <p className="text-sm">
        {c.cookie.text}{" "}
        <Link to="/cookie" className="font-semibold underline underline-offset-4">{c.cookie.more}</Link>
      </p>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={() => choose("rejected")} className="btn btn-secondary !min-h-[44px] flex-1 !px-4 !text-sm">{c.cookie.reject}</button>
        <button type="button" onClick={() => choose("accepted")} className="btn btn-primary !min-h-[44px] flex-1 !px-4 !text-sm">{c.cookie.accept}</button>
      </div>
    </div>
  );
};

export default CookieBanner;
