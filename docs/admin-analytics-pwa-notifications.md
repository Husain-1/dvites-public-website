# Dvites Phase 3 — Analytics, Admin Dashboard, PWA & Notifications

This document covers the analytics tracking layer, admin dashboards, installable admin PWA, and order push notifications added in Phase 3.

## Overview

| Area | Purpose |
|------|---------|
| `analytics_events` | Stores page and funnel events |
| `live_sessions` | Tracks active visitors via heartbeat |
| `push_subscriptions` | Stores admin browser push subscriptions |
| `/api/track` | Public ingest endpoint (no secrets exposed) |
| `/api/analytics` | Protected admin analytics API |
| `/api/orders` | Protected admin orders API |
| `/admin/analytics.html` | Analytics dashboard |
| `/admin/orders.html` | Orders dashboard |
| `/admin/manifest.json` + `/admin/service-worker.js` | Installable admin PWA |

Checkout, Razorpay verification, Supabase order saving, thank-you page, templates, and modal demo flows were **not modified** beyond minimal analytics hooks in `payment.js`.

---

## 1. Supabase tables

Run the SQL in:

`docs/sql/phase3-analytics.sql`

### Tables created

#### `analytics_events`
- `id` uuid
- `event_type` text
- `page_path` text
- `template_slug` text
- `session_id` text
- `visitor_id` text
- `referrer` text
- `user_agent` text
- `device_type` text
- `created_at` timestamptz

Tracked event types:
- `page_view`
- `template_card_view`
- `modal_open`
- `demo_click`
- `buy_click`
- `checkout_open`
- `payment_success`
- `heartbeat` (session only; not stored as analytics event)

#### `live_sessions`
- `id` uuid
- `visitor_id` text
- `session_id` text (unique)
- `page_path` text
- `last_seen_at` timestamptz
- `user_agent` text
- `device_type` text
- `referrer` text
- `created_at` timestamptz

**Live visitor rule:** `last_seen_at >= now() - 60 seconds`

#### `push_subscriptions`
- `id` uuid
- `endpoint` text (unique)
- `p256dh` text
- `auth` text
- `user_agent` text
- `created_at` timestamptz

#### `orders.created_at`
SQL adds `created_at` if missing for revenue/date filtering.

---

## 2. Cloudflare environment variables

Set these in **Cloudflare Pages → Settings → Environment variables**:

| Variable | Required | Purpose |
|----------|----------|---------|
| `SUPABASE_URL` | Yes | Supabase project URL |
| `SUPABASE_PUBLISHABLE_KEY` | Yes | Publishable key for REST inserts/selects |
| `RAZORPAY_KEY_ID` | Yes | Existing checkout |
| `RAZORPAY_KEY_SECRET` | Yes | Existing checkout |
| `ADMIN_API_KEY` | Yes | Protects `/api/analytics` and `/api/orders` |
| `VAPID_PUBLIC_KEY` | For push | Web Push public key (base64url) |
| `VAPID_PRIVATE_KEY` | For push | Web Push private key (PKCS8 base64url) |
| `VAPID_SUBJECT` | For push | e.g. `mailto:infodvites@gmail.com` |

### Generate VAPID keys

```bash
npx web-push generate-vapid-keys
```

Use:
- **Public key** → `VAPID_PUBLIC_KEY`
- **Private key** → `VAPID_PRIVATE_KEY`
- **Subject** → `VAPID_SUBJECT=mailto:infodvites@gmail.com`

### Generate admin API key

Use any long random string, for example:

```bash
openssl rand -hex 32
```

Store as `ADMIN_API_KEY`.

**Never** put `ADMIN_API_KEY`, `VAPID_PRIVATE_KEY`, or `RAZORPAY_KEY_SECRET` in frontend code.

---

## 3. Tracking script

### File
`assets/analytics.js`

### Behaviour
- Creates `visitor_id` in `localStorage`
- Creates `session_id` in `sessionStorage`
- Sends `page_view` on load
- Sends heartbeat every **20 seconds** to `/api/track`
- Tracks:
  - template card visibility (`template_card_view`)
  - modal open (`modal_open`)
  - Watch Demo clicks (`demo_click`)
  - Buy / Customize clicks (`buy_click`)
- `payment.js` tracks:
  - `checkout_open`
  - `payment_success`

### API
`POST /api/track`

All events go through the Cloudflare function, which writes to Supabase using server env vars.

### Pages with analytics enabled
- `index.html`
- `templates.html`
- `partner-studio.html`
- `thank-you.html`
- legal pages

Admin pages do **not** load `analytics.js`.

---

## 4. Admin dashboards

### URLs
- Orders: `/admin/orders.html`
- Analytics: `/admin/analytics.html`

### Authentication
On first visit, enter your `ADMIN_API_KEY` once. After successful verification, it is stored in **`localStorage`** on this device for up to **365 days** and sent as:

`X-Dvites-Admin-Key: <your-entered-key>`

The server `ADMIN_API_KEY` is **never** embedded in page source — only Cloudflare Functions compare the header.

You stay signed in as **Super Admin** until:
- you click **Sign out**
- 365 days pass since login
- any admin API returns **401 Unauthorized** (invalid or rotated key)

localStorage keys:
- `dvites_admin_key`
- `dvites_admin_login_at`

### Orders dashboard features
- Gumroad-style dark wine UI
- Responsive mobile layout
- Total orders / revenue
- Today / week / month counts
- Search and filters
- Export CSV
- Order detail panel
- WhatsApp and email follow-up buttons

### Analytics dashboard features
- Live visitors (60s window)
- Visitors today / yesterday / week / month
- Funnel metrics:
  - page views
  - template views
  - modal opens
  - demo clicks
  - buy clicks
  - checkout opens
  - payment successes
- Conversion rate (payments ÷ checkout opens)
- Revenue from paid orders
- Page-wise and template-wise bar charts
- Filters: today, yesterday, last 7 days, last 30 days, this month, custom range

---

## 5. Admin APIs

### `GET /api/analytics`
Headers: `X-Dvites-Admin-Key`

Query params:
- `range=today|yesterday|week|30d|month|custom`
- `from=YYYY-MM-DD` (custom)
- `to=YYYY-MM-DD` (custom)

### `GET /api/orders`
Headers: `X-Dvites-Admin-Key`

Query params:
- `search`
- `range=all|today|week|month|30d`
- `status`
- `id` (single order detail)

### `POST /api/push-subscribe`
Public endpoint for saving admin push subscriptions.

### `GET /api/push-subscribe`
Returns `{ publicKey, enabled }` for client subscription setup.

---

## 6. PWA installable admin app

### Files
- `/admin/manifest.json`
- `/admin/service-worker.js`

### App name
**Dvites Orders**

### Install on Android
1. Open `https://your-domain/admin/orders.html` in Chrome
2. Sign in with admin API key
3. Chrome menu → **Add to Home screen** / **Install app**
4. App opens standalone with dark dashboard shell

### Cached shell
Service worker caches admin HTML, CSS, JS, manifest, and favicon for faster reopen.

---

## 7. Push notifications on new order

### Flow
1. Admin opens `/admin/orders.html` or `/admin/analytics.html`
2. Click **Enable Order Notifications**
3. Browser asks permission
4. Subscription saved to `push_subscriptions` via `/api/push-subscribe`
5. When `verify-payment.js` saves a successful order, it calls `notifyAdminsOfOrder()`
6. All saved subscriptions receive:
   - **Title:** New Dvites Order
   - **Body:** `{template_name} — ₹{amount}`
   - **Click opens:** `/admin/orders.html`

### Requirements
- HTTPS (production)
- VAPID keys configured
- Service worker registered under `/admin/`
- At least one admin device subscribed

### If push does not arrive
1. Confirm `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT` in Cloudflare
2. Re-enable notifications on the admin device
3. Check `push_subscriptions` table has a row
4. Complete a test order and verify `order_saved: true`
5. Check Cloudflare function logs for push send errors

Payment verification still returns `success: true` even if push fails.

---

## 8. Files changed / added

### New files
| File | Purpose |
|------|---------|
| `docs/sql/phase3-analytics.sql` | Supabase schema + RLS |
| `assets/analytics.js` | Client tracking |
| `functions/api/track.js` | Event ingest |
| `functions/api/analytics.js` | Analytics API |
| `functions/api/orders.js` | Orders API |
| `functions/api/push-subscribe.js` | Push subscription API |
| `functions/_lib/supabase.js` | Supabase helpers |
| `functions/_lib/admin-auth.js` | Admin auth helper |
| `functions/_lib/dates.js` | Date range helpers |
| `functions/_lib/webpush.js` | Web Push sender |
| `admin/admin.css` | Admin UI styles |
| `admin/admin-common.js` | Shared admin shell/auth/PWA |
| `admin/analytics.html` | Analytics dashboard |
| `admin/analytics.js` | Analytics UI logic |
| `admin/orders.html` | Orders dashboard |
| `admin/orders.js` | Orders UI logic |
| `admin/manifest.json` | PWA manifest |
| `admin/service-worker.js` | PWA + push handler |
| `admin/notification-sound.js` | Custom MP3 order sound player + settings |
| `assets/notifications/README.md` | Where to place `new-order.mp3` |

### Updated files
| File | Change |
|------|--------|
| `functions/api/verify-payment.js` | Sends admin push after order save |
| `assets/payment.js` | Tracks checkout_open + payment_success |
| `index.html`, `templates.html`, `partner-studio.html`, `thank-you.html`, legal pages | Added `analytics.js` |
| `admin/admin-common.js` | Sound settings panel + order polling init |
| `admin/orders.js` | Feeds new orders into sound detector |
| `admin/service-worker.js` | Posts `DVITES_NEW_ORDER` to open admin tabs |
| `admin/admin.css` | Sound settings + autoplay unlock banner styles |

---

## 11. Custom MP3 notification sound (admin)

Browser push notifications **cannot reliably play a custom MP3** as the OS notification sound. Instead, Dvites plays your MP3 **inside the open admin dashboard/PWA** when a new order is detected.

### Where to place the MP3

Put your sound file here:

```text
assets/notifications/new-order.mp3
```

Default URL used by admin:

```text
/assets/notifications/new-order.mp3
```

See also: `assets/notifications/README.md`

Recommended: short MP3, 0.3–1.5 seconds, under ~200 KB.

### Admin settings (sidebar)

On `/admin/orders.html` and `/admin/analytics.html`:

- **Enable sound** toggle
- **Sound URL / path** input (local path or full HTTPS URL)
- **Volume** slider
- **Test Sound** button

Settings are saved in `localStorage`:

| Key | Purpose |
|-----|---------|
| `dvites_notification_sound_enabled` | `1` or `0` |
| `dvites_notification_sound_url` | MP3 path or URL |
| `dvites_notification_sound_volume` | `0` to `1` |

### When sound plays

Sound plays once (no loop) when:

1. **Push arrives** and an admin tab is open (service worker messages the page)
2. **Polling detects a new order** (every 20 seconds on today’s orders)
3. **Orders page refresh** finds a new order ID

Duplicate triggers within 3 seconds are ignored.

### Browser autoplay limitation

Browsers often block audio until the user interacts with the page. If autoplay is blocked:

- A banner appears: **“Click to enable notification sound”**
- Click **Enable Sound** or **Test Sound** once to unlock audio for that session

### How to change the sound

1. Upload your MP3 to `assets/notifications/` (or host elsewhere)
2. Open admin dashboard
3. Set **Sound URL / path** (e.g. `/assets/notifications/my-chime.mp3`)
4. Click **Test Sound**
5. Toggle **Enable sound** on

### QA checklist — notification sound

- [ ] Add `new-order.mp3` to `assets/notifications/`
- [ ] Open admin → click **Test Sound** → hear MP3
- [ ] Complete test order → sound plays in open admin tab
- [ ] Push notification still appears (OS sound separate from MP3)
- [ ] Autoplay banner appears on fresh tab until user clicks Enable Sound

---

## 12. Manual QA checklist

### Analytics
- [ ] Run SQL migration in Supabase
- [ ] Set Cloudflare env vars
- [ ] Open homepage → `analytics_events` gets `page_view`
- [ ] Wait 20s → `live_sessions.last_seen_at` updates
- [ ] Open template modal → `modal_open` event
- [ ] Click Watch Demo → `demo_click`
- [ ] Click Buy / Customize → `buy_click`
- [ ] Open analytics dashboard with admin key → live visitors shows ≥ 1

### Orders dashboard
- [ ] Open `/admin/orders.html`
- [ ] Enter `ADMIN_API_KEY`
- [ ] Orders list loads
- [ ] Search works
- [ ] Export CSV downloads
- [ ] Click order row → detail panel opens
- [ ] WhatsApp / Email buttons open with prefilled text

### Checkout safety
- [ ] ₹5 test card still completes payment
- [ ] Thank-you redirect still works
- [ ] Supabase order still saved
- [ ] Production ₹1,499 checkout unaffected

### PWA
- [ ] Install admin app on Android
- [ ] App opens standalone
- [ ] Orders dashboard loads after install

### Push notifications
- [ ] Generate and set VAPID keys
- [ ] Click **Enable Order Notifications** on admin
- [ ] Complete test payment
- [ ] Notification appears on subscribed device
- [ ] Notification click opens orders dashboard

---

## 13. Next steps (optional hardening)

1. Replace publishable-key select policies with authenticated admin-only reads
2. Add `service_role` only inside Cloudflare if you want stricter RLS
3. Add Supabase RPC functions for faster analytics aggregation at scale
4. Add order status update actions in admin UI
5. Add failed push cleanup for expired subscriptions
