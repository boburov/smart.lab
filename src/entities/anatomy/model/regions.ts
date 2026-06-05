/** Kamerani tananing ma'lum qismiga fokuslash uchun presetlar. */
export interface Region {
  id: string;
  /** O'zbekcha nom. */
  uzName: string;
  /** OrbitControls nishon nuqtasi [x,y,z]. */
  target: [number, number, number];
  /** Kameragacha taxminiy masofa. */
  distance: number;
}

export const REGIONS: Region[] = [
  { id: "full", uzName: "Butun tana", target: [0, 0, 0], distance: 2.6 },
  { id: "head", uzName: "Bosh", target: [0, 0.78, 0], distance: 0.85 },
  { id: "thorax", uzName: "Ko'krak", target: [0, 0.35, 0], distance: 1.05 },
  { id: "abdomen", uzName: "Qorin", target: [0, 0.08, 0], distance: 1.05 },
  { id: "pelvis", uzName: "Tos", target: [0, -0.12, 0], distance: 1.0 },
];
