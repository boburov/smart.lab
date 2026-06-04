export type { Season, Stage, PlantState, Routine, Env } from "./model/types";
export {
  seasonForDay,
  createSeed,
  stageForGrowth,
  applyWater,
  applyFeed,
  stepPlant,
  WATER_OPTIMAL,
  WATER_PER_ACTION,
  FEED_PER_ACTION,
} from "./model/plant";
