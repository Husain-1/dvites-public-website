# Phase 1 Audit — curtains

**Audit date:** 2026-07-03  
**Template path:** `templates/curtains/`  
**Type:** WooWowInvites / Vite SPA export (Grand Curtains theme)  
**Auditor mode:** Read-only

---

## Executive Summary

Curtains shares the same WooWowInvites/Vite architecture as balcony-seaview: local theme assets, Supabase API shim, Dvites buy bar, and a large bundle containing admin/checkout/analytics modules from the original platform. Google Fonts are external. SEO metadata is minimal.

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
| `index.html` | 11–16 | `https://fonts.googleapis.com`, `https://fonts.gstatic.com` | Medium | Self-host theme fonts |
| `index.html` | 18–20 | Absolute `/templates/curtains/assets/...` paths | Medium | Consider relative paths for portable hosting |
| `assets/data/local-runtime.js` | 28 | `kdcyugwruypwrmtllswt.supabase.co` (stubbed) | High | Remove Supabase client from production bundle |
| `assets/data/local-runtime.js` | 21 | `wooowinvites.com` (stubbed) | High | Purge platform URLs from bundle |
| `assets/data/local-runtime.js` | 14 | `ipapi.co` (stubbed) | Low | OK for demo |
| `assets/data/invite.json` | 217+ | `maps.google.com` demo venue URL | Low | Personalize per customer |
| `assets/data/invite.json` | 270+ | `booking.com` demo hotel URL | Low | Personalize per customer |
| `assets/r2Upload-B5N7rExL.js` | 11 | `kdcyugwruypwrmtllswt.supabase.co/functions/v1/r2-upload` + JWT | Critical | Do not ship; admin-only |
| `assets/index-Cfoc4NWM.js` | 1 | References `metaTracking`, `analyticsTracker`, `ViralLoopAnalytics` | High | Invite-only rebuild |

### 2. Original Branding

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `assets/PrivacyPolicy-CMhJkzkT.js` | 64 | `https://wooowinvites.com/contact` | Medium | Remove legal pages from template bundle |
| `assets/TermsOfService-mN8kK807.js` | 107 | `https://wooowinvites.com/contact` | Medium | Remove legal pages from template bundle |
| `assets/Features-C4-V85VG.js` | 21+ | WooWow marketing copy ("20+ themes") | Medium | Strip marketing routes |
| `index.html` | 25–30 | Dvites buy bar | — | OK |

### 3. External URLs

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | — | No canonical / OG / Twitter | Medium | Add Dvites SEO block |
| `assets/data/invite.json` | various | Maps + Booking demo links | Low | Expected demo content |

### 4. Analytics / Tracking

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `assets/metaTracking-W-6Q2wZT.js` | — | Meta pixel helper code | Critical | Remove |
| `assets/analyticsTracker-CPk2dKn7.js` | — | Analytics module | High | Remove |
| `assets/ViralLoopAnalytics-7a3ChOE1.js` | — | Viral loop analytics | High | Remove |
| `assets/useSectionTracking-DMa_ITlY.js` | — | Section tracking | Medium | Remove |

No live GTM/GA in `index.html`.

### 5. Forms

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `assets/data/local-runtime.js` | 50+ | Demo invite via local `invite.json` | — | OK for static demo |
| `assets/Unsubscribe-DZpm8rtR.js` | 6+ | `supabase.co/functions/v1/handle-email-unsubscribe` | High | Admin chunk — exclude from deploy |

### 6. Fonts

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | 13–16 | Google Fonts (incl. Cinzel Decorative) | Medium | Mirror locally |

### 7. Assets

| Observation | Risk | Recommended Action |
|---|---|---|
| Local images/video/audio present | — | Good |
| `assets/audio/marry-you.mp3` local | — | Good |
| ~230 asset files, many unused admin JS | Medium | Prune bundle |
| Absolute asset paths | Medium | Validate deploy path |

### 8. Scripts

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | 18–19 | `local-runtime.js` + `index-Cfoc4NWM.js` | — | Core runtime |
| `local-runtime.js` | 6–8 | Redirect to `/invite/demo-39e188` | Medium | Document hosting requirement |

### 9. CSS

Local `index-Skdm8sZv.css` only (+ Google Fonts).

### 10. SEO

| Field | Value | Risk |
|---|---|---|
| Title | `Greg & Lisa — Grand Curtains Invitation` | Low |
| Description | Present | — |
| Canonical | Missing | Medium |
| OG/Twitter | Missing | Medium |

### 11. Security

Supabase anon key in `r2Upload-B5N7rExL.js` — **Critical** if admin chunks deployed.

### 12. Redirection

`local-runtime.js` line 6–8: `history.replaceState` to invite slug path.

### 13. Local Hosting Readiness

**Partial.** Demo invitation works with shim. Requires Google Fonts + path rewrite. Large unused platform surface area.

---

## Summary Verdict

Same class of issues as balcony-seaview. Functional demo, not Phase-1 production clean.
