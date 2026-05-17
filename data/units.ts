import type { LanguageCode, Unit } from "@/types/learning";

export const UNITS: Unit[] = [
  // Spanish
  {
    id: "es-unit-1",
    languageCode: "es",
    title: "Basics 1",
    description: "Learn greetings and simple words.",
    order: 1,
    color: "#58CC02",
    lessonIds: ["es-u1-l1"],
  },
  // French
  {
    id: "fr-unit-1",
    languageCode: "fr",
    title: "Basics 1",
    description: "Learn greetings and simple words.",
    order: 1,
    color: "#FF4B4B",
    lessonIds: ["fr-u1-l1"],
  },
  // German
  {
    id: "de-unit-1",
    languageCode: "de",
    title: "Basics 1",
    description: "Learn greetings and simple words.",
    order: 1,
    color: "#CE82FF",
    lessonIds: ["de-u1-l1"],
  },
  // Japanese
  {
    id: "jp-unit-1",
    languageCode: "jp",
    title: "Basics 1",
    description: "Learn greetings and simple words.",
    order: 1,
    color: "#FF9600",
    lessonIds: ["jp-u1-l1"],
  },
];

export function getUnitsByLanguage(languageCode: LanguageCode): Unit[] {
  return UNITS.filter((u) => u.languageCode === languageCode).sort(
    (a, b) => a.order - b.order
  );
}
