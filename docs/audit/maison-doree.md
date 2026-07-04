# Phase 1 Audit — maison-doree

**Audit date:** 2026-07-03  
**Template path:** `templates/maison-doree/`  
**Type:** The Digital Yes / React SPA export (Maison Dorée theme)  
**Auditor mode:** Read-only

---

## Executive Summary

Maison Dorée is a compact React template with locally mirrored visual assets (video, images, audio). However, it depends on **Adobe Typekit** and **Google Fonts** at runtime. A fetch shim blocks Supabase/Stripe/TheDigitalYes calls. SEO tags are minimal. No canonical or Open Graph in `index.html`.

---

## Scores

| Metric | Score |
|---|---|
| Dependency Cleanliness | 5/10 |
| Branding Cleanliness | 8/10 |
| SEO Readiness | 4/10 |
| Local Hosting Readiness | 7/10 |
| Production Readiness | 6/10 |
| **Overall Score** | **58/100** |

---

## Findings

### 1. External Dependencies

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | 11 | `https://use.typekit.net/jzm0juw.css` | High | Download/license fonts; self-host |
| `index.html` | 12–15 | Google Fonts (Cormorant Garamond, Inter, Montserrat) | Medium | Mirror WOFF2 locally |
| `assets/data/local-runtime.js` | 11–17 | Stubs for `supabase.co`, `stripe.com`, `thedigitalyes.com` | Medium | Remove dead SDK code from bundle |
| `assets/index-CqO5qALc.js` | 241+ | Embedded Supabase client library | High | Invite-only rebuild |
| `mirror.js` | 12 | Original origin `thedigitalyes.com` (tooling only) | Low | Not in runtime |

### 2. Original Branding

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | 6–7 | Dvites-oriented title/description | — | OK |
| `index.html` | 9 | Favicon uses template monogram (not TDY logo) | — | OK |
| `index.html` | 24–30 | Dvites buy bar | — | OK |
| `assets/data/local-runtime.js` | 37 | `thedigitalyes.com` intercept | Medium | Document; remove from bundle |

No visible "The Digital Yes" footer in index.

### 3. External URLs

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | 30 | Buy Now `href="#"` | — | OK |
| `index.html` | — | Missing canonical / OG | Medium | Add Dvites template meta |

### 4. Analytics / Tracking

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `assets/data/local-runtime.js` | 47–50 | `window.fbq` and `window.gtag` stubbed to no-ops | Medium | Good defense; remove callers from bundle |

No active pixel scripts in `index.html`.

### 5. Forms

RSVP handled in React bundle locally. Supabase/Stripe calls stubbed — no live submit endpoints in demo mode.

### 6. Fonts

| Source | Risk | Recommended Action |
|---|---|---|
| Adobe Typekit (`jzm0juw`) | High | Requires Adobe subscription/licensing for production |
| Google Fonts | Medium | Self-host |

No local `@font-face` in index (unlike Framer templates).

### 7. Assets

| Observation | Risk | Recommended Action |
|---|---|---|---|
| Local MP4 (hero, intro), WEBM, MP3, PNG | — | Excellent |
| Small footprint (~32 files excl. tooling) | — | Good |
| Absolute `/templates/maison-doree/` paths | Medium | Hosting path dependency |

### 8. Scripts

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | 17–18 | `local-runtime.js` + `index-CqO5qALc.js` | — | Core |
| `local-runtime.js` | 2–4 | `history.replaceState` to `/` | Low | Document for subpath hosting |

### 9. CSS

Local `index-B32MlQA-.css` + external Typekit + Google Fonts.

### 10. SEO

| Field | Value | Risk |
|---|---|---|
| Title | `Maison Dorée — Diana & Richard Wedding Invitation` | — |
| Description | Dvites demo copy | — |
| Canonical | **Missing** | Medium |
| OG/Twitter | **Missing** | Medium |
| Favicon | Local monogram | — |

### 11. Security

Fetch shim prevents third-party calls in demo. Embedded Supabase code in bundle is dead weight / risk if re-enabled.

### 12. Redirection

`local-runtime.js` rewrites pathname to `/` on load.

### 13. Local Hosting Readiness

**Partial.** Visual assets local; **fonts require Typekit + Google CDN**. Small bundle but external font dependency blocks full offline hosting.

---

## Summary Verdict

Visually self-hosted and Dvites-branded, but font stack is the main blocker for full local hosting. SEO and bundle cleanup needed for production.
