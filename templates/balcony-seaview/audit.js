#!/usr/bin/env node
/**
 * Local asset audit: verify all referenced local assets exist on disk.
 */
const fs = require("fs");
const path = require("path");
const http = require("http");
const { spawn } = require("child_process");

const ROOT = __dirname;
const PORT = 8765;

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

function extractLocalRefs(content) {
  const refs = new Set();
  const patterns = [
    /\.\/assets\/[A-Za-z0-9_./-]+/g,
    /assets\/[A-Za-z0-9_./-]+\.(?:js|css|mjs|png|jpe?g|webp|svg|woff2?|mp3|mp4|json|ico)/g,
  ];
  for (const re of patterns) {
    for (const m of content.match(re) || []) {
      let ref = m.replace(/^\.\//, "");
      ref = ref.split("?")[0];
      refs.add(ref);
    }
  }
  return refs;
}

function fetch(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () =>
        resolve({ status: res.statusCode, body: Buffer.concat(chunks).toString("utf8") })
      );
    }).on("error", reject);
  });
}

async function main() {
  const files = walk(ROOT).filter((f) => /\.(html|js|css|mjs)$/i.test(f));
  const refs = new Set();
  for (const f of files) {
    for (const r of extractLocalRefs(fs.readFileSync(f, "utf8"))) refs.add(r);
  }

  const missing = [];
  for (const ref of refs) {
    const disk = path.join(ROOT, ref);
    if (!fs.existsSync(disk)) missing.push(ref);
  }

  console.log(`Local asset refs scanned: ${refs.size}`);
  console.log(`Missing on disk: ${missing.length}`);
  if (missing.length) {
    missing.slice(0, 30).forEach((m) => console.log("  MISSING:", m));
  }

  const server = spawn("npx", ["--yes", "serve", "-s", ".", "-l", String(PORT)], {
    cwd: ROOT,
    stdio: "pipe",
  });

  await new Promise((r) => setTimeout(r, 2500));

  const pathsToTest = [
    "/",
    "/invite/demo-4638f3",
    "/index.html",
    "/assets/index-Cfoc4NWM.js",
    "/assets/index-Skdm8sZv.css",
    "/assets/images/dvites-logo.png",
    "/assets/images/seaview-balcony-theme-X8-zUaoe.mp4",
    "/assets/seaview-balcony-theme-Bm6FapMU.js",
  ];

  const http404 = [];
  const wooowAsset404 = [];

  for (const p of pathsToTest) {
    const { status } = await fetch(`http://127.0.0.1:${PORT}${p}`);
    console.log(`HTTP ${status} ${p}`);
    if (status === 404) http404.push(p);
  }

  // Scan main bundle for wooowinvites asset URLs
  const js = fs.readFileSync(path.join(ROOT, "assets/index-Cfoc4NWM.js"), "utf8");
  const wooowAssets = js.match(/https:\/\/www\.wooowinvites\.com\/assets\/[^"'\`)\s]+/g) || [];
  console.log(`\nwooowinvites.com/assets refs in main bundle: ${wooowAssets.length}`);

  // Check seaview theme chunk paths
  const themeJs = fs.readFileSync(
    path.join(ROOT, "assets/seaview-balcony-theme-Bm6FapMU.js"),
    "utf8"
  );
  const mp4Refs = themeJs.match(/["'`][^"'`]*seaview-balcony[^"'`]*["'`]/g) || [];
  console.log("seaview theme media refs:", mp4Refs);

  for (const ref of mp4Refs) {
    const clean = ref.replace(/["'`]/g, "").replace(/^\.\//, "").replace(/^\//, "");
    const rel = clean.startsWith("assets/") ? clean : `assets/images/${path.basename(clean)}`;
    const disk = path.join(ROOT, rel);
    if (!fs.existsSync(disk)) {
      // try assets/ directly
      const alt = path.join(ROOT, "assets", path.basename(clean));
      console.log(`  media exists: ${fs.existsSync(alt) ? alt : "MISSING " + clean}`);
    } else {
      console.log(`  media exists: ${rel}`);
    }
  }

  server.kill();

  const ok = missing.length === 0 && http404.length === 0 && wooowAssets.length === 0;
  console.log(ok ? "\n✓ Audit PASSED" : "\n✗ Audit FAILED");
  process.exit(ok ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
