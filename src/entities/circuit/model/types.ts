/**
 * Elektron sxema laboratoriyasining asosiy tiplari.
 * Koordinatalar SVG taxta birliklarida (logik piksel) o'lchanadi.
 */

/** Komponent turlari. */
export type ComponentKind =
  | "battery"
  | "resistor"
  | "led"
  | "switch"
  | "button"
  | "lamp"
  | "buzzer"
  | "chip";

/** Komponentni aylantirish burchagi (gradus). */
export type Rotation = 0 | 90 | 180 | 270;

/** Komponentdagi ulanish nuqtasi (terminal/oyoq) — markazga nisbatan siljish. */
export interface TerminalDef {
  id: string;
  dx: number;
  dy: number;
  label?: string;
}

/** Komponent turining statik ta'rifi (o'lcham, terminallar, nom). */
export interface ComponentDef {
  kind: ComponentKind;
  /** O'zbekcha nom. */
  name: string;
  width: number;
  height: number;
  terminals: TerminalDef[];
}

/** Taxtaga joylashtirilgan, sozlanadigan komponent. */
export interface PlacedComponent {
  id: string;
  kind: ComponentKind;
  x: number;
  y: number;
  rotation: Rotation;
  /** Kalit/tugma yopiqligi. */
  on: boolean;
  /** LED rangi. */
  color: string;
  /** Rezistor qiymati, masalan "220Ω". */
  value: string;
  /** Batareya kuchlanishi (V). */
  voltage: number;
  /** Erkin yorliq (masalan chip nomi). */
  label: string;
}

/** Sim uchi — qaysi komponentning qaysi terminaliga ulanganligi. */
export interface WireEnd {
  componentId: string;
  terminalId: string;
}

/** Ikki terminalni bog'lovchi sim. */
export interface Wire {
  id: string;
  from: WireEnd;
  to: WireEnd;
}

/** To'liq sxema holati. */
export interface Circuit {
  components: PlacedComponent[];
  wires: Wire[];
}
