# Shaik Afzal Hussain — Portfolio (V2)

This repository contains the public portfolio website for Shaik Afzal Hussain (Cloud & AI Engineer). It showcases professional experience, technical skills, selected projects, and certifications. The site is a lightweight, responsive static website built with plain HTML, CSS and vanilla JavaScript.

---

## Features (V2)

- Clean, responsive single-page layout (Hero, About, Experience, Skills, Projects, Certificates, Education, Contact).
- Light / Dark theme toggle (preference persisted to localStorage).
- Updated Technical Skills with an expanded Artificial Intelligence (AI) section and matching skill badges.
- Projects section updated with additional project entries and links to source/live demos.
- Certificates section with verification links and badge images.
- Typing animation for the hero name.
- Mobile-first responsive design and subtle UI animations (hover, card shadows, transitions).
- Accessibility-minded: semantic markup and focus outlines.

---

## Files of interest

- `index.html` — main HTML page.
- `styles.css` — global stylesheet using CSS variables for theming.
- `script.js` — UI interactions (theme toggle, smooth scroll, active section highlighting, duration rendering, typing animation, small helpers).
- `assets/` — images, icons, and placeholder SVGs used throughout the site.

---

## Quick local preview

You can preview this static site locally with a simple HTTP server. From the repository root run:

```bash
# macOS / Linux (python built-in server)
python3 -m http.server 8000

# then open in your browser
http://localhost:8000
```

This avoids issues with loading certain assets and ensures the site behaves like it would when hosted.

---

## Deploy to GitHub Pages

This site is a static site and can be deployed to GitHub Pages from the `main` branch (or a dedicated `gh-pages` branch). Example steps:

```bash
# ensure committed changes
git add -A
git commit -m "chore: release v2"
# push to GitHub
git push origin main
```

Then in your repository settings on GitHub enable GitHub Pages and choose the `main` branch (root) as the publishing source.

---

## Development notes & customization

- Theme: `styles.css` defines CSS variables in the `:root` and `.dark-theme`. Tweak colors by editing those variables.
- AI / skills badges: placeholder SVGs live in `assets/`. Replace them with official logos (preserve file names or update `index.html` references).
- Typing animation: controlled in `script.js` (search for `typed-name` and the small typing routine). Adjust speed or disable if needed.
- Removed experimental 3D character: older V1 code included a Three.js animated character. That feature has been removed in V2 to simplify performance and maintenance.

---

## Changelog (V2)

- v2.0.0 — Major content and UI refresh:
  - Theme toggle with persistence.
  - Reworked AI skills block (clean, multiline list) and extended skill badges row.
  - Added 3 new projects and updated project descriptions + links.
  - Restored and expanded Certificates section with verify links.
  - Rewrote About section and highlights.
  - Removed 3D animated character and related assets for lighter performance.

---

## Troubleshooting

- 404 on assets: make sure `assets/` files exist and you’re serving from the project root.
- Git push rejected: this repo may have upstream commits. Use `git fetch` then `git.pull --rebase origin main` (or create a feature branch and open a PR).
- Large file errors: avoid checking in files larger than 100MB. Use Git LFS if you must store large binaries.

---

## License

This repository is released under the MIT License. See `LICENSE` if present.

---

## Contact

Shaik Afzal Hussain — safzalhussain3@gmail.com

LinkedIn: https://www.linkedin.com/in/afzal-hussain1/

GitHub: https://github.com/shaikafzalhussain

---

If you'd like me to add more details (automated build steps, a small CI workflow for deploying to Pages, or a screenshots/preview section), tell me which format you prefer and I’ll add it.
