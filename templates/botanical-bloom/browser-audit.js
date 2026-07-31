#!/usr/bin/env node
const { chromium } = require("playwright");

const URL = "http://127.0.0.1:8788/templates/botanical-bloom/index.html?preview=1";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const failed = [];
  const wooow = [];
  const tracking = [];
  const consoleErrors = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  page.on("response", (res) => {
    const u = res.url();
    if (res.status() === 404) failed.push(u);
    if (u.includes("wooowinvites.com")) wooow.push(u);
    if (/facebook|googletagmanager|google-analytics|flock|ipify|capi-automation/i.test(u)) {
      tracking.push(u);
    }
  });

  await page.goto(URL, { waitUntil: "networkidle", timeout: 120000 });
  await page.waitForTimeout(5000);

  const hasJeff = (await page.locator("text=Jeff").count()) > 0;
  const hasMaria = (await page.locator("text=Maria").count()) > 0;

  console.log("Invite text:", hasJeff && hasMaria ? "OK" : "MISSING");
  console.log("404 count:", failed.length);
  failed.slice(0, 15).forEach((u) => console.log("  404:", u));
  console.log("Wooow remote:", wooow.length);
  wooow.slice(0, 10).forEach((u) => console.log("  REMOTE:", u));
  console.log("Tracking:", tracking.length);
  tracking.forEach((u) => console.log("  TRACK:", u));
  console.log("Console errors:", consoleErrors.length);
  consoleErrors.slice(0, 10).forEach((e) => console.log("  ERR:", e.slice(0, 200)));

  await browser.close();
  process.exit(failed.length || tracking.length || !hasJeff ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
