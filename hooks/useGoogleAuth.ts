import { posthog } from "@/config/posthog";
import { useSSO } from "@clerk/expo";
import * as Linking from "expo-linking";
import { router } from "expo-router";
export function useGoogleAuth() {
  const { startSSOFlow } = useSSO();

  const signInWithGoogle = async () => {
    try {
      const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: Linking.createURL("/"),
      });

      console.log("signIn: ", signIn?.status)

      // Resolve the session ID from whichever resource Clerk populated
      const sessionId =
        createdSessionId ??
        (signIn?.status === "complete" ? signIn.createdSessionId : null) ??
        (signUp?.status === "complete" ? signUp.createdSessionId : null);

      if (sessionId && setActive) {
        await setActive({ session: sessionId });
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
