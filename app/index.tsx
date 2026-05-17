import { useAuth, useClerk } from "@clerk/expo";
import { Redirect } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();

  const { signOut } = useClerk()

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6C4EF5" />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <View className="flex-1 items-center justify-center gap-6">
      <Text className="typo-h1 color-brand-deep-purple">Welcome to Lingora!</Text>
      <TouchableOpacity onPress={() => signOut()}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}
