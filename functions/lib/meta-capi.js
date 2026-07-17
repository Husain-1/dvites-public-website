/**
 * Meta Conversions API helper (internal library — not a public HTTP route).
 *
 * Cloudflare Pages environment bindings:
 *   META_PIXEL_ID            — Dataset / Pixel ID (e.g. 27514697381530186)
 *   META_CAPI_ACCESS_TOKEN   — Conversions API access token (secret)
 *   META_TEST_EVENT_CODE     — Optional; Preview/test environments only
 */

export const GRAPH_API_VERSION = "v21.0";

function logMetaCapi(level, payload) {
  console.log(
    JSON.stringify(
      Object.assign(
        {
          service: "meta-capi",
          level: level,
          ts: new Date().toISOString(),
        },
        payload
      )
    )
  );
}

export function maskEventId(eventId) {
  const value = String(eventId || "");
  if (value.length <= 8) return value ? "***" : "";
  return value.slice(0, 4) + "…" + value.slice(-4);
}

export function cleanText(value, maxLength) {
  return String(value || "")
    .trim()
    .slice(0, maxLength || 500);
}

export function normalizeEmail(email) {
  const value = cleanText(email, 200).toLowerCase();
  if (!value || !value.includes("@")) return null;
  return value;
}

export function normalizePhone(phone) {
  let digits = String(phone || "").replace(/\D/g, "");
  if (!digits) return null;
  if (digits.length === 10) digits = "91" + digits;
  if (digits.length === 12 && digits.startsWith("91")) {
    // valid IN E.164 without plus
  } else if (digits.length < 11 || digits.length > 15) {
    return null;
  }
  digits = digits.replace(/^0+/, "");
  return digits || null;
}

export function normalizeName(name) {
  const value = cleanText(name, 80).toLowerCase();
  return value || null;
}

export function splitCustomerName(fullName) {
  const parts = cleanText(fullName, 160)
    .split(/\s+/)
    .filter(Boolean);
  if (!parts.length) return { firstName: null, lastName: null };
  if (parts.length === 1) {
    return { firstName: normalizeName(parts[0]), lastName: null };
  }
  return {
    firstName: normalizeName(parts[0]),
    lastName: normalizeName(parts.slice(1).join(" ")),
  };
}

export function normalizeCountry(country) {
  const value = cleanText(country, 8).toLowerCase();
  if (!value || value.length !== 2) return null;
  return value;
}

export function paiseToRupees(paise) {
  const value = Number(paise);
  if (!Number.isFinite(value) || value <= 0) return null;
  return Math.round(value) / 100;
}

export function rupeesFromTrustedSources({ paymentAmountPaise, orderAmountPaise }) {
  if (Number.isFinite(Number(paymentAmountPaise)) && Number(paymentAmountPaise) > 0) {
    return paiseToRupees(paymentAmountPaise);
  }
  if (Number.isFinite(Number(orderAmountPaise)) && Number(orderAmountPaise) > 0) {
    return paiseToRupees(orderAmountPaise);
  }
  return null;
}

export async function sha256Hex(value) {
  const encoder = new TextEncoder();
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(value));
  return Array.from(new Uint8Array(digest))
    .map(function (byte) {
      return byte.toString(16).padStart(2, "0");
    })
    .join("");
}

export function isMetaCapiConfigured(env) {
  return !!(env && env.META_PIXEL_ID && env.META_CAPI_ACCESS_TOKEN);
}

export function extractClientIp(request) {
  if (!request) return null;
  const cfIp = request.headers.get("CF-Connecting-IP");
  if (cfIp) return cleanText(cfIp, 64);
  return null;
}

export function extractUserAgent(request) {
  if (!request) return null;
  return cleanText(request.headers.get("User-Agent"), 512) || null;
}

export async function buildMetaUserData(input) {
  const userData = {};

  const clientIp = cleanText(input.clientIpAddress, 64);
  if (clientIp) userData.client_ip_address = clientIp;

  const userAgent = cleanText(input.clientUserAgent, 512);
  if (userAgent) userData.client_user_agent = userAgent;

  const fbp = cleanText(input.fbp, 256);
  if (fbp) userData.fbp = fbp;

  const fbc = cleanText(input.fbc, 256);
  if (fbc) userData.fbc = fbc;

  const customer = input.customer || {};

  try {
    const email = normalizeEmail(customer.email);
    if (email) userData.em = [await sha256Hex(email)];

    const phone = normalizePhone(customer.phone);
    if (phone) userData.ph = [await sha256Hex(phone)];

    const firstName = normalizeName(customer.firstName);
    if (firstName) userData.fn = [await sha256Hex(firstName)];

    const lastName = normalizeName(customer.lastName);
    if (lastName) userData.ln = [await sha256Hex(lastName)];

    const country = normalizeCountry(customer.country);
    if (country) userData.country = [await sha256Hex(country)];

    const externalId = cleanText(customer.externalId, 120);
    if (externalId) userData.external_id = [await sha256Hex(externalId)];
  } catch (hashError) {
    logMetaCapi("warn", {
      event_name: "Purchase",
      event: "user_data_hash_error",
      event_id_masked: maskEventId(input.eventId),
      message: hashError && hashError.message ? hashError.message : "hash_failed",
    });
  }

  return userData;
}

export function buildPurchasePayload(input) {
  const currency = cleanText(input.currency || "INR", 8).toUpperCase();
  const value = Number(input.value);
  const eventId = cleanText(input.eventId, 120);
  const contentId = cleanText(input.contentId, 120);
  const contentName = cleanText(input.contentName || "Dvites Wedding Invitation", 240);
  const orderId = cleanText(input.orderId, 120);
  const eventSourceUrl = cleanText(input.eventSourceUrl, 1000);
  const eventTime =
    Number.isFinite(Number(input.eventTime)) && Number(input.eventTime) > 0
      ? Math.floor(Number(input.eventTime))
      : Math.floor(Date.now() / 1000);

  const eventPayload = {
    event_name: "Purchase",
    event_time: eventTime,
    event_id: eventId,
    action_source: "website",
    user_data: input.userData || {},
    custom_data: {
      currency: currency,
      value: Number.isFinite(value) && value > 0 ? value : 0,
      order_id: orderId || eventId,
      content_ids: contentId ? [contentId] : [],
      content_name: contentName,
      content_type: "product",
      num_items: 1,
    },
  };

  if (eventSourceUrl) {
    eventPayload.event_source_url = eventSourceUrl;
  }

  return eventPayload;
}

/**
 * Send a Meta CAPI Purchase event. Never throws.
 */
export async function sendMetaPurchase(input) {
  const env = input && input.env;
  const eventId = cleanText(input && input.eventId, 120);

  if (!isMetaCapiConfigured(env)) {
    logMetaCapi("warn", {
      event_name: "Purchase",
      event: "purchase_skipped",
      reason: "missing_env_bindings",
      event_id_masked: maskEventId(eventId),
      success: false,
    });
    return { ok: false, skipped: true, reason: "missing_env_bindings" };
  }

  if (!eventId) {
    logMetaCapi("warn", {
      event_name: "Purchase",
      event: "purchase_skipped",
      reason: "missing_event_id",
      success: false,
    });
    return { ok: false, skipped: true, reason: "missing_event_id" };
  }

  const currency = cleanText(input.currency || "INR", 8).toUpperCase();
  if (currency !== "INR") {
    logMetaCapi("warn", {
      event_name: "Purchase",
      event: "purchase_skipped",
      reason: "invalid_currency",
      event_id_masked: maskEventId(eventId),
      success: false,
    });
    return { ok: false, skipped: true, reason: "invalid_currency" };
  }

  const value = Number(input.value);
  if (!Number.isFinite(value) || value <= 0) {
    logMetaCapi("warn", {
      event_name: "Purchase",
      event: "purchase_skipped",
      reason: "invalid_value",
      event_id_masked: maskEventId(eventId),
      success: false,
    });
    return { ok: false, skipped: true, reason: "invalid_value" };
  }

  const pixelId = cleanText(env.META_PIXEL_ID, 64);
  const accessToken = String(env.META_CAPI_ACCESS_TOKEN || "");
  const testEventCode = cleanText(input.testEventCode || env.META_TEST_EVENT_CODE, 64);

  let userData;
  try {
    userData = await buildMetaUserData({
      clientIpAddress: input.clientIpAddress,
      clientUserAgent: input.clientUserAgent,
      fbp: input.fbp,
      fbc: input.fbc,
      eventId: eventId,
      customer: input.customer || {},
    });
  } catch (error) {
    logMetaCapi("warn", {
      event_name: "Purchase",
      event: "purchase_skipped",
      reason: "user_data_build_failed",
      event_id_masked: maskEventId(eventId),
      success: false,
    });
    userData = {};
  }

  const eventPayload = buildPurchasePayload({
    eventId: eventId,
    eventTime: input.eventTime,
    eventSourceUrl: input.eventSourceUrl,
    currency: currency,
    value: value,
    orderId: input.orderId,
    contentId: input.contentId,
    contentName: input.contentName,
    userData: userData,
  });

  const requestBody = {
    data: [eventPayload],
    access_token: accessToken,
  };

  if (testEventCode) {
    requestBody.test_event_code = testEventCode;
  }

  const url =
    "https://graph.facebook.com/" +
    GRAPH_API_VERSION +
    "/" +
    encodeURIComponent(pixelId) +
    "/events";

  const fetchImpl = input.fetchImpl || fetch;

  try {
    const response = await fetchImpl(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const responseText = await response.text();
    let responseJson = null;
    try {
      responseJson = responseText ? JSON.parse(responseText) : null;
    } catch {
      responseJson = null;
    }

    if (!response.ok) {
      logMetaCapi("error", {
        event_name: "Purchase",
        event: "purchase_failed",
        event_id_masked: maskEventId(eventId),
        success: false,
        status: response.status,
        meta_trace_id: responseJson && responseJson.fbtrace_id ? responseJson.fbtrace_id : null,
        meta_error:
          responseJson && responseJson.error
            ? {
                message: responseJson.error.message,
                type: responseJson.error.type,
                code: responseJson.error.code,
              }
            : "meta_api_error",
      });
      return {
        ok: false,
        skipped: false,
        reason: "meta_api_error",
        status: response.status,
      };
    }

    logMetaCapi("info", {
      event_name: "Purchase",
      event: "purchase_sent",
      event_id_masked: maskEventId(eventId),
      success: true,
      status: response.status,
      meta_trace_id: responseJson && responseJson.fbtrace_id ? responseJson.fbtrace_id : null,
      events_received:
        responseJson && typeof responseJson.events_received === "number"
          ? responseJson.events_received
          : null,
    });

    return {
      ok: true,
      skipped: false,
      status: response.status,
      eventsReceived:
        responseJson && typeof responseJson.events_received === "number"
          ? responseJson.events_received
          : 1,
      fbtraceId: responseJson && responseJson.fbtrace_id ? responseJson.fbtrace_id : null,
    };
  } catch (error) {
    logMetaCapi("error", {
      event_name: "Purchase",
      event: "purchase_failed",
      event_id_masked: maskEventId(eventId),
      success: false,
      message: error && error.message ? error.message : "network_error",
    });
    return { ok: false, skipped: false, reason: "network_error" };
  }
}
