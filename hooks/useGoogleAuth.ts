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
      console.error("Google OAuth error:", err);
    }
  };

  return { signInWithGoogle };
}
