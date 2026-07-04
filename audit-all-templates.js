#!/usr/bin/env node
/**
 * Browser audit for all 9 template URLs at http://127.0.0.1:5500/templates/{name}/
 */
const { chromium } = require("./templates/balcony-seaview/node_modules/playwright");

const BASE = "http://127.0.0.1:5500";
const TEMPLATES = [
  {
    slug: "Mountains",
    url: `${BASE}/templates/Mountains/`,
    titleIncludes: "Mountain",
    notTitleIncludes: "Greg",
    textMarkers: ["Vishu", "Kavya", "WEDS", "INVITE"],
    wrongMarkers: ["Greg", "Lisa", "Josephine", "Calendra"],
  },
  {
    slug: "balcony-seaview",
    url: `${BASE}/templates/balcony-seaview/`,
    titleIncludes: "Josephine",
    notTitleIncludes: "Mountain",
    textMarkers: ["Josephine", "Calendra", "Seaview"],
    wrongMarkers: ["Vishu", "Kavya", "Greg & Lisa"],
  },
  {
    slug: "curtains",
    url: `${BASE}/templates/curtains/`,
    titleIncludes: "Greg",
    notTitleIncludes: "Mountain",
    textMarkers: ["Greg", "Lisa", "Curtains"],
    wrongMarkers: ["Vishu", "Kavya", "Josephine"],
  },
  {
    slug: "laavan",
    url: `${BASE}/templates/laavan/`,
    titleIncludes: "Harpreet",
    notTitleIncludes: "Mountain",
    textMarkers: ["Harpreet", "Ritika", "INVITES"],
    wrongMarkers: ["Vishu", "Kavya"],
  },
  {
    slug: "maison-doree",
    url: `${BASE}/templates/maison-doree/`,
    titleIncludes: "Maison",
    notTitleIncludes: "Mountain",
    textMarkers: ["Diana", "Richard", "Maison"],
    wrongMarkers: ["Vishu", "Kavya"],
  },
  {
    slug: "mewar-midnight",
    url: `${BASE}/templates/mewar-midnight/`,
    titleIncludes: "Mewar",
    notTitleIncludes: "Mountain",
    textMarkers: ["Tanya", "Rohan", "Mewar"],
    wrongMarkers: ["Vishu", "Kavya"],
  },
  {
    slug: "niqah",
    url: `${BASE}/templates/niqah/`,
    titleIncludes: "Fardeen",
    notTitleIncludes: "Mountain",
    textMarkers: ["Fardeen", "Zarin", "Nikah"],
    wrongMarkers: ["Vishu", "Kavya"],
  },
  {
    slug: "oud-blossom-majlis",
    url: `${BASE}/templates/oud-blossom-majlis/`,
    titleIncludes: "Oud Blossom",
    notTitleIncludes: "Mountain",
    textMarkers: ["Oud", "Majlis"],
    wrongMarkers: ["Vishu", "Kavya"],
  },
  {
    slug: "rajkamal-palace",
    url: `${BASE}/templates/rajkamal-palace/`,
    titleIncludes: "Rajkamal",
    notTitleIncludes: "Mountain",
    textMarkers: ["Tanya", "Rohan", "Rajkamal", "Palace"],
    wrongMarkers: ["Vishu", "Kavya"],
  },
];

async function waitForServer() {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`${BASE}/`);
      if (res.ok) return;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`Server not ready at ${BASE}. Start: python3 -m http.server 5500`);
}

async function auditTemplate(browser, tpl) {
  const page = await browser.newPage();
  const failed404 = [];
  const consoleErrors = [];
  let brokenImages = 0;

  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("response", (res) => {
    const u = res.url();
    if (res.status() === 404 && u.startsWith(BASE)) failed404.push(u);
  });

  await page.goto(tpl.url, { waitUntil: "domcontentloaded", timeout: 120000 });
  await page.waitForTimeout(tpl.slug.includes("maison") || tpl.slug.includes("curtains") || tpl.slug.includes("balcony") ? 10000 : 6000);

  const title = await page.title();
  const bodyText = await page.evaluate(() => document.body?.innerText?.slice(0, 4000) || "");

  const imgs = await page.locator("img").evaluateAll((nodes) =>
    nodes.map((img) => ({
      src: img.currentSrc || img.src,
      ok: img.complete && img.naturalWidth > 0,
    }))
  );
  brokenImages = imgs.filter((i) => i.src && !i.ok).length;

  const firstVisible = await page.evaluate(() => {
    const walk = (el) => {
      if (!el) return "";
      for (const node of el.childNodes) {
        if (node.nodeType === 3) {
          const t = node.textContent.trim();
          if (t.length > 2) return t.slice(0, 120);
        }
        if (node.nodeType === 1) {
          const style = window.getComputedStyle(node);
          if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") continue;
          const t = walk(node);
          if (t) return t;
        }
      }
      return "";
    };
    return walk(document.body);
  });

  const titleOk =
    title.includes(tpl.titleIncludes) &&
    (!tpl.notTitleIncludes || !title.includes(tpl.notTitleIncludes));
  const markerHit =
    tpl.textMarkers.some((m) => bodyText.includes(m)) || title.includes(tpl.titleIncludes);
  const wrongHit =
    tpl.slug !== "Mountains" &&
    (bodyText.includes("Vishu") && bodyText.includes("Kavya") ||
      (await page.evaluate(() =>
        document.documentElement.innerHTML.includes("searchIndex-jQn16Gz1ALw4")
      )));
  const ok = titleOk && !wrongHit && failed404.length === 0;

  await page.close();

  return {
    slug: tpl.slug,
    url: tpl.url,
    ok,
    title,
    firstVisible,
    brokenImages,
    failed404: failed404.length,
    failed404Urls: failed404.slice(0, 8),
    consoleErrors: consoleErrors.length,
    consoleErrorSamples: consoleErrors.slice(0, 5),
    markerHit,
    wrongHit,
    titleOk,
  };
}

async function main() {
  await waitForServer();
  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const tpl of TEMPLATES) {
    process.stdout.write(`Auditing ${tpl.slug}... `);
    try {
      const r = await auditTemplate(browser, tpl);
      results.push(r);
      console.log(r.ok ? "PASS" : "FAIL");
    } catch (e) {
      results.push({ slug: tpl.slug, url: tpl.url, ok: false, error: e.message });
      console.log("ERROR:", e.message);
    }
  }

  await browser.close();

  console.log("\n=== AUDIT REPORT ===\n");
  for (const r of results) {
    console.log(`--- ${r.slug} ---`);
    if (r.error) {
      console.log(`  ERROR: ${r.error}`);
      continue;
    }
    console.log(`  URL: ${r.url}`);
    console.log(`  Title: ${r.title}`);
    console.log(`  First visible: ${r.firstVisible || "(empty)"}`);
    console.log(`  Broken images: ${r.brokenImages}`);
    console.log(`  404 count: ${r.failed404}`);
    if (r.failed404Urls?.length) r.failed404Urls.forEach((u) => console.log(`    404: ${u}`));
    console.log(`  Console errors: ${r.consoleErrors}`);
    if (r.consoleErrorSamples?.length) r.consoleErrorSamples.forEach((e) => console.log(`    ERR: ${e.slice(0, 180)}`));
    console.log(`  Status: ${r.ok ? "PASS" : "FAIL"} (titleOk=${r.titleOk}, marker=${r.markerHit}, wrongMountain=${r.wrongHit})`);
    console.log("");
  }

  const allOk = results.every((r) => r.ok);
  console.log(allOk ? "✓ All 9 templates PASSED" : "✗ Some templates FAILED");
  process.exit(allOk ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
