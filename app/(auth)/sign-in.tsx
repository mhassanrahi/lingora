import { SocialButton } from "@/components/SocialButton";
import { VerificationModal } from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSignIn = () => {
    if (email.trim()) setShowModal(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back button */}
          <TouchableOpacity className="ml-4 mt-3 p-1" onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={26} color="#001328" />
          </TouchableOpacity>

          {/* Header */}
          <View className="px-6 pt-1">
            <Text className="typo-h1 color-ink">{"Welcome\nback"}</Text>
            <Text className="typo-body-md color-muted mt-2">
              Continue your language journey ✨
            </Text>
          </View>

          {/* Mascot */}
          <View className="items-center mt-5 mb-5">
            <Image
              source={images.mascotAuth}
              className="w-[160px] h-[160px]"
              resizeMode="contain"
            />
            <Text className="absolute top-2 right-[80px] text-[18px] color-brand-purple">✦</Text>
            <Text className="absolute bottom-3 right-[72px] text-[11px] color-warning">✦</Text>
          </View>

          {/* Form */}
          <View className="px-6 gap-3">
            {/* Email input */}
            <View className="bg-surface rounded-2xl px-4 pt-3 pb-3 border border-border">
              <Text className="typo-caption color-muted mb-1">Email</Text>
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                placeholder="alex@gmail.com"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Password input */}
            <View className="bg-surface rounded-2xl px-4 pt-3 pb-3 border border-border flex-row items-center">
              <View className="flex-1">
                <Text className="typo-caption color-muted mb-1">Password</Text>
                <TextInput
                  style={styles.textInput}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              <TouchableOpacity className="p-1" onPress={() => setShowPassword((v) => !v)}>
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>

            {/* Sign In button */}
            <TouchableOpacity
              className="bg-brand-purple rounded-2xl py-[18px] items-center"
              onPress={handleSignIn}
              activeOpacity={0.85}
            >
              <Text className="font-poppins-semibold text-[17px] color-white">Sign In</Text>
            </TouchableOpacity>

            {/* Switch to sign up */}
            <View className="items-center">
              <Text className="typo-body-sm color-muted">
                Don{"'"}t have an account?{" "}
                <Text
                  className="color-brand-purple font-poppins-semibold"
                  onPress={() => router.replace("/(auth)/sign-up")}
                >
                  Sign Up
                </Text>
              </Text>
            </View>
          </View>

          {/* Divider */}
          <View className="flex-row items-center px-6 mt-6 mb-4">
            <View className="flex-1 h-[1px] bg-border" />
            <Text className="typo-body-sm color-muted mx-3">or continue with</Text>
            <View className="flex-1 h-[1px] bg-border" />
          </View>

          {/* Social auth */}
          <View className="px-6 gap-3 pb-6">
            <SocialButton icon="logo-google" iconColor="#4285F4" label="Continue with Google" />
            <SocialButton icon="logo-facebook" iconColor="#1877F2" label="Continue with Facebook" />
            <SocialButton icon="logo-apple" iconColor="#000000" label="Continue with Apple" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <VerificationModal
        visible={showModal}
        email={email}
        onClose={() => setShowModal(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ScrollView contentContainerStyle exception
  scrollContent: {
    flexGrow: 1,
  },
  // TextInput exception — input-specific props
  textInput: {
    fontFamily: "Poppins-Regular",
    fontSize: 15,
    lineHeight: 22,
    color: "#001328",
    padding: 0,
  },
});
