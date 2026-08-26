import { resolveOrderPricing, normalizeMarket } from "../_lib/market-pricing.js";

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const keyId = env.RAZORPAY_KEY_ID;
  const keySecret = env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return jsonResponse({ error: "Payment is not configured." }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body." }, 400);
  }

  const templateSlug = String(body.templateSlug || "").trim().toLowerCase();
  if (!templateSlug) {
    return jsonResponse({ error: "Missing template slug." }, 400);
  }

  const cfCountry =
    request.cf && request.cf.country ? String(request.cf.country) : "";
  const market = normalizeMarket(body.market, cfCountry);

  let pricing;
  try {
    pricing = resolveOrderPricing({
      templateSlug,
      market,
      countryCode: cfCountry,
      partnerTemplateSlugs: body.partnerTemplateSlugs,
    });
  } catch (error) {
    return jsonResponse(
      { error: (error && error.message) || "Invalid order request." },
      400
    );
  }

  const receipt = "dvites_" + Date.now();
  const orderNotes = {
    templateName: pricing.templateName,
    template_slug: pricing.templateSlug,
    product_type: pricing.productType,
    market: pricing.market,
  };

  if (pricing.partnerTemplateSlugs && pricing.partnerTemplateSlugs.length) {
    orderNotes.partner_templates = pricing.partnerTemplateSlugs.join(",");
  }

  const orderPayload = {
    amount: pricing.amountSubunits,
    currency: pricing.currency,
    receipt,
    notes: orderNotes,
  };

  const auth = btoa(keyId + ":" + keySecret);
  const razorpayResponse = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + auth,
    },
    body: JSON.stringify(orderPayload),
  });

  const order = await razorpayResponse.json();
  if (!razorpayResponse.ok) {
    const message =
      (order && order.error && order.error.description) ||
      "Unable to create Razorpay order.";
    return jsonResponse({ error: message }, razorpayResponse.status);
  }

  return jsonResponse({
    order_id: order.id,
    amount: order.amount,
    amount_major: pricing.amountMajor,
    currency: order.currency,
    market: pricing.market,
    template_slug: pricing.templateSlug,
    template_name: pricing.templateName,
    key_id: keyId,
  });
}
