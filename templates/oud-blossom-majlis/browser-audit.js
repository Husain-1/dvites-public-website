#!/usr/bin/env node
const { chromium } = require("../balcony-seaview/node_modules/playwright");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const URL = "http://127.0.0.1:5500/templates/oud-blossom-majlis/index.html";
const PORT = 5500;

const BANNED_FILE =
  /webgency|tilda\.ws|thb\.tildacdn\.net|pub-4dc8201144ca418fb604349c73e8c724|r2\.dev|cloudflareinsights|tilda-stat|tildafavicon/i;

const ALLOWED_CDN =
  /^https:\/\/static\.tildacdn\.net\/(?:js|css|ws)\/|https:\/\/neo\.tildacdn\.com\/js\/|^https:\/\/static\.tildacdn\.net\/tild[^/]+\/.*\.(woff2?|ttf|eot)$/i;

function scanFolder(dir, hits = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) scanFolder(full, hits);
    else if (/\.(html|css|js|json)$/.test(entry.name)) {
      const text = fs.readFileSync(full, "utf8");
      if (BANNED_FILE.test(text)) {
        const rel = path.relative(ROOT, full);
        if (
          !rel.endsWith("mirror.js") &&
          !rel.endsWith("build.js") &&
          !rel.endsWith("browser-audit.js") &&
          !rel.endsWith("index-source.html")
        ) {
          hits.push(rel);
        }
      }
      if (/static\.tildacdn\.net\/tild/.test(text)) {
        const rel = path.relative(ROOT, full);
        if (
          rel === "index.html" ||
          rel.endsWith(".css") ||
          rel.endsWith(".js")
        ) {
          if (
            !rel.endsWith("mirror.js") &&
            !rel.endsWith("build.js") &&
            !rel.endsWith("browser-audit.js") &&
            !rel.endsWith("index-source.html")
          ) {
            hits.push(`${rel} (tild image CDN)`);
          }
        }
      }
    }
  }
  return hits;
}

async function waitForServer() {
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(URL, { method: "HEAD" });
      if (res.ok) return;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server not ready at ${URL}. Start Live Server on port ${PORT}.`);
}

async function main() {
  const bannedFiles = scanFolder(ROOT);
  console.log("Banned string scan:", bannedFiles.length ? "FAIL" : "PASS");
  bannedFiles.forEach((f) => console.log("  ", f));

  await waitForServer();

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const failed = [];
  const bannedRemote = [];
  const tracking = [];
  const consoleErrors = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  page.on("response", (res) => {
    const u = res.url();
    if (res.status() === 404) failed.push(u);
    if (/webgency|tilda\.ws|thb\.tildacdn|pub-4dc8201144ca418fb604349c73e8c724|r2\.dev/i.test(u)) {
      bannedRemote.push(u);
    }
    if (/static\.tildacdn\.net\/tild/i.test(u)) bannedRemote.push(u);
    if (/cloudflareinsights|tilda-stat|googletagmanager|google-analytics|facebook\.net|doubleclick/i.test(u)) {
      tracking.push(u);
    }
  });

  console.log("Loading:", URL);
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForTimeout(8000);

  const title = await page.title();
  const hasBuyBar = (await page.locator(".dvites-buy-bar").count()) > 0;
  const hasOpener = (await page.locator(".popup-enter").count()) > 0;
  const hasAudio = (await page.locator("#invitation-audio").count()) > 0;

  const local404 = failed.filter((u) => u.startsWith("http://127.0.0.1"));
  const allowedRemote = bannedRemote.filter((u) => ALLOWED_CDN.test(u));
  const badRemote = bannedRemote.filter((u) => !ALLOWED_CDN.test(u));

  console.log(`\nTitle: ${title}`);
  console.log(`Dvites buy bar: ${hasBuyBar}`);
  console.log(`Opener animation: ${hasOpener}`);
  console.log(`Audio element: ${hasAudio}`);
  console.log(`Local 404s: ${local404.length}`);
  local404.slice(0, 20).forEach((u) => console.log("  404:", u));
  console.log(`Banned remote requests: ${badRemote.length}`);
  badRemote.slice(0, 10).forEach((u) => console.log("  REMOTE:", u));
  console.log(`Allowed Tilda CDN requests: ${allowedRemote.length}`);
  console.log(`Tracking requests: ${tracking.length}`);
  console.log(`Console errors: ${consoleErrors.length}`);
  consoleErrors.slice(0, 10).forEach((e) => console.log("  ERR:", e.slice(0, 200)));

  await browser.close();

  const ok =
    bannedFiles.length === 0 &&
    title.includes("Oud Blossom Majlis") &&
    hasBuyBar &&
    hasOpener &&
    hasAudio &&
    local404.length === 0 &&
    badRemote.length === 0 &&
    tracking.length === 0 &&
    consoleErrors.length === 0;

  console.log(ok ? "\n✓ Browser audit PASSED" : "\n✗ Browser audit FAILED");
  process.exit(ok ? 0 : 1);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
