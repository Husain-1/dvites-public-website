import assert from "node:assert/strict";
import {
  buildMetaUserData,
  buildPurchasePayload,
  isMetaCapiConfigured,
  normalizeEmail,
  normalizePhone,
  paiseToRupees,
  rupeesFromTrustedSources,
  sendMetaPurchase,
  sha256Hex,
} from "../functions/lib/meta-capi.js";

async function testEmailNormalizationAndHashing() {
  assert.equal(normalizeEmail("  Test@Example.COM "), "test@example.com");
  assert.equal(normalizeEmail("invalid"), null);
  const hash = await sha256Hex("test@example.com");
  assert.match(hash, /^[a-f0-9]{64}$/);
}

async function testPhoneNormalizationAndHashing() {
  assert.equal(normalizePhone("+91 74153-01709"), "917415301709");
  assert.equal(normalizePhone("7415301709"), "917415301709");
  assert.equal(normalizePhone("abc"), null);
}

function testPaiseToRupees() {
  assert.equal(paiseToRupees(79900), 799);
  assert.equal(paiseToRupees(99900), 999);
  assert.equal(rupeesFromTrustedSources({ paymentAmountPaise: 79900, orderAmountPaise: 99900 }), 799);
  assert.equal(rupeesFromTrustedSources({ paymentAmountPaise: null, orderAmountPaise: 79900 }), 799);
}

function testPayloadGeneration() {
  const payload = buildPurchasePayload({
    eventId: "pay_ABC123",
    eventTime: 1700000000,
    eventSourceUrl: "https://dvites.digicrave.in/wedding/curtains.html",
    currency: "INR",
    value: 799,
    orderId: "order_internal_1",
    contentId: "curtains",
    contentName: "Curtains",
    userData: { fbp: "fb.1.123.456" },
  });

  assert.equal(payload.event_name, "Purchase");
  assert.equal(payload.event_id, "pay_ABC123");
  assert.equal(payload.custom_data.value, 799);
  assert.equal(payload.custom_data.currency, "INR");
  assert.equal(payload.custom_data.content_ids[0], "curtains");
  assert.equal(payload.custom_data.num_items, 1);
}

async function testUserDataHashing() {
  const userData = await buildMetaUserData({
    fbp: "fb.1.123.456",
    fbc: "fb.1.123.abc",
    clientIpAddress: "203.0.113.10",
    clientUserAgent: "Mozilla/5.0",
    customer: {
      email: "buyer@example.com",
      phone: "7415301709",
      firstName: "Asha",
      lastName: "Sharma",
      country: "in",
      externalId: "order-123",
    },
  });

  assert.equal(userData.fbp, "fb.1.123.456");
  assert.equal(userData.client_ip_address, "203.0.113.10");
  assert.equal(userData.em.length, 1);
  assert.equal(userData.ph.length, 1);
  assert.equal(userData.fn.length, 1);
  assert.equal(userData.ln.length, 1);
  assert.equal(userData.country[0], await sha256Hex("in"));
}

async function testMissingEnvironmentSkips() {
  const result = await sendMetaPurchase({
    env: {},
    eventId: "pay_test_1",
    value: 799,
    currency: "INR",
  });
  assert.equal(result.skipped, true);
  assert.equal(result.reason, "missing_env_bindings");
}

async function testMetaApiFailureDoesNotThrow() {
  const result = await sendMetaPurchase({
    env: {
      META_PIXEL_ID: "27514697381530186",
      META_CAPI_ACCESS_TOKEN: "test-token-not-real",
    },
    eventId: "pay_test_2",
    value: 799,
    currency: "INR",
    contentName: "Curtains",
    orderId: "order_abc",
    fetchImpl: async function () {
      return {
        ok: false,
        status: 400,
        text: async function () {
          return JSON.stringify({
            error: { message: "Invalid OAuth access token.", type: "OAuthException", code: 190 },
            fbtrace_id: "trace123",
          });
        },
      };
    },
  });

  assert.equal(result.ok, false);
  assert.equal(result.reason, "meta_api_error");
}

async function testSuccessfulMetaMock() {
  const result = await sendMetaPurchase({
    env: {
      META_PIXEL_ID: "27514697381530186",
      META_CAPI_ACCESS_TOKEN: "test-token-not-real",
    },
    eventId: "pay_test_3",
    value: 799,
    currency: "INR",
    contentId: "curtains",
    contentName: "Curtains",
    orderId: "order_abc",
    fetchImpl: async function () {
      return {
        ok: true,
        status: 200,
        text: async function () {
          return JSON.stringify({ events_received: 1, fbtrace_id: "trace456" });
        },
      };
    },
  });

  assert.equal(result.ok, true);
  assert.equal(result.eventsReceived, 1);
}

function testBrowserServerEventIdParity() {
  const paymentId = "pay_RzSameId123";
  const browserOptions = { eventID: paymentId };
  const serverPayload = buildPurchasePayload({
    eventId: paymentId,
    value: 799,
    currency: "INR",
    contentName: "Curtains",
    orderId: "internal-order",
    userData: {},
  });
  assert.equal(browserOptions.eventID, serverPayload.event_id);
}

function testConfiguredEnv() {
  assert.equal(
    isMetaCapiConfigured({
      META_PIXEL_ID: "27514697381530186",
      META_CAPI_ACCESS_TOKEN: "secret",
    }),
    true
  );
  assert.equal(isMetaCapiConfigured({ META_PIXEL_ID: "27514697381530186" }), false);
}

async function run() {
  await testEmailNormalizationAndHashing();
  testPhoneNormalizationAndHashing();
  testPaiseToRupees();
  testPayloadGeneration();
  await testUserDataHashing();
  await testMissingEnvironmentSkips();
  await testMetaApiFailureDoesNotThrow();
  await testSuccessfulMetaMock();
  testBrowserServerEventIdParity();
  testConfiguredEnv();
  console.log("meta-capi tests passed");
}

run().catch(function (error) {
  console.error(error);
  process.exit(1);
});
