import type { Composition } from "../../../shared/lib/formula";

/** Whether an inventory item is a single element or a ready-made compound. */
export type SubstanceKind = "element" | "compound";

/** Physical state at room temperature — used only for grouping/labels. */
export type PhysicalState = "suyuq" | "qattiq" | "gaz";

/**
 * One pickable item in the laboratory chest. An element shows its true CPK
 * render colour; a compound shows a representative real-world colour (e.g. mis
 * sulfat — ko'k). Either way `composition` is what actually gets poured into
 * the vessel and fed to the reaction matcher.
 */
export interface Substance {
  /** Stable unique id, e.g. "el-O" or "cmp-cuso4". */
  id: string;
  kind: SubstanceKind;
  /** Uzbek display name shown in the chest. */
  name: string;
  /** Formula or symbol shown under the name (rendered with subscripts). */
  formula: string;
  /** Display colour — element CPK colour or representative solution colour. */
  color: string;
  /** Element multiset contributed to the vessel when poured. */
  composition: Composition;
  /** Room-temperature state, for the chest's group labels. */
  state: PhysicalState;
}
