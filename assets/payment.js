(function (global) {
  "use strict";

  /* PAYMENT CONFIG */
  var API_CREATE_ORDER = "/api/create-order";
  var API_VERIFY_PAYMENT = "/api/verify-payment";
  var THANK_YOU_PATH = "/thank-you.html";
  var PRICE_PAISE = 119900;
  var PARTNER_MIN = 3;
  var PARTNER_MAX = 5;
  var PARTNER_DISCOUNT = 0.05;
  var RAZORPAY_THEME_COLOR = "#7b1730";
  var FAIL_MESSAGE =
    "Payment verification failed. Please contact infodvites@gmail.com.";
  /* END PAYMENT CONFIG */

  function calculatePartnerTotalPaise(subtotalPaise) {
    var subtotal = subtotalPaise / 100;
    var discount = Math.round(subtotal * PARTNER_DISCOUNT);
    return Math.round((subtotal - discount) * 100);
  }

  function ensureRazorpayLoaded() {
    return new Promise(function (resolve, reject) {
      if (global.Razorpay) {
        resolve();
        return;
      }

      var existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (existing) {
        existing.addEventListener("load", function () { resolve(); });
        existing.addEventListener("error", function () { reject(new Error("Unable to load Razorpay Checkout.")); });
        return;
      }

      var script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = function () { resolve(); };
      script.onerror = function () { reject(new Error("Unable to load Razorpay Checkout.")); };
      document.head.appendChild(script);
    });
  }

  function buildThankYouUrl(result, checkoutContext) {
    var params = new URLSearchParams();

    if (result.order_id) params.set("order_id", result.order_id);
    if (result.razorpay_payment_id) params.set("payment_id", result.razorpay_payment_id);

    var templateName = result.template_name || checkoutContext.templateName;
    var templateSlug = result.template_slug || checkoutContext.templateSlug;
    var customerName = result.customer_name || checkoutContext.customerName;
    var customerEmail = result.customer_email || checkoutContext.customerEmail;
    var customerPhone = result.customer_phone || checkoutContext.customerPhone;

    if (templateName) params.set("template_name", templateName);
    if (templateSlug) params.set("template_slug", templateSlug);
    if (customerName) params.set("name", customerName);
    if (customerEmail) params.set("email", customerEmail);
    if (customerPhone) params.set("phone", customerPhone);
    if (result.order_saved === false) params.set("order_saved", "0");

    return THANK_YOU_PATH + "?" + params.toString();
  }

  /* CREATE ORDER CALL */
  function createOrder(payload) {
    return fetch(API_CREATE_ORDER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(function (response) {
      return response.json().then(function (data) {
        if (!response.ok) {
          throw new Error((data && data.error) || "Unable to create order.");
        }
        return data;
      });
    });
  }
  /* END CREATE ORDER CALL */

  /* VERIFY PAYMENT CALL */
  function verifyPayment(payload) {
    return fetch(API_VERIFY_PAYMENT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(function (response) {
      return response.json().then(function (data) {
        if (!response.ok) {
          throw new Error((data && data.error) || "Unable to verify payment.");
        }
        return data;
      });
    });
  }
  /* END VERIFY PAYMENT CALL */

  /* RAZORPAY CHECKOUT */
  function openRazorpayCheckout(orderData, checkoutContext) {
    var templateName = checkoutContext.templateName;
    var priceInRupees = checkoutContext.amountRupees;

    return new Promise(function (resolve, reject) {
      var options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: "INR",
        name: "Dvites",
        description: templateName,
        order_id: orderData.order_id,
        theme: {
          color: RAZORPAY_THEME_COLOR,
        },
        handler: function (response) {
          verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            template_slug: checkoutContext.templateSlug || "",
            template_name: checkoutContext.templateName || "",
            amount: checkoutContext.amountRupees,
            currency: "INR",
            customer_name: checkoutContext.customerName || "",
            customer_email: checkoutContext.customerEmail || "",
            customer_phone: checkoutContext.customerPhone || "",
            notes: checkoutContext.notes || "",
          }).then(function (result) {
            if (result.success) {
              if (typeof global.dvitesTrackPurchase === "function") {
                global.dvitesTrackPurchase(
                  templateName,
                  priceInRupees,
                  response.razorpay_payment_id
                );
              }
              if (typeof global.dvitesTrack === "function") {
                global.dvitesTrack("payment_success", {
                  template_slug: checkoutContext.templateSlug || "",
                  template_name: checkoutContext.templateName || "",
                });
              }
              global.location.href = buildThankYouUrl(result, checkoutContext);
              resolve(result);
            } else {
              window.alert(FAIL_MESSAGE);
              reject(new Error("Verification failed"));
            }
          }).catch(function () {
            window.alert(FAIL_MESSAGE);
            reject(new Error("Verification failed"));
          });
        },
        modal: {
          ondismiss: function () {
            reject(new Error("Payment cancelled"));
          },
        },
      };

      var checkout = new global.Razorpay(options);
      checkout.on("payment.failed", function () {
        window.alert(FAIL_MESSAGE);
        reject(new Error("Payment failed"));
      });
      if (typeof global.dvitesTrack === "function") {
        global.dvitesTrack("checkout_open", {
          template_slug: checkoutContext.templateSlug || "",
          template_name: checkoutContext.templateName || "",
        });
      }
      checkout.open();
    });
  }
  /* END RAZORPAY CHECKOUT */

  function normalizeCheckoutContext(options) {
    var amountPaise = (options && options.amountPaise) || PRICE_PAISE;
    return {
      templateName: (options && options.templateName) || "Dvites Wedding Invitation",
      templateSlug: (options && options.templateSlug) || "",
      amountPaise: amountPaise,
      amountRupees: amountPaise / 100,
      customerName: (options && options.customerName) || "",
      customerEmail: (options && options.customerEmail) || "",
      customerPhone: (options && options.customerPhone) || "",
      notes: (options && options.notes) || "",
    };
  }

  function startCheckout(options) {
    var checkoutContext = normalizeCheckoutContext(options);

    if (typeof global.dvitesTrackInitiateCheckout === "function") {
      global.dvitesTrackInitiateCheckout(
        checkoutContext.templateName,
        checkoutContext.amountRupees
      );
    }

    return createOrder({
      templateName: checkoutContext.templateName,
      templateSlug: checkoutContext.templateSlug,
      amount: checkoutContext.amountPaise,
    }).then(function (orderData) {
      return ensureRazorpayLoaded().then(function () {
        return openRazorpayCheckout(orderData, checkoutContext);
      });
    }).catch(function (error) {
      if (error && error.message === "Payment cancelled") return;
      window.alert(error.message || "Unable to start payment. Please try again.");
    });
  }

  function bindPaymentElement(element, getOptions) {
    if (!element || element.dataset.paymentBound === "1") return;
    element.dataset.paymentBound = "1";
    element.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      startCheckout(getOptions());
    });
  }

  function initPayment() {
    bindPaymentElement(document.getElementById("modal-buy"), function () {
      var titleEl = document.getElementById("modal-title");
      var buyBtn = document.getElementById("modal-buy");
      return {
        templateName: (titleEl && titleEl.textContent.trim()) || "Dvites Wedding Invitation",
        templateSlug: (buyBtn && buyBtn.dataset.templateSlug) || "",
        amountPaise: Number(buyBtn && buyBtn.dataset.amountPaise) || PRICE_PAISE,
      };
    });

    document.querySelectorAll("[data-buy-now]").forEach(function (element) {
      bindPaymentElement(element, function () {
        return {
          templateName: element.getAttribute("data-template-name") || "Dvites Wedding Invitation",
          templateSlug: element.getAttribute("data-template-slug") || "general",
          amountPaise: Number(element.getAttribute("data-amount-paise")) || PRICE_PAISE,
        };
      });
    });

    document.addEventListener("click", function (event) {
      var button = event.target.closest(".btn-customize");
      if (!button) return;
      event.preventDefault();
      event.stopPropagation();
      var card = button.closest(".card[data-title]");
      startCheckout({
        templateName: (card && card.getAttribute("data-title")) || "Dvites Wedding Invitation",
        templateSlug: (card && card.getAttribute("data-id")) || "",
        amountPaise: Number(card && card.getAttribute("data-amount-paise")) || PRICE_PAISE,
      });
    });
  }

  global.DvitesPayment = {
    PRICE_PAISE: PRICE_PAISE,
    PARTNER_MIN: PARTNER_MIN,
    PARTNER_MAX: PARTNER_MAX,
    calculatePartnerTotalPaise: calculatePartnerTotalPaise,
    startCheckout: startCheckout,
    init: initPayment,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPayment);
  } else {
    initPayment();
  }
})(window);
