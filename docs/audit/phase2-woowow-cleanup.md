# Phase 2 Cleanup — WooWow Templates

**Date:** 2026-07-03  
**Scope:** `templates/balcony-seaview`, `templates/curtains`  
**Goal:** Remove or neutralize dangerous third-party/tracking/admin dependencies without changing invitation layout, animation, audio, video, images, or local-runtime demo behavior.

---

## Summary

Tracking, upload, and legal/marketing route modules were **neutralized in place** (no-op stubs) so Vite dynamic imports still resolve. The Supabase anon JWT was removed from `r2Upload-B5N7rExL.js`. `local-runtime.js` was extended to block Supabase Edge Function calls (`/functions/v1/`).

**Invite preview path is unchanged:** `index.html` → `local-runtime.js` → `index-Cfoc4NWM.js` → redirect to `/invite/demo-*` → `Invitation-CyWHI2Lc.js`.

Admin/marketing chunks (Auth, Blog, Dashboard, Admin, Checkout, etc.) remain on disk because they are referenced in the main bundle's lazy-load map, but they are **not loaded** during the default demo flow.

---

## Files Changed

### Both templates (`balcony-seaview`, `curtains`)

| File | Action |
|---|---|
| `assets/metaTracking-W-6Q2wZT.js` | **Neutralized** — all exports are no-ops; no Meta Pixel, ipapi, or `meta-capi` calls |
| `assets/analyticsTracker-CPk2dKn7.js` | **Neutralized** — all exports are no-ops; no `track-analytics` calls |
| `assets/ViralLoopAnalytics-7a3ChOE1.js` | **Neutralized** — component renders `null`; no Supabase RPC |
| `assets/r2Upload-B5N7rExL.js` | **Neutralized** — JWT and upload URL removed; `uploadToR2()` returns `{ error: "Upload disabled in local demo" }` |
| `assets/Unsubscribe-DZpm8rtR.js` | **Neutralized** — static demo placeholder; no Supabase unsubscribe calls |
| `assets/PrivacyPolicy-CMhJkzkT.js` | **Neutralized** — static demo placeholder |
| `assets/TermsOfService-mN8kK807.js` | **Neutralized** — static demo placeholder |
| `assets/data/local-runtime.js` | **Updated** — blocks `/functions/v1/` on Supabase host (403) |

### Not changed (per constraints)

- `index.html` — imports unchanged
- `assets/data/invite.json`
- CSS (`index-Skdm8sZv.css`)
- Images, video, audio assets
- Animation/theme chunks
- Dvites buy bar
- `assets/useSectionTracking-DMa_ITlY.js` — retained (contains homepage UI components imported by marketing routes; tracking deps it imports are now no-ops)
- Main SPA bundle `assets/index-Cfoc4NWM.js` — not rewritten

---

## Dangerous Files — Deleted or Neutralized

| Module | Status | Notes |
|---|---|---|
| `metaTracking-W-6Q2wZT.js` | Neutralized | Was: Meta Pixel, `_fbp`/`_fbc` cookies, ipify/ipapi IP lookup, `meta-capi` Supabase function |
| `analyticsTracker-CPk2dKn7.js` | Neutralized | Was: batched `track-analytics` Supabase function |
| `ViralLoopAnalytics-7a3ChOE1.js` | Neutralized | Was: admin viral-loop stats via Supabase RPC |
| `useSectionTracking-DMa_ITlY.js` | Retained | Homepage-only; imports neutralized tracking modules |
| `r2Upload-B5N7rExL.js` | **Neutralized (critical)** | Was: hardcoded Supabase anon JWT + `r2-upload` endpoint |
| `Unsubscribe-DZpm8rtR.js` | Neutralized | Was: email unsubscribe via Supabase |
| `PrivacyPolicy-CMhJkzkT.js` | Neutralized | Marketing/legal route |
| `TermsOfService-mN8kK807.js` | Neutralized | Marketing/legal route |
| Admin/marketing chunks (`Admin-*.js`, `Auth-*.js`, `Blog-*.js`, etc.) | **Not deleted** | Still referenced in `__vite__mapDeps`; not loaded on invite route |

**Nothing was deleted** — stubs preserve import resolution for dynamic routes.

---

## External Dependencies Remaining

### Active during invite preview (expected / low risk)

| Dependency | Location | Mitigation |
|---|---|---|
| Google Fonts | `index.html` lines 11–16 | External CDN; fonts only |
| Local assets | Theme videos, images, audio under `/templates/*/assets/` | Self-hosted |
| Demo data URLs | `invite.json` (Google Maps, Booking.com links) | Demo personalization data; unchanged |

### Present in bundle but blocked or not loaded in demo

| Dependency | Location | Mitigation |
|---|---|---|
| Supabase client + anon key | `index-Cfoc4NWM.js` | `local-runtime.js` intercepts all `kdcyugwruypwrmtllswt.supabase.co` fetch (RPC, auth, REST, **functions**) |
| `wooowinvites.com` strings | Marketing/admin lazy chunks + main bundle i18n | `local-runtime.js` returns empty JSON for non-asset URLs |
| `ipapi.co` | `useSectionTracking`, `Footer`, main bundle | `local-runtime.js` stubs `{ country_code: "US" }`; homepage not loaded in demo |
| Stripe | `Admin`, `ProfitDashboard`, `dressCodeColors` chunks | Admin/checkout routes only; not loaded on invite |
| Facebook pixel | Was in `metaTracking` | **Removed** via neutralization |

### Invite route import graph (`Invitation-CyWHI2Lc.js`)

Direct dangerous patterns in the invite component chain: **none** (no meta-capi, track-analytics, fbq, or JWT in `Invitation-CyWHI2Lc.js` itself).

---

## `index.html` Import Verification

Both templates still load:

```html
<script src="/templates/{template}/assets/data/local-runtime.js"></script>
<script type="module" crossorigin src="/templates/{template}/assets/index-Cfoc4NWM.js"></script>
<link rel="stylesheet" crossorigin href="/templates/{template}/assets/index-Skdm8sZv.css">
```

| Template | Demo slug | Redirect target |
|---|---|---|
| `balcony-seaview` | `demo-4638f3` | `/invite/demo-4638f3` |
| `curtains` | `demo-39e188` | `/invite/demo-39e188` |

All neutralized modules keep their original filenames and export names so existing dynamic `import()` paths in the main bundle continue to resolve.

---

## Manual Browser Test Checklist

Serve from site root (e.g. `npx serve .` on port 5500) so absolute `/templates/...` paths resolve.

### Balcony Seaview — `/templates/balcony-seaview/index.html`

- [ ] Page redirects to `/invite/demo-4638f3` without errors
- [ ] Opening envelope / tap-to-open animation plays
- [ ] Seaview Balcony theme video/animation renders correctly
- [ ] Headline, countdown, timeline, venue, FAQ blocks visible
- [ ] Background music plays (if enabled in invite data)
- [ ] Dvites buy bar visible and not clipped
- [ ] DevTools **Network**: no requests to `meta-capi`, `track-analytics`, `r2-upload`, `ipapi.co`, or `facebook.com`
- [ ] DevTools **Console**: no module load failures

### Curtains — `/templates/curtains/index.html`

- [ ] Page redirects to `/invite/demo-39e188` without errors
- [ ] Curtain opening animation plays
- [ ] Theme video/animation renders correctly
- [ ] All invitation blocks render (same checks as above)
- [ ] DevTools **Network**: confirm no `r2-upload` or Supabase function calls with Authorization headers
- [ ] DevTools **Console**: no module load failures

### Optional negative tests (non-invite routes)

These routes are not part of the Dvites demo but stubs should not throw:

- [ ] `/privacy` — shows placeholder text, no crash
- [ ] `/terms` — shows placeholder text, no crash

---

## What Was Intentionally Not Done

- Full SPA rewrite or tree-shaking of `index-Cfoc4NWM.js`
- Deletion of admin/marketing lazy chunks (would 404 if routes are visited)
- Changes to `useSectionTracking-DMa_ITlY.js` body (homepage UI dependency)
- CSS, layout, animation, or `invite.json` edits
- Prettify/minify of unrelated files

---

## Next Steps (Future Phases)

1. Build an invite-only Vite entry to drop admin/marketing chunks entirely (~200+ unused files per template).
2. Self-host Google Fonts used by each theme.
3. Strip embedded Supabase client from main bundle when invite-only build exists.
