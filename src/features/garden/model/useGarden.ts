import { useCallback, useEffect, useRef, useState } from "react";
import {
  applyFeed,
  applyWater,
  createSeed,
  seasonForDay,
  stepPlant,
  type PlantState,
  type Routine,
  type Season,
} from "../../../entities/plant";

/** Real seconds for one simulated day at 1×. At 10× a day passes in 1 second. */
const BASE_SECONDS_PER_DAY = 10;

/** Selectable simulation speeds (0 = paused). */
export const SPEEDS = [0, 1, 2, 10, 100] as const;

/** Moisture added per real day of rain. */
const RAIN_RATE = 0.5;
/** Chance per day that rain starts, by season (winter = light snow). */
const RAIN_PER_DAY: Record<Season, number> = { bahor: 0.6, yoz: 0.3, kuz: 0.5, qish: 0.25 };

interface GardenView {
  plant: PlantState;
  timeOfDay: number; // 0–1 within the day
  season: Season;
  isDay: boolean;
  raining: boolean;
  rainUntil: number; // simulated day the current rain ends
}

export interface GardenState {
  plant: PlantState;
  timeOfDay: number;
  season: Season;
  isDay: boolean;
  raining: boolean;
  speed: number;
  routine: Routine;
  setSpeed: (s: number) => void;
  setRoutine: (r: Routine) => void;
  /** Water the plant by hand. */
  water: () => void;
  /** Feed the plant by hand. */
  feed: () => void;
  /** Replant a fresh seed. */
  reset: () => void;
}

function freshView(): GardenView {
  return {
    plant: createSeed(),
    timeOfDay: 0.3,
    season: "bahor",
    isDay: true,
    raining: false,
    rainUntil: 0,
  };
}

/** Advance the whole garden by `dtDays`, applying the routine, rain and physiology. */
function advance(prev: GardenView, dtDays: number, routine: Routine): GardenView {
  if (!prev.plant.alive) return prev;

  const newDay = prev.plant.day + dtDays;
  const season = seasonForDay(newDay);
  const timeOfDay = newDay - Math.floor(newDay);
  const isDay = timeOfDay > 0.22 && timeOfDay < 0.8;

  // Scheduled care: count how many routine slots were crossed this step.
  const waterEvents =
    Math.floor(newDay * routine.waterPerDay) - Math.floor(prev.plant.day * routine.waterPerDay);
  const feedEvents =
    Math.floor(newDay * routine.feedPerDay) - Math.floor(prev.plant.day * routine.feedPerDay);

  // Weather: keep raining until rainUntil, else maybe start a new shower.
  let rainUntil = prev.rainUntil;
  let raining = newDay < rainUntil;
  if (!raining && Math.random() < RAIN_PER_DAY[season] * dtDays) {
    rainUntil = newDay + 0.06 + Math.random() * 0.1;
    raining = true;
  }

  let plant = prev.plant;
  for (let i = 0; i < waterEvents; i++) plant = applyWater(plant);
  for (let i = 0; i < feedEvents; i++) plant = applyFeed(plant);
  if (raining) plant = applyWater(plant, RAIN_RATE * dtDays);
  plant = stepPlant({ ...plant, day: newDay }, dtDays, { season, isDay, raining });

  return { plant, timeOfDay, season, isDay, raining, rainUntil };
}

/**
 * Drives the plant garden: a requestAnimationFrame clock advances simulated
 * time by the chosen speed, auto-applies the care routine and weather, and
 * exposes manual actions. Speed and routine live in refs so the loop always
 * reads their latest values without restarting.
 */
export function useGarden(): GardenState {
  const [view, setView] = useState<GardenView>(freshView);
  const [speed, setSpeedState] = useState<number>(1);
  const [routine, setRoutineState] = useState<Routine>({ waterPerDay: 3, feedPerDay: 1 });

  const speedRef = useRef(speed);
  const routineRef = useRef(routine);
  const lastRef = useRef<number | null>(null);

  const setSpeed = useCallback((s: number) => {
    speedRef.current = s;
    setSpeedState(s);
  }, []);
  const setRoutine = useCallback((r: Routine) => {
    routineRef.current = r;
    setRoutineState(r);
  }, []);
  const water = useCallback(() => {
    setView((v) => ({ ...v, plant: applyWater(v.plant) }));
  }, []);
  const feed = useCallback(() => {
    setView((v) => ({ ...v, plant: applyFeed(v.plant) }));
  }, []);
  const reset = useCallback(() => {
    lastRef.current = null;
    setView(freshView());
  }, []);

  useEffect(() => {
    let raf = 0;
    const loop = (now: number) => {
      const last = lastRef.current;
      lastRef.current = now;
      if (last !== null) {
        const dtReal = Math.min(0.1, (now - last) / 1000);
        const s = speedRef.current;
        if (s > 0) {
          const dtDays = (dtReal * s) / BASE_SECONDS_PER_DAY;
          setView((prev) => advance(prev, dtDays, routineRef.current));
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return {
    plant: view.plant,
    timeOfDay: view.timeOfDay,
    season: view.season,
    isDay: view.isDay,
    raining: view.raining,
    speed,
    routine,
    setSpeed,
    setRoutine,
    water,
    feed,
    reset,
  };
}
