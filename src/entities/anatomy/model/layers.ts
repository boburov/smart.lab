import type { AnatomyLayer } from "./types";

export interface LayerConfig {
  id: AnatomyLayer;
  /** O'zbekcha nom. */
  uzName: string;
  /** Standart ko'rinish. */
  defaultVisible: boolean;
  /** Standart shaffoflik (0..1). */
  defaultOpacity: number;
}

/**
 * Qatlamlar tashqidan ichkariga tartibda. Standart holatda teri va muskullar
 * yarim-shaffof — shunda ichki a'zolar, skelet va tomirlar darrov ko'rinadi.
 */
export const LAYERS: LayerConfig[] = [
  { id: "skin", uzName: "Teri", defaultVisible: true, defaultOpacity: 0.12 },
  { id: "muscle", uzName: "Muskullar", defaultVisible: true, defaultOpacity: 0.35 },
  { id: "skeleton", uzName: "Skelet", defaultVisible: true, defaultOpacity: 1 },
  { id: "organs", uzName: "Ichki a'zolar", defaultVisible: true, defaultOpacity: 0.95 },
  { id: "vessels", uzName: "Tomirlar", defaultVisible: true, defaultOpacity: 1 },
];

/** Har bir qatlamning joriy ko'rinishi va shaffofligi. */
export type LayerState = Record<AnatomyLayer, { visible: boolean; opacity: number }>;

/** LAYERS standart qiymatlaridan boshlang'ich holatni quradi. */
export function defaultLayerState(): LayerState {
  const out = {} as LayerState;
  for (const l of LAYERS) out[l.id] = { visible: l.defaultVisible, opacity: l.defaultOpacity };
  return out;
}

/** Tezkor ko'rinish presetlari. */
export type LayerPreset = "all" | "skeleton" | "organs" | "noskin";

/** Preset bo'yicha yangi qatlam holatini qaytaradi. */
export function presetLayerState(preset: LayerPreset): LayerState {
  const s = defaultLayerState();
  switch (preset) {
    case "skeleton":
      s.skin.visible = false;
      s.muscle.visible = false;
      s.organs.visible = false;
      s.vessels.visible = false;
      break;
    case "organs":
      s.skin.visible = false;
      s.muscle.visible = false;
      s.skeleton.opacity = 0.25;
      break;
    case "noskin":
      s.skin.visible = false;
      break;
    case "all":
    default:
      break;
  }
  return s;
}
