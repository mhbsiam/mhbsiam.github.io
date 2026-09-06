---
name: mhbsiam.github.io
description: "Ink plate": a dark academic portfolio read as a numbered atlas plate. Blue-black ground, chalk type, one chartreuse mark.
colors:
  ink: "oklch(16% 0.022 262)"
  ink-2: "oklch(19.5% 0.022 262)"
  ink-3: "oklch(26% 0.02 262)"
  ink-4: "oklch(36% 0.018 262)"
  chalk: "oklch(94% 0.012 90)"
  chalk-2: "oklch(77% 0.014 85)"
  chalk-3: "oklch(64% 0.014 85)"
  accent: "oklch(87% 0.19 118)"
  accent-dim: "oklch(72% 0.15 118)"
  plate: "oklch(93% 0.014 90)"
  plate-2: "oklch(89% 0.016 90)"
  plate-ink: "oklch(18% 0.02 262)"
  plate-ink-2: "oklch(42% 0.018 262)"
  plate-rule: "oklch(80% 0.014 90)"
  plate-accent: "oklch(42% 0.13 122)"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(3rem, 1.2rem + 5.6vw, 6.6rem)"
    fontWeight: 700
    fontStretch: "76%"
    lineHeight: 0.92
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Bricolage Grotesque, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.2rem, 1.6rem + 2.4vw, 3.6rem)"
    fontWeight: 600
    fontStretch: "82%"
    lineHeight: 0.98
  body:
    fontFamily: "Newsreader, Iowan Old Style, Charter, Georgia, serif"
    fontSize: "clamp(1.06rem, 1rem + 0.25vw, 1.22rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Bricolage Grotesque, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 600
    letterSpacing: "0.16em"
rounded:
  base: "2px"
components:
  button-solid:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    rounded: "{rounded.base}"
    padding: "0.6rem 1.25rem"
    height: "46px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.chalk}"
    borderColor: "{colors.ink-4}"
    rounded: "{rounded.base}"
---

# Design System: mhbsiam.github.io

## 1. Overview

**Creative North Star: "The Ink Plate"**

The site reads like a plate from an anatomy atlas: a deep blue-black ground,
chalk type, hairline rules, and a single chartreuse mark that always points at
the thing that matters (the age-associated T cell cluster, the current nav
item, a first-author credit). Every section is a numbered plate (Plate I to
VIII). The CAFE section is the positive print: the same plate inverted to
chalk paper with ink type.

**Key characteristics:** dark ground, condensed grotesk display with a
Renaissance-style serif for prose; numbered plates instead of eyebrow tags;
hairline-ruled ledgers and reference lists instead of cards; one inverted band;
one live figure (the WebGL UMAP) and no other motion beyond a page-load reveal.

## 2. Colors

All values are OKLCH and live in `css/tokens.css`. Nothing is pure black or
pure white; every neutral is tinted (blue for ink, warm for chalk).

### Ground
- **Ink** `oklch(16% 0.022 262)`: page ground. **Ink-2** raised surfaces
  (ghost button hover). **Ink-3** hairlines. **Ink-4** firm rules, ghost
  borders, the large ghosted roman numerals.

### Type on ink
- **Chalk** `oklch(94% 0.012 90)`: headings, primary text.
- **Chalk-2**: prose, secondary text. **Chalk-3**: labels, dates, captions
  (small text passes AA against ink at 5.4:1).

### The one mark
- **Chartreuse** `oklch(87% 0.19 118)`: the marked UMAP cluster, plate
  numerals, solid buttons, nav scrollspy underline, first-author markers,
  drop cap, email underline, focus ring. It is never used as a background
  wash; it is a mark, not a theme.

### The positive print (CAFE band)
- **Plate** `oklch(93% 0.014 90)` with **plate-ink**, **plate-ink-2**,
  **plate-rule** and **plate-accent** (a dark olive that keeps the chartreuse
  hue family legible on light ground).

### Named rules
**The One Mark Rule.** Chartreuse is the only chromatic colour on ink. Where
it would fail contrast (on the plate band) the olive `plate-accent` stands in.

**The One Print Rule.** Exactly one inverted band per page. It is the CAFE
feature; nothing else gets inverted.

## 3. Typography

**Display and labels:** Bricolage Grotesque (variable: opsz, wdth, wght),
self-hosted. Headlines run condensed (`font-stretch` 75–84%) and tight;
labels run at 100% width, uppercase, 0.16em tracking.

**Prose:** Newsreader (variable, roman and italic), self-hosted. Body sits at
opsz 18; publication titles at opsz 24; the hero's italic clause at opsz 72.

### Hierarchy
- **Display** (700, 76% width, up to 6.6rem, 0.92): hero statement. Second
  clause in Newsreader italic at 0.58em.
- **Wordmark** (800, 75% width, up to 15rem): the CAFE wordmark only.
- **Headline** (600, 82% width, 2.2–3.6rem): plate titles, always ending in a
  period.
- **Body** (400, 1.06–1.22rem, 1.6): prose, 38rem measure.
- **Label** (600, 0.72rem, 0.16em, uppercase): plate numbers, kickers,
  captions, table headers.

## 4. Surface and depth

Flat. Structure comes from hairlines (`--rule`, `--rule-firm`), not from
shadows or containers. There are no cards. A fixed 4.5%-opacity SVG grain
sits over the whole page so the ink has tooth.

## 5. Components

- **Top bar**: sticky, solid ink, hairline below. Short mark "Siam" + full
  name in label caps; links right; the section in view carries a 2px
  chartreuse underline (scrollspy). Links scroll horizontally on small
  screens behind a fade.
- **Buttons**: 2px radius, 46px min height, Bricolage 600. Solid = chartreuse
  fill / ink text (hover: chalk). Ghost = hairline `ink-4` border (hover:
  `ink-2` fill). Inverted on the plate band.
- **Plate head**: `Plate N` in chartreuse + section word in chalk-3, stacked
  above the headline. Never side-by-side with the title.
- **Hero figure**: the WebGL UMAP (`js/umap.js`), chartreuse cluster with a
  1px leader line to an uppercase label; `Fig. 1` caption. Static
  radial-gradient fallback without WebGL; one frame under reduced motion.
- **Portrait**: 4:5, 25% desaturated, mounted with a 1px `ink-4` outline
  offset 10px like a plate mount.
- **Facts table**: definition list with hairline rows; keys in label caps.
- **Ledger** (news): large condensed year numeral, title + link, description
  in a third column on wide screens. Repeated years collapse to a short dash.
- **Quadrants** (research): 2x2 grid divided by hairlines, ghosted roman
  numerals I–IV in `ink-4` at 300 weight.
- **Steps** (CAFE pipeline): numbered 01–04 in olive, hairline rows.
- **Reference list** (publications): year gutter, Newsreader titles (linked
  only where a DOI exists), Bricolage author lines with the owner in bold,
  `◆ First author` in chartreuse, italic topic in a right column on wide.
- **Record**: three-column appointment rows (when / role / bullets) via
  subgrid; Education and Honors as two hairline tables side by side.
- **Contact**: email set as a display headline with a 3px chartreuse
  underline; external links as a plain row with ↗.

## 6. Motion

One page-load reveal on the hero (opacity + 14px rise, staggered 90ms, 900ms
`--ease-out`). The UMAP drifts slowly and answers the pointer. Nav underline
scales in over 320ms. Everything else is a 160ms colour transition.
`prefers-reduced-motion` collapses all of it.

## 7. Do's and Don'ts

### Do
- Keep the mark rare. If chartreuse appears more than a handful of times in a
  viewport, something is wrong.
- Separate with hairlines, not boxes.
- End plate titles with a period.
- Link publication titles only when a DOI exists.

### Don't
- Don't add a second chromatic accent, gradients, glows, or glass.
- Don't add cards, pills, or icon-above-heading grids.
- Don't add a second inverted band.
- Don't invent DOIs, dates, or metrics.
