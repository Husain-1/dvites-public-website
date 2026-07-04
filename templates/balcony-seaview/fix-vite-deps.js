#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const ASSETS = path.join(__dirname, "assets");

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

let changed = 0;
for (const file of walk(ASSETS)) {
  if (!/\.(js|mjs)$/i.test(file)) continue;
  let content = fs.readFileSync(file, "utf8");
  const next = content.replace(
    /"\/templates\/balcony-seaview\/assets\//g,
    '"templates/balcony-seaview/assets/'
  );
  if (next !== content) {
    fs.writeFileSync(file, next);
    changed++;
  }
}
console.log(`Fixed mapDeps paths in ${changed} files`);
