#!/usr/bin/env node
/**
 * Download ShaadiPath template10 assets for Heavens Alight (Dvites).
 * Run once: node mirror.js
 */
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const ROOT = __dirname;
const BASE = "https://assets.shaadipath.com/templates/template10/";

const ASSETS = [
  // Intro
  ["assets/intro/cv-champ-bg-entry-m.webp", "assets/images/intro/cv-champ-bg-entry-m.webp"],
  ["assets/intro/cv-champ-el-shadow-x.webp", "assets/images/intro/cv-champ-el-shadow-x.webp"],
  ["assets/intro/cv-champ-el-bottle-body-x.webp", "assets/images/intro/cv-champ-el-bottle-body-x.webp"],
  ["assets/intro/cv-champ-el-cork-x.webp", "assets/images/intro/cv-champ-el-cork-x.webp"],
  ["assets/intro/cv-champ-fx-neck-foam-x.webp", "assets/images/intro/cv-champ-fx-neck-foam-x.webp"],
  ["assets/intro/cv-champ-fx-mist-burst-x.webp", "assets/images/intro/cv-champ-fx-mist-burst-x.webp"],
  // Hero
  ["assets/Hero/Intro_Video.mp4", "assets/video/intro-video.mp4"],
  ["assets/Hero/hero_poster.webp", "assets/images/hero/hero_poster.webp"],
  // Invite
  ["assets/Invite/template10-invite-bg-m.webp", "assets/images/invite/template10-invite-bg-m.webp"],
  ["assets/Invite/dove.webp", "assets/images/invite/dove.webp"],
  ["assets/Invite/vellum_layer_1.webp", "assets/images/invite/vellum_layer_1.webp"],
  ["assets/Invite/vellum_layer_2.webp", "assets/images/invite/vellum_layer_2.webp"],
  ["assets/Invite/invite_inner_card.webp", "assets/images/invite/invite_inner_card.webp"],
  ["assets/Invite/invite_cover_front.webp", "assets/images/invite/invite_cover_front.webp"],
  ["assets/Invite/invite_cover_inside.webp", "assets/images/invite/invite_cover_inside.webp"],
  // Events
  ["assets/Events/Event_Card.webp", "assets/images/events/Event_Card.webp"],
  ["assets/Events/Cupid.webp", "assets/images/events/Cupid.webp"],
  ["assets/Events/Cupid_right.webp", "assets/images/events/Cupid_right.webp"],
  ["assets/Events/petal.webp", "assets/images/events/petal.webp"],
  ["assets/Events/Arrow.webp", "assets/images/events/Arrow.webp"],
  ["assets/Events/Welcome_Dinner.webp", "assets/images/events/Welcome_Dinner.webp"],
  ["assets/Events/Wedding_Ceremony.webp", "assets/images/events/Wedding_Ceremony.webp"],
  ["assets/Events/Reception.webp", "assets/images/events/Reception.webp"],
  ["assets/Events/After_Party.webp", "assets/images/events/After_Party.webp"],
  // Story
  ["assets/Meet the couple/Meet_the_couple_bg.webp", "assets/images/story/Meet_the_couple_bg.webp"],
  ["assets/Meet the couple/Paper.webp", "assets/images/story/Paper.webp"],
  ["assets/Meet the couple/bouquet.webp", "assets/images/story/bouquet.webp"],
  ["assets/Meet the couple/petal_1.webp", "assets/images/story/petal_1.webp"],
  ["assets/Meet the couple/petal_2.webp", "assets/images/story/petal_2.webp"],
  // Gallery
  ["assets/gallery/Gallery_Bg.webp", "assets/images/gallery/Gallery_Bg.webp"],
  ["assets/Demo/Demo_1.webp", "assets/images/gallery/demo/Demo_1.webp"],
  ["assets/Demo/Demo_2.webp", "assets/images/gallery/demo/Demo_2.webp"],
  ["assets/Demo/Demo_3.webp", "assets/images/gallery/demo/Demo_3.webp"],
  ["assets/Demo/Demo_4.webp", "assets/images/gallery/demo/Demo_4.webp"],
  // RSVP
  ["assets/rsvp/end.mp4", "assets/video/rsvp-video.mp4"],
  ["assets/rsvp/rsvp_poster.webp", "assets/images/rsvp/rsvp_poster.webp"],
  // Audio
  ["assets/music/Demo_music.mp3", "assets/audio/demo-music.mp3"],
  // Things to Know
  ["assets/TTK/Dress_Code.webp", "assets/images/misc/ttk/Dress_Code.webp"],
  ["assets/TTK/Venue.webp", "assets/images/misc/ttk/Venue.webp"],
  ["assets/TTK/Stay_options.webp", "assets/images/misc/ttk/Stay_options.webp"],
  ["assets/TTK/Gift_registry.webp", "assets/images/misc/ttk/Gift_registry.webp"],
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib
      .get(url, { headers: { "User-Agent": "DvitesMirror/1.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchUrl(res.headers.location).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error("HTTP " + res.statusCode + " for " + url));
          res.resume();
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      })
      .on("error", reject);
  });
}

async function downloadPair(remoteRel, localRel) {
  const url = BASE + remoteRel.split("/").map(encodeURIComponent).join("/").replace(/%2F/g, "/");
  // Fix encoding for paths with spaces - encode each segment only
  const segments = remoteRel.split("/");
  const properUrl = BASE + segments.map((s) => encodeURIComponent(s)).join("/");
  const dest = path.join(ROOT, localRel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
    console.log("skip", localRel);
    return { localRel, ok: true, skipped: true };
  }
  try {
    const buf = await fetchUrl(properUrl);
    fs.writeFileSync(dest, buf);
    console.log("ok  ", localRel, buf.length);
    return { localRel, ok: true, bytes: buf.length };
  } catch (err) {
    console.error("FAIL", properUrl, err.message);
    return { localRel, ok: false, error: err.message };
  }
}

async function main() {
  const results = [];
  for (const [remote, local] of ASSETS) {
    results.push(await downloadPair(remote, local));
  }
  const failed = results.filter((r) => !r.ok);
  console.log("\nDownloaded:", results.filter((r) => r.ok && !r.skipped).length);
  console.log("Skipped:", results.filter((r) => r.skipped).length);
  console.log("Failed:", failed.length);
  if (failed.length) process.exitCode = 1;
}

main();
