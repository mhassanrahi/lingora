import { useLanguageStore } from "@/store/languageStore";
import { useClerk } from "@clerk/expo";
import { Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const { signOut } = useClerk();
    const { clearLanguage } = useLanguageStore();

  return (
    <View className="flex-1 items-center justify-center bg-surface gap-4">
      <Text className="typo-h3 color-ink">Home</Text>
      <Text className="typo-body-md color-muted">Coming soon</Text>
      <TouchableOpacity onPress={() => signOut()}>
        <Text className="typo-body-sm color-muted underline">Sign out</Text>
      </TouchableOpacity>

            <TouchableOpacity onPress={clearLanguage}>
        <Text className="typo-body-sm color-muted underline">
          [Dev] Clear language selection
        </Text>
      </TouchableOpacity>
    </View>
  );
}
