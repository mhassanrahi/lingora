import type { LanguageCode, Unit } from "@/types/learning";

export const UNITS: Unit[] = [
  // Spanish
  {
    id: "es-unit-1",
    languageCode: "es",
    title: "Basics 1",
    description: "Master everyday Spanish from greetings to family.",
    order: 1,
    color: "#FF6B35",
    image: "https://picsum.photos/seed/spain-basics/800/400",
    lessonIds: ["es-u1-l1", "es-u1-l2", "es-u1-l3", "es-u1-l4", "es-u1-l5", "es-u1-l6"],
  },
  // French
  {
    id: "fr-unit-1",
    languageCode: "fr",
    title: "Basics 1",
    description: "Master everyday French from greetings to family.",
    order: 1,
    color: "#4D88FF",
    image: "https://picsum.photos/seed/france-basics/800/400",
    lessonIds: ["fr-u1-l1", "fr-u1-l2", "fr-u1-l3", "fr-u1-l4", "fr-u1-l5", "fr-u1-l6"],
  },
  // German
  {
    id: "de-unit-1",
    languageCode: "de",
    title: "Basics 1",
    description: "Master everyday German from greetings to family.",
    order: 1,
    color: "#CE82FF",
    image: "https://picsum.photos/seed/germany-basics/800/400",
    lessonIds: ["de-u1-l1", "de-u1-l2", "de-u1-l3", "de-u1-l4", "de-u1-l5", "de-u1-l6"],
  },
  // Japanese
  {
    id: "jp-unit-1",
    languageCode: "jp",
    title: "Basics 1",
    description: "Master everyday Japanese from greetings to family.",
    order: 1,
    color: "#FF4B4B",
    image: "https://picsum.photos/seed/japan-basics/800/400",
    lessonIds: ["jp-u1-l1", "jp-u1-l2", "jp-u1-l3", "jp-u1-l4", "jp-u1-l5", "jp-u1-l6"],
  },
];

export function getUnitsByLanguage(languageCode: LanguageCode): Unit[] {
  return UNITS.filter((u) => u.languageCode === languageCode).sort(
    (a, b) => a.order - b.order
  );
}
