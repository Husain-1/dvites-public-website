#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const ROOT = __dirname;
const R2_BASE =
  "https://pub-1cc0f6e993214be9a36badeeb631f4b6.r2.dev/templates/template09/";
const INDEX = path.join(ROOT, "index.html");

function fetch(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib
      .get(url, { headers: { "User-Agent": "dvites-mirror/1.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetch(res.headers.location).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`${res.statusCode} ${url}`));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      })
      .on("error", reject);
  });
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function toLocalAssetPath(relativePath) {
  const clean = relativePath.replace(/^\.\//, "").replace(/^\/+/, "");
  if (clean.startsWith("assets/song/")) {
    return path.join("assets", "audio", path.basename(clean));
  }
  if (clean.startsWith("assets/")) {
    return path.join("assets", "images", clean.slice("assets/".length));
  }
  return clean;
}

function toHtmlPath(localPath) {
  return "./" + localPath.split(path.sep).join("/");
}

function toCssPath(localPath) {
  if (localPath.startsWith("assets/images/")) {
    return "../images/" + localPath.slice("assets/images/".length);
  }
  if (localPath.startsWith("assets/audio/")) {
    return "../audio/" + localPath.slice("assets/audio/".length);
  }
  return "../" + localPath.split(path.sep).join("/");
}

function collectAssetRefs(text) {
  const refs = new Set();
  const patterns = [
    /https:\/\/pub-1cc0f6e993214be9a36badeeb631f4b6\.r2\.dev\/templates\/template09\/assets\/([^"'?\s#]+)/g,
    /url\(\s*["']?(assets\/[^"')?\s]+)["']?\s*\)/g,
    /["'](assets\/[^"']+)["']/g,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(text))) {
      let p = m[1];
      if (p.endsWith("/")) continue;
      refs.add(p.startsWith("assets/") ? p.split("?")[0] : "assets/" + p.split("?")[0]);
    }
  }
  return refs;
}

async function downloadAsset(relativePath, downloaded, missing) {
  if (downloaded.has(relativePath)) return;
  downloaded.add(relativePath);

  const localRel = toLocalAssetPath(relativePath);
  const localAbs = path.join(ROOT, localRel);
  if (fs.existsSync(localAbs)) return;

  const url = R2_BASE + relativePath;
  console.log("GET", relativePath);
  try {
    const buf = await fetch(url);
    ensureDir(localAbs);
    fs.writeFileSync(localAbs, buf);
  } catch (e) {
    console.warn("MISSING", relativePath, e.message);
    missing.push(relativePath);
  }
}

function rewriteContent(text, mode) {
  let out = text;

  out = out.replace(
    /<base href="https:\/\/pub-1cc0f6e993214be9a36badeeb631f4b6\.r2\.dev\/templates\/template09\/">\s*/g,
    ""
  );

  out = out.replace(
    /https:\/\/pub-1cc0f6e993214be9a36badeeb631f4b6\.r2\.dev\/templates\/template09\/style\.css[^"'\s]*/g,
    "./assets/css/style.css"
  );
  out = out.replace(
    /https:\/\/pub-1cc0f6e993214be9a36badeeb631f4b6\.r2\.dev\/templates\/template09\/script\.js[^"'\s]*/g,
    "./assets/js/script.js"
  );
  out = out.replace(
    /https:\/\/pub-1cc0f6e993214be9a36badeeb631f4b6\.r2\.dev\/templates\/template09\/([^"'?\s#]+)(\?[^"'\s>]*)?/g,
    (_, rel) => {
      if (rel === "style.css" || rel === "script.js") return _;
      return toHtmlPath(toLocalAssetPath(rel));
    }
  );

  if (mode === "css") {
    out = out.replace(/url\(\s*["']?(assets\/[^"')?\s]+)["']?\s*\)/g, (_, rel) => {
      const local = toLocalAssetPath(rel);
      return `url("${toCssPath(local)}")`;
    });
  }

  if (mode === "js") {
    out = out.replace(/ShaadiPath/g, "Dvites");
    out = out.replace(
      /document\.title = couple\.bride \+ ' & ' \+ couple\.groom \+ ' · ShaadiPath';/,
      "// title set by Dvites override in index.html"
    );
    out = out.replace(/"assets\/song\/[^"]+"/g, '"./assets/audio/Template_09.mp3"');
    out = out.replace(/'assets\/([^']+)'/g, (_, sub) => {
      const local = toLocalAssetPath("assets/" + sub);
      return `'${toHtmlPath(local)}'`;
    });
    out = out.replace(/"assets\/([^"]+)"/g, (_, sub) => {
      const local = toLocalAssetPath("assets/" + sub);
      return `"${toHtmlPath(local)}"`;
    });
  }

  if (mode === "html") {
    out = out.replace(
      /href="https:\/\/pub-1cc0f6e993214be9a36badeeb631f4b6\.r2\.dev\/templates\/template09\/style\.css[^"]*"/,
      'href="./assets/css/style.css"'
    );
    out = out.replace(
      /src="https:\/\/pub-1cc0f6e993214be9a36badeeb631f4b6\.r2\.dev\/templates\/template09\/script\.js[^"]*"/,
      'src="./assets/js/script.js"'
    );
    out = out.replace(
      /src="\/templates\/rajkamal-palace\/assets\/images\/dvites-logo\.png"/,
      'src="./assets/images/dvites-logo.png"'
    );
  }

  return out;
}

async function main() {
  console.log("Downloading style.css and script.js...");
  const styleBuf = await fetch(R2_BASE + "style.css");
  const scriptBuf = await fetch(R2_BASE + "script.js");

  const cssPath = path.join(ROOT, "assets/css/style.css");
  const jsPath = path.join(ROOT, "assets/js/script.js");
  ensureDir(cssPath);
  ensureDir(jsPath);

  let html = fs.readFileSync(INDEX, "utf8");
  let css = styleBuf.toString("utf8");
  let js = scriptBuf.toString("utf8");

  const allRefs = new Set([
    ...collectAssetRefs(html),
    ...collectAssetRefs(css),
    ...collectAssetRefs(js),
  ]);

  // Explicit ttk icons referenced via concatenation
  const ttkIcons = [
    "pn-ttk-ico-dress-code-x-v01.webp",
    "pn-ttk-ico-venue-x-v01.webp",
    "pn-ttk-ico-stay-options-x-v01.webp",
    "pn-ttk-ico-hashtag-x-v01.webp",
    "pn-ttk-ico-transport-x-v01.webp",
    "pn-ttk-ico-gift-registry-x-v01.webp",
    "pn-ttk-ico-food-x-v01.webp",
    "pn-ttk-ico-weather-x-v01.webp",
    "pn-ttk-ico-parking-x-v01.webp",
    "pn-ttk-ico-kids-welcome-x-v01.webp",
    "pn-ttk-ico-photography-x-v01.webp",
    "pn-ttk-ico-whatsapp-group-x-v01.webp",
    "pn-ttk-ico-custom-note-x-v01.webp",
  ];
  ttkIcons.forEach((f) => allRefs.add("assets/ttk/" + f));

  allRefs.add("assets/song/Template_09.mp3");

  const downloaded = new Set();
  const missing = [];
  const sorted = [...allRefs].sort();
  console.log(`\nDownloading ${sorted.length} assets...\n`);

  for (const ref of sorted) {
    await downloadAsset(ref, downloaded, missing);
  }

  css = rewriteContent(css, "css");
  js = rewriteContent(js, "js");
  html = rewriteContent(html, "html");

  fs.writeFileSync(cssPath, css);
  fs.writeFileSync(jsPath, js);
  fs.writeFileSync(INDEX, html);

  console.log("\nDone.");
  console.log("  assets/css/style.css");
  console.log("  assets/js/script.js");
  console.log(`  ${downloaded.size - missing.length} assets downloaded`);
  if (missing.length) {
    console.warn(`  ${missing.length} missing:`, missing.join(", "));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
