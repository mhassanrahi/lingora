import LessonCard from "@/components/LessonCard";
import { images } from "@/constants/images";
import { getLessonsByUnit } from "@/data/lessons";
import { getUnitsByLanguage } from "@/data/units";
import { useLanguageStore } from "@/store/languageStore";
import { useLessonProgressStore } from "@/store/lessonProgressStore";
import type { LanguageCode } from "@/types/learning";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Tab = "lessons" | "practice";

export default function LearnScreen() {
  const { selectedLanguage } = useLanguageStore();
  const { completedLessons, inProgressLesson } = useLessonProgressStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("lessons");

  const langCode = (selectedLanguage ?? "es") as LanguageCode;
  const units = getUnitsByLanguage(langCode);
  const currentUnit = units[0];
  const lessons = currentUnit ? getLessonsByUnit(currentUnit.id) : [];
  const completedCount = lessons.filter((l) => completedLessons.includes(l.id)).length;

  const getLessonStatus = (lessonId: string) => {
    if (completedLessons.includes(lessonId)) return "completed" as const;
    if (inProgressLesson === lessonId) return "in-progress" as const;
    return "not-started" as const;
  };

  const handleLessonPress = (lessonId: string) => {
    router.push(`/lesson/${lessonId}` as any);
  };

  if (!currentUnit) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ── Unit Header ──────────────────────────────────────── */}
      <View className="h-[210px] overflow-hidden relative">
        {currentUnit.image ? (
          <Image
            source={{ uri: currentUnit.image }}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
          />
        ) : null}
        <View
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: currentUnit.color + "D0" },
          ]}
        />

        {/* Bookmark row */}
        <View className="flex-row justify-end items-center px-5 pt-[10px]">
          <View />
          <TouchableOpacity hitSlop={8}>
            <Ionicons name="bookmark-outline" size={22} color="white" />
          </TouchableOpacity>
        </View>

        {/* Mascot */}
        <Image
          source={images.mascotWelcome}
          className="w-[100px] h-[100px] self-center mt-2"
          resizeMode="contain"
        />

        {/* Unit info */}
        <View className="items-center mt-[6px] pb-4">
          <Text className="font-poppins-bold text-[22px] leading-[30px] text-white text-center">{currentUnit.title}</Text>
          <Text className="font-poppins text-[13px] leading-5 text-white/85 text-center mt-0.5">
            Unit {currentUnit.order} · {completedCount} / {lessons.length} lessons
          </Text>
        </View>
      </View>

      {/* ── Tab Row ──────────────────────────────────────────── */}
      <View className="flex-row bg-white border-b border-border">
        {(["lessons", "practice"] as Tab[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`flex-1 items-center py-[14px] border-b-2 ${activeTab === tab ? "border-b-brand-purple" : "border-b-transparent"}`}
            activeOpacity={0.7}
          >
            <Text
              className={`text-[14px] leading-[22px] ${activeTab === tab ? "font-poppins-semibold color-brand-purple" : "font-poppins color-muted"}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── Content ──────────────────────────────────────────── */}
      {activeTab === "lessons" ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        >
          {lessons.map((lesson, index) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              lessonNumber={index + 1}
              status={getLessonStatus(lesson.id)}
              onPress={() => handleLessonPress(lesson.id)}
            />
          ))}
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center gap-3">
          <Ionicons name="barbell-outline" size={48} color="#6B7280" />
          <Text className="typo-body-lg color-muted">Practice coming soon</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  listContent: {
    paddingBottom: 32,
  },
});
