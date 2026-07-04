#!/usr/bin/env node
const { chromium } = require("playwright");

const URL = "http://127.0.0.1:5500/templates/maison-doree/index.html";
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
    if (u.includes("thedigitalyes.com")) remote.push(u);
    if (u.includes("supabase.co")) remote.push(u);
    if (
      /facebook|googletagmanager|google-analytics|flock|__l5e|ipify|stripe\.com|capi-automation/i.test(
        u
      )
    ) {
      tracking.push(u);
    }
  });

  console.log("Loading:", URL);
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForTimeout(10000);

  const rootLen = (await page.locator("#root").innerHTML().catch(() => "")).length;
  const hasInviteText =
    (await page.locator("text=Diana").count()) > 0 ||
    (await page.locator("text=Richard").count()) > 0 ||
    (await page.locator("text=/getting married/i").count()) > 0 ||
    (await page.locator("text=/Peninsula/i").count()) > 0;

  const local404 = failed.filter((u) => u.startsWith("http://127.0.0.1"));
  const remoteRuntime = remote.filter(
    (u) =>
      u.includes("thedigitalyes.com/assets/") ||
      u.includes("tdy-excellence-template") ||
      u.includes("supabase.co")
  );
  const trackingHits = tracking.filter(
    (u) => !u.includes("typekit.net") && !u.includes("fonts.googleapis.com") && !u.includes("fonts.gstatic.com")
  );

  console.log(`\n#root content length: ${rootLen}`);
  console.log(`Invite content visible: ${hasInviteText}`);
  console.log(`Local 404s: ${local404.length}`);
  local404.slice(0, 15).forEach((u) => console.log("  404:", u));
  console.log(`thedigitalyes/supabase runtime: ${remoteRuntime.length}`);
  remoteRuntime.slice(0, 10).forEach((u) => console.log("  REMOTE:", u));
  console.log(`Tracking requests: ${trackingHits.length}`);
  trackingHits.slice(0, 10).forEach((u) => console.log("  TRACK:", u));
  console.log(`Console errors: ${consoleErrors.length}`);
  consoleErrors.slice(0, 10).forEach((e) => console.log("  ERR:", e.slice(0, 200)));

  await browser.close();

  const ok =
    rootLen > 500 &&
    hasInviteText &&
    local404.length === 0 &&
    remoteRuntime.length === 0 &&
    trackingHits.length === 0;

  console.log(ok ? "\n✓ Browser audit PASSED" : "\n✗ Browser audit FAILED");
  process.exit(ok ? 0 : 1);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
