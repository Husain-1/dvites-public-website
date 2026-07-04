#!/usr/bin/env node
/**
 * Mirror Maison Dorée template from tdy-excellence-template.thedigitalyes.com
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = __dirname;
const ASSETS = path.join(ROOT, "assets");
const DATA_DIR = path.join(ASSETS, "data");
const ORIGIN = "https://tdy-excellence-template.thedigitalyes.com";
const BASE = "/templates/maison-doree/";
const ASSET_PREFIX = `${BASE}assets/`;

const ASSET_FILES = [
  "index-CqO5qALc.js",
  "index-B32MlQA-.css",
  "bouquet-BbYUpj3K.png",
  "candles-BlDM94c8.png",
  "column-left-Deau9Trj.png",
  "column-right-DejZoXz8.png",
  "curtain-center-new-EwKr26ZU.png",
  "curtain-left-new-C9yBPbWK.png",
  "curtain-right-new-Dusl3IYi.png",
  "cypress-trees-Bn8J7j_a.png",
  "flower-stand-BmJQHDXB.png",
  "flower-vase-B9_turUq.png",
  "hero-video-C3EkV1og.mp4",
  "hotel-marriott-wV0E4Iky.png",
  "hotel-novotel-CUyCHsIf.png",
  "hotel-peninsula-Is4jSbdC.png",
  "intro-poster-new-CNDDqY2q.jpg",
  "intro-video-new-CeLMqoNn.mp4",
  "monogram-Dd4GSvtc.png",
  "peninsula-hotel-DfDFGUc8.png",
  "roses-bottom-right-C-Wj2fia.png",
  "roses-top-left-D0RRxzlV.png",
  "rsvp-confirmation-DYbKwzwP.webm",
  "vase-left-DfaX_fU4.png",
  "vase-right-BfgTPz8l.png",
  "wedding-background-music-yxy0nS2O.mp3",
  "yacht-illustration-BxPtm2NZ.png",
];

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "dvites-mirror/1.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          fetchBuffer(new URL(res.headers.location, url).href).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          res.resume();
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      })
      .on("error", reject);
  });
}

function rewritePaths(content) {
  return content
    .split("/assets/").join(ASSET_PREFIX)
    .split('"/assets/').join(`"${ASSET_PREFIX}`)
    .split("'/assets/").join(`'${ASSET_PREFIX}`)
    .split("url(/assets/").join(`url(${ASSET_PREFIX}`)
    .split("url(/assets/").join(`url(${ASSET_PREFIX}`);
}

function fixDoublePrefix(content) {
  return content.replace(/\/templates\/maison-doree\/assets\/templates\/maison-doree\/assets\//g, ASSET_PREFIX);
}

function applyDvitesBranding(content) {
  return content
    .replace('"footer.madeBy":"Made with love by"', '"footer.madeBy":"Crafted By Dvites"')
    .replace('"footer.madeBy":"Mit Liebe gestaltet von"', '"footer.madeBy":"Erstellt von Dvites"')
    .replace(
      'children:[r("footer.madeBy")," ",h.jsx("a",{href:"https://www.thedigitalyes.com",target:"_blank",rel:"noopener noreferrer",className:"hover:text-foreground transition-colors underline underline-offset-2",children:"The Digital Yes"})]',
      'children:h.jsx("a",{href:"https://www.dvites.com",target:"_blank",rel:"noopener noreferrer",className:"hover:text-foreground transition-colors underline underline-offset-2",children:r("footer.madeBy")})'
    );
}

async function downloadAssets() {
  fs.mkdirSync(ASSETS, { recursive: true });
  fs.mkdirSync(DATA_DIR, { recursive: true });

  for (const file of ASSET_FILES) {
    const url = `${ORIGIN}/assets/${file}`;
    const dest = path.join(ASSETS, file);
    process.stdout.write(`  dl ${file}\n`);
    const buf = await fetchBuffer(url);
    if (/\.(js|css)$/i.test(file)) {
      let text = fixDoublePrefix(rewritePaths(buf.toString("utf8")));
      if (/\.js$/i.test(file)) text = applyDvitesBranding(text);
      fs.writeFileSync(dest, text);
    } else {
      fs.writeFileSync(dest, buf);
    }
  }
}

function copyDvitesLogo() {
  const src = path.join(__dirname, "../curtains/assets/images/dvites-logo.png");
  const fallback = path.join(__dirname, "../balcony-seaview/assets/images/dvites-logo.png");
  const dest = path.join(ASSETS, "images");
  fs.mkdirSync(dest, { recursive: true });
  const destFile = path.join(dest, "dvites-logo.png");
  if (fs.existsSync(src)) fs.copyFileSync(src, destFile);
  else if (fs.existsSync(fallback)) fs.copyFileSync(fallback, destFile);
}

function buildLocalRuntime() {
  const runtime = `(() => {
  if (location.pathname !== "/") {
    history.replaceState(null, "", "/" + location.search + location.hash);
  }

  const originalFetch = window.fetch.bind(window);
  window.fetch = async function(input, init) {
    const url = typeof input === "string" ? input : (input && input.url) || "";

    if (
      url.includes("supabase.co") ||
      url.includes("stripe.com") ||
      url.includes("thedigitalyes.com/__l5e") ||
      url.includes("thedigitalyes.com/~api") ||
      url.includes("/__l5e/") ||
      url.includes("/~flock") ||
      url.includes("ipapi.co")
    ) {
      if (url.includes("/rest/v1/") || url.includes("/rpc/")) {
        return new Response("[]", {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url.includes("/auth/v1/")) {
        return new Response(JSON.stringify({ message: "Auth session missing!" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (url.includes("thedigitalyes.com") && !url.includes("/templates/maison-doree/")) {
      return new Response(JSON.stringify({}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return originalFetch(input, init);
  };

  window.fbq = function() {};
  window.fbq.q = [];
  window.gtag = function() {};
  window.dataLayer = window.dataLayer || [];
})();
`;
  fs.writeFileSync(path.join(DATA_DIR, "local-runtime.js"), runtime);
}

function buildIndexHtml() {
  const html = `<!doctype html>
<html lang="en" class="light" translate="no" style="color-scheme: light only">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Maison Dorée — Diana &amp; Richard Wedding Invitation</title>
    <meta name="description" content="Maison Dorée wedding invitation demo — Dvites" />
    <meta name="google" content="notranslate" />
    <link rel="icon" type="image/png" href="/templates/maison-doree/assets/monogram-Dd4GSvtc.png" />

    <link rel="stylesheet" href="https://use.typekit.net/jzm0juw.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Inter:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Inter:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet"></noscript>

    <script src="/templates/maison-doree/assets/data/local-runtime.js"></script>
    <script type="module" crossorigin src="/templates/maison-doree/assets/index-CqO5qALc.js"></script>
    <link rel="stylesheet" crossorigin href="/templates/maison-doree/assets/index-B32MlQA-.css">
  </head>
  <body>
    <div id="root"></div>

    <div class="dvites-buy-bar">
      <div class="dvites-brand">
        <img src="/templates/maison-doree/assets/images/dvites-logo.png" alt="Dvites">
      </div>
      <span class="dvites-text">Personalize this invitation in minutes.</span>
      <a href="#" id="buyNowBtn">Buy Now</a>
    </div>

    <style>
.dvites-buy-bar{position:fixed;top:0;left:0;width:100%;height:68px;background:rgba(35,20,26,.88);backdrop-filter:blur(18px);display:flex;align-items:center;justify-content:space-between;padding:0 32px;z-index:999999;border-bottom:1px solid rgba(255,255,255,.08)}
body{padding-top:68px}
.dvites-brand{display:flex;align-items:center}
.dvites-brand img{height:40px;width:auto;display:block}
.dvites-text{flex:1;text-align:center;color:#fff;font-size:16px;font-weight:500;font-family:Inter,sans-serif;padding:0 24px}
.dvites-buy-bar a{text-decoration:none;background:#EF6B96;color:#fff;padding:12px 28px;border-radius:999px;font-weight:700;transition:.25s;white-space:nowrap}
.dvites-buy-bar a:hover{transform:translateY(-2px);background:#F57EA5}
@media(max-width:768px){
  .dvites-buy-bar{padding:10px 16px;height:auto;flex-wrap:wrap;justify-content:center;gap:10px}
  body{padding-top:100px}
  .dvites-brand{width:100%;justify-content:center}
  .dvites-brand img{height:34px}
  .dvites-text{width:100%;text-align:center;font-size:14px;padding:0}
  .dvites-buy-bar a{width:100%;text-align:center}
}
    </style>
  </body>
</html>
`;
  fs.writeFileSync(path.join(ROOT, "index.html"), html);
}

async function main() {
  console.log("Downloading Maison Dorée assets...");
  await downloadAssets();
  copyDvitesLogo();
  buildLocalRuntime();
  buildIndexHtml();
  console.log("Done: templates/maison-doree/index.html");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
