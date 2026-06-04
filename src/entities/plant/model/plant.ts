import type { Env, PlantState, Season, Stage } from "./types";

/**
 * Pure plant physiology. The garden feature drives these with a simulated
 * clock: each `stepPlant` advances the plant by a fraction of a day given the
 * weather, while `applyWater`/`applyFeed` are discrete care events.
 *
 * Balance is tuned so a steady ~3 waterings/day keeps a plant healthy, heavy
 * over-watering (≈10/day) drowns it, and neglect dries it out — with summer
 * thirstier than winter.
 */

/** Days per season; four of them make a 28-day simulated year. */
const DAYS_PER_SEASON = 7;
const SEASONS: Season[] = ["bahor", "yoz", "kuz", "qish"];

/** Growth speed multiplier per season (winter is near-dormant). */
const SEASON_GROWTH: Record<Season, number> = { bahor: 1.0, yoz: 1.3, kuz: 0.6, qish: 0.15 };
/** Base daily soil-moisture loss per season (summer dries fastest). */
const SEASON_EVAP: Record<Season, number> = { bahor: 0.5, yoz: 0.72, kuz: 0.42, qish: 0.22 };

/** Comfortable soil-moisture band; outside it the plant is stressed. */
export const WATER_OPTIMAL: readonly [number, number] = [0.4, 0.85];
const DROUGHT_BELOW = 0.2;
const DROWN_ABOVE = 0.92;
const NUTRIENT_MIN = 0.2;

/** Moisture/nutrients added by one watering / feeding action. */
export const WATER_PER_ACTION = 0.16;
export const FEED_PER_ACTION = 0.4;

/** The season on a given simulated day. */
export function seasonForDay(day: number): Season {
  const idx = ((Math.floor(day / DAYS_PER_SEASON) % 4) + 4) % 4;
  return SEASONS[idx]!;
}

/** A fresh seed, just planted. */
export function createSeed(): PlantState {
  return { day: 0, growth: 0, water: 0.55, nutrients: 0.6, health: 1, alive: true };
}

/** The growth stage label for a maturity value. */
export function stageForGrowth(growth: number): Stage {
  if (growth < 0.05) return "urug'";
  if (growth < 0.25) return "nish";
  if (growth < 0.6) return "nihol";
  if (growth < 0.82) return "g'uncha";
  return "gul";
}

/** Add moisture from a watering (or rain). */
export function applyWater(s: PlantState, amount = WATER_PER_ACTION): PlantState {
  if (!s.alive) return s;
  return { ...s, water: Math.min(1, s.water + amount) };
}

/** Add nutrients from a feeding. */
export function applyFeed(s: PlantState, amount = FEED_PER_ACTION): PlantState {
  if (!s.alive) return s;
  return { ...s, nutrients: Math.min(1, s.nutrients + amount) };
}

/**
 * Advance the plant by `dtDays`: evaporate moisture, consume nutrients, update
 * health from how comfortable the conditions are, and grow when healthy.
 */
export function stepPlant(s: PlantState, dtDays: number, env: Env): PlantState {
  if (!s.alive || dtDays <= 0) return s;

  const evap = SEASON_EVAP[env.season] * (env.isDay ? 1.15 : 0.6);
  const water = Math.max(0, s.water - evap * dtDays);
  const nutrients = Math.max(0, s.nutrients - (0.08 + 0.12 * s.growth) * dtDays);

  const [wMin, wMax] = WATER_OPTIMAL;
  const waterOk = water >= wMin && water <= wMax;
  const nutrientOk = nutrients >= NUTRIENT_MIN;

  let health = s.health;
  if (waterOk && nutrientOk) {
    health = Math.min(1, health + 0.25 * dtDays);
  } else {
    let stress = 0;
    if (water < DROUGHT_BELOW) stress += 0.45;
    else if (!waterOk) stress += 0.12;
    if (water > DROWN_ABOVE) stress += 0.55;
    if (!nutrientOk) stress += 0.18;
    health = Math.max(0, health - stress * dtDays);
  }

  let growth = s.growth;
  if (health > 0.25) {
    const wFactor = waterOk ? 1 : 0.3;
    const nFactor = nutrientOk ? 1 : 0.4;
    const light = env.isDay ? 1 : 0.15;
    const rate =
      0.13 * SEASON_GROWTH[env.season] * wFactor * nFactor * light * (0.5 + 0.5 * health);
    growth = Math.min(1, growth + rate * dtDays);
  }

  return { ...s, water, nutrients, health, growth, alive: health > 0 };
}
