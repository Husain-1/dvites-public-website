#!/usr/bin/env node
/** Ensure static asset URL strings use absolute paths from site root. */
const fs = require("fs");
const path = require("path");

const ASSETS = path.join(__dirname, "assets");
const PREFIX = "/templates/balcony-seaview/assets/";

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

function fixFile(content) {
  return content
    .replace(/"templates\/balcony-seaview\/assets\//g, `"${PREFIX}`)
    .replace(/'templates\/balcony-seaview\/assets\//g, `'${PREFIX}`)
    .replace(/url\(templates\/balcony-seaview\/assets\//g, `url(${PREFIX}`);
}

let changed = 0;
for (const file of walk(ASSETS)) {
  if (!/\.(js|css|mjs)$/i.test(file)) continue;
  const before = fs.readFileSync(file, "utf8");
  const after = fixFile(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed++;
  }
}
console.log(`Fixed static asset URLs in ${changed} files`);
