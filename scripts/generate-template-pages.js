#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DATA_FILE = path.join(ROOT, "assets", "wedding-templates-data.js");
const SHELL_FILE = path.join(__dirname, "product-page-shell.html");
const OUTPUT_DIR = path.join(ROOT, "templates");

function loadTemplates() {
  const source = fs.readFileSync(DATA_FILE, "utf8");
  const sandbox = { window: {}, global: {} };
  sandbox.global = sandbox.window;
  const fn = new Function("window", "global", source + "\n;return window.DvitesWeddingTemplates;");
  const api = fn(sandbox.window, sandbox.global);
  if (!api || !Array.isArray(api.list) || !api.list.length) {
    throw new Error("No wedding templates found in assets/wedding-templates-data.js");
  }
  return api.list;
}

function validateTemplate(tpl) {
  const required = [
    "id",
    "slug",
    "name",
    "category",
    "shortDescription",
    "price",
    "demoUrl",
    "previewImage",
    "seoTitle",
    "seoDescription",
    "canonicalUrl"
  ];
  const missing = required.filter(function (key) {
    return tpl[key] == null || tpl[key] === "";
  });
  if (missing.length) {
    throw new Error("Template \"" + tpl.slug + "\" missing required fields: " + missing.join(", "));
  }
}

function buildJsonLd(tpl) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: tpl.name,
        description: tpl.seoDescription,
        image: tpl.ogImage,
        brand: { "@type": "Brand", name: "Dvites" },
        offers: {
          "@type": "Offer",
          price: String(tpl.price),
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url: tpl.canonicalUrl
        }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.dvites.com/" },
          { "@type": "ListItem", position: 2, name: "Templates", item: "https://www.dvites.com/templates.html" },
          { "@type": "ListItem", position: 3, name: tpl.name, item: tpl.canonicalUrl }
        ]
      }
    ]
  });
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;");
}

function buildHeroMockupHtml(tpl) {
  var previewUrl = escapeHtml(tpl.heroImage);
  var title = escapeHtml(tpl.name);
  return (
    '<div class="tp-hero-phone-mock catalog-phone-preview">' +
      '<div class="catalog-phone-screen">' +
        '<img class="catalog-template-thumbnail tp-hero-thumbnail" src="' + previewUrl + '" alt="' + title + ' preview" width="390" height="844" decoding="async" fetchpriority="high" />' +
        '<div class="tp-hero-demo-overlay" id="tp-hero-demo-stage">' +
          '<button type="button" class="modal-live-preview-btn" id="tp-hero-demo-overlay">' +
            '<svg class="modal-live-preview-icon" aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
              '<path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>' +
            '</svg>' +
            '<span class="modal-live-preview-label">View Demo</span>' +
          '</button>' +
        '</div>' +
        '<p class="tp-hero-live-loading is-hidden" id="tp-hero-live-loading" aria-live="polite">Loading invitation…</p>' +
        '<div class="phone-iframe-scaler tp-hero-live-iframe is-hidden" id="tp-hero-live-wrap">' +
          '<iframe id="tp-hero-live-iframe" class="is-modal-demo" title="' + title + ' live demo" loading="lazy"></iframe>' +
        '</div>' +
      '</div>' +
      '<img class="catalog-phone-frame" src="/assets/save-the-date-phone-frame.png" alt="" aria-hidden="true" />' +
    '</div>'
  );
}

function renderPage(shell, tpl) {
  return shell
    .replace(/\{\{SLUG\}\}/g, tpl.slug)
    .replace(/\{\{NAME\}\}/g, tpl.name.replace(/&/g, "&amp;"))
    .replace(/\{\{CATEGORY\}\}/g, tpl.category.replace(/&/g, "&amp;"))
    .replace(/\{\{SEO_TITLE\}\}/g, tpl.seoTitle.replace(/"/g, "&quot;"))
    .replace(/\{\{SEO_DESCRIPTION\}\}/g, tpl.seoDescription.replace(/"/g, "&quot;"))
    .replace(/\{\{CANONICAL\}\}/g, tpl.canonicalUrl)
    .replace(/\{\{OG_IMAGE\}\}/g, tpl.ogImage)
    .replace(/\{\{HERO_IMAGE\}\}/g, tpl.heroImage)
    .replace(/\{\{HERO_MOCKUP\}\}/g, buildHeroMockupHtml(tpl))
    .replace(/\{\{JSON_LD\}\}/g, buildJsonLd(tpl));
}

function main() {
  const shell = fs.readFileSync(SHELL_FILE, "utf8");
  const templates = loadTemplates();
  const slugs = new Set();
  const written = [];

  templates.forEach(function (tpl) {
    validateTemplate(tpl);
    if (slugs.has(tpl.slug)) {
      throw new Error("Duplicate slug detected: " + tpl.slug);
    }
    slugs.add(tpl.slug);

    const html = renderPage(shell, tpl);
    const outPath = path.join(OUTPUT_DIR, tpl.slug + ".html");
    fs.writeFileSync(outPath, html, "utf8");
    written.push("/templates/" + tpl.slug + ".html");
  });

  console.log("Generated " + written.length + " wedding template product pages:");
  written.forEach(function (url) {
    console.log("  " + url);
  });
}

main();
