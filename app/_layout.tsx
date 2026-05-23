import "../global.css";

import { posthog } from "@/config/posthog";
import { ClerkProvider, useUser } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import { Stack, useGlobalSearchParams, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { PostHogProvider } from "posthog-react-native";
import { useEffect, useRef } from "react";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
}

SplashScreen.preventAutoHideAsync();

const SENSITIVE_PARAM_KEYS = new Set([
  "code",
  "token",
  "access_token",
  "email",
  "password",
]);

function sanitizeAnalyticsParams(
  params: Record<string, string | string[]>
): Record<string, string | string[]> {
  return Object.fromEntries(
    Object.entries(params).filter(([key]) => !SENSITIVE_PARAM_KEYS.has(key))
  );
}

// Inner component — must be a child of ClerkProvider to call useUser()
function AppNavigation() {
  const { user } = useUser();

  useEffect(() => {
    if (user?.id) {
      posthog.identify(user.id, {
        $set_once: { first_seen: new Date().toISOString() },
      });
    } else {
      posthog.reset();
    }
  }, [user?.id]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  const pathname = usePathname();
  const params = useGlobalSearchParams();
  const previousPathname = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Manual screen tracking for Expo Router
  useEffect(() => {
    if (previousPathname.current !== pathname) {
      posthog.screen(pathname, {
        previous_screen: previousPathname.current ?? null,
        ...sanitizeAnalyticsParams(params),
      });
      previousPathname.current = pathname;
    }
  }, [pathname, params]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PostHogProvider
      client={posthog}
      autocapture={{
        captureScreens: false,
        captureTouches: true,
        propsToCapture: ["testID"],
        maxElementsCaptured: 20,
      }}
    >
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <AppNavigation />
      </ClerkProvider>
    </PostHogProvider>
  );
}
