/** The four seasons (Uzbek), cycled over the simulated year. */
export type Season = "bahor" | "yoz" | "kuz" | "qish";

/** Growth stages, from seed to flower. */
export type Stage = "urug'" | "nish" | "nihol" | "g'uncha" | "gul";

/** Everything about the plant's current condition. */
export interface PlantState {
  /** Simulated days elapsed since planting (float). */
  day: number;
  /** Maturity 0–1 (1 = fully grown / flowering). */
  growth: number;
  /** Soil moisture 0–1. */
  water: number;
  /** Soil nutrients 0–1. */
  nutrients: number;
  /** Overall health 0–1; reaches 0 → the plant dies. */
  health: number;
  /** False once the plant has wilted. */
  alive: boolean;
}

/** The care schedule the player configures (auto-applied by the simulation). */
export interface Routine {
  /** Scheduled waterings per day. */
  waterPerDay: number;
  /** Scheduled feedings per day. */
  feedPerDay: number;
}

/** Environment passed to a simulation step. */
export interface Env {
  season: Season;
  /** Daytime → photosynthesis; night → little growth. */
  isDay: boolean;
  raining: boolean;
}
