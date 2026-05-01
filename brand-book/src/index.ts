/**
 * ULBRA Design System - Main Export Index
 *
 * Exports all components and design tokens from the design system.
 * This file serves as the public API for the @ulbra/brand-book package.
 */

// Primitives
export { default as Button } from "./components/Button/Button";
export type { ButtonProps } from "./components/Button/Button";

export { default as Input } from "./components/Input/Input";
export type { InputProps } from "./components/Input/Input";

export { default as Label } from "./components/Label/Label";
export type { LabelProps } from "./components/Label/Label";

export { default as Badge } from "./components/Badge/Badge";
export type { BadgeProps } from "./components/Badge/Badge";

export { default as Card } from "./components/Card/Card";
export type { CardProps } from "./components/Card/Card";

// Tier 2: Icon & Form Components
export { default as Icon } from "./components/Icon/Icon";
export type { IconProps } from "./components/Icon/Icon";

export { default as FormGroup } from "./components/FormGroup/FormGroup";
export type { FormGroupProps } from "./components/FormGroup/FormGroup";

// Navigation
export { default as NavHeader } from "./components/NavHeader/NavHeader";
export type { NavHeaderProps, NavItem } from "./components/NavHeader/NavHeader";

// Data Display
export { default as Table } from "./components/Table/Table";
export type { TableProps } from "./components/Table/Table";

// Layout Components
export { default as Container } from "./components/Container/Container";
export type { ContainerProps } from "./components/Container/Container";

export { default as Grid } from "./components/Grid/Grid";
export type { GridProps } from "./components/Grid/Grid";

export { default as Section } from "./components/Section/Section";
export type { SectionProps } from "./components/Section/Section";

// Hero & Feature Components
export { default as HeroSection } from "./components/HeroSection/HeroSection";
export type { HeroSectionProps } from "./components/HeroSection/HeroSection";

// Feedback & Status
export { default as Alert } from "./components/Alert/Alert";
export type { AlertProps } from "./components/Alert/Alert";

// Overlay Components
export { default as Modal } from "./components/Modal/Modal";
export type { ModalProps } from "./components/Modal/Modal";

// Navigation Trails
export { default as Breadcrumb } from "./components/Breadcrumb/Breadcrumb";
export type { BreadcrumbProps, BreadcrumbItem } from "./components/Breadcrumb/Breadcrumb";

// Design Tokens
export { colors } from "./styles/colors";
export type { ColorToken, ColorKey } from "./styles/colors";

export { typography } from "./styles/typography";
export type { TypographyToken } from "./styles/typography";

export {
  spacing,
  borderRadius,
  breakpoints,
  mediaQueries,
  containerMaxWidths,
} from "./styles/spacing";
export type {
  SpacingToken,
  BorderRadiusToken,
  BreakpointToken,
  MediaQueryToken,
  ContainerMaxWidthToken,
} from "./styles/spacing";
