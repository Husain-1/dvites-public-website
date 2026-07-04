#!/usr/bin/env node
/** Fix media paths in JS chunks to use /assets/images/ absolute paths. */
const fs = require("fs");
const path = require("path");

const assetsDir = path.join(__dirname, "assets");

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (/\.(js|mjs|css)$/i.test(e.name)) out.push(p);
  }
  return out;
}

let changed = 0;
for (const file of walk(assetsDir)) {
  let content = fs.readFileSync(file, "utf8");
  const next = content
    .replace(/"\.\/images\//g, '"/assets/images/')
    .replace(/'\.\/images\//g, "'/assets/images/");
  if (next !== content) {
    fs.writeFileSync(file, next);
    changed++;
  }
}

console.log(`Fixed ./images/ paths in ${changed} files`);
