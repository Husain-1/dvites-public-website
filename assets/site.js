(function (global) {
  "use strict";

  var EMAIL = "infodvites@gmail.com";
  var PRICE = 799;
  var OLD_PRICE = 1332;
  var SAVE_THE_DATE_PRICE = 999;
  var SAVE_THE_DATE_OLD_PRICE = 1999;
  var PARTNER_MIN = 3;
  var PARTNER_MAX = 5;
  var PARTNER_DISCOUNT = 0.05;

  var DESERT_SAND_CATALOG = {
    id: "desert-sand",
    url: "/templates/desert-sand/",
    title: "Desert Sand",
    category: "Hindu Save the Date",
    tags: ["hinduism", "minimal"],
    preview: "/templates/desert-sand/assets/images/poster.webp",
    description: "A warm, elegant Save the Date design inspired by desert tones and timeless minimalism.",
    featured: false,
    price: SAVE_THE_DATE_PRICE,
    oldPrice: SAVE_THE_DATE_OLD_PRICE,
    saveLabel: "Save 50%"
  };

  function buildWeddingCatalogTemplates() {
    if (global.DvitesWeddingTemplates && global.DvitesWeddingTemplates.list) {
      return global.DvitesWeddingTemplates.list.map(function (tpl) {
        return global.DvitesWeddingTemplates.toCatalogRecord(tpl);
      });
    }
    return [];
  }

  function buildSaveTheDateCatalogRecords() {
    return getSaveTheDateTemplatesList();
  }

  function buildPartnerCatalogTemplates() {
    var wedding = buildWeddingCatalogTemplates();
    var saveTheDate = buildSaveTheDateCatalogRecords();
    var seen = {};
    var combined = [];

    wedding.concat(saveTheDate).forEach(function (tpl) {
      if (!tpl || !tpl.id || seen[tpl.id]) return;
      seen[tpl.id] = true;
      combined.push({
        id: tpl.id,
        url: tpl.url,
        title: tpl.title,
        category: tpl.category,
        tags: tpl.tags || [],
        preview: tpl.preview,
        description: tpl.description,
        price: tpl.price != null ? tpl.price : PRICE,
        oldPrice: tpl.oldPrice,
        saveLabel: tpl.saveLabel
      });
    });

    return combined;
  }

  function templateUnitPrice(tpl) {
    if (tpl && tpl.productType === "save-the-date") {
      return getStdPricing().price;
    }
    return getWeddingPricing().price;
  }

  function getSaveTheDateTemplatesList() {
    if (global.DvitesSaveTheDateTemplates && global.DvitesSaveTheDateTemplates.list) {
      return global.DvitesSaveTheDateTemplates.list.map(function (tpl) {
        return global.DvitesSaveTheDateTemplates.toCatalogRecord(tpl);
      });
    }
    return SAVE_THE_DATE_TEMPLATES.map(function (tpl) {
      return {
        id: tpl.id,
        url: tpl.url,
        title: tpl.title,
        category: tpl.category || "Save the Date",
        tags: tpl.tags || [],
        preview: getSaveTheDateThumbnail(tpl),
        description: tpl.description,
        featured: false,
        price: SAVE_THE_DATE_PRICE,
        oldPrice: SAVE_THE_DATE_OLD_PRICE,
        saveLabel: "Save 50%",
        thumbnailFile: tpl.thumbnailFile
      };
    });
  }

  function buildDesertSandCatalogEntry() {
    if (global.DvitesSaveTheDateTemplates) {
      var tpl = global.DvitesSaveTheDateTemplates.getBySlug("desert-sand");
      if (tpl) return global.DvitesSaveTheDateTemplates.toCatalogRecord(tpl);
    }
    return DESERT_SAND_CATALOG;
  }

  var TEMPLATES = buildWeddingCatalogTemplates().concat([buildDesertSandCatalogEntry()]);

  var SAVE_THE_DATE_TEMPLATES = [
    {
      id: "desert-sand",
      url: "/templates/desert-sand/",
      title: "Desert Sand",
      category: "Save the Date",
      tags: ["hinduism", "minimal"],
      thumbnailFile: "dessert sand thumbnail.webp",
      description: "A warm, elegant Save the Date design inspired by desert tones and timeless minimalism."
    },
    {
      id: "blossom-touch",
      url: "/templates/blossom-touch/",
      title: "Blossom Touch",
      category: "Save the Date",
      thumbnailFile: "blossom touch thumbnail.webp",
      description: "A soft floral Save the Date invitation with romantic details and graceful motion."
    },
    {
      id: "enchanted-mirror",
      url: "/templates/enchanted-mirror/",
      title: "Enchanted Mirror",
      category: "Save the Date",
      thumbnailFile: "enchanted mirror template.webp",
      description: "A dreamy mirror-inspired invitation with a luxurious and magical reveal."
    },
    {
      id: "moonlit-lotus",
      url: "/templates/moonlit-lotus/",
      title: "Moonlit Lotus",
      category: "Save the Date",
      thumbnailFile: "moonlit lotus thumbnail.webp",
      description: "A refined lotus-themed design with calm night tones and elegant movement."
    },
    {
      id: "royal-radiance",
      url: "/templates/royal-radiance/",
      title: "Royal Radiance",
      category: "Save the Date",
      thumbnailFile: "royal radiance thumbnail'.webp",
      description: "A grand chandelier-inspired Save the Date invitation with rich royal styling."
    }
  ];

  var STD_THUMBNAILS_DIR = "/save-the-date-thumbnails/";

  function stdThumbnailUrl(filename) {
    if (!filename) return "";
    return STD_THUMBNAILS_DIR + encodeURIComponent(filename);
  }

  function getSaveTheDateThumbnail(tpl) {
    return stdThumbnailUrl(tpl && tpl.thumbnailFile);
  }

  function formatPrice(n) {
    if (global.DvitesMarket && typeof global.DvitesMarket.formatPrice === "function") {
      return global.DvitesMarket.formatPrice(n);
    }
    return "₹" + Number(n).toLocaleString("en-IN");
  }

  function getWeddingPricing() {
    if (global.DvitesMarket && typeof global.DvitesMarket.getPricing === "function") {
      return global.DvitesMarket.getPricing("wedding");
    }
    return { price: PRICE, oldPrice: OLD_PRICE };
  }

  function getStdPricing() {
    if (global.DvitesMarket && typeof global.DvitesMarket.getPricing === "function") {
      return global.DvitesMarket.getPricing("save-the-date");
    }
    return { price: SAVE_THE_DATE_PRICE, oldPrice: SAVE_THE_DATE_OLD_PRICE };
  }

  function mailto(subject, body) {
    return "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  function enquiryMail(title) {
    return mailto(
      "Enquiry — " + title + " Wedding Invitation",
      "Hi Dvites,\n\nI'm interested in the " + title + " wedding invitation template.\n\nPlease share next steps.\n\nThank you."
    );
  }

  function buyMail(title) {
    return mailto(
      "Buy Now — " + title + " Wedding Invitation",
      "Hi Dvites,\n\nI'd like to purchase the " + title + " template (" + formatPrice(getWeddingPricing().price) + ").\n\nPlease confirm availability and payment details.\n\nThank you."
    );
  }

  function renderCatalogPhoneMockup(previewUrl, title, extraClass) {
    var thumbClass = "catalog-template-thumbnail" + (extraClass ? " " + extraClass : "");
    return (
      '<div class="catalog-phone-preview">' +
        '<div class="catalog-phone-screen">' +
          '<img class="' + thumbClass + '" src="' + previewUrl + '" alt="' + (title || "Template") + ' preview" loading="lazy" decoding="async">' +
        '</div>' +
        '<img class="catalog-phone-frame" src="/assets/save-the-date-phone-frame.png" alt="" aria-hidden="true">' +
      '</div>'
    );
  }

  function isDemoTemplateUrl(url) {
    return typeof url === "string" && /^\/templates\/[^/?#]+\/$/.test(url);
  }

  function resolveProductPageUrl(source) {
    var slug = "";
    var candidate = "";

    if (source && source.getAttribute) {
      candidate = source.getAttribute("data-product-url") || source.getAttribute("href") || "";
      slug = source.getAttribute("data-id") || "";
    } else if (typeof source === "string") {
      slug = source.trim();
    } else if (source && source.id) {
      slug = source.id;
      candidate = source.productUrl || "";
    }

    if (candidate && candidate.indexOf(".html") !== -1 && !isDemoTemplateUrl(candidate)) {
      return candidate;
    }

    if (slug && global.DvitesWeddingTemplates && global.DvitesWeddingTemplates.getBySlug(slug)) {
      return global.DvitesWeddingTemplates.productUrl(slug);
    }

    if (slug && global.DvitesSaveTheDateTemplates && global.DvitesSaveTheDateTemplates.getBySlug(slug)) {
      return global.DvitesSaveTheDateTemplates.productUrl(slug);
    }

    return "";
  }

  function getProductPageUrl(tpl) {
    return resolveProductPageUrl(tpl);
  }

  function bindProductNavigation(root) {
    var scope = root || document;

    scope.querySelectorAll(".btn-view-details, .tpl-name-link").forEach(function (link) {
      if (link.dataset.productNavBound === "1") return;
      link.dataset.productNavBound = "1";
      link.addEventListener("click", function (event) {
        event.stopPropagation();
      });
    });
  }

  function renderCard(tpl) {
    var pricing = getWeddingPricing();
    var price = pricing.price;
    var oldPrice = pricing.oldPrice;
    var saveLabel = tpl.saveLabel || "Save 40%";
    var productUrl = getProductPageUrl(tpl);
    var isWeddingProduct = !!productUrl;
    var detailsHref = productUrl || "#";
    var detailsAttrs = isWeddingProduct
      ? ' href="' + detailsHref + '"'
      : ' href="#" data-std-card="1"';
    return (
      '<article class="tpl-card card" data-id="' + tpl.id + '" data-product-type="wedding" data-demo-url="' + tpl.url + '" data-preview="' + tpl.preview + '" data-title="' + tpl.title + '" data-category="' + tpl.category + '" data-tags="' + tpl.tags.join(" ") + '" data-description="' + tpl.description.replace(/"/g, "&quot;") + '"' + (productUrl ? ' data-product-url="' + productUrl + '"' : '') + '>' +
        '<div class="tpl-card-inner">' +
          '<div class="tpl-preview-wrap">' +
            renderCatalogPhoneMockup(tpl.preview, tpl.title, "catalog-thumb--" + tpl.id) +
          '</div>' +
          '<div class="tpl-body">' +
            (productUrl
              ? '<h3 class="tpl-name"><a class="tpl-name-link" href="' + productUrl + '">' + tpl.title + '</a></h3>'
              : '<h3 class="tpl-name">' + tpl.title + '</h3>') +
            '<p class="tpl-category">' + tpl.category + '</p>' +
            '<div class="tpl-pricing">' +
              '<span class="old-price">' + formatPrice(oldPrice) + '</span>' +
              '<span class="tpl-price-now">' +
                '<span class="current-price">' + formatPrice(price) + '</span>' +
                '<span class="save-badge">' + saveLabel + '</span>' +
              '</span>' +
            '</div>' +
            '<div class="tpl-actions card-actions' + (isWeddingProduct ? ' card-actions--single' : '') + '">' +
              (isWeddingProduct
                ? '<a class="btn btn-primary btn-view-details"' + detailsAttrs + '>View Details</a>'
                : '<button type="button" class="btn btn-primary btn-customize">Customize</button>' +
                  '<button type="button" class="btn btn-ghost btn-watch demo-btn">Watch Demo</button>') +
            '</div>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function renderSaveTheDateCard(tpl) {
    var thumbUrl = tpl.preview || getSaveTheDateThumbnail(tpl);
    var pricing = getStdPricing();
    var price = pricing.price;
    var oldPrice = pricing.oldPrice;
    var saveLabel = tpl.saveLabel || "Save 50%";
    var productUrl = getProductPageUrl(tpl);
    var isProductPage = !!productUrl;
    var detailsHref = productUrl || "#";
    var tags = (tpl.tags || []).join(" ");
    return (
      '<article class="tpl-card card std-card" data-id="' + tpl.id + '" data-product-type="save-the-date" data-demo-url="' + tpl.url + '" data-preview="' + thumbUrl + '" data-title="' + tpl.title + '" data-category="' + tpl.category + '" data-tags="' + tags + '" data-description="' + tpl.description.replace(/"/g, "&quot;") + '"' + (productUrl ? ' data-product-url="' + productUrl + '"' : '') + '>' +
        '<div class="tpl-card-inner">' +
          '<div class="tpl-preview-wrap">' +
            renderCatalogPhoneMockup(thumbUrl, tpl.title, "catalog-thumb--" + tpl.id) +
          '</div>' +
          '<div class="tpl-body">' +
            (productUrl
              ? '<h3 class="tpl-name"><a class="tpl-name-link" href="' + productUrl + '">' + tpl.title + '</a></h3>'
              : '<h3 class="tpl-name">' + tpl.title + '</h3>') +
            '<p class="tpl-category">' + tpl.description + '</p>' +
            '<div class="tpl-pricing">' +
              '<span class="old-price">' + formatPrice(oldPrice) + '</span>' +
              '<span class="tpl-price-now">' +
                '<span class="current-price">' + formatPrice(price) + '</span>' +
                '<span class="save-badge">' + saveLabel + '</span>' +
              '</span>' +
            '</div>' +
            '<div class="tpl-actions card-actions' + (isProductPage ? ' card-actions--single' : '') + '">' +
              (isProductPage
                ? '<a class="btn btn-primary btn-view-details" href="' + detailsHref + '">View Details</a>'
                : '<button type="button" class="btn btn-primary btn-customize">Customize</button>' +
                  '<button type="button" class="btn btn-ghost btn-watch demo-btn">Watch Demo</button>') +
            '</div>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function renderCatalog(container, filterFeatured) {
    if (!container) return;
    var list = filterFeatured
      ? TEMPLATES.filter(function (t) { return t.featured; }).slice(0, 6)
      : TEMPLATES;
    container.innerHTML = list.map(renderCard).join("");
    equalizeCardHeights(container);
    bindProductNavigation(container);
  }

  function renderSaveTheDateCatalog(container) {
    if (!container) return;
    container.innerHTML = getSaveTheDateTemplatesList().map(renderSaveTheDateCard).join("");
    equalizeCardHeights(container);
    bindProductNavigation(container);
  }

  function equalizeCardHeights(container) {
    if (!container || global.innerWidth < 640) return;
    var showcaseIds = ["featured-catalog", "full-catalog", "std-catalog", "thank-you-catalog"];
    if (showcaseIds.indexOf(container.id) !== -1) return;
    requestAnimationFrame(function () {
      var cards = container.querySelectorAll(".tpl-card:not(.is-hidden)");
      cards.forEach(function (card) { card.style.minHeight = ""; });
      var max = 0;
      cards.forEach(function (card) {
        max = Math.max(max, card.offsetHeight);
      });
      if (max > 0) {
        cards.forEach(function (card) {
          card.style.minHeight = max + "px";
        });
      }
    });
  }

  function initHeroScroll() {
    var iframe = document.getElementById("hero-iframe");
    if (!iframe || !global.DvitesPhonePreview) return;
    global.DvitesPhonePreview.setup(iframe, { mode: "preview", autoScroll: true });
  }

  function initHeroMarquees() {
    var hero = document.querySelector(".page-home .hero-v2");
    if (!hero) return;

    var tracks = hero.querySelectorAll(".hero-v2-marquee-track");
    if (!tracks.length) return;

    tracks.forEach(function (track) {
      track.querySelectorAll('.hero-v2-marquee-set[data-cloned="true"]').forEach(function (el) {
        el.remove();
      });

      var template = track.querySelector(".hero-v2-marquee-set:not([data-cloned])");
      if (!template) return;

      if (track.querySelectorAll(".hero-v2-marquee-set").length < 2) {
        var firstClone = template.cloneNode(true);
        firstClone.setAttribute("aria-hidden", "true");
        firstClone.setAttribute("data-cloned", "true");
        track.appendChild(firstClone);
      }

      var setWidth = template.getBoundingClientRect().width;
      var minTrackWidth = global.innerWidth * 2.5;

      while (track.scrollWidth < minTrackWidth) {
        var clone = template.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        clone.setAttribute("data-cloned", "true");
        track.appendChild(clone);
      }

      setWidth = template.getBoundingClientRect().width;
      if (setWidth > 0) {
        track.style.setProperty("--marquee-shift", setWidth + "px");
      }
    });
  }

  var heroMarqueeResizeTimer;
  function scheduleHeroMarqueeSync() {
    if (!document.querySelector(".page-home .hero-v2")) return;
    clearTimeout(heroMarqueeResizeTimer);
    heroMarqueeResizeTimer = setTimeout(initHeroMarquees, 150);
  }

  function whenHeroMarqueeReady(cb) {
    var imgs = document.querySelectorAll(".page-home .hero-v2-card img");
    if (!imgs.length) {
      cb();
      return;
    }
    var pending = imgs.length;
    function done() {
      pending -= 1;
      if (pending <= 0) cb();
    }
    imgs.forEach(function (img) {
      if (img.complete) done();
      else {
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      }
    });
  }

  function initModal() {
    var modal = document.getElementById("demo-modal");
    if (!modal) return;

    var iframe = document.getElementById("demo-iframe");
    var previewStage = document.getElementById("modal-preview-stage");
    var previewImage = document.getElementById("modal-preview-image");
    var previewActions = document.getElementById("modal-preview-actions");
    var previewLoading = document.getElementById("modal-preview-loading");
    var iframeWrap = document.getElementById("modal-iframe-wrap");
    var livePreviewBtn = document.getElementById("modal-live-preview");
    var modalTitle = document.getElementById("modal-title");
    var modalCategory = document.getElementById("modal-category");
    var modalDesc = document.getElementById("modal-desc");
    var modalBuy = document.getElementById("modal-buy");
    var modalViewDetails = document.getElementById("modal-view-details");
    var pendingDemoUrl = null;
    var modalIframeReady = false;
    var lastFocused = null;

    function resetModalPreview() {
      pendingDemoUrl = null;
      modalIframeReady = false;
      modal.classList.remove("is-live-demo");
      if (iframe) {
        if (typeof iframe._dvitesTouchCleanup === "function") {
          iframe._dvitesTouchCleanup();
          iframe._dvitesTouchCleanup = null;
        }
        iframe.src = "about:blank";
        iframe.removeAttribute("src");
      }
      if (previewStage) previewStage.classList.remove("is-hidden", "is-loading");
      if (iframeWrap) iframeWrap.classList.add("is-hidden");
      if (previewLoading) previewLoading.classList.add("is-hidden");
      if (previewActions) previewActions.classList.remove("is-hidden");
      if (livePreviewBtn) livePreviewBtn.disabled = false;
      if (previewImage) {
        previewImage.removeAttribute("src");
        previewImage.alt = "";
      }
    }

    function openModalPreview(previewUrl, demoUrl) {
      resetModalPreview();
      pendingDemoUrl = demoUrl;
      if (previewImage && previewUrl) {
        previewImage.src = previewUrl;
        previewImage.alt = "Invitation preview";
      }
    }

    function loadModalLivePreview() {
      if (!pendingDemoUrl || !iframe) return;

      if (previewStage) previewStage.classList.add("is-loading");
      if (previewLoading) previewLoading.classList.remove("is-hidden");
      if (iframeWrap) iframeWrap.classList.remove("is-hidden");
      if (livePreviewBtn) livePreviewBtn.disabled = true;

      if (!iframe._dvitesPreviewBound && global.DvitesPhonePreview) {
        global.DvitesPhonePreview.setup(iframe, { mode: "modal", autoScroll: false, fitScale: true });
      }

      iframe.addEventListener("load", function () {
        modalIframeReady = true;
        modal.classList.add("is-live-demo");
        if (previewStage) previewStage.classList.add("is-hidden");
        if (previewLoading) previewLoading.classList.add("is-hidden");
      }, { once: true });

      var liveUrl = pendingDemoUrl;
      if (
        liveUrl &&
        global.DvitesPhonePreview &&
        typeof global.DvitesPhonePreview.previewUrl === "function"
      ) {
        liveUrl = global.DvitesPhonePreview.previewUrl(liveUrl);
      }
      iframe.setAttribute("allow", "autoplay; fullscreen");
      iframe.src = liveUrl;
    }

    if (livePreviewBtn) {
      livePreviewBtn.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (typeof global.dvitesTrackViewDemo === "function" && modalTitle) {
          global.dvitesTrackViewDemo(modalTitle.textContent.trim() || "Dvites Template");
        }
        loadModalLivePreview();
      });
    }

    global.DvitesResetModalPreview = resetModalPreview;

    function setModalProductLink(cardOrSlug) {
      if (!modalViewDetails) return;
      var productUrl = resolveProductPageUrl(cardOrSlug);
      if (productUrl) {
        modalViewDetails.href = productUrl;
        modalViewDetails.hidden = false;
      } else {
        modalViewDetails.href = "#";
        modalViewDetails.hidden = true;
      }
    }

    if (modalViewDetails && modalViewDetails.dataset.productNavBound !== "1") {
      modalViewDetails.dataset.productNavBound = "1";
      modalViewDetails.addEventListener("click", function (event) {
        event.stopPropagation();
        var url = resolveProductPageUrl(modalViewDetails);
        if (!url && modalBuy && modalBuy.dataset.templateSlug) {
          url = resolveProductPageUrl(modalBuy.dataset.templateSlug);
        }
        if (!url) return;
        event.preventDefault();
        global.location.assign(url);
      });
    }

    function bindCards() {
      document.querySelectorAll(".card[data-demo-url]").forEach(function (card) {
        if (card.dataset.modalBound === "1") return;
        card.dataset.modalBound = "1";

        var productUrl = resolveProductPageUrl(card);
        if (productUrl) {
          card.classList.add("card--navigates-product");
          card.setAttribute("tabindex", "0");
          card.setAttribute("role", "link");
          card.setAttribute("aria-label", "View " + (card.getAttribute("data-title") || "template") + " details");

          function navigateToProduct(event) {
            if (event.target.closest("a[href]")) return;
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            if (typeof event.button === "number" && event.button !== 0) return;
            event.preventDefault();
            global.location.assign(productUrl);
          }

          card.addEventListener("click", navigateToProduct);
          card.addEventListener("keydown", function (event) {
            if (event.key !== "Enter" && event.key !== " ") return;
            if (event.target.closest("a[href]")) return;
            event.preventDefault();
            global.location.assign(productUrl);
          });
          return;
        }

        card.classList.add("card--opens-preview");
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", "Preview " + (card.getAttribute("data-title") || "template"));

        card.addEventListener("click", function (event) {
          if (event.target.closest(".btn-view-details, .tpl-name-link, .btn-customize, .btn-watch, .demo-btn, .tpl-actions, a[href]")) return;
          openModal(card);
        });

        card.addEventListener("keydown", function (event) {
          if (event.key === "Enter" || event.key === " ") {
            if (event.target.closest(".btn-view-details, .tpl-name-link, .btn-customize, .btn-watch, .demo-btn, .tpl-actions, a[href]")) return;
            event.preventDefault();
            openModal(card);
          }
        });
      });
    }

    function setModalPricing(card) {
      var productType =
        card.getAttribute("data-product-type") === "save-the-date"
          ? "save-the-date"
          : "wedding";
      var pricing =
        productType === "save-the-date" ? getStdPricing() : getWeddingPricing();
      if (modalBuy) {
        modalBuy.dataset.templateSlug = card.getAttribute("data-id") || "";
      }
      var modalPricing = document.querySelector("#demo-modal .modal-pricing");
      if (!modalPricing) return;
      modalPricing.innerHTML =
        '<span class="old-price">' + formatPrice(pricing.oldPrice) + '</span>' +
        '<span class="current-price">' + formatPrice(pricing.price) + '</span>';
    }

    function trackModalViewContent(title, category, productType) {
      if (typeof global.dvitesTrackViewContent !== "function") return;
      var pricing =
        productType === "save-the-date" ? getStdPricing() : getWeddingPricing();
      global.dvitesTrackViewContent(
        title || "Dvites Template",
        category || "Wedding Invitation",
        pricing.price,
        null
      );
    }

    function openModalFromTemplate(tpl) {
      if (!tpl) return;
      var productType = tpl.productType || "wedding";
      var pricing =
        productType === "save-the-date" ? getStdPricing() : getWeddingPricing();
      lastFocused = document.activeElement;
      modalTitle.textContent = tpl.title || "";
      modalCategory.textContent = tpl.category || "";
      modalDesc.textContent = tpl.description || "";
      openModalPreview(tpl.preview, tpl.url);
      trackModalViewContent(tpl.title, tpl.category, productType);
      if (modalBuy) {
        modalBuy.dataset.templateSlug = tpl.id || "";
      }
      setModalProductLink(tpl.id || "");
      var modalPricing = document.querySelector("#demo-modal .modal-pricing");
      if (modalPricing) {
        modalPricing.innerHTML =
          '<span class="old-price">' + formatPrice(pricing.oldPrice) + '</span>' +
          '<span class="current-price">' + formatPrice(pricing.price) + '</span>';
      }
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      modal.querySelector(".modal-close").focus();
    }

    function openModal(card) {
      var url = card.getAttribute("data-demo-url");
      var preview = card.getAttribute("data-preview");
      var title = card.getAttribute("data-title");
      var category = card.getAttribute("data-category");
      var desc = card.getAttribute("data-description") || "";
      if (!url) return;

      lastFocused = document.activeElement;
      modalTitle.textContent = title || "";
      modalCategory.textContent = category || "";
      modalDesc.textContent = desc;
      openModalPreview(preview, url);
      trackModalViewContent(
        title,
        category,
        card.getAttribute("data-product-type") || "wedding"
      );
      setModalPricing(card);
      setModalProductLink(card);
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      modal.querySelector(".modal-close").focus();
    }

    function closeModal() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      resetModalPreview();
      if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    }

    bindCards();

    var heroWatch = document.getElementById("hero-watch-demo");
    if (heroWatch) {
      heroWatch.addEventListener("click", function () {
        if (typeof global.DvitesOpenModalById === "function") {
          global.DvitesOpenModalById("balcony-seaview");
        }
      });
    }

    modal.querySelectorAll("[data-close-modal]").forEach(function (el) {
      el.addEventListener("click", closeModal);
    });

    modal.querySelector(".modal-panel").addEventListener("click", function (e) {
      e.stopPropagation();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
    });

    global.DvitesRebindModal = function () {
      bindCards();
      bindProductNavigation();
    };
    global.DvitesOpenModalById = function (id) {
      var card = document.querySelector('.card[data-id="' + id + '"]');
      if (card) {
        openModal(card);
        return;
      }
      var tpl = TEMPLATES.find(function (t) { return t.id === id; });
      if (tpl) {
        openModalFromTemplate(tpl);
      }
    };
  }

  function initFilters() {
    var chips = document.querySelectorAll(".filter-chip");
    if (!chips.length) return;
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var filter = chip.getAttribute("data-filter");
        chips.forEach(function (c) { c.classList.remove("is-active"); });
        chip.classList.add("is-active");
        var catalog = document.getElementById("full-catalog");
        document.querySelectorAll(".card[data-demo-url]").forEach(function (card) {
          var tags = (card.getAttribute("data-tags") || "").split(/\s+/);
          var show = filter === "all" || tags.indexOf(filter) !== -1;
          card.classList.toggle("is-hidden", !show);
        });
        if (catalog) equalizeCardHeights(catalog);
      });
    });
  }

  function initModalExtras() {
    var msgs = document.querySelectorAll(".urgency-msg");
    if (msgs.length < 2) return;
    var index = 0;
    setInterval(function () {
      msgs[index].classList.remove("is-active");
      index = (index + 1) % msgs.length;
      msgs[index].classList.add("is-active");
    }, 3000);
  }

  function initMobileNav() {
    var toggle = document.querySelector(".menu-toggle");
    var mobileNav = document.getElementById("mobile-nav");
    if (!toggle || !mobileNav) return;
    toggle.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initFaq() {
    document.querySelectorAll(".faq-item").forEach(function (item) {
      item.querySelector(".faq-q").addEventListener("click", function () {
        var wasOpen = item.classList.contains("is-open");
        document.querySelectorAll(".faq-item").forEach(function (i) { i.classList.remove("is-open"); });
        if (!wasOpen) item.classList.add("is-open");
      });
    });
  }

  function initProtection() {
    document.addEventListener("contextmenu", function (e) { e.preventDefault(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") return;
      var key = e.key;
      var blocked =
        key === "F12" ||
        (e.ctrlKey && e.shiftKey && /[ijc]/i.test(key)) ||
        (e.ctrlKey && !e.shiftKey && /[us]/i.test(key)) ||
        (e.metaKey && e.altKey && /[iju]/i.test(key)) ||
        (e.metaKey && e.shiftKey && /[cij]/i.test(key));
      if (blocked) { e.preventDefault(); e.stopPropagation(); }
    });
  }

  function initPartnerStudio() {
    var grid = document.getElementById("partner-grid");
    var cart = document.getElementById("partner-cart");
    if (!grid || !cart) return;

    var partnerTemplates = buildPartnerCatalogTemplates();

    grid.innerHTML = partnerTemplates.map(function (tpl) {
      return (
        '<label class="partner-item" data-id="' + tpl.id + '">' +
          '<input type="checkbox" name="partner-template" value="' + tpl.id + '" />' +
          '<div class="partner-item-thumb" style="background-image:url(\'' + tpl.preview + '\')"></div>' +
          '<div class="partner-item-info">' +
            '<strong>' + tpl.title + '</strong>' +
            '<span>' + tpl.category + ' · ' + formatPrice(templateUnitPrice(tpl)) + '</span>' +
          '</div>' +
        '</label>'
      );
    }).join("");

    var countEl = document.getElementById("cart-count");
    var subtotalEl = document.getElementById("cart-subtotal");
    var discountEl = document.getElementById("cart-discount");
    var totalEl = document.getElementById("cart-total");
    var badge = document.getElementById("discount-badge");
    var orderBtn = document.getElementById("partner-order-btn");
    var hintEl = document.getElementById("cart-hint");

    function updateCartHint(count) {
      if (!hintEl) return;
      if (count < PARTNER_MIN) {
        hintEl.textContent = "Select at least 3 templates to continue.";
      } else if (count >= PARTNER_MAX) {
        hintEl.textContent = "Maximum 5 templates allowed per partner order.";
      } else {
        hintEl.textContent = "Select 3 to 5 templates to unlock your 5% partner discount and send your bulk order.";
      }
    }

    function updateCart() {
      var checked = grid.querySelectorAll('input:checked');
      var count = checked.length;
      var subtotal = 0;
      checked.forEach(function (input) {
        var tpl = partnerTemplates.find(function (t) { return t.id === input.value; });
        if (tpl) subtotal += templateUnitPrice(tpl);
      });
      var qualifies = count >= PARTNER_MIN && count <= PARTNER_MAX;
      var discount = qualifies ? Math.round(subtotal * PARTNER_DISCOUNT) : 0;
      var total = subtotal - discount;

      countEl.textContent = count;
      subtotalEl.textContent = formatPrice(subtotal);
      discountEl.textContent = discount ? "−" + formatPrice(discount) : formatPrice(0);
      totalEl.textContent = formatPrice(total);
      badge.classList.toggle("is-visible", qualifies);
      updateCartHint(count);

      grid.querySelectorAll(".partner-item").forEach(function (item) {
        var input = item.querySelector("input");
        var atMax = count >= PARTNER_MAX;
        item.classList.toggle("is-selected", input.checked);
        if (!input.checked && atMax) {
          input.disabled = true;
          item.classList.add("is-at-limit");
        } else {
          input.disabled = false;
          item.classList.remove("is-at-limit");
        }
      });

      orderBtn.disabled = !qualifies;
      orderBtn.style.opacity = qualifies ? "1" : "0.55";
    }

    grid.addEventListener("change", function (e) {
      var checked = grid.querySelectorAll("input:checked");
      if (checked.length > PARTNER_MAX && e.target.checked) {
        e.target.checked = false;
      }
      updateCart();
    });
    updateCart();

    orderBtn.addEventListener("click", function () {
      var selectedSlugs = [];
      var selectedTitles = [];
      grid.querySelectorAll("input:checked").forEach(function (input) {
        var tpl = partnerTemplates.find(function (t) { return t.id === input.value; });
        if (tpl) {
          selectedSlugs.push(tpl.id);
          selectedTitles.push(tpl.title);
        }
      });
      if (selectedSlugs.length < PARTNER_MIN || selectedSlugs.length > PARTNER_MAX) return;
      if (!global.DvitesPayment) return;

      var unitPrice = getWeddingPricing().price;
      var totalMajor = global.DvitesPayment.calculatePartnerTotalMajor(
        unitPrice,
        selectedSlugs.length
      );
      var templateName =
        "Partner Studio (" + selectedSlugs.length + " templates): " + selectedTitles.join(", ");

      global.DvitesPayment.startCheckout({
        templateName: templateName,
        templateSlug: "partner-studio",
        partnerTemplateSlugs: selectedSlugs,
        displayAmountMajor: totalMajor,
        notes: "Partner Studio templates: " + selectedTitles.join(", "),
      });
    });
  }

  function initAnnouncementBar() {
    var bar = document.getElementById("announce-bar");
    if (!bar) return;

    var countdownEl = document.getElementById("announce-countdown");

    function pad(n) {
      return String(n).padStart(2, "0");
    }

    function syncBarOffset() {
      document.documentElement.style.setProperty(
        "--announce-bar-height",
        bar.offsetHeight + "px"
      );
    }

    function tick() {
      if (!countdownEl) return;
      var now = new Date();
      var end = new Date(now);
      end.setHours(23, 59, 59, 999);
      var diff = Math.max(0, end.getTime() - now.getTime());
      var h = Math.floor(diff / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      countdownEl.textContent = pad(h) + ":" + pad(m) + ":" + pad(s);
      countdownEl.setAttribute("datetime", end.toISOString());
    }

    if (countdownEl) {
      tick();
      setInterval(tick, 1000);
    }

    syncBarOffset();
    global.addEventListener("resize", syncBarOffset);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(syncBarOffset);
    }
  }

  function initHeaderScroll() {
    var header = document.querySelector(".header");
    if (!header) return;

    function onScroll() {
      header.classList.toggle("is-scrolled", global.scrollY > 8);
    }

    onScroll();
    global.addEventListener("scroll", onScroll, { passive: true });
  }

  function initPageRecovery() {
    global.addEventListener("pageshow", function (e) {
      if (!e.persisted) return;
      document.body.classList.remove("modal-open");
      var modal = document.getElementById("demo-modal");
      if (modal) {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
      }
      if (typeof global.DvitesResetModalPreview === "function") {
        global.DvitesResetModalPreview();
      }
      var hero = document.getElementById("hero-iframe");
      if (hero && hero.src && hero.src.indexOf("about:blank") < 0) {
        var src = hero.src;
        hero.src = "about:blank";
        setTimeout(function () { hero.src = src; }, 50);
      }
    });
  }

  function initHeroEventRotator() {
    var EVENTS = [
      { headline: "wedding day", type: "wedding", label: "Wedding" },
      { headline: "engagement party", type: "engagement", label: "Engagement" },
      { headline: "ceremony", type: "ceremony", label: "Ceremony" },
      { headline: "birthday celebration", type: "birthday", label: "Birthday" },
      { headline: "reception", type: "reception", label: "Reception" },
      { headline: "anniversary", type: "anniversary", label: "Anniversary" },
      { headline: "baby shower", type: "celebration", label: "Celebration" },
      { headline: "corporate gala", type: "corporate", label: "Corporate" }
    ];

    var headlineEls = document.querySelectorAll('[data-rotator="headline"] .hero-event-rotator-inner');
    var typeEls = document.querySelectorAll('[data-rotator="type"] .hero-event-rotator-inner');
    var labelEls = document.querySelectorAll('[data-rotator="label"] .hero-event-rotator-inner');

    if (!headlineEls.length && !typeEls.length && !labelEls.length) return;

    var index = 0;
    var reducedMotion = global.matchMedia && global.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function applyWord(el, text) {
      if (!el || el.textContent === text) return;
      if (reducedMotion) {
        el.textContent = text;
        return;
      }
      el.classList.add("is-exiting");
      global.setTimeout(function () {
        el.textContent = text;
        el.classList.remove("is-exiting");
        el.classList.add("is-entering");
        global.setTimeout(function () {
          el.classList.remove("is-entering");
        }, 420);
      }, 320);
    }

    function tick() {
      index = (index + 1) % EVENTS.length;
      var item = EVENTS[index];
      headlineEls.forEach(function (el) { applyWord(el, item.headline); });
      typeEls.forEach(function (el) { applyWord(el, item.type); });
      labelEls.forEach(function (el) { applyWord(el, item.label); });
    }

    if (!reducedMotion) {
      global.setInterval(tick, 3000);
    }
  }

  global.Dvites = {
    TEMPLATES: TEMPLATES,
    WEDDING_TEMPLATES: global.DvitesWeddingTemplates ? global.DvitesWeddingTemplates.list : [],
    SAVE_THE_DATE_TEMPLATES: SAVE_THE_DATE_TEMPLATES,
    EMAIL: EMAIL,
    PRICE: PRICE,
    SAVE_THE_DATE_PRICE: SAVE_THE_DATE_PRICE,
    renderCatalog: renderCatalog,
    renderSaveTheDateCatalog: renderSaveTheDateCatalog,
    enquiryMail: enquiryMail,
    buyMail: buyMail,
    init: function () {
      var boot = function () {
        initAnnouncementBar();
        initHeaderScroll();
        initHeroEventRotator();
        initHeroScroll();
        initHeroMarquees();
        whenHeroMarqueeReady(initHeroMarquees);
        initModal();
        initModalExtras();
        initFilters();
        initMobileNav();
        initFaq();
        initProtection();
        initPartnerStudio();
        initPageRecovery();
        global.addEventListener("resize", function () {
          var featured = document.getElementById("featured-catalog");
          var full = document.getElementById("full-catalog");
          var std = document.getElementById("std-catalog");
          if (featured) equalizeCardHeights(featured);
          if (full) equalizeCardHeights(full);
          if (std) equalizeCardHeights(std);
          scheduleHeroMarqueeSync();
        });
      };
      if (global.DvitesMarket && typeof global.DvitesMarket.ready === "function") {
        global.DvitesMarket.ready().then(boot);
      } else {
        boot();
      }
    },
    refreshMarketPricing: function () {
      if (global.DvitesMarket && global.DvitesMarket.applyMarketingCopy) {
        global.DvitesMarket.applyMarketingCopy();
      }
      var featured = document.getElementById("featured-catalog");
      var full = document.getElementById("full-catalog");
      var std = document.getElementById("std-catalog");
      if (featured) renderCatalog(featured, true);
      if (full) renderCatalog(full, false);
      if (std) renderSaveTheDateCatalog(std);
      initPartnerStudio();
    },
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", global.Dvites.init);
  } else {
    global.Dvites.init();
  }
})(window);
