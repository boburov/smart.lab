import { molecules } from "./molecules";
import { labelizeCategory } from "../lib/format";

/**
 * The three science "directions" (yo'nalishlar) offered inside the
 * 3D Laboratory. Chemistry is live and backed by the molecule dataset;
 * Physics and Electronics are planned ("tez kunda").
 */
export interface LabDirection {
  id: "chemistry" | "physics" | "electronics";
  /** Uzbek display name shown in the UI. */
  name: string;
  /** English name, shown as a small caption. */
  nameEn: string;
  /** Short Uzbek description. */
  tagline: string;
  status: "active" | "soon";
  /** Hash route this card links to. */
  route: string;
  /** Emoji icon used on the card. */
  icon: string;
  /** Section labels ("bo'limlar") shown as chips on the card. */
  sections: string[];
}

/** Distinct chemistry sections, derived from the molecule catalog. */
function chemistrySections(): string[] {
  const seen = new Set<string>();
  for (const m of molecules) seen.add(m.category);
  return [...seen].sort().map(labelizeCategory);
}

export const directions: LabDirection[] = [
  {
    id: "chemistry",
    name: "Kimyo",
    nameEn: "Chemistry",
    tagline: `${molecules.length} ta molekulani 3D fazoda aylantirib o'rganing.`,
    status: "active",
    route: "/lab/chemistry",
    icon: "🧪",
    sections: chemistrySections(),
  },
  {
    id: "physics",
    name: "Fizika",
    nameEn: "Physics",
    tagline: "Mexanika, to'lqinlar va maydonlarning interaktiv simulyatsiyalari.",
    status: "soon",
    route: "/lab/physics",
    icon: "🧲",
    sections: ["Mexanika", "Optika", "Elektromagnetizm", "Termodinamika", "To'lqinlar"],
  },
  {
    id: "electronics",
    name: "Elektronika",
    nameEn: "Electronics",
    tagline: "Sxemalarni yig'ing va signallarni real vaqtda kuzating.",
    status: "soon",
    route: "/lab/electronics",
    icon: "💡",
    sections: ["Sxemalar", "Mantiqiy elementlar", "Mikrokontrollerlar", "Sensorlar"],
  },
];

export const directionsById = Object.fromEntries(
  directions.map((d) => [d.id, d]),
) as Record<LabDirection["id"], LabDirection>;
