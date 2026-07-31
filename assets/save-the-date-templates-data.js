(function (global) {
  "use strict";

  var SITE_ORIGIN = "https://www.dvites.com";
  var DEFAULT_PRICE = 999;
  var DEFAULT_OLD_PRICE = 1999;
  var DEFAULT_SAVE_LABEL = "Save 50%";
  var DEFAULT_DELIVERY = "Delivered within 24 hours";
  var DEFAULT_HOSTING = "Hosted until after your wedding";
  var THUMBNAILS_DIR = "/save-the-date-thumbnails/";

  function thumbnailUrl(filename) {
    if (!filename) return "";
    return THUMBNAILS_DIR + encodeURIComponent(filename);
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
      " — premium animated Save the Date invitation by Dvites. " +
      shortDescription +
      " Customised in 24 hours. From ₹999."
    );
  }

  var SHARED_FEATURES = [
    "Couple names and wedding date",
    "Interactive reveal experience",
    "Countdown timer",
    "Background music",
    "Google Calendar save action",
    "Shareable website link",
    "Mobile and desktop compatibility"
  ];

  var SHARED_PERSONALIZABLE = [
    "Couple names",
    "Wedding date",
    "Venue and city",
    "Preferred wording",
    "Calendar link details"
  ];

  var SHARED_FIXED = [
    "Core layout and visual structure",
    "Animation style and motion design",
    "Typography system",
    "Theme composition and colour palette"
  ];

  var SHARED_PROOF = [
    { icon: "✨", label: "Elegant reveal", desc: "A memorable first impression when guests open your link" },
    { icon: "📅", label: "Save the date", desc: "One-tap Google Calendar for your guests" },
    { icon: "⏳", label: "Countdown", desc: "Build excitement before the big day" },
    { icon: "🎵", label: "Music included", desc: "Atmospheric background music on supported designs" },
    { icon: "🔗", label: "Easy sharing", desc: "One link for WhatsApp and all your guests" }
  ];

  function baseRecord(record) {
    var slug = record.id;
    var price = record.price != null ? record.price : DEFAULT_PRICE;
    var oldPrice = record.oldPrice != null ? record.oldPrice : DEFAULT_OLD_PRICE;
    var preview = record.preview || thumbnailUrl(record.thumbnailFile);
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
      oldPrice: oldPrice,
      saveLabel: record.saveLabel || DEFAULT_SAVE_LABEL,
      thumbnail: preview,
      heroImage: record.heroImage || preview,
      previewImage: preview,
      preview: preview,
      demoUrl: record.url,
      url: record.url,
      featured: false,
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
      ogImage: SITE_ORIGIN + (record.heroImage || preview),
      productUrl: productUrl(slug)
    };
  }

  var RAW = [
    {
      id: "desert-sand",
      url: "/templates/desert-sand/",
      title: "Desert Sand",
      category: "Hindu Save the Date",
      tags: ["hinduism", "minimal"],
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
      tags: ["luxury", "magical"],
      thumbnailFile: "enchanted mirror template.webp",
      description: "A dreamy mirror-inspired invitation with a luxurious and magical reveal."
    },
    {
      id: "moonlit-lotus",
      url: "/templates/moonlit-lotus/",
      title: "Moonlit Lotus",
      category: "Lotus Save the Date",
      tags: ["lotus", "elegant"],
      thumbnailFile: "moonlit lotus thumbnail.webp",
      description: "A refined lotus-themed design with calm night tones and elegant movement."
    },
    {
      id: "royal-radiance",
      url: "/templates/royal-radiance/",
      title: "Royal Radiance",
      category: "Royal Save the Date",
      tags: ["royal", "luxury"],
      thumbnailFile: "royal radiance thumbnail'.webp",
      description: "A grand chandelier-inspired Save the Date invitation with rich royal styling."
    }
  ];

  var LIST = RAW.map(baseRecord);

  function getBySlug(slug) {
    if (!slug) return null;
    var normalized = String(slug).trim().toLowerCase();
    for (var i = 0; i < LIST.length; i += 1) {
      if (LIST[i].slug === normalized || LIST[i].id === normalized) return LIST[i];
    }
    return null;
  }

  function getRelated(currentSlug, limit) {
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
      productUrl: tpl.productUrl
    };
  }

  global.DvitesSaveTheDateTemplates = {
    SITE_ORIGIN: SITE_ORIGIN,
    DEFAULT_PRICE: DEFAULT_PRICE,
    DEFAULT_OLD_PRICE: DEFAULT_OLD_PRICE,
    list: LIST,
    getBySlug: getBySlug,
    getRelated: getRelated,
    productUrl: productUrl,
    toCatalogRecord: toCatalogRecord,
    thumbnailUrl: thumbnailUrl
  };
})(window);
