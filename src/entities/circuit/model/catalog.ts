import type { ComponentDef, ComponentKind, PlacedComponent } from "./types";

/** Har bir komponent turining statik ta'rifi: o'lchami va terminallari. */
export const CATALOG: Record<ComponentKind, ComponentDef> = {
  battery: {
    kind: "battery",
    name: "Batareya",
    width: 84,
    height: 44,
    terminals: [
      { id: "-", dx: -42, dy: 0, label: "−" },
      { id: "+", dx: 42, dy: 0, label: "+" },
    ],
  },
  resistor: {
    kind: "resistor",
    name: "Rezistor",
    width: 84,
    height: 30,
    terminals: [
      { id: "a", dx: -42, dy: 0 },
      { id: "b", dx: 42, dy: 0 },
    ],
  },
  led: {
    kind: "led",
    name: "LED",
    width: 64,
    height: 44,
    terminals: [
      { id: "anode", dx: -32, dy: 0, label: "A" },
      { id: "cathode", dx: 32, dy: 0, label: "K" },
    ],
  },
  switch: {
    kind: "switch",
    name: "Kalit",
    width: 72,
    height: 32,
    terminals: [
      { id: "a", dx: -36, dy: 0 },
      { id: "b", dx: 36, dy: 0 },
    ],
  },
  button: {
    kind: "button",
    name: "Tugma",
    width: 56,
    height: 56,
    terminals: [
      { id: "a", dx: -28, dy: 0 },
      { id: "b", dx: 28, dy: 0 },
    ],
  },
  lamp: {
    kind: "lamp",
    name: "Lampochka",
    width: 56,
    height: 56,
    terminals: [
      { id: "a", dx: -28, dy: 0 },
      { id: "b", dx: 28, dy: 0 },
    ],
  },
  buzzer: {
    kind: "buzzer",
    name: "Zummer",
    width: 56,
    height: 56,
    terminals: [
      { id: "a", dx: -28, dy: 0 },
      { id: "b", dx: 28, dy: 0 },
    ],
  },
  chip: {
    kind: "chip",
    name: "Chip (IC)",
    width: 84,
    height: 104,
    terminals: [
      { id: "1", dx: -42, dy: -36, label: "1" },
      { id: "2", dx: -42, dy: -12, label: "2" },
      { id: "3", dx: -42, dy: 12, label: "3" },
      { id: "4", dx: -42, dy: 36, label: "4" },
      { id: "5", dx: 42, dy: 36, label: "5" },
      { id: "6", dx: 42, dy: 12, label: "6" },
      { id: "7", dx: 42, dy: -12, label: "7" },
      { id: "8", dx: 42, dy: -36, label: "8" },
    ],
  },
};

/** Paletteda ko'rsatiladigan tartib. */
export const PALETTE_ORDER: ComponentKind[] = [
  "battery",
  "switch",
  "button",
  "resistor",
  "led",
  "lamp",
  "buzzer",
  "chip",
];

/** Yangi komponent qo'shilganda sozlanadigan xossalarining standart qiymatlari. */
export function defaultProps(
  kind: ComponentKind,
): Pick<PlacedComponent, "on" | "color" | "value" | "voltage" | "label"> {
  switch (kind) {
    case "battery":
      return { on: true, color: "#3b82f6", value: "", voltage: 9, label: "" };
    case "resistor":
      return { on: true, color: "#3b82f6", value: "220Ω", voltage: 0, label: "" };
    case "led":
      return { on: true, color: "#ef4444", value: "", voltage: 0, label: "" };
    case "switch":
    case "button":
      return { on: false, color: "#3b82f6", value: "", voltage: 0, label: "" };
    case "chip":
      return { on: true, color: "#3b82f6", value: "", voltage: 0, label: "IC" };
    default:
      return { on: true, color: "#3b82f6", value: "", voltage: 0, label: "" };
  }
}
