#!/usr/bin/env node
/**
 * Build templates/botanical-bloom from WooowInvites invite demo-95b457 (Honey Garden).
 * Usage: node setup.js
 */
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");
const { URL } = require("url");

const ROOT = __dirname;
const SLUG = "demo-95b457";
const TEMPLATE_ID = "botanical-bloom";
const BASE = `/templates/${TEMPLATE_ID}/`;
const ASSET_PREFIX = `${BASE}assets/`;
const DEP_PREFIX = `templates/${TEMPLATE_ID}/assets/`;
const BASE_URL = "https://www.wooowinvites.com";
const MAIN_JS = "index-D_9lpNSl.js";
const MAIN_CSS = "index-F8wOvwgW.css";

const ASSETS = path.join(ROOT, "assets");
const IMAGES = path.join(ASSETS, "images");
const AUDIO = path.join(ASSETS, "audio");
const VIDEO = path.join(ASSETS, "video");
const DATA_DIR = path.join(ASSETS, "data");
const ORIGINAL = path.join(ROOT, "original-bundle");
const SOURCE_REF = path.join(ROOT, "source-reference");

const CHUNK_RE =
  /(?:^|["'`(])(?:\.\/)?(?:\/assets\/|assets\/)([A-Za-z0-9_.-]+\.(?:js|css|mjs|mp4|mp3|png|jpe?g|webp|svg|woff2?|ttf|otf|json))(?:\?[A-Za-z0-9&=\-_.%+]*)?(?:["'`)])/g;
const URL_RE =
  /https?:\/\/[^\s"'`<>\\)]+(?:\.(?:png|jpe?g|webp|svg|gif|woff2?|ttf|otf|mp3|mp4|json|ico)|\/assets\/[A-Za-z0-9_.-]+)(?:\?[A-Za-z0-9&=\-_.%+]*)?/g;
const ABS_ASSET_RE = /["'`]\/(assets\/[A-Za-z0-9_.-]+(?:\?[A-Za-z0-9&=\-_.%+]*)?)["'`]/g;
const ASSET_EXT =
  /\.(?:png|jpe?g|webp|svg|gif|woff2?|ttf|otf|mp3|mp4|json|ico)(?:\?[A-Za-z0-9&=\-_.%+]*)?$/i;

const pending = new Set();
const downloaded = new Set();
const urlMap = new Map();

function ensureDirs() {
  for (const d of [ASSETS, IMAGES, AUDIO, VIDEO, DATA_DIR, ORIGINAL, SOURCE_REF]) {
    fs.mkdirSync(d, { recursive: true });
  }
}

function fetchBuffer(url, extraHeaders) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    const headers = Object.assign(
      { "User-Agent": "Mozilla/5.0 (compatible; dvites-botanical-setup/1.0)" },
      extraHeaders || {}
    );
    if (url.includes("supabase.co")) {
      headers.Referer = "https://www.wooowinvites.com/";
    }
    lib
      .get(url, { headers }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          fetchBuffer(new URL(res.headers.location, url).href, extraHeaders).then(resolve).catch(reject);
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

function classifyFileName(fileName) {
  if (/\.(woff2?|ttf|otf)$/i.test(fileName)) return "font";
  if (/\.(mp3|wav|ogg)$/i.test(fileName)) return "audio";
  if (/\.(mp4|webm)$/i.test(fileName)) return "video";
  if (/\.(png|jpe?g|webp|svg|gif|ico)$/i.test(fileName)) return "image";
  return "asset";
}

function localPathForFileName(fileName) {
  const kind = classifyFileName(fileName);
  if (kind === "font") return path.join(ASSETS, "fonts", fileName);
  if (kind === "audio") return path.join(AUDIO, fileName);
  if (kind === "video") return path.join(VIDEO, fileName);
  if (kind === "image") return path.join(IMAGES, fileName);
  return path.join(ASSETS, fileName);
}

function relPathFromRoot(absPath) {
  let rel = path.relative(ROOT, absPath).replace(/\\/g, "/");
  if (!rel.startsWith(".")) rel = `./${rel}`;
  return rel;
}

function relPathFromFile(fromFile, absPath) {
  let rel = path.relative(path.dirname(fromFile), absPath).replace(/\\/g, "/");
  if (!rel.startsWith(".")) rel = `./${rel}`;
  return rel;
}

function normalizeAssetName(raw) {
  return raw.split("?")[0];
}

function queueAsset(fileName) {
  const name = normalizeAssetName(fileName);
  if (!name || downloaded.has(name) || pending.has(name)) return;
  pending.add(name);
}

function extractFromContent(content) {
  const found = new Set();
  let m;
  const chunkCopy = new RegExp(CHUNK_RE.source, CHUNK_RE.flags);
  while ((m = chunkCopy.exec(content)) !== null) found.add(normalizeAssetName(m[1]));
  const absCopy = new RegExp(ABS_ASSET_RE.source, ABS_ASSET_RE.flags);
  while ((m = absCopy.exec(content)) !== null) found.add(normalizeAssetName(path.basename(m[1])));
  const urlCopy = new RegExp(URL_RE.source, URL_RE.flags);
  while ((m = urlCopy.exec(content)) !== null) {
    const url = m[0].replace(/&amp;/g, "&");
    if (url.includes("wooowinvites.com/assets/")) {
      found.add(normalizeAssetName(path.basename(url.split("?")[0])));
    } else if (ASSET_EXT.test(url.split("?")[0]) || url.includes("fonts.gstatic.com")) {
      urlMap.set(url, url);
    }
  }
  return found;
}

async function downloadAsset(fileName) {
  const name = normalizeAssetName(fileName);
  if (downloaded.has(name)) return;
  const diskPath = localPathForFileName(name);
  fs.mkdirSync(path.dirname(diskPath), { recursive: true });
  const remoteUrl = `${BASE_URL}/assets/${name}`;
  if (!fs.existsSync(diskPath)) {
    process.stdout.write(`  dl assets/${name}\n`);
    const buf = await fetchBuffer(remoteUrl);
    fs.writeFileSync(diskPath, buf);
  }
  downloaded.add(name);
  pending.delete(name);
  try {
    for (const nested of extractFromContent(fs.readFileSync(diskPath, "utf8"))) queueAsset(nested);
  } catch {
    /* binary */
  }
}

async function downloadRootAsset(relativePath, destSubdir) {
  const clean = relativePath.replace(/^\//, "");
  const fileName = path.basename(clean.split("?")[0]);
  const destDir =
    destSubdir === "video" ? VIDEO : destSubdir === "audio" ? AUDIO : IMAGES;
  const dest = path.join(destDir, fileName);
  if (fs.existsSync(dest)) return `${ASSET_PREFIX}${destSubdir}/${fileName}`;
  process.stdout.write(`  dl /${clean}\n`);
  const buf = await fetchBuffer(`${BASE_URL}/${clean.split("?")[0]}`);
  fs.writeFileSync(dest, buf);
  return `${ASSET_PREFIX}${destSubdir}/${fileName}`;
}

async function drainQueue() {
  while (pending.size > 0) {
    for (const name of [...pending]) {
      try {
        await downloadAsset(name);
      } catch (err) {
        console.warn(`  skip assets/${name}: ${err.message}`);
        pending.delete(name);
      }
    }
  }
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

function rewriteFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let changed = false;
  const replacements = new Map();

  for (const name of downloaded) {
    const abs = localPathForFileName(name);
    const fromHere = relPathFromFile(filePath, abs);
    replacements.set(`"/assets/${name}"`, `"${fromHere}"`);
    replacements.set(`'/assets/${name}'`, `'${fromHere}'`);
    replacements.set(`"/assets/${name}?`, `"${fromHere}?`);
    replacements.set(`'/assets/${name}?`, `'${fromHere}?`);
    if (filePath.endsWith(".js") || filePath.endsWith(".mjs")) {
      replacements.set(`"assets/${name}"`, `"${fromHere}"`);
      replacements.set(`'assets/${name}'`, `'${fromHere}'`);
      replacements.set(`import("./assets/${name}")`, `import("${fromHere}")`);
      replacements.set(`import('./assets/${name}')`, `import('${fromHere}')`);
    }
  }

  for (const [remote, local] of urlMap.entries()) {
    if (typeof local === "string" && !local.startsWith("http")) {
      replacements.set(remote, local);
      replacements.set(remote.replace(/&/g, "&amp;"), local);
    }
  }

  for (const [from, to] of [...replacements.entries()].sort((a, b) => b[0].length - a[0].length)) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      changed = true;
    }
  }
  if (changed) fs.writeFileSync(filePath, content);
}

function fixMapDeps(content) {
  return content.replace(/(__vite__mapDeps[\s\S]*?m\.f=\[)([\s\S]*?)(\]\))/g, (_, start, body, end) => {
    const fixedBody = body.replace(/"\/templates\/botanical-bloom\/assets\//g, `"${DEP_PREFIX}`);
    return start + fixedBody + end;
  });
}

function fixAllPaths() {
  let changed = 0;
  for (const file of walk(ASSETS)) {
    if (!/\.(js|mjs)$/i.test(file)) continue;
    const before = fs.readFileSync(file, "utf8");
    let after = fixMapDeps(before);
    after = after
      .split("/templates/balcony-seaview/assets/").join("/templates/botanical-bloom/assets/")
      .split("templates/balcony-seaview/assets/").join("templates/botanical-bloom/assets/")
      .split("/templates/curtains/assets/").join("/templates/botanical-bloom/assets/")
      .split("templates/curtains/assets/").join("templates/botanical-bloom/assets/");
    if (after !== before) {
      fs.writeFileSync(file, after);
      changed++;
    }
  }
  console.log(`Fixed paths in ${changed} files`);
}

function fixChunkPaths() {
  let changed = 0;
  for (const file of walk(ASSETS)) {
    if (!/\.(js|mjs)$/i.test(file)) continue;
    let content = fs.readFileSync(file, "utf8");
    const next = content
      .replace(/from"\.\/([A-Za-z0-9_.-]+\.(?:js|mjs|css))"/g, 'from"/templates/botanical-bloom/assets/$1"')
      .replace(/from'\.\/([A-Za-z0-9_.-]+\.(?:js|mjs|css))'/g, "from'/templates/botanical-bloom/assets/$1'")
      .replace(/import\("\.\/([A-Za-z0-9_.-]+\.(?:js|mjs|css))"\)/g, 'import("/templates/botanical-bloom/assets/$1")')
      .replace(/import\('\.\/([A-Za-z0-9_.-]+\.(?:js|mjs|css))'\)/g, "import('/templates/botanical-bloom/assets/$1')")
      .replace(/"\.\/images\//g, '"/templates/botanical-bloom/assets/images/')
      .replace(/'\.\/images\//g, "'/templates/botanical-bloom/assets/images/");
    if (next !== content) {
      fs.writeFileSync(file, next);
      changed++;
    }
  }
  console.log(`Fixed chunk import paths in ${changed} files`);
}

function collectUrls(value, set) {
  if (typeof value === "string") {
    if (
      value.includes("supabase.co/storage/") ||
      value.startsWith("/audio/") ||
      value.startsWith("/envelopes/") ||
      value.includes("__l5e/assets-v1/")
    ) {
      set.add(value);
    }
  } else if (Array.isArray(value)) {
    value.forEach((v) => collectUrls(v, set));
  } else if (value && typeof value === "object") {
    Object.values(value).forEach((v) => collectUrls(v, set));
  }
}

function localNameFromUrl(url) {
  return path.basename(url.split("?")[0]).replace(/[^a-zA-Z0-9._-]/g, "-");
}

async function extractAnonKey() {
  const js = await fetchBuffer(`${BASE_URL}/assets/${MAIN_JS}`);
  const match = js.toString("utf8").match(/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/);
  if (!match) throw new Error("Could not extract Supabase anon key from main bundle");
  return match[0];
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

async function captureInvite(key) {
  const row = await postRpc("get_demo_invitation", { _slug: SLUG }, key);
  return { slug: SLUG, rpc: "get_demo_invitation", capturedAt: new Date().toISOString(), row };
}

async function localizeInviteMedia(invite) {
  const urls = new Set();
  collectUrls(invite.row, urls);
  const map = new Map();

  for (const url of urls) {
    let local;
    if (url.startsWith("/audio/")) {
      local = await downloadRootAsset(url, "audio");
    } else if (url.startsWith("/envelopes/")) {
      local = await downloadRootAsset(url, "video");
    } else if (url.includes("__l5e/assets-v1/")) {
      local = await downloadRootAsset(url.replace(/^\/__l5e\/assets-v1\//, "/__l5e/assets-v1/"), "video");
    } else if (url.includes("supabase.co/storage/")) {
      const name = localNameFromUrl(url);
      const dest = path.join(IMAGES, name);
      if (!fs.existsSync(dest)) {
        process.stdout.write(`  dl ${name}\n`);
        try {
          const buf = await fetchBuffer(url.split("?")[0]);
          fs.writeFileSync(dest, buf);
        } catch (err) {
          console.warn(`  skip ${name}: ${err.message}`);
          continue;
        }
      }
      local = `${ASSET_PREFIX}images/${name}`;
    } else {
      continue;
    }
    map.set(url, local);
  }

  let json = JSON.stringify(invite, null, 2);
  for (const [from, to] of [...map.entries()].sort((a, b) => b[0].length - a[0].length)) {
    json = json.split(from).join(to);
  }
  fs.writeFileSync(path.join(DATA_DIR, "invite.json"), json);
  fs.writeFileSync(path.join(DATA_DIR, "invitation-data.json"), JSON.stringify(invite.row, null, 2));
  console.log(`Localized ${map.size} invite media URLs`);
  finalizeInviteJson();
}

function finalizeInviteJson() {
  const file = path.join(DATA_DIR, "invite.json");
  if (!fs.existsSync(file)) return;
  const invite = JSON.parse(fs.readFileSync(file, "utf8"));
  const row = invite.row;

  // Honey Garden hero is rendered by honey-bees theme video — not a poster fallback.
  // The original custom PNG is gone from Supabase; keep empty so the theme video shows.
  if (row.background_image && row.background_image.includes("supabase.co")) {
    const heroFile = path.join(IMAGES, "hero-botanical-original.png");
    if (fs.existsSync(heroFile)) {
      row.background_image = `${ASSET_PREFIX}images/hero-botanical-original.png`;
    } else {
      row.background_image = "";
    }
  }

  if (row.envelope_image && row.envelope_image.startsWith("/envelopes/")) {
    const envName = path.basename(row.envelope_image);
    if (fs.existsSync(path.join(VIDEO, envName))) {
      row.envelope_image = `${ASSET_PREFIX}video/${envName}`;
    }
  }

  if (row.music_url && row.music_url.startsWith("/audio/")) {
    const audioName = path.basename(row.music_url);
    if (fs.existsSync(path.join(AUDIO, audioName))) {
      row.music_url = `${ASSET_PREFIX}audio/${audioName}`;
    }
  }

  fs.writeFileSync(file, JSON.stringify(invite, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, "invitation-data.json"), JSON.stringify(row, null, 2));
  console.log("Finalized invite.json (no poster fallbacks)");
}

function buildClientConfig(inviteRow) {
  const config = `window.DVITES_CLIENT = {
  couple: {
    name1: "Jeff Emlio",
    name2: "Maria Gucci",
    displayDate: "16 December 2026"
  },
  rsvp: {
    enabled: true,
    method: "whatsapp",
    whatsappNumber: "919876543210",
    whatsappMessage:
      "Hello, we would like to confirm our attendance for Jeff & Maria's wedding.",
    email: "",
    externalFormUrl: ""
  },
  music: {
    enabled: true,
    src: "${inviteRow.music_url || ASSET_PREFIX + "audio/romantic-piano.mp3"}"
  },
  languages: ${JSON.stringify(inviteRow.event_languages || ["en"], null, 2)}
};
`;
  fs.writeFileSync(path.join(DATA_DIR, "client-config.js"), config);
  if (inviteRow.content_translations) {
    fs.writeFileSync(
      path.join(DATA_DIR, "translations.json"),
      JSON.stringify(inviteRow.content_translations, null, 2)
    );
  }
}

function buildLocalRuntime() {
  const runtime = `(() => {
  const INVITE_SLUG = "${SLUG}";
  const INVITE_PATH = "/invite/" + INVITE_SLUG;
  const INVITE_SERVE_URL = INVITE_PATH + "/";
  const TEMPLATE_PREFIX = "/templates/botanical-bloom/";
  let invitePayload = null;
  const isPreview = new URLSearchParams(location.search).get("preview") === "1";

  if (isPreview) {
    window.__DVITES_PREVIEW__ = true;
    document.documentElement.classList.add("dvites-preview-mode");
    const previewStyle = document.createElement("style");
    previewStyle.textContent =
      "html.dvites-preview-mode .dvites-buy-bar{display:none!important}";
    (document.head || document.documentElement).appendChild(previewStyle);
  }

  const path = location.pathname;
  if (path === INVITE_PATH) {
    location.replace(INVITE_SERVE_URL + location.search + location.hash);
  } else if (path.startsWith(TEMPLATE_PREFIX) || path === "/templates/botanical-bloom") {
    history.replaceState(null, "", INVITE_SERVE_URL + location.search + location.hash);
  } else if (path.endsWith("/index.html") && path.includes(INVITE_SLUG)) {
    history.replaceState(null, "", INVITE_SERVE_URL + location.search + location.hash);
  }

  const DVITES_BRAND_REPLACEMENTS = [
    [/Made with Love\\s*❤️?\\s*with\\s*WooowInvites/gi, "Crafted by Dvites"],
    [/WooowInvites/g, "Dvites"],
    [/wooowinvites\\.com/g, "dvites.com"],
    [/www\\.wooowinvites\\.com/g, "dvites.com"],
  ];

  function cleanDvitesBranding(root = document.body) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach((node) => {
      let value = node.nodeValue || "";
      let next = value;
      DVITES_BRAND_REPLACEMENTS.forEach(([pattern, replacement]) => {
        next = next.replace(pattern, replacement);
      });
      if (next !== value) node.nodeValue = next;
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    cleanDvitesBranding();
    const observer = new MutationObserver(() => cleanDvitesBranding());
    if (document.body) observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  });

  const originalFetch = window.fetch.bind(window);
  window.fetch = async function(input, init) {
    const url = typeof input === "string" ? input : (input && input.url) || "";

    if (/ipify\\.org|ipapi\\.co|capi-automation|facebook\\.com\\/tr|googletagmanager|google-analytics|~flock|~api\\/analytics/i.test(url)) {
      return new Response(JSON.stringify({}), { status: 200, headers: { "Content-Type": "application/json" } });
    }

    if (url.includes("ipapi.co")) {
      return new Response(JSON.stringify({ country_code: "IN" }), {
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
        return new Response("[]", { status: 200, headers: { "Content-Type": "application/json" } });
      }
      if (url.includes("/rpc/get_event_password_status")) {
        return new Response("false", { status: 200, headers: { "Content-Type": "application/json" } });
      }
      if (url.includes("/rpc/verify_event_password")) {
        return new Response("true", { status: 200, headers: { "Content-Type": "application/json" } });
      }
      if (url.includes("/rpc/get_demo_invitation")) {
        if (!invitePayload) {
          const res = await originalFetch("/templates/botanical-bloom/assets/data/invite.json");
          const json = await res.json();
          invitePayload = json.row;
        }
        return new Response(JSON.stringify(invitePayload), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url.includes("/auth/v1/") || url.includes("/functions/v1/")) {
        return new Response(JSON.stringify({ error: "Blocked in local demo" }), {
          status: 403,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url.includes("/rest/v1/")) {
        return new Response("[]", { status: 200, headers: { "Content-Type": "application/json" } });
      }
    }

    return originalFetch(input, init);
  };
})();
`;
  fs.writeFileSync(path.join(DATA_DIR, "local-runtime.js"), runtime);
}

function buildIndexHtml() {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Jeff &amp; Maria — Botanical Bloom Wedding Invitation</title>
    <meta name="description" content="Botanical Bloom — elegant floral wedding invitation with scroll animations, music, and multilingual support." />
    <link rel="icon" type="image/png" href="/templates/botanical-bloom/assets/images/favicon.png" />
    <link rel="apple-touch-icon" href="/templates/botanical-bloom/assets/images/favicon.png" />

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Raleway:wght@300;400;500;600&display=swap" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Raleway:wght@300;400;500;600&display=swap" rel="stylesheet"></noscript>
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Dancing+Script:wght@400;500;600&family=Great+Vibes&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Meddon&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Dancing+Script:wght@400;500;600&family=Great+Vibes&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Meddon&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet"></noscript>

    <script src="/templates/botanical-bloom/assets/data/client-config.js"></script>
    <script src="/templates/botanical-bloom/assets/data/local-runtime.js"></script>
    <script type="module" crossorigin src="/templates/botanical-bloom/assets/${MAIN_JS}"></script>
    <link rel="stylesheet" crossorigin href="/templates/botanical-bloom/assets/${MAIN_CSS}">
  </head>
  <body>
    <div id="root"></div>

    <div class="dvites-buy-bar">
      <div class="dvites-brand">
        <img src="/templates/botanical-bloom/assets/images/dvites-logo.png" alt="Dvites">
      </div>
      <span class="dvites-text">Personalize this invitation in minutes.</span>
      <a href="/wedding/botanical-bloom.html" id="buyNowBtn">Buy Now</a>
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

function writeSourceReference() {
  fs.writeFileSync(
    path.join(SOURCE_REF, "source-url.txt"),
    "https://www.wooowinvites.com/invite/demo-95b457\n"
  );
  fs.writeFileSync(
    path.join(SOURCE_REF, "source-notes.md"),
    `# Botanical Bloom — source notes

## Source route
- URL: https://www.wooowinvites.com/invite/demo-95b457
- Wooow style: \`honey-garden\` (Honey Garden)
- Demo slug: \`demo-95b457\`

## Data loading
- Invitation payload loaded via Supabase RPC \`get_demo_invitation\` with \`_slug: demo-95b457\`.
- Captured locally to \`assets/data/invite.json\` and \`assets/data/invitation-data.json\`.
- \`local-runtime.js\` intercepts Supabase fetch and serves local JSON.

## Application stack
- Vite + React SPA (\`#root\`)
- Main bundles: \`${MAIN_JS}\`, \`${MAIN_CSS}\`
- Animations: React + CSS (scroll reveal, envelope opening)
- Music: local \`/audio/romantic-piano.mp3\` mirrored to \`assets/audio/\`
- Languages: invitation \`content_translations\` preserved in \`assets/data/translations.json\`

## Removed
- Meta Pixel, CAPI parameter builder, Google Ads/Analytics, flock analytics
- WooowInvites backend RSVP/auth/analytics calls (stubbed in local-runtime)

## RSVP
- Original Wooow RSVP backend removed.
- Configure WhatsApp/email RSVP in \`assets/data/client-config.js\`.
`
  );
}

async function seedFromBalcony() {
  const source = path.join(ROOT, "..", "balcony-seaview", "assets");
  if (!fs.existsSync(source)) {
    console.log("No balcony-seaview seed — full mirror download");
    return 0;
  }
  let copied = 0;
  for (const file of walk(source)) {
    const rel = path.relative(source, file);
    const dest = path.join(ASSETS, rel);
    if (fs.existsSync(dest)) continue;
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(file, dest);
    copied++;
    if (/\.(js|css|mjs)$/i.test(file)) {
      downloaded.add(path.basename(file));
    }
  }
  console.log(`Seeded ${copied} files from balcony-seaview/assets`);
  return copied;
}

async function main() {
  ensureDirs();

  console.log("Saving index-source.html...");
  const srcHtml = await fetchBuffer(`${BASE_URL}/invite/${SLUG}`);
  fs.writeFileSync(path.join(ROOT, "index-source.html"), srcHtml);

  await seedFromBalcony();

  console.log("Downloading main bundles...");
  for (const name of [MAIN_JS, MAIN_CSS]) {
    queueAsset(name);
  }
  for (const nested of extractFromContent(srcHtml.toString("utf8"))) queueAsset(nested);

  console.log("Downloading assets recursively...");
  let pass = 0;
  while (pending.size > 0) {
    pass++;
    const batch = [...pending];
    console.log(`  pass ${pass}: ${batch.length} pending`);
    await drainQueue();
    if (pass > 40) {
      console.warn("Stopping after 40 passes");
      break;
    }
  }

  console.log("Copying original bundles...");
  fs.copyFileSync(path.join(ASSETS, MAIN_JS), path.join(ORIGINAL, MAIN_JS));
  fs.copyFileSync(path.join(ASSETS, MAIN_CSS), path.join(ORIGINAL, MAIN_CSS));

  console.log("Capturing invite data...");
  const key = await extractAnonKey();
  const invite = await captureInvite(key);
  await localizeInviteMedia(invite);
  buildClientConfig(invite.row);

  console.log("Rewriting asset paths...");
  for (const f of walk(ASSETS)) rewriteFile(f);

  fixAllPaths();
  fixChunkPaths();

  console.log("Building runtime + index...");
  buildLocalRuntime();
  buildIndexHtml();
  writeSourceReference();

  if (!fs.existsSync(path.join(IMAGES, "favicon.png"))) {
    const buf = await fetchBuffer(`${BASE_URL}/favicon.png`);
    fs.writeFileSync(path.join(IMAGES, "favicon.png"), buf);
  }

  const logoSrc = path.join(ROOT, "..", "Mountains", "assets", "images", "dvites-logo.png");
  if (fs.existsSync(logoSrc)) {
    fs.copyFileSync(logoSrc, path.join(IMAGES, "dvites-logo.png"));
  }

  const posterSrc = path.join(IMAGES, "background-1783160711847.png");
  if (fs.existsSync(posterSrc)) {
    fs.copyFileSync(posterSrc, path.join(IMAGES, "botanical-bloom.png"));
  }

  const inviteDir = path.join(ROOT, "invite", SLUG);
  fs.mkdirSync(inviteDir, { recursive: true });
  fs.copyFileSync(path.join(ROOT, "index.html"), path.join(inviteDir, "index.html"));

  console.log(`\nBotanical Bloom ready at templates/botanical-bloom/index.html`);
  console.log(`Downloaded ${downloaded.size} bundle assets`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
