# Peter Sun — Portfolio Site

A static, multi-page personal website built for the TC497 portfolio
assignment at the University of Michigan, designed as a graduate-school
application website (CS Ph.D. / CS Master's target).

---

## File structure

```
portfolio_site/
├── index.html                  About Me + 3 featured project highlights
├── cv.html                     Native HTML CV (not a PDF embed)
├── research.html               Projects index (links to 3 detail pages)
├── research-temp-field.html      Project 1: 3D temperature field / SJTU
├── research-cuda.html            Project 2: CUDA convolution / EECS 471
├── research-memory-chip.html     Project 3: Memory Chip game / UM-SJTU
├── contact.html                Contact + grad-school-application framing
└── assets/
    └── style.css               Shared stylesheet (single design system)
```

All pages are reachable from all other pages via the top navigation
(About / CV / Projects / Contact), and the three project detail pages
link back to the Projects index. This satisfies the assignment's
"every page directly navigable from every other" requirement.

---

## Design choices, briefly

- **Typography**: Crimson Pro (serif, body + headings) + JetBrains Mono
  (labels, dates, code) + Inter (nav). The serif body gives an academic
  feel appropriate for a Ph.D. application.
- **Color**: Warm off-white background (`#fbfaf6`), near-black text,
  single accent color — a deep burgundy (`#7a1f1f`) — used sparingly for
  links, section labels, and figure highlights.
- **Layout**: Narrow content column (~680px) with justified text and
  hyphenation, so each line is roughly 10 words. Wider for CV (960px)
  so two-column entry headers (title / date) fit.
- **Figures**: Each project page has one inline SVG schematic
  (data pipeline diagram; optimization stack; project timeline). No
  external image dependencies — everything is hand-drawn in SVG so it's
  lightweight and editable.
- **Privacy**: No phone, no personal email, no home address, no photo.

---

## How to deploy on GitHub Pages

Since the repo is already named `petersun.github.io`, deployment is the
simple route:

1. **Upload these files** to the repo root.
   - Either drag-and-drop in GitHub's web interface,
   - Or `git init && git add . && git commit -m "initial site" &&
     git remote add origin <repo-url> && git push -u origin main`.
2. **Turn on Pages**: in the repo, go to *Settings → Pages*, set
   *Source* to "Deploy from a branch", branch `main`, folder `/ (root)`.
3. Wait 1–2 minutes. Your site will appear at
   `https://petersun.github.io/`

No build step, no dependencies — these are pure static HTML/CSS files.

---

## Reflection prompts (for the submission Google Doc)

The assignment asks for a brief reflection in a Google Doc covering:

1. **What program is this for?** → CS Ph.D. programs (Fall 2027 target),
   with CS Master's as a fallback. Research focus: self-supervised
   representation learning, computer vision, and ML systems.
2. **Skills/qualifications being demonstrated?**
   - Hands-on research experience (3D temperature field work at SJTU)
   - Systems / GPU fluency (CUDA / EECS 471)
   - Team engineering and visual design (Memory Chip)
   - Technical communication: each project page is a short technical
     write-up, demonstrating I can explain my work clearly.
3. **Specific website elements that demonstrate those skills?**
   - The three project detail pages with inline SVG figures show I can
     produce technical-document-quality writing about my own work.
   - The CV layout (left-aligned title / right-aligned date, bullet-
     pointed accomplishments) follows academic CV conventions.
   - The hierarchical structure (About → Projects → individual project
     pages) mirrors how a Ph.D. application portfolio is normally
     consumed.
   - The careful, restrained visual design signals attention to detail
     without distracting from the content — appropriate for an academic
     audience.

---

## Checklist against the assignment rubric

- [x] About-me page (`index.html`) — primarily professional, with a
      lightweight personal section at the bottom.
- [x] Native HTML CV (`cv.html`), no PDF embed, matches site styling.
- [x] Portfolio with ≥3 projects (`research-temp-field.html`,
      `research-cuda.html`, `research-memory-chip.html`).
- [x] Consistent and understandable hierarchy; top nav on every page.
- [x] Every page reachable from every other in one click.
- [x] Links between pages (e.g. CV bullets link to the matching project
      pages).
- [x] Sans-serif option for UI, justified body text in ~10-word lines.
- [x] Consistent color scheme throughout (single accent, neutral base).
- [x] Tight line spacing (~1.5).
- [x] Real headings (not just bigger paragraph text).
- [x] Figures (SVG schematics) supporting the argument of each project
      page.
- [x] No personal contact info / photo in the public-facing version.

---

## To submit as a single combined PDF

The assignment also asks for a PDF snapshot of every page combined.
Easiest way:

1. Open each `.html` file in Chrome.
2. `Cmd/Ctrl + P` → *Save as PDF* for each page.
3. Combine the PDFs (Adobe Acrobat online, `pdftk`, or
   <https://www.ilovepdf.com/merge_pdf>) in this order:
   `index → cv → research → research-temp-field → research-cuda →
   research-memory-chip → contact`.

The print stylesheet in `assets/style.css` strips the nav and footer
for a cleaner print, so the PDF will look reasonable.
