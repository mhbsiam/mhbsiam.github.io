# mhbsiam.github.io

Personal website of Md Hasanul Banna Siam — PhD candidate in the Tyrrell Lab,
Department of Pathology, UAB Heersink School of Medicine.

Live at <https://mhbsiam.github.io>.

## Stack

Plain HTML / CSS / JS. No build step, no framework, no dependencies, no
third-party requests. `js/main.js` is ~2KB: footer year and nav scrollspy.
`js/umap.js` draws the hero figure in raw WebGL. Fonts (Bricolage Grotesque,
Newsreader) are vendored in `assets/fonts/`.

## Structure

```
/
├── index.html        # Single-page portfolio
├── cv.html           # Print-friendly CV
├── 404.html
├── .stylelintrc.json # CSS lint config; `npx stylelint "css/*.css"` must stay clean
├── css/
│   ├── tokens.css    # Every colour, type, space and motion token (OKLCH)
│   └── style.css     # The stylesheet; imports tokens.css
├── js/
│   ├── main.js       # Footer year, nav scrollspy
│   └── umap.js       # Hero figure: simulated UMAP (raw WebGL, ~250 lines)
└── assets/
    ├── siam-headshot.jpg / siam-headshot-240.jpg
    ├── og-card.jpg   # 1200x630 social card
    └── fonts/        # Bricolage Grotesque + Newsreader, latin subsets (OFL)
```

## Page sections (index.html)

Sticky top bar → Plate I hero (statement headline + WebGL UMAP with the
age-associated T cell cluster marked in chartreuse) → Plate II about
(portrait, prose, facts) → Plate III news ledger → Plate IV research
quadrants → Plate V CAFE on the inverted light band → Plate VI publications as
a reference list (full record on Google Scholar) → Plate VII record
(appointments, education, honors) → Plate VIII contact.

Design direction lives in `PRODUCT.md`; the visual system in `DESIGN.md`.

## Editing content

- **Publications**: entries are `li.ref`. Add `ref--dup` when the year repeats
  the row above (the year stays in the DOM for screen readers, visually
  hidden). Link a title only when a DOI exists. Add `<span class="ref__lead">`
  for first-author papers.
- **News**: entries are `li.ledger__row` in `#news`, newest first; same
  `--dup` convention for repeated years.
- **Colors and type**: tokens in `css/tokens.css`. Do not write raw colour
  values in `style.css`.

## Working locally

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Conventions

- Semantic, accessible HTML (one h1 per page, landmarks, skip link, WCAG AA).
- Respect `prefers-reduced-motion`; no motion for its own sake.
- No tracking, no third-party requests, no JS dependencies.
- No horizontal overflow at 320px and up.
