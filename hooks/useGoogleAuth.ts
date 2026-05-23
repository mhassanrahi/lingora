import { posthog } from "@/config/posthog";
import { useSSO } from "@clerk/expo";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {
  const { startSSOFlow } = useSSO();

  const signInWithGoogle = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: Linking.createURL("/"),
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        posthog.capture("user_signed_in_with_google", { method: "google" });
        router.replace("/");
      }
    } catch (err) {
      const error = err as Error;
      posthog.capture("google_auth_failed", { error_message: error.message });
      posthog.capture("$exception", {
        $exception_list: [
          {
            type: error.name,
            value: error.message,
            stacktrace: { type: "raw", frames: error.stack ?? "" },
          },
        ],
        $exception_source: "google_auth",
      });
      console.error("Google OAuth error:", err);
    }
  };

  return { signInWithGoogle };
}
