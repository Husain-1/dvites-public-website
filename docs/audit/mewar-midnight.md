# Phase 1 Audit — mewar-midnight

**Audit date:** 2026-07-03  
**Template path:** `templates/mewar-midnight/`  
**Type:** ShaadiPath template02 → Dvites self-hosted conversion  
**Auditor mode:** Read-only

---

## Executive Summary

Mewar Midnight is a strong Phase 1 conversion: all theme assets local, Dvites branding throughout, buy bar present, full SEO meta block. External dependencies limited to Google Fonts and intentional third-party links (WhatsApp, Google Calendar). No ShaadiPath/R2 references in runtime `index.html`.

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
| `index.html` | 75–82 | `fonts.googleapis.com`, `fonts.gstatic.com` | Medium | Self-host Cinzel, EB Garamond, Raleway |
| `index.html` | 13 (wedding-config) | `calendar.google.com` calendar URL | Low | Functional feature — OK |
| `assets/css/style.css` | — | Local asset URLs only | — | OK |
| `assets/js/script.js` | — | No remote asset URLs | — | OK |
| `index-source.html` | — | Original ShaadiPath/R2 refs (archival) | Low | Exclude from deploy |

### 2. Original Branding

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | — | No ShaadiPath text in runtime file | — | Clean |
| `index.html` | 773 | Footer link → `https://www.dvites.com/` | — | OK |
| `index.html` | 93+ | Dvites buy bar | — | OK |
| `index-source.html` | various | ShaadiPath branding (source only) | Low | Keep as archive, not deployed |

### 3. External URLs

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | 7, 73 | Canonical/OG → `dvites.com/templates/mewar-midnight` | — | OK |
| `index.html` | 734 | `https://wa.me/919999999999?...` demo RSVP | Low | Placeholder — personalize |
| `index.html` | 951 (inline) | Dynamic WhatsApp link builder | — | OK |

### 4. Analytics / Tracking

No analytics, GTM, Cloudflare beacon, or tracking scripts in `index.html`. `browser-audit.js` confirms clean runtime.

### 5. Forms

RSVP via WhatsApp deep links — no form POST to third parties.

### 6. Fonts

Google Fonts CDN only. All theme imagery local.

### 7. Assets

| Observation | Risk | Recommended Action |
|---|---|---|
| Full local `assets/images/`, `assets/audio/` | — | Excellent |
| Relative `./assets/...` paths | — | Portable |
| Demo gallery photos local | — | OK |

### 8. Scripts

| File | Line | URL / Text | Risk | Recommended Action |
|---|---|---|---|---|
| `index.html` | — | `./assets/js/script.js` local | — | OK |
| Inline Dvites override | end | Title/calendar PRODID fix | — | OK |

### 9. CSS

`./assets/css/style.css` — fully local, no remote backgrounds detected.

### 10. SEO

| Field | Value | Risk |
|---|---|---|
| Title | `Mewar Midnight — Royal Indian Wedding Invitation Template` | — |
| Description | Dvites preview copy | — |
| Canonical | Present | — |
| OG/Twitter | Complete with local image | — |
| Favicon | Local (via template assets) | — |

### 11. Security

All HTTPS external links. No mixed content. No embedded third-party SDKs.

### 12. Redirection

WhatsApp href set dynamically in script — no forced page redirects.

### 13. Local Hosting Readiness

**Strong.** Only Google Fonts require network. All visual/audio assets local. Relative paths.

---

## Summary Verdict

Reference-quality Dvites conversion. Phase 2: localize Google Fonts, keep `index-source.html` out of production deploy.
