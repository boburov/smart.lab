import type { ArduinoProduct } from "./types";

/**
 * A small Arduino catalog for the electronics section. This is static demo data
 * for the prototype — just enough for the products to be visible in a gallery.
 */
export const arduinoProducts: ArduinoProduct[] = [
  // Platalar (boards)
  {
    id: "uno-r3",
    name: "Arduino Uno R3",
    spec: "ATmega328P · 5V",
    category: "Platalar",
    description: "ATmega328P asosidagi eng mashhur boshlang'ich plata.",
  },
  {
    id: "nano",
    name: "Arduino Nano",
    spec: "ATmega328P · ixcham",
    category: "Platalar",
    description: "Breadboard uchun ixcham, USB ulanishli plata.",
  },
  {
    id: "mega-2560",
    name: "Arduino Mega 2560",
    spec: "54 raqamli pin",
    category: "Platalar",
    description: "Ko'p pinli — yirik va murakkab loyihalar uchun.",
  },
  {
    id: "esp32",
    name: "ESP32 DevKit",
    spec: "Wi-Fi · Bluetooth",
    category: "Platalar",
    description: "Simsiz aloqali kuchli mikrokontroller platasi.",
  },

  // Sensorlar (sensors)
  {
    id: "dht11",
    name: "DHT11",
    spec: "Harorat · Namlik",
    category: "Sensorlar",
    description: "Harorat va namlikni o'lchaydigan raqamli sensor.",
  },
  {
    id: "hc-sr04",
    name: "HC-SR04",
    spec: "Ultratovush",
    category: "Sensorlar",
    description: "Ovoz to'lqini bilan masofani o'lchaydi.",
  },
  {
    id: "pir",
    name: "PIR HC-SR501",
    spec: "Harakat sensori",
    category: "Sensorlar",
    description: "Infraqizil orqali harakatni aniqlaydi.",
  },
  {
    id: "mq2",
    name: "MQ-2",
    spec: "Gaz · Tutun",
    category: "Sensorlar",
    description: "Tutun va yonuvchi gazlarni sezadi.",
  },

  // Modullar (modules)
  {
    id: "sg90",
    name: "SG90 Servo",
    spec: "0–180°",
    category: "Modullar",
    description: "Burchakka aniq buriladigan kichik servomotor.",
  },
  {
    id: "relay",
    name: "Relay moduli",
    spec: "1 kanal · 5V",
    category: "Modullar",
    description: "Yuqori kuchlanishli qurilmalarni boshqaradi.",
  },
  {
    id: "oled-096",
    name: "OLED 0.96\"",
    spec: "I2C · 128×64",
    category: "Modullar",
    description: "I2C orqali ulanadigan kichik displey.",
  },
  {
    id: "hc-05",
    name: "HC-05 Bluetooth",
    spec: "Simsiz UART",
    category: "Modullar",
    description: "Simsiz ketma-ket aloqa uchun modul.",
  },

  // Komponentlar (components)
  {
    id: "breadboard",
    name: "Breadboard",
    spec: "830 nuqta",
    category: "Komponentlar",
    description: "Lehimsiz ulanish uchun montaj platasi.",
  },
  {
    id: "led-set",
    name: "LED to'plami",
    spec: "5mm · rangli",
    category: "Komponentlar",
    description: "Turli rangdagi yorug'lik diodlari.",
  },
  {
    id: "resistor-kit",
    name: "Rezistor to'plami",
    spec: "1/4W · turli",
    category: "Komponentlar",
    description: "Tok va kuchlanishni cheklovchi qarshiliklar.",
  },
  {
    id: "buzzer",
    name: "Zummer",
    spec: "Passiv · 5V",
    category: "Komponentlar",
    description: "Ovoz signali beruvchi piezo element.",
  },
];
