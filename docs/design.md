# Design System & Guidelines: Discover Oroquieta

A modern tropical editorial aesthetic for the Discover Oroquieta tourism web application — clean, breathable, nature-inspired, and premium. No generic portal clutter.

## 1. Aesthetic Vision & Tone

- **Vibe:** Modern Tropical Minimalist — clean, breathable, editorial, nature-inspired.
- **Mood:** Inviting, reliable, premium yet accessible.
- **Visual Anchor:** High-contrast organic emerald greens, sunlit sand-gold accents, and clean warm-linen backdrops.
- **Feel:** Serif editorial headlines over generous whitespace, rounded-2xl cards with crisp micro-borders, smooth hover image zooms, and subtle card elevation lifts.

---

## 2. Color Palette

Tailwind v4 token mapping (defined in `@theme` in `src/app/globals.css`):

| Token             | Hex       | Usage                                |
| ----------------- | --------- | ------------------------------------ |
| `--bg-canvas`     | `#FBFBFA` | Warm linen page background           |
| `--surface-card`  | `#FFFFFF` | Pure white card elevation            |
| `--text-primary`  | `#121814` | Deep slate/forest text               |
| `--text-muted`    | `#58635C` | Subdued foliage gray (body/secondary)|
| `--primary`       | `#1A4D2E` | Lush Oroquieta palm green (primary)  |
| `--primary-hover` | `#133A22` | Primary hover state                  |
| `--accent-warm`   | `#E8AA42` | Coastal golden sunset (accent)       |
| `--accent-soft`   | `#E8EFE9` | Pale sage badge/pill fill            |
| `--border-subtle` | `#E5E9E6` | Fine card/border dividers            |

### Rules

- **One accent:** Sand Gold `#E8AA42` is the single warm accent; Forest Green `#1A4D2E` is the primary. No other accent colors introduced.
- **Contrast:** Body text uses `--text-primary` (near-black) or `--text-muted`; both pass WCAG AA against the warm linen canvas.
- **Warm neutrals only.** No cool grays/slate-blue substitution; stay in the warm linen/green/sage family.

---

## 3. Typography

| Role                  | Font                | Weight(s)          |
| --------------------- | ------------------- | ------------------ |
| Hero & Section headings | **Playfair Display** (editorial serif) | 500, 600, 700 |
| Body / UI             | **Plus Jakarta Sans** (clean sans)     | 400, 500, 600, 700 |

- Loaded via `next/font/google` (self-hosted, `font-display: swap`), mapped to Tailwind `font-display` and `font-sans` tokens.
- Headlines: tight tracking, generous line-height; serif italic for a single emphasized word in a headline (same family, no mixed-family emphasis).
- Body: `leading-relaxed`, max-width `65ch`.
- Buttons, nav, labels, eyebrows: Plus Jakarta Sans, weight 600-700.

---

## 4. Layout Guidelines

- **Whitespace:** Generous section spacing (`py-20 md:py-28`); content contained in `max-w-7xl mx-auto px-6`.
- **Cards:** `rounded-2xl`, white surface, `border border-[#E5E9E6]`, subtle shadow that reads as a lift on hover.
- **Imagery:** Smooth hover image zoom (`scale-105` on inner image, overflow-hidden wrapper), aspect ratios reserved to avoid CLS.
- **Corners/radius scale (locked):** Cards `rounded-2xl`, buttons/pills full-rounded, small chips `rounded-full`. Consistent across the app.
- **Sections:** Mix layout families — asymmetric hero, bento feature grid, full-width image band, split list. Avoid repeated same-shape rows.
- **Motion:** Fade/slide reveals on scroll, subtle elevation on hover, image zoom. Respect `prefers-reduced-motion`.
- **Mobile:** All grids collapse to a strict single column below `md`; nav collapses to a drawer with a menu toggle.

---

## 5. Image & Media Style (AccordionGallery)

Destinations and editorial imagery use the **React Bits AccordionGallery** component (`src/components/AccordionGallery.tsx` + `AccordionGallery.css`, GSAP-powered).

- **Presentation:** A single expandable row of image panels. The active panel expands and settles flat; collapsed panels tilt back (`rotateY`/`rotateX`) and desaturate to grayscale with a soft dim, so the featured image always carries full colour.
- **Interaction:** Hover (desktop), tap, and keyboard focus all expand a panel; arrow keys navigate between panels.
- **Motion:** GSAP timeline with `power3.out` easing, internal image parallax drift as panels resize, and a staggered caption reveal on the active panel. Honours `prefers-reduced-motion` (collapses to static).
- **Theme tokens applied:**
  - Caption accent bar & focus ring → **Sand Gold `#E8AA42`** (`--ag-accent`)
  - Legibility gradient / dimming → **Forest Green `#1A4D2E`** (`--ag-overlay`)
  - Caption text → white (`--ag-text`)
- **Defaults in this project:** `radius 20px`, `gap 12px`, `expandRatio 0.52`, `parallax 0.4`, `tilt 6`, `grayscale on`.
- **Responsive:** Below `520px` the row collapses to a stacked column (no 3D, `height: auto`).
- **Usage:** Props follow the component table (`items`, `defaultIndex`, `accentColor`, `overlayColor`, `textColor`, `grayscale`, `showLabels`, `duration`, `ease`, `parallax`, `tilt`, `stagger`, `trigger`, `height`, `gap`, `radius`, `expandRatio`, `orientation`, `className`).

> Tune `--ag-accent` and `--ag-overlay` here to keep every gallery on-brand — one sand accent, one forest overlay, per the palette lock.

---

## 6. Design Tokens (Tailwind v4)

Defined in `@theme inline` within `src/app/globals.css`:

```css
@theme inline {
  --color-canvas: var(--bg-canvas);
  --color-card: var(--surface-card);
  --color-forest: var(--primary);
  --color-forest-dark: var(--primary-hover);
  --color-sand: var(--accent-warm);
  --color-sage: var(--accent-soft);
  --color-ink: var(--text-primary);
  --color-muted: var(--text-muted);
  --color-border-subtle: var(--border-subtle);
  --font-display: var(--font-playfair);
  --font-sans: var(--font-jakarta);
}
```

Usage example: `bg-canvas`, `text-ink`, `bg-forest`, `text-sand`, `bg-sage`, `border-border-subtle`, `font-display`.