import type { Composition } from "../../../shared/lib/formula";

/** Ion grouping shown in the ions view. */
export type IonGroup = "monatomic" | "polyatomic" | "transition" | "special";

/** A chemical ion (charged species) the lab can pour into the vessel. */
export interface Ion {
  /** Stable unique id, e.g. "SO4_2-" (formula + charge, since Cu has two). */
  id: string;
  /** Base formula without the charge, e.g. "SO4". */
  formula: string;
  /** Charge string, e.g. "+", "2+", "3-". */
  charge: string;
  /** English ion name, e.g. "Sulfate". */
  name: string;
  group: IonGroup;
  /** Display colour. */
  color: string;
  /** Element multiset contributed to the vessel (charge ignored). */
  composition: Composition;
}
