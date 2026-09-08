(function (global) {
  "use strict";

  var SITE_ORIGIN = "https://www.dvites.com";
  var DEFAULT_PRICE = 999;
  var DEFAULT_OLD_PRICE = 1999;
  var DEFAULT_SAVE_LABEL = "Save 50%";
  var DEFAULT_DELIVERY = "Delivered within 24 hours";
  var DEFAULT_HOSTING = "Hosted until after your wedding";

  /** Set false to hide all Save the Date templates from the main website storefront. */
  var STOREFRONT_ENABLED = false;

  var STD_THUMBNAILS_DIR = "/save-the-date-thumbnails/";

  function isStorefrontEnabled() {
    return STOREFRONT_ENABLED;
  }

  var SHARED_FEATURES = [
    "Couple names and wedding date",
    "Interactive reveal experience",
    "Background music",
    "Google Calendar ready",
    "Venue and event details",
    "Shareable website link",
    "Mobile and desktop compatibility",
    "Hosted until after your wedding"
  ];

  var SHARED_PERSONALIZABLE = [
    "Couple names",
    "Wedding date",
    "Venue name and city",
    "Preferred wording",
    "Calendar link details where supported"
  ];

  var SHARED_FIXED = [
    "Core layout and visual structure",
    "Animation style and motion design",
    "Typography system",
    "Theme composition and colour palette",
    "Section arrangement as shown in the demo"
  ];

  var SHARED_PROOF = [
    { icon: "✨", label: "Interactive reveal", desc: "A memorable opening moment your guests will love" },
    { icon: "📅", label: "Save the date fast", desc: "Google Calendar action on supported designs" },
    { icon: "🎵", label: "Music included", desc: "Atmospheric background music on supported designs" },
    { icon: "🔗", label: "One link sharing", desc: "Share instantly on WhatsApp with unlimited guests" },
    { icon: "📱", label: "Mobile-first", desc: "Looks beautiful on every phone, tablet and desktop" }
  ];

  function stdThumbnailUrl(filename) {
    if (!filename) return "";
    return STD_THUMBNAILS_DIR + encodeURIComponent(filename);
  }

  function productUrl(slug) {
    return "/save-the-date/" + slug + ".html";
  }

  function seoTitle(name, category) {
    return name + " Save the Date Invitation — " + category + " | Dvites";
  }

  function seoDescription(name, shortDescription) {
    return (
      name +
      " — premium digital Save the Date invitation by Dvites. " +
      shortDescription +
      " Customised in 24 hours."
    );
  }

  function baseRecord(record) {
    var slug = record.id;
    var price = record.price != null ? record.price : DEFAULT_PRICE;
    var preview = record.preview || stdThumbnailUrl(record.thumbnailFile);
    return {
      id: record.id,
      slug: slug,
      name: record.title,
      title: record.title,
      category: record.category,
      tags: record.tags || [],
      shortDescription: record.description,
      fullDescription: record.fullDescription || record.description,
      price: price,
      oldPrice: record.oldPrice != null ? record.oldPrice : DEFAULT_OLD_PRICE,
      saveLabel: record.saveLabel || DEFAULT_SAVE_LABEL,
      thumbnail: preview,
      heroImage: record.heroImage || preview,
      previewImage: preview,
      preview: preview,
      demoUrl: record.url,
      url: record.url,
      thumbnailFile: record.thumbnailFile || "",
      featured: !!record.featured,
      features: record.features || SHARED_FEATURES.slice(),
      personalizable: record.personalizable || SHARED_PERSONALIZABLE.slice(),
      fixedElements: record.fixedElements || SHARED_FIXED.slice(),
      proofMoments: record.proofMoments || SHARED_PROOF.slice(),
      deliveryTime: record.deliveryTime || DEFAULT_DELIVERY,
      hostingPeriod: record.hostingPeriod || DEFAULT_HOSTING,
      productType: "save-the-date",
      amountPaise: price * 100,
      seoTitle: record.seoTitle || seoTitle(record.title, record.category),
      seoDescription: record.seoDescription || seoDescription(record.title, record.description),
      canonicalUrl: SITE_ORIGIN + productUrl(slug),
      ogImage: SITE_ORIGIN + preview,
      productUrl: productUrl(slug)
    };
  }

  var RAW = [
    {
      id: "desert-sand",
      url: "/templates/desert-sand/",
      title: "Desert Sand",
      category: "Hindu Save the Date",
      tags: ["minimal", "classic", "elegant"],
      thumbnailFile: "dessert sand thumbnail.webp",
      description: "A warm, elegant Save the Date design inspired by desert tones and timeless minimalism."
    },
    {
      id: "blossom-touch",
      url: "/templates/blossom-touch/",
      title: "Blossom Touch",
      category: "Floral Save the Date",
      tags: ["floral", "romantic"],
      thumbnailFile: "blossom touch thumbnail.webp",
      description: "A soft floral Save the Date invitation with romantic details and graceful motion."
    },
    {
      id: "enchanted-mirror",
      url: "/templates/enchanted-mirror/",
      title: "Enchanted Mirror",
      category: "Luxury Save the Date",
      tags: ["luxury", "romantic"],
      thumbnailFile: "enchanted mirror template.webp",
      description: "A dreamy mirror-inspired invitation with a luxurious and magical reveal."
    },
    {
      id: "moonlit-lotus",
      url: "/templates/moonlit-lotus/",
      title: "Moonlit Lotus",
      category: "Elegant Save the Date",
      tags: ["floral", "minimal"],
      thumbnailFile: "moonlit lotus thumbnail.webp",
      description: "A refined lotus-themed design with calm night tones and elegant movement."
    },
    {
      id: "royal-radiance",
      url: "/templates/royal-radiance/",
      title: "Royal Radiance",
      category: "Royal Save the Date",
      tags: ["luxury", "royal"],
      thumbnailFile: "royal radiance thumbnail'.webp",
      description: "A grand chandelier-inspired Save the Date invitation with rich royal styling."
    }
  ];

  var LIST = STOREFRONT_ENABLED ? RAW.map(baseRecord) : [];

  function getBySlug(slug) {
    if (!STOREFRONT_ENABLED || !slug) return null;
    var normalized = String(slug).trim().toLowerCase();
    for (var i = 0; i < LIST.length; i += 1) {
      if (LIST[i].slug === normalized || LIST[i].id === normalized) return LIST[i];
    }
    return null;
  }

  function getRelated(currentSlug, limit) {
    if (!STOREFRONT_ENABLED) return [];
    var max = limit || 3;
    var current = getBySlug(currentSlug);
    if (!current) return LIST.slice(0, max);
    var sameCategory = LIST.filter(function (tpl) {
      return tpl.slug !== current.slug && tpl.category === current.category;
    });
    var others = LIST.filter(function (tpl) {
      return tpl.slug !== current.slug && tpl.category !== current.category;
    });
    return sameCategory.concat(others).slice(0, max);
  }

  function toCatalogRecord(tpl) {
    return {
      id: tpl.id,
      url: tpl.demoUrl,
      title: tpl.name,
      category: tpl.category,
      tags: tpl.tags,
      preview: tpl.previewImage,
      description: tpl.shortDescription,
      featured: tpl.featured,
      price: tpl.price,
      oldPrice: tpl.oldPrice,
      saveLabel: tpl.saveLabel,
      productUrl: tpl.productUrl,
      thumbnailFile: tpl.thumbnailFile
    };
  }

  global.DvitesSaveTheDateTemplates = {
    SITE_ORIGIN: SITE_ORIGIN,
    DEFAULT_PRICE: DEFAULT_PRICE,
    DEFAULT_OLD_PRICE: DEFAULT_OLD_PRICE,
    STOREFRONT_ENABLED: STOREFRONT_ENABLED,
    isStorefrontEnabled: isStorefrontEnabled,
    list: LIST,
    getBySlug: getBySlug,
    getRelated: getRelated,
    productUrl: productUrl,
    toCatalogRecord: toCatalogRecord,
    stdThumbnailUrl: stdThumbnailUrl
  };
})(window);
