/**
 * ULBRA Design System - Typography Tokens
 *
 * Defines all typography values including font families, sizes, weights, and line heights.
 * Built around Inter variable font (100–900 weights).
 */

export const typography = {
  // Font Families
  fontFamily: {
    sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: '"Fira Code", "Courier New", monospace',
    display: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  // Font Sizes - Display Styles (Large, prominent, hero content)
  fontSize: {
    displayHero: "6rem", // 96px
    displayLarge: "5.5rem", // 88px
    displayLarge2: "4.5rem", // 72px
    displayMedium: "3.5rem", // 56px
    sectionHeading: "2.5rem", // 40px
    subheadingLarge: "2rem", // 32px
    subheading: "1.75rem", // 28px
    headingXL: "2rem", // 32px
    headingL: "1.75rem", // 28px
    headingM: "1.5rem", // 24px
    headingS: "1.25rem", // 20px
    bodyLarge: "1.25rem", // 20px
    body: "1rem", // 16px
    bodySmall: "0.875rem", // 14px
    caption: "0.875rem", // 14px
    small: "0.75rem", // 12px
  },

  // Font Weights - Inter supports 100–900
  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300, // Used for display text (premium voice)
    normal: 400, // Used for body text (clarity)
    medium: 500, // Used for headings and emphasis
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  // Line Heights
  lineHeight: {
    none: 1,
    tight: 1.2, // Display and heading line heights
    snug: 1.375,
    normal: 1.5, // Body text line height
    relaxed: 1.625,
    loose: 2,
  },

  // Letter Spacing
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },

  // Predefined typography compositions (style shortcuts)
  styles: {
    displayHero: {
      fontFamily: '"Inter", sans-serif',
      fontSize: "6rem",
      fontWeight: 300,
      lineHeight: 1.2,
    },
    displayLarge: {
      fontFamily: '"Inter", sans-serif',
      fontSize: "5.5rem",
      fontWeight: 300,
      lineHeight: 1.2,
    },
    displayMedium: {
      fontFamily: '"Inter", sans-serif',
      fontSize: "3.5rem",
      fontWeight: 300,
      lineHeight: 1.2,
    },
    sectionHeading: {
      fontFamily: '"Inter", sans-serif',
      fontSize: "2.5rem",
      fontWeight: 500,
      lineHeight: 1.2,
    },
    subheadingLarge: {
      fontFamily: '"Inter", sans-serif',
      fontSize: "2rem",
      fontWeight: 500,
      lineHeight: 1.2,
    },
    subheading: {
      fontFamily: '"Inter", sans-serif',
      fontSize: "1.75rem",
      fontWeight: 500,
      lineHeight: 1.2,
    },
    bodyLarge: {
      fontFamily: '"Inter", sans-serif',
      fontSize: "1.25rem",
      fontWeight: 300,
      lineHeight: 1.5,
    },
    body: {
      fontFamily: '"Inter", sans-serif',
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    bodySmall: {
      fontFamily: '"Inter", sans-serif',
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      fontFamily: '"Inter", sans-serif',
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    caption: {
      fontFamily: '"Inter", sans-serif',
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
} as const;

export type TypographyToken = typeof typography;
