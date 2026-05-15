import { images } from "@/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Logo + App Name */}
      <View className="flex-row items-center justify-center pt-4 gap-2">
        <Image source={images.mascotLogo} className="w-9 h-9" resizeMode="contain" />
        <Text className="typo-h3 color-ink">Lingora</Text>
      </View>

      {/* Heading */}
      <View className="px-7 pt-7">
        <Text className="typo-h1 color-ink">Your AI language</Text>
        <Text className="typo-h1 color-brand-purple">teacher.</Text>
        <Text className="typo-body-md color-muted mt-2">
          Real conversations, personalized{"\n"}lessons, anytime, anywhere.
        </Text>
      </View>

      {/* Mascot + Speech Bubbles */}
      <View className="flex-1 items-center justify-center">
        <View className="w-[340px] h-[320px] relative items-center justify-center">
          {/* Hello! bubble */}
          <View
            className="absolute bg-white rounded-3xl px-[18px] py-[10px] top-[50px] left-[8px]"
            style={styles.shadow}
          >
            <Text className="font-poppins-medium text-[14px] leading-[22px] color-ink">Hello!</Text>
          </View>

          {/* ¡Hola! bubble */}
          <View
            className="absolute bg-white rounded-3xl px-[18px] py-[10px] top-[10px] right-[8px]"
            style={styles.shadow}
          >
            <Text className="font-poppins-medium text-[14px] leading-[22px] color-brand-purple">¡Hola!</Text>
          </View>

          {/* Mascot image */}
          <Image source={images.mascotWelcome} className="w-[270px] h-[270px]" resizeMode="contain" />

          {/* 你好! bubble */}
          <View
            className="absolute bg-white rounded-3xl px-[18px] py-[10px] bottom-[40px] right-[8px]"
            style={styles.shadow}
          >
            <Text className="font-poppins-medium text-[14px] leading-[22px] color-error">你好!</Text>
          </View>
        </View>
      </View>

      {/* Get Started Button */}
      <View className="px-6 pb-8">
        <TouchableOpacity className="bg-brand-purple rounded-2xl py-5 flex-row items-center justify-center gap-2" activeOpacity={0.85}>
          <Text className="font-poppins-semibold text-[17px] color-white">Get Started</Text>
          <Ionicons name="chevron-forward" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Shadow must use StyleSheet — iOS/Android require platform-specific shadow props
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
});
