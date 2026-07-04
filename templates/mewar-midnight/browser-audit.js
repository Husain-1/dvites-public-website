#!/usr/bin/env node
const { chromium } = require("../balcony-seaview/node_modules/playwright");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const URL = "http://127.0.0.1:5500/templates/mewar-midnight/index.html";
const PORT = 5500;
const BANNED = /shaadipath|pub-1cc0f6e993214be9a36badeeb631f4b6|r2\.dev|cloudflareinsights|static\.cloudflareinsights/i;

function scanFolder(dir, hits = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) scanFolder(full, hits);
    else if (/\.(html|css|js|json)$/.test(entry.name)) {
      const text = fs.readFileSync(full, "utf8");
      if (BANNED.test(text)) hits.push(path.relative(ROOT, full));
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
  const bannedFiles = scanFolder(ROOT).filter(
    (f) =>
      !f.endsWith("mirror.js") &&
      !f.endsWith("build.js") &&
      !f.endsWith("browser-audit.js") &&
      !f.endsWith("index-source.html")
  );
  console.log("Banned string scan:", bannedFiles.length ? "FAIL" : "PASS");
  bannedFiles.forEach((f) => console.log("  ", f));

  await waitForServer();

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const failed = [];
  const remoteR2 = [];
  const tracking = [];
  const consoleErrors = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  page.on("response", (res) => {
    const u = res.url();
    if (res.status() === 404) failed.push(u);
    if (/shaadipath|pub-1cc0f6e993214be9a36badeeb631f4b6|r2\.dev/i.test(u)) remoteR2.push(u);
    if (/cloudflareinsights|googletagmanager|google-analytics|facebook\.net|doubleclick/i.test(u)) {
      tracking.push(u);
    }
  });

  console.log("Loading:", URL);
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForTimeout(10000);

  const title = await page.title();
  const hasBuyBar = (await page.locator(".dvites-buy-bar").count()) > 0;
  const hasCouple =
    (await page.locator("text=Tanya").count()) > 0 &&
    (await page.locator("text=Rohan").count()) > 0;
  const hasHero = (await page.locator("#heroWrap").count()) > 0;

  const local404 = failed.filter((u) => u.startsWith("http://127.0.0.1"));

  console.log(`\nTitle: ${title}`);
  console.log(`Dvites buy bar: ${hasBuyBar}`);
  console.log(`Couple names visible: ${hasCouple}`);
  console.log(`Hero section: ${hasHero}`);
  console.log(`Local 404s: ${local404.length}`);
  local404.slice(0, 20).forEach((u) => console.log("  404:", u));
  console.log(`R2/ShaadiPath requests: ${remoteR2.length}`);
  remoteR2.slice(0, 10).forEach((u) => console.log("  REMOTE:", u));
  console.log(`Tracking requests: ${tracking.length}`);
  console.log(`Console errors: ${consoleErrors.length}`);
  consoleErrors.slice(0, 10).forEach((e) => console.log("  ERR:", e.slice(0, 200)));

  await browser.close();

  const ok =
    bannedFiles.length === 0 &&
    title.includes("Mewar Midnight") &&
    hasBuyBar &&
    hasCouple &&
    hasHero &&
    local404.length === 0 &&
    remoteR2.length === 0 &&
    tracking.length === 0 &&
    consoleErrors.length === 0;

  console.log(ok ? "\n✓ Browser audit PASSED" : "\n✗ Browser audit FAILED");
  process.exit(ok ? 0 : 1);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
