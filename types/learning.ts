export type LanguageCode = "es" | "fr" | "de" | "jp";

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: number;
  description: string;
  learnerCount: string;
}

export type ActivityType = "vocabulary" | "phrase" | "listen" | "speak" | "quiz";

export interface VocabularyItem {
  word: string;
  translation: string;
  pronunciation?: string;
  example?: string;
}

export interface PhraseItem {
  phrase: string;
  translation: string;
  pronunciation?: string;
  context?: string;
}

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  vocabulary?: VocabularyItem[];
  phrases?: PhraseItem[];
  question?: string;
  options?: string[];
  answer?: string;
}

export interface LessonGoal {
  description: string;
}

export interface AITeacherPrompt {
  intro: string;
  encouragement: string;
  lessonContext: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  description: string;
  order: number;
  xpReward: number;
  image?: string;
  goals: LessonGoal[];
  activities: Activity[];
  aiTeacherPrompt: AITeacherPrompt;
}

export interface Unit {
  id: string;
  languageCode: LanguageCode;
  title: string;
  description: string;
  order: number;
  color: string;
  image?: string;
  lessonIds: string[];
}
