#!/usr/bin/env node
const { chromium } = require("../balcony-seaview/node_modules/playwright");

const URL = "http://127.0.0.1:5500/templates/laavan/index.html";
const PORT = 5500;

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
  await waitForServer();

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const failed = [];
  const remote = [];
  const tracking = [];
  const consoleErrors = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  page.on("response", (res) => {
    const u = res.url();
    if (res.status() === 404) failed.push(u);
    if (/framerusercontent\.com|framer\.com|events\.framer|framerstatic\.com/.test(u)) {
      remote.push(u);
    }
    if (/facebook|googletagmanager|google-analytics|framer\.com\/edit|events\.framer/i.test(u)) {
      tracking.push(u);
    }
  });

  console.log("Loading:", URL);
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForTimeout(12000);

  const rootLen = (await page.locator("#main").innerHTML().catch(() => "")).length;
  const hasInviteText =
    (await page.locator("text=HARPREET").count()) > 0 ||
    (await page.locator("text=RITIKA").count()) > 0 ||
    (await page.locator("text=/wedding celebrations/i").count()) > 0 ||
    (await page.locator("text=INVITES").count()) > 0;

  const local404 = failed.filter((u) => u.startsWith("http://127.0.0.1"));
  const allowedExternal = remote.filter(
    (u) => !u.includes("fonts.gstatic.com") && !u.includes("fonts.googleapis.com")
  );
  const trackingHits = tracking.filter((u) => !u.includes("fonts.gstatic.com"));

  console.log(`\n#main content length: ${rootLen}`);
  console.log(`Invite content visible: ${hasInviteText}`);
  console.log(`Local 404s: ${local404.length}`);
  local404.slice(0, 15).forEach((u) => console.log("  404:", u));
  console.log(`Framer CDN runtime: ${allowedExternal.length}`);
  allowedExternal.slice(0, 10).forEach((u) => console.log("  REMOTE:", u));
  console.log(`Tracking requests: ${trackingHits.length}`);
  trackingHits.slice(0, 10).forEach((u) => console.log("  TRACK:", u));
  console.log(`Console errors: ${consoleErrors.length}`);
  consoleErrors.slice(0, 10).forEach((e) => console.log("  ERR:", e.slice(0, 200)));

  await browser.close();

  const ok =
    rootLen > 1000 &&
    hasInviteText &&
    local404.length === 0 &&
    allowedExternal.length === 0 &&
    trackingHits.length === 0 &&
    consoleErrors.length === 0;

  console.log(ok ? "\n✓ Browser audit PASSED" : "\n✗ Browser audit FAILED");
  process.exit(ok ? 0 : 1);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
