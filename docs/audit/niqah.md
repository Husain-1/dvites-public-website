# Phase 1 Audit — niqah

**Audit date:** 2026-07-03  
**Template path:** `templates/niqah/`  
**Type:** Framer static export (Niqah / Islamic wedding theme)  
**Auditor mode:** Read-only

---

## Executive Summary

Niqah is a comprehensive Framer export similar to laavan: local assets, local fonts, Dvites buy bar, and complete SEO meta pointing to `dvites.com/templates/niqah`. Residual Framer comment/generator meta remain. Instagram footer links to `@dvites`. No external Framer CDN runtime detected.

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
| `index.html` | — | No external CSS/JS CDN | — | Excellent |
| `assets/scripts/*.mjs` | — | No remote URLs | — | OK |
| `index.html` | 4987+ | `https://www.instagram.com/dvites/` | — | Intentional Dvites link |

### 2. Original Branding

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | 2 | `<!-- Made in Framer · framer.com ✨ -->` | Low | Remove |
| `index.html` | 10 | `<meta name="generator" content="Framer 5cc8ebe">` | Low | Remove |
| `index.html` | 7905+ | Dvites buy bar | — | OK |
| `assets/images/dvites-loogo.png` | — | Typo in filename (`loogo`) | Low | Rename in Phase 2 (not audit fix) |

### 3. External URLs

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | 292–293 | Canonical/OG → `dvites.com/templates/niqah` | — | OK |
| `index.html` | 7910 | Buy Now → `https://www.dvites.com/` | Low | Consider `#` for preview |
| Footer links | 7794+ | Multiple `dvites.com` links | — | OK |

### 4. Analytics / Tracking

None found in runtime files.

### 5. Forms

Static export — no third-party form endpoints.

### 6. Fonts

Fully local `@font-face` rules → `/templates/niqah/assets/fonts/*.woff2`.

### 7. Assets

| Observation | Risk | Recommended Action |
|---|---|---|
| Extensive local image library | — | Good |
| Large HTML (~8k lines) | Low | Acceptable |
| Absolute path prefix | Medium | Hosting dependency |

### 8. Scripts

Local Framer modules in `assets/scripts/`. No dynamic imports to external domains.

### 9. CSS

Inlined Framer SSR CSS. No remote backgrounds.

### 10. SEO

| Field | Value | Risk |
|---|---|---|
| Title | `Fardeen Weds Zarin — Niqah Invitation` | — |
| Description | Present | — |
| Canonical | Dvites template URL | — |
| OG/Twitter | Local image paths | — |
| Favicon | Local | — |

### 11. Security

Clean static export. HTTPS external links only (Instagram, Dvites).

### 12. Redirection

None in head. Standard Framer in-page behavior.

### 13. Local Hosting Readiness

**Strong.** Fully self-hostable with path prefix.

---

## Summary Verdict

Production-viable Framer template with minor metadata cleanup needed.
