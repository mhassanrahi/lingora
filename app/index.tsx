import { Text, View, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center gap-6">
      <Text className="typo-h1 color-brand-deep-purple">Welcome to Lingora!</Text>
      <TouchableOpacity onPress={() => router.push("/onboarding")}>
        <Text className="typo-body-lg color-brand-purple">View Onboarding →</Text>
      </TouchableOpacity>
    </View>
  );
}
