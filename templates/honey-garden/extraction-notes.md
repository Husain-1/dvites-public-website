# Extraction notes — demo-95b457

- **Source URL:** https://www.wooowinvites.com/invite/templates/honey-garden
- **Extraction date:** 2026-07-31
- **Template folder:** `/templates/honey-garden/`
- **Theme:** Honey Garden (`honey-garden`) — floral butterflies frame, Jeff Emlio & Maria Gucci demo content
- **Main JS bundle:** `assets/js/index-GSm4sk4W.js`
- **Main CSS bundle:** `assets/css/index-F8wOvwgW.css`
- **Invitation data source:** Supabase RPC `get_demo_invitation` → `assets/data/invite.json` (+ `invite-original.json` archive)
- **Fonts used (runtime):** Cinzel (headline), Playfair Display, Raleway, Cormorant Garamond (via Google Fonts CDN)
- **Music file:** `assets/audio/romantic-piano.mp3`
- **Opening video:** `assets/images/l5e/cinematic-envelope.mp4` (from invite `custom_video_url`)
- **RSVP behaviour:** Intercepted in `assets/data/local-runtime.js` — mock success only, no WooowInvites submission

## Assets captured

| Category | Count |
|---|---|
| JS chunks | 247 |
| CSS bundles | 1 |
| Images (incl. l5e) | 313 |
| l5e CDN mirrors | 79 |
| Video files | 57 |
| Audio | 1 |
| Data files | 3 |

## Dynamic chunks

All Vite lazy chunks referenced from the main bundle were downloaded recursively from `https://www.wooowinvites.com/assets/*`.

## APIs replaced

| Original | Local replacement |
|---|---|
| `supabase.co/rpc/get_demo_invitation` | `assets/data/invite.json` via fetch interceptor |
| `supabase.co/rpc/get_invitation_data` | Empty array stub |
| `supabase.co/rest/v1/*` | Empty stub |
| `supabase.co/functions/v1/*` | Blocked (403) |
| RSVP submit endpoints | Local mock adapter |
| Meta / Google / flock / ipify | Neutralized in fetch interceptor + removed from HTML |

## Major fixes applied

1. Saved untouched source HTML as `index-source.html`
2. Built clean `index.html` without tracking scripts
3. Self-hosted production React bundles under `assets/js/` and `assets/css/`
4. Downloaded `/__l5e/assets-v1/*` theme assets to `assets/images/l5e/` and patched bundle references
5. Localized invite media (gallery, venue, dress code, members, audio)
6. SPA route normalization: `/templates/honey-garden/` → `/invite/templates/honey-garden/` for React Router
7. Added refresh-friendly copy at `invite/templates/honey-garden/index.html`

## Known limitations

- Google Fonts still loaded from CDN (fonts.googleapis.com / fonts.gstatic.com)
- Admin/marketing lazy chunks remain in bundle but are not needed at runtime
- Demo couple names/dates/content — ready for customer-data conversion
- One Supabase background URL returned HTTP 400 during capture; alternate PNG was saved from related asset path

## Preview locally

```bash
cd /path/to/dvites-templates
python3 -m http.server 8788
```

Open: http://127.0.0.1:8788/templates/honey-garden/

## Regenerate

```bash
node demo-95b457/mirror.js
node demo-95b457/fix-l5e.js
```
