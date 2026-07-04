#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const SOURCE = path.join(ROOT, "index-source.html");
const OUTPUT = path.join(ROOT, "index.html");
const CANONICAL = "https://www.dvites.com/templates/oud-blossom-majlis";
const PAGE_TITLE = "Oud Blossom Majlis — Dvites Wedding Invitation Template";

const BUY_BAR = `
    <div class="dvites-buy-bar">
      <div class="dvites-brand">
        <img src="./assets/images/dvites-logo.png" alt="Dvites">
      </div>
      <span class="dvites-text">Personalize this invitation in minutes.</span>
      <a href="#" id="buyNowBtn">Buy Now</a>
    </div>
    <style id="dvites-buy-bar-styles">
.dvites-buy-bar{position:fixed;top:0;left:0;right:0;width:100%;max-width:100vw;box-sizing:border-box;height:68px;background:rgba(35,20,26,.88);backdrop-filter:blur(18px);display:flex;align-items:center;justify-content:space-between;padding:0 32px;z-index:9999999;border-bottom:1px solid rgba(255,255,255,.08)}
.dvites-buy-bar,.dvites-buy-bar *{box-sizing:border-box}
body{padding-top:68px!important}
.dvites-brand{display:flex;align-items:center;flex-shrink:0}
.dvites-brand img{height:40px;width:auto;display:block}
.dvites-text{flex:1;min-width:0;text-align:center;color:#fff;font-size:16px;font-weight:500;font-family:Inter,sans-serif;padding:0 24px}
.dvites-buy-bar a{text-decoration:none;background:#EF6B96;color:#fff;padding:12px 28px;border-radius:999px;font-weight:700;transition:.25s;white-space:nowrap;flex-shrink:0}
.dvites-buy-bar a:hover{transform:translateY(-2px);background:#F57EA5}
@media(max-width:768px){
  .dvites-buy-bar{padding:10px 16px;height:auto;flex-wrap:wrap;justify-content:center;gap:10px}
  body{padding-top:100px!important}
  .dvites-brand{width:100%;justify-content:center}
  .dvites-brand img{height:34px}
  .dvites-text{width:100%;text-align:center;font-size:14px;padding:0}
  .dvites-buy-bar a{width:100%;text-align:center}
}
</style>`;

const TITLE_OVERRIDE = `
<script defer>
(function() {
  var PAGE_TITLE = ${JSON.stringify(PAGE_TITLE)};
  function setTitle() { document.title = PAGE_TITLE; }
  document.addEventListener("DOMContentLoaded", setTitle);
  window.addEventListener("load", setTitle);
})();
</script>`;

let html = fs.readFileSync(SOURCE, "utf8");

html = html.replace(
  /<script[^>]*cloudflareinsights[^>]*>[\s\S]*?<\/script>\s*/gi,
  ""
);
html = html.replace(
  /<script defer src="https:\/\/static\.cloudflareinsights\.com\/beacon\.min\.js[^"]*"[^>]*><\/script>\s*/gi,
  ""
);

html = html.replace(
  /window\.tildastatcookie='no';setTimeout\(function\(\)\{\(function\(d,w,k,o,g\)\s*\{[\s\S]*?tilda-stat-1\.0\.min\.js[\s\S]*?\},2000\);/g,
  ""
);

html = html.replace(/<title[^>]*>[^<]*<\/title>/, `<title>${PAGE_TITLE}</title>`);

html = html.replace(
  /<meta property="og:url" content="[^"]*" \/>/,
  `<meta property="og:url" content="${CANONICAL}" />`
);
html = html.replace(
  /<meta property="og:title" content="[^"]*" \/>/,
  `<meta property="og:title" content="${PAGE_TITLE}" />`
);
html = html.replace(
  /<meta property="og:description" content="[^"]*" \/>/,
  `<meta property="og:description" content="Preview the Oud Blossom Majlis wedding invitation template by Dvites." />`
);
html = html.replace(/<meta property="og:image" content="[^"]*" \/>/g, "");

html = html.replace(
  /<link rel="canonical" href="[^"]*">/,
  `<link rel="canonical" href="${CANONICAL}">`
);

html = html.replace(
  /<link rel="shortcut icon"[^>]*>/g,
  `<link rel="shortcut icon" href="./assets/images/dvites-logo.png" type="image/png">`
);
html = html.replace(/<link rel="icon"[^>]*tildafavicon[^>]*>/g, "");
html = html.replace(/<link rel="apple-touch-icon"[^>]*tildafavicon[^>]*>/g, "");

html = html.replace(/https:\/\/webgency\.tilda\.ws\/[^\s"'<>]*/g, CANONICAL);
html = html.replace(/webgency\.tilda\.ws/g, "www.dvites.com");
html = html.replace(/Blossom &amp; Oud/g, "Oud Blossom Majlis");
html = html.replace(/Blossom & Oud/g, "Oud Blossom Majlis");

if (!html.includes("dvites-buy-bar")) {
  html = html.replace(/<body([^>]*)>/, `<body$1>${BUY_BAR}\n`);
}

if (!html.includes("PAGE_TITLE")) {
  html = html.replace(/<\/body>/, `${TITLE_OVERRIDE}\n</body>`);
}

fs.writeFileSync(OUTPUT, html);
console.log("Created:", OUTPUT);
