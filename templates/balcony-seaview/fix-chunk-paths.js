#!/usr/bin/env node
/** Rewrite Vite chunk imports to absolute /assets/ paths for static hosting. */
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

function fixContent(content) {
  return content
    .replace(/from"\.\/([A-Za-z0-9_.-]+\.(?:js|mjs|css))"/g, 'from"/assets/$1"')
    .replace(/from'\.\/([A-Za-z0-9_.-]+\.(?:js|mjs|css))'/g, "from'/assets/$1'")
    .replace(/import\("\.\/([A-Za-z0-9_.-]+\.(?:js|mjs|css))"\)/g, 'import("/assets/$1")')
    .replace(/import\('\.\/([A-Za-z0-9_.-]+\.(?:js|mjs|css))'\)/g, "import('/assets/$1')")
    .replace(/"\.\/([A-Za-z0-9_.-]+\.(?:js|mjs|css))"/g, '"/assets/$1"');
}

let changed = 0;
for (const file of walk(assetsDir)) {
  const before = fs.readFileSync(file, "utf8");
  const after = fixContent(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed++;
  }
}

console.log(`Rewrote chunk paths in ${changed} files`);
