#!/usr/bin/env node
const { chromium } = require("playwright");

const URL = process.argv[2] || "http://127.0.0.1:8788/templates/botanical-bloom/index.html?preview=1";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

  const failed = [];
  page.on("response", (res) => {
    if (res.status() === 404) failed.push(res.url());
  });

  await page.goto(URL, { waitUntil: "networkidle", timeout: 120000 });
  await page.waitForTimeout(8000);

  const state = await page.evaluate(() => ({
    text: document.body.innerText.slice(0, 400),
    hasJeff: document.body.innerText.includes("Jeff"),
    hasVideo: !!document.querySelector("video"),
    videoSrc: document.querySelector("video")?.currentSrc || document.querySelector("video")?.src || null,
    buyBarVisible: !!document.querySelector(".dvites-buy-bar:not([hidden])"),
    bodyPadding: getComputedStyle(document.body).paddingTop,
  }));

  console.log(JSON.stringify(state, null, 2));
  console.log("404s:", failed.filter((u) => /botanical-bloom|honey-bees|embroidery|citron|l5e/i.test(u)).slice(0, 20));

  await page.screenshot({ path: "assets/images/local-viewport-test.png" });
  await browser.close();

  if (!state.hasJeff || failed.some((u) => /honey-bees|embroidery-beige/i.test(u))) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
