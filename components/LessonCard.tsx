import type { Lesson } from "@/types/learning";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type LessonStatus = "completed" | "in-progress" | "not-started";

interface LessonCardProps {
  lesson: Lesson;
  lessonNumber: number;
  status: LessonStatus;
  onPress: () => void;
}

export default function LessonCard({ lesson, lessonNumber, status, onPress }: LessonCardProps) {
  const isCompleted = status === "completed";
  const isInProgress = status === "in-progress";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.card, isInProgress && styles.inProgressCard]}
    >
      <View style={styles.content}>
        <Text style={styles.lessonLabel}>Lesson {lessonNumber}</Text>
        <Text
          style={[styles.title, !isCompleted && !isInProgress && styles.titleMuted]}
          numberOfLines={1}
        >
          {lesson.title}
        </Text>
        <Text style={styles.meta}>
          {lesson.xpReward} XP · {lesson.activities.length} activities
        </Text>
        {isInProgress && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>In progress</Text>
          </View>
        )}
      </View>

      {isCompleted && (
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={16} color="white" />
        </View>
      )}

      {isInProgress && lesson.image && (
        <Image
          source={{ uri: lesson.image }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
      )}

      {!isCompleted && !isInProgress && (
        <View style={styles.lockWrap}>
          <Ionicons name="lock-closed-outline" size={18} color="#9CA3AF" />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    gap: 12,
  },
  inProgressCard: {
    backgroundColor: "#FFF8EE",
  },
  content: {
    flex: 1,
  },
  lessonLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 11,
    lineHeight: 16,
    color: "#6B7280",
    marginBottom: 2,
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    lineHeight: 22,
    color: "#001328",
  },
  titleMuted: {
    color: "#9CA3AF",
  },
  meta: {
    fontFamily: "Poppins-Regular",
    fontSize: 11,
    lineHeight: 16,
    color: "#6B7280",
    marginTop: 2,
  },
  badge: {
    backgroundColor: "#FEF3C7",
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: "flex-start",
    marginTop: 6,
  },
  badgeText: {
    fontFamily: "Poppins-Medium",
    fontSize: 11,
    lineHeight: 15,
    color: "#FF8A00",
  },
  checkCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#21C168",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  thumbnail: {
    width: 68,
    height: 68,
    borderRadius: 12,
    flexShrink: 0,
  },
  lockWrap: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
});
