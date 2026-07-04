# Phase 1 Audit — oud-blossom-majlis

**Audit date:** 2026-07-03  
**Template path:** `templates/oud-blossom-majlis/`  
**Type:** Webgency / Tilda Zero Block export → Dvites conversion  
**Auditor mode:** Read-only

---

## Executive Summary

Oud Blossom Majlis has Dvites branding, local images/video/audio, and buy bar. However, **Tilda platform JS/CSS** still loads from `static.tildacdn.net` and `neo.tildacdn.com` for animations, forms, and layout. Tilda fonts load from CDN via page CSS. Google Fonts (Ovo) referenced inline. Tilda analytics removed. Visual assets are local.

---

## Scores

| Metric | Score |
|---|---|
| Dependency Cleanliness | 4/10 |
| Branding Cleanliness | 8/10 |
| SEO Readiness | 8/10 |
| Local Hosting Readiness | 6/10 |
| Production Readiness | 6/10 |
| **Overall Score** | **64/100** |

---

## Findings

### 1. External Dependencies

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | 19–53 | Multiple `static.tildacdn.net/js/tilda-*.min.js` | High | Mirror Tilda core JS locally (Phase 2) |
| `index.html` | 20–27 | `static.tildacdn.net/css/tilda-*.min.css` | High | Mirror CSS locally |
| `index.html` | 23–35 | `tilda-blocks-page146067533.min.css/js` | High | Download page-specific Tilda assets |
| `index.html` | 19 | `neo.tildacdn.com/js/tilda-fallback-1.0.min.js` | Medium | Mirror or remove |
| `index.html` | 16–17 | DNS prefetch `ws.tildacdn.com`, `static.tildacdn.net` | Low | Remove after localization |
| `index.html` | 2577 | `fonts.googleapis.com/css2?family=Ovo` | Medium | Self-host Ovo |
| `index.html` | 6760 | Comment listing Uploadcare + Tilda form deps | Medium | Forms may load Uploadcare if activated |
| Local assets | — | `./assets/images/`, `./assets/videos/`, `./assets/audio/` | — | Good |

### 2. Original Branding

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | — | No webgency.tilda.ws in runtime | — | Clean |
| `index.html` | 18 | Favicon → `./assets/images/dvites-logo.png` | — | OK |
| `index.html` | 65+ | Dvites buy bar | — | OK |
| `index-source.html` | — | Original Webgency/Tilda meta (archival) | Low | Exclude from deploy |

### 3. External URLs

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | 9, 13 | Canonical/OG → `dvites.com/templates/oud-blossom-majlis` | — | OK |
| `index.html` | 70 | Buy Now `href="#"` | — | OK |
| Demo content | — | Arabic copy Amira & Yusuf | — | OK |

### 4. Analytics / Tracking

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | — | Tilda stat script removed | — | Good |
| `index.html` | — | No Cloudflare/GTM/GA | — | OK |

### 5. Forms

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | 6760 | Tilda form deps include `uploadcare-3.x` CDN | High | Disable forms or replace with Dvites RSVP |
| `index.html` | 179 | `data-tilda-formskey="5588e262e61cf2fc3985f22bf8424802"` | Medium | Original Tilda project key — replace |

Tilda forms would submit to Tilda/Webgency infrastructure if activated.

### 6. Fonts

| Source | Risk | Recommended Action |
|---|---|---|
| Tilda page CSS → `static.tildacdn.net/tild*/...woff` | High | Download fonts from Tilda CSS |
| Google Fonts Ovo | Medium | Self-host |
| Local images | — | OK |

### 7. Assets

| Observation | Risk | Recommended Action |
|---|---|---|
| 17+ local images, 2 videos, 1 audio | — | Good |
| No thb/static image CDN in runtime HTML | — | Good |
| Relative `./assets/...` paths | — | Portable |

### 8. Scripts

Heavy Tilda JS stack (animation, lazyload, zero-block, forms). Required for opener animation and scroll effects until localized.

### 9. CSS

Tilda grid + animation + forms CSS from CDN. Inline T396 block styles in HTML (local).

### 10. SEO

| Field | Value | Risk |
|---|---|---|
| Title | `Oud Blossom Majlis — Dvites Wedding Invitation Template` | — |
| Description | Dvites preview copy | — |
| Canonical | Present | — |
| OG | Present (no og:image — removed) | Low | Add local OG image |
| Twitter | Not explicit | Low | Add |
| Favicon | Dvites logo | — |

### 11. Security

Tilda Uploadcare dependency is a third-party file upload SDK — CSP risk if forms enabled. No mixed HTTP.

### 12. Redirection

Tilda opener animation uses in-page JS. No external redirect scripts found.

### 13. Local Hosting Readiness

**Partial.** Visual media local; **layout/animation depends on Tilda CDN**. Offline preview will break without network unless Tilda assets mirrored.

---

## Summary Verdict

Best-in-class Dvites branding for a Tilda template, but still a hybrid host model. Phase 2 must mirror Tilda JS/CSS/fonts or rebuild animations natively.
