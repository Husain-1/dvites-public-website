# Extraction notes — demo-692f06

- **Source URL:** https://www.wooowinvites.com/invite/demo-692f06
- **Extraction date:** 2026-07-31
- **Template folder:** `/templates/animated-flowers/`
- **Main JS bundle:** `index-DeC06Hi7.js`
- **Main CSS bundle:** `index-F8wOvwgW.css`
- **Invitation style:** themeAnimatedFlowers
- **Invitation data source:** Supabase RPC (`get_demo_invitation`) saved to `assets/data/invite.json`
- **RSVP behaviour:** Local mock adapter in `assets/data/local-runtime.js` — no data sent to WooowInvites
- **Tracking removed:** Meta Pixel, Google tags, flock analytics, ipify, CAPI parameter builder

## Dynamic chunks
Downloaded recursively from production bundles (525 wooow `/assets/*` files total).

## Major fixes
- Self-hosted JS/CSS/images/audio under `/templates/animated-flowers/assets/`
- Fetch interceptor serves local invite JSON
- RSVP submissions intercepted locally
- Static hosting paths normalized to `/templates/animated-flowers/assets/`

## Known limitations
- Google Fonts still loaded from CDN (documented in dependency audit)
- Some admin/marketing lazy chunks may remain in bundle but are unused at runtime
- Customer-specific names/dates still demo content until converted
