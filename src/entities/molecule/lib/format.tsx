import { Fragment, type ReactNode } from "react";

/**
 * Render a molecular formula with the digit runs as subscripts,
 * e.g. "C8H10N4O2" -> C₈H₁₀N₄O₂.
 */
export function formatFormula(formula: string): ReactNode {
  const parts = formula.match(/[A-Za-z]+|\d+|[^A-Za-z\d]+/g) ?? [formula];
  return parts.map((part, i) =>
    /^\d+$/.test(part) ? (
      <sub key={i}>{part}</sub>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/** Kimyo bo'limlarining (kategoriyalarning) o'zbekcha nomlari. */
const CATEGORY_LABELS_UZ: Record<string, string> = {
  "acids-bases": "Kislotalar va asoslar",
  "alcohols-ethers": "Spirtlar va efirlar",
  "aldehydes-ketones": "Aldegidlar va ketonlar",
  alkanes: "Alkanlar",
  "amines-nitrogen": "Aminlar va azotli birikmalar",
  "amino-acids": "Aminokislotalar",
  "biomolecules-neuro": "Biomolekulalar va neyro",
  carbohydrates: "Uglevodlar",
  "carboxylic-esters": "Karbon kislotalar va efirlar",
  gases: "Gazlar",
  "halogenated-industrial": "Galogenli birikmalar",
  "inorganic-misc": "Anorganik birikmalar",
  pharma: "Dori vositalari",
  "unsaturated-aromatic": "To'yinmagan va aromatik",
  vitamins: "Vitaminlar",
};

/**
 * Kategoriya identifikatorini o'zbekcha bo'lim nomiga aylantiradi,
 * masalan "acids-bases" -> "Kislotalar va asoslar". Lug'atda topilmasa,
 * kebab-case'ni o'qiladigan ko'rinishga keltiradi.
 */
export function labelizeCategory(category: string): string {
  return (
    CATEGORY_LABELS_UZ[category] ??
    category
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  );
}
