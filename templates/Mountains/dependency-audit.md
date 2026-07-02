# Dependency Audit Report

Generated: 2026-07-01T18:22:46.543Z

## Summary

- **Total external URLs found (scan):** 286
- **Local asset references in index-local.html:** 230
- **Broken local references:** 0
- **Blocking remote URLs remaining:** 0
- **Original Framer deletion will affect template:** **NO**
- **Final confidence:** **98%**

## Mirrored Locally

| Type | Count |
|------|-------|
| Images (assets/images/) | 293 |
| Fonts (assets/fonts/) | 97 |
| Scripts (assets/scripts/) | 20 |

### Recent script mirroring (this run)

_No new script URLs mirrored in this run._

## Removed (Analytics / Tracking)

- `https://api.pixelflow.so/event` (index.html)
- `https://slrgkgulru.pixelflow.so/pfm.js` (index.html)
- `https://www.googletagmanager.com/gtag/js?id=G-VCMPQ02N6E` (index.html)
- `https://t.contentsquare.net/uxa/ce8a8d35ab051.js` (index.html)
- `https://events.framer.com/script?v=2` (index.html)

- PixelFlow snippet removed from index-local.html
- Google Analytics / GTM removed from index-local.html
- ContentSquare removed from index-local.html
- events.framer.com script removed (if present)

## SEO Updated (Dvites)

- canonical → `https://www.dvites.com/demos/mountain`
- og:url → `https://www.dvites.com/demos/mountain`
- og:image → `https://www.dvites.com/demos/mountain/assets/images/7LPUQldg1w5B1Zrz0pCfh0AeQw.png`
- twitter:image → `https://www.dvites.com/demos/mountain/assets/images/7LPUQldg1w5B1Zrz0pCfh0AeQw.png`

## Editor-Only (Stubbed / Non-Runtime)

- `https://framer.com/edit/init.mjs` (index.html)
- `init.mjs` is a no-op stub; only loads if Framer editor localStorage flag is set

## Metadata / Non-Fetch Strings (Safe to Keep)

These appear in error messages, JSON-LD, user-facing links, or runtime string templates — they do not load assets:
- `https://www.dvites.com/demos/mountain/assets/images/7LPUQldg1w5B1Zrz0pCfh0AeQw.png`
- `https://www.dvites.com/demos/mountain`
- `https://schema.org`
- `https://www.dvites.com`
- `https://www.dvites.com/?s={search_term_string}`
- `http://www.w3.org/2000/svg`
- `https://rzp.io/rzp/mountain`
- `https://missingpiecedesign.com`
- `https://wa.me/91XXXXXXXXXX`
- `https://www.missingpieceinvites.com/demos/mountain`
- `https://www.missingpieceinvites.com`
- `https://www.missingpieceinvites.com/?s={search_term_string}`
- `https://frameruni.link/cc`
- `https://www.framer.com/contact/${n?`
- `https://screenshot.framer.invalid`
- _…and 12 more_

## Remaining Blocking URLs

_None — template is fully self-hosted for runtime._

## Verification Checklist

- [x] index-local.html local image/font paths verified on disk
- [x] Analytics scripts removed
- [x] SmoothScroll_Prod + Framer runtime scripts preserved
- [x] Relative script imports preserved
- [x] No blocking remote hosts in runtime files

## Notes

- `index.html` remains the untouched Framer export backup; `index-local.html` is the self-hosted version.
- Serve via local HTTP server (`npx serve .`) and open `/index-local.html` to verify Network tab.
- `https://fonts.gstatic.com/s/` in framer runtime is a URL prefix constant, not a network request.
