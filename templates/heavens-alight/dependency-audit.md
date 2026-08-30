# Heavens Alight — Dependency Audit

| Type | Original URL | Local Path | Status |
|------|--------------|------------|--------|
| HTML source | `https://www.shaadipath.com/api/preview/guest?template=template10` | `index-source.html` | Archived |
| CSS | `https://assets.shaadipath.com/templates/template10/style.css` | `assets/css/style.css` | Local |
| JS | `https://assets.shaadipath.com/templates/template10/script.js` | `assets/js/script.js` | Local |
| Dvites runtime | — | `assets/js/dvites-runtime.js` | Added (ICS + WhatsApp safety) |
| Fonts CSS | Google Fonts CDN | `assets/css/fonts.css` | Local |
| Font files | `fonts.gstatic.com` (12 TTF) | `assets/fonts/*.ttf` | Local |
| Intro images (6) | `assets.shaadipath.com/.../assets/intro/*` | `assets/images/intro/*` | Local |
| Hero video | `.../assets/Hero/Intro_Video.mp4` | `assets/video/intro-video.mp4` | Local |
| Hero poster | `.../assets/Hero/hero_poster.webp` | `assets/images/hero/hero_poster.webp` | Local |
| Invite images (7) | `.../assets/Invite/*` | `assets/images/invite/*` | Local |
| Event images (9) | `.../assets/Events/*` | `assets/images/events/*` | Local |
| Story images (5) | `.../assets/Meet the couple/*` | `assets/images/story/*` | Local |
| Gallery bg | `.../assets/gallery/Gallery_Bg.webp` | `assets/images/gallery/Gallery_Bg.webp` | **Placeholder** (CDN 404) |
| Story bg | `.../Meet the couple/Meet_the_couple_bg.webp` | `assets/images/story/Meet_the_couple_bg.webp` | **Placeholder** (CDN 404) |
| Gallery demo (4) | `.../assets/Demo/*` | `assets/images/gallery/demo/*` | Local |
| RSVP video | `.../assets/rsvp/end.mp4` | `assets/video/rsvp-video.mp4` | Local |
| RSVP poster | `.../assets/rsvp/rsvp_poster.webp` | `assets/images/rsvp/rsvp_poster.webp` | Local |
| Music | `.../assets/music/Demo_music.mp3` | `assets/audio/demo-music.mp3` | Local |
| TTK icons (4) | `.../assets/TTK/*` | `assets/images/misc/ttk/*` | Local |
| Catalogue thumb | User mockup (not attached in session) | `thumbnail.png` | Generated from hero poster |
| Dvites logo | — | `assets/images/misc/dvites-logo.png` | Copied from existing template |

## Removed / replaced

| Original | Replacement |
|----------|-------------|
| `<base href="https://assets.shaadipath.com/templates/template10/">` | Removed; relative local paths |
| ShaadiPath OG/Twitter meta | Neutral Dvites preview meta |
| `fonts.googleapis.com` / `fonts.gstatic.com` | Local `@font-face` in `assets/css/fonts.css` |
| Cloudflare Insights beacon | Removed |
| `shaadipath.com/api/calendar` (Apple/iCal) | Local `.ics` download via `dvites-runtime.js` |
| `wa.me/XXXXXXXXXXXX` placeholder | `#` + click guard when no WhatsApp configured |
| ShaadiPath footer credit | Neutral “Crafted with love” |
| ShaadiPath buy/editor links | Dvites buy bar → `/wedding/heavens-alight.html` |

## Required external runtime dependencies

**NONE**

## User-triggered external links

- `calendar.google.com` — Google Calendar add (RSVP section)
- `maps.google.com` — event map links (when configured)
- `wa.me` — only when a WhatsApp number is set in `__WEDDING_CONFIG__`
