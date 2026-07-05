(function (global) {
  "use strict";

  /* PAYMENT CONFIG */
  var API_CREATE_ORDER = "/api/create-order";
  var API_VERIFY_PAYMENT = "/api/verify-payment";
  var TEST_PRICE_PAISE = 500;
  var PRICE_PAISE = 149900;
  var PARTNER_MIN = 3;
  var PARTNER_MAX = 5;
  var PARTNER_DISCOUNT = 0.05;
  var RAZORPAY_THEME_COLOR = "#7b1730";
  var SUCCESS_MESSAGE =
    "Payment received. Please WhatsApp/share your wedding details. We will customize your invitation within 24 hours.";
  var FAIL_MESSAGE =
    "Payment verification failed. Please contact infodvites@gmail.com.";
  /* END PAYMENT CONFIG */

  function calculatePartnerTotalPaise(count) {
    var subtotal = count * (PRICE_PAISE / 100);
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
  function openRazorpayCheckout(orderData, templateName) {
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
          }).then(function (result) {
            if (result.success) {
              window.alert(SUCCESS_MESSAGE);
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
      checkout.open();
    });
  }
  /* END RAZORPAY CHECKOUT */

  function startCheckout(options) {
    var templateName = (options && options.templateName) || "Dvites Wedding Invitation";
    var amountPaise = (options && options.amountPaise) || PRICE_PAISE;

    return createOrder({
      templateName: templateName,
      amount: amountPaise,
    }).then(function (orderData) {
      return ensureRazorpayLoaded().then(function () {
        return openRazorpayCheckout(orderData, templateName);
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
        amountPaise: Number(buyBtn && buyBtn.dataset.amountPaise) || PRICE_PAISE,
      };
    });

    document.querySelectorAll("[data-buy-now]").forEach(function (element) {
      bindPaymentElement(element, function () {
        return {
          templateName: element.getAttribute("data-template-name") || "Dvites Wedding Invitation",
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
        amountPaise: Number(card && card.getAttribute("data-amount-paise")) || PRICE_PAISE,
      });
    });
  }

  global.DvitesPayment = {
    PRICE_PAISE: PRICE_PAISE,
    PARTNER_MIN: PARTNER_MIN,
    PARTNER_MAX: PARTNER_MAX,
    TEST_PRICE_PAISE: TEST_PRICE_PAISE,
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
