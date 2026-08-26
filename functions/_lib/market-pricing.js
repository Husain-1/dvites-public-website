/** Authoritative checkout pricing and template catalog (IN + AE only). */

export const VALID_MARKETS = ["IN", "AE"];
export const PARTNER_STUDIO_SLUG = "partner-studio";
export const PARTNER_MIN = 3;
export const PARTNER_MAX = 5;
export const PARTNER_DISCOUNT = 0.05;

/** Wedding templates hidden from catalog/partner studio but still valid slugs. */
export const HIDDEN_WEDDING_SLUGS = ["mountains", "laavan"];

export const MARKET_PRICES = {
  IN: {
    currency: "INR",
    locale: "en-IN",
    products: {
      wedding: { price: 799, oldPrice: 2499 },
      "save-the-date": { price: 999, oldPrice: 1999 },
    },
  },
  AE: {
    currency: "AED",
    locale: "en-AE",
    products: {
      wedding: { price: 79, oldPrice: 79 },
      "save-the-date": { price: 79, oldPrice: 79 },
    },
  },
};

const WEDDING_TEMPLATES = [
  { slug: "maison-doree", name: "Maison Dorée", productType: "wedding" },
  { slug: "pichwai-royal", name: "Pichwai Royal", productType: "wedding" },
  { slug: "honey-garden", name: "Honey Garden", productType: "wedding" },
  { slug: "animated-flowers", name: "Animated Flowers", productType: "wedding" },
  { slug: "mountains", name: "Mountain Royal", productType: "wedding" },
  { slug: "balcony-seaview", name: "Balcony Seaview", productType: "wedding" },
  { slug: "curtains", name: "Curtains", productType: "wedding" },
  { slug: "laavan", name: "Laavan", productType: "wedding" },
  { slug: "mewar-midnight", name: "Mewar Midnight", productType: "wedding" },
  { slug: "niqah", name: "Niqah", productType: "wedding" },
  { slug: "oud-blossom-majlis", name: "Oud Blossom Majlis", productType: "wedding" },
  { slug: "botanical-bloom", name: "Botanical Bloom", productType: "wedding" },
  { slug: "rajkamal-palace", name: "Rajkamal Palace", productType: "wedding" },
];

const SAVE_THE_DATE_TEMPLATES = [
  { slug: "desert-sand", name: "Desert Sand", productType: "save-the-date" },
  { slug: "blossom-touch", name: "Blossom Touch", productType: "save-the-date" },
  { slug: "enchanted-mirror", name: "Enchanted Mirror", productType: "save-the-date" },
  { slug: "moonlit-lotus", name: "Moonlit Lotus", productType: "save-the-date" },
  { slug: "royal-radiance", name: "Royal Radiance", productType: "save-the-date" },
];

const TEMPLATE_BY_SLUG = Object.create(null);

function registerTemplate(entry) {
  TEMPLATE_BY_SLUG[entry.slug] = entry;
}

WEDDING_TEMPLATES.forEach(registerTemplate);
SAVE_THE_DATE_TEMPLATES.forEach(registerTemplate);

export function normalizeMarket(value, countryCode) {
  const explicit = String(value || "")
    .trim()
    .toUpperCase();
  if (VALID_MARKETS.includes(explicit)) return explicit;

  const country = String(countryCode || "")
    .trim()
    .toUpperCase();
  if (country === "AE") return "AE";
  return "IN";
}

export function getMarketConfig(market) {
  const normalized = normalizeMarket(market);
  const config = MARKET_PRICES[normalized];
  if (!config) {
    throw new Error("Unsupported market.");
  }
  return {
    market: normalized,
    currency: config.currency,
    locale: config.locale,
    products: config.products,
  };
}

export function getPublicPrices(market) {
  const config = getMarketConfig(market);
  return {
    wedding: { ...config.products.wedding },
    "save-the-date": { ...config.products["save-the-date"] },
  };
}

export function resolveTemplate(templateSlug) {
  const slug = String(templateSlug || "")
    .trim()
    .toLowerCase();
  if (!slug) return null;
  if (slug === PARTNER_STUDIO_SLUG) {
    return {
      slug: PARTNER_STUDIO_SLUG,
      name: "Partner Studio",
      productType: "partner-studio",
    };
  }
  return TEMPLATE_BY_SLUG[slug] || null;
}

export function isPartnerEligibleWeddingSlug(slug) {
  const normalized = String(slug || "")
    .trim()
    .toLowerCase();
  if (!normalized || HIDDEN_WEDDING_SLUGS.includes(normalized)) return false;
  const entry = TEMPLATE_BY_SLUG[normalized];
  return !!(entry && entry.productType === "wedding");
}

export function majorToSubunits(amountMajor) {
  const value = Number(amountMajor);
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error("Invalid price amount.");
  }
  return Math.round(value * 100);
}

export function subunitsToMajor(amountSubunits) {
  const value = Number(amountSubunits);
  if (!Number.isFinite(value) || value <= 0) return null;
  return Math.round(value) / 100;
}

function productTypeForTemplate(template) {
  if (!template) return null;
  if (template.productType === "partner-studio") return "wedding";
  return template.productType;
}

function unitPriceMajor(market, productType) {
  const config = getMarketConfig(market);
  const product = config.products[productType];
  if (!product || !Number.isFinite(Number(product.price)) || Number(product.price) <= 0) {
    throw new Error("Price is not configured for this market.");
  }
  return Number(product.price);
}

function partnerStudioPricing(market, partnerTemplateSlugs) {
  const slugs = Array.isArray(partnerTemplateSlugs) ? partnerTemplateSlugs : [];
  const unique = [];
  slugs.forEach(function (slug) {
    const normalized = String(slug || "")
      .trim()
      .toLowerCase();
    if (!normalized || unique.includes(normalized)) return;
    unique.push(normalized);
  });

  if (unique.length < PARTNER_MIN || unique.length > PARTNER_MAX) {
    throw new Error("Partner Studio requires 3 to 5 unique wedding templates.");
  }

  unique.forEach(function (slug) {
    if (!isPartnerEligibleWeddingSlug(slug)) {
      throw new Error("Invalid Partner Studio template: " + slug);
    }
  });

  const unitPrice = unitPriceMajor(market, "wedding");
  const subtotal = unitPrice * unique.length;
  const discount = Math.round(subtotal * PARTNER_DISCOUNT);
  const amountMajor = subtotal - discount;
  const amountSubunits = majorToSubunits(amountMajor);
  const config = getMarketConfig(market);

  const templateNames = unique.map(function (slug) {
    return TEMPLATE_BY_SLUG[slug].name;
  });

  return {
    market: config.market,
    currency: config.currency,
    productType: "partner-studio",
    templateSlug: PARTNER_STUDIO_SLUG,
    templateName: "Partner Studio (" + unique.length + " templates)",
    amountMajor,
    amountSubunits,
    unitPriceMajor: unitPrice,
    partnerTemplateSlugs: unique,
    partnerTemplateNames: templateNames,
    partnerCount: unique.length,
    partnerDiscountMajor: discount,
  };
}

/**
 * Resolve authoritative order pricing from validated template + market.
 */
export function resolveOrderPricing(input) {
  const market = normalizeMarket(input && input.market, input && input.countryCode);
  const template = resolveTemplate(input && input.templateSlug);

  if (!template) {
    throw new Error("Unknown template.");
  }

  if (template.slug === PARTNER_STUDIO_SLUG) {
    return partnerStudioPricing(market, input && input.partnerTemplateSlugs);
  }

  const productType = productTypeForTemplate(template);
  const amountMajor = unitPriceMajor(market, productType);
  const amountSubunits = majorToSubunits(amountMajor);
  const config = getMarketConfig(market);

  return {
    market: config.market,
    currency: config.currency,
    productType,
    templateSlug: template.slug,
    templateName: template.name,
    amountMajor,
    amountSubunits,
  };
}

export function metaCountryForMarket(market) {
  return normalizeMarket(market) === "AE" ? "ae" : "in";
}
