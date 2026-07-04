#!/usr/bin/env node
/**
 * Mirror wooowinvites Vite/React invite page locally.
 * Usage: node mirror.js
 */
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");
const { URL } = require("url");

const ROOT = __dirname;
const ASSETS_DIR = path.join(ROOT, "assets");
const IMAGES_DIR = path.join(ASSETS_DIR, "images");
const FONTS_DIR = path.join(ASSETS_DIR, "fonts");
const BASE_URL = "https://www.wooowinvites.com";

const ASSET_EXT =
  /\.(?:png|jpe?g|webp|svg|gif|woff2?|ttf|otf|mp3|mp4|json|ico)(?:\?[A-Za-z0-9&=\-_.%+]*)?$/i;

const CHUNK_RE = /(?:^|["'`(])(?:\.\/)?(?:\/assets\/|assets\/)([A-Za-z0-9_.-]+\.(?:js|css|mjs|mp4|mp3|png|jpe?g|webp|svg|woff2?|ttf|otf|json))(?:\?[A-Za-z0-9&=\-_.%+]*)?(?:["'`)])/g;

const URL_RE =
  /https?:\/\/[^\s"'`<>\\)]+(?:\.(?:png|jpe?g|webp|svg|gif|woff2?|ttf|otf|mp3|mp4|json|ico)|\/assets\/[A-Za-z0-9_.-]+)(?:\?[A-Za-z0-9&=\-_.%+]*)?/g;

const ABS_ASSET_RE = /["'`]\/(assets\/[A-Za-z0-9_.-]+(?:\?[A-Za-z0-9&=\-_.%+]*)?)["'`]/g;

/** @type {Set<string>} */
const pending = new Set();
/** @type {Set<string>} */
const downloaded = new Set();
/** @type {Map<string, string>} remote -> local relative path from ROOT */
const urlMap = new Map();

function ensureDirs() {
  for (const d of [ASSETS_DIR, IMAGES_DIR, FONTS_DIR]) {
    fs.mkdirSync(d, { recursive: true });
  }
}

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib
      .get(url, { headers: { "User-Agent": "dvites-mirror/1.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          const next = new URL(res.headers.location, url).href;
          fetchBuffer(next).then(resolve).catch(reject);
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
  if (/\.(png|jpe?g|webp|svg|gif|ico|mp3|mp4)$/i.test(fileName)) return "image";
  return "asset";
}

function localPathForFileName(fileName) {
  const kind = classifyFileName(fileName);
  if (kind === "font") return path.join(FONTS_DIR, fileName);
  if (kind === "image") return path.join(IMAGES_DIR, fileName);
  return path.join(ASSETS_DIR, fileName);
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
  while ((m = chunkCopy.exec(content)) !== null) {
    found.add(normalizeAssetName(m[1]));
  }

  const absCopy = new RegExp(ABS_ASSET_RE.source, ABS_ASSET_RE.flags);
  while ((m = absCopy.exec(content)) !== null) {
    found.add(normalizeAssetName(path.basename(m[1])));
  }

  const urlCopy = new RegExp(URL_RE.source, URL_RE.flags);
  while ((m = urlCopy.exec(content)) !== null) {
    const url = m[0].replace(/&amp;/g, "&");
    if (url.includes("wooowinvites.com/assets/")) {
      found.add(normalizeAssetName(path.basename(url.split("?")[0])));
    } else if (
      ASSET_EXT.test(url.split("?")[0]) ||
      url.includes("fonts.gstatic.com") ||
      url.includes("framerusercontent.com")
    ) {
      urlMap.set(url, url);
    }
  }

  return found;
}

async function downloadAsset(fileName) {
  const name = normalizeAssetName(fileName);
  if (downloaded.has(name)) return;

  const diskPath = localPathForFileName(name);
  const remoteUrl = `${BASE_URL}/assets/${name}`;

  if (!fs.existsSync(diskPath)) {
    process.stdout.write(`  dl assets/${name}\n`);
    const buf = await fetchBuffer(remoteUrl);
    fs.writeFileSync(diskPath, buf);
  }

  downloaded.add(name);
  pending.delete(name);

  const content = fs.readFileSync(diskPath, "utf8");
  for (const nested of extractFromContent(content)) {
    queueAsset(nested);
  }
}

async function downloadRemoteUrl(url) {
  if (urlMap.has(url) && typeof urlMap.get(url) === "string" && !urlMap.get(url).startsWith("http")) {
    return;
  }

  const clean = url.replace(/&amp;/g, "&");
  const withoutQuery = clean.split("?")[0];
  let fileName = path.basename(withoutQuery);
  fileName = fileName.replace(/[^a-zA-Z0-9._-]/g, "-");

  const kind = classifyFileName(fileName);
  const diskPath =
    kind === "font"
      ? path.join(FONTS_DIR, fileName)
      : kind === "image"
        ? path.join(IMAGES_DIR, fileName)
        : path.join(ASSETS_DIR, fileName);

  if (!fs.existsSync(diskPath)) {
    process.stdout.write(`  dl remote ${fileName}\n`);
    const buf = await fetchBuffer(clean);
    fs.writeFileSync(diskPath, buf);
  }

  urlMap.set(url, relPathFromRoot(diskPath));

  try {
    const content = fs.readFileSync(diskPath, "utf8");
    for (const nested of extractFromContent(content)) {
      queueAsset(nested);
    }
    for (const nestedUrl of extractFromContent(content)) {
      if (typeof nestedUrl === "string" && nestedUrl.startsWith("http")) {
        urlMap.set(nestedUrl, nestedUrl);
      }
    }
  } catch {
    /* binary */
  }
}

async function drainQueue() {
  while (pending.size > 0) {
    const batch = [...pending];
    for (const name of batch) {
      try {
        await downloadAsset(name);
      } catch (err) {
        console.error(`  FAIL assets/${name}: ${err.message}`);
        pending.delete(name);
      }
    }
  }
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
    replacements.set(`\`/assets/${name}\``, `\`${fromHere}\``);
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
    if (local.startsWith("http")) continue;
    replacements.set(remote, local);
    replacements.set(remote.replace(/&/g, "&amp;"), local);
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

function buildIndexHtml() {
  const raw = fs.readFileSync(path.join(ROOT, "index-source.html"), "utf8");
  let html = raw;

  // Remove Meta Pixel
  html = html.replace(
    /<!-- Meta Pixel Code[\s\S]*?<!-- End Meta Pixel Code -->\s*/g,
    ""
  );

  // Remove Meta CAPI / IP fetch
  html = html.replace(
    /<!-- Meta Client-Side Parameter Builder SDK[\s\S]*?<\/script>\s*/g,
    ""
  );

  // Remove Google tag (async loader + inline config)
  html = html.replace(
    /<!-- Google tag \(gtag\.js\) -->[\s\S]*?<\/script>\s*<script>[\s\S]*?gtag\([\s\S]*?<\/script>\s*/g,
    ""
  );
  html = html.replace(
    /<script>\s*window\.dataLayer[\s\S]*?gtag\('config'[\s\S]*?<\/script>\s*/g,
    ""
  );

  // Remove flock + l5e analytics
  html = html.replace(/<script defer src="\/~flock\.js"[^>]*><\/script>/g, "");
  html = html.replace(/<script defer src="\/__l5e\/events\.js"[^>]*><\/script>/g, "");

  // Remove fb noscript pixel
  html = html.replace(
    /<noscript><img height="1" width="1"[\s\S]*?facebook\.com\/tr[\s\S]*?<\/noscript>\s*/g,
    ""
  );

  html = html.replace(
    'src="/assets/index-Cfoc4NWM.js"',
    'src="/assets/index-Cfoc4NWM.js"'
  );
  html = html.replace(
    'href="/assets/index-Skdm8sZv.css"',
    'href="/assets/index-Skdm8sZv.css"'
  );
  html = html.replace('href="/favicon.png"', 'href="/assets/images/favicon.png"');

  const buyBar = `
    <!-- Dvites Sticky Bar -->
<div class="dvites-buy-bar">

  <div class="dvites-brand">
    <img src="/assets/images/dvites-logo.png" alt="Dvites">
  </div>

  <span class="dvites-text">
    Personalize this invitation in minutes.
  </span>

  <a href="#" id="buyNowBtn">
    Buy Now
  </a>

</div>

<style>

.dvites-buy-bar{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:68px;
    background:rgba(35,20,26,.88);
    backdrop-filter:blur(18px);
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:0 32px;
    z-index:999999;
    border-bottom:1px solid rgba(255,255,255,.08);
}

body{
    padding-top:68px;
}

.dvites-brand{
    display:flex;
    align-items:center;
}

.dvites-brand img{
    height:40px;
    width:auto;
    display:block;
}

.dvites-text{
    flex:1;
    text-align:center;
    color:#fff;
    font-size:16px;
    font-weight:500;
    font-family:Inter,sans-serif;
    padding:0 24px;
}

.dvites-buy-bar a{
    text-decoration:none;
    background:#EF6B96;
    color:#fff;
    padding:12px 28px;
    border-radius:999px;
    font-weight:700;
    transition:.25s;
    white-space:nowrap;
}

.dvites-buy-bar a:hover{
    transform:translateY(-2px);
    background:#F57EA5;
}

@media(max-width:768px){

    .dvites-buy-bar{
        padding:10px 16px;
        height:auto;
        flex-wrap:wrap;
        justify-content:center;
        gap:10px;
    }

    body{
        padding-top:100px;
    }

    .dvites-brand{
        width:100%;
        justify-content:center;
    }

    .dvites-brand img{
        height:34px;
    }

    .dvites-text{
        width:100%;
        text-align:center;
        font-size:14px;
        padding:0;
    }

    .dvites-buy-bar a{
        width:100%;
        text-align:center;
    }

}

</style>`;

  html = html.replace("</body>", `${buyBar}\n  </body>`);

  fs.writeFileSync(path.join(ROOT, "index.html"), html);
}

async function main() {
  ensureDirs();

  // Save source HTML
  const srcHtml = await fetchBuffer(`${BASE_URL}/invite/demo-4638f3`);
  fs.writeFileSync(path.join(ROOT, "index-source.html"), srcHtml);

  // Seed queue from HTML + already-downloaded main bundles
  for (const f of ["index-Cfoc4NWM.js", "index-Skdm8sZv.css"]) {
    const p = path.join(ASSETS_DIR, f);
    if (!fs.existsSync(p)) {
      const buf = await fetchBuffer(`${BASE_URL}/assets/${f}`);
      fs.writeFileSync(p, buf);
    }
    for (const a of extractFromContent(fs.readFileSync(p, "utf8"))) {
      queueAsset(a);
    }
    downloaded.add(f);
  }

  for (const a of extractFromContent(srcHtml.toString("utf8"))) {
    queueAsset(a);
  }

  console.log("Downloading assets recursively...");
  await drainQueue();

  console.log("Downloading remote URLs...");
  const remoteUrls = [...urlMap.keys()];
  for (const url of remoteUrls) {
    try {
      await downloadRemoteUrl(url);
    } catch (err) {
      console.error(`  FAIL ${url}: ${err.message}`);
    }
  }
  await drainQueue();

  // favicon + dvites logo
  for (const [remote, localName, dest] of [
    [`${BASE_URL}/favicon.png`, "favicon.png", path.join(IMAGES_DIR, "favicon.png")],
  ]) {
    if (!fs.existsSync(dest)) {
      const buf = await fetchBuffer(remote);
      fs.writeFileSync(dest, buf);
    }
  }

  const logoSrc = path.join(ROOT, "..", "Mountains", "assets", "images", "dvites-logo.png");
  fs.copyFileSync(logoSrc, path.join(IMAGES_DIR, "dvites-logo.png"));

  console.log("Rewriting paths...");
  const filesToRewrite = [
    path.join(ROOT, "index-source.html"),
    ...walkDir(ASSETS_DIR),
  ];
  for (const f of filesToRewrite) {
    rewriteFile(f);
  }

  buildIndexHtml();
  rewriteFile(path.join(ROOT, "index.html"));

  const inviteDir = path.join(ROOT, "invite", "demo-4638f3");
  fs.mkdirSync(inviteDir, { recursive: true });
  fs.copyFileSync(path.join(ROOT, "index.html"), path.join(inviteDir, "index.html"));

  console.log("Fixing asset paths for static hosting...");
  fixPaths();
  fixChunkPaths();

  console.log(`\nDone. Downloaded ${downloaded.size} assets.`);
  console.log(`  JS/CSS in assets/: ${fs.readdirSync(ASSETS_DIR).filter((f) => /\.(js|css|mjs)$/i.test(f)).length}`);
  console.log(`  images: ${fs.readdirSync(IMAGES_DIR).length}`);
  console.log(`  fonts: ${fs.existsSync(FONTS_DIR) ? fs.readdirSync(FONTS_DIR).length : 0}`);
}

function fixPaths() {
  let changed = 0;
  for (const file of walkDir(ASSETS_DIR)) {
    let content = fs.readFileSync(file, "utf8");
    const next = content
      .replace(/"\.\/images\//g, '"/assets/images/')
      .replace(/'\.\/images\//g, "'/assets/images/");
    if (next !== content) {
      fs.writeFileSync(file, next);
      changed++;
    }
  }
  console.log(`  Fixed ./images/ in ${changed} files`);
}

function fixChunkPaths() {
  let changed = 0;
  for (const file of walkDir(ASSETS_DIR)) {
    let content = fs.readFileSync(file, "utf8");
    const next = content
      .replace(/from"\.\/([A-Za-z0-9_.-]+\.(?:js|mjs|css))"/g, 'from"/assets/$1"')
      .replace(/from'\.\/([A-Za-z0-9_.-]+\.(?:js|mjs|css))'/g, "from'/assets/$1'")
      .replace(/import\("\.\/([A-Za-z0-9_.-]+\.(?:js|mjs|css))"\)/g, 'import("/assets/$1")')
      .replace(/import\('\.\/([A-Za-z0-9_.-]+\.(?:js|mjs|css))'\)/g, "import('/assets/$1')")
      .replace(/"\.\/([A-Za-z0-9_.-]+\.(?:js|mjs|css))"/g, '"/assets/$1"');
    if (next !== content) {
      fs.writeFileSync(file, next);
      changed++;
    }
  }
  console.log(`  Fixed chunk paths in ${changed} files`);
}

function walkDir(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkDir(p));
    else if (/\.(js|css|mjs|html)$/i.test(entry.name)) out.push(p);
  }
  return out;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
