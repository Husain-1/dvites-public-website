# Dvites Phase 1 Audit — Master Summary

**Audit date:** 2026-07-03  
**Scope:** 9 wedding invitation templates in `templates/`  
**Mode:** Read-only — no template files were modified  
**Reports:** Individual findings in this directory (`*.md`)

---

## Overview

This audit assessed external dependencies, original-platform branding, SEO readiness, analytics/tracking, and local hosting viability across all Phase 1 templates. Templates fall into four source families:

| Family | Templates | Typical state |
|---|---|---|
| WooWowInvites SPA | balcony-seaview, curtains | Local theme assets + API shim; large platform bundle with tracking |
| Framer export | laavan, Mountains, niqah | Self-contained static HTML; minor Framer metadata residue |
| ShaadiPath conversion | mewar-midnight, rajkamal-palace | Fully self-hosted assets; Google Fonts only |
| Tilda/Webgency | oud-blossom-majlis | Local media; Tilda CDN for JS/CSS/animations |

---

## Scorecard

| Template | External Dependencies | Branding Issues | External URLs | Analytics | Local Hosting Ready | Production Ready | Overall Score |
|---|---|---|---|---|---|---|---|
| balcony-seaview | **Critical** — Google Fonts; Supabase/WooWow refs in bundle; Meta tracking modules shipped | Medium — platform code in JS; Dvites bar OK | Medium — no canonical/OG; demo Maps/Booking | **High** — metaTracking, analyticsTracker, ViralLoopAnalytics in assets | Partial | No | **50/100** |
| curtains | **Critical** — same as balcony-seaview + Supabase JWT in admin chunk | Medium — wooowinvites.com in legal/admin chunks | Medium — no canonical/OG | **High** — same tracking modules | Partial | No | **50/100** |
| laavan | Low — fully local scripts/fonts/images | Low — Framer comment + generator meta | Low — Dvites canonical; buy links to dvites.com | None detected | **Yes** | Mostly | **76/100** |
| maison-doree | **High** — Adobe Typekit + Google Fonts; Supabase in bundle | Low — Dvites branded; TDY stubs only | Medium — no canonical/OG | Low — gtag/fbq stubbed | Partial (fonts) | Mostly | **58/100** |
| mewar-midnight | Low — Google Fonts only | None in runtime | Low — Dvites SEO + demo wa.me | None | **Yes** | **Yes** | **84/100** |
| Mountains | Low — self-contained | Low — Framer comment; canonical path mismatch | Low — dvites.com + demo WhatsApp | None | **Yes** | Mostly | **76/100** |
| niqah | Low — self-contained | Low — Framer comment | Low — Dvites SEO complete | None | **Yes** | Mostly | **76/100** |
| oud-blossom-majlis | **High** — Tilda JS/CSS CDN; Tilda fonts; Google Fonts Ovo | None in runtime | Low — Dvites SEO; Tilda forms key remains | None (tilda-stat removed) | Partial | Partial | **64/100** |
| rajkamal-palace | Low — Google Fonts only | None in runtime | Low — Dvites SEO + demo links | None | **Yes** | **Yes** | **84/100** |

### Sub-scores (all templates)

| Template | Dep Clean /10 | Brand /10 | SEO /10 | Local /10 | Prod /10 |
|---|---|---|---|---|---|
| balcony-seaview | 4 | 6 | 4 | 6 | 5 |
| curtains | 4 | 6 | 4 | 6 | 5 |
| laavan | 8 | 7 | 7 | 9 | 7 |
| maison-doree | 5 | 8 | 4 | 7 | 6 |
| mewar-midnight | 8 | 9 | 8 | 9 | 8 |
| Mountains | 8 | 7 | 7 | 9 | 7 |
| niqah | 8 | 7 | 7 | 9 | 7 |
| oud-blossom-majlis | 4 | 8 | 8 | 6 | 6 |
| rajkamal-palace | 8 | 9 | 8 | 9 | 8 |

---

## Cross-Cutting Findings

### Critical (fix before production)

1. **WooWowInvites tracking modules** (`balcony-seaview`, `curtains`)
   - `assets/metaTracking-W-6Q2wZT.js` — Meta/Facebook pixel logic
   - `assets/analyticsTracker-CPk2dKn7.js`, `assets/ViralLoopAnalytics-7a3ChOE1.js`
   - **Action:** Invite-only rebuild; exclude admin/marketing chunks

2. **Supabase credentials in shipped assets** (`curtains`)
   - `assets/r2Upload-B5N7rExL.js` contains project URL + anon JWT
   - **Action:** Never deploy admin chunks; audit bundle for secrets

3. **Tilda runtime CDN dependency** (`oud-blossom-majlis`)
   - 15+ scripts/styles from `static.tildacdn.net`
   - **Action:** Mirror Tilda core locally or rebuild animations

### High priority

4. **Adobe Typekit dependency** (`maison-doree`) — `use.typekit.net/jzm0juw.css`
5. **Google Fonts on 5 templates** — balcony-seaview, curtains, maison-doree, mewar-midnight, rajkamal-palace (+ Ovo on oud-blossom-majlis)
6. **Missing SEO blocks** — balcony-seaview, curtains, maison-doree lack canonical/OG/Twitter
7. **WooWow platform surface area** — hundreds of unused JS chunks (admin, checkout, blog) in SPA templates

### Medium priority

8. **Framer metadata residue** — laavan, Mountains, niqah (`Made in Framer` comment, generator meta)
9. **Absolute path prefixes** — `/templates/{name}/...` on SPA and Framer templates (hosting portability)
10. **Mountains canonical mismatch** — points to `/demos/mountain` not `/templates/Mountains`
11. **Tilda forms project key** — oud-blossom-majlis retains `data-tilda-formskey`
12. **Buy bar inconsistency** — some templates use `href="#"`, others `https://www.dvites.com/`

### Low priority

13. Demo WhatsApp/Maps/Booking URLs in JSON/content (expected for demos)
14. `index-source.html` archival files contain original-platform URLs (exclude from deploy)
15. Dev tooling in repo (`node_modules/playwright`, `browser-audit.js`, `mirror.js`) — exclude from production

---

## Local Hosting Readiness Matrix

| Template | Visual assets | Audio/Video | Fonts | Runtime JS/CSS | Fully offline? |
|---|---|---|---|---|---|
| balcony-seaview | Local | Local | Google CDN | Local (+ dead platform code) | No |
| curtains | Local | Local | Google CDN | Local (+ dead platform code) | No |
| laavan | Local | Local | Local | Local | **Yes** |
| maison-doree | Local | Local | Typekit + Google | Local React | No |
| mewar-midnight | Local | Local | Google CDN | Local | Almost |
| Mountains | Local | Local | Local | Local | **Yes** |
| niqah | Local | Local | Local | Local | **Yes** |
| oud-blossom-majlis | Local | Local | Tilda CDN + Google | Tilda CDN | No |
| rajkamal-palace | Local | Local | Google CDN | Local | Almost |

---

## Analytics / Tracking Summary

| Template | Live tracking in index.html | Tracking code in assets | Verdict |
|---|---|---|---|
| balcony-seaview | None | Meta pixel + analytics modules present | **Fail** |
| curtains | None | Same as balcony-seaview | **Fail** |
| laavan | None | None | Pass |
| maison-doree | None (stubbed gtag/fbq) | Stub only | Pass |
| mewar-midnight | None | None | Pass |
| Mountains | None | None | Pass |
| niqah | None | None | Pass |
| oud-blossom-majlis | None (tilda-stat removed) | None | Pass |
| rajkamal-palace | None | None | Pass |

---

## Recommended Phase 2 Priority Order

1. **P0 — Security/tracking purge:** balcony-seaview, curtains (rebuild invite-only bundle)
2. **P1 — CDN localization:** oud-blossom-majlis (Tilda mirror), maison-doree (Typekit → local)
3. **P1 — Font localization:** All Google Fonts templates
4. **P2 — SEO normalization:** Add canonical/OG to balcony-seaview, curtains, maison-doree; fix Mountains canonical path
5. **P2 — Metadata cleanup:** Remove Framer comments/generator from laavan, Mountains, niqah
6. **P3 — Bundle diet:** Remove unused admin/marketing chunks from WooWow templates
7. **P3 — Path portability:** Evaluate relative vs absolute asset paths across all templates

---

## Production-Ready Templates (Phase 1)

**Ready with minor Phase 2 polish:**
- `mewar-midnight` (84/100)
- `rajkamal-palace` (84/100)

**Near-ready (Framer family):**
- `laavan`, `Mountains`, `niqah` (76/100 each)

**Requires significant Phase 2 work:**
- `balcony-seaview`, `curtains` (50/100)
- `maison-doree` (58/100)
- `oud-blossom-majlis` (64/100)

---

## Audit Artifacts

| Report | Path |
|---|---|
| balcony-seaview | `docs/audit/balcony-seaview.md` |
| curtains | `docs/audit/curtains.md` |
| laavan | `docs/audit/laavan.md` |
| maison-doree | `docs/audit/maison-doree.md` |
| mewar-midnight | `docs/audit/mewar-midnight.md` |
| Mountains | `docs/audit/Mountains.md` |
| niqah | `docs/audit/niqah.md` |
| oud-blossom-majlis | `docs/audit/oud-blossom-majlis.md` |
| rajkamal-palace | `docs/audit/rajkamal-palace.md` |

---

*End of Phase 1 audit. No repository files outside `docs/audit/` were created or modified.*
