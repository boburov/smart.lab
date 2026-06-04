/** Arduino product groups shown in the electronics section. */
export type ArduinoCategory = "Platalar" | "Sensorlar" | "Modullar" | "Komponentlar";

/** A single Arduino catalog item for the prototype gallery. */
export interface ArduinoProduct {
  /** Stable unique id, e.g. "uno-r3". */
  id: string;
  /** Display name, e.g. "Arduino Uno R3". */
  name: string;
  /** Short spec/part tag shown as a chip, e.g. "ATmega328P · 5V". */
  spec: string;
  category: ArduinoCategory;
  /** Short Uzbek description. */
  description: string;
}
