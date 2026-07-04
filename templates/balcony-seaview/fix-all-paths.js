#!/usr/bin/env node
/** Only normalize __vite__mapDeps entries (YS() prepends "/"). */
const fs = require("fs");
const path = require("path");

const ASSETS = path.join(__dirname, "assets");
const DEP_PREFIX = "templates/balcony-seaview/assets/";

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

function fixMapDeps(content) {
  return content.replace(
    /(__vite__mapDeps[\s\S]*?m\.f=\[)([\s\S]*?)(\]\))/g,
    (_, start, body, end) => {
      const fixedBody = body.replace(
        /"\/templates\/balcony-seaview\/assets\//g,
        `"${DEP_PREFIX}`
      );
      return start + fixedBody + end;
    }
  );
}

let changed = 0;
for (const file of walk(ASSETS)) {
  if (!/\.(js|mjs)$/i.test(file)) continue;
  const before = fs.readFileSync(file, "utf8");
  const after = fixMapDeps(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed++;
  }
}
console.log(`Fixed mapDeps in ${changed} files`);
