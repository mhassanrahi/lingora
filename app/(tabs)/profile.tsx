import { useAuth, useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();

  const name =
    (user?.fullName ??
      `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim()) ||
    "User";
  const email = user?.emailAddresses[0]?.emailAddress ?? "";
  const imageUrl = user?.imageUrl;

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-5 pt-4 pb-2">
          <Text className="typo-h2 color-ink">Profile</Text>
        </View>

        {/* Avatar + Name + Email */}
        <View className="items-center pt-10 pb-10">
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              className="w-24 h-24 rounded-full"
            />
          ) : (
            <View className="w-24 h-24 rounded-full bg-brand-purple items-center justify-center">
              <Text className="font-poppins-bold text-[36px] text-white">
                {initials}
              </Text>
            </View>
          )}
          <Text className="typo-h2 color-ink mt-4">{name}</Text>
          <Text className="typo-body-md color-muted mt-1">{email}</Text>
        </View>

        {/* Log Out */}
        <View className="px-5">
          <TouchableOpacity
            className="bg-[#FFF0F0] border border-[#FFCCCC] rounded-2xl py-4 flex-row items-center justify-center gap-2"
            onPress={async () => {
              await signOut();
              router.replace("/");
            }}
            activeOpacity={0.8}
          >
            <Ionicons name="log-out-outline" size={20} color="#FF4B4B" />
            <Text className="font-poppins-semibold text-[16px] text-[#FF4B4B]">
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F7FB",
  },
  scrollContent: {
    paddingBottom: 32,
  },
});
