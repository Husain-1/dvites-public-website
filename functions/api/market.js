import {
  getMarketConfig,
  getPublicPrices,
  normalizeMarket,
} from "../_lib/market-pricing.js";

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);
  const queryMarket = url.searchParams.get("market");
  const cfCountry =
    request.cf && request.cf.country ? String(request.cf.country) : "";
  const market = normalizeMarket(queryMarket, cfCountry);
  const config = getMarketConfig(market);

  return jsonResponse({
    market: config.market,
    country: cfCountry || config.market,
    currency: config.currency,
    locale: config.locale,
    prices: getPublicPrices(market),
  });
}
