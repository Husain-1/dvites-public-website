#!/usr/bin/env node
/** Capture image URLs loaded by live Wooow invite page */
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const https = require("https");

const OUT = path.join(__dirname, "assets/images");
const TARGET = "https://www.wooowinvites.com/invite/demo-95b457";

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { Referer: TARGET, "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => {
        fs.writeFileSync(dest, Buffer.concat(chunks));
        resolve(Buffer.concat(chunks).length);
      });
    }).on("error", reject);
  });
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

  const images = [];
  page.on("response", async (res) => {
    const url = res.url();
    const type = res.headers()["content-type"] || "";
    if (res.status() === 200 && /image|octet-stream|webp|png|jpeg|svg/i.test(type)) {
      images.push({ url, type, size: Number(res.headers()["content-length"] || 0) });
    }
  });

  console.log("Loading", TARGET);
  await page.goto(TARGET, { waitUntil: "domcontentloaded", timeout: 120000 });

  // Stub analytics/tracking noise
  await page.waitForTimeout(3000);

  async function openInvite() {
    const selectors = [
      "text=/tap to open/i",
      "text=/Tap to Open/i",
      "[class*='cursor-pointer']",
    ];
    for (const sel of selectors) {
      const loc = page.locator(sel);
      if ((await loc.count()) > 0) {
        try {
          await loc.first().click({ force: true, timeout: 2000 });
          await page.waitForTimeout(1500);
        } catch {
          /* continue */
        }
      }
    }
  }

  for (let i = 0; i < 6; i++) {
    await openInvite();
    const hasJeff = (await page.locator("text=/Jeff/i").count()) > 0;
    if (hasJeff) break;
    await page.waitForTimeout(2000);
  }

  await page.waitForTimeout(6000);

  const heroInfo = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll("img")].map((el) => ({
      src: el.currentSrc || el.src,
      alt: el.alt,
      w: el.naturalWidth,
      h: el.naturalHeight,
      rect: el.getBoundingClientRect(),
    }));
    const bgs = [];
    document.querySelectorAll("*").forEach((el) => {
      const bg = getComputedStyle(el).backgroundImage;
      if (bg && bg !== "none" && !bg.includes("gradient") && bg.includes("url")) {
        const rect = el.getBoundingClientRect();
        if (rect.height > 80 && rect.width > 80) {
          bgs.push({ bg, tag: el.tagName, className: String(el.className || "").slice(0, 120), rect: { w: rect.width, h: rect.height, y: rect.y } });
        }
      }
    });
    return { imgs, bgs, text: document.body.innerText.slice(0, 500) };
  });

  console.log("\n=== Hero DOM ===");
  console.log(JSON.stringify(heroInfo, null, 2).slice(0, 8000));

  console.log("\n=== Image responses ===");
  const uniq = new Map();
  images.forEach((i) => uniq.set(i.url, i));
  [...uniq.values()]
    .sort((a, b) => b.size - a.size)
    .forEach((i) => console.log(i.size, i.type, i.url));

  // Download largest botanical-looking images
  const candidates = [...uniq.values()]
    .filter((i) => /png|webp|jpeg|jpg/i.test(i.type) && i.size > 20000)
    .sort((a, b) => b.size - a.size);

  for (const [idx, c] of candidates.slice(0, 8).entries()) {
    const ext = c.url.includes(".webp") ? "webp" : c.url.includes(".png") ? "png" : "jpg";
    const name = `captured-${idx}-${path.basename(c.url.split("?")[0]).replace(/[^a-zA-Z0-9._-]/g, "-")}.${ext}`;
    try {
      const bytes = await download(c.url, path.join(OUT, name));
      console.log("saved", name, bytes);
    } catch (e) {
      console.log("fail", name, e.message);
    }
  }

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
