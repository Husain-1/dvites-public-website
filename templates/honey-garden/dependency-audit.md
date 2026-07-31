# Dependency audit — demo-95b457

| Dependency | Original URL | Local path | Status | Notes |
|---|---|---|---|---|
| Main JS bundle | `https://www.wooowinvites.com/assets/index-GSm4sk4W.js` | `/templates/honey-garden/assets/js/index-GSm4sk4W.js` | localized | Vite entry |
| Main CSS bundle | `https://www.wooowinvites.com/assets/index-F8wOvwgW.css` | `/templates/honey-garden/assets/css/index-F8wOvwgW.css` | localized | Vite styles |
| Lazy JS chunks (247) | `https://www.wooowinvites.com/assets/*.js` | `/templates/honey-garden/assets/js/*.js` | localized | Recursive mirror |
| Theme l5e assets (79) | `https://www.wooowinvites.com/__l5e/assets-v1/*` | `/templates/honey-garden/assets/images/l5e/*` | localized | Honey Garden / floral butterflies |
| Invitation data | `supabase.co/rpc/get_demo_invitation` | `/templates/honey-garden/assets/data/invite.json` | localized | Fetch interceptor |
| Music | `/audio/romantic-piano.mp3` | `/templates/honey-garden/assets/audio/romantic-piano.mp3` | localized | Background music |
| Gallery / venue / dress code images | Supabase storage + wooow assets | `/templates/honey-garden/assets/images/*` | localized | From invite.json |
| Meta Pixel | `connect.facebook.net` | — | removed | Stripped from index.html |
| Google Ads/Analytics | `googletagmanager.com` | — | removed | Stripped from index.html |
| flock analytics | `/~flock.js`, `/~api/analytics` | — | removed | Stripped from index.html |
| Meta CAPI builder | `capi-automation.s3.us-east-2.amazonaws.com` | — | removed | Stripped from index.html |
| IP lookup | `api.ipify.org`, `api64.ipify.org` | — | blocked | Fetch interceptor stub |
| RSVP submission | WooowInvites Supabase/functions | local mock | replaced | No remote submission |

## Remaining external domains (runtime)

- `fonts.googleapis.com` — invitation typography (Playfair Display, Raleway, Cinzel, etc.)
- `fonts.gstatic.com` — font file delivery

## Intentionally blocked at runtime (no outbound requests)

- `www.wooowinvites.com` (non-asset API calls)
- `kdcyugwruypwrmtllswt.supabase.co`
- Facebook / Google tracking endpoints
- flock / ipify / CAPI automation

**Expected result:** zero external runtime dependencies except Google Fonts CDN (documented above).
