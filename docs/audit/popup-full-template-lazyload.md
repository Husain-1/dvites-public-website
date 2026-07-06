# Popup Full Template Lazy Load — Dvites Root Site

**Audit date:** 2026-07-06  
**Scope:** Product demo modal on `index.html` and `templates.html`  
**Goal:** Show lightweight poster in phone mockup on open; load full invitation iframe only after explicit user action.

---

## Executive Summary

The product popup no longer sets `iframe.src` when the modal opens. Instead it displays the existing catalog poster image (`data-preview`) inside the phone mockup with a **View Full Invitation** button. The full template (`/templates/{slug}/index.html` and all nested assets) loads only after that button is clicked.

Buy Now, pricing, modal layout, and phone mockup styling are unchanged.

---

## Implementation

| Area | Change |
|---|---|
| `index.html`, `templates.html` | Added `#modal-preview-stage` (poster + CTA + loading text), `#modal-iframe-wrap` hidden until live preview |
| `assets/site.js` | `openModalPreview()`, `loadModalLivePreview()`, `resetModalPreview()`; cards include `data-preview` |
| `assets/site.css` | Poster overlay, CTA, loading state inside phone screen |
| `assets/phone-preview.js` | Unchanged API; modal iframe `setup()` deferred until live preview click |

### Open modal (before click)

- Sets `#modal-preview-image` to template poster URL only
- Keeps `#demo-iframe` without `src`
- Keeps `#modal-iframe-wrap` hidden
- Does **not** call `DvitesPhonePreview.setup()` on modal iframe

### View Full Invitation (after click)

- Shows **Loading full invitation…**
- Reveals iframe wrapper and sets `iframe.src` to template demo URL
- Calls `DvitesPhonePreview.setup(iframe, { mode: "modal" })` once
- On iframe `load`, hides poster stage and loading text

### Close / reopen

- `closeModal()` and `DvitesResetModalPreview()` clear iframe, poster, and UI state
- Reopening same template starts again from poster + CTA

---

## Performance Rules

### Before **View Full Invitation**

Network tab should **not** request:

- `/templates/{slug}/index.html`
- `/templates/{slug}/assets/*` (JS, CSS, fonts, images beyond poster)
- Template videos or audio
- Framer runtime bundles

Expected requests on modal open:

- Poster image only (e.g. `/templates/curtains/assets/images/curtains-theme-poster-*.jpg`)

### After **View Full Invitation**

Full template document and its assets load inside the popup iframe as before.

### Unchanged (intentional)

- Homepage hero iframe still loads Balcony Seaview for marketing preview (separate from product popup)
- Catalog card thumbnails use CSS `background-image` posters (unchanged)
- No template folders preloaded on page load beyond existing hero + poster images

---

## Manual Test Checklist

1. Hard refresh the site (empty cache).
2. Open DevTools → **Network** tab; filter by **Doc** or **All**.
3. Open a product popup (**Watch Demo** or card click).
4. **Confirm:** only the poster image loads; no `/templates/.../index.html`.
5. Click **View Full Invitation**.
6. **Confirm:** loading text appears, then iframe requests template `index.html` and assets.
7. **Confirm:** full invitation is interactive inside phone mockup.
8. **Mobile:** repeat steps 3–7 at ≤767px width.
9. **Close popup** and reopen same template.
10. **Confirm:** poster + CTA shown again; iframe empty until second click.
11. **Buy Now:** still opens Razorpay flow without requiring live preview.

---

## Files Touched

- `index.html`
- `templates.html`
- `assets/site.js`
- `assets/site.css`

---

## Risk Notes

- Poster is a static image; motion/audio/envelope UX appears only after live preview.
- If poster URL is missing on a card, phone mockup may appear blank until live preview (all catalog cards now set `data-preview`).
- Hero preview on homepage is out of scope for this lazy-load change.
