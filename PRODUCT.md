# Design Context — mhbsiam.github.io

## Design Context

### Users
Personal academic portfolio of Md Hasanul Banna Siam, PhD candidate in
Cardiovascular Immunology (Tyrrell Lab, UAB). Visitors are principal
investigators, potential collaborators, hiring committees and fellow
scientists. They arrive after a talk, a conference conversation or a paper
lookup and want to quickly understand: who is this person, what do they
research, what have they published, and how to get in touch.

### Brand Personality
Warm, personal, credible. A budding researcher with a human voice, not a lab
machine. The site should read like a well-kept record: calm, confident,
welcoming. The tone of the copy is first person ("Hi, I am Siam." / "Say
hello."); the visual register is austere and editorial so the copy can be warm.

### Aesthetic Direction
- **Concept**: "Ink plate". A plate from an anatomy atlas: deep blue-black
  ground, chalk type, hairline rules, one chartreuse mark. Sections are
  numbered Plate I to VIII. The CAFE software feature is the positive print
  (the same plate inverted to chalk paper).
- **Theme**: Dark ground by design, not by default. The scene: a PI opening
  the link from a conference email on a laptop in a dim seminar room; the
  page should feel like a printed figure, not a dashboard. No glow, no neon.
- **Typography**: Bricolage Grotesque (variable; condensed for display,
  full-width for labels) and Newsreader (variable roman + italic) for prose.
  Both self-hosted.
- **Palette**: Tinted blue-black ink, warm chalk, one chartreuse mark
  `oklch(87% 0.19 118)`. Olive stands in for chartreuse on the light band.
  All colours in OKLCH, defined once in `css/tokens.css`.
- **Anti-references**: "Techy" developer portfolios with glowing accents,
  WebGL scroll narratives, sterile clinical aesthetics, gradient text,
  glassmorphism, AI-slop card grids, multi-accent channel systems, pill
  buttons and tag chips.

### Design Principles
1. **Calm over spectacle**: one live figure (the hero UMAP), one page-load
   reveal, nothing scroll-driven. JavaScript stays small and optional.
2. **Content is the design**: the record (publications, experience) carries
   the page; hairlines and type do the structuring, never cards.
3. **One mark, used sparingly**: chartreuse only where it points at something
   (the cluster, the current section, a first-author credit).
4. **Accessible by default**: WCAG AA contrast on every pair, 46px touch
   targets, visible focus rings, reduced-motion support, semantic HTML, one
   h1 per page, no horizontal scroll from 320px up.
5. **Zero-build simplicity**: plain HTML/CSS/JS from the repo root on GitHub
   Pages. No dependencies, no third-party requests.

### Page structure (index.html)
Sticky top bar (short mark + name, anchor links with scrollspy underline) →
Plate I hero (condensed statement + italic clause, lede, two buttons; WebGL
UMAP on the right with the age-associated cluster in chartreuse, leader line,
label and `Fig. 1` caption) → Plate II about (mounted portrait, prose with a
drop cap, facts table) → Plate III news ledger → Plate IV research quadrants
I–IV → Plate V CAFE on the inverted plate band (wordmark, copy, numbered
pipeline, citation) → Plate VI publications as a reference list → Plate VII
record (appointments, education, honors) → Plate VIII contact (email as a
headline, link row) → footer.
Secondary pages: cv.html (print-friendly, numbered sections), 404.html.
