import type { Lesson } from "@/types/learning";

export const LESSONS: Lesson[] = [
  // ── Spanish · Unit 1 · Lesson 1 ────────────────────────────────────────────
  {
    id: "es-u1-l1",
    unitId: "es-unit-1",
    title: "Greetings",
    description: "Say hello, goodbye, and introduce yourself.",
    order: 1,
    xpReward: 10,
    goals: [
      { description: "Learn 5 common greeting words." },
      { description: "Understand when to use formal vs informal greetings." },
    ],
    activities: [
      {
        id: "es-u1-l1-a1",
        type: "vocabulary",
        title: "Key Words",
        vocabulary: [
          { word: "Hola", translation: "Hello", pronunciation: "OH-lah" },
          { word: "Adiós", translation: "Goodbye", pronunciation: "ah-DYOS" },
          { word: "Buenos días", translation: "Good morning", pronunciation: "BWEH-nos DEE-as" },
          { word: "Gracias", translation: "Thank you", pronunciation: "GRAH-syahs" },
          { word: "Por favor", translation: "Please", pronunciation: "por fah-VOR" },
        ],
      },
      {
        id: "es-u1-l1-a2",
        type: "phrase",
        title: "Common Phrases",
        phrases: [
          {
            phrase: "¿Cómo te llamas?",
            translation: "What is your name?",
            pronunciation: "KOH-mo teh YAH-mas",
            context: "Informal — use with friends or children.",
          },
          {
            phrase: "Me llamo Ana.",
            translation: "My name is Ana.",
            pronunciation: "meh YAH-mo AH-nah",
          },
          {
            phrase: "Mucho gusto.",
            translation: "Nice to meet you.",
            pronunciation: "MOO-cho GOOS-toh",
          },
        ],
      },
      {
        id: "es-u1-l1-a3",
        type: "quiz",
        title: "Quick Check",
        question: "How do you say 'Thank you' in Spanish?",
        options: ["Hola", "Gracias", "Adiós", "Por favor"],
        answer: "Gracias",
      },
    ],
    aiTeacherPrompt: {
      intro: "¡Hola! I'm your Spanish teacher. Today we'll learn how to greet people in Spanish. Ready?",
      encouragement: "Great job! You're already sounding like a native speaker.",
      lessonContext:
        "This lesson covers everyday Spanish greetings. Focus on pronunciation and the informal/formal distinction.",
    },
  },

  // ── French · Unit 1 · Lesson 1 ─────────────────────────────────────────────
  {
    id: "fr-u1-l1",
    unitId: "fr-unit-1",
    title: "Greetings",
    description: "Say hello and introduce yourself in French.",
    order: 1,
    xpReward: 10,
    goals: [
      { description: "Learn 5 essential French greetings." },
      { description: "Introduce yourself with a simple sentence." },
    ],
    activities: [
      {
        id: "fr-u1-l1-a1",
        type: "vocabulary",
        title: "Key Words",
        vocabulary: [
          { word: "Bonjour", translation: "Hello / Good morning", pronunciation: "bohn-ZHOOR" },
          { word: "Bonsoir", translation: "Good evening", pronunciation: "bohn-SWAHR" },
          { word: "Au revoir", translation: "Goodbye", pronunciation: "oh ruh-VWAHR" },
          { word: "Merci", translation: "Thank you", pronunciation: "mehr-SEE" },
          { word: "S'il vous plaît", translation: "Please", pronunciation: "seel voo PLEH" },
        ],
      },
      {
        id: "fr-u1-l1-a2",
        type: "phrase",
        title: "Introduce Yourself",
        phrases: [
          {
            phrase: "Je m'appelle Marie.",
            translation: "My name is Marie.",
            pronunciation: "zhuh mah-PEL mah-REE",
          },
          {
            phrase: "Enchanté(e).",
            translation: "Nice to meet you.",
            pronunciation: "ahn-shahn-TAY",
            context: "Add -e at the end if you are a woman.",
          },
        ],
      },
    ],
    aiTeacherPrompt: {
      intro: "Bonjour! I'm your French teacher. Let's start with greetings — the first step to any conversation.",
      encouragement: "Très bien! You're speaking French already.",
      lessonContext: "Introductory French greetings and self-introduction phrases.",
    },
  },

  // ── German · Unit 1 · Lesson 1 ─────────────────────────────────────────────
  {
    id: "de-u1-l1",
    unitId: "de-unit-1",
    title: "Greetings",
    description: "Say hello and introduce yourself in German.",
    order: 1,
    xpReward: 10,
    goals: [
      { description: "Learn 5 essential German greetings." },
      { description: "Understand formal and informal greetings." },
    ],
    activities: [
      {
        id: "de-u1-l1-a1",
        type: "vocabulary",
        title: "Key Words",
        vocabulary: [
          { word: "Hallo", translation: "Hello", pronunciation: "HAH-loh" },
          { word: "Guten Morgen", translation: "Good morning", pronunciation: "GOO-ten MOR-gen" },
          { word: "Auf Wiedersehen", translation: "Goodbye", pronunciation: "owf VEE-der-zay-en" },
          { word: "Danke", translation: "Thank you", pronunciation: "DAHN-kuh" },
          { word: "Bitte", translation: "Please / You're welcome", pronunciation: "BIT-uh" },
        ],
      },
      {
        id: "de-u1-l1-a2",
        type: "quiz",
        title: "Quick Check",
        question: "How do you say 'Thank you' in German?",
        options: ["Bitte", "Hallo", "Danke", "Tschüss"],
        answer: "Danke",
      },
    ],
    aiTeacherPrompt: {
      intro: "Hallo! Welcome to your first German lesson. Let's learn how to greet people.",
      encouragement: "Sehr gut! You're getting the hang of it.",
      lessonContext: "Introductory German greetings. Note that German has formal (Sie) and informal (du) forms.",
    },
  },

  // ── Japanese · Unit 1 · Lesson 1 ───────────────────────────────────────────
  {
    id: "jp-u1-l1",
    unitId: "jp-unit-1",
    title: "Greetings",
    description: "Say hello and thank you in Japanese.",
    order: 1,
    xpReward: 10,
    goals: [
      { description: "Learn 5 essential Japanese greetings." },
      { description: "Understand bowing culture basics." },
    ],
    activities: [
      {
        id: "jp-u1-l1-a1",
        type: "vocabulary",
        title: "Key Words",
        vocabulary: [
          { word: "こんにちは", translation: "Hello", pronunciation: "Konnichiwa" },
          { word: "おはようございます", translation: "Good morning", pronunciation: "Ohayou gozaimasu" },
          { word: "さようなら", translation: "Goodbye", pronunciation: "Sayounara" },
          { word: "ありがとう", translation: "Thank you", pronunciation: "Arigatou" },
          { word: "すみません", translation: "Excuse me / Sorry", pronunciation: "Sumimasen" },
        ],
      },
      {
        id: "jp-u1-l1-a2",
        type: "phrase",
        title: "Introduce Yourself",
        phrases: [
          {
            phrase: "はじめまして。",
            translation: "Nice to meet you.",
            pronunciation: "Hajimemashite",
            context: "Used when meeting someone for the first time.",
          },
          {
            phrase: "わたしは田中です。",
            translation: "I am Tanaka.",
            pronunciation: "Watashi wa Tanaka desu",
          },
        ],
      },
    ],
    aiTeacherPrompt: {
      intro: "Konnichiwa! Welcome to Japanese. This is a beautiful language — let's start with greetings.",
      encouragement: "Yoku dekimashita! (Well done!) You're off to a great start.",
      lessonContext:
        "Basic Japanese greetings. Japanese uses different levels of politeness — we start with the polite form.",
    },
  },
];

export function getLessonsByUnit(unitId: string): Lesson[] {
  return LESSONS.filter((l) => l.unitId === unitId).sort((a, b) => a.order - b.order);
}

export function getLessonById(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}
