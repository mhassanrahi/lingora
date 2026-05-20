import { posthog } from "@/config/posthog";
import { images } from "@/constants/images";
import { LANGUAGES } from "@/data/languages";
import { getLessonsByUnit } from "@/data/lessons";
import { getUnitsByLanguage } from "@/data/units";
import { useLanguageStore } from "@/store/languageStore";
import type { LanguageCode } from "@/types/learning";
import { useUser } from "@clerk/expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type IoniconsName = ComponentProps<typeof Ionicons>["name"];

const GREETINGS: Record<LanguageCode, string> = {
  es: "Hola",
  fr: "Bonjour",
  de: "Hallo",
  jp: "こんにちは",
};

interface PlanItem {
  id: string;
  iconName: IoniconsName;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  completed: boolean;
}

const TODAY_PLAN: PlanItem[] = [
  {
    id: "lesson",
    iconName: "book-outline",
    iconBg: "#EDE9FE",
    iconColor: "#6C4EF5",
    title: "Lesson",
    subtitle: "At the café",
    completed: true,
  },
  {
    id: "ai-conversation",
    iconName: "headset-outline",
    iconBg: "#DBEAFE",
    iconColor: "#4D88FF",
    title: "AI Conversation",
    subtitle: "Talk about your day",
    completed: false,
  },
  {
    id: "new-words",
    iconName: "chatbubble-outline",
    iconBg: "#FFE4E4",
    iconColor: "#FF4B4B",
    title: "New words",
    subtitle: "10 words",
    completed: false,
  },
];

const DAILY_XP = 15;
const DAILY_GOAL = 20;
const STREAK = 12;

export default function HomeScreen() {
  const { user } = useUser();
  const { selectedLanguage } = useLanguageStore();

  const langCode = (selectedLanguage ?? "es") as LanguageCode;
  const language = LANGUAGES.find((l) => l.code === langCode);
  const greeting = GREETINGS[langCode] ?? "Hello";
  const flagImage = images.flags[langCode];
  const firstName = user?.firstName ?? "there";

  const units = getUnitsByLanguage(langCode);
  const currentUnit = units[0];
  const currentLesson = currentUnit ? getLessonsByUnit(currentUnit.id)[0] : null;

  const progressPercent =
    DAILY_GOAL > 0 ? Math.min(100, Math.max(0, (DAILY_XP / DAILY_GOAL) * 100)) : 0;

  const handleContinueLearning = () => {
    posthog.capture("lesson_continue_tapped", {
      language_code: langCode,
      unit_order: currentUnit?.order ?? 1,
      lesson_title: currentLesson?.title ?? null,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Header ─────────────────────────────────────────── */}
        <View className="flex-row items-center justify-between px-5 pt-2 pb-1">
          <View className="flex-row items-center gap-2">
            <Image source={flagImage} className="w-[34px] h-[34px] rounded-full" />
            <Text className="typo-h4 color-ink">
              {greeting}, {firstName}! 👋
            </Text>
          </View>
          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center gap-1">
              <Image source={images.streakFire} className="w-[22px] h-[22px]" />
              <Text className="typo-h4 color-streak">{STREAK}</Text>
            </View>
            <TouchableOpacity hitSlop={8}>
              <Ionicons name="notifications-outline" size={24} color="#001328" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Daily Goal Card ─────────────────────────────────── */}
        <View
          className="mx-4 mt-4 mb-4 rounded-2xl overflow-hidden bg-[#FFF8EE]"
          style={styles.goalCardShadow}
        >
          <View className="flex-row items-center p-4">
            <View className="flex-1 mr-3">
              <Text className="typo-caption color-muted">Daily goal</Text>
              <View className="flex-row items-end mt-1 gap-1">
                <Text className="typo-xp color-ink">{DAILY_XP}</Text>
                <Text className="typo-body-md color-muted mb-1">
                  / {DAILY_GOAL} XP
                </Text>
              </View>
              <View className="h-2 bg-border rounded-full mt-3 overflow-hidden">
                <View
                  className="h-full rounded-full bg-streak"
                  style={{ width: `${progressPercent}%` }}
                />
              </View>
            </View>
            <Image
              source={images.treasure}
              className="w-[84px] h-[84px]"
              resizeMode="contain"
            />
          </View>
        </View>

        {/* ── Continue Learning Card ──────────────────────────── */}
        <View
          className="mx-4 mb-6 rounded-2xl overflow-hidden bg-brand-purple min-h-[170px]"
          style={styles.continueCardShadow}
        >
          <View className="p-5 min-h-[170px]">
            <View className="pr-[145px]">
              <Text className="font-poppins text-[12px] leading-[18px] text-white/75">
                Continue learning
              </Text>
              <Text className="font-poppins-bold text-[26px] leading-[32px] text-white mt-1">
                {language?.name ?? "Spanish"}
              </Text>
              <Text className="typo-body-sm text-white/70 mt-0.5">
                A1 · Unit {currentUnit?.order ?? 1}
                {currentLesson ? ` · ${currentLesson.title}` : ""}
              </Text>
              <TouchableOpacity
                className="bg-white rounded-full px-[22px] py-2 self-start mt-[18px]"
                activeOpacity={0.85}
                onPress={handleContinueLearning}
                testID="continue-learning-button"
              >
                <Text className="typo-h4 color-brand-purple">Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Image
            source={images.palace}
            className="absolute right-0 bottom-[-30px] w-[165px] h-[185px]"
            resizeMode="cover"
          />
        </View>

        {/* ── Today's Plan ────────────────────────────────────── */}
        <View className="flex-row items-center justify-between px-5 mb-3">
          <Text className="typo-h3 color-ink">{"Today's plan"}</Text>
          <TouchableOpacity hitSlop={8}>
            <Text className="typo-body-md color-brand-purple">View all</Text>
          </TouchableOpacity>
        </View>

        <View className="mx-4 mb-5 rounded-2xl bg-white" style={styles.cardShadowSm}>
          {TODAY_PLAN.map((item, index) => (
            <View
              key={item.id}
              className={`flex-row items-center px-4 py-3 ${index < TODAY_PLAN.length - 1 ? "border-b border-border" : ""
                }`}
            >
              <View
                className="w-11 h-11 rounded-xl items-center justify-center mr-3"
                style={{ backgroundColor: item.iconBg }}
              >
                <Ionicons name={item.iconName} size={20} color={item.iconColor} />
              </View>
              <View className="flex-1">
                <Text className="typo-h4 color-ink">{item.title}</Text>
                <Text className="typo-body-sm color-muted">{item.subtitle}</Text>
              </View>
              {item.completed ? (
                <View className="w-7 h-7 rounded-full bg-brand-purple items-center justify-center">
                  <Ionicons name="checkmark" size={15} color="#fff" />
                </View>
              ) : (
                <View className="w-7 h-7 rounded-full border-2 border-border" />
              )}
            </View>
          ))}
        </View>

        {/* ── Next Up Card ─────────────────────────────────────── */}
        <View
          className="mx-4 rounded-2xl bg-white p-4 flex-row items-center"
          style={styles.cardShadowSm}
        >
          <View className="flex-1">
            <Text className="typo-caption color-muted">Next up</Text>
            <Text className="typo-h4 color-ink mt-1">AI Video Call</Text>
            <Text className="typo-body-sm color-muted">Practice speaking</Text>
          </View>
          <View>
            <Image
              source={{ uri: "https://picsum.photos/seed/lingora-teacher/80/80" }}
              className="w-16 h-16 rounded-full"
            />
            <View className="absolute bottom-[-2px] right-[-2px] w-[26px] h-[26px] rounded-full bg-brand-green items-center justify-center border-2 border-white">
              <Ionicons name="videocam" size={14} color="#fff" />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// StyleSheet is limited to SafeAreaView, ScrollView contentContainerStyle, and shadow/elevation
// — all of which cannot be expressed via NativeWind per AGENTS.md exception rules.
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F7FB",
  },
  scrollContent: {
    paddingBottom: 32,
  },
  goalCardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  continueCardShadow: {
    shadowColor: "#6C4EF5",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 8,
  },
  cardShadowSm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
});
