import { LANGUAGES } from "@/data/languages";
import { useLanguageStore } from "@/store/languageStore";
import { useAuth, useClerk } from "@clerk/expo";
import { Redirect, router } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();
  const { signOut } = useClerk();
  const { selectedLanguage, _hasHydrated, clearLanguage } = useLanguageStore();

  if (!isLoaded || !_hasHydrated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6C4EF5" />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  if (!selectedLanguage) {
    return <Redirect href="/language-selection" />;
  }

  const selectedLanguageName = LANGUAGES.find((lang) => lang.code === selectedLanguage)?.name || selectedLanguage;

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="typo-h1 color-brand-deep-purple">Welcome to Lingora!</Text>


      <Text>{selectedLanguageName}</Text>
      <TouchableOpacity
        className="bg-brand-purple rounded-2xl py-4 px-8 items-center"
        activeOpacity={0.85}
        onPress={() => router.push("/language-selection")}
      >
        <Text className="font-poppins-semibold text-[16px] color-white">
          Choose a Language
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => signOut()}>
        <Text className="typo-body-md color-muted">Sign out</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={clearLanguage}>
        <Text className="typo-body-sm color-muted underline">
          [Dev] Clear language selection
        </Text>
      </TouchableOpacity>
    </View>
  );
}
