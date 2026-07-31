#!/usr/bin/env node
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "assets/images");
const TARGET = "https://www.wooowinvites.com/invite/demo-95b457";

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

  const resources = [];
  page.on("response", (res) => {
    const url = res.url();
    if (res.status() === 200 && /png|webp|jpeg|jpg|supabase|assets\//i.test(url)) {
      resources.push(url);
    }
  });

  await page.goto(TARGET, { waitUntil: "networkidle", timeout: 120000 });
  await page.waitForTimeout(4000);

  for (let i = 0; i < 8; i++) {
    const tap = page.locator("text=/tap to open/i");
    if ((await tap.count()) > 0) await tap.first().click({ force: true });
    if ((await page.locator("text=/Jeff/i").count()) > 0) break;
    await page.waitForTimeout(1500);
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(2000);

  const hero = await page.evaluate(() => {
    const out = { bgs: [], imgs: [], text: document.body.innerText.slice(0, 300) };
    document.querySelectorAll("*").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top > 900 || r.height < 40) return;
      const bg = getComputedStyle(el).backgroundImage;
      if (bg && bg.includes("url(") && !bg.includes("svg+xml")) {
        out.bgs.push({ bg, y: r.top, h: r.height, w: r.width, cls: String(el.className).slice(0, 80) });
      }
      if (el.tagName === "IMG" && r.top < 900) {
        out.imgs.push({ src: el.currentSrc || el.src, y: r.top, h: r.height, w: r.width });
      }
    });
    return out;
  });

  console.log(JSON.stringify(hero, null, 2));
  console.log("\nUnique resources:");
  [...new Set(resources)].filter((u) => /background|share|178316|honey|garden|citron|floral|cluster|embroidery/i.test(u)).forEach((u) => console.log(u));

  await page.screenshot({ path: path.join(OUT, "hero-viewport-capture.png"), fullPage: false });
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
