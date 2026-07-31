# Botanical Bloom

Self-hosted Dvites wedding invitation extracted from WooowInvites **Honey Garden** demo (`demo-95b457`).

## Demo URLs

- Local path: `/templates/botanical-bloom/index.html`
- SPA route shim: `/invite/demo-95b457/` (rewritten by `assets/data/local-runtime.js`)

## Customize

| File | Purpose |
|------|---------|
| `assets/data/client-config.js` | RSVP (WhatsApp/email), couple names, music |
| `assets/data/invite.json` | Full invitation payload served to the React app |
| `assets/data/invitation-data.json` | Same row object (reference) |
| `assets/data/translations.json` | Multilingual content overrides |

## Rebuild from source

```bash
node setup.js
```

Requires network access to capture invite data and download any missing Wooow bundle chunks.

## Source

See `source-reference/source-url.txt` and `source-reference/source-notes.md`.

**Do not overwrite** `index-source.html`.
