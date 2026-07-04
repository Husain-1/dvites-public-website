#!/usr/bin/env node
const { chromium } = require("playwright");
const URL = "http://127.0.0.1:5500/templates/balcony-seaview/index.html";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const bad = [];
  page.on("requestfailed", (r) => bad.push({ url: r.url(), err: r.failure()?.errorText }));
  page.on("response", (res) => {
    if (res.status() >= 400) bad.push({ url: res.url(), err: "HTTP " + res.status() });
  });
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "log") console.log("CON:", m.type(), m.text().slice(0,300)); });
  await page.goto(URL, { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(8000);
  console.log("TITLE:", await page.title());
  console.log("PATH:", await page.evaluate(() => location.pathname));
  console.log("ROOT:", (await page.locator("#root").innerText().catch(() => "")).slice(0,500));
  console.log("FAILED:", bad.slice(0,20));
  await browser.close();
})();
