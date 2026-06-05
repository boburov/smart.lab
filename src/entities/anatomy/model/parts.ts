import type { AnatomyPart } from "./types";
import { GENERATED_PARTS } from "./parts.generated";
import { SKIN_PARTS } from "./skin";

/**
 * Inson anatomiyasining barcha qismlari (jinsiy a'zolarsiz):
 * qo'lda yozilgan teri silueti + workflow orqali to'plangan a'zolar,
 * suyaklar, muskullar va tomirlar.
 */
export const ANATOMY_PARTS: AnatomyPart[] = [...SKIN_PARTS, ...GENERATED_PARTS];
