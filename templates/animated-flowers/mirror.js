#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");
const { URL } = require("url");
const crypto = require("crypto");

const ROOT = __dirname;
const SLUG = "demo-692f06";
const BASE_URL = "https://www.wooowinvites.com";
const INVITE_URL = `${BASE_URL}/invite/${SLUG}`;
const BASE_PATH = `/templates/animated-flowers`;
const ASSET_PREFIX = `${BASE_PATH}/assets/`;

const DIRS = {
  css: path.join(ROOT, "assets", "css"),
  js: path.join(ROOT, "assets", "js"),
  images: path.join(ROOT, "assets", "images"),
  fonts: path.join(ROOT, "assets", "fonts"),
  audio: path.join(ROOT, "assets", "audio"),
  video: path.join(ROOT, "assets", "video"),
  data: path.join(ROOT, "assets", "data"),
  rootAssets: path.join(ROOT, "assets"),
};

const CHUNK_RE =
  /(?:^|["'`(])(?:\.\/)?(?:\/assets\/|assets\/)([A-Za-z0-9_.-]+\.(?:js|css|mjs|mp4|mp3|png|jpe?g|webp|svg|woff2?|ttf|otf|json))(?:\?[A-Za-z0-9&=\-_.%+]*)?(?:["'`)])/g;
const URL_RE =
  /https?:\/\/[^\s"'`<>\\)]+(?:\.(?:png|jpe?g|webp|svg|gif|woff2?|ttf|otf|mp3|mp4|json|ico)|\/assets\/[A-Za-z0-9_.-]+|\/audio\/[A-Za-z0-9_.-]+)(?:\?[A-Za-z0-9&=\-_.%+]*)?/g;
const ABS_ASSET_RE = /["'`]\/(assets\/[A-Za-z0-9_.-]+(?:\?[A-Za-z0-9&=\-_.%+]*)?)["'`]/g;
const ABS_AUDIO_RE = /["'`]\/(audio\/[A-Za-z0-9_.-]+(?:\?[A-Za-z0-9&=\-_.%+]*)?)["'`]/g;

/** @type {Set<string>} */
const pending = new Set();
/** @type {Set<string>} */
const downloaded = new Set();
/** @type {Map<string, string>} */
const urlMap = new Map();
/** @type {{remote:string, local:string, status:string, notes:string}[]} */
const auditRows = [];

let mainJs = "";
let mainCss = "";

function ensureDirs() {
  Object.values(DIRS).forEach((d) => fs.mkdirSync(d, { recursive: true }));
}

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib
      .get(url, { headers: { "User-Agent": "dvites-mirror/2.0" } }, (res) => {
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

function hashName(url) {
  return crypto.createHash("sha1").update(url).digest("hex").slice(0, 12);
}

function classify(name) {
  if (/\.(woff2?|ttf|otf)$/i.test(name)) return "fonts";
  if (/\.(mp3|wav|ogg|m4a)$/i.test(name)) return "audio";
  if (/\.(mp4|webm|mov)$/i.test(name)) return "video";
  if (/\.(png|jpe?g|webp|svg|gif|ico|avif)$/i.test(name)) return "images";
  if (/\.css$/i.test(name)) return "css";
  if (/\.(js|mjs)$/i.test(name)) return "js";
  if (/\.json$/i.test(name)) return "data";
  return "rootAssets";
}

function normalizeAssetName(raw) {
  return raw.split("?")[0];
}

function localAbsForWooAsset(fileName) {
  const name = normalizeAssetName(fileName);
  const kind = classify(name);
  if (kind === "rootAssets") return path.join(DIRS.rootAssets, name);
  return path.join(DIRS[kind], name);
}

function publicPathForAbs(absPath) {
  const rel = path.relative(ROOT, absPath).replace(/\\/g, "/");
  return `/${rel}`;
}

function queueWooAsset(fileName) {
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

  const audioCopy = new RegExp(ABS_AUDIO_RE.source, ABS_AUDIO_RE.flags);
  while ((m = audioCopy.exec(content)) !== null) {
    urlMap.set(`${BASE_URL}/${m[1]}`, m[1]);
  }

  const urlCopy = new RegExp(URL_RE.source, URL_RE.flags);
  while ((m = urlCopy.exec(content)) !== null) {
    const url = m[0].replace(/&amp;/g, "&");
    if (url.includes("wooowinvites.com/assets/")) {
      found.add(normalizeAssetName(path.basename(url.split("?")[0])));
    } else if (url.includes("wooowinvites.com/audio/")) {
      urlMap.set(url, url);
    } else if (
      url.includes("fonts.gstatic.com") ||
      url.includes("kdcyugwruypwrmtllswt.supabase.co/storage/")
    ) {
      urlMap.set(url, url);
    }
  }
  return found;
}

async function downloadWooAsset(fileName) {
  const name = normalizeAssetName(fileName);
  if (downloaded.has(name)) return;

  const diskPath = localAbsForWooAsset(name);
  const remoteUrl = `${BASE_URL}/assets/${name}`;

  if (!fs.existsSync(diskPath)) {
    process.stdout.write(`  dl assets/${name}\n`);
    const buf = await fetchBuffer(remoteUrl);
    fs.writeFileSync(diskPath, buf);
    auditRows.push({
      remote: remoteUrl,
      local: publicPathForAbs(diskPath),
      status: "downloaded",
      notes: "wooow bundle asset",
    });
  }

  downloaded.add(name);
  pending.delete(name);

  try {
    const content = fs.readFileSync(diskPath, "utf8");
    for (const nested of extractFromContent(content)) queueWooAsset(nested);
  } catch {
    /* binary */
  }
}

async function downloadRemoteUrl(url) {
  const clean = url.replace(/&amp;/g, "&");
  if (urlMap.has(clean) && !String(urlMap.get(clean)).startsWith("http")) return;

  let fileName;
  let remote = clean;
  if (clean.includes("wooowinvites.com/audio/")) {
    fileName = path.basename(clean.split("?")[0]);
    remote = clean.startsWith("http") ? clean : `${BASE_URL}${clean.startsWith("/") ? "" : "/"}${clean}`;
  } else if (clean.includes("supabase.co/storage/")) {
    fileName = path.basename(clean.split("?")[0]).replace(/[^a-zA-Z0-9._-]/g, "-");
  } else if (clean.includes("fonts.gstatic.com")) {
    fileName = path.basename(clean.split("?")[0]);
  } else {
    fileName = path.basename(clean.split("?")[0]).replace(/[^a-zA-Z0-9._-]/g, "-");
  }

  if (!fileName) fileName = hashName(clean);
  const kind = classify(fileName);
  const diskPath = path.join(DIRS[kind], fileName);

  if (!fs.existsSync(diskPath)) {
    process.stdout.write(`  dl remote ${fileName}\n`);
    const buf = await fetchBuffer(remote);
    fs.writeFileSync(diskPath, buf);
    auditRows.push({
      remote: clean,
      local: publicPathForAbs(diskPath),
      status: "downloaded",
      notes: "remote runtime asset",
    });
  }

  urlMap.set(clean, publicPathForAbs(diskPath));
  try {
    const content = fs.readFileSync(diskPath, "utf8");
    for (const nested of extractFromContent(content)) queueWooAsset(nested);
  } catch {
    /* binary */
  }
}

async function drainQueue() {
  while (pending.size > 0) {
    const batch = [...pending];
    for (const name of batch) {
      try {
        await downloadWooAsset(name);
      } catch (err) {
        console.error(`  FAIL assets/${name}: ${err.message}`);
        pending.delete(name);
      }
    }
  }
}

function detectMainBundles(html) {
  const js = html.match(/\/assets\/(index-[A-Za-z0-9_-]+\.js)/);
  const css = html.match(/\/assets\/(index-[A-Za-z0-9_-]+\.css)/);
  if (!js || !css) throw new Error("Could not detect main JS/CSS bundles");
  return { js: js[1], css: css[1] };
}

function rewriteFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let changed = false;
  const replacements = new Map();

  for (const name of downloaded) {
    const abs = localAbsForWooAsset(name);
    const fromHere = path.relative(path.dirname(filePath), abs).replace(/\\/g, "/");
    const rel = fromHere.startsWith(".") ? fromHere : `./${fromHere}`;

    replacements.set(`"/assets/${name}"`, `"${rel}"`);
    replacements.set(`'/assets/${name}'`, `'${rel}'`);
    replacements.set(`\`/assets/${name}\``, `\`${rel}\``);
    if (filePath.endsWith(".js") || filePath.endsWith(".mjs")) {
      replacements.set(`"assets/${name}"`, `"${rel}"`);
      replacements.set(`'assets/${name}'`, `'${rel}'`);
      replacements.set(`import("./assets/${name}")`, `import("${rel}")`);
      replacements.set(`import('./assets/${name}')`, `import('${rel}')`);
    }
  }

  for (const [remote, local] of urlMap.entries()) {
    if (String(local).startsWith("http")) continue;
    const fromHere = path.relative(path.dirname(filePath), path.join(ROOT, local.replace(/^\//, ""))).replace(/\\/g, "/");
    const rel = fromHere.startsWith(".") ? fromHere : `./${fromHere}`;
    replacements.set(remote, rel);
    replacements.set(remote.replace(/&/g, "&amp;"), rel);
  }

  const sorted = [...replacements.entries()].sort((a, b) => b[0].length - a[0].length);
  for (const [from, to] of sorted) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      changed = true;
    }
  }

  if (changed) fs.writeFileSync(filePath, content);
}

function fixBundlePathsForStaticHosting() {
  const walk = (dir) => {
    const out = [];
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) out.push(...walk(p));
      else if (/\.(js|css|mjs)$/i.test(e.name)) out.push(p);
    }
    return out;
  };

  for (const file of walk(path.join(ROOT, "assets"))) {
    let content = fs.readFileSync(file, "utf8");
    const next = content
      .replace(/from"\.\/([A-Za-z0-9_.-]+\.css)"/g, `from"${ASSET_PREFIX}css/$1"`)
      .replace(/from'\.\/([A-Za-z0-9_.-]+\.css)'/g, `from'${ASSET_PREFIX}css/$1'`)
      .replace(/import\("\.\/([A-Za-z0-9_.-]+\.css)"\)/g, `import("${ASSET_PREFIX}css/$1")`)
      .replace(/import\('\.\/([A-Za-z0-9_.-]+\.css)'\)/g, `import('${ASSET_PREFIX}css/$1')`)
      .replace(/from"\.\/([A-Za-z0-9_.-]+\.(?:js|mjs))"/g, `from"${ASSET_PREFIX}js/$1"`)
      .replace(/from'\.\/([A-Za-z0-9_.-]+\.(?:js|mjs))'/g, `from'${ASSET_PREFIX}js/$1'`)
      .replace(/import\("\.\/([A-Za-z0-9_.-]+\.(?:js|mjs))"\)/g, `import("${ASSET_PREFIX}js/$1")`)
      .replace(/import\('\.\/([A-Za-z0-9_.-]+\.(?:js|mjs))'\)/g, `import('${ASSET_PREFIX}js/$1')`)
      .replace(/"\.\/([A-Za-z0-9_.-]+\.css)"/g, `"${ASSET_PREFIX}css/$1"`)
      .replace(/"\.\/([A-Za-z0-9_.-]+\.(?:js|mjs))"/g, `"${ASSET_PREFIX}js/$1"`)
      .replace(/"\.\/assets\//g, `"${ASSET_PREFIX}`)
      .replace(/'\.\/assets\//g, `'${ASSET_PREFIX}`)
      .replace(/"\.\/images\//g, `"${ASSET_PREFIX}images/`)
      .replace(/'\.\/images\//g, `'${ASSET_PREFIX}images/`)
      // Relative parent paths break when SPA route is /invite/<slug>/ (resolved vs document URL).
      .replace(/"\.\.\/images\/l5e\//g, `"${ASSET_PREFIX}images/l5e/`)
      .replace(/'\.\.\/images\/l5e\//g, `'${ASSET_PREFIX}images/l5e/`)
      .replace(/"\.\.\/images\//g, `"${ASSET_PREFIX}images/`)
      .replace(/'\.\.\/images\//g, `'${ASSET_PREFIX}images/`)
      .replace(/"\.\.\/video\//g, `"${ASSET_PREFIX}video/`)
      .replace(/'\.\.\/video\//g, `'${ASSET_PREFIX}video/`)
      .replace(/"\.\.\/audio\//g, `"${ASSET_PREFIX}audio/`)
      .replace(/'\.\.\/audio\//g, `'${ASSET_PREFIX}audio/`)
      .replace(/"\.\.\/css\//g, `"${ASSET_PREFIX}css/`)
      .replace(/'\.\.\/css\//g, `'${ASSET_PREFIX}css/`);
    if (next !== content) fs.writeFileSync(file, next);
  }
}

async function captureInviteData() {
  const jsFiles = fs
    .readdirSync(DIRS.js)
    .filter((f) => f.endsWith(".js"))
    .map((f) => path.join(DIRS.js, f));

  let key = null;
  for (const file of jsFiles) {
    const content = fs.readFileSync(file, "utf8");
    const m = content.match(/["'](eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)["']/);
    if (m) {
      key = m[1];
      break;
    }
  }
  if (!key) throw new Error("Could not extract Supabase anon key from bundles");

  function postRpc(fn, body) {
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
              reject(new Error(`${fn} HTTP ${res.statusCode}: ${buf.slice(0, 300)}`));
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

  let row = null;
  let rpc = "get_invitation_data";
  const invitationData = await postRpc("get_invitation_data", { _slug: SLUG });
  if (Array.isArray(invitationData) && invitationData.length > 0) {
    row = invitationData[0];
  } else {
    rpc = "get_demo_invitation";
    row = await postRpc("get_demo_invitation", { _slug: SLUG });
  }

  const invite = {
    slug: SLUG,
    rpc,
    capturedAt: new Date().toISOString(),
    sourceUrl: INVITE_URL,
    row,
  };

  const outPath = path.join(DIRS.data, "invite.json");
  fs.writeFileSync(outPath, JSON.stringify(invite, null, 2));
  fs.writeFileSync(path.join(DIRS.data, "invite-original.json"), JSON.stringify(invite, null, 2));
  auditRows.push({
    remote: "supabase rpc get_demo_invitation/get_invitation_data",
    local: publicPathForAbs(outPath),
    status: "captured",
    notes: rpc,
  });
  return invite;
}

function localizeInviteMedia(invite) {
  const urls = new Set();
  const walk = (value) => {
    if (typeof value === "string") {
      if (
        value.includes("kdcyugwruypwrmtllswt.supabase.co/storage/") ||
        value.startsWith("/audio/") ||
        value.includes("wooowinvites.com/")
      ) {
        urls.add(value);
      }
    } else if (Array.isArray(value)) {
      value.forEach(walk);
    } else if (value && typeof value === "object") {
      Object.values(value).forEach(walk);
    }
  };
  walk(invite.row);

  let json = fs.readFileSync(path.join(DIRS.data, "invite.json"), "utf8");
  for (const url of urls) {
    let remote = url;
    if (url.startsWith("/audio/")) remote = `${BASE_URL}${url}`;
    const fileName = path.basename(remote.split("?")[0]).replace(/[^a-zA-Z0-9._-]/g, "-");
    const isAudio = /\.(mp3|wav|ogg|m4a)$/i.test(fileName);
    const localAbs = path.join(isAudio ? DIRS.audio : DIRS.images, fileName);
    const localUrl = publicPathForAbs(localAbs);
    json = json.split(url).join(localUrl);
    auditRows.push({
      remote: url,
      local: localUrl,
      status: fs.existsSync(localAbs) ? "localized" : "pending",
      notes: "invite.json media rewrite",
    });
  }
  fs.writeFileSync(path.join(DIRS.data, "invite.json"), json);
}

async function downloadInviteMedia(invite) {
  const urls = new Set();
  const walk = (value) => {
    if (typeof value === "string") {
      if (
        value.includes("kdcyugwruypwrmtllswt.supabase.co/storage/") ||
        value.startsWith("/audio/") ||
        (value.includes("wooowinvites.com/") && !value.includes("/assets/index-"))
      ) {
        urls.add(value);
      }
    } else if (Array.isArray(value)) {
      value.forEach(walk);
    } else if (value && typeof value === "object") {
      Object.values(value).forEach(walk);
    }
  };
  walk(invite.row);

  for (const url of urls) {
    try {
      await downloadRemoteUrl(url.startsWith("/") ? `${BASE_URL}${url}` : url);
    } catch (err) {
      console.warn(`  skip invite media ${url}: ${err.message}`);
    }
  }
}

function buildLocalRuntime() {
  const runtime = `(() => {
  const INVITE_SLUG = "${SLUG}";
  const INVITE_PATH = "${BASE_PATH}";
  const DATA_PREFIX = INVITE_PATH + "/assets/data/";
  let invitePayload = null;

  // Normalize URL for SPA router when served from /templates/animated-flowers/
  (function normalizeInvitePath() {
    const path = location.pathname.replace(/\\/index\\.html$/, "/");
    if (path === INVITE_PATH || path === INVITE_PATH + "/") {
      history.replaceState(null, "", INVITE_PATH + "/" + location.search + location.hash);
    } else if (path.endsWith("/index.html") && path.includes(INVITE_PATH)) {
      history.replaceState(null, "", INVITE_PATH + "/" + location.search + location.hash);
    }
  })();

  // --- RSVP adapter: replace WooowInvites submission with local mock success ---
  // Connect Dvites Supabase / WhatsApp webhook here later.
  async function submitRsvpMock(payload) {
    console.info("[Dvites RSVP adapter] captured locally only", payload);
    return {
      ok: true,
      message: "Thank you! Your RSVP has been recorded locally for preview.",
    };
  }

  const originalFetch = window.fetch.bind(window);
  window.fetch = async function(input, init) {
    const url = typeof input === "string" ? input : (input && input.url) || "";

    if (/ipapi\\.co|ipify\\.org|capi-automation|facebook\\.com\\/tr|googletagmanager|google-analytics|~\\/api\\/analytics|~flock\\.js/i.test(url)) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (url.includes("wooowinvites.com") && !url.includes("/assets/") && !url.includes("/audio/")) {
      return new Response(JSON.stringify({}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (/functions\\/v1\\/(rsvp|submit|track)/i.test(url) || /\\/rest\\/v1\\/rsvp/i.test(url)) {
      let body = {};
      try {
        body = init && init.body ? JSON.parse(init.body) : {};
      } catch (_) {}
      const result = await submitRsvpMock(body);
      return new Response(JSON.stringify(result), {
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
        return new Response("false", { status: 200, headers: { "Content-Type": "application/json" } });
      }
      if (url.includes("/rpc/verify_event_password")) {
        return new Response("true", { status: 200, headers: { "Content-Type": "application/json" } });
      }
      if (url.includes("/rpc/get_demo_invitation")) {
        if (!invitePayload) {
          const res = await originalFetch(DATA_PREFIX + "invite.json");
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
      if (url.includes("/functions/v1/")) {
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
  fs.writeFileSync(path.join(DIRS.data, "local-runtime.js"), runtime);
}

function buildIndexHtml() {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Wedding Invitation</title>
    <meta name="description" content="Digital wedding invitation" />
    <link rel="icon" type="image/png" href="${ASSET_PREFIX}images/favicon.png" />
    <link rel="apple-touch-icon" href="${ASSET_PREFIX}images/favicon.png" />

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Raleway:wght@300;400;500;600&display=swap" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Raleway:wght@300;400;500;600&display=swap" rel="stylesheet"></noscript>
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Dancing+Script:wght@400;500;600&family=Great+Vibes&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Dancing+Script:wght@400;500;600&family=Great+Vibes&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap" rel="stylesheet"></noscript>

    <script src="${ASSET_PREFIX}data/local-runtime.js"></script>
    <script type="module" crossorigin src="${ASSET_PREFIX}js/${mainJs}"></script>
    <link rel="stylesheet" crossorigin href="${ASSET_PREFIX}css/${mainCss}">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;
  fs.writeFileSync(path.join(ROOT, "index.html"), html);
}

function writeAuditFiles(invite) {
  const style =
    invite.row?.style_name ||
    invite.row?.style_id ||
    invite.row?.event?.style_name ||
    "unknown";

  const notes = `# Extraction notes — ${SLUG}

- **Source URL:** ${INVITE_URL}
- **Extraction date:** ${new Date().toISOString().slice(0, 10)}
- **Template folder:** \`/templates/animated-flowers/\`
- **Main JS bundle:** \`${mainJs}\`
- **Main CSS bundle:** \`${mainCss}\`
- **Invitation style:** ${style}
- **Invitation data source:** Supabase RPC (\`${invite.rpc}\`) saved to \`assets/data/invite.json\`
- **RSVP behaviour:** Local mock adapter in \`assets/data/local-runtime.js\` — no data sent to WooowInvites
- **Tracking removed:** Meta Pixel, Google tags, flock analytics, ipify, CAPI parameter builder

## Dynamic chunks
Downloaded recursively from production bundles (${downloaded.size} wooow \`/assets/*\` files total).

## Major fixes
- Self-hosted JS/CSS/images/audio under \`/templates/animated-flowers/assets/\`
- Fetch interceptor serves local invite JSON
- RSVP submissions intercepted locally
- Static hosting paths normalized to \`${BASE_PATH}/assets/\`

## Known limitations
- Google Fonts still loaded from CDN (documented in dependency audit)
- Some admin/marketing lazy chunks may remain in bundle but are unused at runtime
- Customer-specific names/dates still demo content until converted
`;

  fs.writeFileSync(path.join(ROOT, "extraction-notes.md"), notes);

  const domains = new Set();
  auditRows.forEach((r) => {
    try {
      domains.add(new URL(r.remote.startsWith("http") ? r.remote : `${BASE_URL}${r.remote}`).hostname);
    } catch {
      /* skip */
    }
  });

  let audit = `| Dependency | Original URL | Local path | Status | Notes |\n|---|---|---|---|---|\n`;
  for (const row of auditRows) {
    audit += `| asset | ${row.remote.replace(/\|/g, "\\|")} | ${row.local} | ${row.status} | ${row.notes} |\n`;
  }

  audit += `\n## Remaining external domains\n\n`;
  audit += [...domains]
    .filter((d) => !d.includes("wooowinvites.com") && !d.includes("supabase.co"))
    .map((d) => `- ${d}`)
    .join("\n");
  audit += `\n- fonts.googleapis.com\n- fonts.gstatic.com\n`;

  fs.writeFileSync(path.join(ROOT, "dependency-audit.md"), audit);
}

async function main() {
  ensureDirs();

  console.log("Fetching source HTML...");
  const srcHtml = await fetchBuffer(INVITE_URL);
  fs.writeFileSync(path.join(ROOT, "index-source.html"), srcHtml);

  const bundles = detectMainBundles(srcHtml.toString("utf8"));
  mainJs = bundles.js;
  mainCss = bundles.css;
  console.log(`Main bundles: ${mainJs}, ${mainCss}`);

  for (const name of [mainJs, mainCss]) {
    queueWooAsset(name);
  }

  for (const a of extractFromContent(srcHtml.toString("utf8"))) queueWooAsset(a);

  console.log("Downloading wooow assets recursively...");
  await drainQueue();

  console.log("Downloading remote runtime URLs...");
  for (const url of [...urlMap.keys()]) {
    try {
      await downloadRemoteUrl(url);
    } catch (err) {
      console.error(`  FAIL ${url}: ${err.message}`);
    }
  }
  await drainQueue();

  // favicon
  const faviconDest = path.join(DIRS.images, "favicon.png");
  if (!fs.existsSync(faviconDest)) {
    const buf = await fetchBuffer(`${BASE_URL}/favicon.png`);
    fs.writeFileSync(faviconDest, buf);
  }

  console.log("Rewriting relative paths in bundles...");
  const rewriteTargets = [];
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.(js|css|mjs|html)$/i.test(e.name)) rewriteTargets.push(p);
    }
  };
  walk(path.join(ROOT, "assets"));
  for (const f of rewriteTargets) rewriteFile(f);

  console.log("Fixing static hosting paths...");
  fixBundlePathsForStaticHosting();

  console.log("Capturing invitation data...");
  const invite = await captureInviteData();

  console.log("Downloading invite media...");
  await downloadInviteMedia(invite);

  console.log("Localizing invite media references...");
  localizeInviteMedia(invite);

  buildLocalRuntime();
  buildIndexHtml();
  writeAuditFiles(invite);

  console.log(`\nDone.`);
  console.log(`  wooow assets: ${downloaded.size}`);
  console.log(`  preview: npx wrangler pages dev . --port 8788`);
  console.log(`  then open: http://127.0.0.1:8788/templates/animated-flowers/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
