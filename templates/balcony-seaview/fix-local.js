#!/usr/bin/env node
/**
 * Fix balcony-seaview for static serving at:
 * http://127.0.0.1:5500/templates/balcony-seaview/index.html
 */
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const ROOT = __dirname;
const ASSETS = path.join(ROOT, "assets");
const IMAGES = path.join(ASSETS, "images");
const AUDIO = path.join(ASSETS, "audio");
const DATA_FILE = path.join(ASSETS, "data", "invite.json");
const BASE = "/templates/balcony-seaview/";
const ASSET_PREFIX = `${BASE}assets/`;

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib
      .get(url, { headers: { "User-Agent": "dvites-fix/1.0" } }, (res) => {
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

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

function localNameFromUrl(url) {
  const clean = url.split("?")[0];
  return path.basename(clean).replace(/[^a-zA-Z0-9._-]/g, "-");
}

function collectUrls(value, set) {
  if (typeof value === "string") {
    if (
      value.includes("kdcyugwruypwrmtllswt.supabase.co/storage/") ||
      value.startsWith("/audio/") ||
      value.includes("wooowinvites.com/")
    ) {
      set.add(value);
    }
  } else if (Array.isArray(value)) {
    value.forEach((v) => collectUrls(v, set));
  } else if (value && typeof value === "object") {
    Object.values(value).forEach((v) => collectUrls(v, set));
  }
}

async function localizeInviteMedia() {
  const invite = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  const urls = new Set();
  collectUrls(invite.row, urls);

  const map = new Map();
  for (const url of urls) {
    let remote = url;
    if (url.startsWith("/audio/")) {
      remote = `https://www.wooowinvites.com${url}`;
    }
    const name = localNameFromUrl(remote);
    const isAudio = /\.(mp3|wav|ogg)$/i.test(name);
    const destDir = isAudio ? AUDIO : IMAGES;
    const dest = path.join(destDir, name);
    if (!fs.existsSync(dest)) {
      process.stdout.write(`  dl ${name}\n`);
      try {
        const buf = await fetchBuffer(remote);
        fs.writeFileSync(dest, buf);
      } catch (err) {
        console.warn(`  skip ${name}: ${err.message}`);
        continue;
      }
    }
    map.set(url, `${ASSET_PREFIX}${isAudio ? "audio" : "images"}/${name}`);
  }

  let json = fs.readFileSync(DATA_FILE, "utf8");
  for (const [from, to] of [...map.entries()].sort((a, b) => b[0].length - a[0].length)) {
    json = json.split(from).join(to);
  }
  fs.writeFileSync(DATA_FILE, json);
  console.log(`Localized ${map.size} media URLs in invite.json`);
}

function fixAssetPaths() {
  let changed = 0;
  for (const file of walk(ASSETS)) {
    if (!/\.(js|css|mjs)$/i.test(file)) continue;
    let content = fs.readFileSync(file, "utf8");
    const next = content
      .replace(/from"\.\/([A-Za-z0-9_.-]+\.(?:js|css|mjs|json))"/g, `from"${ASSET_PREFIX}$1"`)
      .replace(/from'\.\/([A-Za-z0-9_.-]+\.(?:js|css|mjs|json))'/g, `from'${ASSET_PREFIX}$1'`)
      .replace(/import\("\.\/([A-Za-z0-9_.-]+\.(?:js|css|mjs|json))"\)/g, `import("${ASSET_PREFIX}$1")`)
      .replace(/import\('\.\/([A-Za-z0-9_.-]+\.(?:js|css|mjs|json))'\)/g, `import('${ASSET_PREFIX}$1')`)
      .replace(/"\.\/([A-Za-z0-9_.-]+\.(?:js|css|mjs|json))"/g, `"${ASSET_PREFIX}$1"`)
      .replace(/"\.\/assets\//g, `"${ASSET_PREFIX}`)
      .replace(/'\.\/assets\//g, `'${ASSET_PREFIX}`)
    if (next !== content) {
      fs.writeFileSync(file, next);
      changed++;
    }
  }
  console.log(`Fixed asset paths in ${changed} bundle files`);
}

function removeDuplicateIndexes() {
  const dup = path.join(ROOT, "invite");
  if (fs.existsSync(dup)) {
    fs.rmSync(dup, { recursive: true, force: true });
    console.log("Removed invite/ duplicate index tree");
  }
  const src = path.join(ROOT, "index-source.html");
  if (fs.existsSync(src)) {
    fs.unlinkSync(src);
    console.log("Removed index-source.html");
  }
}

function buildIndexHtml() {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Josephine &amp; Calendra — Seaview Balcony Invitation</title>
    <meta name="description" content="Digital wedding invitation — Seaview Balcony theme" />
    <link rel="icon" type="image/png" href="/templates/balcony-seaview/assets/images/favicon.png" />
    <link rel="apple-touch-icon" href="/templates/balcony-seaview/assets/images/favicon.png" />

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Raleway:wght@300;400;500;600&display=swap" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Raleway:wght@300;400;500;600&display=swap" rel="stylesheet"></noscript>
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Dancing+Script:wght@400;500;600&family=Great+Vibes&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Dancing+Script:wght@400;500;600&family=Great+Vibes&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap" rel="stylesheet"></noscript>

    <script src="/templates/balcony-seaview/assets/data/local-runtime.js"></script>
    <script type="module" crossorigin src="/templates/balcony-seaview/assets/index-Cfoc4NWM.js"></script>
    <link rel="stylesheet" crossorigin href="/templates/balcony-seaview/assets/index-Skdm8sZv.css">
  </head>
  <body>
    <div id="root"></div>

    <div class="dvites-buy-bar">
      <div class="dvites-brand">
        <img src="/templates/balcony-seaview/assets/images/dvites-logo.png" alt="Dvites">
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
  console.log("Wrote index.html");
}

function buildLocalRuntime() {
  const runtime = `(() => {
  const INVITE_SLUG = "demo-4638f3";
  const INVITE_PATH = "/invite/" + INVITE_SLUG;
  const INVITE_SERVE_URL = INVITE_PATH + "/";
  let invitePayload = null;

  const path = location.pathname;
  if (path === INVITE_PATH) {
    location.replace(INVITE_SERVE_URL + location.search + location.hash);
  } else if (path.includes("/templates/balcony-seaview/") && path.endsWith(".html")) {
    location.replace(INVITE_SERVE_URL + location.search + location.hash);
  } else if (!path.startsWith(INVITE_PATH)) {
    location.replace(INVITE_SERVE_URL + location.search + location.hash);
  } else if (path.endsWith("/index.html")) {
    history.replaceState(null, "", INVITE_SERVE_URL + location.search + location.hash);
  }

  const originalFetch = window.fetch.bind(window);
  window.fetch = async function(input, init) {
    const url = typeof input === "string" ? input : (input && input.url) || "";

    if (url.includes("ipapi.co")) {
      return new Response(JSON.stringify({ country_code: "US" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (url.includes("wooowinvites.com") && !url.includes("/assets/")) {
      return new Response(JSON.stringify({}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (url.includes("kdcyugwruypwrmtllswt.supabase.co")) {
      if (url.includes("/rpc/get_invitation_data")) {
        return new Response("[]", {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      if (url.includes("/rpc/get_event_password_status")) {
        return new Response("false", {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      if (url.includes("/rpc/verify_event_password")) {
        return new Response("true", {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      if (url.includes("/rpc/get_demo_invitation")) {
        if (!invitePayload) {
          const res = await originalFetch("/templates/balcony-seaview/assets/data/invite.json");
          const json = await res.json();
          invitePayload = json.row;
        }
        return new Response(JSON.stringify(invitePayload), {
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

      if (url.includes("/rest/v1/")) {
        return new Response("[]", {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    return originalFetch(input, init);
  };
})();
`;
  fs.mkdirSync(path.join(ASSETS, "data"), { recursive: true });
  fs.writeFileSync(path.join(ASSETS, "data", "local-runtime.js"), runtime);
  console.log("Wrote assets/data/local-runtime.js");
}

async function main() {
  fs.mkdirSync(IMAGES, { recursive: true });
  fs.mkdirSync(AUDIO, { recursive: true });

  console.log("Localizing invite media...");
  await localizeInviteMedia();

  console.log("Fixing bundle paths...");
  fixAssetPaths();

  console.log("Fixing asset URL paths...");
  require("./fix-static-urls.js");
  require("./fix-import-paths.js");
  require("./fix-side-effect-imports.js");
  require("./fix-all-paths.js");

  console.log("Building runtime + index...");
  buildLocalRuntime();
  buildIndexHtml();
  removeDuplicateIndexes();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
