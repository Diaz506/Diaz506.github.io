# Copilot Instructions

## Architecture

This is a static personal portfolio site deployed to GitHub Pages (`Diaz506.github.io`). There is no build step, no package manager, and no server — just plain HTML, CSS, and vanilla JS served directly.

### Key files

- `index.html` — Single-page layout with all sections (hero, about, certs, skills, projects, experience, community, contact). Sections use `id` attributes for anchor navigation.
- `css/style.css` — All styles in one file. Uses CSS custom properties defined in `:root` for theming (dark background, Azure blue `#0078d4` accent).
- `js/main.js` — Navbar scroll effects, mobile hamburger menu, scroll-reveal animations via `IntersectionObserver`, and a particle canvas in the hero section.
- `js/i18n.js` — Bilingual EN/ES language toggle with translations **embedded inline** for `file://` compatibility.
- `i18n/en.json`, `i18n/es.json` — Canonical translation files (reference copies; the runtime reads from the embedded object in `i18n.js`).

## Internationalization (i18n)

The site supports English and Spanish. The system works as follows:

1. HTML elements use `data-i18n` attributes with dot-notation keys (e.g., `data-i18n="nav.about"`).
2. `i18n.js` contains a `translations` object with `en` and `es` keys holding the full translation tree.
3. `applyLanguage()` walks all `[data-i18n]` elements and sets their `textContent` from the translation object.
4. Language preference is persisted in `localStorage` under the key `dd-lang`.

**Important:** Translations live in two places — the JSON files under `i18n/` and the inline object in `i18n.js`. When updating text content, **update both** to keep them in sync. The runtime only reads from `i18n.js`.

## Scroll Animations

Elements with the `.reveal` CSS class are observed by an `IntersectionObserver` in `main.js`. When visible, they receive the `.visible` class. Grid children (inside `.certs-grid`, `.skills-grid`, `.projects-grid`, `.community-grid`, `.contact-links`) get staggered delays automatically.

## Conventions

- **No build tools** — changes are live once pushed. Open `index.html` directly in a browser to preview.
- **CSS custom properties** — use the existing variables in `:root` (e.g., `--accent`, `--surface`, `--text-muted`, `--radius`, `--transition`) instead of hardcoding colors or values.
- **Fonts** — Inter for body text, JetBrains Mono for monospace. Loaded from Google Fonts.
- **Responsive** — mobile-first breakpoints are in `style.css`. The hamburger menu activates on small screens.
- **Accessibility** — skip-link, `aria-label`/`aria-expanded` attributes on interactive elements, and `focus-visible` outlines are already in place. Maintain these when adding new interactive elements.
