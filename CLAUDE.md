# CLAUDE.md

Personal website of Md Hasanul Banna Siam (mhbsiam.github.io) — GitHub Pages
user site. Plain HTML/CSS/JS, no build step. See README.md for structure and
local preview.

## Design Context

### Users
Personal academic portfolio of Md Hasanul Banna Siam, PhD candidate in
Cardiovascular Immunology (Tyrrell Lab, UAB). Visitors are principal
investigators, potential collaborators, hiring committees and fellow
scientists who want to quickly understand: who is this person, what do they
research, what have they published, and how to get in touch.

### Brand Personality
Warm, personal, credible. A budding researcher with a human voice. Calm,
confident, welcoming copy inside an austere, editorial frame.

### Aesthetic Direction
- **Concept**: "Ink plate". An anatomy-atlas plate: deep blue-black ground,
  chalk type, hairline rules, one chartreuse mark. Sections are numbered
  Plate I–VIII; the CAFE feature is the single inverted (light) band.
- **Typography**: Bricolage Grotesque (condensed display, labels) and
  Newsreader (prose), self-hosted variable fonts in `assets/fonts/`.
- **Palette**: OKLCH tokens in `css/tokens.css`. Tinted blue-black ink, warm
  chalk, chartreuse `oklch(87% 0.19 118)` as the only chromatic accent on
  ink; olive stands in on the light band.
- **Anti-references**: Glowing dark "techy" portfolios, WebGL scroll
  narratives, sterile clinical aesthetics, gradient text, glassmorphism,
  AI-slop card grids, pills and chips, multi-accent systems.

### Design Principles
1. **Calm over spectacle** — one live figure (hero UMAP), one page-load
   reveal, no scroll-driven animation.
2. **Content is the design** — hairlines and type structure the page; no cards.
3. **One mark, used sparingly** — chartreuse only where it points at something.
4. **Accessible by default** — WCAG AA contrast, 46px targets, visible focus,
   reduced-motion support, semantic HTML, no horizontal scroll from 320px.
5. **Zero-build simplicity** — plain HTML/CSS/JS, no dependencies, no
   third-party requests.

Full system in `DESIGN.md`; product context in `PRODUCT.md`.
