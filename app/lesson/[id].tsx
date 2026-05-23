import { getLessonById } from "@/data/lessons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LessonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const lesson = getLessonById(id ?? "");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F7FB" }}>
      <View className="flex-row items-center px-5 py-3 border-b border-border bg-white">
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color="#001328" />
        </TouchableOpacity>
        <Text className="typo-h4 color-ink ml-4 flex-1" numberOfLines={1}>
          {lesson?.title ?? "Lesson"}
        </Text>
      </View>

      <View className="flex-1 items-center justify-center gap-4 px-6">
        <View className="w-20 h-20 rounded-2xl bg-brand-purple/10 items-center justify-center">
          <Ionicons name="book-outline" size={40} color="#6C4EF5" />
        </View>
        <Text className="typo-h3 color-ink text-center">{lesson?.title}</Text>
        <Text className="typo-body-md color-muted text-center">{lesson?.description}</Text>
        <View className="bg-white rounded-2xl px-5 py-3 mt-2" style={{ alignSelf: "stretch" }}>
          <Text className="typo-caption color-muted text-center">
            {lesson?.xpReward} XP · {lesson?.activities.length} activities
          </Text>
        </View>
        <Text className="typo-body-sm color-muted text-center mt-2">
          Full lesson experience coming soon
        </Text>
      </View>
    </SafeAreaView>
  );
}
