# Browser Image Audit — `index-local.html`

**Date:** July 1, 2026  
**Method:** Playwright headless Chromium + Network tab simulation  
**Server:** `python3 -m http.server 8765` from project root  
**URL tested:** `http://127.0.0.1:8765/index-local.html`

---

## Root cause (why “file exists” audit was wrong)

Static grep/file-existence checks passed because `./assets/images/<file>` files **do exist on disk**.

After Framer **hydrates**, the runtime (`.mjs`) rewrites `<img>` `src` / `srcset` to paths like:

```text
../images/3vpFOuN5tHb2JuYqzoPGPaRcA-2b5cea09.png
```

Browsers resolve relative URLs against the **document URL**, not the script folder.

| Page URL | `../images/foo.png` resolves to | Result |
|----------|-----------------------------------|--------|
| `/index-local.html` | `/images/foo.png` | **404** (no `/images/` folder) |
| With `<base href="./assets/scripts/">` | `/assets/images/foo.png` | **200** |

This is why SSR images could load briefly, then break after hydration — or show broken icons while the runtime swapped paths.

### Other ruled-out causes

| Check | Finding |
|-------|---------|
| Wrong leading slash | Not the primary issue |
| `?width=` / `;height=` suffixes in HTML | None found in `index-local.html` |
| srcset width descriptors (`512w`) | Valid; not part of filenames |
| `data-framer-ssr` attributes | No image paths embedded there |
| Live Server root mismatch | Same bug any time HTML is at site root and hydration uses `../images/` |

---

## Browser verification (after fix)

| Metric | Before fix | After fix |
|--------|------------|-----------|
| Total image requests | 137 | **115** |
| Failed image requests (404) | **79** | **0** |
| Broken `<img>` in DOM (`naturalWidth === 0`) | **182** | **0** |
| Non-image noise | MP3 abort (audio preload) | MP3 abort only (not an image) |

All **115** image requests returned **HTTP 200**.  
Zero broken image icons in the rendered page.

---

## Fixes applied (index-local.html only)

### 1. Added document base (required for hydration paths)

```html
<base href="./assets/scripts/">
```

Makes Framer’s runtime `../images/…` and `../fonts/…` resolve to `/assets/images/…` and `/assets/fonts/…`.

### 2. Aligned SSR image paths with runtime

| Location | Before | After |
|----------|--------|-------|
| `<img src>` / `<img srcset>` | `./assets/images/…` | `../images/…` |
| Favicon / apple-touch `<link href>` | `./assets/images/…` | `../images/…` |
| `<audio src>` (music) | `./assets/images/…mp3` | `../images/…mp3` |

### 3. Aligned script paths with base tag

| Location | Before | After |
|----------|--------|-------|
| `<script type="module" src>` | `./assets/scripts/foo.mjs` | `./foo.mjs` |
| `<link rel="modulepreload" href>` | `./assets/scripts/foo.mjs` | `./foo.mjs` |
| Inline editorbar preload | `./assets/scripts/init.mjs` | `./init.mjs` |
| Search index meta | `./assets/scripts/searchIndex-…` | `./searchIndex-…` |

### 4. Aligned inline `@font-face` URLs with base tag

| Before | After |
|--------|-------|
| `url(./assets/fonts/…)` | `url(../fonts/…)` |

**Not modified:** `.mjs` / `.js` files, asset filenames on disk, rebrand text, Framer `data-framer-*` attributes.

---

## SSR vs hydration hash variants

HTML SSR `srcset` still references some **older query-hash suffixes** (e.g. `3vpFOuN5…-d029519a.png`).  
After hydration, runtime uses **different hash suffixes** (e.g. `3vpFOuN5…-2b5cea09.png`). Both sets exist under `assets/images/`. The browser selects valid hydrated candidates; post-fix audit shows **zero broken images**.

---

## How to re-verify locally

```bash
cd /path/to/dvites-template-mountain
python3 -m http.server 8765
# Open http://127.0.0.1:8765/index-local.html
# DevTools → Network → Img filter → reload → expect 0 red/404 entries
```

**Important:** Serve from the project root (where `index-local.html` and `assets/` sit side by side). Opening the file via `file://` may behave differently; use a local HTTP server.

---

## Files changed

- `index-local.html` — path/base fixes only
- `browser-image-audit.md` — this report
