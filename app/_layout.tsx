import "../global.css";

import { posthog } from "@/config/posthog";
import { fetchStreamSession } from "@/lib/streamApi";
import { ClerkProvider, useUser } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import {
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import { useFonts } from "expo-font";
import { Stack, useGlobalSearchParams, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { PostHogProvider } from "posthog-react-native";
import { useEffect, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

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

// Bridges device safe-area insets into StreamVideo's theme so CallContent
// and participant views respect notches / system bars correctly.
function VideoWithInsets({
  client,
  children,
}: {
  client: StreamVideoClient;
  children: React.ReactNode;
}) {
  const { top, right, bottom, left } = useSafeAreaInsets();
  // `as any` needed: SDK's DeepPartial<Theme> index signature rejects plain number values
  const theme: any = { variants: { insets: { top, right, bottom, left } } };
  return (
    <StreamVideo client={client} style={theme}>
      {children}
    </StreamVideo>
  );
}

// Initialises a StreamVideoClient for the signed-in Clerk user and wraps
// descendants in <StreamVideo>. Disconnects on sign-out.
function StreamVideoWrapper({
  userId,
  userName,
  children,
}: {
  userId: string;
  userName: string;
  children: React.ReactNode;
}) {
  // Initialise the singleton client synchronously — the tokenProvider is
  // called lazily by the SDK when it first needs to authenticate.
  const clientRef = useRef<StreamVideoClient | null>(null);
  if (!clientRef.current) {
    const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY!;
    const tokenProvider = async () => {
      const session = await fetchStreamSession({
        userId,
        userName,
        lessonId: "init",
        language: "init",
      });
      return session.token;
    };
    clientRef.current = StreamVideoClient.getOrCreateInstance({
      apiKey,
      user: { id: userId, name: userName },
      tokenProvider,
    });
  }

  useEffect(() => {
    return () => {
      clientRef.current?.disconnectUser().catch(console.error);
      clientRef.current = null;
    };
  }, []);

  return (
    <VideoWithInsets client={clientRef.current}>
      {children}
    </VideoWithInsets>
  );
}

// Inner component — must be a child of ClerkProvider to call useUser()
function AppNavigation() {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (user?.id) {
      posthog.identify(user.id, {
        $set_once: { first_seen: new Date().toISOString() },
      });
    } else {
      posthog.reset();
    }
  }, [user?.id]);

  const stack = <Stack screenOptions={{ headerShown: false }} />;

  if (isSignedIn && user) {
    return (
      <StreamVideoWrapper
        userId={user.id}
        userName={user.fullName ?? user.firstName ?? user.id}
      >
        {stack}
      </StreamVideoWrapper>
    );
  }

  return stack;
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PostHogProvider
        client={posthog}
        autocapture={{
          captureScreens: false,
          captureTouches: true,
          propsToCapture: ["testID"],
          maxElementsCaptured: 20,
        }}
      >
        <SafeAreaProvider>
          <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
            <AppNavigation />
          </ClerkProvider>
        </SafeAreaProvider>
      </PostHogProvider>
    </GestureHandlerRootView>
  );
}
