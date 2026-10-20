import { describe, expect, it } from "vitest";
import { GIORNI_CONSEGNA, PIANI, MANUTENZIONE, ADDON, stimaMensile, TESTIMONIANZE, temperatura } from "@/config/site";
import { isValidReach } from "@/lib/contact";

describe("regole sito Peak Studio", () => {
  it("consegna in 7 giorni", () => expect(GIORNI_CONSEGNA).toBe(7));
  it("prezzi di partenza dei piani", () =>
    expect(PIANI.map((p) => p.prezzoDa)).toEqual([250, 590, 1290, 2500]));
  it("Business è il piano consigliato", () => expect(PIANI.find((p) => p.consigliato)?.id).toBe("business"));
  it("manutenzione 50 €/mese", () => expect(MANUTENZIONE.prezzoMese).toBe(50));
  it("scheda Google Business 40 €", () => expect(ADDON[0].prezzo).toBe(40));
  it("stima = a × (c/10) × b", () => expect(stimaMensile(20, 150, 3)).toBe(900));
  it("nessuna testimonianza inventata", () => expect(TESTIMONIANZE).toHaveLength(0));
  it("temperatura da +4 a −28 °C", () => {
    expect(temperatura(0)).toBe(4);
    expect(temperatura(4000)).toBe(-28);
  });
  it("il modulo accetta telefono o email", () => {
    expect(isValidReach("mario@example.com")).toBe(true);
    expect(isValidReach("+39 333 1234567")).toBe(true);
    expect(isValidReach("ciao")).toBe(false);
  });
});
