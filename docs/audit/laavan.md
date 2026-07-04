# Phase 1 Audit — laavan

**Audit date:** 2026-07-03  
**Template path:** `templates/laavan/`  
**Type:** Framer static export (Laavan / Punjabi wedding theme)  
**Auditor mode:** Read-only

---

## Executive Summary

Laavan is a well-mirrored Framer export with local images, fonts, and scripts. No `framerusercontent.com` URLs found in `index.html` or `assets/scripts/*.mjs`. Dvites buy bar, canonical URL, and OG/Twitter tags are present. Residual Framer generator comments and meta remain. Buy button links to `https://www.dvites.com/` (not `#`).

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
| `index.html` | — | No external CSS/JS CDN in head | — | Excellent |
| `index.html` | 248–249 | `https://www.dvites.com/templates/laavan` (canonical/og:url) | — | OK |
| `assets/scripts/*.mjs` | — | No external URLs detected | — | OK |
| Inline content | — | WhatsApp / maps links may exist in body copy | Low | Audit per-customer content |

### 2. Original Branding

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | 2 | `<!-- Made in Framer · framer.com ✨ -->` | Low | Remove comment in Phase 2 |
| `index.html` | 9 | `<meta name="generator" content="Framer 34801f9">` | Low | Remove generator meta |
| `index.html` | 7 | `<meta name="framer-html-plugin" content="disable">` | Low | Optional cleanup |
| `index.html` | 367–372 | Dvites buy bar + logo | — | OK |

No Framer watermark detected in visible content.

### 3. External URLs

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | 372 | Buy Now → `https://www.dvites.com/` | Low | Consider `#` for template preview consistency |
| `index.html` | 248 | Canonical → Dvites | — | OK |
| Demo couple | 10 | `Harpreet weds Ritika` | Low | Align naming with Dvites demo convention |

### 4. Analytics / Tracking

No Google Analytics, GTM, Meta Pixel, or Framer events URLs found in `index.html` or local scripts.

### 5. Forms

No third-party form actions found. RSVP appears static/link-based in Framer export.

### 6. Fonts

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | 30+ | `@font-face` → `/templates/laavan/assets/fonts/*.woff2` | — | Fully local |
| Multiple woff2 | — | EB Garamond, Inter, etc. mirrored | — | OK |

### 7. Assets

| Observation | Risk | Recommended Action |
|---|---|---|
| ~150+ local images | — | Good |
| Local `.mp3` in images folder (`1B8WN3s3RAi0hzeAazc7gIj61Ug.mp3`) | Low | Move to `assets/audio/` for clarity |
| Absolute paths `/templates/laavan/...` | Medium | Requires root hosting |

### 8. Scripts

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | — | Framer hydration modules under `assets/scripts/` | — | Self-hosted |
| `assets/scripts/searchIndex-*.json` | — | Framer search index (local) | Low | Unused for invite — optional remove |

### 9. CSS

All styles inlined or local Framer SSR CSS in `index.html`. No remote `@import`.

### 10. SEO

| Field | Value | Risk |
|---|---|---|
| Title | `Harpreet weds Ritika — Laavan Invitation` | Low |
| Description | Present | — |
| Canonical | `https://www.dvites.com/templates/laavan` | — |
| OG/Twitter | Local image paths + Dvites-aligned copy | Low |
| Favicon | Local PNG | — |
| Schema | Not found | Low | Optional add |

### 11. Security

No HTTP mixed content in `index.html`. Self-contained static export.

### 12. Redirection

No `window.location` / meta refresh found in index head. Framer runtime may handle in-page navigation only.

### 13. Local Hosting Readiness

**Strong.** Works fully self-hosted except absolute path prefix requirement. No third-party runtime CDN.

---

## Summary Verdict

One of the cleaner templates. Minor Framer metadata cleanup and path portability are main Phase 2 items.
