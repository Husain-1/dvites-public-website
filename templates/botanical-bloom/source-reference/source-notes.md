# Botanical Bloom — source notes

## Source route
- URL: https://www.wooowinvites.com/invite/demo-95b457
- Wooow style: `honey-garden` (Honey Garden)
- Demo slug: `demo-95b457`

## Data loading
- Invitation payload loaded via Supabase RPC `get_demo_invitation` with `_slug: demo-95b457`.
- Captured locally to `assets/data/invite.json` and `assets/data/invitation-data.json`.
- `local-runtime.js` intercepts Supabase fetch and serves local JSON.

## Hero composition (Honey Garden)
- The opening botanical garden is **`honey-bees-theme-C2FMUHUm.mp4`** (theme video), plus embroidery texture PNGs and citron cluster overlays.
- The API `background_image` PNG (`background-1783160711847.png`) is **deleted on Supabase** (404). Live WooowInvites also does not load it; leave `background_image` empty in local JSON.
- Optional static reference capture: `assets/images/hero-botanical-original.png` (from share-image export).
- Additional drawing assets served from `/__l5e/assets-v1/...` are mirrored at repo root `__l5e/` and under `assets/images/l5e/`.

## Application stack
- Vite + React SPA (`#root`)
- Main bundles: `index-D_9lpNSl.js`, `index-F8wOvwgW.css`
- Animations: React + CSS (scroll reveal, envelope opening)
- Music: local `/audio/romantic-piano.mp3` mirrored to `assets/audio/`
- Languages: invitation `content_translations` preserved in `assets/data/translations.json`

## Removed
- Meta Pixel, CAPI parameter builder, Google Ads/Analytics, flock analytics
- WooowInvites backend RSVP/auth/analytics calls (stubbed in local-runtime)

## RSVP
- Original Wooow RSVP backend removed.
- Configure WhatsApp/email RSVP in `assets/data/client-config.js`.
