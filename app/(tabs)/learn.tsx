import LessonCard from "@/components/LessonCard";
import { images } from "@/constants/images";
import { getLessonsByUnit } from "@/data/lessons";
import { getUnitsByLanguage } from "@/data/units";
import { useLessonProgressStore } from "@/store/lessonProgressStore";
import { useLanguageStore } from "@/store/languageStore";
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
      <View style={styles.header}>
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
        <View style={styles.headerTopRow}>
          <View />
          <TouchableOpacity hitSlop={8}>
            <Ionicons name="bookmark-outline" size={22} color="white" />
          </TouchableOpacity>
        </View>

        {/* Mascot */}
        <Image
          source={images.mascotWelcome}
          style={styles.mascot}
          resizeMode="contain"
        />

        {/* Unit info */}
        <View style={styles.headerTextContainer}>
          <Text style={styles.unitTitle}>{currentUnit.title}</Text>
          <Text style={styles.unitSubtitle}>
            Unit {currentUnit.order} · {completedCount} / {lessons.length} lessons
          </Text>
        </View>
      </View>

      {/* ── Tab Row ──────────────────────────────────────────── */}
      <View style={styles.tabRow}>
        {(["lessons", "practice"] as Tab[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
            activeOpacity={0.7}
          >
            <Text
              style={[styles.tabText, activeTab === tab && styles.activeTabText]}
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
  header: {
    height: 210,
    overflow: "hidden",
    position: "relative",
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  mascot: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 8,
  },
  headerTextContainer: {
    alignItems: "center",
    marginTop: 6,
    paddingBottom: 16,
  },
  unitTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 22,
    lineHeight: 30,
    color: "white",
    textAlign: "center",
  },
  unitSubtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    lineHeight: 20,
    color: "rgba(255,255,255,0.85)",
    textAlign: "center",
    marginTop: 2,
  },
  tabRow: {
    flexDirection: "row",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTabItem: {
    borderBottomColor: "#6C4EF5",
  },
  tabText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    lineHeight: 22,
    color: "#6B7280",
  },
  activeTabText: {
    fontFamily: "Poppins-SemiBold",
    color: "#6C4EF5",
  },
  listContent: {
    paddingBottom: 32,
  },
});
