import type { Molecule } from "../model/types";

/** Moddaning agregat holati. */
export type AggregateState = "solid" | "liquid" | "gas";

/** Agregat holatlarning o'zbekcha nomlari. */
export const STATE_LABELS_UZ: Record<AggregateState, string> = {
  solid: "Qattiq",
  liquid: "Suyuq",
  gas: "Gaz",
};

/**
 * Xona haroratida (~25 °C, 1 atm) GAZ holatidagi molekulalar (PubChem CID).
 * Qaynash nuqtasi xona haroratidan past bo'lganlar.
 */
const GAS_CIDS = new Set<number>([
  222, 280, 281, 297, 402, 783, 947, 948, 977, 1119, 6325, 24524, 24526, 24823,
  145068, 3032552, // anorganik gazlar
  260, // vodorod bromid
  6324, 6334, 6351, 6360, 7843, 10041, // gaz alkanlar
  6326, 6335, 7844, 7845, 8252, // gaz to'yinmaganlar
  712, // formaldegid
  674, 1146, 6329, 6341, // gaz aminlar
  6338, 6354, 6391, // vinilxlorid, etilen oksidi, freon-12
]);

/**
 * Xona haroratida SUYUQ holatdagi molekulalar (PubChem CID).
 * Qolgan barchasi standart bo'yicha QATTIQ deb hisoblanadi.
 */
const LIQUID_CIDS = new Set<number>([
  176, 313, 767, 944, 1004, 1118, 14917, 14923, 24247, 784, 962, 24682, // kislota/anorganik suyuqliklar
  241, 1140, 6557, 7237, 7500, 7501, 8079, 10419, // aromatik/to'yinmagan suyuqliklar
  356, 7962, 8003, 8058, 8078, 8900, 9253, 10907, // suyuq alkanlar
  174, 244, 263, 702, 753, 887, 1030, 1031, 3283, 3776, 6386, 7519, 8028, 31275, // spirt/efirlar
  177, 180, 240, 261, 527, 650, 3485, 6569, 7410, 7847, 7967, 637511, 638011, // aldegid/ketonlar
  264, 284, 612, 1032, 4133, 6581, 6584, 7762, 8857, 31276, // karbon kislota/efirlar
  1049, 3301, 6115, 8027, 8082, 9260, // suyuq aminlar
  89594, 14985, 5284607, // nikotin, E vitamini, filloxinon (moysimon)
  11, 679, 713, 768, 5943, 6212, 6228, 6342, 6344, 6375, 6575, 7964, 31373, // galogenli suyuqliklar
]);

/**
 * Molekulaning xona haroratidagi (~25 °C) tabiiy agregat holatini qaytaradi.
 * Lug'atlarda topilmasa, standart sifatida "qattiq" deb hisoblanadi —
 * datasetdagi molekulalarning ko'pchiligi (qandlar, aminokislotalar,
 * vitaminlar, dorilar, tuzlar) xona haroratida qattiq.
 */
export function moleculeState(molecule: Molecule): AggregateState {
  if (GAS_CIDS.has(molecule.cid)) return "gas";
  if (LIQUID_CIDS.has(molecule.cid)) return "liquid";
  return "solid";
}
