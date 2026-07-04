#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const ROOT = __dirname;
const INDEX = path.join(ROOT, "index.html");

const R2_BASE = "https://pub-4dc8201144ca418fb604349c73e8c724.r2.dev/";
const STATIC_IMG = /^https?:\/\/static\.tildacdn\.net\/(tild[^/"'\s]+)\/([^"'?\s#]+)/;
const THB_IMG =
  /^https?:\/\/thb\.tildacdn\.net\/(tild[^/"'\s]+)\/-\/resize\/[^/]+\/([^"'?\s#]+)/;
const R2_ASSET = /^https?:\/\/pub-4dc8201144ca418fb604349c73e8c724\.r2\.dev\/(.+)/;

const R2_LOCAL = {
  "%D9%85%D8%BA%D8%B1%D9%85%20-%20Moghram%20(Guitar%20Cover)%20_%20Johny%20Abu%20Nassar%20%5Bz_RC48DJbU0%5D%20(1).mp3":
    "assets/audio/moghram-guitar-cover.mp3",
  "Luxury_illustration_with_atmosph%E2%80%A6_202605232035%20(1).mp4":
    "assets/videos/luxury-illustration.mp4",
  "Untitled%20Project.mp4": "assets/videos/untitled-project.mp4",
};

function fetch(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib
      .get(url, { headers: { "User-Agent": "dvites-mirror/1.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const next = res.headers.location.startsWith("http")
            ? res.headers.location
            : new URL(res.headers.location, url).href;
          return fetch(next).then(resolve).catch(reject);
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

function decodeSafe(s) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

function staticToLocal(folder, filename) {
  const cleanFolder = folder.replace(/^\/+/, "");
  const cleanFile = decodeSafe(filename.split("?")[0]);
  return path.join("assets", "images", cleanFolder, cleanFile);
}

function toHtmlPath(localRel) {
  return "./" + localRel.split(path.sep).join("/");
}

function collectUrls(text) {
  const urls = new Set();
  const patterns = [
    /https?:\/\/static\.tildacdn\.net\/tild[^"'?\s#<>]+/g,
    /https?:\/\/thb\.tildacdn\.net\/tild[^"'?\s#<>]+/g,
    /https?:\/\/pub-4dc8201144ca418fb604349c73e8c724\.r2\.dev\/[^"'?\s#<>]+/g,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(text))) urls.add(m[0]);
  }
  return urls;
}

function resolveLocalPath(url) {
  const staticMatch = url.match(STATIC_IMG);
  if (staticMatch) return staticToLocal(staticMatch[1], staticMatch[2]);

  const thbMatch = url.match(THB_IMG);
  if (thbMatch) return staticToLocal(thbMatch[1], thbMatch[2]);

  const r2Match = url.match(R2_ASSET);
  if (r2Match) {
    const rel = r2Match[1].split("?")[0];
    if (R2_LOCAL[rel]) return R2_LOCAL[rel];
    const decoded = decodeSafe(rel);
    if (/\.mp3$/i.test(decoded)) {
      return path.join("assets", "audio", path.basename(decoded));
    }
    if (/\.mp4$/i.test(decoded)) {
      return path.join("assets", "videos", path.basename(decoded));
    }
    return path.join("assets", "videos", path.basename(decoded));
  }
  return null;
}

function fullStaticUrl(localRel) {
  const parts = localRel.replace(/^assets\/images\//, "").split("/");
  if (parts.length < 2) return null;
  const filename = parts.pop();
  const folder = parts.join("/");
  return `https://static.tildacdn.net/${folder}/${encodeURIComponent(decodeSafe(filename)).replace(/%20/g, "%20")}`;
}

async function downloadUrlToFile(url, localRel, downloaded, missing) {
  if (downloaded.has(url)) return;
  downloaded.add(url);

  const localAbs = path.join(ROOT, localRel);
  if (fs.existsSync(localAbs)) return;

  let fetchUrl = url;
  const thbMatch = url.match(THB_IMG);
  if (thbMatch) {
    fetchUrl = `https://static.tildacdn.net/${thbMatch[1]}/${thbMatch[2]}`;
  }

  console.log("GET", fetchUrl);
  try {
    const buf = await fetch(fetchUrl);
    ensureDir(localAbs);
    fs.writeFileSync(localAbs, buf);
  } catch (e) {
    console.warn("MISSING", fetchUrl, e.message);
    missing.push(fetchUrl);
  }
}

function rewriteHtml(text, urlMap) {
  let out = text;
  const sorted = [...urlMap.entries()].sort((a, b) => b[0].length - a[0].length);
  for (const [remote, local] of sorted) {
    out = out.split(remote).join(local);
    const encoded = remote.replace(/ /g, "%20");
    if (encoded !== remote) out = out.split(encoded).join(local);
  }
  return out;
}

async function main() {
  let html = fs.readFileSync(INDEX, "utf8");
  const urls = collectUrls(html);
  const urlMap = new Map();
  const downloaded = new Set();
  const missing = [];

  for (const url of urls) {
    const localRel = resolveLocalPath(url);
    if (!localRel) continue;
    urlMap.set(url.split("?")[0], toHtmlPath(localRel));
    const staticMatch = url.match(STATIC_IMG) || url.match(THB_IMG);
    if (staticMatch) {
      await downloadUrlToFile(url, localRel, downloaded, missing);
    }
  }

  for (const [r2Path, localRel] of Object.entries(R2_LOCAL)) {
    const remote = R2_BASE + r2Path;
    urlMap.set(remote, toHtmlPath(localRel));
    urlMap.set(decodeSafe(remote), toHtmlPath(localRel));
    await downloadUrlToFile(remote, localRel, downloaded, missing);
  }

  html = rewriteHtml(html, urlMap);
  fs.writeFileSync(INDEX, html);

  console.log("\nDone.");
  console.log(`  ${downloaded.size - missing.length} assets downloaded`);
  console.log(`  ${urlMap.size} URL rewrites`);
  if (missing.length) {
    console.warn(`  ${missing.length} missing:`, missing.join(", "));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
