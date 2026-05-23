import { posthog } from "@/config/posthog";
import { images } from "@/constants/images";
import { LANGUAGES } from "@/data/languages";
import { useLanguageStore } from "@/store/languageStore";
import type { Language } from "@/types/learning";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LanguageSelectionScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const { setLanguage } = useLanguageStore();
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filtered = LANGUAGES.filter(
    (lang) =>
      lang.name.toLowerCase().includes(query.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (!query.trim()) return;
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      posthog.capture("language_searched", { query: query.trim(), results_count: filtered.length });
    }, 600);
    return () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="flex-row items-center px-4 pt-3 pb-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center"
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color="#001328" />
        </TouchableOpacity>
        <Text className="flex-1 text-center typo-h4 color-ink">
          Choose a language
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Search */}
      <View className="mx-4 mb-5">
        <View className="flex-row items-center bg-surface rounded-2xl px-4 py-3 border border-border">
          <Ionicons name="search" size={18} color="#6B7280" />
          <TextInput
            className="flex-1 ml-3 typo-body-md color-ink"
            placeholder="Search languages"
            placeholderTextColor="#6B7280"
            value={query}
            onChangeText={setQuery}
          />
        </View>
      </View>

      {/* Popular label */}
      <Text className="px-4 mb-3 font-poppins-semibold text-[13px] color-ink">
        Popular
      </Text>

      {/* Language list */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 8 }}
      >
        {filtered.map((lang: Language) => {
          const isSelected = selected === lang.code;
          return (
            <TouchableOpacity
              key={lang.code}
              onPress={() => setSelected(lang.code)}
              activeOpacity={0.75}
              className="mx-4 mb-3 flex-row items-center p-4 rounded-2xl"
              style={
                isSelected
                  ? styles.selectedItem
                  : styles.unselectedItem
              }
            >
              {/* Flag circle */}
              <View style={styles.flagContainer}>
                <Image
                  source={lang.flag}
                  style={styles.flagImage}
                  resizeMode="cover"
                />
              </View>

              {/* Name + count */}
              <View className="flex-1 ml-3">
                <Text className="typo-h4 color-ink">{lang.name}</Text>
                <Text className="typo-body-sm color-muted">
                  {lang.learnerCount} learners
                </Text>
              </View>

              {/* Checkmark or chevron */}
              {isSelected ? (
                <Ionicons name="checkmark-circle" size={26} color="#6C4EF5" />
              ) : (
                <Ionicons name="chevron-forward" size={20} color="#6B7280" />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Bottom: confirm button + earth illustration */}
      <View>
        <View className="px-6 pt-2 pb-4">
          <TouchableOpacity
            activeOpacity={selected ? 0.85 : 1}
            disabled={!selected}
            onPress={() => {
              if (selected) {
                const lang = LANGUAGES.find((l) => l.code === selected);
                posthog.capture("language_selected", {
                  language_code: selected,
                  language_name: lang?.name ?? null,
                });
                setLanguage(selected);
                router.replace("/");
              }
            }}
            style={selected ? styles.confirmBtn : styles.confirmBtnDisabled}
            className="rounded-2xl py-5 items-center justify-center"
          >
            <Text className="font-poppins-semibold text-[17px] color-white">
              Continue
            </Text>
          </TouchableOpacity>
        </View>

        <Image
          source={images.earth}
          style={styles.earthImage}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  selectedItem: {
    borderWidth: 2,
    borderColor: "#6C4EF5",
    backgroundColor: "rgba(108, 78, 245, 0.05)",
  },
  unselectedItem: {
    borderWidth: 2,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  flagContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#F6F7FB",
  },
  flagImage: {
    width: 48,
    height: 48,
  },
  confirmBtn: {
    backgroundColor: "#6C4EF5",
  },
  confirmBtnDisabled: {
    backgroundColor: "#C4B5FD",
  },
  earthImage: {
    width: "100%",
    height: 130,
  },
});
