(function (global) {
  "use strict";

  var WHATSAPP_DVITES = "917415301709";
  var EMAIL_DVITES = "infodvites@gmail.com";
  var orders = [];
  var selectedOrderId = null;
  var currentRange = "all";
  var currentStatus = "";
  var searchQuery = "";

  function contentEl() {
    return document.getElementById("admin-content");
  }

  function buildCustomerWhatsApp(order) {
    var message = [
      "Hi " + (order.customer_name || "there") + ",",
      "",
      "Thank you for your Dvites order. Please share your wedding details, photos, and events so we can customize your invitation.",
      "",
      "Order ID: " + (order.id || "—"),
      "Payment ID: " + (order.razorpay_payment_id || "—"),
      "Template: " + (order.template_name || "—"),
    ].join("\n");
    var phone = String(order.customer_phone || "").replace(/\D/g, "");
    if (!phone) return "https://wa.me/" + WHATSAPP_DVITES + "?text=" + encodeURIComponent(message);
    return "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
  }

  function buildCustomerEmail(order) {
    var message = [
      "Hi " + (order.customer_name || "there") + ",",
      "",
      "Thank you for your Dvites order. Please share your wedding details, photos, and events.",
      "",
      "Order ID: " + (order.id || "—"),
      "Payment ID: " + (order.razorpay_payment_id || "—"),
      "Template: " + (order.template_name || "—"),
    ].join("\n");
    var email = order.customer_email || EMAIL_DVITES;
    return (
      "mailto:" + email +
      "?subject=" + encodeURIComponent("Dvites — Wedding Details") +
      "&body=" + encodeURIComponent(message)
    );
  }

  function exportCsv(rows) {
    var headers = [
      "id", "created_at", "template_name", "template_slug", "amount", "currency",
      "payment_status", "customization_status", "customer_name", "customer_email",
      "customer_phone", "razorpay_payment_id", "razorpay_order_id"
    ];
    var lines = [headers.join(",")];
    rows.forEach(function (order) {
      lines.push(headers.map(function (key) {
        var value = order[key] == null ? "" : String(order[key]);
        return '"' + value.replace(/"/g, '""') + '"';
      }).join(","));
    });
    var blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "dvites-orders.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function renderDetail(order) {
    if (!order) {
      return '<div class="admin-panel"><p class="admin-status">Select an order to view details.</p></div>';
    }
    return (
      '<div class="admin-panel">' +
        '<h2>Order Details</h2>' +
        '<dl class="admin-detail-grid">' +
          '<div class="admin-detail-row"><dt>Order ID</dt><dd>' + (order.id || "—") + '</dd></div>' +
          '<div class="admin-detail-row"><dt>Created</dt><dd>' + global.DvitesAdmin.formatDate(order.created_at) + '</dd></div>' +
          '<div class="admin-detail-row"><dt>Template</dt><dd>' + (order.template_name || "—") + '</dd></div>' +
          '<div class="admin-detail-row"><dt>Amount</dt><dd>' + global.DvitesAdmin.formatMoney(order.amount) + '</dd></div>' +
          '<div class="admin-detail-row"><dt>Payment Status</dt><dd>' + (order.payment_status || "—") + '</dd></div>' +
          '<div class="admin-detail-row"><dt>Customization</dt><dd>' + (order.customization_status || "—") + '</dd></div>' +
          '<div class="admin-detail-row"><dt>Customer</dt><dd>' + (order.customer_name || "—") + '</dd></div>' +
          '<div class="admin-detail-row"><dt>Email</dt><dd>' + (order.customer_email || "—") + '</dd></div>' +
          '<div class="admin-detail-row"><dt>Phone</dt><dd>' + (order.customer_phone || "—") + '</dd></div>' +
          '<div class="admin-detail-row"><dt>Payment ID</dt><dd>' + (order.razorpay_payment_id || "—") + '</dd></div>' +
          '<div class="admin-detail-row"><dt>Notes</dt><dd>' + (order.notes || "—") + '</dd></div>' +
        '</dl>' +
        '<div class="admin-actions">' +
          '<a class="admin-btn admin-btn-success" href="' + buildCustomerWhatsApp(order) + '" target="_blank" rel="noopener">WhatsApp Follow-up</a>' +
          '<a class="admin-btn" href="' + buildCustomerEmail(order) + '">Email Follow-up</a>' +
        '</div>' +
      '</div>'
    );
  }

  function renderOrders(data) {
    orders = data.orders || [];
    var summary = data.summary || {};
    var el = contentEl();
    if (!el) return;

    el.innerHTML =
      '<div class="admin-grid">' +
        '<div class="admin-card"><div class="admin-card-label">Total orders</div><div class="admin-card-value">' + (summary.total_orders || 0) + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Total revenue</div><div class="admin-card-value">' + global.DvitesAdmin.formatMoney(summary.total_revenue) + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Today</div><div class="admin-card-value">' + (summary.today_orders || 0) + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">This week</div><div class="admin-card-value">' + (summary.week_orders || 0) + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">This month</div><div class="admin-card-value">' + (summary.month_orders || 0) + '</div></div>' +
      '</div>' +
      '<div class="admin-panel">' +
        '<div class="admin-filters">' +
          '<input class="admin-input" id="orders-search" placeholder="Search orders..." value="' + searchQuery.replace(/"/g, '&quot;') + '" />' +
          '<select class="admin-select" id="orders-range">' +
            '<option value="all">All time</option>' +
            '<option value="today">Today</option>' +
            '<option value="week">Last 7 days</option>' +
            '<option value="month">This month</option>' +
            '<option value="30d">Last 30 days</option>' +
          '</select>' +
          '<select class="admin-select" id="orders-status">' +
            '<option value="">All statuses</option>' +
            '<option value="New">New</option>' +
            '<option value="In Progress">In Progress</option>' +
            '<option value="Delivered">Delivered</option>' +
          '</select>' +
          '<button class="admin-btn admin-btn-primary" id="orders-refresh" type="button">Refresh</button>' +
          '<button class="admin-btn" id="orders-export" type="button">Export CSV</button>' +
        '</div>' +
        '<div class="admin-table-wrap">' +
          '<table class="admin-table">' +
            '<thead><tr><th>Date</th><th>Template</th><th>Customer</th><th>Amount</th><th>Status</th><th>Payment</th></tr></thead>' +
            '<tbody id="orders-table-body"></tbody>' +
          '</table>' +
        '</div>' +
      '</div>' +
      '<div id="orders-detail">' + renderDetail(null) + '</div>';

    document.getElementById("orders-range").value = currentRange;
    document.getElementById("orders-status").value = currentStatus;

    var tbody = document.getElementById("orders-table-body");
    if (!orders.length) {
      tbody.innerHTML = '<tr><td colspan="6">No orders found.</td></tr>';
    } else {
      tbody.innerHTML = orders.map(function (order) {
        return (
          '<tr data-order-id="' + order.id + '" style="cursor:pointer;">' +
            '<td>' + global.DvitesAdmin.formatDate(order.created_at) + '</td>' +
            '<td>' + (order.template_name || "—") + '</td>' +
            '<td>' + (order.customer_name || order.customer_email || "—") + '</td>' +
            '<td>' + global.DvitesAdmin.formatMoney(order.amount) + '</td>' +
            '<td><span class="admin-pill">' + (order.customization_status || "New") + '</span></td>' +
            '<td>' + (order.razorpay_payment_id || "—") + '</td>' +
          '</tr>'
        );
      }).join("");
    }

    bindOrdersUi();
    if (selectedOrderId) {
      var selected = orders.find(function (o) { return o.id === selectedOrderId; });
      document.getElementById("orders-detail").innerHTML = renderDetail(selected || null);
    }
  }

  function bindOrdersUi() {
    document.getElementById("orders-refresh").addEventListener("click", loadOrders);
    document.getElementById("orders-export").addEventListener("click", function () {
      exportCsv(orders);
    });
    document.getElementById("orders-search").addEventListener("input", function (event) {
      searchQuery = event.target.value.trim();
      loadOrders();
    });
    document.getElementById("orders-range").addEventListener("change", function (event) {
      currentRange = event.target.value;
      loadOrders();
    });
    document.getElementById("orders-status").addEventListener("change", function (event) {
      currentStatus = event.target.value;
      loadOrders();
    });
    document.querySelectorAll("[data-order-id]").forEach(function (row) {
      row.addEventListener("click", function () {
        selectedOrderId = row.getAttribute("data-order-id");
        var order = orders.find(function (o) { return o.id === selectedOrderId; });
        document.getElementById("orders-detail").innerHTML = renderDetail(order || null);
      });
    });
  }

  function loadOrders() {
    var url =
      "/api/orders?range=" + encodeURIComponent(currentRange) +
      "&search=" + encodeURIComponent(searchQuery);
    if (currentStatus) url += "&status=" + encodeURIComponent(currentStatus);

    global.DvitesAdmin.adminFetch(url)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.error) throw new Error(data.error);
        renderOrders(data);
      })
      .catch(function (error) {
        var el = contentEl();
        if (el) el.innerHTML = '<div class="admin-panel"><p class="admin-status">' + (error.message || 'Unable to load orders.') + '</p></div>';
      });
  }

  function init() {
    if (!global.DvitesAdmin.ensureAuthShell("Orders", "orders")) return;
    loadOrders();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(window);
