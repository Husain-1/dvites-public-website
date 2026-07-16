(function (global) {
  "use strict";

  var SITE_ORIGIN = "https://www.dvites.com";
  var DEFAULT_PRICE = 1199;
  var DEFAULT_OLD_PRICE = 2499;
  var DEFAULT_SAVE_LABEL = "Save 40%";
  var DEFAULT_DELIVERY = "Delivered within 24 hours";
  var DEFAULT_HOSTING = "Hosted until after your wedding";

  var SHARED_FEATURES = [
    "Couple names and photographs",
    "Event schedule",
    "Countdown timer",
    "Background music",
    "Venue maps & directions",
    "Google Maps",
    "RSVP",
    "Contact details",
    "Shareable website link",
    "Mobile and desktop compatibility"
  ];

  var SHARED_PERSONALIZABLE = [
    "Couple names",
    "Wedding date",
    "Event information and timings",
    "Venue names and addresses",
    "Your photographs",
    "Background music selection",
    "Text content within available sections"
  ];

  var SHARED_FIXED = [
    "Core layout and visual structure",
    "Animation style and motion design",
    "Typography system",
    "Theme composition and colour palette",
    "Section arrangement as shown in the demo"
  ];

  var SHARED_PROOF = [
    { icon: "✨", label: "Grand opening", desc: "Animated welcome screen your guests remember" },
    { icon: "⏳", label: "Wedding countdown", desc: "Build excitement before the big day" },
    { icon: "📅", label: "Multi-event schedule", desc: "Haldi, sangeet, wedding & reception in one link" },
    { icon: "📍", label: "Venue directions", desc: "Google Maps for every ceremony location" },
    { icon: "💌", label: "RSVP & contacts", desc: "Guest confirmations without WhatsApp chaos" }
  ];

  function productUrl(slug) {
    return "/templates/" + slug + ".html";
  }

  function seoTitle(name, category) {
    return name + " Wedding Invitation Website — " + category + " | Dvites";
  }

  function seoDescription(name, shortDescription) {
    return (
      name +
      " — premium animated wedding website by Dvites. " +
      shortDescription +
      " Customised in 24 hours. From ₹1,199."
    );
  }

  function baseRecord(record) {
    var slug = record.id;
    var price = record.price != null ? record.price : DEFAULT_PRICE;
    var oldPrice = record.oldPrice != null ? record.oldPrice : DEFAULT_OLD_PRICE;
    var preview = record.preview || record.thumbnail;
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
      featured: !!record.featured,
      features: record.features || SHARED_FEATURES.slice(),
      personalizable: record.personalizable || SHARED_PERSONALIZABLE.slice(),
      fixedElements: record.fixedElements || SHARED_FIXED.slice(),
      proofMoments: record.proofMoments || SHARED_PROOF.slice(),
      deliveryTime: record.deliveryTime || DEFAULT_DELIVERY,
      hostingPeriod: record.hostingPeriod || DEFAULT_HOSTING,
      productType: "wedding",
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
      id: "mountains",
      url: "/templates/Mountains/",
      title: "Mountain Royal",
      category: "Royal Hindu Wedding",
      tags: ["hinduism", "royal", "south-indian"],
      preview: "/templates/Mountains/assets/images/Mountains.png",
      description: "A graceful Hindu royal wedding website with ceremony details, family blessings, and a warm traditional feel your guests will love.",
      featured: true
    },
    {
      id: "balcony-seaview",
      url: "/templates/balcony-seaview/",
      title: "Balcony Seaview",
      category: "Coastal Destination",
      tags: ["destination", "luxury"],
      preview: "/templates/balcony-seaview/assets/images/balcony.png",
      description: "A dreamy destination-style invite with ocean views, elegant typography, and a romantic coastal atmosphere perfect for beach weddings.",
      featured: false
    },
    {
      id: "curtains",
      url: "/templates/curtains/",
      title: "Curtains",
      category: "Classic Elegance",
      tags: ["luxury", "minimal"],
      preview: "/templates/curtains/assets/images/curtains-theme-poster-BhK08iq7.jpg",
      description: "Grand curtains reveal a timeless wedding story — refined animations, soft luxury tones, and an unforgettable first impression.",
      featured: true
    },
    {
      id: "pichwai-royal",
      url: "/templates/pichwai-royal/",
      title: "Pichwai Royal",
      category: "Royal Wedding",
      tags: ["hinduism", "royal"],
      preview: "/templates/pichwai-royal/assets/images/pichwai.png",
      description: "A luxurious Pichwai-inspired royal wedding invitation with cinematic animations.",
      featured: false
    },
    {
      id: "laavan",
      url: "/templates/laavan/",
      title: "Laavan",
      category: "Anand Karaj / Sikh Wedding",
      tags: ["sikh", "royal"],
      preview: "/templates/laavan/assets/images/laavan.png",
      description: "A serene Anand Karaj invitation with sacred symbolism, elegant blue tones, and every ceremony beautifully laid out for your guests.",
      featured: true
    },
    {
      id: "maison-doree",
      url: "/templates/maison-doree/",
      title: "Maison Dorée",
      category: "Luxury European",
      tags: ["luxury"],
      preview: "/templates/maison-doree/assets/images/maison.png",
      description: "European luxury meets wedding romance — golden accents, cinematic motion, and a sophisticated invite for couples who want something extraordinary.",
      featured: true
    },
    {
      id: "mewar-midnight",
      url: "/templates/mewar-midnight/",
      title: "Mewar Midnight",
      category: "Royal Rajasthani",
      tags: ["hinduism", "royal"],
      preview: "/templates/mewar-midnight/assets/images/mewar.png",
      description: "Royal Rajasthani grandeur with palace imagery, rich maroon tones, and a regal experience worthy of your most special celebration.",
      featured: false
    },
    {
      id: "niqah",
      url: "/templates/niqah/",
      title: "Niqah",
      category: "Islamic Nikah",
      tags: ["muslim", "luxury"],
      preview: "/templates/niqah/assets/images/niqah.png",
      description: "An elegant Nikah invitation with refined typography, soft florals, and a warm welcome for your walima and nikah celebrations.",
      featured: true
    },
    {
      id: "oud-blossom-majlis",
      url: "/templates/oud-blossom-majlis/",
      title: "Oud Blossom Majlis",
      category: "Arabic Majlis",
      tags: ["muslim", "luxury"],
      preview: "/templates/oud-blossom-majlis/assets/images/oudblossom.png",
      description: "Arabic majlis elegance with oud-inspired aesthetics, rich cultural details, and a luxurious invite for your wedding festivities.",
      featured: false
    },
    {
      id: "rajkamal-palace",
      url: "/templates/rajkamal-palace/",
      title: "Rajkamal Palace",
      category: "Royal Palace Indian",
      tags: ["hinduism", "royal"],
      preview: "/templates/rajkamal-palace/assets/images/rajkamal.png",
      description: "Palace-inspired Indian royalty with arch motifs, golden details, and a majestic wedding website that feels truly grand.",
      featured: true
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

  global.DvitesWeddingTemplates = {
    SITE_ORIGIN: SITE_ORIGIN,
    DEFAULT_PRICE: DEFAULT_PRICE,
    DEFAULT_OLD_PRICE: DEFAULT_OLD_PRICE,
    list: LIST,
    getBySlug: getBySlug,
    getRelated: getRelated,
    productUrl: productUrl,
    toCatalogRecord: toCatalogRecord
  };
})(window);
