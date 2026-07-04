#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const SOURCE = path.join(ROOT, "index-source.html");
const OUTPUT = path.join(ROOT, "index.html");
const CANONICAL = "https://www.dvites.com/templates/mewar-midnight";
const PAGE_TITLE = "Mewar Midnight — Royal Indian Wedding Invitation Template";
const BRIDE = "Tanya";
const GROOM = "Rohan";
const TEMPLATE = "mewar-midnight";

const BUY_BAR = `
    <div class="dvites-buy-bar">
      <div class="dvites-brand">
        <img src="./assets/images/dvites-logo.png" alt="Dvites">
      </div>
      <span class="dvites-text">Personalize this invitation in minutes.</span>
      <a href="#" id="buyNowBtn">Buy Now</a>
    </div>
    <style id="dvites-buy-bar-styles">
.dvites-buy-bar{position:fixed;top:0;left:0;width:100%;height:68px;background:rgba(35,20,26,.88);backdrop-filter:blur(18px);display:flex;align-items:center;justify-content:space-between;padding:0 32px;z-index:9999999;border-bottom:1px solid rgba(255,255,255,.08)}
body{padding-top:68px!important}
.dvites-brand{display:flex;align-items:center}
.dvites-brand img{height:40px;width:auto;display:block}
.dvites-text{flex:1;text-align:center;color:#fff;font-size:16px;font-weight:500;font-family:Inter,sans-serif;padding:0 24px}
.dvites-buy-bar a{text-decoration:none;background:#EF6B96;color:#fff;padding:12px 28px;border-radius:999px;font-weight:700;transition:.25s;white-space:nowrap}
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

const DVITES_OVERRIDE = `
<script defer>
(function() {
  var PAGE_TITLE = ${JSON.stringify(PAGE_TITLE)};
  function fixDvitesBranding() {
    document.title = PAGE_TITLE;
    var cfg = window.__WEDDING_CONFIG__;
    if (!cfg || !cfg.couple || !cfg.couple.date) return;
    var couple = cfg.couple;
    var icsDate = couple.date.replace(/-/g, "");
    var endDate = new Date(couple.date);
    endDate.setDate(endDate.getDate() + 1);
    var icsEnd = endDate.toISOString().slice(0, 10).replace(/-/g, "");
    var icsBody = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Dvites//Wedding//EN",
      "BEGIN:VEVENT",
      "DTSTART;VALUE=DATE:" + icsDate,
      "DTEND;VALUE=DATE:" + icsEnd,
      "SUMMARY:" + couple.bride + " weds " + couple.groom,
      "LOCATION:" + (couple.venue || ""),
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\\r\\n");
    document.querySelectorAll('a[download="wedding.ics"], a[download]').forEach(function(link) {
      if (link.getAttribute("download") && link.href.indexOf("blob:") === 0) {
        if (link._dvitesBlobUrl) URL.revokeObjectURL(link._dvitesBlobUrl);
        link._dvitesBlobUrl = URL.createObjectURL(new Blob([icsBody], { type: "text/calendar;charset=utf-8" }));
        link.href = link._dvitesBlobUrl;
      }
    });
  }
  document.addEventListener("DOMContentLoaded", fixDvitesBranding);
  window.addEventListener("load", fixDvitesBranding);
})();
</script>`;

let html = fs.readFileSync(SOURCE, "utf8");

html = html.replace(
  /<script defer src="https:\/\/static\.cloudflareinsights\.com\/beacon\.min\.js[^"]*"[^>]*><\/script>\s*/gi,
  ""
);
html = html.replace(/<script[^>]*cloudflareinsights[^>]*>[\s\S]*?<\/script>\s*/gi, "");

html = html.replace(
  /<meta property="og:title" content="[^"]*" \/>/,
  `<meta property="og:title" content="${PAGE_TITLE}" />`
);
html = html.replace(
  /<meta property="og:description" content="[^"]*" \/>/,
  `<meta property="og:description" content="Preview the Mewar Midnight royal Indian wedding invitation template by Dvites." />`
);
html = html.replace(
  /<meta property="og:url" content="[^"]*" \/>/,
  `<meta property="og:url" content="${CANONICAL}" />`
);
html = html.replace(
  /<meta name="twitter:title" content="[^"]*" \/>/,
  `<meta name="twitter:title" content="${PAGE_TITLE}" />`
);
html = html.replace(
  /<meta name="twitter:description" content="[^"]*" \/>/,
  `<meta name="twitter:description" content="Preview the Mewar Midnight royal Indian wedding invitation template by Dvites." />`
);

html = html.replace(/PRODID:-\/\/ShaadiPath\/\/Wedding\/\/EN/g, "PRODID:-//Dvites//Wedding//EN");

html = html.replace(/<title[^>]*>[^<]*<\/title>/, `<title>${PAGE_TITLE}</title>`);

html = html.replace(/\bPriya\b/g, BRIDE);
html = html.replace(/\bArjun\b/g, GROOM);
html = html.replace(/#PriyaWedsArjun/g, "#TanyaWedsRohan");
html = html.replace(/P&amp;A/g, "T&amp;R");
html = html.replace(
  /Hi%20Priya%20%26%20Arjun!/g,
  "Hi%20Tanya%20%26%20Rohan!"
);

html = html.replace(/ShaadiPath Wedding Website Builder/g, "Dvites Wedding Website Builder");
html = html.replace(/<!-- Wedding config — generated by ShaadiPath Builder -->/g, "<!-- Wedding config — Dvites -->");
html = html.replace(/\/\/ Injected by ShaadiPath[^\n]*/g, "// Injected by Dvites — do not remove");
html = html.replace(/SHAADIPATH CONFIG LOADER/g, "DVITES CONFIG LOADER");
html = html.replace(/ShaadiPath T02:/g, "Dvites T02:");
html = html.replace(/ShaadiPath/g, "Dvites");
html = html.replace(/https:\/\/shaadipath\.com\/images\/og\/og-template02\.png/g, "./assets/images/layers/Herp%20Palace.webp");

html = html.replace(
  /<p class="ft-credit">Crafted with love on <a href="https:\/\/shaadipath\.com"[^>]*>Dvites<\/a><\/p>/,
  `<p class="ft-credit"><a href="https://www.dvites.com/" target="_blank" rel="noopener">Dvites</a></p>`
);

if (!html.includes("dvites-buy-bar")) {
  html = html.replace(/<body([^>]*)>/, `<body$1>${BUY_BAR}\n`);
}

if (!html.includes('rel="canonical"')) {
  html = html.replace(
    /<meta name="viewport"[^>]*>/,
    `$&\n<link rel="canonical" href="${CANONICAL}">`
  );
}

html = html.replace(
  /document\.title=couple\.bride\+' & '\+couple\.groom\+' · '\+dShort;/,
  "// document.title set by Dvites override"
);

if (!html.includes("fixDvitesBranding")) {
  html = html.replace(/<\/body>/, `${DVITES_OVERRIDE}\n</body>`);
}

fs.writeFileSync(OUTPUT, html);
console.log("Created:", OUTPUT);
