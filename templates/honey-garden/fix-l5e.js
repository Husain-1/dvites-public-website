#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = __dirname;
const BASE_PATH = "/templates/honey-garden";
const ASSET_PREFIX = `${BASE_PATH}/assets/`;
const L5E_DIR = path.join(ROOT, "assets", "images", "l5e");
const BASE_URL = "https://www.wooowinvites.com";

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "dvites-fix-l5e/1.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          fetchBuffer(new URL(res.headers.location, url).href).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          res.resume();
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      })
      .on("error", reject);
  });
}

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

function collectL5eUrls(content, set) {
  const re = /\/__l5e\/assets-v1\/[A-Za-z0-9-]+\/[A-Za-z0-9._-]+/g;
  let m;
  while ((m = re.exec(content)) !== null) set.add(m[0]);
}

async function downloadL5e(urlPath) {
  const fileName = path.basename(urlPath);
  const dest = path.join(L5E_DIR, fileName);
  const localUrl = `${ASSET_PREFIX}images/l5e/${fileName}`;
  if (!fs.existsSync(dest)) {
    process.stdout.write(`  dl l5e ${fileName}\n`);
    const buf = await fetchBuffer(`${BASE_URL}${urlPath}`);
    fs.writeFileSync(dest, buf);
  }
  return { from: urlPath, to: localUrl };
}

function patchContent(content, replacements) {
  let next = content;
  for (const [from, to] of [...replacements.entries()].sort((a, b) => b[0].length - a[0].length)) {
    next = next.split(from).join(to);
  }
  return next;
}

function fixInviteJson() {
  const invitePath = path.join(ROOT, "assets", "data", "invite.json");
  let json = fs.readFileSync(invitePath, "utf8");
  json = json.replace(/"\/assets\//g, `"${ASSET_PREFIX}`);
  fs.writeFileSync(invitePath, json);
  console.log("Fixed invite.json asset prefixes");
}

async function main() {
  fs.mkdirSync(L5E_DIR, { recursive: true });

  const urlSet = new Set();
  const scanFiles = walk(path.join(ROOT, "assets")).filter((f) =>
    /\.(js|css|json|html|mjs)$/i.test(f)
  );

  for (const file of scanFiles) {
    try {
      collectL5eUrls(fs.readFileSync(file, "utf8"), urlSet);
    } catch {
      /* skip */
    }
  }

  console.log(`Found ${urlSet.size} unique /__l5e/ asset references`);

  const replacements = new Map();
  for (const urlPath of urlSet) {
    try {
      const { from, to } = await downloadL5e(urlPath);
      replacements.set(from, to);
    } catch (err) {
      console.warn(`  skip ${urlPath}: ${err.message}`);
    }
  }

  let changed = 0;
  for (const file of scanFiles) {
    const content = fs.readFileSync(file, "utf8");
    const next = patchContent(content, replacements);
    if (next !== content) {
      fs.writeFileSync(file, next);
      changed++;
    }
  }
  console.log(`Patched ${changed} files with local l5e paths`);

  fixInviteJson();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
