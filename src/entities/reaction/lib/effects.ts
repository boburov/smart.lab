import type { SoundName } from "../../../shared/lib/sound";

/**
 * Reaction statuses and their effects. A status is the single source of truth
 * for "what just happened" — it can come from the built-in local classifier or
 * from Gemini, and it maps to a visual effect kind, an Uzbek headline and a
 * sound. The fixed list is what Gemini must choose from.
 */

/** The visual effect family the scene plays for a status. */
export type ReactionKind = "explosion" | "flash" | "smoke" | "fizz";

/** The fixed set of statuses (Gemini picks one of these). */
export type LabStatus =
  | "portlash"
  | "yonish"
  | "tutun"
  | "qaynash"
  | "pufaklanish"
  | "rang_ozgarishi"
  | "chokma"
  | "gaz_ajralishi"
  | "issiqlik"
  | "neytral";

export const LAB_STATUSES: LabStatus[] = [
  "portlash",
  "yonish",
  "tutun",
  "qaynash",
  "pufaklanish",
  "rang_ozgarishi",
  "chokma",
  "gaz_ajralishi",
  "issiqlik",
  "neytral",
];

export interface ReactionEffect {
  status: LabStatus;
  /** Visual effect family; null means nothing visible happens. */
  kind: ReactionKind | null;
  /** Short Uzbek headline, e.g. "Portlash!". */
  title: string;
  /** One-line Uzbek explanation. */
  detail: string;
  /** Sound effect to play. */
  sound: SoundName;
}

const STATUS_INFO: Record<LabStatus, Omit<ReactionEffect, "status">> = {
  portlash: { kind: "explosion", title: "Portlash!", detail: "Kuchli portlovchi reaksiya.", sound: "boom" },
  yonish: { kind: "explosion", title: "Yonish!", detail: "Modda alangalanib yonadi.", sound: "fire" },
  tutun: { kind: "smoke", title: "Tutun!", detail: "Reaksiyadan tutun ko'tariladi.", sound: "smoke" },
  qaynash: { kind: "fizz", title: "Qaynash!", detail: "Aralashma qaynay boshladi.", sound: "fizz" },
  pufaklanish: { kind: "fizz", title: "Pufaklanish", detail: "Gaz pufakchalari ajraladi.", sound: "fizz" },
  rang_ozgarishi: { kind: "flash", title: "Rang o'zgardi", detail: "Eritma rangi o'zgardi.", sound: "chime" },
  chokma: { kind: "flash", title: "Cho'kma", detail: "Cho'kma hosil bo'ldi.", sound: "chime" },
  gaz_ajralishi: { kind: "smoke", title: "Gaz ajraldi", detail: "Reaksiyada gaz chiqdi.", sound: "smoke" },
  issiqlik: { kind: "flash", title: "Issiqlik ajraldi", detail: "Ekzotermik reaksiya.", sound: "fire" },
  neytral: { kind: null, title: "Reaksiya yo'q", detail: "Sezilarli o'zgarish yo'q.", sound: "neutral" },
};

/** Build the full effect descriptor for a status. */
export function effectForStatus(status: LabStatus): ReactionEffect {
  return { status, ...STATUS_INFO[status] };
}

/** First matching rule wins, so the most dramatic reactions are listed first. */
const RULES: { needs: string[]; status: LabStatus }[] = [
  { needs: ["H", "O"], status: "portlash" },
  { needs: ["K", "O"], status: "portlash" },
  { needs: ["Na", "O"], status: "yonish" },
  { needs: ["Na", "Cl"], status: "yonish" },
  { needs: ["S", "O"], status: "tutun" },
  { needs: ["C", "O"], status: "tutun" },
  { needs: ["Fe", "O"], status: "rang_ozgarishi" },
  { needs: ["Mn", "O"], status: "gaz_ajralishi" },
];

/** Built-in offline classifier: a status for a set of elemental symbols. */
export function classifyReaction(elementSymbols: Set<string>): LabStatus | null {
  for (const rule of RULES) {
    if (rule.needs.every((sym) => elementSymbols.has(sym))) return rule.status;
  }
  return null;
}
