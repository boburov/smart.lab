/**
 * Inson anatomiyasi 3D tadqiqotchisi uchun asosiy tiplar.
 *
 * Koordinata tizimi (o'ng qo'l qoidasi, metr):
 *   origin (0,0,0) — tananing vertikal markazi; bo'y 1.8 m.
 *   +Y tepaga (bosh), +X odamning o'ng tomoniga, +Z oldinga.
 *   Bosh tepasi ≈ +0.90, yelka ≈ +0.55, kindik ≈ +0.10, tos ≈ -0.05,
 *   tizza ≈ -0.55, oyoq tagi ≈ -0.90.
 */

/** Ko'rinishni boshqaradigan qatlam (tashqidan ichkariga). */
export type AnatomyLayer = "skin" | "muscle" | "skeleton" | "organs" | "vessels";

/** Organ tizimi. */
export type AnatomySystem =
  | "integumentary"
  | "muscular"
  | "skeletal"
  | "nervous"
  | "respiratory"
  | "cardiovascular"
  | "digestive"
  | "urinary"
  | "endocrine"
  | "lymphatic";

/** Geometriya turi. */
export type GeometryType =
  | "sphere"
  | "box"
  | "capsule"
  | "cylinder"
  | "ellipsoid"
  | "cone"
  | "tube";

/** Tananing bir bo'lagi (a'zo, suyak, muskul yoki tomir). */
export interface AnatomyPart {
  id: string;
  /** O'zbekcha nom. */
  uzName: string;
  /** Inglizcha nom. */
  enName: string;
  system: AnatomySystem;
  layer: AnatomyLayer;
  geometryType: GeometryType;
  /**
   * Geometriya parametrlari:
   *  sphere:[r] · box:[w,h,d] · capsule:[r,len] · cylinder:[rTop,rBottom,h] ·
   *  ellipsoid:[rx,ry,rz] · cone:[r,h]. (tube uchun ishlatilmaydi.)
   */
  args?: number[];
  /** tube uchun egri chiziq nuqtalari ([[x,y,z], ...]). */
  path?: number[][];
  /** tube radiusi (m). */
  radius?: number;
  /** [x,y,z]. */
  position: number[];
  /** Aylantirish (gradus) [x,y,z]. */
  rotation?: number[];
  scale?: number[];
  /** CPK-ga o'xshash anatomik rang (hex). */
  color: string;
  side?: "left" | "right" | "center";
  /** 1–2 jumlali o'zbekcha tavsif. */
  uzDescription: string;
}
