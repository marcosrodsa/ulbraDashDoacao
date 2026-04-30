# ULBRA Design System + Component Library (brand-book)

**Date:** 2026-04-30  
**Scope:** Enhance DESIGN.md + implement React component library with Storybook  
**Status:** Spec (awaiting approval)

---

## 1. Overview

This project delivers two interconnected outputs:

1. **Improved DESIGN.md** — Validate and enhance the existing DESIGN.md against the ULBRA KV Visual, add component states/variations, reorganize for clarity.
2. **Component Library (brand-book)** — React + Storybook implementation of all DESIGN.md components, served as a reusable, documented design system.

The `brand-book/` folder becomes the single source of truth for ULBRA's visual identity and component behavior across all projects.

---

## 2. Structure

### Folder Layout

```
ulbraDashDoacao/
├── brand-book/                          ← NEW: Design system + component library
│   ├── package.json                     ← React + Storybook + TypeScript
│   ├── tsconfig.json
│   ├── DESIGN.md                        ← Enhanced version (from root)
│   ├── .storybook/
│   │   ├── main.ts                      ← Storybook config
│   │   └── preview.ts                   ← Global theme/decorators
│   ├── src/
│   │   ├── components/
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx           ← Component implementation
│   │   │   │   ├── Button.stories.tsx   ← Storybook stories (all variants)
│   │   │   │   └── Button.module.css    ← Styles (or CSS-in-JS)
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   ├── Badge/
│   │   │   ├── Label/
│   │   │   ├── Icon/
│   │   │   ├── NavHeader/
│   │   │   ├── Table/
│   │   │   ├── FormGroup/
│   │   │   ├── Alert/
│   │   │   ├── Modal/
│   │   │   ├── Breadcrumb/
│   │   │   ├── Container/
│   │   │   ├── Grid/
│   │   │   ├── Section/
│   │   │   └── HeroSection/
│   │   ├── styles/
│   │   │   ├── colors.ts                ← CSS custom properties definitions
│   │   │   ├── typography.ts            ← Font face, global styles
│   │   │   ├── spacing.ts               ← Spacing scale
│   │   │   ├── breakpoints.ts           ← Responsive breakpoints
│   │   │   └── global.css               ← Reset, base styles
│   │   └── index.ts                     ← Public exports (all components)
│   ├── public/                          ← Fonts, static assets
│   └── .storybook-output/               ← Built Storybook (generated)
└── docs/superpowers/specs/              ← Spec docs (this file)
```

---

## 3. DESIGN.md Improvements

### Phase: Validation & Enhancement

**Comparison with KV Visual:**
- Validate all hex colors (#0d3634, #045a52, #cca269, #f5ce99, #91baa3, #66563d) match KV
- Verify typography (Inter 100–900 weights) is correctly documented
- Check component dimensions, padding, border-radius are consistent with design intent

**Additions:**
1. **Component States** — Each component gets explicit states documented:
   - Hover (background/color/border changes)
   - Active (pressed, selected, focused)
   - Disabled (opacity, cursor, greyed out)
   - Focus (keyboard navigation — box-shadow ring)
   
   Example (Button Primary):
   ```
   Default: bg #0d3634, text white
   Hover:   bg #062926 (10% darker)
   Active:  bg #051f1d (deeper)
   Disabled: bg #b3b3b3, cursor not-allowed, opacity 0.6
   Focus:   box-shadow 0 0 0 0.2rem rgba(13,54,52,0.25)
   ```

2. **Component Sizes** — Add small/medium/large variants:
   - Button: sm (0.75rem padding), md (0.375rem 0.75rem), lg (0.5rem 1rem)
   - Input: sm, md, lg (font-size, padding scale)
   - Badge: sm (8px font), md (12px), lg (14px)

3. **Component Anatomy** — New section showing interior structure:
   - Button: [icon?] + label + [chevron?]
   - Input: [prefix icon?] + text field + [suffix/clear button?]
   - Card: [image?] + [header] + body + [footer]

4. **CSS Custom Properties** — Codify all tokens:
   ```css
   --ulbra-color-primary: #0d3634;
   --ulbra-color-secondary: #045a52;
   --ulbra-color-accent-tan: #cca269;
   --ulbra-font-display: "Inter", sans-serif;
   --ulbra-spacing-md: 1rem;
   --ulbra-radius-base: 0.25rem;
   ```

5. **Real-World Compositions** — Add 3-5 examples:
   - Admission form (form-group + button row)
   - Course listing (grid of cards + filters)
   - Hero section (headline + CTA + background)

6. **Reorganization** — Collapse verbose sections, add table of contents, move examples to Storybook preview instead of inline DESIGN.md.

**Output:** DESIGN.md reduced from ~600 lines to ~400 (tighter, scannable), plus reference link to Storybook for interactive previews.

---

## 4. Component Library (React + Storybook)

### Tech Stack

- **React 18+** (functional components, TypeScript)
- **TypeScript** (strict mode for type safety)
- **Storybook 8+** (UI documentation + interactive preview)
- **CSS Modules** or **Tailwind CSS** (to be decided; recommend CSS Modules for design fidelity)
- **Vite** (Storybook's default bundler, fast dev)

### Components to Implement

**Primitives (Atoms):**
1. Button — primary, secondary, success, danger (+ sizes: sm/md/lg, disabled, loading)
2. Input — text, email, password, textarea (+ disabled, error, focus states)
3. Label — for form fields
4. Badge — default, primary variants (+ sizes)
5. Icon — placeholder (SVG or icon lib)

**Composed (Molecules):**
6. FormGroup — (Label + Input + error message layout)
7. Card — (border, padding, optional image, optional footer)
8. Table — (header, body, striped rows, hover)
9. NavHeader — (logo, nav items, hamburger on mobile)

**Layout (Organisms):**
10. Container — (max-width wrapper, padding)
11. Grid — (Bootstrap-style 12-column, col-12/col-md-6/col-lg-4 props)
12. Section — (padding presets, optional background)
13. HeroSection — (headline + subheading + CTA + image, responsive)

**Feedback:**
14. Alert — (success, danger, warning, info — with icon + dismiss)
15. Modal — (header, body, footer, backdrop, overlay)
16. Breadcrumb — (items array, separator, current page highlight)

**Total: 16 components** across 4 tiers.

### Each Component's Storybook Story

```typescript
// Button.stories.tsx
export default {
  title: 'Primitives/Button',
  component: Button,
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'success', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

export const Primary = { args: { variant: 'primary', children: 'Click me' } };
export const Disabled = { args: { variant: 'primary', disabled: true, children: 'Disabled' } };
export const Small = { args: { variant: 'primary', size: 'sm', children: 'Small' } };
export const Large = { args: { variant: 'primary', size: 'lg', children: 'Large' } };
```

Storybook auto-renders all stories, showing:
- Live preview (interactive, can click buttons, type in inputs)
- Source code
- Accessibility panel (axe-core violations highlighted)
- Responsive preview (mobile/tablet/desktop)
- Documentation tab

---

## 5. Deliverables

### Phase 1: DESIGN.md Enhancement
- ✅ Compare DESIGN.md against KV Visual (verify colors, typography)
- ✅ Add component states (hover, active, disabled, focus)
- ✅ Add component sizes (sm/md/lg variants)
- ✅ Add component anatomy section
- ✅ Codify CSS custom properties
- ✅ Add real-world composition examples
- ✅ Reorganize for clarity, reduce line count
- ✅ Commit to repo

### Phase 2: Setup Storybook
- ✅ Init React + TypeScript project in `brand-book/`
- ✅ Install Storybook 8 dependencies
- ✅ Configure `.storybook/main.ts` (Vite, TypeScript support)
- ✅ Configure `.storybook/preview.ts` (global theme, Ulbra colors, Inter font)
- ✅ Add npm scripts (`storybook`, `build-storybook`)

### Phase 3: Implement Components
- ✅ Create 16 components (primitives → composed → layout → feedback)
- ✅ Each component: `.tsx` (implementation) + `.stories.tsx` (Storybook stories) + `.module.css` (styles)
- ✅ Use DESIGN.md tokens (colors, spacing, typography)
- ✅ Ensure accessibility (WCAG AA — semantic HTML, focus rings, ARIA labels)
- ✅ Test in Storybook preview (interactive)

### Phase 4: Export & Documentation
- ✅ Export all components from `src/index.ts`
- ✅ Add README to `brand-book/` with usage instructions
- ✅ Build Storybook static output (`npm run build-storybook`)
- ✅ Optional: Deploy to GitHub Pages or Vercel

---

## 6. Integration with ulbraDashDoacao

Once brand-book is complete, the main project can import components:

```typescript
// In ulbraDashDoacao/src/pages/Admission.tsx
import { HeroSection, Card, Button, Grid } from '../brand-book/src';

export function Admission() {
  return (
    <>
      <HeroSection
        headline="Apply to ULBRA"
        subheading="Join our community"
        ctaLabel="Start Application"
      />
      <Grid columns={{ default: 3, md: 2, sm: 1 }}>
        {programs.map(p => (
          <Card key={p.id} title={p.name}>
            <p>{p.description}</p>
            <Button variant="primary">Learn More</Button>
          </Card>
        ))}
      </Grid>
    </>
  );
}
```

---

## 7. Success Criteria

1. ✅ DESIGN.md is 100% aligned with KV Visual (colors, typography, spacing)
2. ✅ DESIGN.md is reorganized, <400 lines, scannable
3. ✅ All 16 components are implemented in React + TypeScript
4. ✅ Each component has 4+ Storybook stories (default, hover/active, disabled, size variants)
5. ✅ Storybook runs locally (`npm run storybook`) and shows all components with live preview
6. ✅ All components meet WCAG AA (keyboard navigation, focus rings, semantic HTML)
7. ✅ Components are exportable and reusable in ulbraDashDoacao (no hardcoded styles, flexible props)

---

## 8. Timeline Estimate

- **Phase 1 (DESIGN.md):** 2–3 hours
- **Phase 2 (Storybook setup):** 1–2 hours
- **Phase 3 (16 components):** 6–8 hours
- **Phase 4 (export + docs):** 1–2 hours
- **Total:** 10–15 hours

---

## 9. Future Enhancements (Out of Scope)

- Theming system (dark mode toggle)
- Animation library (micro-interactions)
- Figma integration (Tokens Studio plugin)
- Component testing (Chromatic for visual regression)
- E2E testing (Cypress/Playwright on components)
