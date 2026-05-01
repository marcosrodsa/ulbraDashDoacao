# ULBRA Design System

A modern, accessible React component library built with TypeScript and Storybook. The ULBRA Design System provides a comprehensive set of reusable components designed for consistency, accessibility, and ease of use.

## Features

- **16 React Components** organized in three tiers (Primitives, Core, Advanced)
- **Full TypeScript Support** with complete type definitions
- **Storybook 8** for interactive documentation and component exploration
- **CSS Modules** for scoped styling and maintainability
- **Comprehensive Design Tokens** (colors, typography, spacing, breakpoints)
- **WCAG AA Accessibility** standards compliance
- **React 18** with modern hooks and patterns
- **Responsive Design** built-in to all components

## Installation

Install the package from npm:

```bash
npm install @ulbra/brand-book
```

Or using yarn:

```bash
yarn add @ulbra/brand-book
```

## Quick Start

### Import Components

```typescript
import { Button, Card, Alert, Container } from '@ulbra/brand-book';

export function App() {
  return (
    <Container>
      <Card>
        <h1>Welcome</h1>
        <Alert variant="success">Setup complete!</Alert>
        <Button variant="primary">Get Started</Button>
      </Card>
    </Container>
  );
}
```

### Run Storybook Locally

To explore all components with interactive examples:

```bash
npm run storybook
```

The Storybook instance will open at `http://localhost:6006`.

### Build Storybook for Deployment

```bash
npm run build-storybook
```

## Component Reference

### Tier 1: Primitives

Foundation components that form the building blocks of the design system.

- **Button** - Interactive button with variants (primary, secondary, success, danger) and sizes (sm, md, lg)
- **Input** - Text input field with validation and error states
- **Label** - Form label with accessibility support
- **Badge** - Small status indicator with variants
- **Card** - Container for grouped content with shadow and padding

### Tier 2: Core Components

Essential components for forms, navigation, and data display.

- **Icon** - SVG icon wrapper with size and color customization
- **FormGroup** - Composition component combining label, input, and error messaging
- **NavHeader** - Responsive navigation bar with mobile hamburger menu
- **Table** - Semantic table component with striped row support
- **Breadcrumb** - Navigation trail component for page hierarchy

### Tier 3: Advanced Components

Complex, feature-rich components for layouts and overlays.

- **Container** - Max-width responsive wrapper (Bootstrap-style)
- **Grid** - 12-column grid system with responsive gap control
- **Section** - Full-width section with background and padding presets
- **HeroSection** - Large headline section with background image and CTA
- **Alert** - Status message box with 4 variants (success, danger, warning, info)
- **Modal** - Dialog overlay with backdrop, header, body, and footer sections

## Design Tokens

The design system includes comprehensive design tokens for consistent styling:

### Colors

```typescript
import { colors } from '@ulbra/brand-book';

// Primary brand colors
colors.primary        // #0d3634 (Dark Teal)
colors.secondary      // #045a52
colors.tertiary       // #cca269 (Tan)

// Semantic colors
colors.success        // #28a745
colors.error          // #dc3545
colors.warning        // #ffc107
colors.info           // #007bff

// Neutral grayscale
colors.text           // #212529
colors.textMuted      // #6c757d
colors.border         // #dee2e6
colors.surface        // #ffffff
```

### Typography

```typescript
import { typography } from '@ulbra/brand-book';

// Font families
typography.fontFamily.sans      // Inter, system fonts
typography.fontFamily.mono      // Fira Code
typography.fontFamily.display   // Inter

// Font sizes
typography.fontSize.displayHero // 6rem
typography.fontSize.body        // 1rem
typography.fontSize.small       // 0.75rem

// Font weights (100-900 supported)
typography.fontWeight.light     // 300
typography.fontWeight.normal    // 400
typography.fontWeight.bold      // 700

// Line heights
typography.lineHeight.tight     // 1.2
typography.lineHeight.normal    // 1.5
typography.lineHeight.loose     // 2
```

### Spacing

```typescript
import { spacing, borderRadius, breakpoints } from '@ulbra/brand-book';

// Spacing scale
spacing.xs              // 0.25rem (4px)
spacing.sm              // 0.5rem (8px)
spacing.md              // 1rem (16px)
spacing.lg              // 1.5rem (24px)
spacing.xl              // 2rem (32px)
spacing.xxl             // 4rem (64px)

// Border radius
borderRadius.sm         // 0.2rem
borderRadius.md         // 0.25rem (default)
borderRadius.lg         // 0.5rem
borderRadius.xl         // 1rem
borderRadius.full       // 9999px (pills)

// Responsive breakpoints
breakpoints.xs          // 0px (mobile first)
breakpoints.sm          // 576px (small devices)
breakpoints.md          // 768px (tablets)
breakpoints.lg          // 992px (small desktops)
breakpoints.xl          // 1200px (desktops)
breakpoints.xxl         // 1400px (large desktops)
```

## Accessibility

The ULBRA Design System is built with accessibility as a core principle:

- **WCAG AA Compliance** - All components meet WCAG 2.1 Level AA standards
- **Semantic HTML** - Proper HTML elements and ARIA attributes
- **Keyboard Navigation** - Full keyboard support for interactive components
- **Focus Management** - Visible focus indicators for keyboard users
- **Color Contrast** - Sufficient contrast ratios for readability
- **Screen Reader Support** - Proper labeling and ARIA annotations
- **Responsive Design** - Mobile-first, works on all device sizes

### Accessibility Features

- Modal traps focus and restores it on close
- Alert uses `role="alert"` for announcements
- NavHeader has proper `aria-label` attributes
- FormGroup associates labels with inputs via `htmlFor`
- Breadcrumb marks current page with `aria-current="page"`
- All interactive components support keyboard interaction

## TypeScript Support

The library is built with TypeScript and includes full type definitions for all components:

```typescript
import { Button, ButtonProps } from '@ulbra/brand-book';

// All components are fully typed
const MyButton: React.FC<ButtonProps> = (props) => (
  <Button variant="primary" size="lg" {...props}>
    Click me
  </Button>
);
```

## Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork the repository** and create a feature branch
2. **Create components** following the established pattern (Component.tsx, Component.module.css, Component.stories.tsx)
3. **Include stories** with 2-4 examples per component
4. **Add TypeScript types** for all component props
5. **Test accessibility** using keyboard navigation and screen readers
6. **Update documentation** and this README if adding new features
7. **Submit a pull request** with a clear description

### Development Setup

```bash
# Install dependencies
npm install

# Run Storybook for development
npm run storybook

# Type-check components
npm run type-check

# Build Storybook for production
npm run build-storybook
```

## License

This design system is proprietary to ULBRA. All rights reserved.

## Support

For questions, issues, or feature requests, please contact the design system team or open an issue in the repository.

---

**Version:** 1.0.0  
**Last Updated:** 2026-04-30  
**Maintainer:** ULBRA Design Team
