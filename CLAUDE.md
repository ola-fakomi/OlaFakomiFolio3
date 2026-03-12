# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server at http://localhost:5173
npm run build     # Production build (outputs to dist/)
npm run preview   # Preview production build locally
```

## Architecture

This is a single-page portfolio site for Ola Fakomi (product designer & developer). The entire site lives in one file: **`index.html`** — all HTML, CSS, and JavaScript are inline. There is no component framework, no separate CSS files, and no JS modules.

**Vite** is used purely as a dev server and build tool (no plugins configured). The `vite.config` file does not exist — defaults apply.

### CSS structure (inside `<style>` in `index.html`)

CSS is written in order of page flow, with sections delimited by comments:

- `:root` — design tokens (colors, radii, nav height, max-width)
- Custom cursor, noise overlay, nav
- Hero (`#home`) — avatar, text block, skill chips, experience card, CTA buttons
- Section shared styles (`.section-label`, `.section-title`, `.section-header`)
- Selected Projects (`#work`) — `.sp-*` prefix
- Clients (`#clients`) — `.clients-*` and `.client-*` prefixes
- About (`#about`) — `.about-*` prefix
- Contact/Footer (`#contact`) — `.footer-*` prefix
- Mobile nav, scroll reveal, responsive breakpoints

### Key design tokens

| Token | Value |
|---|---|
| `--bg` | `#191919` |
| `--blue` | `#4837f3` |
| `--red` / accent | `#ff7974` |
| `--max-w` | `1200px` |
| Content max-width | `832px` (used on all section wrappers) |
| Fonts | `Unbounded` (display/headings), `DM Sans` (body) |

### Images (`images/`)

All local assets — reference by relative path from `index.html`:

| Path | Used in |
|---|---|
| `images/hero/Experience_BG.png` | Experience card background |
| `images/about/AboutBG.png` | About hero card background |
| `images/about/about_headshot.png` | About headshot |
| `images/clients/Clients_BG.png` | Clients card background |
| `images/footer/FooterBG.png` | Footer background clouds |
| `images/projects/Roots_displayImage.png` | The Roots project card |
| `images/projects/Revwit_displayImage.png` | Revwit project card |
| `images/projects/Trib_displayImage.png` | Trib project card |

Figma MCP asset URLs (`https://www.figma.com/api/mcp/asset/...`) are used for icons and small decorative SVGs that don't have local equivalents yet.

### JavaScript (inline at bottom of `index.html`)

Three behaviours, all vanilla JS:
1. **Custom cursor** — dot + lagged ring following mouse
2. **Mobile nav** — hamburger toggle for `<810px`
3. **Scroll reveal** — `IntersectionObserver` adds `.visible` to `.reveal` elements

### Branches

- `main` — production
- `ExactDesign` — active development branch; merge into main when ready
