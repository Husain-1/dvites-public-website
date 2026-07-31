(function (global) {
  "use strict";

  var viewContentFired = false;
  var checkoutProcessing = false;
  var heroOrderEl = null;

  function $(id) {
    return document.getElementById(id);
  }

  function formatRupee(n) {
    return "₹" + Number(n).toLocaleString("en-IN");
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function getSlug() {
    var fromHtml = document.documentElement.getAttribute("data-template-slug");
    if (fromHtml) return fromHtml.trim().toLowerCase();
    var fromBody = document.body && document.body.getAttribute("data-template-slug");
    if (fromBody) return fromBody.trim().toLowerCase();
    var match = global.location.pathname.match(/\/(?:templates|wedding|save-the-date)\/([^/.]+)\.html$/i);
    return match ? match[1].toLowerCase() : "";
  }

  function getTemplate() {
    var slug = getSlug();
    if (global.DvitesWeddingTemplates) {
      var wedding = global.DvitesWeddingTemplates.getBySlug(slug);
      if (wedding) return wedding;
    }
    if (global.DvitesSaveTheDateTemplates) {
      return global.DvitesSaveTheDateTemplates.getBySlug(slug);
    }
    return null;
  }

  function getTemplateCatalogApi(tpl) {
    if (tpl && tpl.productType === "save-the-date" && global.DvitesSaveTheDateTemplates) {
      return global.DvitesSaveTheDateTemplates;
    }
    return global.DvitesWeddingTemplates || null;
  }

  function openFullPageDemo(tpl) {
    if (!global.DvitesFullDemo || typeof global.DvitesFullDemo.open !== "function") {
      return false;
    }
    return global.DvitesFullDemo.open({
      demoUrl: tpl.demoUrl,
      templateSlug: tpl.slug,
      templateName: tpl.name,
      amountPaise: tpl.amountPaise,
      productUrl: tpl.productUrl || global.location.pathname,
      exitUrl: global.location.href
    });
  }

  function isMobileDemoViewport() {
    return global.DvitesFullDemo && typeof global.DvitesFullDemo.isMobileViewport === "function"
      ? global.DvitesFullDemo.isMobileViewport()
      : global.matchMedia("(max-width: 767px)").matches;
  }

  function getLiveUrl(tpl) {
    var liveUrl = tpl.demoUrl;
    if (
      global.DvitesPhonePreview &&
      typeof global.DvitesPhonePreview.previewUrl === "function"
    ) {
      liveUrl = global.DvitesPhonePreview.previewUrl(liveUrl);
    }
    return liveUrl;
  }

  function renderPhoneMockup(previewUrl, title) {
    return (
      '<div class="tp-hero-phone-mock catalog-phone-preview">' +
        '<div class="catalog-phone-screen">' +
          '<img class="catalog-template-thumbnail tp-hero-thumbnail" src="' + escapeHtml(previewUrl) + '" alt="' + escapeHtml(title) + ' preview" width="390" height="844" decoding="async" fetchpriority="high" />' +
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
            '<iframe id="tp-hero-live-iframe" class="is-modal-demo" title="' + escapeHtml(title) + ' live demo" loading="lazy"></iframe>' +
          '</div>' +
        '</div>' +
        '<img class="catalog-phone-frame" src="/assets/save-the-date-phone-frame.png" alt="" aria-hidden="true" />' +
      '</div>'
    );
  }

  function setText(id, text) {
    var el = $(id);
    if (el) el.textContent = text || "";
  }

  function populateHeroFeatures(tpl) {
    var list = $("tp-hero-features");
    if (!list) return;
    var highlights = tpl.features.slice(0, 5);
    list.innerHTML = highlights.map(function (item) {
      return "<li>" + escapeHtml(item) + "</li>";
    }).join("");
  }

  function populateProof(tpl) {
    var grid = $("tp-proof-grid");
    if (!grid) return;
    grid.innerHTML = tpl.proofMoments.map(function (moment) {
      return (
        '<article class="tp-proof-card tp-proof-card--pointer">' +
          '<span class="tp-proof-icon" aria-hidden="true">' + escapeHtml(moment.icon || "✓") + '</span>' +
          '<h3 class="tp-proof-title">' + escapeHtml(moment.label) + '</h3>' +
          '<p class="tp-proof-desc">' + escapeHtml(moment.desc || "") + '</p>' +
        '</article>'
      );
    }).join("");
  }

  function populateFeatures(tpl) {
    var grid = $("tp-feature-grid");
    if (!grid) return;
    grid.innerHTML = tpl.features.map(function (feature) {
      return '<li class="tp-feature-item"><span aria-hidden="true">✓</span> ' + escapeHtml(feature) + "</li>";
    }).join("");
  }

  function populateLists(tpl) {
    var personalize = $("tp-personalize-list");
    var fixed = $("tp-fixed-list");
    if (personalize) {
      personalize.innerHTML = tpl.personalizable.map(function (item) {
        return "<li>" + escapeHtml(item) + "</li>";
      }).join("");
    }
    if (fixed) {
      fixed.innerHTML = tpl.fixedElements.map(function (item) {
        return "<li>" + escapeHtml(item) + "</li>";
      }).join("");
    }
  }

  function populateOrderMeta(tpl) {
    var meta = $("tp-order-meta");
    if (!meta) return;
    var items = [tpl.deliveryTime, tpl.hostingPeriod, "Secure Razorpay checkout"];
    meta.innerHTML = items.map(function (item) {
      return "<li>" + escapeHtml(item) + "</li>";
    }).join("");
  }

  function populateFaqs(tpl) {
    var list = $("tp-faq-list");
    if (!list) return;
    var faqs = [
      {
        q: "What can be personalised?",
        a: "We personalise couple names, wedding date, event information, venues, your photographs, music where supported, and text within the available sections of the " + tpl.name + " template."
      },
      {
        q: "Can the complete design be changed?",
        a: "No. This is a template-based service. The core layout, animations, typography and visual structure remain as shown in the live demo."
      },
      {
        q: "How quickly will I receive it?",
        a: tpl.deliveryTime + " after we receive complete wedding details and successful payment."
      },
      {
        q: "What happens after payment?",
        a: "You'll complete secure Razorpay checkout, then share your wedding details on WhatsApp. Our team begins personalisation immediately."
      },
      {
        q: "How long will the website remain active?",
        a: tpl.hostingPeriod + "."
      },
      {
        q: "Does it work on all phones?",
        a: "Yes. Your invitation is optimised for mobile, tablet and desktop browsers."
      },
      {
        q: "Can I preview the invitation before buying?",
        a: "Yes. Tap View Demo on the phone preview to explore the full template experience before ordering."
      },
      {
        q: "Do guests need an app?",
        a: "No. Guests open your invitation link in any modern browser."
      },
      {
        q: "Is this a printed invitation?",
        a: "No. Dvites creates a digital wedding website you can share instantly with unlimited guests."
      }
    ];
    list.innerHTML = faqs.map(function (item, index) {
      return (
        '<div class="faq-item">' +
          '<button class="faq-q" type="button" aria-expanded="false" id="tp-faq-q-' + index + '" aria-controls="tp-faq-a-' + index + '">' +
            '<span>' + escapeHtml(item.q) + '</span><span aria-hidden="true">+</span>' +
          '</button>' +
          '<div class="faq-a" id="tp-faq-a-' + index + '" role="region" aria-labelledby="tp-faq-q-' + index + '">' +
            '<div class="faq-a-inner">' + escapeHtml(item.a) + '</div>' +
          '</div>' +
        '</div>'
      );
    }).join("");
    list.querySelectorAll(".faq-q").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.closest(".faq-item");
        var open = item.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
  }

  function swatchLabel(name) {
    var word = String(name || "").trim().split(/\s+/)[0];
    return word || "Template";
  }

  function pickBrowseSwatches(currentSlug, limit, catalogApi) {
    var api = catalogApi || global.DvitesWeddingTemplates;
    if (!api || !api.list) return [];
    var list = api.list.filter(function (item) {
      return item.slug !== currentSlug;
    });
    for (var i = list.length - 1; i > 0; i -= 1) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = list[i];
      list[i] = list[j];
      list[j] = temp;
    }
    return list.slice(0, limit || 4);
  }

  function populateBrowseSwatches(tpl) {
    var root = $("tp-browse-swatches");
    if (!root) return;

    var catalogApi = getTemplateCatalogApi(tpl);
    var picks = pickBrowseSwatches(tpl.slug, 4, catalogApi);
    var isSaveTheDate = tpl.productType === "save-the-date";
    var browseHref = isSaveTheDate ? "/save-the-date.html" : "/templates.html";
    var browseText = isSaveTheDate ? "Browse more Save the Date designs" : "Browse more template";
    var swatchHtml = picks.map(function (item) {
      return (
        '<a class="tp-swatch" href="' + escapeHtml(item.productUrl) + '" data-swatch-slug="' + escapeHtml(item.slug) + '" title="' + escapeHtml(item.name) + '">' +
          '<span class="tp-swatch-frame">' +
            '<img src="' + escapeHtml(item.thumbnail || item.previewImage) + '" alt="" width="52" height="104" loading="lazy" decoding="async" />' +
          '</span>' +
          '<span class="tp-swatch-label">' + escapeHtml(swatchLabel(item.name)) + '</span>' +
        '</a>'
      );
    }).join("");

    var browseHtml =
      '<a class="tp-swatch tp-swatch--browse" href="' + escapeHtml(browseHref) + '" data-swatch-slug="browse-all" title="' + escapeHtml(browseText) + '">' +
        '<span class="tp-swatch-frame tp-swatch-frame--browse">' +
          '<span class="tp-swatch-browse-text">' + escapeHtml(browseText) + '</span>' +
        '</span>' +
        '<span class="tp-swatch-label tp-swatch-label--spacer" aria-hidden="true"></span>' +
      '</a>';

    root.innerHTML = '<div class="tp-swatch-row">' + swatchHtml + browseHtml + '</div>';

    root.querySelectorAll("[data-swatch-slug]").forEach(function (link) {
      link.addEventListener("click", function () {
        if (typeof global.dvitesTrack === "function") {
          global.dvitesTrack("template_swatch_click", {
            from_slug: tpl.slug,
            to_slug: link.getAttribute("data-swatch-slug") || "",
          });
        }
      });
    });
  }

  function populateRelated(tpl) {
    var grid = $("tp-related-grid");
    var catalogApi = getTemplateCatalogApi(tpl);
    if (!grid || !catalogApi) return;
    var related = catalogApi.getRelated(tpl.slug, 3);
    grid.innerHTML = related.map(function (item) {
      return (
        '<article class="tp-related-card">' +
          '<a href="' + escapeHtml(item.productUrl) + '" class="tp-related-link" data-related-slug="' + escapeHtml(item.slug) + '">' +
            '<div class="tp-related-thumb">' +
              '<img src="' + escapeHtml(item.previewImage) + '" alt="' + escapeHtml(item.name) + '" width="200" height="420" loading="lazy" decoding="async" />' +
            '</div>' +
            '<h3>' + escapeHtml(item.name) + '</h3>' +
            '<p>' + escapeHtml(item.category) + '</p>' +
            '<span class="tp-related-price">' + formatRupee(item.price) + '</span>' +
            '<span class="tp-related-cta">View Details →</span>' +
          '</a>' +
        '</article>'
      );
    }).join("");
    grid.querySelectorAll("[data-related-slug]").forEach(function (link) {
      link.addEventListener("click", function () {
        if (typeof global.dvitesTrack === "function") {
          global.dvitesTrack("related_template_click", {
            template_slug: link.getAttribute("data-related-slug") || "",
          });
        }
      });
    });
  }

  function bindCheckoutButtons(tpl) {
    var buttons = [$("tp-hero-buy"), $("tp-order-btn"), $("tp-sticky-order")];
    buttons.forEach(function (btn) {
      if (!btn || btn.dataset.tpCheckoutBound === "1") return;
      btn.dataset.tpCheckoutBound = "1";
      btn.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (btn.disabled) return;
        if (typeof global.dvitesTrack === "function") {
          global.dvitesTrack("template_order_click", {
            template_slug: tpl.slug,
            template_name: tpl.name,
          });
        }
        btn.disabled = true;
        btn.setAttribute("aria-busy", "true");
        if (!global.DvitesPayment || typeof global.DvitesPayment.startCheckout !== "function") {
          btn.disabled = false;
          btn.removeAttribute("aria-busy");
          return;
        }
        global.DvitesPayment.startCheckout({
          templateName: tpl.name,
          templateSlug: tpl.slug,
          amountPaise: tpl.amountPaise
        }).finally(function () {
          btn.disabled = false;
          btn.removeAttribute("aria-busy");
        });
      });
    });
  }

  function startCheckoutGuard(tpl) {
    document.addEventListener("click", function (event) {
      var btn = event.target.closest("#tp-order-btn, #tp-sticky-order");
      if (!btn || checkoutProcessing) return;
      checkoutProcessing = true;
      btn.disabled = true;
      btn.setAttribute("aria-busy", "true");
      var reset = function () {
        checkoutProcessing = false;
        btn.disabled = false;
        btn.removeAttribute("aria-busy");
      };
      if (!global.DvitesPayment || typeof global.DvitesPayment.startCheckout !== "function") {
        reset();
        return;
      }
      global.DvitesPayment.startCheckout({
        templateName: tpl.name,
        templateSlug: tpl.slug,
        amountPaise: tpl.amountPaise
      }).finally(reset);
      event.preventDefault();
      event.stopPropagation();
    }, true);
  }

  function trackViewContentOnce(tpl) {
    var key = "dvites_vc_" + tpl.slug;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch (e) {
      if (viewContentFired) return;
      viewContentFired = true;
    }
    if (typeof global.dvitesTrackViewContent === "function") {
      global.dvitesTrackViewContent(tpl.name, tpl.category, tpl.price, tpl.slug);
    }
    if (typeof global.dvitesTrack === "function") {
      global.dvitesTrack("template_product_view", {
        template_slug: tpl.slug,
        template_name: tpl.name,
      });
    }
  }

  function initHeroLivePreview(tpl) {
    var overlayBtn = $("tp-hero-demo-overlay");
    var stage = $("tp-hero-demo-stage");
    var thumb = document.querySelector(".tp-hero-thumbnail");
    var iframe = $("tp-hero-live-iframe");
    var iframeWrap = $("tp-hero-live-wrap");
    var loading = $("tp-hero-live-loading");
    var liveReady = false;

    if (!overlayBtn || !iframe) return;

    function loadHeroLivePreview() {
      if (liveReady) return;

      if (typeof global.dvitesTrack === "function") {
        global.dvitesTrack("template_demo_open", {
          template_slug: tpl.slug,
          template_name: tpl.name,
          surface: "hero_inline",
        });
      }
      if (typeof global.dvitesTrackViewDemo === "function") {
        global.dvitesTrackViewDemo(tpl.name);
      }

      overlayBtn.disabled = true;
      if (loading) loading.classList.remove("is-hidden");
      if (iframeWrap) iframeWrap.classList.remove("is-hidden");

      if (!iframe._dvitesPreviewBound && global.DvitesPhonePreview) {
        global.DvitesPhonePreview.setup(iframe, { mode: "modal", autoScroll: false, fitScale: true });
        iframe._dvitesPreviewBound = true;
      }

      iframe.addEventListener("load", function () {
        liveReady = true;
        if (stage) stage.classList.add("is-hidden");
        if (thumb) thumb.classList.add("is-hidden");
        if (loading) loading.classList.add("is-hidden");
      }, { once: true });

      iframe.title = tpl.name + " live demo";
      iframe.src = getLiveUrl(tpl);
    }

    overlayBtn.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      if (isMobileDemoViewport()) {
        openFullPageDemo(tpl);
        return;
      }
      loadHeroLivePreview();
    });
  }

  function initStickyBar(tpl) {
    var bar = $("tp-sticky-bar");
    heroOrderEl = $("tp-hero-buy");
    if (!bar || !heroOrderEl) return;

    var hasSeenHeroBuy = false;

    function setStickyVisible(show) {
      bar.hidden = !show;
      bar.setAttribute("aria-hidden", show ? "false" : "true");
      document.body.classList.toggle("tp-sticky-visible", show);
    }

    setStickyVisible(false);

    var observer = new IntersectionObserver(
      function (entries) {
        var entry = entries[0];
        if (entry.isIntersecting) {
          hasSeenHeroBuy = true;
          setStickyVisible(false);
          return;
        }
        if (!hasSeenHeroBuy) {
          setStickyVisible(false);
          return;
        }
        setStickyVisible(true);
      },
      { threshold: 0, rootMargin: "0px" }
    );
    observer.observe(heroOrderEl);
  }

  function showNotFound() {
    var notFound = $("tp-not-found");
    var content = $("tp-content");
    if (notFound) notFound.hidden = false;
    if (content) content.hidden = true;
    document.title = "Template not found — Dvites";
  }

  function populatePage(tpl) {
    var content = $("tp-content");
    var notFound = $("tp-not-found");
    if (content) content.hidden = false;
    if (notFound) notFound.hidden = true;

    setText("tp-breadcrumb-name", tpl.name);
    setText("tp-category", tpl.category);
    setText("tp-name", tpl.name);
    setText("tp-short-desc", tpl.shortDescription);
    setText("tp-old-price", formatRupee(tpl.oldPrice));
    setText("tp-price", formatRupee(tpl.price));
    setText("tp-save-badge", tpl.saveLabel);
    setText("tp-delivery", tpl.deliveryTime);
    setText("tp-order-name", tpl.name);
    setText("tp-order-price", formatRupee(tpl.price));
    setText("tp-sticky-name", tpl.name);
    setText("tp-sticky-price", formatRupee(tpl.price));

    var phone = $("tp-hero-phone");
    if (phone) {
      var hasLive = phone.querySelector("#tp-hero-live-iframe");
      var thumbEl = phone.querySelector(".tp-hero-thumbnail");
      if (!hasLive) {
        phone.innerHTML = renderPhoneMockup(tpl.heroImage, tpl.name);
      } else if (thumbEl) {
        thumbEl.src = tpl.heroImage;
        thumbEl.alt = tpl.name + " preview";
      }
    }

    var thumb = $("tp-order-thumb");
    if (thumb) {
      thumb.innerHTML = '<img src="' + escapeHtml(tpl.thumbnail) + '" alt="' + escapeHtml(tpl.name) + '" width="120" height="250" loading="lazy" decoding="async" />';
    }

    populateBrowseSwatches(tpl);
    populateHeroFeatures(tpl);
    populateProof(tpl);
    populateFeatures(tpl);
    populateLists(tpl);
    populateOrderMeta(tpl);
    populateFaqs(tpl);
    populateRelated(tpl);
    bindCheckoutButtons(tpl);
    initHeroLivePreview(tpl);
    initStickyBar(tpl);
    trackViewContentOnce(tpl);

    if (global.Dvites && typeof global.Dvites.initMobileNav === "function") {
      // site.js init already runs; ensure mobile nav on product pages
    }
  }

  function init() {
    var slug = getSlug();
    var tpl = getTemplate();
    if (!tpl) {
      if (global.DvitesWeddingTemplates && global.DvitesWeddingTemplates.isHiddenSlug(slug)) {
        global.location.replace("/templates.html");
        return;
      }
      showNotFound();
      return;
    }
    populatePage(tpl);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  global.DvitesTemplateProduct = { init: init, getTemplate: getTemplate };
})(window);
