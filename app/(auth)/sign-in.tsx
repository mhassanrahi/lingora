import { SocialButton } from "@/components/SocialButton";
import { VerificationModal } from "@/components/VerificationModal";
import { posthog } from "@/config/posthog";
import { images } from "@/constants/images";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import { useSignIn } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { type Href, router, Stack } from "expo-router";
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
  const { signIn, errors, fetchStatus } = useSignIn();
  const { signInWithGoogle } = useGoogleAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = ({ session, decorateUrl }: { session?: { currentTask?: unknown } | null; decorateUrl: (url: string) => string }) => {
    if (session?.currentTask) return;
    const url = decorateUrl("/");
    router.replace(url.startsWith("http") ? "/" : (url as Href));
  };

  const handleSignIn = async () => {
    posthog.capture("sign_in_attempted", { method: "password" });
    try {
      const { error } = await signIn.password({ emailAddress: email, password });
      if (error) {
        posthog.capture("sign_in_failed", { method: "password", error_message: error.message });
        return;
      }

      if (signIn.status === "complete") {
        posthog.identify(email, { $set: { email } });
        await signIn.finalize({ navigate });
        posthog.capture("user_signed_in", { method: "password" });
        return;
      }

      if (signIn.status === "needs_second_factor" || signIn.status === "needs_client_trust") {
        const emailCodeFactor = signIn.supportedSecondFactors?.find(
          (factor) => factor.strategy === "email_code",
        );
        if (emailCodeFactor) {
          const { error: sendError } = await signIn.mfa.sendEmailCode();
          if (sendError) return;
          setShowModal(true);
        }
      }
    } catch (err) {
      const error = err as Error;
      posthog.capture("$exception", {
        $exception_list: [
          {
            type: error.name,
            value: error.message,
            stacktrace: { type: "raw", frames: error.stack ?? "" },
          },
        ],
        $exception_source: "sign_in",
      });
    }
  };

  const handleVerify = async (code: string) => {
    const { error } = await signIn.mfa.verifyEmailCode({ code });
    if (error) return;
    if (signIn.status === "complete") {
      setShowModal(false);
      await signIn.finalize({ navigate });
      posthog.capture("user_signed_in", { method: "password_mfa" });
    }
  };

  const handleResend = async () => {
    const { error } = await signIn.mfa.sendEmailCode();
    if (error) return;
  };

  const isLoading = fetchStatus === "fetching";

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
            <Text className="typo-h1 color-ink">{"Welcome back"}</Text>
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
            {errors.fields.identifier && (
              <Text style={styles.errorText}>{errors.fields.identifier.message}</Text>
            )}

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
            {errors.fields.password && (
              <Text style={styles.errorText}>{errors.fields.password.message}</Text>
            )}

            {/* Sign In button */}
            <TouchableOpacity
              className="bg-brand-purple rounded-2xl py-[18px] items-center"
              onPress={handleSignIn}
              activeOpacity={0.85}
              disabled={isLoading || !email.trim() || !password}
            >
              <Text className="font-poppins-semibold text-[17px] color-white">
                {isLoading ? "Signing in…" : "Sign In"}
              </Text>
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
            <SocialButton icon="logo-google" iconColor="#4285F4" label="Continue with Google" onPress={signInWithGoogle} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal is only shown for MFA (needs_client_trust) */}
      <VerificationModal
        visible={showModal}
        email={email}
        onClose={() => setShowModal(false)}
        onVerify={handleVerify}
        onResend={handleResend}
        error={errors.fields.code?.message}
        loading={isLoading}
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
  errorText: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#FF4D4F",
    marginTop: -4,
  },
});
