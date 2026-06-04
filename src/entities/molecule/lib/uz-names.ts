import type { Molecule } from "../model/types";

/**
 * Molekula nomlarining o'zbekcha tarjimasi, PubChem CID bo'yicha kalitlangan.
 *
 * Asl ma'lumotlar (model/molecules.ts) PubChem'dan avtomatik generatsiya
 * qilingani uchun, o'zbekcha nomlar shu yerda alohida saqlanadi. CID — barqaror
 * kalit: u molekula qayta generatsiya qilinsa ham o'zgarmaydi.
 *
 * Tarjima topilmasa, `moleculeNameUz` asl (inglizcha) nomga qaytadi.
 */
export const moleculeNamesUz: Record<number, string> = {
  // Gazlar va oddiy birikmalar
  222: "Ammiak", // Ammonia
  280: "Karbon dioksidi", // Carbon Dioxide
  281: "Karbon monoksidi", // Carbon Monoxide
  297: "Metan", // Methane
  402: "Vodorod sulfidi", // Hydrogen Sulfide
  783: "Vodorod", // Hydrogen
  947: "Azot", // Nitrogen
  948: "Azot(I)-oksid", // Nitrous Oxide
  977: "Kislorod", // Oxygen
  1119: "Oltingugurt dioksidi", // Sulfur Dioxide
  6325: "Etilen", // Ethylene
  24524: "Ftor", // Fluorine
  24526: "Xlor", // Chlorine
  24823: "Ozon", // Ozone
  145068: "Azot(II)-oksid", // Nitric Oxide
  3032552: "Azot dioksidi", // Nitrogen Dioxide

  // Kislotalar va asoslar
  176: "Sirka kislota", // Acetic Acid
  260: "Vodorod bromid", // Hydrogen Bromide
  313: "Xlorid kislota", // Hydrochloric Acid
  767: "Karbonat kislota", // Carbonic Acid
  944: "Nitrat kislota", // Nitric Acid
  1004: "Fosfat kislota", // Phosphoric Acid
  1118: "Sulfat kislota", // Sulfuric Acid
  7628: "Borat kislota", // Boric Acid
  14797: "Kaliy gidroksidi", // Potassium Hydroxide
  14798: "Natriy gidroksidi", // Sodium Hydroxide
  14917: "Ftorid kislota", // Hydrofluoric Acid
  14923: "Ammoniy gidroksidi", // Ammonium Hydroxide
  24247: "Perxlorat kislota", // Perchloric Acid
  73981: "Magniy gidroksidi", // Magnesium Hydroxide
  516892: "Natriy gidrokarbonat", // Sodium Bicarbonate
  6093208: "Kalsiy gidroksidi", // Calcium Hydroxide

  // Tuzlar va oksidlar
  784: "Vodorod peroksid", // Hydrogen Peroxide
  962: "Suv", // Water
  1176: "Karbamid", // Urea
  5234: "Natriy xlorid", // Sodium Chloride
  10112: "Kalsiy karbonat", // Calcium Carbonate
  10340: "Natriy karbonat", // Sodium Carbonate
  24261: "Kremniy dioksidi", // Silica
  24682: "Oltingugurt trioksidi", // Sulfur trioxide
  516875: "Kaliy permanganat", // Potassium Permanganate

  // Alkanlar va siklik uglevodorodlar
  356: "Oktan", // Octane
  6324: "Etan", // Ethane
  6334: "Propan", // Propane
  6351: "Siklopropan", // Cyclopropane
  6360: "Izobutan", // Isobutane
  7843: "Butan", // Butane
  7962: "Metilsiklogeksan", // Methylcyclohexane
  8003: "Pentan", // Pentane
  8058: "Geksan", // Hexane
  8078: "Siklogeksan", // Cyclohexane
  8900: "Geptan", // Heptane
  9253: "Siklopentan", // Cyclopentane
  10041: "Neopentan", // Neopentane
  10907: "2,2,4-Trimetilpentan", // 2,2,4-Trimethylpentane

  // Aromatik va to'yinmagan uglevodorodlar
  241: "Benzol", // Benzene
  931: "Naftalin", // Naphthalene
  995: "Fenantren", // Phenanthrene
  1140: "Toluol", // Toluene
  6326: "Atsetilen", // Acetylene
  6335: "Propin", // Propyne
  6557: "Izopren", // Isoprene
  7237: "orto-Ksilol", // O-Xylene
  7500: "Etilbenzol", // Ethylbenzene
  7501: "Stirol", // Styrene
  7844: "1-Buten", // 1-Butene
  7845: "1,3-Butadien", // 1,3-Butadiene
  8079: "Siklogeksen", // Cyclohexene
  8252: "Propilen", // Propylene
  8418: "Antratsen", // Anthracene
  10419: "Dimetilatsetilen", // Dimethylacetylene

  // Spirtlar, efirlar va fenollar
  174: "Etilenglikol", // Ethylene Glycol
  244: "Benzil spirti", // Benzyl Alcohol
  263: "1-Butanol", // 1-Butanol
  289: "Pirokatexin", // Catechol
  702: "Etanol", // Ethanol
  753: "Glitserin", // Glycerol
  785: "Gidroxinon", // Hydroquinone
  887: "Metanol", // Methanol
  996: "Fenol", // Phenol
  1030: "Propilenglikol", // Propylene Glycol
  1031: "1-Propanol", // 1-Propanol
  3283: "Dietil efir", // Diethyl Ether
  3776: "Izopropanol", // Isopropanol
  5054: "Rezorsin", // Resorcinol
  6386: "tert-Butanol", // tert-Butanol
  7519: "Anizol", // Anisole
  8028: "Tetragidrofuran", // Tetrahydrofuran
  31275: "1,4-Dioksan", // 1,4-Dioxane

  // Aldegidlar va ketonlar
  177: "Atsetaldegid", // Acetaldehyde
  180: "Atseton", // Acetone
  240: "Benzaldegid", // Benzaldehyde
  261: "Butanal", // Butanal
  527: "Propanal", // Propanal
  650: "Butandion", // Butanedione
  712: "Formaldegid", // Formaldehyde
  751: "Gliseraldegid", // Glyceraldehyde
  1183: "Vanilin", // Vanillin
  2537: "Kamfora", // Camphor
  3102: "Benzofenon", // Benzophenone
  3485: "Glutaraldegid", // Glutaraldehyde
  6569: "Metiletilketon", // Methyl Ethyl Ketone
  7410: "Atsetofenon", // Acetophenone
  7847: "Akrolein", // Acrolein
  7967: "Siklogeksanon", // Cyclohexanone
  637511: "Sinnamaldegid", // Cinnamaldehyde
  638011: "Sitral", // Citral

  // Karbon kislotalar va murakkab efirlar
  243: "Benzoy kislota", // Benzoic Acid
  264: "Moy kislota", // Butyric Acid
  284: "Chumoli kislota", // Formic Acid
  311: "Limon kislota", // Citric Acid
  338: "Salitsil kislota", // Salicylic Acid
  612: "Sut kislota", // Lactic Acid
  867: "Malon kislota", // Malonic Acid
  971: "Oksalat kislota", // Oxalic Acid
  1032: "Propion kislota", // Propionic Acid
  1110: "Suksinat kislota", // Succinic Acid
  2244: "Aspirin", // Aspirin
  4133: "Metilsalitsilat", // Methyl Salicylate
  5281: "Stearin kislota", // Stearic Acid
  6581: "Akril kislota", // Acrylic Acid
  6584: "Metilatsetat", // Methyl Acetate
  7762: "Etilbutirat", // Ethyl butyrate
  8857: "Etilatsetat", // Ethyl Acetate
  31276: "Izoamilatsetat", // Isoamyl Acetate

  // Aminlar va azotli halqalar
  178: "Atsetamid", // Acetamide
  674: "Dimetilamin", // Dimethylamine
  795: "Imidazol", // Imidazole
  798: "Indol", // Indole
  1044: "Purin", // Purine
  1049: "Piridin", // Pyridine
  1146: "Trimetilamin", // Trimethylamine
  3301: "Etilendiamin", // Ethylenediamine
  3520: "Guanidin", // Guanidine
  4837: "Piperazin", // Piperazine
  6115: "Anilin", // Aniline
  6329: "Metilamin", // Methylamine
  6341: "Etilamin", // Ethylamine
  8027: "Pirrol", // Pyrrole
  8082: "Piperidin", // Piperidine
  9260: "Pirimidin", // Pyrimidine

  // Aminokislotalar
  750: "Glitsin", // Glycine
  5862: "L-Sistein", // L-(+)-Cysteine
  5950: "L-Alanin", // L-Alanine
  5951: "L-Serin", // L-Serine
  5960: "L-Asparagin kislota", // L-Aspartic Acid
  5961: "L-Glutamin", // L-Glutamine
  5962: "L-Lizin", // L-Lysine
  6057: "L-Tirozin", // L-Tyrosine
  6106: "L-Leysin", // L-Leucine
  6137: "L-Metionin", // L-Methionine
  6140: "L-Fenilalanin", // L-Phenylalanine
  6267: "L-Asparagin", // (-)-Asparagine
  6274: "L-Gistidin", // L-Histidine
  6287: "L-Valin", // L-Valine
  6288: "L-Treonin", // L-Threonine
  6305: "L-Triptofan", // L-Tryptophan
  6306: "L-Izoleysin", // L-Isoleucine
  6322: "L-Arginin", // L-Arginine
  33032: "L-Glutamin kislota", // L-Glutamic Acid
  145742: "L-Prolin", // L-Proline

  // Uglevodlar (qandlar)
  670: "Digidroksiatseton", // Dihydroxyacetone
  5780: "Sorbitol", // Sorbitol
  5793: "D-Glyukoza", // D-Glucose
  5988: "Saxaroza", // Sucrose
  6036: "D-Galaktoza", // D-Galactose
  6134: "beta-Laktoza", // beta-Lactose
  7427: "Tregaloza", // Trehalose
  17106: "L-Fukoza", // L-Fucose
  18950: "D-Mannoza", // D-Mannose
  135191: "D-Ksiloza", // D-Xylose
  439174: "N-Atsetil-D-glyukozamin", // N-Acetyl-D-Glucosamine
  439178: "Sellobioza", // Cellobiose
  439186: "Maltoza", // Maltose
  439213: "D-Glyukozamin", // D-Glucosamine
  2723872: "D-Fruktoza", // D-Fructose
  5460005: "D-2-Dezoksiriboza", // 2-Deoxyribose, D-
  10975657: "D-Riboza", // D-Ribose

  // Vitaminlar
  936: "Nikotinamid", // Nicotinamide
  938: "Nikotin kislota", // Nicotinic Acid
  1054: "Piridoksin (B6)", // Pyridoxine
  1130: "Tiamin (B1)", // Thiamine
  4055: "Menadion (K3)", // Menadione
  6613: "Pantotenat kislota (B5)", // Pantothenic Acid
  14985: "E vitamini", // Vitamin E
  171548: "Biotin (B7)", // Biotin
  445354: "Retinol (A)", // Retinol
  493570: "Riboflavin (B2)", // Riboflavin
  5280793: "Ergokalsiferol (D2)", // Ergocalciferol
  5280795: "D3 vitamini", // Vitamin D3
  5284607: "Filloxinon (K1)", // Phylloquinone
  54670067: "Askorbin kislota (C)", // L-Ascorbic Acid
  135398658: "Foliy kislota (B9)", // Folic Acid
  166596686: "Siankobalamin (B12)", // Cyanocobalamin

  // Dori vositalari
  1983: "Paratsetamol", // Acetaminophen
  2153: "Teofillin", // Theophylline
  2519: "Kofein", // Caffeine
  3016: "Diazepam", // Diazepam
  3100: "Difengidramin", // Diphenhydramine
  3672: "Ibuprofen", // Ibuprofen, (+-)-
  3676: "Lidokain", // Lidocaine
  4091: "Metformin", // Metformin
  4594: "Omeprazol", // Prilosec
  5904: "Penitsillin G", // Penicillin G
  9294: "Efedrin", // Ephedrine
  89594: "Nikotin", // Nicotine
  156391: "Naproksen", // Naproxen
  5288826: "Morfin", // Morphine

  // Biomolekulalar va gormonlar
  119: "Gamma-aminomoy kislota", // Gamma-Aminobutyric Acid
  187: "Atsetilxolin", // Acetylcholine
  190: "Adenin", // Adenine
  597: "Sitozin", // Cytosine
  681: "Dofamin", // Dopamine
  774: "Gistamin", // Histamine
  896: "Melatonin", // Melatonin
  5202: "Serotonin", // Serotonin
  5754: "Kortizol", // Cortisol
  5757: "Estradiol", // Estradiol
  5816: "Adrenalin", // Epinephrine
  5994: "Progesteron", // Progesterone
  5997: "Xolesterin", // Cholesterol
  6013: "Testosteron", // Testosterone
  439260: "Noradrenalin", // Norepinephrine
  135398634: "Guanin", // Guanine

  // Galogenli va boshqa organik birikmalar
  11: "1,2-Dixloretan", // 1,2-Dichloroethane
  679: "Dimetilsulfoksid", // Dimethyl Sulfoxide
  713: "Formamid", // Formamide
  768: "Vodorod sianid", // Hydrogen Cyanide
  5943: "Karbon tetraxlorid", // Carbon Tetrachloride
  6212: "Xloroform", // Chloroform
  6228: "Dimetilformamid", // Dimethylformamide
  6338: "Vinilxlorid", // Vinyl Chloride
  6342: "Atsetonitril", // Acetonitrile
  6344: "Dixlormetan", // Dichloromethane
  6354: "Etilen oksidi", // Ethylene Oxide
  6375: "Nitrometan", // Nitromethane
  6391: "Dixlordiftormetan", // Dichlorodifluoromethane
  6575: "Trixloretilen", // Trichloroethylene
  7964: "Xlorbenzol", // Chlorobenzene
  31373: "Tetraxloretilen", // Tetrachloroethylene
};

/**
 * Molekulaning o'zbekcha nomini qaytaradi. Tarjima lug'atda topilmasa,
 * asl (inglizcha) nomga qaytadi — shunda yangi molekulalar ham ko'rinadi.
 */
export function moleculeNameUz(molecule: Molecule): string {
  return moleculeNamesUz[molecule.cid] ?? molecule.name;
}
