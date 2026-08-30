#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = path.join(__dirname, "assets/fonts");
const CSS_OUT = path.join(__dirname, "assets/css/fonts.css");

const FONTS = [
  ["https://fonts.gstatic.com/s/cormorantgaramond/v21/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_qE6GnM.ttf", "cormorant-300.ttf", "Cormorant Garamond", 300, "normal"],
  ["https://fonts.gstatic.com/s/cormorantgaramond/v21/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_v86GnM.ttf", "cormorant-400.ttf", "Cormorant Garamond", 400, "normal"],
  ["https://fonts.gstatic.com/s/cormorantgaramond/v21/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_s06GnM.ttf", "cormorant-500.ttf", "Cormorant Garamond", 500, "normal"],
  ["https://fonts.gstatic.com/s/cormorantgaramond/v21/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_iE9GnM.ttf", "cormorant-600.ttf", "Cormorant Garamond", 600, "normal"],
  ["https://fonts.gstatic.com/s/cormorantgaramond/v21/co3smX5slCNuHLi8bLeY9MK7whWMhyjYrGFEsdtdc62E6zd5rDDOjw.ttf", "cormorant-300-i.ttf", "Cormorant Garamond", 300, "italic"],
  ["https://fonts.gstatic.com/s/cormorantgaramond/v21/co3smX5slCNuHLi8bLeY9MK7whWMhyjYrGFEsdtdc62E6zd58jDOjw.ttf", "cormorant-400-i.ttf", "Cormorant Garamond", 400, "italic"],
  ["https://fonts.gstatic.com/s/cormorantgaramond/v21/co3smX5slCNuHLi8bLeY9MK7whWMhyjYrGFEsdtdc62E6zd5wDDOjw.ttf", "cormorant-500-i.ttf", "Cormorant Garamond", 500, "italic"],
  ["https://fonts.gstatic.com/s/cormorantgaramond/v21/co3smX5slCNuHLi8bLeY9MK7whWMhyjYrGFEsdtdc62E6zd5LDfOjw.ttf", "cormorant-600-i.ttf", "Cormorant Garamond", 600, "italic"],
  ["https://fonts.gstatic.com/s/jost/v20/92zPtBhPNqw79Ij1E865zBUv7mwjJQVG.ttf", "jost-200.ttf", "Jost", 200, "normal"],
  ["https://fonts.gstatic.com/s/jost/v20/92zPtBhPNqw79Ij1E865zBUv7mz9JQVG.ttf", "jost-300.ttf", "Jost", 300, "normal"],
  ["https://fonts.gstatic.com/s/jost/v20/92zPtBhPNqw79Ij1E865zBUv7myjJQVG.ttf", "jost-400.ttf", "Jost", 400, "normal"],
  ["https://fonts.gstatic.com/s/jost/v20/92zPtBhPNqw79Ij1E865zBcv7myjJQVG.ttf", "jost-600.ttf", "Jost", 600, "normal"],
];

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fetch(res.headers.location).then(resolve).catch(reject);
        return;
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
    }).on("error", reject);
  });
}

async function main() {
  fs.mkdirSync(ROOT, { recursive: true });
  const rules = [];
  for (const [url, file, family, weight, style] of FONTS) {
    const dest = path.join(ROOT, file);
    if (!fs.existsSync(dest)) {
      const buf = await fetch(url);
      fs.writeFileSync(dest, buf);
      console.log("font", file);
    }
    rules.push(
      "@font-face{font-family:'" + family + "';font-style:" + style + ";font-weight:" + weight + ";font-display:swap;src:url('../fonts/" + file + "') format('truetype');}"
    );
  }
  fs.writeFileSync(CSS_OUT, rules.join("\n") + "\n");
  console.log("wrote", CSS_OUT);
}

main().catch((e) => { console.error(e); process.exit(1); });
