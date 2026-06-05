import type { AnatomyPart } from "./types";

/** Workflow orqali generatsiya qilingan anatomiya qismlari (135 ta). */
export const GENERATED_PARTS: AnatomyPart[] = [
  {
    "id": "bosh-suyagi",
    "uzName": "Bosh suyagi (kalla)",
    "enName": "Skull (cranium)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "center",
    "geometryType": "ellipsoid",
    "args": [
      0.095,
      0.115,
      0.105
    ],
    "position": [
      0,
      0.8,
      0.01
    ],
    "color": "#ECE6D6",
    "uzDescription": "Bosh suyagi miyani himoya qiladi va yuz tuzilishini hosil qiladi."
  },
  {
    "id": "pastki-jag",
    "uzName": "Pastki jag' suyagi",
    "enName": "Mandible",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "center",
    "geometryType": "ellipsoid",
    "args": [
      0.07,
      0.045,
      0.07
    ],
    "position": [
      0,
      0.665,
      0.03
    ],
    "color": "#ECE6D6",
    "uzDescription": "Pastki jag' suyagi tishlarni ushlab turadi va chaynashda harakatlanadi."
  },
  {
    "id": "boyin-umurtqa-c1",
    "uzName": "Bo'yin umurtqasi C1 (atlas)",
    "enName": "Cervical vertebra C1",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "center",
    "geometryType": "capsule",
    "args": [
      0.022,
      0.012
    ],
    "position": [
      0,
      0.63,
      -0.02
    ],
    "color": "#ECE6D6",
    "uzDescription": "Birinchi bo'yin umurtqasi boshni ushlab turadi."
  },
  {
    "id": "boyin-umurtqa-c2",
    "uzName": "Bo'yin umurtqasi C2 (aksis)",
    "enName": "Cervical vertebra C2",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "center",
    "geometryType": "capsule",
    "args": [
      0.022,
      0.012
    ],
    "position": [
      0,
      0.61,
      -0.02
    ],
    "color": "#ECE6D6",
    "uzDescription": "Ikkinchi bo'yin umurtqasi boshning aylanishini ta'minlaydi."
  },
  {
    "id": "boyin-umurtqa-c3",
    "uzName": "Bo'yin umurtqasi C3",
    "enName": "Cervical vertebra C3",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "center",
    "geometryType": "capsule",
    "args": [
      0.022,
      0.012
    ],
    "position": [
      0,
      0.59,
      -0.02
    ],
    "color": "#ECE6D6",
    "uzDescription": "Uchinchi bo'yin umurtqasi bo'yinning egiluvchanligini ta'minlaydi."
  },
  {
    "id": "boyin-umurtqa-c4",
    "uzName": "Bo'yin umurtqasi C4",
    "enName": "Cervical vertebra C4",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "center",
    "geometryType": "capsule",
    "args": [
      0.022,
      0.012
    ],
    "position": [
      0,
      0.57,
      -0.02
    ],
    "color": "#ECE6D6",
    "uzDescription": "To'rtinchi bo'yin umurtqasi bo'yin ustunini hosil qiladi."
  },
  {
    "id": "boyin-umurtqa-c5",
    "uzName": "Bo'yin umurtqasi C5",
    "enName": "Cervical vertebra C5",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "center",
    "geometryType": "capsule",
    "args": [
      0.023,
      0.012
    ],
    "position": [
      0,
      0.55,
      -0.02
    ],
    "color": "#ECE6D6",
    "uzDescription": "Beshinchi bo'yin umurtqasi bo'yinni qo'llab-quvvatlaydi."
  },
  {
    "id": "boyin-umurtqa-c6",
    "uzName": "Bo'yin umurtqasi C6",
    "enName": "Cervical vertebra C6",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "center",
    "geometryType": "capsule",
    "args": [
      0.023,
      0.012
    ],
    "position": [
      0,
      0.53,
      -0.02
    ],
    "color": "#ECE6D6",
    "uzDescription": "Oltinchi bo'yin umurtqasi bo'yin pastki qismini hosil qiladi."
  },
  {
    "id": "boyin-umurtqa-c7",
    "uzName": "Bo'yin umurtqasi C7",
    "enName": "Cervical vertebra C7",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "center",
    "geometryType": "capsule",
    "args": [
      0.024,
      0.012
    ],
    "position": [
      0,
      0.51,
      -0.02
    ],
    "color": "#ECE6D6",
    "uzDescription": "Yettinchi bo'yin umurtqasi bo'yin va ko'krak orasidagi o'tish joyi."
  },
  {
    "id": "kokrak-umurtqa-t1",
    "uzName": "Ko'krak umurtqasi T1",
    "enName": "Thoracic vertebra T1",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "center",
    "geometryType": "capsule",
    "args": [
      0.025,
      0.013
    ],
    "position": [
      0,
      0.485,
      -0.03
    ],
    "color": "#ECE6D6",
    "uzDescription": "Birinchi ko'krak umurtqasi qovurg'alarni ushlaydi."
  },
  {
    "id": "kokrak-umurtqa-t2",
    "uzName": "Ko'krak umurtqasi T2",
    "enName": "Thoracic vertebra T2",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "center",
    "geometryType": "capsule",
    "args": [
      0.025,
      0.013
    ],
    "position": [
      0,
      0.46,
      -0.03
    ],
    "color": "#ECE6D6",
    "uzDescription": "Ikkinchi ko'krak umurtqasi orqa ustunni hosil qiladi."
  },
  {
    "id": "kokrak-umurtqa-t3",
    "uzName": "Ko'krak umurtqasi T3",
    "enName": "Thoracic vertebra T3",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "center",
    "geometryType": "capsule",
    "args": [
      0.025,
      0.013
    ],
    "position": [
      0,
      0.435,
      -0.03
    ],
    "color": "#ECE6D6",
    "uzDescription": "Uchinchi ko'krak umurtqasi qovurg'alarga bog'lanadi."
  },
  {
    "id": "kokrak-umurtqa-t4",
    "uzName": "Ko'krak umurtqasi T4",
    "enName": "Thoracic vertebra T4",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "center",
    "geometryType": "capsule",
    "args": [
      0.026,
      0.013
    ],
    "position": [
      0,
      0.41,
      -0.03
    ],
    "color": "#ECE6D6",
    "uzDescription": "To'rtinchi ko'krak umurtqasi ko'krak qafasini qo'llab-quvvatlaydi."
  },
  {
    "id": "kokrak-umurtqa-t5",
    "uzName": "Ko'krak umurtqasi T5",
    "enName": "Thoracic vertebra T5",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "center",
    "geometryType": "capsule",
    "args": [
      0.026,
      0.013
    ],
    "position": [
      0,
      0.385,
      -0.03
    ],
    "color": "#ECE6D6",
    "uzDescription": "Beshinchi ko'krak umurtqasi orqa o'rtasini hosil qiladi."
  },
  {
    "id": "kokrak-umurtqa-t6",
    "uzName": "Ko'krak umurtqasi T6",
    "enName": "Thoracic vertebra T6",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "center",
    "geometryType": "capsule",
    "args": [
      0.026,
      0.013
    ],
    "position": [
      0,
      0.36,
      -0.03
    ],
    "color": "#ECE6D6",
    "uzDescription": "Oltinchi ko'krak umurtqasi qovurg'alarni biriktiradi."
  },
  {
    "id": "kokrak-umurtqa-t7",
    "uzName": "Ko'krak umurtqasi T7",
    "enName": "Thoracic vertebra T7",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "center",
    "geometryType": "capsule",
    "args": [
      0.027,
      0.013
    ],
    "position": [
      0,
      0.335,
      -0.03
    ],
    "color": "#ECE6D6",
    "uzDescription": "Yettinchi ko'krak umurtqasi orqa ustunni mustahkamlaydi."
  },
  {
    "id": "kokrak-umurtqa-t8",
    "uzName": "Ko'krak umurtqasi T8",
    "enName": "Thoracic vertebra T8",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "center",
    "geometryType": "capsule",
    "args": [
      0.027,
      0.013
    ],
    "position": [
      0,
      0.31,
      -0.03
    ],
    "color": "#ECE6D6",
    "uzDescription": "Sakkizinchi ko'krak umurtqasi ko'krak qafasi pastini hosil qiladi."
  },
  {
    "id": "kokrak-umurtqa-t9",
    "uzName": "Ko'krak umurtqasi T9",
    "enName": "Thoracic vertebra T9",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "center",
    "geometryType": "capsule",
    "args": [
      0.027,
      0.013
    ],
    "position": [
      0,
      0.285,
      -0.03
    ],
    "color": "#ECE6D6",
    "uzDescription": "To'qqizinchi ko'krak umurtqasi orqa pastki qismini qo'llab-quvvatlaydi."
  },
  {
    "id": "kokrak-umurtqa-t10",
    "uzName": "Ko'krak umurtqasi T10",
    "enName": "Thoracic vertebra T10",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "center",
    "geometryType": "capsule",
    "args": [
      0.028,
      0.013
    ],
    "position": [
      0,
      0.26,
      -0.03
    ],
    "color": "#ECE6D6",
    "uzDescription": "O'ninchi ko'krak umurtqasi qovurg'alarni ushlaydi."
  },
  {
    "id": "kokrak-umurtqa-t11",
    "uzName": "Ko'krak umurtqasi T11",
    "enName": "Thoracic vertebra T11",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "center",
    "geometryType": "capsule",
    "args": [
      0.028,
      0.013
    ],
    "position": [
      0,
      0.235,
      -0.03
    ],
    "color": "#ECE6D6",
    "uzDescription": "O'n birinchi ko'krak umurtqasi orqa ustun pastini hosil qiladi."
  },
  {
    "id": "kokrak-umurtqa-t12",
    "uzName": "Ko'krak umurtqasi T12",
    "enName": "Thoracic vertebra T12",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "center",
    "geometryType": "capsule",
    "args": [
      0.029,
      0.013
    ],
    "position": [
      0,
      0.21,
      -0.03
    ],
    "color": "#ECE6D6",
    "uzDescription": "O'n ikkinchi ko'krak umurtqasi ko'krak va bel orasidagi o'tish."
  },
  {
    "id": "bel-umurtqa-l1",
    "uzName": "Bel umurtqasi L1",
    "enName": "Lumbar vertebra L1",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "center",
    "geometryType": "capsule",
    "args": [
      0.031,
      0.015
    ],
    "position": [
      0,
      0.18,
      -0.03
    ],
    "color": "#ECE6D6",
    "uzDescription": "Birinchi bel umurtqasi tananing og'irligini ko'taradi."
  },
  {
    "id": "bel-umurtqa-l2",
    "uzName": "Bel umurtqasi L2",
    "enName": "Lumbar vertebra L2",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "center",
    "geometryType": "capsule",
    "args": [
      0.032,
      0.015
    ],
    "position": [
      0,
      0.15,
      -0.03
    ],
    "color": "#ECE6D6",
    "uzDescription": "Ikkinchi bel umurtqasi bel qismini mustahkamlaydi."
  },
  {
    "id": "bel-umurtqa-l3",
    "uzName": "Bel umurtqasi L3",
    "enName": "Lumbar vertebra L3",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "center",
    "geometryType": "capsule",
    "args": [
      0.033,
      0.015
    ],
    "position": [
      0,
      0.12,
      -0.03
    ],
    "color": "#ECE6D6",
    "uzDescription": "Uchinchi bel umurtqasi bel markazini hosil qiladi."
  },
  {
    "id": "bel-umurtqa-l4",
    "uzName": "Bel umurtqasi L4",
    "enName": "Lumbar vertebra L4",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "center",
    "geometryType": "capsule",
    "args": [
      0.033,
      0.015
    ],
    "position": [
      0,
      0.09,
      -0.03
    ],
    "color": "#ECE6D6",
    "uzDescription": "To'rtinchi bel umurtqasi bel pastki qismini qo'llab-quvvatlaydi."
  },
  {
    "id": "bel-umurtqa-l5",
    "uzName": "Bel umurtqasi L5",
    "enName": "Lumbar vertebra L5",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "center",
    "geometryType": "capsule",
    "args": [
      0.034,
      0.015
    ],
    "position": [
      0,
      0.06,
      -0.03
    ],
    "color": "#ECE6D6",
    "uzDescription": "Beshinchi bel umurtqasi tos suyagiga bog'lanadi."
  },
  {
    "id": "dumg'aza-suyagi",
    "uzName": "Dumg'aza suyagi (sakrum)",
    "enName": "Sacrum",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "center",
    "geometryType": "ellipsoid",
    "args": [
      0.045,
      0.06,
      0.025
    ],
    "position": [
      0,
      0.01,
      -0.04
    ],
    "color": "#ECE6D6",
    "uzDescription": "Dumg'aza suyagi umurtqa pog'onasi pastini tos suyagiga ulaydi."
  },
  {
    "id": "tosh-suyagi",
    "uzName": "To'sh suyagi (sternum)",
    "enName": "Sternum",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "center",
    "geometryType": "box",
    "args": [
      0.04,
      0.16,
      0.02
    ],
    "position": [
      0,
      0.34,
      0.115
    ],
    "color": "#ECE6D6",
    "uzDescription": "To'sh suyagi ko'krak qafasi oldida joylashib qovurg'alarni biriktiradi."
  },
  {
    "id": "qovurga-1-ong",
    "uzName": "1-qovurg'a (o'ng)",
    "enName": "Rib 1 (right)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "right",
    "geometryType": "tube",
    "radius": 0.007,
    "path": [
      [
        0.02,
        0.47,
        -0.03
      ],
      [
        0.1,
        0.46,
        0.02
      ],
      [
        0.13,
        0.45,
        0.08
      ],
      [
        0.06,
        0.45,
        0.12
      ]
    ],
    "position": [
      0,
      0,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "Birinchi o'ng qovurg'a ko'krak qafasi tepasini hosil qiladi."
  },
  {
    "id": "qovurga-1-chap",
    "uzName": "1-qovurg'a (chap)",
    "enName": "Rib 1 (left)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "left",
    "geometryType": "tube",
    "radius": 0.007,
    "path": [
      [
        -0.02,
        0.47,
        -0.03
      ],
      [
        -0.1,
        0.46,
        0.02
      ],
      [
        -0.13,
        0.45,
        0.08
      ],
      [
        -0.06,
        0.45,
        0.12
      ]
    ],
    "position": [
      0,
      0,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "Birinchi chap qovurg'a ko'krak qafasi tepasini hosil qiladi."
  },
  {
    "id": "qovurga-2-ong",
    "uzName": "2-qovurg'a (o'ng)",
    "enName": "Rib 2 (right)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "right",
    "geometryType": "tube",
    "radius": 0.007,
    "path": [
      [
        0.02,
        0.44,
        -0.04
      ],
      [
        0.11,
        0.43,
        0.02
      ],
      [
        0.15,
        0.42,
        0.09
      ],
      [
        0.06,
        0.42,
        0.115
      ]
    ],
    "position": [
      0,
      0,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "Ikkinchi o'ng qovurg'a ko'krak qafasini hosil qiladi."
  },
  {
    "id": "qovurga-2-chap",
    "uzName": "2-qovurg'a (chap)",
    "enName": "Rib 2 (left)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "left",
    "geometryType": "tube",
    "radius": 0.007,
    "path": [
      [
        -0.02,
        0.44,
        -0.04
      ],
      [
        -0.11,
        0.43,
        0.02
      ],
      [
        -0.15,
        0.42,
        0.09
      ],
      [
        -0.06,
        0.42,
        0.115
      ]
    ],
    "position": [
      0,
      0,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "Ikkinchi chap qovurg'a ko'krak qafasini hosil qiladi."
  },
  {
    "id": "qovurga-3-ong",
    "uzName": "3-qovurg'a (o'ng)",
    "enName": "Rib 3 (right)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "right",
    "geometryType": "tube",
    "radius": 0.007,
    "path": [
      [
        0.02,
        0.41,
        -0.04
      ],
      [
        0.12,
        0.4,
        0.02
      ],
      [
        0.16,
        0.39,
        0.09
      ],
      [
        0.06,
        0.39,
        0.115
      ]
    ],
    "position": [
      0,
      0,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "Uchinchi o'ng qovurg'a ichki a'zolarni himoya qiladi."
  },
  {
    "id": "qovurga-3-chap",
    "uzName": "3-qovurg'a (chap)",
    "enName": "Rib 3 (left)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "left",
    "geometryType": "tube",
    "radius": 0.007,
    "path": [
      [
        -0.02,
        0.41,
        -0.04
      ],
      [
        -0.12,
        0.4,
        0.02
      ],
      [
        -0.16,
        0.39,
        0.09
      ],
      [
        -0.06,
        0.39,
        0.115
      ]
    ],
    "position": [
      0,
      0,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "Uchinchi chap qovurg'a ichki a'zolarni himoya qiladi."
  },
  {
    "id": "qovurga-4-ong",
    "uzName": "4-qovurg'a (o'ng)",
    "enName": "Rib 4 (right)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "right",
    "geometryType": "tube",
    "radius": 0.007,
    "path": [
      [
        0.02,
        0.38,
        -0.04
      ],
      [
        0.13,
        0.37,
        0.02
      ],
      [
        0.17,
        0.36,
        0.09
      ],
      [
        0.06,
        0.36,
        0.11
      ]
    ],
    "position": [
      0,
      0,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "To'rtinchi o'ng qovurg'a ko'krak qafasi o'rtasini hosil qiladi."
  },
  {
    "id": "qovurga-4-chap",
    "uzName": "4-qovurg'a (chap)",
    "enName": "Rib 4 (left)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "left",
    "geometryType": "tube",
    "radius": 0.007,
    "path": [
      [
        -0.02,
        0.38,
        -0.04
      ],
      [
        -0.13,
        0.37,
        0.02
      ],
      [
        -0.17,
        0.36,
        0.09
      ],
      [
        -0.06,
        0.36,
        0.11
      ]
    ],
    "position": [
      0,
      0,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "To'rtinchi chap qovurg'a ko'krak qafasi o'rtasini hosil qiladi."
  },
  {
    "id": "qovurga-5-ong",
    "uzName": "5-qovurg'a (o'ng)",
    "enName": "Rib 5 (right)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "right",
    "geometryType": "tube",
    "radius": 0.007,
    "path": [
      [
        0.02,
        0.35,
        -0.04
      ],
      [
        0.13,
        0.34,
        0.02
      ],
      [
        0.17,
        0.33,
        0.09
      ],
      [
        0.05,
        0.33,
        0.105
      ]
    ],
    "position": [
      0,
      0,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "Beshinchi o'ng qovurg'a yurakni himoya qiladi."
  },
  {
    "id": "qovurga-5-chap",
    "uzName": "5-qovurg'a (chap)",
    "enName": "Rib 5 (left)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "left",
    "geometryType": "tube",
    "radius": 0.007,
    "path": [
      [
        -0.02,
        0.35,
        -0.04
      ],
      [
        -0.13,
        0.34,
        0.02
      ],
      [
        -0.17,
        0.33,
        0.09
      ],
      [
        -0.05,
        0.33,
        0.105
      ]
    ],
    "position": [
      0,
      0,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "Beshinchi chap qovurg'a yurakni himoya qiladi."
  },
  {
    "id": "qovurga-6-ong",
    "uzName": "6-qovurg'a (o'ng)",
    "enName": "Rib 6 (right)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "right",
    "geometryType": "tube",
    "radius": 0.007,
    "path": [
      [
        0.02,
        0.32,
        -0.04
      ],
      [
        0.13,
        0.31,
        0.02
      ],
      [
        0.165,
        0.3,
        0.08
      ],
      [
        0.05,
        0.3,
        0.1
      ]
    ],
    "position": [
      0,
      0,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "Oltinchi o'ng qovurg'a ko'krak qafasi pastini hosil qiladi."
  },
  {
    "id": "qovurga-6-chap",
    "uzName": "6-qovurg'a (chap)",
    "enName": "Rib 6 (left)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "left",
    "geometryType": "tube",
    "radius": 0.007,
    "path": [
      [
        -0.02,
        0.32,
        -0.04
      ],
      [
        -0.13,
        0.31,
        0.02
      ],
      [
        -0.165,
        0.3,
        0.08
      ],
      [
        -0.05,
        0.3,
        0.1
      ]
    ],
    "position": [
      0,
      0,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "Oltinchi chap qovurg'a ko'krak qafasi pastini hosil qiladi."
  },
  {
    "id": "qovurga-7-ong",
    "uzName": "7-qovurg'a (o'ng)",
    "enName": "Rib 7 (right)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "right",
    "geometryType": "tube",
    "radius": 0.007,
    "path": [
      [
        0.02,
        0.29,
        -0.04
      ],
      [
        0.12,
        0.28,
        0.02
      ],
      [
        0.155,
        0.27,
        0.08
      ],
      [
        0.05,
        0.26,
        0.09
      ]
    ],
    "position": [
      0,
      0,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "Yettinchi o'ng qovurg'a jigarni himoya qiladi."
  },
  {
    "id": "qovurga-7-chap",
    "uzName": "7-qovurg'a (chap)",
    "enName": "Rib 7 (left)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "left",
    "geometryType": "tube",
    "radius": 0.007,
    "path": [
      [
        -0.02,
        0.29,
        -0.04
      ],
      [
        -0.12,
        0.28,
        0.02
      ],
      [
        -0.155,
        0.27,
        0.08
      ],
      [
        -0.05,
        0.26,
        0.09
      ]
    ],
    "position": [
      0,
      0,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "Yettinchi chap qovurg'a oshqozonni himoya qiladi."
  },
  {
    "id": "qovurga-8-ong",
    "uzName": "8-qovurg'a (o'ng)",
    "enName": "Rib 8 (right)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "right",
    "geometryType": "tube",
    "radius": 0.006,
    "path": [
      [
        0.02,
        0.26,
        -0.04
      ],
      [
        0.11,
        0.25,
        0.02
      ],
      [
        0.14,
        0.24,
        0.07
      ],
      [
        0.05,
        0.23,
        0.08
      ]
    ],
    "position": [
      0,
      0,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "Sakkizinchi o'ng qovurg'a ichki a'zolarni himoya qiladi."
  },
  {
    "id": "qovurga-8-chap",
    "uzName": "8-qovurg'a (chap)",
    "enName": "Rib 8 (left)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "left",
    "geometryType": "tube",
    "radius": 0.006,
    "path": [
      [
        -0.02,
        0.26,
        -0.04
      ],
      [
        -0.11,
        0.25,
        0.02
      ],
      [
        -0.14,
        0.24,
        0.07
      ],
      [
        -0.05,
        0.23,
        0.08
      ]
    ],
    "position": [
      0,
      0,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "Sakkizinchi chap qovurg'a ichki a'zolarni himoya qiladi."
  },
  {
    "id": "qovurga-9-ong",
    "uzName": "9-qovurg'a (o'ng)",
    "enName": "Rib 9 (right)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "right",
    "geometryType": "tube",
    "radius": 0.006,
    "path": [
      [
        0.02,
        0.23,
        -0.04
      ],
      [
        0.1,
        0.22,
        0.01
      ],
      [
        0.13,
        0.21,
        0.06
      ],
      [
        0.06,
        0.2,
        0.07
      ]
    ],
    "position": [
      0,
      0,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "To'qqizinchi o'ng qovurg'a qorin bo'shlig'i tepasini himoya qiladi."
  },
  {
    "id": "qovurga-9-chap",
    "uzName": "9-qovurg'a (chap)",
    "enName": "Rib 9 (left)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "left",
    "geometryType": "tube",
    "radius": 0.006,
    "path": [
      [
        -0.02,
        0.23,
        -0.04
      ],
      [
        -0.1,
        0.22,
        0.01
      ],
      [
        -0.13,
        0.21,
        0.06
      ],
      [
        -0.06,
        0.2,
        0.07
      ]
    ],
    "position": [
      0,
      0,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "To'qqizinchi chap qovurg'a taloqni himoya qiladi."
  },
  {
    "id": "qovurga-10-ong",
    "uzName": "10-qovurg'a (o'ng)",
    "enName": "Rib 10 (right)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "right",
    "geometryType": "tube",
    "radius": 0.006,
    "path": [
      [
        0.02,
        0.2,
        -0.04
      ],
      [
        0.09,
        0.19,
        0.01
      ],
      [
        0.12,
        0.18,
        0.05
      ],
      [
        0.07,
        0.17,
        0.06
      ]
    ],
    "position": [
      0,
      0,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "O'ninchi o'ng qovurg'a qorin bo'shlig'i tepasini hosil qiladi."
  },
  {
    "id": "qovurga-10-chap",
    "uzName": "10-qovurg'a (chap)",
    "enName": "Rib 10 (left)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "left",
    "geometryType": "tube",
    "radius": 0.006,
    "path": [
      [
        -0.02,
        0.2,
        -0.04
      ],
      [
        -0.09,
        0.19,
        0.01
      ],
      [
        -0.12,
        0.18,
        0.05
      ],
      [
        -0.07,
        0.17,
        0.06
      ]
    ],
    "position": [
      0,
      0,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "O'ninchi chap qovurg'a qorin bo'shlig'i tepasini hosil qiladi."
  },
  {
    "id": "qovurga-11-ong",
    "uzName": "11-qovurg'a (o'ng, suzuvchi)",
    "enName": "Rib 11 (right, floating)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "right",
    "geometryType": "tube",
    "radius": 0.005,
    "path": [
      [
        0.02,
        0.17,
        -0.04
      ],
      [
        0.08,
        0.16,
        0
      ],
      [
        0.11,
        0.155,
        0.04
      ]
    ],
    "position": [
      0,
      0,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "O'n birinchi o'ng suzuvchi qovurg'a oldida birikmaydi."
  },
  {
    "id": "qovurga-11-chap",
    "uzName": "11-qovurg'a (chap, suzuvchi)",
    "enName": "Rib 11 (left, floating)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "left",
    "geometryType": "tube",
    "radius": 0.005,
    "path": [
      [
        -0.02,
        0.17,
        -0.04
      ],
      [
        -0.08,
        0.16,
        0
      ],
      [
        -0.11,
        0.155,
        0.04
      ]
    ],
    "position": [
      0,
      0,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "O'n birinchi chap suzuvchi qovurg'a oldida birikmaydi."
  },
  {
    "id": "qovurga-12-ong",
    "uzName": "12-qovurg'a (o'ng, suzuvchi)",
    "enName": "Rib 12 (right, floating)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "right",
    "geometryType": "tube",
    "radius": 0.005,
    "path": [
      [
        0.02,
        0.14,
        -0.04
      ],
      [
        0.07,
        0.135,
        -0.01
      ],
      [
        0.095,
        0.13,
        0.03
      ]
    ],
    "position": [
      0,
      0,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "O'n ikkinchi o'ng suzuvchi qovurg'a buyrakni himoya qiladi."
  },
  {
    "id": "qovurga-12-chap",
    "uzName": "12-qovurg'a (chap, suzuvchi)",
    "enName": "Rib 12 (left, floating)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "left",
    "geometryType": "tube",
    "radius": 0.005,
    "path": [
      [
        -0.02,
        0.14,
        -0.04
      ],
      [
        -0.07,
        0.135,
        -0.01
      ],
      [
        -0.095,
        0.13,
        0.03
      ]
    ],
    "position": [
      0,
      0,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "O'n ikkinchi chap suzuvchi qovurg'a buyrakni himoya qiladi."
  },
  {
    "id": "omrov-ong",
    "uzName": "O'ng o'mrov suyagi",
    "enName": "Clavicle (right)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "right",
    "geometryType": "capsule",
    "args": [
      0.01,
      0.14
    ],
    "position": [
      0.1,
      0.52,
      0.07
    ],
    "rotation": [
      0,
      20,
      80
    ],
    "color": "#ECE6D6",
    "uzDescription": "O'ng o'mrov suyagi yelka va to'sh suyagini bog'laydi."
  },
  {
    "id": "omrov-chap",
    "uzName": "Chap o'mrov suyagi",
    "enName": "Clavicle (left)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "left",
    "geometryType": "capsule",
    "args": [
      0.01,
      0.14
    ],
    "position": [
      -0.1,
      0.52,
      0.07
    ],
    "rotation": [
      0,
      -20,
      -80
    ],
    "color": "#ECE6D6",
    "uzDescription": "Chap o'mrov suyagi yelka va to'sh suyagini bog'laydi."
  },
  {
    "id": "kurak-ong",
    "uzName": "O'ng kurak suyagi",
    "enName": "Scapula (right)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "right",
    "geometryType": "box",
    "args": [
      0.07,
      0.12,
      0.012
    ],
    "position": [
      0.13,
      0.43,
      -0.08
    ],
    "color": "#ECE6D6",
    "uzDescription": "O'ng kurak suyagi yelka bo'g'imini hosil qiladi."
  },
  {
    "id": "kurak-chap",
    "uzName": "Chap kurak suyagi",
    "enName": "Scapula (left)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "left",
    "geometryType": "box",
    "args": [
      0.07,
      0.12,
      0.012
    ],
    "position": [
      -0.13,
      0.43,
      -0.08
    ],
    "color": "#ECE6D6",
    "uzDescription": "Chap kurak suyagi yelka bo'g'imini hosil qiladi."
  },
  {
    "id": "tos-suyagi-ong",
    "uzName": "O'ng tos suyagi",
    "enName": "Hip bone (right)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "right",
    "geometryType": "ellipsoid",
    "args": [
      0.06,
      0.08,
      0.05
    ],
    "position": [
      0.1,
      -0.05,
      -0.01
    ],
    "color": "#ECE6D6",
    "uzDescription": "O'ng tos suyagi son suyagini ushlaydi va tana og'irligini taqsimlaydi."
  },
  {
    "id": "tos-suyagi-chap",
    "uzName": "Chap tos suyagi",
    "enName": "Hip bone (left)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "left",
    "geometryType": "ellipsoid",
    "args": [
      0.06,
      0.08,
      0.05
    ],
    "position": [
      -0.1,
      -0.05,
      -0.01
    ],
    "color": "#ECE6D6",
    "uzDescription": "Chap tos suyagi son suyagini ushlaydi va tana og'irligini taqsimlaydi."
  },
  {
    "id": "yelka-suyagi-ong",
    "uzName": "O'ng yelka suyagi",
    "enName": "Humerus (right)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "right",
    "geometryType": "capsule",
    "args": [
      0.018,
      0.28
    ],
    "position": [
      0.21,
      0.36,
      -0.02
    ],
    "color": "#ECE6D6",
    "uzDescription": "O'ng yelka suyagi yelkadan tirsakgacha bo'lgan suyak."
  },
  {
    "id": "yelka-suyagi-chap",
    "uzName": "Chap yelka suyagi",
    "enName": "Humerus (left)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "left",
    "geometryType": "capsule",
    "args": [
      0.018,
      0.28
    ],
    "position": [
      -0.21,
      0.36,
      -0.02
    ],
    "color": "#ECE6D6",
    "uzDescription": "Chap yelka suyagi yelkadan tirsakgacha bo'lgan suyak."
  },
  {
    "id": "bilak-tirsak-ong",
    "uzName": "O'ng tirsak suyagi (ulna)",
    "enName": "Ulna (right)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "right",
    "geometryType": "capsule",
    "args": [
      0.013,
      0.25
    ],
    "position": [
      0.225,
      0.07,
      -0.01
    ],
    "color": "#ECE6D6",
    "uzDescription": "O'ng tirsak suyagi bilakning ichki tomonida joylashgan."
  },
  {
    "id": "bilak-tirsak-chap",
    "uzName": "Chap tirsak suyagi (ulna)",
    "enName": "Ulna (left)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "left",
    "geometryType": "capsule",
    "args": [
      0.013,
      0.25
    ],
    "position": [
      -0.225,
      0.07,
      -0.01
    ],
    "color": "#ECE6D6",
    "uzDescription": "Chap tirsak suyagi bilakning ichki tomonida joylashgan."
  },
  {
    "id": "bilak-radius-ong",
    "uzName": "O'ng bilak suyagi (radius)",
    "enName": "Radius (right)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "right",
    "geometryType": "capsule",
    "args": [
      0.012,
      0.25
    ],
    "position": [
      0.2,
      0.07,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "O'ng bilak suyagi bosh barmoq tomonida joylashgan."
  },
  {
    "id": "bilak-radius-chap",
    "uzName": "Chap bilak suyagi (radius)",
    "enName": "Radius (left)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "left",
    "geometryType": "capsule",
    "args": [
      0.012,
      0.25
    ],
    "position": [
      -0.2,
      0.07,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "Chap bilak suyagi bosh barmoq tomonida joylashgan."
  },
  {
    "id": "panja-ong",
    "uzName": "O'ng panja suyaklari",
    "enName": "Hand bones (right)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "right",
    "geometryType": "box",
    "args": [
      0.04,
      0.09,
      0.02
    ],
    "position": [
      0.215,
      -0.1,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "O'ng panja suyaklari kaft va barmoqlarni hosil qiladi."
  },
  {
    "id": "panja-chap",
    "uzName": "Chap panja suyaklari",
    "enName": "Hand bones (left)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "left",
    "geometryType": "box",
    "args": [
      0.04,
      0.09,
      0.02
    ],
    "position": [
      -0.215,
      -0.1,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "Chap panja suyaklari kaft va barmoqlarni hosil qiladi."
  },
  {
    "id": "son-suyagi-ong",
    "uzName": "O'ng son suyagi",
    "enName": "Femur (right)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "right",
    "geometryType": "capsule",
    "args": [
      0.022,
      0.4
    ],
    "position": [
      0.09,
      -0.3,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "O'ng son suyagi tanadagi eng uzun va kuchli suyak."
  },
  {
    "id": "son-suyagi-chap",
    "uzName": "Chap son suyagi",
    "enName": "Femur (left)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "left",
    "geometryType": "capsule",
    "args": [
      0.022,
      0.4
    ],
    "position": [
      -0.09,
      -0.3,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "Chap son suyagi tanadagi eng uzun va kuchli suyak."
  },
  {
    "id": "tizza-qopqogi-ong",
    "uzName": "O'ng tizza qopqog'i",
    "enName": "Patella (right)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "right",
    "geometryType": "ellipsoid",
    "args": [
      0.022,
      0.025,
      0.012
    ],
    "position": [
      0.09,
      -0.55,
      0.03
    ],
    "color": "#ECE6D6",
    "uzDescription": "O'ng tizza qopqog'i tizza bo'g'imini oldidan himoya qiladi."
  },
  {
    "id": "tizza-qopqogi-chap",
    "uzName": "Chap tizza qopqog'i",
    "enName": "Patella (left)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "left",
    "geometryType": "ellipsoid",
    "args": [
      0.022,
      0.025,
      0.012
    ],
    "position": [
      -0.09,
      -0.55,
      0.03
    ],
    "color": "#ECE6D6",
    "uzDescription": "Chap tizza qopqog'i tizza bo'g'imini oldidan himoya qiladi."
  },
  {
    "id": "boldir-katta-ong",
    "uzName": "O'ng katta boldir suyagi (tibia)",
    "enName": "Tibia (right)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "right",
    "geometryType": "capsule",
    "args": [
      0.018,
      0.3
    ],
    "position": [
      0.09,
      -0.72,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "O'ng katta boldir suyagi tana og'irligini ko'taradi."
  },
  {
    "id": "boldir-katta-chap",
    "uzName": "Chap katta boldir suyagi (tibia)",
    "enName": "Tibia (left)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "left",
    "geometryType": "capsule",
    "args": [
      0.018,
      0.3
    ],
    "position": [
      -0.09,
      -0.72,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "Chap katta boldir suyagi tana og'irligini ko'taradi."
  },
  {
    "id": "boldir-kichik-ong",
    "uzName": "O'ng kichik boldir suyagi (fibula)",
    "enName": "Fibula (right)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "right",
    "geometryType": "capsule",
    "args": [
      0.01,
      0.3
    ],
    "position": [
      0.12,
      -0.72,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "O'ng kichik boldir suyagi boldir tashqi tomonida joylashgan."
  },
  {
    "id": "boldir-kichik-chap",
    "uzName": "Chap kichik boldir suyagi (fibula)",
    "enName": "Fibula (left)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "left",
    "geometryType": "capsule",
    "args": [
      0.01,
      0.3
    ],
    "position": [
      -0.12,
      -0.72,
      0
    ],
    "color": "#ECE6D6",
    "uzDescription": "Chap kichik boldir suyagi boldir tashqi tomonida joylashgan."
  },
  {
    "id": "tovon-ong",
    "uzName": "O'ng tovon suyaklari",
    "enName": "Foot bones (right)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "right",
    "geometryType": "box",
    "args": [
      0.06,
      0.04,
      0.13
    ],
    "position": [
      0.09,
      -0.87,
      0.05
    ],
    "color": "#ECE6D6",
    "uzDescription": "O'ng tovon suyaklari oyoq panjasini hosil qiladi va tana og'irligini ko'taradi."
  },
  {
    "id": "tovon-chap",
    "uzName": "Chap tovon suyaklari",
    "enName": "Foot bones (left)",
    "system": "skeletal",
    "layer": "skeleton",
    "side": "left",
    "geometryType": "box",
    "args": [
      0.06,
      0.04,
      0.13
    ],
    "position": [
      -0.09,
      -0.87,
      0.05
    ],
    "color": "#ECE6D6",
    "uzDescription": "Chap tovon suyaklari oyoq panjasini hosil qiladi va tana og'irligini ko'taradi."
  },
  {
    "id": "yurak",
    "uzName": "Yurak",
    "enName": "Heart",
    "system": "cardiovascular",
    "layer": "organs",
    "geometryType": "ellipsoid",
    "args": [
      0.055,
      0.07,
      0.05
    ],
    "position": [
      -0.04,
      0.34,
      0.06
    ],
    "rotation": [
      0,
      0,
      20
    ],
    "side": "center",
    "color": "#B33A3A",
    "uzDescription": "Yurak ko'krak qafasining markazida, biroz chapda joylashgan muskulli a'zo. U qonni butun tana bo'ylab haydaydi."
  },
  {
    "id": "chap-opka",
    "uzName": "Chap o'pka",
    "enName": "Left Lung",
    "system": "respiratory",
    "layer": "organs",
    "geometryType": "ellipsoid",
    "args": [
      0.075,
      0.16,
      0.085
    ],
    "position": [
      -0.09,
      0.36,
      0
    ],
    "side": "left",
    "color": "#C98B8B",
    "uzDescription": "Chap o'pka ikki bo'lakdan iborat bo'lib, ko'krak qafasining chap tomonida joylashgan. U havodan kislorodni qonga o'tkazadi."
  },
  {
    "id": "chap-opka-yuqori-bolak",
    "uzName": "Chap o'pka yuqori bo'lagi",
    "enName": "Left Lung Superior Lobe",
    "system": "respiratory",
    "layer": "organs",
    "geometryType": "ellipsoid",
    "args": [
      0.07,
      0.08,
      0.08
    ],
    "position": [
      -0.09,
      0.43,
      0
    ],
    "side": "left",
    "color": "#C98B8B",
    "uzDescription": "Chap o'pkaning yuqori bo'lagi ko'krak qafasining yuqori chap qismida joylashgan. U nafas olishda ishtirok etadi."
  },
  {
    "id": "chap-opka-pastki-bolak",
    "uzName": "Chap o'pka pastki bo'lagi",
    "enName": "Left Lung Inferior Lobe",
    "system": "respiratory",
    "layer": "organs",
    "geometryType": "ellipsoid",
    "args": [
      0.07,
      0.075,
      0.08
    ],
    "position": [
      -0.09,
      0.29,
      0
    ],
    "side": "left",
    "color": "#C98B8B",
    "uzDescription": "Chap o'pkaning pastki bo'lagi diafragma ustida joylashgan. U gaz almashinuvini ta'minlaydi."
  },
  {
    "id": "ong-opka",
    "uzName": "O'ng o'pka",
    "enName": "Right Lung",
    "system": "respiratory",
    "layer": "organs",
    "geometryType": "ellipsoid",
    "args": [
      0.08,
      0.16,
      0.085
    ],
    "position": [
      0.09,
      0.36,
      0
    ],
    "side": "right",
    "color": "#C98B8B",
    "uzDescription": "O'ng o'pka uch bo'lakdan iborat bo'lib, chap o'pkadan kattaroq. U havodan kislorodni qonga o'tkazadi."
  },
  {
    "id": "ong-opka-yuqori-bolak",
    "uzName": "O'ng o'pka yuqori bo'lagi",
    "enName": "Right Lung Superior Lobe",
    "system": "respiratory",
    "layer": "organs",
    "geometryType": "ellipsoid",
    "args": [
      0.075,
      0.06,
      0.08
    ],
    "position": [
      0.09,
      0.46,
      0
    ],
    "side": "right",
    "color": "#C98B8B",
    "uzDescription": "O'ng o'pkaning yuqori bo'lagi ko'krak qafasining yuqori o'ng qismida joylashgan. U nafas olishda ishtirok etadi."
  },
  {
    "id": "ong-opka-orta-bolak",
    "uzName": "O'ng o'pka o'rta bo'lagi",
    "enName": "Right Lung Middle Lobe",
    "system": "respiratory",
    "layer": "organs",
    "geometryType": "ellipsoid",
    "args": [
      0.07,
      0.05,
      0.075
    ],
    "position": [
      0.09,
      0.37,
      0.02
    ],
    "side": "right",
    "color": "#C98B8B",
    "uzDescription": "O'ng o'pkaning o'rta bo'lagi faqat o'ng o'pkada bo'ladi. U gaz almashinuvini ta'minlaydi."
  },
  {
    "id": "ong-opka-pastki-bolak",
    "uzName": "O'ng o'pka pastki bo'lagi",
    "enName": "Right Lung Inferior Lobe",
    "system": "respiratory",
    "layer": "organs",
    "geometryType": "ellipsoid",
    "args": [
      0.075,
      0.07,
      0.08
    ],
    "position": [
      0.09,
      0.28,
      0
    ],
    "side": "right",
    "color": "#C98B8B",
    "uzDescription": "O'ng o'pkaning pastki bo'lagi diafragma ustida joylashgan. U gaz almashinuvini ta'minlaydi."
  },
  {
    "id": "traxeya",
    "uzName": "Traxeya (kekirdak)",
    "enName": "Trachea",
    "system": "respiratory",
    "layer": "organs",
    "geometryType": "tube",
    "path": [
      [
        0,
        0.55,
        0.02
      ],
      [
        0,
        0.48,
        0.02
      ],
      [
        0,
        0.42,
        0.02
      ]
    ],
    "radius": 0.012,
    "position": [
      0,
      0.48,
      0.02
    ],
    "side": "center",
    "color": "#C98B8B",
    "uzDescription": "Traxeya bo'g'izdan o'pkaga havo olib boruvchi nay. U bo'yindan ko'krak qafasiga tushadi."
  },
  {
    "id": "chap-bronx",
    "uzName": "Chap bronx",
    "enName": "Left Bronchus",
    "system": "respiratory",
    "layer": "organs",
    "geometryType": "tube",
    "path": [
      [
        0,
        0.42,
        0.02
      ],
      [
        -0.03,
        0.4,
        0.01
      ],
      [
        -0.06,
        0.38,
        0
      ]
    ],
    "radius": 0.008,
    "position": [
      -0.03,
      0.4,
      0.01
    ],
    "side": "left",
    "color": "#C98B8B",
    "uzDescription": "Chap bronx traxeyadan chap o'pkaga havo olib boradi. U traxeyaning ikkiga ajralishidan hosil bo'ladi."
  },
  {
    "id": "ong-bronx",
    "uzName": "O'ng bronx",
    "enName": "Right Bronchus",
    "system": "respiratory",
    "layer": "organs",
    "geometryType": "tube",
    "path": [
      [
        0,
        0.42,
        0.02
      ],
      [
        0.03,
        0.4,
        0.01
      ],
      [
        0.06,
        0.38,
        0
      ]
    ],
    "radius": 0.008,
    "position": [
      0.03,
      0.4,
      0.01
    ],
    "side": "right",
    "color": "#C98B8B",
    "uzDescription": "O'ng bronx traxeyadan o'ng o'pkaga havo olib boradi. U chap bronxdan kengroq va tikroq joylashgan."
  },
  {
    "id": "qizilongach",
    "uzName": "Qizilo'ngach",
    "enName": "Esophagus",
    "system": "digestive",
    "layer": "organs",
    "geometryType": "tube",
    "path": [
      [
        0,
        0.55,
        -0.02
      ],
      [
        0,
        0.45,
        -0.02
      ],
      [
        0,
        0.35,
        -0.02
      ],
      [
        0,
        0.25,
        -0.015
      ],
      [
        -0.01,
        0.18,
        -0.01
      ]
    ],
    "radius": 0.01,
    "position": [
      0,
      0.35,
      -0.02
    ],
    "side": "center",
    "color": "#C8A06A",
    "uzDescription": "Qizilo'ngach ovqatni bo'g'izdan oshqozonga olib boruvchi muskulli nay. U traxeyaning orqasida joylashgan."
  },
  {
    "id": "diafragma",
    "uzName": "Diafragma",
    "enName": "Diaphragm",
    "system": "respiratory",
    "layer": "organs",
    "geometryType": "ellipsoid",
    "args": [
      0.16,
      0.04,
      0.12
    ],
    "position": [
      0,
      0.19,
      0
    ],
    "side": "center",
    "color": "#9E4B4B",
    "uzDescription": "Diafragma ko'krak va qorin bo'shliqlarini ajratuvchi gumbazsimon muskul. U nafas olishda asosiy rol o'ynaydi."
  },
  {
    "id": "jigar",
    "uzName": "Jigar",
    "enName": "Liver",
    "system": "digestive",
    "layer": "organs",
    "geometryType": "ellipsoid",
    "args": [
      0.13,
      0.06,
      0.09
    ],
    "position": [
      0.05,
      0.17,
      0.04
    ],
    "rotation": [
      0,
      0,
      -10
    ],
    "side": "right",
    "color": "#7A4A3A",
    "uzDescription": "Jigar qorinning o'ng yuqori qismida joylashgan eng katta ichki bez bo'lib, qonni tozalaydi va o't suyuqligini ishlab chiqaradi."
  },
  {
    "id": "meda",
    "uzName": "Me'da (oshqozon)",
    "enName": "Stomach",
    "system": "digestive",
    "layer": "organs",
    "geometryType": "ellipsoid",
    "args": [
      0.06,
      0.08,
      0.045
    ],
    "position": [
      -0.06,
      0.15,
      0.05
    ],
    "rotation": [
      0,
      0,
      20
    ],
    "side": "left",
    "color": "#C8A06A",
    "uzDescription": "Me'da qorinning chap yuqori qismida joylashgan bo'lib, ovqatni saqlaydi va shira yordamida hazm qiladi."
  },
  {
    "id": "taloq",
    "uzName": "Taloq",
    "enName": "Spleen",
    "system": "lymphatic",
    "layer": "organs",
    "geometryType": "ellipsoid",
    "args": [
      0.035,
      0.055,
      0.03
    ],
    "position": [
      -0.12,
      0.16,
      -0.02
    ],
    "rotation": [
      0,
      0,
      15
    ],
    "side": "left",
    "color": "#8B4A4A",
    "uzDescription": "Taloq qorinning chap tomonida, me'da orqasida joylashgan bo'lib, qonni filtrlaydi va immunitetga yordam beradi."
  },
  {
    "id": "oshqozon-osti-bezi",
    "uzName": "Oshqozon osti bezi",
    "enName": "Pancreas",
    "system": "digestive",
    "layer": "organs",
    "geometryType": "ellipsoid",
    "args": [
      0.08,
      0.022,
      0.02
    ],
    "position": [
      -0.02,
      0.12,
      -0.02
    ],
    "rotation": [
      0,
      0,
      10
    ],
    "side": "center",
    "color": "#C8A06A",
    "uzDescription": "Oshqozon osti bezi me'da ostida joylashgan bo'lib, hazm fermentlari va insulin gormonini ishlab chiqaradi."
  },
  {
    "id": "ot-pufagi",
    "uzName": "O't pufagi",
    "enName": "Gallbladder",
    "system": "digestive",
    "layer": "organs",
    "geometryType": "ellipsoid",
    "args": [
      0.018,
      0.03,
      0.018
    ],
    "position": [
      0.04,
      0.13,
      0.07
    ],
    "rotation": [
      0,
      0,
      0
    ],
    "side": "right",
    "color": "#6B8E4E",
    "uzDescription": "O't pufagi jigar ostida joylashgan kichik xaltacha bo'lib, o't suyuqligini saqlaydi va hazmga ajratadi."
  },
  {
    "id": "ingichka-ichak",
    "uzName": "Ingichka ichak",
    "enName": "Small intestine",
    "system": "digestive",
    "layer": "organs",
    "geometryType": "tube",
    "path": [
      [
        0,
        0.06,
        0.06
      ],
      [
        0.06,
        0.04,
        0.07
      ],
      [
        0.07,
        0,
        0.06
      ],
      [
        0.02,
        -0.02,
        0.08
      ],
      [
        -0.05,
        -0.01,
        0.07
      ],
      [
        -0.07,
        0.03,
        0.06
      ],
      [
        -0.04,
        0.05,
        0.08
      ],
      [
        0.03,
        0.02,
        0.09
      ],
      [
        0.05,
        -0.03,
        0.07
      ],
      [
        0,
        -0.04,
        0.08
      ],
      [
        -0.05,
        -0.03,
        0.07
      ],
      [
        -0.06,
        0,
        0.06
      ]
    ],
    "radius": 0.018,
    "position": [
      0,
      0,
      0.06
    ],
    "side": "center",
    "color": "#C8A06A",
    "uzDescription": "Ingichka ichak qorin markazida buralib joylashgan uzun naycha bo'lib, ovqatdan oziq moddalarni so'rib oladi."
  },
  {
    "id": "yogon-ichak",
    "uzName": "Yo'g'on ichak",
    "enName": "Large intestine",
    "system": "digestive",
    "layer": "organs",
    "geometryType": "tube",
    "path": [
      [
        0.1,
        -0.06,
        0.05
      ],
      [
        0.11,
        -0.01,
        0.05
      ],
      [
        0.11,
        0.05,
        0.05
      ],
      [
        0.09,
        0.09,
        0.06
      ],
      [
        0,
        0.1,
        0.06
      ],
      [
        -0.09,
        0.09,
        0.06
      ],
      [
        -0.11,
        0.05,
        0.05
      ],
      [
        -0.11,
        -0.01,
        0.05
      ],
      [
        -0.1,
        -0.06,
        0.05
      ],
      [
        -0.06,
        -0.08,
        0.05
      ]
    ],
    "radius": 0.025,
    "position": [
      0,
      0,
      0.05
    ],
    "side": "center",
    "color": "#C8A06A",
    "uzDescription": "Yo'g'on ichak qorinni ramka shaklida o'rab turadi: o'ngda ko'tariluvchi, yuqorida ko'ndalang, chapda tushuvchi qism bo'lib, suvni so'rib najasni shakllantiradi."
  },
  {
    "id": "ong-buyrak",
    "uzName": "O'ng buyrak",
    "enName": "Right kidney",
    "system": "urinary",
    "layer": "organs",
    "geometryType": "ellipsoid",
    "args": [
      0.03,
      0.055,
      0.025
    ],
    "position": [
      0.07,
      0.11,
      -0.08
    ],
    "rotation": [
      0,
      0,
      0
    ],
    "side": "right",
    "color": "#8B4A4A",
    "uzDescription": "O'ng buyrak qorin orqa devorida, umurtqa yonida joylashgan bo'lib, qonni filtrlaydi va siydik hosil qiladi."
  },
  {
    "id": "chap-buyrak",
    "uzName": "Chap buyrak",
    "enName": "Left kidney",
    "system": "urinary",
    "layer": "organs",
    "geometryType": "ellipsoid",
    "args": [
      0.03,
      0.055,
      0.025
    ],
    "position": [
      -0.07,
      0.13,
      -0.08
    ],
    "rotation": [
      0,
      0,
      0
    ],
    "side": "left",
    "color": "#8B4A4A",
    "uzDescription": "Chap buyrak qorin orqa devorida, o'ng buyrakdan biroz yuqoriroq joylashgan bo'lib, qonni tozalaydi va siydik ishlab chiqaradi."
  },
  {
    "id": "siydik-pufagi",
    "uzName": "Siydik pufagi",
    "enName": "Urinary bladder",
    "system": "urinary",
    "layer": "organs",
    "geometryType": "ellipsoid",
    "args": [
      0.04,
      0.035,
      0.035
    ],
    "position": [
      0,
      -0.07,
      0.05
    ],
    "rotation": [
      0,
      0,
      0
    ],
    "side": "center",
    "color": "#C9B45A",
    "uzDescription": "Siydik pufagi tos bo'shlig'ining pastki qismida joylashgan xaltacha bo'lib, buyraklardan kelgan siydikni saqlaydi."
  },
  {
    "id": "cerebrum-left-hemisphere",
    "uzName": "Chap yarim shar",
    "enName": "Left Cerebral Hemisphere",
    "system": "nervous",
    "layer": "organs",
    "geometryType": "ellipsoid",
    "args": [
      0.065,
      0.075,
      0.085
    ],
    "position": [
      -0.045,
      0.8,
      0
    ],
    "rotation": [
      0,
      0,
      0
    ],
    "side": "left",
    "color": "#D9C2C9",
    "uzDescription": "Bosh miyaning chap yarim shari. Fikrlash, harakat va sezgini boshqaradi."
  },
  {
    "id": "cerebrum-right-hemisphere",
    "uzName": "O'ng yarim shar",
    "enName": "Right Cerebral Hemisphere",
    "system": "nervous",
    "layer": "organs",
    "geometryType": "ellipsoid",
    "args": [
      0.065,
      0.075,
      0.085
    ],
    "position": [
      0.045,
      0.8,
      0
    ],
    "rotation": [
      0,
      0,
      0
    ],
    "side": "right",
    "color": "#D9C2C9",
    "uzDescription": "Bosh miyaning o'ng yarim shari. Fazoni idrok etish va ijodiy faoliyatni boshqaradi."
  },
  {
    "id": "cerebellum",
    "uzName": "Miyacha",
    "enName": "Cerebellum",
    "system": "nervous",
    "layer": "organs",
    "geometryType": "ellipsoid",
    "args": [
      0.045,
      0.03,
      0.035
    ],
    "position": [
      0,
      0.72,
      -0.05
    ],
    "rotation": [
      0,
      0,
      0
    ],
    "side": "center",
    "color": "#C9B0B8",
    "uzDescription": "Bosh miya orqasida, pastda joylashgan. Muvozanat va harakatlar muvofiqligini ta'minlaydi."
  },
  {
    "id": "brainstem",
    "uzName": "Miya ustuni",
    "enName": "Brainstem",
    "system": "nervous",
    "layer": "organs",
    "geometryType": "cylinder",
    "args": [
      0.014,
      0.018,
      0.06
    ],
    "position": [
      0,
      0.69,
      -0.015
    ],
    "rotation": [
      0,
      0,
      0
    ],
    "side": "center",
    "color": "#CBB4BB",
    "uzDescription": "Bosh miyani orqa miya bilan bog'laydi. Nafas olish va yurak urishini boshqaradi."
  },
  {
    "id": "spinal-cord",
    "uzName": "Orqa miya",
    "enName": "Spinal Cord",
    "system": "nervous",
    "layer": "organs",
    "geometryType": "tube",
    "position": [
      0,
      0.3,
      -0.08
    ],
    "color": "#E8DCC0",
    "path": [
      [
        0,
        0.66,
        -0.02
      ],
      [
        0,
        0.6,
        -0.04
      ],
      [
        0,
        0.5,
        -0.07
      ],
      [
        0,
        0.4,
        -0.08
      ],
      [
        0,
        0.3,
        -0.08
      ],
      [
        0,
        0.2,
        -0.08
      ],
      [
        0,
        0.1,
        -0.075
      ],
      [
        0,
        0.02,
        -0.06
      ]
    ],
    "radius": 0.01,
    "side": "center",
    "uzDescription": "Umurtqa kanali ichida pastga tushadi. Bosh miya va tana o'rtasida signallarni uzatadi."
  },
  {
    "id": "sciatic-nerve-left",
    "uzName": "Chap quymich nervi",
    "enName": "Left Sciatic Nerve",
    "system": "nervous",
    "layer": "organs",
    "geometryType": "tube",
    "position": [
      -0.08,
      -0.3,
      -0.07
    ],
    "color": "#F0E6CE",
    "path": [
      [
        -0.07,
        -0.06,
        -0.09
      ],
      [
        -0.08,
        -0.15,
        -0.08
      ],
      [
        -0.08,
        -0.25,
        -0.07
      ],
      [
        -0.07,
        -0.4,
        -0.06
      ],
      [
        -0.06,
        -0.52,
        -0.04
      ]
    ],
    "radius": 0.006,
    "side": "left",
    "uzDescription": "Chap son orqasida joylashgan eng yo'g'on nerv. Oyoq muskullari va terisini innervatsiya qiladi."
  },
  {
    "id": "sciatic-nerve-right",
    "uzName": "O'ng quymich nervi",
    "enName": "Right Sciatic Nerve",
    "system": "nervous",
    "layer": "organs",
    "geometryType": "tube",
    "position": [
      0.08,
      -0.3,
      -0.07
    ],
    "color": "#F0E6CE",
    "path": [
      [
        0.07,
        -0.06,
        -0.09
      ],
      [
        0.08,
        -0.15,
        -0.08
      ],
      [
        0.08,
        -0.25,
        -0.07
      ],
      [
        0.07,
        -0.4,
        -0.06
      ],
      [
        0.06,
        -0.52,
        -0.04
      ]
    ],
    "radius": 0.006,
    "side": "right",
    "uzDescription": "O'ng son orqasida joylashgan eng yo'g'on nerv. Oyoq muskullari va terisini innervatsiya qiladi."
  },
  {
    "id": "pectoralis-left",
    "uzName": "Chap ko'krak muskuli",
    "enName": "Pectoralis Major (Left)",
    "system": "muscular",
    "layer": "muscle",
    "geometryType": "ellipsoid",
    "args": [
      0.1,
      0.08,
      0.05
    ],
    "position": [
      -0.08,
      0.38,
      0.11
    ],
    "rotation": [
      0,
      0,
      10
    ],
    "color": "#9E4B4B",
    "side": "left",
    "uzDescription": "Ko'krak qafasining old yuzasidagi keng muskul, qo'lni oldinga va ichkariga harakatlantiradi."
  },
  {
    "id": "pectoralis-right",
    "uzName": "O'ng ko'krak muskuli",
    "enName": "Pectoralis Major (Right)",
    "system": "muscular",
    "layer": "muscle",
    "geometryType": "ellipsoid",
    "args": [
      0.1,
      0.08,
      0.05
    ],
    "position": [
      0.08,
      0.38,
      0.11
    ],
    "rotation": [
      0,
      0,
      -10
    ],
    "color": "#9E4B4B",
    "side": "right",
    "uzDescription": "Ko'krak qafasining old yuzasidagi keng muskul, qo'lni oldinga va ichkariga harakatlantiradi."
  },
  {
    "id": "rectus-abdominis",
    "uzName": "Qorin to'g'ri muskuli",
    "enName": "Rectus Abdominis",
    "system": "muscular",
    "layer": "muscle",
    "geometryType": "capsule",
    "args": [
      0.07,
      0.24
    ],
    "position": [
      0,
      0.14,
      0.12
    ],
    "rotation": [
      0,
      0,
      0
    ],
    "color": "#9E4B4B",
    "side": "center",
    "uzDescription": "Qorinning old o'rta qismidagi uzun muskul, gavdani oldinga egadi."
  },
  {
    "id": "external-oblique-left",
    "uzName": "Chap qiyshiq qorin muskuli",
    "enName": "External Oblique (Left)",
    "system": "muscular",
    "layer": "muscle",
    "geometryType": "ellipsoid",
    "args": [
      0.05,
      0.13,
      0.06
    ],
    "position": [
      -0.11,
      0.14,
      0.08
    ],
    "rotation": [
      0,
      0,
      15
    ],
    "color": "#9E4B4B",
    "side": "left",
    "uzDescription": "Qorinning yon tomonidagi qiyshiq muskul, gavdani burish va egishda ishtirok etadi."
  },
  {
    "id": "external-oblique-right",
    "uzName": "O'ng qiyshiq qorin muskuli",
    "enName": "External Oblique (Right)",
    "system": "muscular",
    "layer": "muscle",
    "geometryType": "ellipsoid",
    "args": [
      0.05,
      0.13,
      0.06
    ],
    "position": [
      0.11,
      0.14,
      0.08
    ],
    "rotation": [
      0,
      0,
      -15
    ],
    "color": "#9E4B4B",
    "side": "right",
    "uzDescription": "Qorinning yon tomonidagi qiyshiq muskul, gavdani burish va egishda ishtirok etadi."
  },
  {
    "id": "deltoid-left",
    "uzName": "Chap deltasimon muskul",
    "enName": "Deltoid (Left)",
    "system": "muscular",
    "layer": "muscle",
    "geometryType": "ellipsoid",
    "args": [
      0.06,
      0.08,
      0.06
    ],
    "position": [
      -0.22,
      0.52,
      0.02
    ],
    "rotation": [
      0,
      0,
      0
    ],
    "color": "#9E4B4B",
    "side": "left",
    "uzDescription": "Yelka ustidagi uchburchak muskul, qo'lni yon tomonga ko'taradi."
  },
  {
    "id": "deltoid-right",
    "uzName": "O'ng deltasimon muskul",
    "enName": "Deltoid (Right)",
    "system": "muscular",
    "layer": "muscle",
    "geometryType": "ellipsoid",
    "args": [
      0.06,
      0.08,
      0.06
    ],
    "position": [
      0.22,
      0.52,
      0.02
    ],
    "rotation": [
      0,
      0,
      0
    ],
    "color": "#9E4B4B",
    "side": "right",
    "uzDescription": "Yelka ustidagi uchburchak muskul, qo'lni yon tomonga ko'taradi."
  },
  {
    "id": "biceps-left",
    "uzName": "Chap ikki boshli muskul",
    "enName": "Biceps Brachii (Left)",
    "system": "muscular",
    "layer": "muscle",
    "geometryType": "capsule",
    "args": [
      0.035,
      0.14
    ],
    "position": [
      -0.24,
      0.38,
      0.04
    ],
    "rotation": [
      0,
      0,
      3
    ],
    "color": "#9E4B4B",
    "side": "left",
    "uzDescription": "Yelka oldidagi muskul, tirsakni bukadi va bilakni buradi."
  },
  {
    "id": "biceps-right",
    "uzName": "O'ng ikki boshli muskul",
    "enName": "Biceps Brachii (Right)",
    "system": "muscular",
    "layer": "muscle",
    "geometryType": "capsule",
    "args": [
      0.035,
      0.14
    ],
    "position": [
      0.24,
      0.38,
      0.04
    ],
    "rotation": [
      0,
      0,
      -3
    ],
    "color": "#9E4B4B",
    "side": "right",
    "uzDescription": "Yelka oldidagi muskul, tirsakni bukadi va bilakni buradi."
  },
  {
    "id": "triceps-left",
    "uzName": "Chap uch boshli muskul",
    "enName": "Triceps Brachii (Left)",
    "system": "muscular",
    "layer": "muscle",
    "geometryType": "capsule",
    "args": [
      0.035,
      0.14
    ],
    "position": [
      -0.25,
      0.38,
      -0.04
    ],
    "rotation": [
      0,
      0,
      3
    ],
    "color": "#9E4B4B",
    "side": "left",
    "uzDescription": "Yelka orqasidagi muskul, tirsakni yozadi."
  },
  {
    "id": "triceps-right",
    "uzName": "O'ng uch boshli muskul",
    "enName": "Triceps Brachii (Right)",
    "system": "muscular",
    "layer": "muscle",
    "geometryType": "capsule",
    "args": [
      0.035,
      0.14
    ],
    "position": [
      0.25,
      0.38,
      -0.04
    ],
    "rotation": [
      0,
      0,
      -3
    ],
    "color": "#9E4B4B",
    "side": "right",
    "uzDescription": "Yelka orqasidagi muskul, tirsakni yozadi."
  },
  {
    "id": "quadriceps-left",
    "uzName": "Chap son to'rt boshli muskuli",
    "enName": "Quadriceps Femoris (Left)",
    "system": "muscular",
    "layer": "muscle",
    "geometryType": "capsule",
    "args": [
      0.055,
      0.22
    ],
    "position": [
      -0.08,
      -0.28,
      0.05
    ],
    "rotation": [
      0,
      0,
      2
    ],
    "color": "#9E4B4B",
    "side": "left",
    "uzDescription": "Son oldidagi yirik muskul, tizzani yozadi."
  },
  {
    "id": "quadriceps-right",
    "uzName": "O'ng son to'rt boshli muskuli",
    "enName": "Quadriceps Femoris (Right)",
    "system": "muscular",
    "layer": "muscle",
    "geometryType": "capsule",
    "args": [
      0.055,
      0.22
    ],
    "position": [
      0.08,
      -0.28,
      0.05
    ],
    "rotation": [
      0,
      0,
      -2
    ],
    "color": "#9E4B4B",
    "side": "right",
    "uzDescription": "Son oldidagi yirik muskul, tizzani yozadi."
  },
  {
    "id": "calf-left",
    "uzName": "Chap boldir muskuli",
    "enName": "Gastrocnemius (Left)",
    "system": "muscular",
    "layer": "muscle",
    "geometryType": "capsule",
    "args": [
      0.04,
      0.14
    ],
    "position": [
      -0.08,
      -0.66,
      -0.03
    ],
    "rotation": [
      0,
      0,
      0
    ],
    "color": "#9E4B4B",
    "side": "left",
    "uzDescription": "Boldirning orqasidagi muskul, oyoq panjasini pastga bosadi."
  },
  {
    "id": "calf-right",
    "uzName": "O'ng boldir muskuli",
    "enName": "Gastrocnemius (Right)",
    "system": "muscular",
    "layer": "muscle",
    "geometryType": "capsule",
    "args": [
      0.04,
      0.14
    ],
    "position": [
      0.08,
      -0.66,
      -0.03
    ],
    "rotation": [
      0,
      0,
      0
    ],
    "color": "#9E4B4B",
    "side": "right",
    "uzDescription": "Boldirning orqasidagi muskul, oyoq panjasini pastga bosadi."
  },
  {
    "id": "gluteus-maximus",
    "uzName": "Katta dumba muskuli",
    "enName": "Gluteus Maximus",
    "system": "muscular",
    "layer": "muscle",
    "geometryType": "ellipsoid",
    "args": [
      0.16,
      0.09,
      0.08
    ],
    "position": [
      0,
      -0.08,
      -0.12
    ],
    "rotation": [
      0,
      0,
      0
    ],
    "color": "#9E4B4B",
    "side": "center",
    "uzDescription": "Tos orqasidagi eng yirik muskul, sonni orqaga tortadi va gavdani tik tutadi."
  },
  {
    "id": "trapezius",
    "uzName": "Trapetsiya muskuli",
    "enName": "Trapezius",
    "system": "muscular",
    "layer": "muscle",
    "geometryType": "ellipsoid",
    "args": [
      0.16,
      0.12,
      0.05
    ],
    "position": [
      0,
      0.5,
      -0.1
    ],
    "rotation": [
      0,
      0,
      0
    ],
    "color": "#9E4B4B",
    "side": "center",
    "uzDescription": "Bo'yin va yelka orqasidagi keng muskul, yelkani ko'taradi va boshni harakatlantiradi."
  },
  {
    "id": "latissimus-dorsi-left",
    "uzName": "Chap keng orqa muskuli",
    "enName": "Latissimus Dorsi (Left)",
    "system": "muscular",
    "layer": "muscle",
    "geometryType": "ellipsoid",
    "args": [
      0.08,
      0.13,
      0.05
    ],
    "position": [
      -0.11,
      0.28,
      -0.11
    ],
    "rotation": [
      0,
      0,
      8
    ],
    "color": "#9E4B4B",
    "side": "left",
    "uzDescription": "Orqaning keng muskuli, qo'lni pastga va orqaga tortadi."
  },
  {
    "id": "latissimus-dorsi-right",
    "uzName": "O'ng keng orqa muskuli",
    "enName": "Latissimus Dorsi (Right)",
    "system": "muscular",
    "layer": "muscle",
    "geometryType": "ellipsoid",
    "args": [
      0.08,
      0.13,
      0.05
    ],
    "position": [
      0.11,
      0.28,
      -0.11
    ],
    "rotation": [
      0,
      0,
      -8
    ],
    "color": "#9E4B4B",
    "side": "right",
    "uzDescription": "Orqaning keng muskuli, qo'lni pastga va orqaga tortadi."
  },
  {
    "id": "aorta",
    "uzName": "Aorta",
    "enName": "Aorta",
    "system": "cardiovascular",
    "layer": "vessels",
    "geometryType": "tube",
    "position": [
      0,
      0,
      0
    ],
    "color": "#B33A3A",
    "side": "center",
    "radius": 0.018,
    "path": [
      [
        -0.02,
        0.33,
        0.04
      ],
      [
        -0.03,
        0.42,
        0
      ],
      [
        0,
        0.47,
        -0.04
      ],
      [
        -0.02,
        0.4,
        -0.06
      ],
      [
        -0.03,
        0.3,
        -0.07
      ],
      [
        -0.03,
        0.15,
        -0.07
      ],
      [
        -0.03,
        0,
        -0.07
      ],
      [
        -0.03,
        -0.06,
        -0.06
      ]
    ],
    "uzDescription": "Aorta tananing eng yirik arteriyasi bo'lib, yurakdan chiqib yoy hosil qiladi va qonni butun tanaga taqsimlaydi."
  },
  {
    "id": "superior-vena-cava",
    "uzName": "Yuqori kovak vena",
    "enName": "Superior vena cava",
    "system": "cardiovascular",
    "layer": "vessels",
    "geometryType": "tube",
    "position": [
      0,
      0,
      0
    ],
    "color": "#3B5BA5",
    "side": "right",
    "radius": 0.014,
    "path": [
      [
        0.05,
        0.52,
        -0.02
      ],
      [
        0.05,
        0.46,
        -0.02
      ],
      [
        0.04,
        0.42,
        -0.02
      ],
      [
        0.03,
        0.38,
        0
      ],
      [
        0.02,
        0.35,
        0.02
      ]
    ],
    "uzDescription": "Yuqori kovak vena boshdan va qo'llardan kelgan kislorodsiz qonni yurakning o'ng bo'lmasiga qaytaradi."
  },
  {
    "id": "inferior-vena-cava",
    "uzName": "Pastki kovak vena",
    "enName": "Inferior vena cava",
    "system": "cardiovascular",
    "layer": "vessels",
    "geometryType": "tube",
    "position": [
      0,
      0,
      0
    ],
    "color": "#3B5BA5",
    "side": "right",
    "radius": 0.015,
    "path": [
      [
        0.04,
        0.32,
        0.02
      ],
      [
        0.05,
        0.2,
        0
      ],
      [
        0.05,
        0.1,
        -0.02
      ],
      [
        0.05,
        0,
        -0.04
      ],
      [
        0.05,
        -0.06,
        -0.05
      ]
    ],
    "uzDescription": "Pastki kovak vena tananing pastki qismidan va oyoqlardan kelgan qonni yurakka qaytaradi."
  },
  {
    "id": "carotid-artery-left",
    "uzName": "Chap uyqu arteriyasi",
    "enName": "Left carotid artery",
    "system": "cardiovascular",
    "layer": "vessels",
    "geometryType": "tube",
    "position": [
      0,
      0,
      0
    ],
    "color": "#B33A3A",
    "side": "left",
    "radius": 0.007,
    "path": [
      [
        -0.01,
        0.47,
        -0.03
      ],
      [
        -0.03,
        0.55,
        -0.01
      ],
      [
        -0.04,
        0.62,
        0
      ],
      [
        -0.04,
        0.7,
        0.01
      ],
      [
        -0.04,
        0.76,
        0.02
      ]
    ],
    "uzDescription": "Chap uyqu arteriyasi bo'yin orqali miyaga va bosh qismiga qon yetkazib beradi."
  },
  {
    "id": "carotid-artery-right",
    "uzName": "O'ng uyqu arteriyasi",
    "enName": "Right carotid artery",
    "system": "cardiovascular",
    "layer": "vessels",
    "geometryType": "tube",
    "position": [
      0,
      0,
      0
    ],
    "color": "#B33A3A",
    "side": "right",
    "radius": 0.007,
    "path": [
      [
        0.01,
        0.47,
        -0.03
      ],
      [
        0.03,
        0.55,
        -0.01
      ],
      [
        0.04,
        0.62,
        0
      ],
      [
        0.04,
        0.7,
        0.01
      ],
      [
        0.04,
        0.76,
        0.02
      ]
    ],
    "uzDescription": "O'ng uyqu arteriyasi bo'yin orqali miyaga va bosh qismiga qon yetkazib beradi."
  },
  {
    "id": "subclavian-artery-left",
    "uzName": "Chap o'mrov osti arteriyasi",
    "enName": "Left subclavian artery",
    "system": "cardiovascular",
    "layer": "vessels",
    "geometryType": "tube",
    "position": [
      0,
      0,
      0
    ],
    "color": "#B33A3A",
    "side": "left",
    "radius": 0.008,
    "path": [
      [
        -0.02,
        0.46,
        -0.03
      ],
      [
        -0.08,
        0.52,
        -0.01
      ],
      [
        -0.14,
        0.53,
        0
      ],
      [
        -0.2,
        0.5,
        0
      ],
      [
        -0.24,
        0.4,
        0
      ],
      [
        -0.26,
        0.25,
        0
      ]
    ],
    "uzDescription": "Chap o'mrov osti va yelka arteriyasi yelka orqali chap qo'lga qon yetkazib beradi."
  },
  {
    "id": "subclavian-artery-right",
    "uzName": "O'ng o'mrov osti arteriyasi",
    "enName": "Right subclavian artery",
    "system": "cardiovascular",
    "layer": "vessels",
    "geometryType": "tube",
    "position": [
      0,
      0,
      0
    ],
    "color": "#B33A3A",
    "side": "right",
    "radius": 0.008,
    "path": [
      [
        0.02,
        0.46,
        -0.03
      ],
      [
        0.08,
        0.52,
        -0.01
      ],
      [
        0.14,
        0.53,
        0
      ],
      [
        0.2,
        0.5,
        0
      ],
      [
        0.24,
        0.4,
        0
      ],
      [
        0.26,
        0.25,
        0
      ]
    ],
    "uzDescription": "O'ng o'mrov osti va yelka arteriyasi yelka orqali o'ng qo'lga qon yetkazib beradi."
  },
  {
    "id": "femoral-artery-left",
    "uzName": "Chap son arteriyasi",
    "enName": "Left femoral artery",
    "system": "cardiovascular",
    "layer": "vessels",
    "geometryType": "tube",
    "position": [
      0,
      0,
      0
    ],
    "color": "#B33A3A",
    "side": "left",
    "radius": 0.009,
    "path": [
      [
        -0.03,
        -0.06,
        -0.04
      ],
      [
        -0.07,
        -0.1,
        0
      ],
      [
        -0.09,
        -0.18,
        0.02
      ],
      [
        -0.09,
        -0.3,
        0.02
      ],
      [
        -0.08,
        -0.4,
        0.01
      ],
      [
        -0.07,
        -0.5,
        0
      ]
    ],
    "uzDescription": "Chap son arteriyasi tos sohasidan chap oyoqqa qon yetkazib beradi."
  },
  {
    "id": "femoral-artery-right",
    "uzName": "O'ng son arteriyasi",
    "enName": "Right femoral artery",
    "system": "cardiovascular",
    "layer": "vessels",
    "geometryType": "tube",
    "position": [
      0,
      0,
      0
    ],
    "color": "#B33A3A",
    "side": "right",
    "radius": 0.009,
    "path": [
      [
        0.03,
        -0.06,
        -0.04
      ],
      [
        0.07,
        -0.1,
        0
      ],
      [
        0.09,
        -0.18,
        0.02
      ],
      [
        0.09,
        -0.3,
        0.02
      ],
      [
        0.08,
        -0.4,
        0.01
      ],
      [
        0.07,
        -0.5,
        0
      ]
    ],
    "uzDescription": "O'ng son arteriyasi tos sohasidan o'ng oyoqqa qon yetkazib beradi."
  },
  {
    "id": "pulmonary-artery",
    "uzName": "O'pka arteriyasi",
    "enName": "Pulmonary artery",
    "system": "cardiovascular",
    "layer": "vessels",
    "geometryType": "tube",
    "position": [
      0,
      0,
      0
    ],
    "color": "#3B5BA5",
    "side": "center",
    "radius": 0.012,
    "path": [
      [
        -0.02,
        0.36,
        0.06
      ],
      [
        -0.02,
        0.42,
        0.02
      ],
      [
        -0.01,
        0.44,
        -0.02
      ],
      [
        -0.06,
        0.43,
        -0.04
      ],
      [
        -0.11,
        0.4,
        -0.05
      ]
    ],
    "uzDescription": "O'pka arteriyasi yurakdan kislorodsiz qonni o'pkaga olib boradi va qon kislorod bilan to'yinadi."
  }
];
