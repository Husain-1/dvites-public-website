(function (global) {
  "use strict";

  var EMAIL = "infodvites@gmail.com";

  function getParam(params, key) {
    return (params.get(key) || "").trim();
  }

  function showRow(rowId, valueId, value) {
    if (!value) return;
    var row = document.getElementById(rowId);
    var cell = document.getElementById(valueId);
    if (!row || !cell) return;
    cell.textContent = value;
    row.classList.remove("is-hidden");
  }

  function buildDetailsMessage(data) {
    var lines = [
      "Hi Dvites,",
      "",
      "My payment is complete. Please start my wedding invitation customization.",
      "",
    ];

    if (data.orderId) lines.push("Order ID: " + data.orderId);
    if (data.paymentId) lines.push("Payment ID: " + data.paymentId);
    if (data.name) lines.push("Name: " + data.name);
    if (data.email) lines.push("Email: " + data.email);
    if (data.phone) lines.push("Phone: " + data.phone);
    if (data.templateName) lines.push("Template: " + data.templateName);

    lines.push(
      "",
      "Please share next steps for wedding details, photos, and events.",
      "",
      "Thank you."
    );

    return lines.join("\n");
  }

  function initThankYouPage() {
    var params = new URLSearchParams(global.location.search);
    var data = {
      orderId: getParam(params, "order_id"),
      paymentId: getParam(params, "payment_id"),
      templateName: getParam(params, "template_name"),
      templateSlug: getParam(params, "template_slug"),
      name: getParam(params, "name"),
      email: getParam(params, "email"),
      phone: getParam(params, "phone"),
      orderSaved: getParam(params, "order_saved") !== "0",
    };

    var templateEl = document.getElementById("thank-you-template");
    if (templateEl) {
      templateEl.textContent = data.templateName || "Dvites Wedding Invitation";
    }

    showRow("thank-you-order-row", "thank-you-order-id", data.orderId);
    showRow("thank-you-payment-row", "thank-you-payment-id", data.paymentId);
    showRow("thank-you-name-row", "thank-you-name", data.name);
    showRow("thank-you-email-row", "thank-you-email", data.email);
    showRow("thank-you-phone-row", "thank-you-phone", data.phone);

    if (!data.orderSaved) {
      var note = document.getElementById("thank-you-save-note");
      if (note) {
        note.textContent =
          "Your payment is confirmed. If your order reference is missing, please include your payment ID when contacting us.";
        note.classList.remove("is-hidden");
      }
    }

    var message = buildDetailsMessage(data);
    var whatsappBtn = document.getElementById("thank-you-whatsapp");
    var emailBtn = document.getElementById("thank-you-email");

    if (whatsappBtn) {
      whatsappBtn.href = "https://wa.me/?text=" + encodeURIComponent(message);
    }

    if (emailBtn) {
      var subject = "Wedding Details — " + (data.templateName || "Dvites Order");
      emailBtn.href =
        "mailto:" +
        EMAIL +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(message);
    }
  }

  global.DvitesThankYouInit = initThankYouPage;
})(window);
