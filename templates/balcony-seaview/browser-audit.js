#!/usr/bin/env node
const { chromium } = require("playwright");

const URL =
  "http://127.0.0.1:5500/templates/balcony-seaview/index.html";
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
    if (
      /facebook|googletagmanager|google-analytics|flock|__l5e|ipify|capi-automation/i.test(
        u
      )
    ) {
      tracking.push(u);
    }
  });

  console.log("Loading:", URL);
  await page.goto(URL, { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(4000);

  const advanceOpening = async () => {
    await page.evaluate(() => {
      const overlay = [...document.querySelectorAll("[data-invitation-phone-frame] div")].find(
        (node) => node.style.zIndex === "50" || node.style.zIndex === 50
      );
      if (overlay) overlay.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
  };

  if ((await page.locator("text=Josephine").count()) === 0) {
    await advanceOpening();
    await page.waitForTimeout(8000);
  }

  const tapOpen = page.locator("text=/tap to open/i");
  if ((await tapOpen.count()) > 0) {
    await tapOpen.first().click({ force: true });
    await page.waitForTimeout(4000);
  }

  if ((await page.locator("text=Josephine").count()) === 0) {
    await advanceOpening();
    await page.waitForTimeout(4000);
  }

  const rootLen = (await page.locator("#root").innerHTML().catch(() => "")).length;
  const hasInviteText =
    (await page.locator("text=Josephine").count()) > 0 ||
    (await page.locator("text=Calendra").count()) > 0 ||
    (await page.locator("text=/you.?re invited/i").count()) > 0 ||
    (await page.locator("text=/wedding/i").count()) > 0;

  const local404 = failed.filter((u) => u.startsWith("http://127.0.0.1"));
  const wooowAssets = wooow.filter(
    (u) => u.includes("/assets/") || u.includes("/audio/") || u.includes("/favicon")
  );

  console.log(`\n#root content length: ${rootLen}`);
  console.log(`Invite content visible: ${hasInviteText}`);
  console.log(`Local 404s: ${local404.length}`);
  local404.slice(0, 15).forEach((u) => console.log("  404:", u));
  console.log(`wooowinvites asset requests: ${wooowAssets.length}`);
  wooowAssets.slice(0, 10).forEach((u) => console.log("  REMOTE:", u));
  console.log(`Tracking requests: ${tracking.length}`);
  console.log(`Console errors: ${consoleErrors.length}`);
  consoleErrors.slice(0, 10).forEach((e) => console.log("  ERR:", e.slice(0, 200)));

  await browser.close();

  const ok =
    rootLen > 500 &&
    hasInviteText &&
    local404.length === 0 &&
    wooowAssets.length === 0 &&
    tracking.length === 0;

  console.log(ok ? "\n✓ Browser audit PASSED" : "\n✗ Browser audit FAILED");
  process.exit(ok ? 0 : 1);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
