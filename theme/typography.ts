export const fontFamily = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semiBold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
} as const;

export const fontSize = {
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 16,
  bodyLg: 16,
  bodyMd: 14,
  bodySm: 13,
  caption: 11,
} as const;

export const lineHeight = {
  h1: 38,  // 32 * 1.2
  h2: 31,  // 24 * 1.3
  h3: 26,  // 20 * 1.3
  h4: 22,  // 16 * 1.4
  bodyLg: 26, // 16 * 1.6
  bodyMd: 22, // 14 * 1.6
  bodySm: 21, // 13 * 1.6
  caption: 15, // 11 * 1.4
} as const;

export const typography = {
  h1: { fontFamily: fontFamily.bold, fontSize: fontSize.h1, lineHeight: lineHeight.h1 },
  h2: { fontFamily: fontFamily.semiBold, fontSize: fontSize.h2, lineHeight: lineHeight.h2 },
  h3: { fontFamily: fontFamily.semiBold, fontSize: fontSize.h3, lineHeight: lineHeight.h3 },
  h4: { fontFamily: fontFamily.medium, fontSize: fontSize.h4, lineHeight: lineHeight.h4 },
  bodyLg: { fontFamily: fontFamily.regular, fontSize: fontSize.bodyLg, lineHeight: lineHeight.bodyLg },
  bodyMd: { fontFamily: fontFamily.regular, fontSize: fontSize.bodyMd, lineHeight: lineHeight.bodyMd },
  bodySm: { fontFamily: fontFamily.regular, fontSize: fontSize.bodySm, lineHeight: lineHeight.bodySm },
  caption: { fontFamily: fontFamily.regular, fontSize: fontSize.caption, lineHeight: lineHeight.caption },
} as const;
