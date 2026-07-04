#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const SOURCE = path.join(ROOT, "index-source.html");
const OUTPUT = path.join(ROOT, "index.html");
const CANONICAL = "https://www.dvites.com/templates/rajkamal-palace";
const PAGE_TITLE = "Rajkamal Palace — Royal Indian Wedding Invitation Template";
const BRIDE = "Tanya";
const GROOM = "Rohan";

const BUY_BAR = `
    <div class="dvites-buy-bar">
      <div class="dvites-brand">
        <img src="/templates/rajkamal-palace/assets/images/dvites-logo.png" alt="Dvites">
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

let html = fs.readFileSync(SOURCE, "utf8");

// Remove Cloudflare analytics / marketing pixels
html = html.replace(
  /<script defer src="https:\/\/static\.cloudflareinsights\.com\/beacon\.min\.js[^"]*"[^>]*><\/script>\s*/gi,
  ""
);
html = html.replace(/<script[^>]*cloudflareinsights[^>]*>[\s\S]*?<\/script>\s*/gi, "");

// Meta rebrand
html = html.replace(
  /<meta property="og:title" content="[^"]*" \/>/,
  `<meta property="og:title" content="${PAGE_TITLE}" />`
);
html = html.replace(
  /<meta property="og:description" content="[^"]*" \/>/,
  `<meta property="og:description" content="Preview the Rajkamal Palace royal Indian wedding invitation template by Dvites." />`
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
  `<meta name="twitter:description" content="Preview the Rajkamal Palace royal Indian wedding invitation template by Dvites." />`
);

// Calendar PRODID in wedding-config JSON
html = html.replace(/PRODID:-\/\/ShaadiPath\/\/Wedding\/\/EN/g, "PRODID:-//Dvites//Wedding//EN");
html = html.replace(/ShaadiPath/g, "Dvites");
html = html.replace(
  /https:\/\/shaadipath\.com\/images\/og\/og-template09\.png/g,
  "https://pub-1cc0f6e993214be9a36badeeb631f4b6.r2.dev/templates/template09/assets/Demo/hero-arch_demo.webp"
);
html = html.replace(/https:\/\/shaadipath\.com[^\s"']*/g, "https://www.dvites.com/");

// Page title
html = html.replace(/<title>[^<]*<\/title>/, `<title>${PAGE_TITLE}</title>`);

// Demo couple names in static markup
html = html.replace(/\bAarav\b/g, BRIDE === "Tanya" ? "Tanya" : BRIDE);
html = html.replace(/\bMeera\b/g, GROOM === "Rohan" ? "Rohan" : GROOM);
html = html.replace(/aarav-meera-wedding\.ics/g, "tanya-rohan-wedding.ics");
html = html.replace(
  /Yes%2C%20I%27ll%20be%20there%20%E2%80%94%20Aarav%20%26%20Meera%27s/g,
  "Yes%2C%20I%27ll%20be%20there%20%E2%80%94%20Tanya%20%26%20Rohan%27s"
);
html = html.replace(
  /Yes, I'll be there — Aarav & Meera's/g,
  "Yes, I'll be there — Tanya & Rohan's"
);

// Fix intro names order: user HTML had Aarav/Meera - after replace should be Tanya/Rohan
// Story paragraph couple reference
html = html.replace(
  /A monsoon evening in Udaipur[^<]*later, Tanya &amp; Rohan are ready/,
  (m) => m.replace("Aarav &amp; Meera", "Tanya &amp; Rohan")
);

// Remove ShaadiPath footer credit entirely
html = html.replace(
  /<footer class="footer"[^>]*>[\s\S]*?<\/footer>\s*/,
  `<footer class="footer" style="text-align:center;padding:28px 16px 36px;background:#0a0908;color:rgba(216,169,87,.72);font-family:inherit;letter-spacing:.08em;font-size:.78rem;">
  <p style="margin:0;"><a href="https://www.dvites.com/" target="_blank" rel="noopener" style="color:#d8a957;text-decoration:none;border-bottom:1px solid rgba(216,169,87,.4);">Dvites</a></p>
</footer>\n\n`
);

// Add buy bar after body open
if (!html.includes("dvites-buy-bar")) {
  html = html.replace(/<body([^>]*)>/, `<body$1>${BUY_BAR}\n`);
}

const DVITES_OVERRIDE = `
<script defer>
(function() {
  var PAGE_TITLE = ${JSON.stringify(PAGE_TITLE)};
  function fixDvitesBranding() {
    document.title = PAGE_TITLE;
    var cfg = window.__WEDDING_CONFIG__;
    var icalBtn = document.getElementById("rsvpIcalBtn");
    if (!cfg || !cfg.couple || !cfg.couple.date || !icalBtn) return;
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
    var blob = new Blob([icsBody], { type: "text/calendar;charset=utf-8" });
    if (icalBtn._dvitesBlobUrl) URL.revokeObjectURL(icalBtn._dvitesBlobUrl);
    icalBtn._dvitesBlobUrl = URL.createObjectURL(blob);
    icalBtn.href = icalBtn._dvitesBlobUrl;
  }
  document.addEventListener("DOMContentLoaded", fixDvitesBranding);
  window.addEventListener("load", fixDvitesBranding);
})();
</script>`;

if (!html.includes("fixDvitesBranding")) {
  html = html.replace(
    /<script src="https:\/\/pub-1cc0f6e993214be9a36badeeb631f4b6\.r2\.dev\/templates\/template09\/script\.js[^"]*" defer><\/script>/,
    `$&${DVITES_OVERRIDE}`
  );
}

// Add canonical link if missing
if (!html.includes('rel="canonical"')) {
  html = html.replace(
    /<meta name="viewport"[^>]*>/,
    `$&\n  <link rel="canonical" href="${CANONICAL}">`
  );
}

fs.writeFileSync(OUTPUT, html);
console.log("Created:", OUTPUT);
