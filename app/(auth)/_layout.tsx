import { useAuth } from "@clerk/expo";
import { Redirect, Slot, Stack } from "expo-router";

export default function AuthLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  if (isSignedIn) {
    return <Redirect href="/" />;
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Slot />
    </>
  );
}
