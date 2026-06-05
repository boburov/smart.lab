import { molecules, labelizeCategory } from "../../molecule";
import type { IconName } from "../../../shared/ui/icon";

/**
 * The science "directions" (yo'nalishlar) offered inside the 3D Laboratory.
 * Chemistry is live (molecule dataset) and Electronics is live (circuit lab);
 * Physics and Biology are planned ("tez kunda").
 */
export interface LabDirection {
  id: "chemistry" | "physics" | "electronics" | "biology";
  /** Uzbek display name shown in the UI. */
  name: string;
  /** English name, shown as a small caption. */
  nameEn: string;
  /** Short Uzbek description. */
  tagline: string;
  status: "active" | "soon";
  /** Hash route this card links to. */
  route: string;
  /** Line-icon used on the card. */
  icon: IconName;
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
    icon: "flask",
    sections: chemistrySections(),
  },
  {
    id: "physics",
    name: "Fizika",
    nameEn: "Physics",
    tagline: "Mexanika, to'lqinlar va maydonlarning interaktiv simulyatsiyalari.",
    status: "soon",
    route: "/lab/physics",
    icon: "atom",
    sections: ["Mexanika", "Optika", "Elektromagnetizm", "Termodinamika", "To'lqinlar"],
  },
  {
    id: "biology",
    name: "Biologiya",
    nameEn: "Biology",
    tagline: "Inson tanasini qatlam-qatlam — skelet, a'zolar, tomirlar — 3D da o'rganing.",
    status: "active",
    route: "/lab/biology",
    icon: "dna",
    sections: ["Anatomiya", "Skelet", "Ichki a'zolar", "Tomirlar", "O'simliklar"],
  },
  {
    id: "electronics",
    name: "Elektronika",
    nameEn: "Electronics",
    tagline: "Arduino platalari, sensorlar va modullar to'plamini ko'ring.",
    status: "active",
    route: "/lab/electronics",
    icon: "chip",
    sections: ["Platalar", "Sensorlar", "Modullar", "Komponentlar"],
  },
];

export const directionsById = Object.fromEntries(
  directions.map((d) => [d.id, d]),
) as Record<LabDirection["id"], LabDirection>;
