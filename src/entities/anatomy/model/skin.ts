import type { AnatomyPart } from "./types";

const SKIN = "#E8B58E";

/** Bir teri qismini qisqacha yozish uchun yordamchi. */
function s(
  id: string,
  uzName: string,
  geometryType: AnatomyPart["geometryType"],
  args: number[],
  position: number[],
  side: AnatomyPart["side"] = "center",
  rotation?: number[],
): AnatomyPart {
  return {
    id: `skin-${id}`,
    uzName,
    enName: uzName,
    system: "integumentary",
    layer: "skin",
    geometryType,
    args,
    position,
    rotation,
    side,
    color: SKIN,
    uzDescription:
      "Teri — tananing tashqi qoplami; ichki a'zolarni himoya qiladi. Qatlamni shaffof qilib ichkarini ko'ring.",
  };
}

/**
 * Tananing yarim-shaffof tashqi silueti (teri qatlami). Qo'lda yozilgan —
 * ichki a'zolar, skelet va tomirlar shu silyuet ichida ko'rinadi.
 */
export const SKIN_PARTS: AnatomyPart[] = [
  s("head", "Bosh", "ellipsoid", [0.1, 0.13, 0.11], [0, 0.8, 0]),
  s("neck", "Bo'yin", "capsule", [0.05, 0.08], [0, 0.62, 0]),
  s("chest", "Ko'krak", "ellipsoid", [0.19, 0.2, 0.13], [0, 0.36, 0]),
  s("abdomen", "Qorin", "ellipsoid", [0.16, 0.18, 0.12], [0, 0.08, 0]),
  s("pelvis", "Tos", "ellipsoid", [0.17, 0.13, 0.13], [0, -0.13, 0]),
  s("shoulder-l", "Chap yelka", "sphere", [0.07], [-0.2, 0.5, 0], "left"),
  s("shoulder-r", "O'ng yelka", "sphere", [0.07], [0.2, 0.5, 0], "right"),
  s("upperarm-l", "Chap yelka-bilak", "capsule", [0.052, 0.26], [-0.235, 0.33, 0], "left"),
  s("upperarm-r", "O'ng yelka-bilak", "capsule", [0.052, 0.26], [0.235, 0.33, 0], "right"),
  s("forearm-l", "Chap bilak", "capsule", [0.045, 0.24], [-0.265, 0.05, 0], "left"),
  s("forearm-r", "O'ng bilak", "capsule", [0.045, 0.24], [0.265, 0.05, 0], "right"),
  s("hand-l", "Chap panja", "ellipsoid", [0.05, 0.08, 0.03], [-0.275, -0.16, 0], "left"),
  s("hand-r", "O'ng panja", "ellipsoid", [0.05, 0.08, 0.03], [0.275, -0.16, 0], "right"),
  s("thigh-l", "Chap son", "capsule", [0.08, 0.3], [-0.09, -0.36, 0], "left"),
  s("thigh-r", "O'ng son", "capsule", [0.08, 0.3], [0.09, -0.36, 0], "right"),
  s("shin-l", "Chap boldir", "capsule", [0.06, 0.3], [-0.1, -0.72, 0], "left"),
  s("shin-r", "O'ng boldir", "capsule", [0.06, 0.3], [0.1, -0.72, 0], "right"),
  s("foot-l", "Chap oyoq panjasi", "box", [0.08, 0.05, 0.2], [-0.1, -0.9, 0.05], "left"),
  s("foot-r", "O'ng oyoq panjasi", "box", [0.08, 0.05, 0.2], [0.1, -0.9, 0.05], "right"),
];
