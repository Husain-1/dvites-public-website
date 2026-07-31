#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PREFIX = "/templates/honey-garden/assets";

const REPLACEMENTS = [
  ["../images/l5e/", `${PREFIX}/images/l5e/`],
  ["../images/", `${PREFIX}/images/`],
  ["../video/", `${PREFIX}/video/`],
  ["../audio/", `${PREFIX}/audio/`],
  ["../css/", `${PREFIX}/css/`],
  ["../js/", `${PREFIX}/js/`],
];

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

function patch(content) {
  let next = content;
  for (const [from, to] of REPLACEMENTS) {
    next = next.split(from).join(to);
  }
  return next;
}

const files = walk(path.join(ROOT, "assets")).filter((f) =>
  /\.(js|css|json|html)$/i.test(f)
);

let changed = 0;
let remaining = 0;

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  const next = patch(content);
  if (next !== content) {
    fs.writeFileSync(file, next);
    changed++;
  }
  const rel = next.match(/\.\.\/(images|video|audio|css|js)\//g);
  if (rel) remaining += rel.length;
}

console.log(`Patched ${changed} files`);
console.log(`Remaining relative asset refs: ${remaining}`);
