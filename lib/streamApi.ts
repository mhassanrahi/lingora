import Constants from "expo-constants";

export interface StreamSessionData {
  apiKey: string;
  token: string;
  callId: string;
  userId: string;
  userName: string;
  language: string;
}

/**
 * Resolves the base URL for Expo API routes.
 * In development the Metro bundler serves API routes on the same host.
 */
export function getServerBaseUrl(): string {
  if (__DEV__) {
    const hostUri = Constants.expoConfig?.hostUri;
    if (hostUri) {
      return `http://${hostUri}`;
    }
  }
  return process.env.EXPO_PUBLIC_API_URL ?? "";
}

export async function fetchStreamSession(params: {
  userId: string;
  userName: string;
  lessonId: string;
  language: string;
}): Promise<StreamSessionData> {
  const url = `${getServerBaseUrl()}/api/stream-token`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    throw new Error(`Stream token request failed (${res.status})`);
  }
  return res.json();
}
