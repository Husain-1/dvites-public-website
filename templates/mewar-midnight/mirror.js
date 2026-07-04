#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const ROOT = __dirname;
const R2_BASE =
  "https://pub-1cc0f6e993214be9a36badeeb631f4b6.r2.dev/templates/template02/";
const R2_PATTERN =
  /https:\/\/pub-1cc0f6e993214be9a36badeeb631f4b6\.r2\.dev\/templates\/template02\//g;
const INDEX = path.join(ROOT, "index.html");

const DEMO_PHOTOS = [
  { url: "https://shaadipath.com/demo-photos/photo1.jpg", local: "assets/images/demo-photos/photo1.jpg" },
  { url: "https://shaadipath.com/demo-photos/photo2.jpg", local: "assets/images/demo-photos/photo2.jpg" },
  { url: "https://shaadipath.com/demo-photos/photo3.png", local: "assets/images/demo-photos/photo3.png" },
  { url: "https://shaadipath.com/demo-photos/photo4.png", local: "assets/images/demo-photos/photo4.png" },
];

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

function decodeAssetPath(p) {
  try {
    return decodeURIComponent(p);
  } catch {
    return p;
  }
}

function toLocalAssetPath(relativePath) {
  const clean = relativePath.replace(/^\.\//, "").replace(/^\/+/, "");
  const decoded = decodeAssetPath(clean);
  if (decoded.startsWith("assets/song/")) {
    return path.join("assets", "audio", path.basename(decoded));
  }
  if (decoded.startsWith("assets/")) {
    return path.join("assets", "images", decoded.slice("assets/".length));
  }
  return decoded;
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
    /https:\/\/pub-1cc0f6e993214be9a36badeeb631f4b6\.r2\.dev\/templates\/template02\/assets\/([^"'?\s#]+)/g,
    /url\(\s*["']?(assets\/[^"')?\s]+)["']?\s*\)/g,
    /["'](assets\/[^"']+)["']/g,
    /'assets\/([^']+)'/g,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(text))) {
      let p = m[1];
      if (p.endsWith("/")) continue;
      const raw = p.split("?")[0];
      refs.add(raw.startsWith("assets/") ? raw : "assets/" + raw);
    }
  }
  return refs;
}

async function downloadUrlToFile(url, localRel, downloaded, missing) {
  const key = url;
  if (downloaded.has(key)) return;
  downloaded.add(key);

  const localAbs = path.join(ROOT, localRel);
  if (fs.existsSync(localAbs)) return;

  console.log("GET", url);
  try {
    const buf = await fetch(url);
    ensureDir(localAbs);
    fs.writeFileSync(localAbs, buf);
  } catch (e) {
    console.warn("MISSING", url, e.message);
    missing.push(url);
  }
}

async function downloadR2Asset(relativePath, downloaded, missing) {
  const decoded = decodeAssetPath(relativePath);
  const url = R2_BASE + relativePath;
  const localRel = toLocalAssetPath(decoded);
  await downloadUrlToFile(url, localRel, downloaded, missing);
}

function rewriteContent(text, mode) {
  let out = text;

  out = out.replace(
    /<base href="https:\/\/pub-1cc0f6e993214be9a36badeeb631f4b6\.r2\.dev\/templates\/template02\/">\s*/g,
    ""
  );

  out = out.replace(
    /https:\/\/pub-1cc0f6e993214be9a36badeeb631f4b6\.r2\.dev\/templates\/template02\/style\.css[^"'\s]*/g,
    "./assets/css/style.css"
  );
  out = out.replace(
    /https:\/\/pub-1cc0f6e993214be9a36badeeb631f4b6\.r2\.dev\/templates\/template02\/script\.js[^"'\s]*/g,
    "./assets/js/script.js"
  );

  out = out.replace(
    /https:\/\/pub-1cc0f6e993214be9a36badeeb631f4b6\.r2\.dev\/templates\/template02\/([^"'?\s#]+)(\?[^"'\s>]*)?/g,
    (_, rel) => {
      if (rel === "style.css" || rel === "script.js") return _;
      return toHtmlPath(toLocalAssetPath(decodeAssetPath(rel)));
    }
  );

  for (const photo of DEMO_PHOTOS) {
    out = out.split(photo.url).join(toHtmlPath(photo.local));
  }

  if (mode === "css") {
    out = out.replace(/ShaadiPath Wedding Website Builder/g, "Dvites Wedding Website Builder");
    out = out.replace(/url\(\s*["']?(assets\/[^"')?\s]+)["']?\s*\)/g, (_, rel) => {
      const local = toLocalAssetPath(decodeAssetPath(rel));
      return `url("${toCssPath(local)}")`;
    });
  }

  if (mode === "js") {
    out = out.replace(/SHAADIPATH|ShaadiPath/gi, "Dvites");
    out = out.replace(/"assets\/song\/[^"]+"/g, '"./assets/audio/Template_02.mp3"');
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
      /href="https:\/\/pub-1cc0f6e993214be9a36badeeb631f4b6\.r2\.dev\/templates\/template02\/style\.css[^"]*"/,
      'href="./assets/css/style.css"'
    );
    out = out.replace(
      /src="https:\/\/pub-1cc0f6e993214be9a36badeeb631f4b6\.r2\.dev\/templates\/template02\/script\.js[^"]*"/,
      'src="./assets/js/script.js"'
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

  allRefs.add("assets/song/Template_02.mp3");

  const downloaded = new Set();
  const missing = [];
  const sorted = [...allRefs].sort();
  console.log(`\nDownloading ${sorted.length} R2 assets...\n`);

  for (const ref of sorted) {
    await downloadR2Asset(ref, downloaded, missing);
  }

  console.log("\nDownloading demo gallery photos...\n");
  for (const photo of DEMO_PHOTOS) {
    await downloadUrlToFile(photo.url, photo.local, downloaded, missing);
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
