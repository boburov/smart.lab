export type {
  ComponentKind,
  Rotation,
  TerminalDef,
  ComponentDef,
  PlacedComponent,
  WireEnd,
  Wire,
  Circuit,
} from "./model/types";
export { CATALOG, PALETTE_ORDER, defaultProps } from "./model/catalog";
export { rotateOffset, terminalPos } from "./lib/geometry";
export { simulateCircuit } from "./lib/simulate";
export type { SimResult, LedState } from "./lib/simulate";
export { ComponentGlyph } from "./ui/ComponentGlyph";
