#!/usr/bin/env node
/**
 * Framer extraction pipeline for templates/niqah
 * Source: https://niqah-invitearc.framer.website/
 */
const fs = require("fs");
const path = require("path");
const https = require("https");
const crypto = require("crypto");
const { execSync } = require("child_process");

const ROOT = __dirname;
const TEMPLATE = "niqah";
const SOURCE_URL = "https://niqah-invitearc.framer.website/";
const PAGE_TITLE = "Fardeen Weds Zarin — Niqah Invitation";
const CANONICAL_URL = "https://www.dvites.com/templates/niqah";
const OUTPUT_HTML = path.join(ROOT, "index.html");
const SOURCE_HTML = path.join(ROOT, "index-source.html");
const imagesDir = path.join(ROOT, "assets", "images");
const fontsDir = path.join(ROOT, "assets", "fonts");
const scriptsDir = path.join(ROOT, "assets", "scripts");
const BASE = `/templates/${TEMPLATE}/assets/`;

const FRAMER_ASSET_RE =
  /https:\/\/framerusercontent\.com\/(?:images|assets|third-party-assets)\/[A-Za-z0-9_./-]+(?:\?(?:[A-Za-z0-9&=\-_.%+]|&amp;)+)?/g;
const FRAMER_SITE_RE =
  /https:\/\/framerusercontent\.com\/sites\/[A-Za-z0-9_-]+\/[A-Za-z0-9_.-]+\.(?:json|mjs|js)/g;
const GSTATIC_RE =
  /https:\/\/fonts\.gstatic\.com\/[^\s"'`<>)\\]+\.(?:woff2?|ttf|otf)(?:\?[A-Za-z0-9&=\-_.%+]+)?/g;
const FRAMER_COM_RE = /https:\/\/framer\.com\/[^\s"'`<>)\\]+\.(?:mjs|js|json)/g;
const EDITOR_INIT_URL = "https://framer.com/edit/init.mjs";
const REL_IMPORT_RE =
  /(?:from|import)\s*["'](\.\/[^"']+\.(?:mjs|js|json))["']/g;
const DYNAMIC_IMPORT_RE = /import\s*\(\s*["'](\.\/[^"']+\.(?:mjs|js|json))["']\s*\)/g;

/** @type {Map<string, { kind: string, fileName: string, diskPath: string }>} */
const registry = new Map();

function cleanUrl(url) {
  return url.replace(/&amp;/g, "&");
}

function hashUrl(url) {
  return crypto.createHash("md5").update(cleanUrl(url)).digest("hex").slice(0, 8);
}

function isFontFileName(name) {
  return /\.(woff2?|ttf|otf)$/i.test(name);
}

function isScriptFileName(name) {
  return /\.(mjs|js|json)$/i.test(name);
}

function classifyUrl(url) {
  const clean = cleanUrl(url);
  if (/fonts\.gstatic\.com/.test(clean)) return "font";
  if (/framerusercontent\.com\/sites\//.test(clean) && isScriptFileName(clean)) {
    return "script";
  }
  if (/framer\.com\//.test(clean) && isScriptFileName(clean)) return "script";
  if (/framerusercontent\.com\/(?:assets|third-party-assets)\//.test(clean)) {
    return isFontFileName(clean) ? "font" : "image";
  }
  if (/framerusercontent\.com\/images\//.test(clean)) return "image";
  if (/framer\.com\//.test(clean)) return "script";
  return "image";
}

function localFileName(url, kind) {
  const clean = cleanUrl(url);
  const withoutQuery = clean.split("?")[0];
  const ext = path.extname(withoutQuery) || (kind === "script" ? ".bin" : "");
  let base = path.basename(withoutQuery, ext) || "asset";
  base = base.replace(/[^a-zA-Z0-9._-]/g, "-");

  if (kind === "script") return `${base}${ext}`;
  if (clean.includes("?")) return `${base}-${hashUrl(url)}${ext}`;
  return `${base}${ext}`;
}

function targetDir(kind) {
  if (kind === "font") return fontsDir;
  if (kind === "script") return scriptsDir;
  return imagesDir;
}

function publicPathFor(kind, fileName) {
  if (kind === "font") return `${BASE}fonts/${fileName}`;
  if (kind === "script") return `${BASE}scripts/${fileName}`;
  return `${BASE}images/${fileName}`;
}

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "dvites-framer-mirror/1.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          fetchText(new URL(res.headers.location, url).href).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          res.resume();
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      })
      .on("error", reject);
  });
}

function download(url) {
  return new Promise((resolve) => {
    https
      .get(cleanUrl(url), { headers: { "User-Agent": "dvites-framer-mirror/1.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          download(res.headers.location).then(resolve);
          return;
        }
        if (res.statusCode !== 200) {
          res.resume();
          console.log("Failed:", url, `(HTTP ${res.statusCode})`);
          resolve(null);
          return;
        }
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      })
      .on("error", () => {
        console.log("Failed:", url);
        resolve(null);
      });
  });
}

async function ensureDownloaded(url) {
  const normalized = cleanUrl(url);
  if (registry.has(normalized)) return registry.get(normalized);

  if (normalized === EDITOR_INIT_URL) {
    writeEditorStub();
    const entry = {
      kind: "script",
      fileName: "init.mjs",
      diskPath: path.join(scriptsDir, "init.mjs"),
    };
    registry.set(normalized, entry);
    return entry;
  }

  const kind = classifyUrl(normalized);
  const fileName = localFileName(normalized, kind);
  const dir = targetDir(kind);
  const diskPath = path.join(dir, fileName);

  if (!fs.existsSync(diskPath)) {
    console.log(`Downloading [${kind}]: ${fileName}`);
    const data = await download(normalized);
    if (!data) return null;
    fs.writeFileSync(diskPath, data);
  }

  const entry = { kind, fileName, diskPath };
  registry.set(normalized, entry);
  return entry;
}

function decodeHtmlEntities(content) {
  return content.replace(/&amp;/g, "&");
}

function extractUrls(content) {
  const decoded = decodeHtmlEntities(content);
  const urls = new Set();
  for (const re of [FRAMER_ASSET_RE, FRAMER_SITE_RE, GSTATIC_RE, FRAMER_COM_RE]) {
    for (const match of decoded.match(re) || []) {
      const url = cleanUrl(match);
      if (/fontshare/i.test(url)) continue;
      urls.add(url);
    }
  }
  return [...urls];
}

function fixScriptAssetPaths(content) {
  return content
    .replaceAll("../images/", `${BASE}images/`)
    .replaceAll("../fonts/", `${BASE}fonts/`)
    .replaceAll("../scripts/", `${BASE}scripts/`);
}

function stripLocalAssetQueries(content) {
  return content.replace(
    /(\/templates\/niqah\/assets\/(?:images|fonts|scripts)\/[A-Za-z0-9._-]+(?:\.(?:png|webp|jpg|jpeg|mp3|woff2?|mjs|js|json))?)(?:[;?][^"'\s,>)]+)?/g,
    "$1"
  );
}

function extractRelativeImports(content) {
  const imports = new Set();
  for (const re of [REL_IMPORT_RE, DYNAMIC_IMPORT_RE]) {
    let match;
    const copy = new RegExp(re.source, re.flags);
    while ((match = copy.exec(content)) !== null) {
      imports.add(match[1]);
    }
  }
  return [...imports];
}

function applyReplacements(content, replacements) {
  let updated = content;
  const entries = [...replacements.entries()].sort((a, b) => b[0].length - a[0].length);

  for (const [oldUrl, newPath] of entries) {
    updated = updated.split(oldUrl).join(newPath);
    updated = updated.split(oldUrl.replace(/&/g, "&amp;")).join(newPath);
  }

  return updated;
}

function resetAssetDirs() {
  for (const dir of [imagesDir, fontsDir, scriptsDir]) {
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });
  }
}

function listScriptFiles() {
  if (!fs.existsSync(scriptsDir)) return [];
  return fs
    .readdirSync(scriptsDir)
    .filter((name) => /\.(mjs|js|json)$/i.test(name))
    .map((name) => path.join(scriptsDir, name));
}

function hasRemoteTargets() {
  try {
    execSync(
      'grep -R -E "framerusercontent\\.com|https://([a-z0-9-]+\\.)*framer\\.com|events\\.framer\\.com|fonts\\.gstatic\\.com|framerstatic\\.com" assets/ index.html 2>/dev/null | grep -v "Made in Framer"',
      { cwd: ROOT, stdio: "pipe" }
    );
    return true;
  } catch {
    return false;
  }
}

function writeEditorStub() {
  fs.writeFileSync(
    path.join(scriptsDir, "init.mjs"),
    `export function createEditorBar() {
  return function FramerEditorBar() {
    return null;
  };
}
`
  );
}

function hidePreviewOverlays(html) {
  const css = `<style id="dvites-hide-preview">
[data-framer-name="Water Mark"],
.framer-guyscn[data-framer-name="Water Mark"] { display: none !important; visibility: hidden !important; pointer-events: none !important; }
.framer-gv8am9-container { display: none !important; }
</style>`;
  if (html.includes("dvites-hide-preview")) return html;
  return html.replace("</head>", `${css}\n</head>`);
}

function assetExists(url) {
  const clean = url.split("?")[0].split("#")[0];
  if (!clean.startsWith(BASE)) return true;
  const disk = path.join(ROOT, clean.replace(BASE, "assets/"));
  return fs.existsSync(disk);
}

function removeBrokenAssetReferences(html) {
  let out = html.replace(/<img\b[^>]*>/gi, (tag) => {
    const urls = [];
    const src = tag.match(/\ssrc="([^"]+)"/)?.[1];
    const srcset = tag.match(/\ssrcset="([^"]+)"/)?.[1];
    if (src) urls.push(src);
    if (srcset) {
      for (const part of srcset.split(",")) {
        const u = part.trim().split(/\s+/)[0];
        if (u) urls.push(u);
      }
    }
    const broken = urls.some((u) => u.startsWith(BASE) && !assetExists(u));
    return broken ? "" : tag;
  });

  out = out.replace(/([^{}]+)\{([^{}]*background-image\s*:\s*url\([^)]+\)[^{}]*)\}/gi, (full, selector, body) => {
    const urls = [...body.matchAll(/url\(["']?([^"')]+)["']?\)/gi)].map((m) => m[1]);
    const hasBroken = urls.some((u) => u.startsWith(BASE) && !assetExists(u));
    if (!hasBroken) return full;
    const cleanedBody = body.replace(/background-image\s*:\s*url\([^)]+\)\s*;?/gi, "").trim();
    if (!cleanedBody) return "";
    return `${selector}{${cleanedBody}}`;
  });

  return out;
}

function stripBrokenAssetRefsFromScripts(content) {
  const brokenRe = /\/templates\/niqah\/assets\/images\/9Q8DHD72T7W9GChLL5zSWX0AogQ[^`"']*/g;
  let out = content.replace(
    /\/templates\/niqah\/assets\/images\/9Q8DHD72T7W9GChLL5zSWX0AogQ-cf39c15a\.png 512w,\/templates\/niqah\/assets\/images\/9Q8DHD72T7W9GChLL5zSWX0AogQ-617af69c\.png 659w/g,
    ""
  );
  out = out.replace(/src:`\/templates\/niqah\/assets\/images\/9Q8DHD72T7W9GChLL5zSWX0AogQ-617af69c\.png`/g, "src:``");
  out = out.replace(brokenRe, "");
  return out;
}

function applyDvitesBranding(content) {
  return content
    .replaceAll("https://invitearc.com/niqah-product/", "https://www.dvites.com/")
    .replaceAll("https://invitearc.com/nikah-product/", "https://www.dvites.com/")
    .replaceAll("https://invitearc.com/laavan-product/", "https://www.dvites.com/")
    .replaceAll("https://invitearc.com/", "https://www.dvites.com/")
    .replaceAll("https://www.instagram.com/theinvitearc/", "https://www.instagram.com/dvites/")
    .replaceAll("https://niqah-invitearc.framer.website", CANONICAL_URL)
    .replaceAll("https://nikah-invitearc.framer.website", CANONICAL_URL);
}

function disablePreviewWatermarkInScripts(content) {
  return content.replace(
    /C\(\)&&_\([^,]+,\{className:`framer-guyscn[^`]*`,"data-framer-name":`Water Mark`/g,
    "false"
  );
}

function finalizeHtml(html) {
  let out = html;

  out = out.replace(
    /<script async src="https:\/\/events\.framer\.com\/script[^"]*"[^>]*><\/script>\s*/g,
    ""
  );
  out = out.replace(
    /<link href="https:\/\/fonts\.gstatic\.com" rel="preconnect" crossorigin>\s*/g,
    ""
  );
  out = out.replace(
    /<script>try\{if\(localStorage\.getItem\("__framer_force_showing_editorbar_since"\)\)[\s\S]*?<\/script>\s*/g,
    ""
  );
  out = out.replace(/<div id="__framer-badge-container">[\s\S]*?<\/div>\s*(?=<script)/, "");
  out = out.replace(/<meta name="framer-search-index"[^>]*>\s*/g, "");
  out = out.replace(/<meta name="framer-search-index-fallback"[^>]*>\s*/g, "");
  out = out.replace(
    /<link rel="canonical" href="https:\/\/niqah-invitearc\.framer\.website\/">\s*/g,
    ""
  );
  out = out.replace(
    /<meta property="og:url" content="https:\/\/niqah-invitearc\.framer\.website\/">\s*/g,
    ""
  );

  if (!out.includes('rel="canonical"')) {
    out = out.replace(
      /<meta name="robots" content="max-image-preview:large">/,
      `<meta name="robots" content="max-image-preview:large">\n    <link rel="canonical" href="${CANONICAL_URL}">\n    <meta property="og:url" content="${CANONICAL_URL}">`
    );
  }

  if (!out.includes("dvites-embedded-preview")) {
    out = out.replace(
      /<meta name="viewport" content="width=device-width">/,
      `$&\n  <script>(function(){var p=new URLSearchParams(location.search);if(p.get("preview")==="1"||p.get("preview")==="true"||window.self!==window.top){document.documentElement.classList.add("dvites-embedded-preview");}})();</script>`
    );
  }

  out = hidePreviewOverlays(applyDvitesBranding(out));

  if (!out.includes('name="framer-html-plugin"')) {
    out = out.replace(
      /<meta charset="utf-8">/i,
      '<meta charset="utf-8">\n    <meta name="framer-html-plugin" content="disable">'
    );
  }

  out = out.replace(
    /<style>\s*\.framer-6jWyo\.framer-n0ccwk \{display:none\}\s*<\/style>\s*/g,
    ""
  );

  if (!out.includes("dvites-buy-bar")) {
    out = out.replace(
      "</body>",
      `
    <div class="dvites-buy-bar">
      <div class="dvites-brand">
        <img src="${BASE}images/dvites-logo.png" alt="Dvites">
      </div>
      <span class="dvites-text">Personalize this invitation in minutes.</span>
      <a href="https://www.dvites.com/" id="buyNowBtn" target="_blank" rel="noopener">Buy Now</a>
    </div>
    <style>
.dvites-buy-bar{position:fixed;top:0;left:0;width:100%;height:68px;background:rgba(35,20,26,.88);backdrop-filter:blur(18px);display:flex;align-items:center;justify-content:space-between;padding:0 32px;z-index:9999999;border-bottom:1px solid rgba(255,255,255,.08)}
body{padding-top:68px!important}
.dvites-brand{display:flex;align-items:center}
.dvites-brand img{height:40px;width:auto;display:block}
.dvites-text{flex:1;text-align:center;color:#fff;font-size:16px;font-weight:500;font-family:Inter,sans-serif;padding:0 24px}
.dvites-buy-bar a{text-decoration:none;background:#EF6B96;color:#fff;padding:12px 28px;border-radius:999px;font-weight:700;transition:.25s;white-space:nowrap}
.dvites-buy-bar a:hover{transform:translateY(-2px);background:#F57EA5}
@media(max-width:768px){
  .dvites-buy-bar{padding:10px 16px;height:auto;flex-wrap:wrap;justify-content:center;gap:10px}
  body{padding-top:100px!important}
  .dvites-brand{width:100%;justify-content:center}
  .dvites-brand img{height:34px}
  .dvites-text{width:100%;text-align:center;font-size:14px;padding:0}
  .dvites-buy-bar a{width:100%;text-align:center}
}
html.dvites-embedded-preview .dvites-buy-bar{display:none!important}
html.dvites-embedded-preview body{padding-top:0!important;margin-top:0!important;overflow-x:hidden!important}
html.dvites-embedded-preview,html.dvites-embedded-preview body,html.dvites-embedded-preview #main{width:100%!important;max-width:none!important;margin-left:0!important;margin-right:0!important}
html.dvites-embedded-preview [data-framer-name="Desktop"],
html.dvites-embedded-preview [data-framer-name="Phone"],
html.dvites-embedded-preview .framer-11idw7e-container,
html.dvites-embedded-preview .framer-gv8am9-container{display:none!important}
@media (max-width:1439.98px){
  html.dvites-embedded-preview [data-framer-root],
  html.dvites-embedded-preview .framer-UoDsP.framer-72rtr7{width:100%!important;max-width:none!important;margin:0!important}
  html.dvites-embedded-preview .framer-UoDsP .framer-11zp5db,
  html.dvites-embedded-preview .framer-UoDsP .framer-1tg1g6f{width:100%!important;max-width:none!important;left:0!important;right:0!important}
}
    </style>
  </body>`
    );
  }

  out = out.replace(/<title>[^<]*<\/title>/, `<title>${PAGE_TITLE}</title>`);

  return out;
}

function copyDvitesLogo() {
  const candidates = [
    path.join(ROOT, "../laavan/assets/images/dvites-logo.png"),
    path.join(ROOT, "../curtains/assets/images/dvites-logo.png"),
    path.join(ROOT, "../balcony-seaview/assets/images/dvites-logo.png"),
  ];
  for (const src of candidates) {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(imagesDir, "dvites-logo.png"));
      return;
    }
  }
}

async function processContent(content, filePath, siteBase) {
  const replacements = new Map();

  for (const url of extractUrls(content)) {
    const entry = await ensureDownloaded(url);
    if (!entry) continue;
    replacements.set(url, publicPathFor(entry.kind, entry.fileName));
  }

  if (siteBase && /\.(mjs|js)$/i.test(filePath)) {
    for (const relImport of extractRelativeImports(content)) {
      const remoteUrl = `${siteBase}${path.basename(relImport)}`;
      await ensureDownloaded(remoteUrl);
    }
  }

  return applyReplacements(content, replacements);
}

async function fetchRuntimeModules(siteBase) {
  const { chromium } = require("../balcony-seaview/node_modules/playwright");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const scripts = new Set();

  page.on("response", (res) => {
    const u = res.url();
    if (u.includes("framerusercontent.com/sites/") && /\.mjs$/.test(u)) {
      scripts.add(u.split("?")[0]);
    }
  });

  await page.goto(SOURCE_URL, { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(3000);
  await browser.close();

  for (const url of scripts) {
    await ensureDownloaded(url);
  }
  console.log(`Runtime modules discovered: ${scripts.size}`);
}

async function mirror() {
  console.log("Fetching source HTML...");
  const remoteHtml = await fetchText(SOURCE_URL);
  fs.writeFileSync(SOURCE_HTML, remoteHtml);

  resetAssetDirs();
  registry.clear();

  let html = remoteHtml;
  const siteMatch = html.match(
    /https:\/\/framerusercontent\.com\/sites\/([A-Za-z0-9_-]+)\//
  );
  const siteBase = siteMatch
    ? `https://framerusercontent.com/sites/${siteMatch[1]}/`
    : null;

  if (!siteBase) throw new Error("Could not detect Framer site base URL");
  console.log("Site base:", siteBase);

  let pass = 0;
  while (true) {
    pass++;
    console.log(`\n=== Pass ${pass} ===`);
    let changed = false;

    const nextHtml = await processContent(html, OUTPUT_HTML, siteBase);
    if (nextHtml !== html) changed = true;
    html = nextHtml;

    for (const scriptPath of listScriptFiles()) {
      const before = fs.readFileSync(scriptPath, "utf8");
      const after = await processContent(before, scriptPath, siteBase);
      if (after !== before) {
        fs.writeFileSync(scriptPath, after);
        changed = true;
        console.log(`Updated ${path.relative(ROOT, scriptPath)}`);
      }
    }

    if (!hasRemoteTargets()) {
      console.log("\nAll Framer remote URLs localized.");
      break;
    }

    if (!changed) {
      console.warn("\nWarning: remote URLs remain but no changes this pass.");
      try {
        execSync(
          'grep -R -n -E "framerusercontent\\.com|framer\\.com|events\\.framer|fonts\\.gstatic" assets/ index.html 2>/dev/null | grep -v "Made in Framer" | head -20',
          { cwd: ROOT, stdio: "inherit" }
        );
      } catch {
        /* done */
      }
      break;
    }
  }

  console.log("\nFetching runtime-only modules...");
  await fetchRuntimeModules(siteBase);

  let pass2 = 0;
  while (pass2 < 3) {
    pass2++;
    let changed = false;
    for (const scriptPath of listScriptFiles()) {
      const before = fs.readFileSync(scriptPath, "utf8");
      const after = await processContent(before, scriptPath, siteBase);
      if (after !== before) {
        fs.writeFileSync(scriptPath, after);
        changed = true;
      }
    }
    if (!changed) break;
  }

  html = removeBrokenAssetReferences(stripLocalAssetQueries(finalizeHtml(html)));
  fs.writeFileSync(OUTPUT_HTML, html);

  for (const scriptPath of listScriptFiles()) {
    const before = fs.readFileSync(scriptPath, "utf8");
    const after = stripBrokenAssetRefsFromScripts(
      disablePreviewWatermarkInScripts(
        applyDvitesBranding(stripLocalAssetQueries(fixScriptAssetPaths(before)))
      )
    );
    if (after !== before) fs.writeFileSync(scriptPath, after);
  }

  const badFontshare = path.join(imagesDir, "fontshare");
  if (fs.existsSync(badFontshare)) fs.unlinkSync(badFontshare);
  copyDvitesLogo();

  console.log(`\nCreated: ${OUTPUT_HTML}`);
  console.log(`Scripts: ${listScriptFiles().length}`);
  console.log(`Images: ${fs.readdirSync(imagesDir).length}`);
  console.log(`Fonts: ${fs.readdirSync(fontsDir).length}`);
}

mirror().catch((err) => {
  console.error(err);
  process.exit(1);
});
