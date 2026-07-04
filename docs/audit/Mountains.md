# Phase 1 Audit — Mountains

**Audit date:** 2026-07-03  
**Template path:** `templates/Mountains/`  
**Type:** Framer static export (Mountain Indian wedding theme)  
**Auditor mode:** Read-only

---

## Executive Summary

Mountains is a large Framer SSR export (~27k lines) with extensive local assets and fonts. No external Framer CDN URLs in scripts. Dvites buy bar present. Canonical/OG point to `/demos/mountain` rather than `/templates/Mountains`. Residual Framer branding in HTML comments and generator meta. JSON-LD schema references dvites.com.

---

## Scores

| Metric | Score |
|---|---|
| Dependency Cleanliness | 8/10 |
| Branding Cleanliness | 7/10 |
| SEO Readiness | 7/10 |
| Local Hosting Readiness | 9/10 |
| Production Readiness | 7/10 |
| **Overall Score** | **76/100** |

---

## Findings

### 1. External Dependencies

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | — | No external JS/CSS CDN | — | Excellent |
| `assets/scripts/*.mjs` | — | No `framerusercontent.com` URLs | — | OK |
| `index.html` | 22929+ | `https://wa.me/919999999999` demo links | Low | Placeholder |
| `index.html` | 18289+ | `https://www.dvites.com` footer/nav links | — | OK |

### 2. Original Branding

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | 2 | `<!-- Made in Framer · framer.com ✨ -->` | Low | Remove |
| `index.html` | 19 | `<meta name="generator" content="Framer f3f9b36">` | Low | Remove |
| `index.html` | 33 | `<meta name="framer-html-plugin" content="disable">` | Low | Optional |
| `index.html` | 26980+ | Dvites buy bar | — | OK |

### 3. External URLs

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | 1389–1390 | Canonical/OG URL → `https://www.dvites.com/demos/mountain` | Medium | Align to `/templates/Mountains` |
| `index.html` | 60, 74 | OG/Twitter image → absolute dvites.com URL | Low | Consider relative local path |
| WhatsApp links | various | Demo phone numbers | Low | Personalize |

### 4. Analytics / Tracking

No GA, GTM, Meta Pixel, or Framer analytics endpoints found in index or local scripts.

### 5. Forms

Static Framer export — no third-party form submit endpoints identified.

### 6. Fonts

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | inline `@font-face` | Local `assets/fonts/*.woff2` | — | Fully mirrored |
| Multiple families | — | EB Garamond, Playfair, custom Framer fonts | — | OK |

### 7. Assets

| Observation | Risk | Recommended Action |
|---|---|---|
| Large local image/font library | — | Good |
| Local scripts under `assets/scripts/` | — | Good |
| Absolute `/templates/Mountains/` paths in some refs | Medium | Verify hosting |
| Very large single HTML file | Low | Consider build split in Phase 2 |

### 8. Scripts

Framer hydration via local `.mjs` modules. Editor bar preload guarded by `localStorage` check (lines 8–16).

### 9. CSS

Inlined Framer SSR CSS in `index.html`. No remote `@import`.

### 10. SEO

| Field | Value | Risk |
|---|---|---|
| Title | `Mountain – Indian Wedding Invitation Website Template` | Low |
| Description | Present | — |
| Canonical | `https://www.dvites.com/demos/mountain` | Medium | Path mismatch |
| OG/Twitter | Present (dvites.com image URLs) | Low |
| Schema | JSON-LD WebSite @ lines 7617+ | — | Good |
| Favicon | Local light/dark icons | — |

### 11. Security

Self-contained static site. No mixed HTTP content detected.

### 12. Redirection

No meta refresh. In-page Framer navigation only.

### 13. Local Hosting Readiness

**Strong.** Fully self-hostable. Canonical URL path inconsistency is organizational, not technical.

---

## Summary Verdict

High-quality Framer mirror. Fix canonical path alignment and strip Framer metadata for production polish.
