/**
 * ULBRA Design System - Color Tokens
 *
 * Defines all color values used throughout the design system.
 * These values are also exposed as CSS custom properties in global.css
 */

export const colors = {
  // Primary Brand - Dark Teal
  primary: "#0d3634",
  primaryHover: "#062926",
  primaryActive: "#051f1d",

  // Secondary Brand
  secondary: "#045a52",
  secondaryHover: "#033f38",
  secondaryActive: "#022e2a",

  // Tertiary Brand - Accent Tan
  tertiary: "#cca269",
  tertiaryHover: "#b8935e",
  tertiaryActive: "#a37e53",

  // Semantic Colors
  success: "#28a745",
  successHover: "#218838",
  error: "#dc3545",
  errorHover: "#bd2130",
  warning: "#ffc107",
  warningHover: "#e0a800",
  info: "#007bff",
  infoHover: "#0056b3",

  // Neutral Grayscale
  neutral: "#6c757d",
  neutralHover: "#5a6268",
  neutralLight: "#e2e3e5",
  neutralLighter: "#f1f3f5",

  // Text & Surface
  text: "#212529",
  textMuted: "#6c757d",
  textLight: "#495057",
  surface: "#ffffff",
  surfaceDark: "#f8f9fa",

  // Borders
  border: "#dee2e6",
  borderLight: "#e9ecef",

  // Additional Brand Palette
  lightSand: "#f5ce99",
  brown: "#66563d",
  sage: "#91baa3",

  // Component-specific backgrounds
  cardBg: "#ffffff",
  inputBg: "#ffffff",
  inputBorder: "#ced4da",
  inputFocusBorder: "#80bdff",
  buttonSecondaryBg: "#6c757d",

  // Disabled state
  disabled: "#b3b3b3",
  disabledBg: "#e9ecef",
  disabledText: "#6c757d",
} as const;

export type ColorToken = typeof colors;
export type ColorKey = keyof ColorToken;
