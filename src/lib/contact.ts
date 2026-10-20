export const EMAIL_RE = /^\S+@\S+\.\S+$/;
export const PHONE_RE = /^\+?[\d\s().-]{6,20}$/;

/** Il modulo accetta un telefono oppure un'email. */
export const isValidReach = (v: string) => {
  const s = v.trim();
  return EMAIL_RE.test(s) || (PHONE_RE.test(s) && s.replace(/\D/g, "").length >= 6);
};
