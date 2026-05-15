export const colors = {
  // Primary brand colors
  brandPurple: "#6C4EF5",
  brandDeepPurple: "#5B3BF6",
  brandBlue: "#4D88FF",
  brandGreen: "#21C168",

  // Semantic colors
  success: "#21C168",
  warning: "#FFCB00",
  streak: "#FF8A00",
  error: "#FF4D4F",
  info: "#4D88FF",

  // Neutrals
  ink: "#001328",
  muted: "#6B7280",
  border: "#E5E7EB",
  surface: "#F6F7FB",
  background: "#FFFFFF",
} as const;

export type ColorKey = keyof typeof colors;
