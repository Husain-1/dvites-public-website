# Phase 1 Audit — rajkamal-palace

**Audit date:** 2026-07-03  
**Template path:** `templates/rajkamal-palace/`  
**Type:** ShaadiPath template09 → Dvites self-hosted conversion  
**Auditor mode:** Read-only

---

## Executive Summary

Rajkamal Palace mirrors the mewar-midnight quality bar: fully local assets, Dvites branding, complete SEO meta, buy bar, and no ShaadiPath/R2 runtime dependencies. External deps are Google Fonts plus intentional WhatsApp/Calendar/Maps links in demo content.

---

## Scores

| Metric | Score |
|---|---|
| Dependency Cleanliness | 8/10 |
| Branding Cleanliness | 9/10 |
| SEO Readiness | 8/10 |
| Local Hosting Readiness | 9/10 |
| Production Readiness | 8/10 |
| **Overall Score** | **84/100** |

---

## Findings

### 1. External Dependencies

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | 87–89 | Google Fonts (Cormorant Garamond, EB Garamond, Parisienne) | Medium | Self-host |
| `assets/js/script.js` | 7 | `google.com/maps/search/?api=1&query=...` | Low | Demo venue map |
| `assets/js/script.js` | 1926 | `calendar.google.com/calendar/render` | Low | Feature |
| `assets/css/style.css` | — | Local `url("../images/...")` only | — | OK |

### 2. Original Branding

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | — | No ShaadiPath in runtime | — | Clean |
| `index.html` | 623 | Footer → Dvites link | — | OK |
| `index.html` | 93+ | Dvites buy bar | — | OK |

### 3. External URLs

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | 7, 85 | Canonical/OG → `dvites.com/templates/rajkamal-palace` | — | OK |
| `index.html` | 545 | `wa.me/910000000000` demo RSVP | Low | Placeholder |
| `assets/js/script.js` | 2400 | Dynamic WhatsApp href | — | OK |

### 4. Analytics / Tracking

None in runtime files. Cloudflare beacon removed in build.

### 5. Forms

WhatsApp-based RSVP — no external form POST.

### 6. Fonts

Google Fonts CDN. All imagery/audio local under `assets/images/`, `assets/audio/`.

### 7. Assets

| Observation | Risk | Recommended Action |
|---|---|---|
| Comprehensive local asset tree | — | Excellent |
| Relative `./assets/...` paths | — | Portable |
| Hero/event/icon layers all local | — | OK |

### 8. Scripts

Local `./assets/js/script.js` with Dvites overrides for title/calendar PRODID.

### 9. CSS

Local `./assets/css/style.css` — no remote URLs.

### 10. SEO

| Field | Value | Risk |
|---|---|---|
| Title | `Rajkamal Palace — Royal Indian Wedding Invitation Template` | — |
| Description | Dvites preview copy | — |
| Canonical | Present | — |
| OG/Twitter | Complete | — |

### 11. Security

No third-party SDKs. HTTPS external links only for maps/calendar/WhatsApp.

### 12. Redirection

Dynamic WhatsApp link only — no page redirects.

### 13. Local Hosting Readiness

**Strong.** Google Fonts only external dependency for core render.

---

## Summary Verdict

Production-ready baseline alongside mewar-midnight. Localize fonts for full offline compliance.
