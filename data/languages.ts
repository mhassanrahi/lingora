import { images } from "@/constants/images";
import type { Language, LanguageCode } from "@/types/learning";

export const LANGUAGES: Language[] = [
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: images.flags.es,
    description: "The world's second most spoken native language.",
    learnerCount: "28.4M",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: images.flags.fr,
    description: "The language of love, spoken across 5 continents.",
    learnerCount: "19.4M",
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: images.flags.de,
    description: "A precise language spoken by over 100 million people.",
    learnerCount: "8.1M",
  },
  {
    code: "jp",
    name: "Japanese",
    nativeName: "日本語",
    flag: images.flags.jp,
    description: "A fascinating language with three writing systems.",
    learnerCount: "12.7M",
  },
];


export const GREETINGS: Record<LanguageCode, string> = {
  es: "Hola",
  fr: "Bonjour",
  de: "Hallo",
  jp: "こんにちは",
};
