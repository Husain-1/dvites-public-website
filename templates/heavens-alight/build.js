#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const SOURCE = path.join(ROOT, "index-source.html");
const OUTPUT = path.join(ROOT, "index.html");
const SCRIPT_SRC = path.join(ROOT, "assets/js/script.js");
const CANONICAL = "https://www.dvites.com/templates/heavens-alight/";
const PAGE_TITLE = "Heavens Alight — Wedding Invitation Template";
const META_DESC = "Heavens Alight — a cinematic champagne-opening wedding invitation with hero video, 3D stationery reveal, and scroll-driven gallery.";

const ASSET_PREFIX = "https://assets.shaadipath.com/templates/template10/";

const PATH_MAP = [
  ["assets/intro/", "./assets/images/intro/"],
  ["assets/Hero/Intro_Video.mp4", "./assets/video/intro-video.mp4"],
  ["assets/Hero/hero_poster.webp", "./assets/images/hero/hero_poster.webp"],
  ["assets/Invite/", "./assets/images/invite/"],
  ["assets/Events/", "./assets/images/events/"],
  ["assets/Meet the couple/", "./assets/images/story/"],
  ["assets/Meet%20the%20couple/", "./assets/images/story/"],
  ["assets/gallery/Gallery_Bg.webp", "./assets/images/gallery/Gallery_Bg.webp"],
  ["assets/Gallery/Gallery_Bg.webp", "./assets/images/gallery/Gallery_Bg.webp"],
  ["assets/Demo/", "./assets/images/gallery/demo/"],
  ["assets/rsvp/end.mp4", "./assets/video/rsvp-video.mp4"],
  ["assets/rsvp/rsvp_poster.webp", "./assets/images/rsvp/rsvp_poster.webp"],
  ["assets/music/Demo_music.mp3", "./assets/audio/demo-music.mp3"],
  ["assets/TTK/", "./assets/images/misc/ttk/"],
];

function mapAssetPath(input) {
  if (!input) return input;
  var out = String(input);
  if (out.startsWith(ASSET_PREFIX)) {
    out = out.slice(ASSET_PREFIX.length);
  }
  out = decodeURIComponent(out);
  for (var i = 0; i < PATH_MAP.length; i += 1) {
    var from = PATH_MAP[i][0];
    var to = PATH_MAP[i][1];
    if (out === from.replace(/\/$/, "") || out.startsWith(from)) {
      return to + out.slice(from.length);
    }
  }
  if (out.startsWith("assets/")) {
    return "./" + out;
  }
  return input;
}

function rewriteUrls(text) {
  var out = text;
  out = out.split(ASSET_PREFIX).join("");
  out = out.replace(/https:\/\/assets\.shaadipath\.com\/templates\/template10\//g, "");
  PATH_MAP.forEach(function (pair) {
    var from = pair[0];
    var to = pair[1];
    out = out.split(from).join(to);
    out = out.split(encodeURI(from)).join(to);
  });
  out = out.replace(/src="assets\//g, 'src="./assets/');
  out = out.replace(/poster="assets\//g, 'poster="./assets/');
  return out;
}

function patchWeddingConfig(html) {
  var match = html.match(/<script type="application\/json" id="wedding-config">([\s\S]*?)<\/script>/);
  if (!match) return html;
  var cfg = JSON.parse(match[1]);
  if (cfg.events) {
    cfg.events.forEach(function (ev) {
      if (ev.icon) ev.icon = mapAssetPath(ev.icon);
    });
  }
  if (cfg.gallery && cfg.gallery.photos) {
    cfg.gallery.photos = cfg.gallery.photos.map(mapAssetPath);
  }
  if (cfg.calendarUrls) {
    cfg.calendarUrls.apple = "";
  }
  if (cfg.music && cfg.music.src) {
    cfg.music.src = mapAssetPath(cfg.music.src);
  }
  var json = JSON.stringify(cfg);
  return html.replace(match[0], '<script type="application/json" id="wedding-config">' + json + "</script>");
}

const BUY_BAR = `
    <div class="dvites-buy-bar" id="dvites-buy-bar">
      <div class="dvites-brand">
        <img src="/templates/heavens-alight/assets/images/misc/dvites-logo.png" alt="Dvites">
      </div>
      <span class="dvites-text">Personalize this invitation in minutes.</span>
      <a href="/wedding/heavens-alight" id="buyNowBtn">Buy Now</a>
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
html.dvites-embedded-preview .dvites-buy-bar{display:none!important}
html.dvites-embedded-preview body{padding-top:0!important;margin-top:0!important}
</style>`;

const EMBEDDED_PREVIEW_HEAD = `<script>
(function () {
  var p = new URLSearchParams(location.search);
  if (p.get("preview") === "1" || p.get("preview") === "true" || window.self !== window.top) {
    document.documentElement.classList.add("dvites-embedded-preview");
  }
})();
</script>`;

const DVITES_RUNTIME = `<script defer src="./assets/js/dvites-runtime.js"></script>`;

let html = fs.readFileSync(SOURCE, "utf8");

// Strip Cloudflare / tracking
html = html.replace(/<script[^>]*cloudflareinsights[^>]*>[\s\S]*?<\/script>\s*/gi, "");
html = html.replace(/<script defer src="https:\/\/static\.cloudflareinsights\.com[^"]*"[^>]*><\/script>\s*/gi, "");

// Remove ShaadiPath social meta
html = html.replace(/<meta property="og:[^"]*"[^>]*>\s*/gi, "");
html = html.replace(/<meta name="twitter:[^"]*"[^>]*>\s*/gi, "");

// Neutral meta
html = html.replace(/<title>[^<]*<\/title>/, "<title>" + PAGE_TITLE + "</title>");
if (!html.includes('name="description"')) {
  html = html.replace("<head>", '<head>\n  <meta name="description" content="' + META_DESC + '" />');
}

// Remove external base + fonts
html = html.replace(/<base href="[^"]*">\s*/i, "");
html = html.replace(/<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">\s*/i, "");
html = html.replace(/<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>\s*/i, "");
html = html.replace(/<link href="https:\/\/fonts\.googleapis\.com[^"]*" rel="stylesheet">\s*/i, "");

// Local stylesheet + fonts
html = html.replace(
  /<link rel="stylesheet" href="https:\/\/assets\.shaadipath\.com\/templates\/template10\/style\.css[^"]*">/,
  '<link rel="stylesheet" href="./assets/css/fonts.css">\n  <link rel="stylesheet" href="./assets/css/style.css">'
);

// Local script
html = html.replace(
  /<script src="https:\/\/assets\.shaadipath\.com\/templates\/template10\/script\.js[^"]*" defer><\/script>/,
  '<script src="./assets/js/script.js" defer></script>\n' + DVITES_RUNTIME
);

html = patchWeddingConfig(html);
html = rewriteUrls(html);

// Remove ShaadiPath footer credit
html = html.replace(
  /<p class="ft-credit">[\s\S]*?<\/p>/,
  '<p class="ft-credit">Crafted with love</p>'
);

// Neutralize placeholder WhatsApp / ShaadiPath calendar in static RSVP markup
html = html.replace(/href="https:\/\/wa\.me\/XXXXXXXXXXXX[^"]*"/g, 'href="#"');
html = html.replace(/href="https:\/\/shaadipath\.com\/api\/calendar[^"]*"/g, 'href="#"');

// Preloader: read couple names/date from wedding config
html = html.replace(
  /\(function\(\) \{\s*var bride = 'Catherine';\s*var groom = 'James';\s*var date  = '12 December 2026';/,
  "(function() {\n  var cfg = window.__WEDDING_CONFIG__ || {};\n  var couple = cfg.couple || {};\n  var bride = couple.bride || 'Catherine';\n  var groom = couple.groom || 'James';\n  var date = couple.date ? (function(d){var p=d.split('-');var months=['January','February','March','April','May','June','July','August','September','October','November','December'];return parseInt(p[2],10)+' '+months[parseInt(p[1],10)-1]+' '+p[0];})(couple.date) : '12 December 2026';"
);

// Remove parentsOrder script referencing wrong ids (keep template10 role swap)
html = html.replace(/<script>\s*document\.addEventListener\('DOMContentLoaded', function\(\) \{\s*var cfg = window\.__WEDDING_CONFIG__;\s*if \(!cfg[\s\S]*?invGroomParents[\s\S]*?\}\);\s*<\/script>/, "");

if (!html.includes("dvites-embedded-preview")) {
  html = html.replace("</head>", EMBEDDED_PREVIEW_HEAD + "\n</head>");
}

if (!html.includes("dvites-buy-bar")) {
  html = html.replace(/<body([^>]*)>/, "<body$1>" + BUY_BAR + "\n");
}

// Ensure charset/viewport early in head
if (!html.includes("charset")) {
  html = html.replace("<head>", '<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">');
}

fs.writeFileSync(OUTPUT, html);

// Patch script.js asset paths
let js = fs.readFileSync(SCRIPT_SRC, "utf8");
js = rewriteUrls(js);
fs.writeFileSync(SCRIPT_SRC, js);

console.log("Built", OUTPUT);
console.log("Patched", SCRIPT_SRC);
