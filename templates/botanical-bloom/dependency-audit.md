# Dependency audit — Botanical Bloom

## Kept (invitation runtime)

| Category | Notes |
|----------|-------|
| React SPA bundles | `index-D_9lpNSl.js`, lazy chunks, `index-F8wOvwgW.css` |
| Theme assets | Honey Garden drawings, timeline icons, watercolor frames |
| Invite media | Gallery, venue, dress code, accommodation (local `assets/images/`) |
| Audio | `assets/audio/romantic-piano.mp3` |
| Video | Envelope opening `assets/video/default-5.mp4` |
| Fonts | Google Fonts (Playfair, Cinzel, Great Vibes, Meddon, etc.) |
| Translations | `assets/data/translations.json` from invite `content_translations` |

## Removed / stubbed

| Dependency | Action |
|------------|--------|
| Meta Pixel | Removed from `index.html` |
| Meta CAPI / ipify | Not included |
| Google Tag Manager / Analytics | Not included |
| flock / `~api/analytics` | Not included |
| Supabase RSVP / auth / REST | Stubbed in `local-runtime.js` |
| WooowInvites API | Stubbed; local `invite.json` used |

## External (user-triggered only)

- Google Maps links in venue/destination blocks (unchanged hrefs in invite data)
- Google Fonts CDN

## Backend RSVP

Original Wooow RSVP submission is **not** preserved. Configure WhatsApp or email RSVP in `assets/data/client-config.js`.
