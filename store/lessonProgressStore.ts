import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface LessonProgressState {
  completedLessons: string[];
  inProgressLesson: string | null;
  markComplete: (id: string) => void;
  setInProgress: (id: string) => void;
}

export const useLessonProgressStore = create<LessonProgressState>()(
  persist(
    (set) => ({
      // Mock initial state: lessons 1-2 done for Spanish, lesson 3 in progress
      completedLessons: ["es-u1-l1", "es-u1-l2", "fr-u1-l1", "de-u1-l1", "jp-u1-l1"],
      inProgressLesson: "es-u1-l3",
      markComplete: (id) =>
        set((state) => ({
          completedLessons: state.completedLessons.includes(id)
            ? state.completedLessons
            : [...state.completedLessons, id],
        })),
      setInProgress: (id) => set({ inProgressLesson: id }),
    }),
    {
      name: "lesson-progress-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
