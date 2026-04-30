/**
 * ULBRA Design System - Spacing, Border Radius & Breakpoints Tokens
 *
 * Defines spacing scale (padding, margin), border-radius values, and responsive breakpoints.
 * Follows a consistent ratio-based scaling system.
 */

export const spacing = {
  xs: "0.25rem", // 4px
  sm: "0.5rem", // 8px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  xxl: "4rem", // 64px

  // Aliases for common use cases
  none: "0",
  gutter: "1rem", // Standard gutter width
} as const;

export const borderRadius = {
  none: "0px",
  sm: "0.2rem", // 3.2px
  md: "0.25rem", // 4px (default component radius)
  lg: "0.5rem", // 8px
  xl: "1rem", // 16px
  full: "9999px", // Fully rounded (pills, badges)
} as const;

export const breakpoints = {
  xs: "0px", // Mobile first (default)
  sm: "576px", // Small devices
  md: "768px", // Tablets
  lg: "992px", // Large tablets / small desktops
  xl: "1200px", // Desktops
  xxl: "1400px", // Large desktops
} as const;

// Media query helpers (for use in CSS-in-JS or documentation)
export const mediaQueries = {
  xs: `(min-width: ${breakpoints.xs})`,
  sm: `(min-width: ${breakpoints.sm})`,
  md: `(min-width: ${breakpoints.md})`,
  lg: `(min-width: ${breakpoints.lg})`,
  xl: `(min-width: ${breakpoints.xl})`,
  xxl: `(min-width: ${breakpoints.xxl})`,

  // Mobile-first + max-width variants
  smOnly: `(max-width: 575.98px)`,
  mdOnly: `(min-width: ${breakpoints.sm}) and (max-width: 767.98px)`,
  lgOnly: `(min-width: ${breakpoints.md}) and (max-width: 991.98px)`,
  xlOnly: `(min-width: ${breakpoints.lg}) and (max-width: 1199.98px)`,
  xxlOnly: `(min-width: ${breakpoints.xl})`,
} as const;

// Container max-widths (aligned with Bootstrap convention)
export const containerMaxWidths = {
  sm: "540px",
  md: "720px",
  lg: "960px",
  xl: "1140px",
  xxl: "1320px",
} as const;

export type SpacingToken = typeof spacing;
export type BorderRadiusToken = typeof borderRadius;
export type BreakpointToken = typeof breakpoints;
export type MediaQueryToken = typeof mediaQueries;
export type ContainerMaxWidthToken = typeof containerMaxWidths;
