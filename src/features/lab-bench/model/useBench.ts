import { useCallback, useMemo, useState } from "react";
import type { Substance } from "../../../entities/substance";
import { findProduct } from "../../../entities/reaction";
import type { Molecule } from "../../../entities/molecule";
import { blendColors } from "../../../shared/lib/color";
import { addComposition, type Composition } from "../../../shared/lib/formula";

/** Pours before the vessel reads as "full" (just for the fill animation). */
const CAPACITY = 8;

/**
 * Representative liquid colours for a few recognised products, so a correct
 * reaction looks right (water reads clear-blue, not the pink you'd get from
 * literally averaging white hydrogen with red oxygen).
 */
const PRODUCT_COLORS: Record<string, string> = {
  Water: "#cfeefb",
  "Hydrogen Peroxide": "#e9f6ff",
  "Sodium Hydroxide": "#eef3f6",
  "Sodium Chloride": "#f1f5fb",
  "Sulfuric Acid": "#f6f1d6",
  Ammonia: "#eef7f0",
  Ozone: "#dbeeff",
  Oxygen: "#e6f2fb",
  Hydrogen: "#eef4fb",
  Nitrogen: "#eef1f6",
  "Carbon Dioxide": "#eef2f5",
};

export interface BenchState {
  /** Substances poured in, in order (last is most recent). */
  poured: Substance[];
  /** Combined element multiset of everything in the vessel. */
  composition: Composition;
  /** Current liquid colour (product colour when recognised, else a blend). */
  liquidColor: string;
  /** Target fill level 0–1 for the liquid animation. */
  fill: number;
  /** The molecule the mixture adds up to exactly, or null. */
  product: Molecule | null;
  /** Pour one unit of a substance into the vessel. */
  add: (substance: Substance) => void;
  /** Remove the most recently poured substance. */
  undo: () => void;
  /** Empty the vessel. */
  clear: () => void;
}

/** Holds the live state of the laboratory vessel and the mixing/reaction logic. */
export function useBench(): BenchState {
  const [poured, setPoured] = useState<Substance[]>([]);

  const add = useCallback((substance: Substance) => {
    setPoured((prev) => [...prev, substance]);
  }, []);
  const undo = useCallback(() => {
    setPoured((prev) => prev.slice(0, -1));
  }, []);
  const clear = useCallback(() => setPoured([]), []);

  const composition = useMemo(() => {
    const comp: Composition = {};
    for (const s of poured) addComposition(comp, s.composition);
    return comp;
  }, [poured]);

  const product = useMemo(() => findProduct(composition), [composition]);

  const liquidColor = useMemo(() => {
    if (poured.length === 0) return "#dfe9f2";
    if (product && PRODUCT_COLORS[product.name]) return PRODUCT_COLORS[product.name]!;
    return blendColors(poured.map((s) => ({ color: s.color, weight: 1 })));
  }, [poured, product]);

  const fill = Math.min(poured.length / CAPACITY, 1);

  return { poured, composition, liquidColor, fill, product, add, undo, clear };
}
