/**
 * ULBRA Design System - Token Exports
 *
 * Barrel export for all design tokens.
 * Import from this file to access colors, typography, spacing, and breakpoints.
 *
 * Example:
 * import { colors, typography, spacing, borderRadius, breakpoints } from '@/styles/tokens';
 */

export { colors, type ColorToken, type ColorKey } from "./colors";
export { typography, type TypographyToken } from "./typography";
export {
  spacing,
  borderRadius,
  breakpoints,
  mediaQueries,
  containerMaxWidths,
  type SpacingToken,
  type BorderRadiusToken,
  type BreakpointToken,
  type MediaQueryToken,
  type ContainerMaxWidthToken,
} from "./spacing";

// Convenience re-exports of all tokens as a single object
import { colors } from "./colors";
import { typography } from "./typography";
import { spacing, borderRadius, breakpoints, mediaQueries, containerMaxWidths } from "./spacing";

export const tokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  breakpoints,
  mediaQueries,
  containerMaxWidths,
} as const;

export default tokens;
