#!/usr/bin/env node
/**
 * Build templates/curtains from balcony-seaview runtime + demo-39e188 invite data.
 * Does not modify balcony-seaview.
 */
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const ROOT = __dirname;
const SOURCE_ASSETS = path.join(__dirname, "../balcony-seaview/assets");
const ASSETS = path.join(ROOT, "assets");
const IMAGES = path.join(ASSETS, "images");
const AUDIO = path.join(ASSETS, "audio");
const DATA_DIR = path.join(ASSETS, "data");

const SLUG = "demo-39e188";
const BASE = "/templates/curtains/";
const ASSET_PREFIX = `${BASE}assets/`;
const DEP_PREFIX = "templates/curtains/assets/";

const SHARED_IMAGES = [
  "curtains-theme-BiJZdLpp.mp4",
  "curtains-theme-poster-BhK08iq7.jpg",
  "embroidery-beige-bg-DRgV_0KT.png",
  "embroidery-blush-bg-BwHedX51.png",
  "embroidery-sky-bg-ztx4IxVw.png",
  "embroidery-white-bg-DH7eukkK.png",
  "favicon.png",
  "dvites-logo.png",
  "floral-cluster-1-Dg9Ci0LE.png",
  "floral-cluster-2-2e0MmtfE.png",
  "floral-cluster-3-CbjduXck.png",
  "envelope-DxZBsIH2.png",
  "line-art-couple-CTF9TGOp.png",
  "line-art-cake-iFWdfuo4.png",
  "line-art-champagne-OWqV10Oz.png",
  "icon-ourstory-Cqlfh1qE.png",
  "icon-venue-YEPiR0jW.png",
  "icon-accommodation-Bh_8vT3t.png",
  "icon-timeline-Sc8-g-hk.png",
];

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib
      .get(url, { headers: { "User-Agent": "dvites-setup/1.0" } }, (res) => {
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

function postRpc(fn, body, key) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = https.request(
      {
        hostname: "kdcyugwruypwrmtllswt.supabase.co",
        path: `/rest/v1/rpc/${fn}`,
        method: "POST",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
      },
      (res) => {
        let buf = "";
        res.on("data", (c) => (buf += c));
        res.on("end", () => {
          if (res.statusCode !== 200) {
            reject(new Error(`${fn} HTTP ${res.statusCode}: ${buf.slice(0, 200)}`));
            return;
          }
          resolve(JSON.parse(buf));
        });
      }
    );
    req.on("error", reject);
    req.write(data);
    req.end();
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

function rewritePaths(content) {
  return content
    .split("/templates/balcony-seaview/assets/").join("/templates/curtains/assets/")
    .split("templates/balcony-seaview/assets/").join("templates/curtains/assets/")
    .split("/templates/balcony-seaview/").join("/templates/curtains/");
}

function localNameFromUrl(url) {
  return path.basename(url.split("?")[0]).replace(/[^a-zA-Z0-9._-]/g, "-");
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

async function captureInvite(key) {
  let row = null;
  let rpc = "get_invitation_data";
  const invitationData = await postRpc("get_invitation_data", { _slug: SLUG }, key);
  if (Array.isArray(invitationData) && invitationData.length > 0) {
    row = invitationData[0];
  } else {
    rpc = "get_demo_invitation";
    row = await postRpc("get_demo_invitation", { _slug: SLUG }, key);
  }
  return { slug: SLUG, rpc, capturedAt: new Date().toISOString(), row };
}

function copyRuntimeBundles() {
  fs.mkdirSync(ASSETS, { recursive: true });
  fs.mkdirSync(DATA_DIR, { recursive: true });
  let copied = 0;
  for (const file of fs.readdirSync(SOURCE_ASSETS)) {
    const src = path.join(SOURCE_ASSETS, file);
    if (!fs.statSync(src).isFile()) continue;
    if (!/\.(js|css|mjs|json)$/i.test(file)) continue;
    if (file === "invite.json") continue;
    const dest = path.join(ASSETS, file);
    const content = rewritePaths(fs.readFileSync(src, "utf8"));
    fs.writeFileSync(dest, content);
    copied++;
  }
  console.log(`Copied ${copied} runtime bundles from balcony-seaview`);
}

function copySharedMedia() {
  fs.mkdirSync(IMAGES, { recursive: true });
  let copied = 0;
  for (const name of SHARED_IMAGES) {
    const src = path.join(SOURCE_ASSETS, "images", name);
    const dest = path.join(IMAGES, name);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      copied++;
    } else {
      console.warn(`  missing shared image in balcony: ${name}`);
    }
  }
  const countries = path.join(SOURCE_ASSETS, "countries-50m.json");
  if (fs.existsSync(countries)) {
    fs.copyFileSync(countries, path.join(ASSETS, "countries-50m.json"));
    copied++;
  }
  console.log(`Copied ${copied} shared media files from balcony-seaview`);
}

async function localizeInviteMedia(invite) {
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
    fs.mkdirSync(destDir, { recursive: true });
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

  let json = JSON.stringify(invite, null, 2);
  for (const [from, to] of [...map.entries()].sort((a, b) => b[0].length - a[0].length)) {
    json = json.split(from).join(to);
  }
  fs.writeFileSync(path.join(DATA_DIR, "invite.json"), json);
  console.log(`Localized ${map.size} invite media URLs`);
}

function patchInviteJson() {
  const file = path.join(DATA_DIR, "invite.json");
  const invite = JSON.parse(fs.readFileSync(file, "utf8"));
  const row = invite.row;

  if (row.background_image?.includes("supabase.co")) {
    row.background_image = `${ASSET_PREFIX}images/curtains-theme-BiJZdLpp.mp4`;
  }
  if (row.envelope_image?.includes("supabase.co")) {
    row.envelope_image = `${ASSET_PREFIX}images/envelope-DxZBsIH2.png`;
  }

  fs.writeFileSync(file, JSON.stringify(invite, null, 2));
  console.log("Patched invite.json with local fallback media");
}

function fixMapDeps(content) {
  return content.replace(
    /(__vite__mapDeps[\s\S]*?m\.f=\[)([\s\S]*?)(\]\))/g,
    (_, start, body, end) => {
      const fixedBody = body.replace(
        /"\/templates\/curtains\/assets\//g,
        `"${DEP_PREFIX}`
      );
      return start + fixedBody + end;
    }
  );
}

function fixAllPaths() {
  let changed = 0;
  for (const file of walk(ASSETS)) {
    if (!/\.(js|mjs)$/i.test(file)) continue;
    const before = fs.readFileSync(file, "utf8");
    const after = fixMapDeps(before);
    if (after !== before) {
      fs.writeFileSync(file, after);
      changed++;
    }
  }
  console.log(`Fixed mapDeps in ${changed} files`);
}

function buildIndexHtml() {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Greg &amp; Lisa — Grand Curtains Invitation</title>
    <meta name="description" content="Digital wedding invitation — Grand Curtains theme" />
    <link rel="icon" type="image/png" href="/templates/curtains/assets/images/favicon.png" />
    <link rel="apple-touch-icon" href="/templates/curtains/assets/images/favicon.png" />

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Raleway:wght@300;400;500;600&display=swap" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Raleway:wght@300;400;500;600&display=swap" rel="stylesheet"></noscript>
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel:wght@400;500;600&family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Dancing+Script:wght@400;500;600&family=Great+Vibes&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel:wght@400;500;600&family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Dancing+Script:wght@400;500;600&family=Great+Vibes&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap" rel="stylesheet"></noscript>

    <script src="/templates/curtains/assets/data/local-runtime.js"></script>
    <script type="module" crossorigin src="/templates/curtains/assets/index-Cfoc4NWM.js"></script>
    <link rel="stylesheet" crossorigin href="/templates/curtains/assets/index-Skdm8sZv.css">
  </head>
  <body>
    <div id="root"></div>

    <div class="dvites-buy-bar">
      <div class="dvites-brand">
        <img src="/templates/curtains/assets/images/dvites-logo.png" alt="Dvites">
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
  const INVITE_SLUG = "${SLUG}";
  const INVITE_PATH = "/invite/" + INVITE_SLUG;
  const INVITE_SERVE_URL = INVITE_PATH + "/";
  let invitePayload = null;

  const path = location.pathname;
  if (path === INVITE_PATH) {
    location.replace(INVITE_SERVE_URL + location.search + location.hash);
  } else if (path.includes("/templates/curtains/") && path.endsWith(".html")) {
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
          const res = await originalFetch("/templates/curtains/assets/data/invite.json");
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
  fs.writeFileSync(path.join(DATA_DIR, "local-runtime.js"), runtime);
  console.log("Wrote assets/data/local-runtime.js");
}

function copyMissingFromBalcony(missingUrls) {
  let copied = 0;
  for (const url of missingUrls) {
    const marker = "/templates/curtains/assets/";
    const idx = url.indexOf(marker);
    if (idx === -1) continue;
    const rel = url.slice(idx + marker.length);
    const src = path.join(SOURCE_ASSETS, rel);
    const dest = path.join(ASSETS, rel);
    if (!fs.existsSync(src)) continue;
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    copied++;
    console.log(`  backfill ${rel}`);
  }
  return copied;
}

async function main() {
  if (!fs.existsSync(SOURCE_ASSETS)) {
    throw new Error("balcony-seaview/assets not found — run balcony setup first");
  }

  const keyMatch = fs
    .readFileSync(path.join(SOURCE_ASSETS, "r2Upload-B5N7rExL.js"), "utf8")
    .match(/d="(eyJ[^"]+)"/);
  if (!keyMatch) throw new Error("Could not extract Supabase anon key");
  const KEY = keyMatch[1];

  console.log("Capturing invite data for demo-39e188...");
  const invite = await captureInvite(KEY);

  console.log("Copying runtime bundles...");
  copyRuntimeBundles();

  console.log("Copying shared media...");
  copySharedMedia();

  console.log("Localizing invite media...");
  await localizeInviteMedia(invite);
  patchInviteJson();

  console.log("Fixing Vite mapDeps...");
  fixAllPaths();

  console.log("Building index + local runtime...");
  buildLocalRuntime();
  buildIndexHtml();

  console.log("\nCurtains template ready at templates/curtains/index.html");
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

module.exports = { copyMissingFromBalcony, ASSETS, SOURCE_ASSETS };
