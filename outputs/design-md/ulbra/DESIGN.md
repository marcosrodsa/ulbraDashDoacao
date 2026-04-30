---
name: ULBRA
colors:
  primary: "#0d3634"
  secondary: "#045a52"
  tertiary: "#cca269"
  neutral: "#6c757d"
  surface: "#ffffff"
  text: "#212529"
  text-muted: "#6c757d"
  border: "#dee2e6"
  error: "#dc3545"
  success: "#28a745"
  accent: "#007bff"
  light-sand: "#f5ce99"
  brown: "#66563d"
  sage: "#91baa3"
typography:
  display-hero:
    fontFamily: "Inter"
    fontSize: "6rem"
    fontWeight: "300"
    lineHeight: "1.2"
  display-large:
    fontFamily: "Inter"
    fontSize: "5.5rem"
    fontWeight: "300"
    lineHeight: "1.2"
  display-large-2:
    fontFamily: "Inter"
    fontSize: "4.5rem"
    fontWeight: "300"
    lineHeight: "1.2"
  display-medium:
    fontFamily: "Inter"
    fontSize: "3.5rem"
    fontWeight: "300"
    lineHeight: "1.2"
  section-heading:
    fontFamily: "Inter"
    fontSize: "2.5rem"
    fontWeight: "500"
    lineHeight: "1.2"
  subheading-large:
    fontFamily: "Inter"
    fontSize: "2rem"
    fontWeight: "500"
    lineHeight: "1.2"
  subheading:
    fontFamily: "Inter"
    fontSize: "1.75rem"
    fontWeight: "500"
    lineHeight: "1.2"
  body-large:
    fontFamily: "Inter"
    fontSize: "1.25rem"
    fontWeight: "300"
    lineHeight: "1.5"
  body:
    fontFamily: "Inter"
    fontSize: "1rem"
    fontWeight: "400"
    lineHeight: "1.5"
  body-small:
    fontFamily: "Inter"
    fontSize: "0.875rem"
    fontWeight: "400"
    lineHeight: "1.5"
  button:
    fontFamily: "Inter"
    fontSize: "1rem"
    fontWeight: "400"
    lineHeight: "1.5"
  caption:
    fontFamily: "Inter"
    fontSize: "0.875rem"
    fontWeight: "400"
    lineHeight: "1.5"
rounded:
  none: "0px"
  sm: "0.2rem"
  md: "0.25rem"
  lg: "0.5rem"
  xl: "1rem"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  xxl: "4rem"
preview_tokens:
  button_primary_bg: "#0d3634"
  button_primary_text: "#ffffff"
  button_primary_border: "#0d3634"
  button_secondary_bg: "#6c757d"
  button_secondary_text: "#ffffff"
  button_secondary_border: "#6c757d"
  button_tertiary_text: "#007bff"
  surface_bg: "#ffffff"
  card_bg: "#ffffff"
  text: "#212529"
  text_muted: "#6c757d"
  border: "#dee2e6"
  accent: "#0d3634"
  button_radius: "0.25rem"
  card_radius: "0.25rem"
  input_radius: "0.25rem"
components:
  button-primary:
    bg: "#0d3634"
    text: "#ffffff"
    border: "#0d3634"
    radius: "0.25rem"
    padding: "0.375rem 0.75rem"
    font: "1rem Inter weight 400"
    hover_bg: "#062926"
  button-secondary:
    bg: "#6c757d"
    text: "#ffffff"
    border: "#6c757d"
    radius: "0.25rem"
    padding: "0.375rem 0.75rem"
    font: "1rem Inter weight 400"
    hover_bg: "#5a6268"
  button-success:
    bg: "#28a745"
    text: "#ffffff"
    border: "#28a745"
    radius: "0.25rem"
    padding: "0.375rem 0.75rem"
    font: "1rem Inter weight 400"
    hover_bg: "#218838"
  button-danger:
    bg: "#dc3545"
    text: "#ffffff"
    border: "#dc3545"
    radius: "0.25rem"
    padding: "0.375rem 0.75rem"
    font: "1rem Inter weight 400"
    hover_bg: "#bd2130"
  card:
    bg: "#ffffff"
    border: "#dee2e6"
    radius: "0.25rem"
    padding: "1rem"
    shadow: "0 0 0 rgba(0,0,0,0.1)"
  input-text:
    bg: "#ffffff"
    text: "#495057"
    border: "#ced4da"
    radius: "0.25rem"
    padding: "0.375rem 0.75rem"
    focus_border: "#80bdff"
  badge-default:
    bg: "#ffffff"
    text: "#212529"
    border: "#dee2e6"
    radius: "0.25rem"
    padding: "0.25rem 0.4rem"
    font: "0.875rem Inter weight 400"
  nav-header:
    bg: "#ffffff"
    text: "#212529"
    border_bottom: "#dee2e6"
    height: "60px"
---

## 1. Visual Theme & Atmosphere

ULBRA's design system carries a sophisticated, educational tone anchored in the university's brand identity. The palette centers on a dark teal (#0d3634) that conveys institutional trust and stability—ideal for an educational setting. Complementary warm tones (tan #cca269, light sand #f5ce99) introduce approachability, preventing the dark palette from feeling austere. The system is built on Bootstrap 4.3.1 with a custom AELBRA color layer, providing consistency and structural clarity for a multi-campus institution.

Typography relies heavily on Inter's variable font (100–900 weights), deployed with restraint: display sizes use weight 300 for premium elegance, body text sits at weight 400 for legibility, and headings at weight 500 for hierarchy. The very roomy spacing (generous margins and padding) reflects the apple-glass archetype, creating breathing room on pages that serve students, parents, and admissions staff. Buttons and form elements are kept minimal with low border-radius (0.25rem) and solid fills—no shadows, no gloss, just clarity.

The system handles multiple modalities: it must work for course listings (data-dense), hero sections (aspirational), and form workflows (transactional). Every component is grounded in Bootstrap's battle-tested structure, then refined with institutional color and typography choices.

**Key Characteristics:**
- Dark teal (#0d3634) as primary brand identity; warm tones (#cca269) as secondary accents
- Inter variable font throughout, weight 300 for display (premium voice), weight 400 for body (clarity)
- Minimal border-radius (0.25rem) and flat surfaces—no decorative shadows or layering
- Very roomy spacing (1.5rem–4rem gaps between sections) reflecting institutional confidence
- Bootstrap 4.3.1 foundation ensures responsive grid and form accessibility
- Low elevation design: depth is conveyed via border and surface color contrast, not shadow stacking
- Color semantics follow Bootstrap convention (danger=red, success=green, info=cyan) with brand teal as primary CTA

---

## 2. Color Palette & Roles

### Primary — Brand Identity

- **Dark Teal** (`#0d3634`): `--aelbra-cor-4`. The university's signature color, used in headers, primary CTAs, and brand moments. Conveys stability and institutional authority. When students see this color on the page, they know they're in ULBRA's space.

#### Color Validation Reference

| Color Name | Hex Code | RGB | Brightness | KV Match | Role |
|------------|----------|-----|-----------|----------|------|
| Dark Teal | #0d3634 | rgb(13, 54, 52) | 12% | ✓ Dominant | Primary brand identity |
| Medium Teal | #045a52 | rgb(4, 90, 82) | 17% | ✓ Secondary | Hover states, accents |
| Tan | #cca269 | rgb(204, 162, 105) | 62% | ✓ Accent | Sidebar highlights, badges |
| Light Sand | #f5ce99 | rgb(245, 206, 153) | 82% | ✓ Light bg | Callout boxes, highlights |
| Sage Green | #91baa3 | rgb(145, 186, 163) | 64% | ✓ Secondary accent | Success, completion states |
| Brown | #66563d | rgb(102, 86, 61) | 32% | ✓ Heritage | Rare/vintage moments |

**Validation Status**: All DESIGN.md color definitions have been validated against the ULBRA KV Visual (2026 branding guidelines). Each color's hex code and usage align with the official brand visual.

### Secondary — Supporting Brand Tones

- **Medium Teal** (`#045a52`): `--aelbra-cor-5`. A darker variant of the brand, used for hover states on primary buttons and accents in data visualizations. Complements the hero dark teal without competing.
- **Tan** (`#cca269`): `--aelbra-cor-2`. A warm, professional accent. Used in sidebar highlights, badge backgrounds, or supplementary UI (e.g., testimonial backgrounds). Balances the cool teal palette.
- **Light Sand** (`#f5ce99`): `--aelbra-cor-1`. A softer warm tone for very light backgrounds (highlights, callout boxes) when full white would be too harsh.
- **Sage Green** (`#91baa3`): `--aelbra-cor-6`. A tertiary green for success, completion, or positive-sentiment UI when the semantic green (#28a745) feels too bright.
- **Brown** (`#66563d`): `--aelbra-cor-3`. A grounding, earthy tone—rarely used, but available for heritage moments or vintage-style callouts.

### Semantic — Interactive & Feedback

- **Blue** (`#007bff`): `--primary` (Bootstrap default). The standard link color and UI accent. While not the brand primary, it's the active CTA color currently deployed in buttons and navigation. Future migrations could shift this to #0d3634.
- **Gray** (`#6c757d`): `--secondary`. Secondary buttons, disabled states, body text (lighter shade). The neutral backbone.
- **Success** (`#28a745`): `--success`. Confirmation, completed form steps, success messages.
- **Danger** (`#dc3545`): `--danger`. Error states, form validation failures, delete actions.
- **Warning** (`#ffc107`): `--warning`. Cautions, pending reviews, unapproved content.
- **Info** (`#17a2b8`): `--info`. Informational badges, help text highlights.

### Neutral Scale — Text & Structure

- **Body Text** (`#212529`): Default text color. Dark, legible on white and light backgrounds. Used in paragraphs, table cells, and descriptive copy.
- **Text Muted** (`#6c757d`): Secondary text. Metadata, timestamps, placeholder text, figure captions. Lower contrast for visual hierarchy.
- **Dark Gray** (`#343a40`): `--dark`. Headers, labels, strong emphasis.
- **Light Background** (`#f8f9fa`): `--light`. Subtle background tints for sections, alternate rows, disabled form states.

### Surface & Borders

- **White** (`#ffffff`): `--white`. Page background, card backgrounds, form inputs. The canvas.
- **Border** (`#dee2e6`): Hairline dividers, table borders, form input borders. Soft gray, just enough contrast.
- **Light Gray** (`#e9ecef`): Table header backgrounds, subtle section dividers when #dee2e6 needs more prominence.

### Color Philosophy

ULBRA's palette is _institutional-first, not marketing-bright_. The dark teal (#0d3634) is the visual anchor—serious, trustworthy, belonging in a university logo. The warm tones (tan, light sand) were added to prevent the palette from feeling cold; they appear in secondary UI and accent moments, never dominant. Bootstrap's semantic colors (red=danger, green=success, blue=info) are retained wholesale to leverage Bootstrap's pre-built states and maintain developer clarity. The result: a palette that feels both professionally branded AND structurally familiar to any Bootstrap developer.

---

## 3. Typography Rules

### Font Family

- **Serif System** (display headlines): Not present; Inter is used throughout.
- **Primary Font**: Inter (variable font, 100–900 weights).
  - Source: Self-hosted at `https://www.ulbra.br/themes/fontes/inter/Inter-Variable.woff2`
  - Italic variant available for emphasis.
  - Display swap mode ensures fallback text renders immediately while font loads.
- **Monospace** (code, technical copy): System stack (SFMono-Regular, Menlo, Monaco, Consolas).

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Features | Notes |
|------|------|------|--------|-------------|----------------|----------|-------|
| `display-hero` | Inter | 6rem | 300 | 1.2 | 0em | none | Hero headlines; 96px. Weight 300 is pure elegance. |
| `display-large` | Inter | 5.5rem | 300 | 1.2 | 0em | none | Large display; 88px. Slide banners, h1 equivalents. |
| `display-large-2` | Inter | 4.5rem | 300 | 1.2 | 0em | none | 72px. Section openers. |
| `display-medium` | Inter | 3.5rem | 300 | 1.2 | 0em | none | 56px. Secondary section headings. |
| `section-heading` | Inter | 2.5rem | 500 | 1.2 | 0em | none | Primary h1; 40px. Weight 500 for solidity. |
| `subheading-large` | Inter | 2rem | 500 | 1.2 | 0em | none | h2 equivalent; 32px. |
| `subheading` | Inter | 1.75rem | 500 | 1.2 | 0em | none | h3 equivalent; 28px. |
| `body-large` | Inter | 1.25rem | 300 | 1.5 | 0em | none | Lead/intro paragraph; 20px. Weight 300 is friendly. |
| `body` | Inter | 1rem | 400 | 1.5 | 0em | none | Standard body copy; 16px. Default weight. |
| `body-small` | Inter | 0.875rem | 400 | 1.5 | 0em | none | Secondary copy; 14px. |
| `button` | Inter | 1rem | 400 | 1.5 | 0em | none | Button labels; 16px. Same as body for consistency. |
| `caption` | Inter | 0.875rem | 400 | 1.5 | 0em | none | Image captions, metadata; 14px. |

**Backward-Compat Aliases** (legacy naming for migration):
- `h1`: section-heading
- `h2`: subheading-large
- `h3`: subheading
- `h4`: body-large
- `h5`, `h6`: body
- `body-lg`: body-large
- `body-md`: body
- `body-sm`: body-small
- `label`: button
- `mono`: SFMono-Regular (system monospace)

### Principles

- **Weight 300 Signals Premium Elegance**: Display sizes (6rem, 5.5rem, 4.5rem) and lead copy (`body-large` at 1.25rem) use weight 300. This is ULBRA's typographic signature—aspiration, not heaviness.
- **Weight 500 for Headings, Weight 400 for Body**: Headings (h1–h6) are weight 500 for strength; body is weight 400 for readability. This creates natural visual hierarchy.
- **Inter 100–900 Variable Font**: The entire system can scale across weights without loading additional files. Developers should feel free to use weight 600 or 700 on labels or secondary CTA buttons; the font is available.
- **Line Height 1.2 for Display, 1.5 for Body**: Display text (headlines) is compact; body text is relaxed. This is Bootstrap convention and ensures accessibility.
- **No Letter-Spacing Adjustments**: The system defaults to normal (0em). Inter's design already handles optical spacing. Avoid manually tweaking letter-spacing unless creating a very specific branded accent (e.g., all-caps labels might use 0.05em).

---

## 4. Components

### Buttons

**Primary Teal** (`button-primary`)
- Background: `#0d3634`
- Text: `#ffffff`
- Border: `#0d3634` (solid, same as background)
- Padding: 0.375rem 0.75rem (6px 12px)
- Radius: 0.25rem (4px, minimal rounding)
- Font: 1rem Inter weight 400, line-height 1.5
- Hover: `#062926` (darker teal, ~10% darker)
- Cursor: pointer
- Use: Primary CTA ("Apply Now", "View Admission", "Start Enrollment"). The dark teal brand color signals brand ownership of the action.

**Secondary Gray** (`button-secondary`)
- Background: `#6c757d`
- Text: `#ffffff`
- Border: `#6c757d`
- Padding: 0.375rem 0.75rem
- Radius: 0.25rem
- Font: 1rem Inter weight 400
- Hover: `#5a6268`
- Use: Secondary actions ("Cancel", "View More", "Later"). Neutral and non-committal.

**Success** (`button-success`)
- Background: `#28a745`
- Text: `#ffffff`
- Border: `#28a745`
- Padding: 0.375rem 0.75rem
- Radius: 0.25rem
- Font: 1rem Inter weight 400
- Hover: `#218838`
- Use: Completion, confirmation ("Confirm", "Save Changes"). Semantic success signal.

**Danger** (`button-danger`)
- Background: `#dc3545`
- Text: `#ffffff`
- Border: `#dc3545`
- Padding: 0.375rem 0.75rem
- Radius: 0.25rem
- Font: 1rem Inter weight 400
- Hover: `#bd2130`
- Use: Destructive actions ("Delete", "Remove", "Cancel Application"). Clear warning.

**Focus State (All Buttons)**
- Box-shadow: `0 0 0 0.2rem rgba(13, 54, 52, 0.25)` (teal glow for primary; color-adjusted for other variants)
- Outline: None (rely on shadow for focus indicator to meet WCAG AA)

### Cards & Containers

**Card / Section Panel** (`card`)
- Background: `#ffffff`
- Border: 1px solid `#dee2e6`
- Radius: 0.25rem
- Padding: 1rem (16px)
- Shadow: None (flat design; elevation via border and background)
- Use: Course listings, program cards, testimonial boxes, information panels. The minimal border provides frame without heaviness.

### Inputs & Forms

**Text Input** (`input-text`)
- Background: `#ffffff`
- Text Color: `#495057` (Bootstrap default label gray)
- Border: 1px solid `#ced4da`
- Radius: 0.25rem
- Padding: 0.375rem 0.75rem
- Focus Border: `#80bdff` (Bootstrap light blue focus ring)
- Focus Box-Shadow: `0 0 0 0.2rem rgba(0, 123, 255, 0.25)`
- Placeholder: `#6c757d` (muted gray)
- Use: Email, text, search, textarea, select dropdowns. Bootstrap-standard styling ensures compatibility with existing form libraries.

**Disabled Input**
- Background: `#e9ecef`
- Opacity: 1 (no transparency fade; clear visual disabled state)
- Cursor: not-allowed

### Badges / Tags / Pills

**Default Badge** (`badge-default`)
- Background: `#ffffff`
- Text: `#212529`
- Border: 1px solid `#dee2e6`
- Radius: 0.25rem
- Padding: 0.25rem 0.4rem (4px 6px; tight)
- Font: 0.875rem Inter weight 400 (14px)
- Use: Tags, program labels ("On Campus", "EAD", "Hybrid"), status indicators.

**Primary Badge Variant**
- Background: `#0d3634`
- Text: `#ffffff`
- Border: None
- Use: Active states, featured tags.

### Navigation

**Nav Header** (`nav-header`)
- Background: `#ffffff`
- Text: `#212529`
- Border-Bottom: 1px solid `#dee2e6`
- Height: 60px (implied; typical Bootstrap navbar height)
- Use: Top navigation bar, site header. Minimal and light, ensuring focus stays on content.

**Nav Link**
- Color: `#007bff` (Bootstrap blue, standard link color)
- Hover Color: `#0056b3` (darker blue)
- Font: 1rem Inter weight 400
- Use: Navigation items, breadcrumb links.

### Decorative Elements

**Divider / Horizontal Rule**
- Border-Top: 1px solid `rgba(0, 0, 0, 0.1)` (subtle black at 10% opacity)
- Margin: 1rem 0
- Use: Section separation. The low opacity preserves flow without jarring the reader.

**Table Styling**
- Header Background: `#e9ecef`
- Header Text: `#495057`
- Body Background: `#ffffff`
- Row Borders: 1px solid `#dee2e6` (top border on each cell)
- Striped Rows (optional): `rgba(0, 0, 0, 0.05)` (5% black overlay)
- Use: Admissions tables, program comparison tables, schedules. Clean and scannable.

---

## 5. Layout Principles

### Spacing System

Base unit: **0.25rem (4px)**. The spacing scale follows Bootstrap conventions:

| Token | Size | Use |
|-------|------|-----|
| `xs` | 0.25rem (4px) | Tight gutter between inline elements |
| `sm` | 0.5rem (8px) | Form element padding, small component spacing |
| `md` | 1rem (16px) | Default padding on cards, section gaps |
| `lg` | 1.5rem (24px) | Between sections, major layout spacing |
| `xl` | 2rem (32px) | Large section spacing, hero padding |
| `xxl` | 4rem (64px) | Vertical spacing between major page sections |

**Very Roomy Spacing Philosophy**: ULBRA's design uses generous margins and padding throughout. Where a typical Bootstrap site might apply 1rem (16px) padding, this system often uses 1.5rem–2rem. This "very roomy" characteristic (apple-glass archetype) gives the site a premium, breathing feeling—appropriate for a university welcoming prospective students.

### Grid & Container

- **Container Max-Width**: 1140px (Bootstrap lg breakpoint)
- **Gutters**: 15px (Bootstrap standard, 30px total column gap)
- **12-Column Grid**: Standard Bootstrap grid (col-1 through col-12, responsive col-sm/col-md/col-lg/col-xl)
- **Hero Layout**: Full-width section (no container), with centered text and generous vertical padding (3rem–4rem top/bottom)
- **Card Grid Patterns**:
  - **3-Column** (desktop): col-lg-4 for program cards or campus listings
  - **2-Column** (tablet): col-md-6
  - **1-Column** (mobile): col-12
  - Row gap: 1.5rem–2rem between cards

### Whitespace Philosophy

Whitespace is not a constraint; it's a design decision. ULBRA's pages are deliberately uncluttered. A section of body text will sit in a 60–70% width column on desktop, with 15–20% white space on each side. Hero sections feature short headlines (5–10 words) surrounded by substantial negative space. Buttons are spaced far from form fields (0.5rem top margin minimum). This restraint reflects institutional confidence—the site doesn't need to pack every pixel with content.

### Border Radius Scale

- **`none`** (0px): Buttons, cards, form inputs. Sharp edges convey precision.
- **`sm`** (0.2rem / 3px): Image thumbnails, very subtle rounding.
- **`md`** (0.25rem / 4px): Default for most components (buttons, cards, inputs).
- **`lg`** (0.5rem / 8px): Larger containers, hero image corners (rare).
- **`xl`** (1rem / 16px): Only for very large feature containers or decorative shapes (not standard).

---

## 6. Depth & Elevation

The system intentionally avoids layered shadows and elevation stacking. Depth is achieved through _color_, _borders_, and _whitespace_, not shadow blur and offset.

| Level | Treatment | Use |
|-------|-----------|-----|
| **Flat** | No shadow; solid background | Buttons, badges, simple UI elements |
| **Outlined** | 1px border (usually #dee2e6) | Cards, form inputs, default containers |
| **Embedded** | 1px inset shadow (optional; rare) | Very rare; not in standard palette |
| **Hover** | Subtle background shift + border darkening | Button/card hover states |
| **Focus** | Box-shadow ring (0 0 0 0.2rem color-tint) | Keyboard accessibility |

**No Shadow Stacking**: Do not apply multiple box-shadows to create depth layers. A button on hover does not gain a shadow; it gains a darker background and possibly a color-tinted focus ring.

### Shadow Philosophy

ULBRA's design is fundamentally **flat**, reflecting the apple-glass archetype: surfaces are distinct via color and borders, not height. When a focus ring is needed (keyboard navigation), the system uses a subtle box-shadow ring (0 0 0 3.2px teal tint) rather than outline or thick borders. This keeps the visual language minimal and modern.

Shadows are NOT used for:
- Card elevation (cards use borders only)
- Modal depth (modals use borders + background tint)
- Floating elements (use borders)

This choice prioritizes clarity and reduces visual noise on pages serving thousands of prospective students daily.

---

## 7. Do's and Don'ts

**Do's:**
- ✅ Use dark teal (#0d3634) for primary CTAs, section headers, and brand moments
- ✅ Preserve weight 300 on display text (6rem–3.5rem); it is the brand's typographic signature
- ✅ Apply 1rem–2rem padding inside cards and sections; whitespace is part of the design
- ✅ Use 0.25rem border-radius on buttons, cards, and inputs; sharp corners convey institutional precision
- ✅ Rely on borders (#dee2e6) and background colors to define surfaces, not shadows
- ✅ Use Inter variable font across all text roles; the font is optimized for on-screen reading
- ✅ Employ the warm tan (#cca269) as a secondary accent in non-critical UI (highlights, badges)
- ✅ Center multi-line button labels (e.g., "Learn More\n(Free)") to emphasize call-to-action intent

**Don'ts:**
- ❌ Don't use Bootstrap's default blue (#007bff) as the primary brand color—that's legacy. The brand color is dark teal (#0d3634). Reserve blue for links and secondary CTAs only.
- ❌ Don't use weight 400 or 500 on display text (6rem–3.5rem). Weight 300 is non-negotiable for aspirational headlines. Weight 400 makes them feel corporate/heavy.
- ❌ Don't add drop-shadows to cards or buttons to simulate elevation. The visual language is flat; use background color and borders instead.
- ❌ Don't reduce padding below 1rem on cards. The "very roomy" spacing is part of the premium feel. Tight cards feel cramped.
- ❌ Don't use pure black (#000) for text or borders; use #212529 (body) or #6c757d (muted). Pure black is too harsh for institutional copy.
- ❌ Don't apply letter-spacing to body text or headings. Inter's design is already optically spaced; manual adjustments create awkward holes.
- ❌ Don't use border-radius > 0.5rem on standard components. Pill-shaped buttons (#9999px radius) contradict the institutional, precise visual language.
- ❌ Don't override the Inter font family for headings or body. The system is intentionally monolithic: Inter everywhere, same weights and line-heights as specified, no serif fallbacks for "elegance."
- ❌ Don't use the warm tan (#cca269) as a primary interactive color. It is decorative/secondary. Reserve it for accents, badge backgrounds, and highlight text.
- ❌ Don't stack multiple box-shadows on hover/focus states. One color-tinted focus ring is enough; additional shadows dilute clarity.

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| **Mobile** | 0–575px (xs) | 1 column, full-width cards, hamburger nav |
| **Tablet** | 576px–767px (sm) | 2-column grid, compact nav, reduced padding (0.75rem) |
| **Small Desktop** | 768px–991px (md) | 2–3 column grid, standard padding (1rem), full nav |
| **Desktop** | 992px–1199px (lg) | 3–4 column grid, 1140px container, full nav, 1.5rem padding |
| **Large Desktop** | 1200px+ (xl) | 1140px fixed container, 2rem padding, multi-column layouts |

### Touch Targets

- **Minimum Size**: 44×44px (WCAG 2.5 Criterion 2.5.5 for touch)
- **Button Height**: Typical ~40px (padding 0.375rem vertically + font size + line-height); acceptable for touch
- **Link Padding**: Links in nav should be padded to 40px+ in height on mobile
- **Form Inputs**: Height ~40px (standard)

### Collapsing Strategy

- **Navigation**: Desktop shows full horizontal nav (font-size 1rem). Mobile (< 576px) collapses to hamburger menu icon.
- **Typography Downscale** (mobile < 576px):
  - Display text: 6rem → 3.5rem or 4.5rem (do NOT reduce below 3.5rem for h1)
  - Section headings: 2.5rem → 1.75rem
  - Body: 1rem → 0.875rem or 1rem (readable on small screens)
  - Heading weight stays 500; display weight stays 300
- **Spacing Reduction** (mobile):
  - Padding: 1rem–1.5rem (on desktop) → 0.75rem (on mobile)
  - Margin: 1.5rem–2rem → 1rem
  - Card grid: col-lg-4 (desktop) → col-12 (mobile)
  - Do NOT collapse spacing below 0.5rem; maintains readability and touch-friendly gaps
- **Hero Section** (mobile):
  - Headline: Full-width, centered, 3.5rem
  - CTA Button: Full-width or 100% of container (max 400px for readability)
  - Vertical padding: 2rem (top/bottom) instead of 4rem
- **Form Inputs** (mobile):
  - Expand to 100% width of container
  - Maintain 1rem spacing between fields
  - Button: 100% width for clarity on small screens
- **Table** (mobile):
  - Wrap table in horizontal scroll container OR collapse to stacked card layout (one row = one card)
  - If scrollable, add visual cue (border-left/border-right gradient fade)

### Image Behavior

- **Hero Images**: Full-width on all breakpoints; aspect ratio maintained via CSS aspect-ratio or padding-bottom trick
- **Responsive Images**: Use `<img srcset>` or picture element with breakpoint-specific sources
- **Background Images**: Use `background-size: cover` and `background-position: center` for consistency
- **Card Images**: Scale to card width (col-lg-4 = ~33% of container); maintain aspect ratio

---

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA / Brand**: ULBRA Dark Teal (`#0d3634`)
- **Primary CTA Hover**: Dark Teal Darker (`#062926`)
- **Secondary CTA / Button**: Gray (`#6c757d`)
- **Tertiary / Link**: Bootstrap Blue (`#007bff`)
- **Link Hover**: Bootstrap Blue Dark (`#0056b3`)
- **Background / Surface**: White (`#ffffff`)
- **Card / Container**: White (`#ffffff`) with 1px border `#dee2e6`
- **Body Text**: Dark Charcoal (`#212529`)
- **Secondary Text / Muted**: Gray (`#6c757d`)
- **Border / Divider**: Light Gray (`#dee2e6`)
- **Success**: Green (`#28a745`)
- **Error / Danger**: Red (`#dc3545`)
- **Warning**: Yellow (`#ffc107`)
- **Info / Alert**: Cyan (`#17a2b8`)
- **Warm Accent / Badge**: Tan (`#cca269`)

### Example Component Prompts

1. **Hero Section (Admission)**
   > Create a hero section with white background. Headline at 6rem Inter weight 300, line-height 1.2, color #212529, center-aligned. Subheading at 1.25rem weight 300, color #6c757d, 1.5rem line-height. Primary CTA button: 1rem Inter weight 400, padding 0.375rem 0.75rem, background #0d3634, white text, 0.25rem radius, hover background #062926. Container max-width 1140px, vertical padding 4rem top/bottom, horizontal padding 2rem.

2. **Program Card**
   > Create a program card with white background, 1px border #dee2e6, 0.25rem radius, 1rem padding. Title at 1.75rem Inter weight 500, #212529. Description at 1rem weight 400, #6c757d, 1.5rem line-height. Tags below description: background #0d3634, text white, 0.25rem radius, padding 0.25rem 0.4rem, font 0.875rem weight 400. "Learn More" link, color #007bff, hover #0056b3. Card width col-lg-4 (desktop, 3-column grid), 100% (mobile).

3. **Form Group**
   > Create form field group. Label at 1rem Inter weight 400, color #212529, margin-bottom 0.5rem. Input field: 1rem font, color #495057, background white, border 1px #ced4da, radius 0.25rem, padding 0.375rem 0.75rem, placeholder color #6c757d. Focus state: border color #80bdff, box-shadow 0 0 0 0.2rem rgba(0,123,255,0.25). Submit button: background #0d3634, white text, 0.375rem 0.75rem padding, 0.25rem radius, hover #062926. Button width 100% on mobile, auto on desktop.

4. **Table (Course List)**
   > Create table with thead background #e9ecef, thead text #495057, tbody background white. Row border: 1px top border #dee2e6 on each cell. Striped rows (nth-of-type odd): background rgba(0,0,0,0.05). Cell padding 0.75rem. Header font: 1rem weight 500, color #212529. Body font: 1rem weight 400, color #212529. Links in cells: color #007bff, hover #0056b3. On mobile (< 576px), convert table to stacked card layout: each row becomes a card with data-label attributes.

5. **Navigation Bar**
   > Create navbar with white background, 1px bottom border #dee2e6, height 60px. Logo/brand text: 1.25rem Inter weight 500, color #0d3634. Nav items (desktop): 1rem weight 400, color #007bff, hover #0056b3, padding 0.75rem 1rem, displayed inline. Mobile: hamburger menu icon (3 horizontal lines, color #212529), tap to reveal dropdown menu with nav items stacked vertically. Dropdown background: white, border 1px #dee2e6, padding 0.5rem 0.

6. **Badge / Pill**
   > Create badge with background #0d3634, white text, padding 0.25rem 0.4rem, radius 0.25rem, font 0.875rem weight 400. For secondary badge variant: background #cca269 (tan), text #212529, border 1px #cca269. Display inline in card titles or course listings.

### Iteration Guide

1. **Font-Weight Law**: Display text (6rem–3.5rem) MUST be weight 300. Headings (h1–h3) are weight 500. Body is weight 400. Do not invert or swap. Weight 300 = premium/aspirational; weight 400/500 = functional.

2. **Color Hierarchy**: #0d3634 (dark teal) is for brand moments and primary CTAs. #007bff (blue) is for secondary links. #6c757d (gray) is for muted/secondary content. Gray and blue are not interchangeable with brand teal; each serves a distinct purpose.

3. **Spacing is Generous**: Default padding on cards is 1rem (16px). On mobile, reduce to 0.75rem, but never below. Margins between major sections: 1.5rem–2rem (24–32px). Whitespace is intentional and premium.

4. **Radius is Minimal**: All buttons, cards, inputs: 0.25rem (4px). This is intentional—sharp corners convey institutional precision. Do NOT apply 8px, 12px, or pill-shaped (50%) radius unless explicitly designing a decorative element outside the standard component set.

5. **No Shadows; Use Borders**: Elevation is achieved via 1px borders (#dee2e6) and background color shifts, not blur or offset shadows. Focus states use a color-tinted box-shadow ring (e.g., 0 0 0 0.2rem rgba(13, 54, 52, 0.25) for teal focus). This is flat design; no layering.

6. **Inter Variable Font**: The font is loaded once with full weight range (100–900). Use weights freely: weight 700 on badges, weight 600 on secondary CTA button labels (if emphasizing action). The font's design already handles optical spacing; do not manually adjust letter-spacing or line-height beyond the specification.

7. **Mobile-First Breakpoints**: Design mobile layout first (0–575px). Then expand to tablet (576px+), small desktop (768px+), and large desktop (992px+). Collapse navigation to hamburger at 576px. Collapse typography (6rem → 4.5rem) at 576px. Maintain 1rem+ spacing on all breakpoints; never go below 0.75rem padding on mobile.

8. **Button States**: Default button colors are specified (`#0d3634` primary, `#6c757d` secondary). On hover, darken by ~5–10% (e.g., #0d3634 → #062926). On focus (keyboard), apply a 0.2rem colored ring using box-shadow. Do NOT add multiple shadows or border changes; keep focus indicators simple.

9. **Semantic Colors for Feedback**: Success = #28a745, Danger = #dc3545, Warning = #ffc107, Info = #17a2b8. Use these consistently across forms, alerts, and status indicators. Do not redefine or swap colors; semantic colors are contract between the system and the user.

10. **Grid System**: Bootstrap 12-column grid with 15px gutters (30px gap between columns). Default container width: 1140px (max-width: 1140px on lg breakpoint). Columns: col-12 (mobile, 100%), col-md-6 (tablet, 50%), col-lg-4 (desktop, 33%). Do not use col-5 or col-7; stick to halves and thirds for predictable layouts.
