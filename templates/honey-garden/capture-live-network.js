#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { chromium } = require("../templates/balcony-seaview/node_modules/playwright");

const ROOT = __dirname;
const LIVE_URL = "https://www.wooowinvites.com/invite/templates/honey-garden";
const OUT = path.join(ROOT, "capture-live-network.json");

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

  const requests = new Map();

  page.on("response", async (res) => {
    const url = res.url();
    const status = res.status();
    if (status >= 400) return;
    let size = 0;
    try {
      const buf = await res.body();
      size = buf.length;
    } catch {
      /* opaque */
    }
    requests.set(url, { status, size, type: res.request().resourceType() });
  });

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      console.error("console:", msg.text().slice(0, 200));
    }
  });

  console.log("Loading", LIVE_URL);
  await page.goto(LIVE_URL, { waitUntil: "networkidle", timeout: 120000 });
  await page.waitForTimeout(3000);

  async function tryOpen() {
    const tap = page.locator("text=/tap to open|toca para abrir|scroll to rsvp/i");
    if ((await tap.count()) > 0) {
      await tap.first().click({ force: true }).catch(() => {});
      await page.waitForTimeout(1500);
    }
    await page.evaluate(() => {
      document.querySelectorAll("[class*='cursor-pointer']").forEach((el) => {
        const cls = String(el.className || "");
        if (cls.includes("inset-0") || cls.includes("items-center")) {
          el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        }
      });
    });
  }

  await tryOpen();
  await page.waitForTimeout(4000);

  for (let i = 0; i < 8; i += 1) {
    await page.mouse.wheel(0, 700);
    await page.waitForTimeout(600);
  }

  const musicBtn = page.locator("button[aria-label*='music' i], button[aria-label*='mute' i], button[aria-label*='sound' i]");
  if ((await musicBtn.count()) > 0) {
    await musicBtn.first().click({ force: true }).catch(() => {});
    await page.waitForTimeout(1500);
  }

  const langBtn = page.locator("button[aria-label*='language' i], [data-testid*='language' i], button:has-text('EN'), button:has-text('DE')");
  if ((await langBtn.count()) > 0) {
    await langBtn.first().click({ force: true }).catch(() => {});
    await page.waitForTimeout(1000);
  }

  const rsvp = page.locator("text=/rsvp|confirm attendance|will you attend/i");
  if ((await rsvp.count()) > 0) {
    await rsvp.first().click({ force: true }).catch(() => {});
    await page.waitForTimeout(2000);
  }

  await page.waitForTimeout(2000);

  const payload = {
    capturedAt: new Date().toISOString(),
    url: LIVE_URL,
    count: requests.size,
    requests: [...requests.entries()]
      .map(([url, meta]) => ({ url, ...meta }))
      .sort((a, b) => a.url.localeCompare(b.url)),
  };

  fs.writeFileSync(OUT, JSON.stringify(payload, null, 2));
  console.log(`Saved ${payload.count} requests to ${OUT}`);

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
