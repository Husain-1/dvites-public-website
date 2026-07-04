# Phase 1 Audit — balcony-seaview

**Audit date:** 2026-07-03  
**Template path:** `templates/balcony-seaview/`  
**Type:** WooWowInvites / Vite SPA export (Seaview Balcony theme)  
**Auditor mode:** Read-only

---

## Executive Summary

Balcony Seaview is a large React/Vite single-page application with locally mirrored theme assets and a Supabase API shim (`local-runtime.js`). The visible invitation works offline-ish, but the bundle still ships hundreds of admin/marketing chunks and tracking modules from the original WooWowInvites platform. Google Fonts are loaded externally. SEO metadata is minimal (no canonical, no Open Graph).

---

## Scores

| Metric | Score |
|---|---|
| Dependency Cleanliness | 4/10 |
| Branding Cleanliness | 6/10 |
| SEO Readiness | 4/10 |
| Local Hosting Readiness | 6/10 |
| Production Readiness | 5/10 |
| **Overall Score** | **50/100** |

---

## Findings

### 1. External Dependencies

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | 11–16 | `https://fonts.googleapis.com`, `https://fonts.gstatic.com` | Medium | Self-host or subset fonts used by this theme only |
| `index.html` | 18–20 | `/templates/balcony-seaview/assets/...` (absolute root paths) | Medium | Confirm hosting serves from site root; relative paths safer for portable deploy |
| `assets/data/local-runtime.js` | 28 | `kdcyugwruypwrmtllswt.supabase.co` (intercepted) | High | Remove dead Supabase client code from bundle in Phase 2 |
| `assets/data/local-runtime.js` | 21 | `wooowinvites.com` (intercepted) | High | Strip original-platform fetch paths from production bundle |
| `assets/data/local-runtime.js` | 14 | `ipapi.co` (stubbed) | Low | Acceptable stub; remove caller if unused |
| `assets/data/invite.json` | 263+ | `https://maps.google.com/?q=...` | Low | Demo venue links — replace with customer URLs at personalization |
| `assets/data/invite.json` | 369+ | `https://www.booking.com/hotel/...` | Low | Demo accommodation links — expected for demo data |
| `assets/index-Cfoc4NWM.js` | 1 | Lazy-import map references `metaTracking-W-6Q2wZT.js`, `analyticsTracker-CPk2dKn7.js`, `ViralLoopAnalytics-7a3ChOE1.js` | High | Tree-shake or replace entry bundle; do not ship tracking modules |
| `assets/metaTracking-W-6Q2wZT.js` | 2+ | Meta/Facebook pixel helpers (`_fbp`, `fbclid`) | Critical | Remove module entirely from template distribution |
| `assets/index-Cfoc4NWM.js` | 124+ | Embedded `@supabase/auth-js` / WebSocket client code | High | Replace SPA with invitation-only build |

### 2. Original Branding

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `assets/data/local-runtime.js` | 21 | `wooowinvites.com` | High | Document origin; purge from runtime bundle |
| `assets/index-Cfoc4NWM.js` | — | WooWow platform i18n/admin strings in bundle | Medium | Strip non-invitation routes and copy |
| `index.html` | 25–30 | Dvites buy bar present | — | OK |
| `index.html` | 8–9 | Local favicon (not WooWow) | — | OK |

No WooWow logo/favicon in `index.html`. Residual platform code remains in JS assets.

### 3. External URLs

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | 30 | Buy Now `href="#"` | — | OK for demo |
| `assets/data/invite.json` | various | Google Maps, Booking.com demo URLs | Low | Personalization layer |
| `index.html` | — | **Missing** canonical, og:url, twitter tags | Medium | Add Dvites template SEO block |

### 4. Analytics / Tracking

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `assets/metaTracking-W-6Q2wZT.js` | entire file | Meta external ID / `_fbp` cookie logic | Critical | Delete from distribution |
| `assets/analyticsTracker-CPk2dKn7.js` | — | Analytics tracker module shipped | High | Delete / exclude from build |
| `assets/ViralLoopAnalytics-7a3ChOE1.js` | — | Viral loop analytics module shipped | High | Delete / exclude from build |
| `assets/useSectionTracking-DMa_ITlY.js` | — | Section tracking helper referenced | Medium | Remove with invite-only build |

No GTM/GA tags in `index.html`. Tracking exists in lazy-loaded chunks.

### 5. Forms

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `assets/data/local-runtime.js` | 50–59 | RSVP/demo data served locally via Supabase RPC shim | Medium | Document that forms do not submit externally in demo mode |
| Bundled admin chunks | — | Auth, checkout, admin forms present but not routed in demo | Low | Remove unused chunks to reduce attack surface |

### 6. Fonts

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | 13–16 | Google Fonts (Playfair Display, Raleway, Cinzel, etc.) | Medium | Download WOFF2 subset for theme |
| Theme assets | — | No local `@font-face` in index | Medium | Mirror fonts locally |

### 7. Assets

| Observation | Risk | Recommended Action |
|---|---|---|
| ~205 local images, videos, audio under `assets/` | — | Good |
| Absolute paths `/templates/balcony-seaview/...` | Medium | May 404 if hosted at non-root path |
| Hundreds of unused JS chunks (admin, blog, checkout) | Medium | Prune to invitation-only bundle |
| `node_modules/playwright` present in template folder | Low | Exclude from production deploy (dev-only) |

### 8. Scripts

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | 18 | `assets/data/local-runtime.js` | — | Required shim |
| `index.html` | 19 | `assets/index-Cfoc4NWM.js` (module) | — | Main entry; very large |
| `local-runtime.js` | 7 | `history.replaceState` → `/invite/demo-4638f3` | Medium | Document URL rewrite behavior for hosting |

### 9. CSS

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | 20 | Local `index-Skdm8sZv.css` | — | OK |
| External stylesheets | — | Only Google Fonts (see §6) | Medium | Localize |

### 10. SEO

| Field | Value | Risk | Recommended Action |
|---|---|---|---|
| Title | `Josephine & Calendra — Seaview Balcony Invitation` | Low | Rename to Dvites template naming convention |
| Description | Present (line 7) | — | OK |
| Canonical | **Missing** | Medium | Add `https://www.dvites.com/templates/balcony-seaview` |
| OG / Twitter | **Missing** | Medium | Add preview meta |
| Favicon | Local | — | OK |

### 11. Security

| Observation | Risk | Recommended Action |
|---|---|---|
| Supabase anon JWT embedded in some admin chunks (not index) | High | Never deploy admin chunks; rotate if ever exposed |
| `local-runtime.js` intercepts third-party APIs | Medium | Acceptable for demo; document CSP needs |
| All asset links HTTPS except none in index | — | OK |

### 12. Redirection

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `assets/data/local-runtime.js` | 6–8 | `history.replaceState` to `/invite/demo-4638f3` | Medium | Ensure static host supports SPA path or adjust slug |

### 13. Local Hosting Readiness

**Can work from own hosting:** Partially — invitation renders with local assets + runtime shim.  
**Third-party dependencies:** Google Fonts; dead code references Supabase/WooWow/Meta tracking.  
**Download/localize later:** Google Fonts; prune ~300+ unused JS modules; remove tracking files.

---

## Summary Verdict

Usable demo template with Dvites buy bar, but still carries significant WooWowInvites platform baggage in JS bundles. Not production-clean until invite-only rebuild and tracking purge.
