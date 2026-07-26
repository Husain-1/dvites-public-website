(function (global) {
  "use strict";

  var WHATSAPP_DVITES = "917415301709";
  var EMAIL_DVITES = "infodvites@gmail.com";
  var orders = [];
  var selectedOrderId = null;
  var currentRange = "all";
  var currentStatus = "";
  var searchQuery = "";
  var refreshTimer = null;
  var deletingOrderId = null;

  function customerLine(order) {
    var name = (order.customer_name || "").trim();
    var email = (order.customer_email || "").trim();
    if (name && email && name.toLowerCase() === email.toLowerCase()) return email;
    if (name) return name;
    return email || "—";
  }

  function renderOrderActions(order, compact) {
    var id = order.id;
    var menu =
      '<div class="admin-order-menu">' +
        '<button type="button" class="admin-icon-btn admin-order-menu-toggle" title="More actions" aria-label="More actions" data-order-id="' + id + '">' +
          global.DvitesAdmin.iconSvg("more") +
        '</button>' +
        '<div class="admin-order-menu-panel is-hidden" data-order-menu="' + id + '">' +
          '<button type="button" class="admin-order-delete" data-order-id="' + id + '">Delete order</button>' +
        '</div>' +
      '</div>';
    return (
      '<div class="admin-order-actions-row">' +
        '<button class="admin-btn admin-btn-primary admin-order-view" type="button" data-order-id="' + id + '">' + (compact ? "View Order" : "View") + '</button>' +
        '<div class="admin-order-icon-actions">' +
          '<a class="admin-icon-btn" href="' + buildCustomerWhatsApp(order) + '" target="_blank" rel="noopener" title="WhatsApp">' + global.DvitesAdmin.iconSvg("whatsapp") + '</a>' +
          '<a class="admin-icon-btn" href="' + buildCustomerEmail(order) + '" title="Email customer">' + global.DvitesAdmin.iconSvg("mail") + '</a>' +
          menu +
        '</div>' +
      '</div>'
    );
  }

  function contentEl() {
    return document.getElementById("admin-content");
  }

  function orderRef(order) {
    if (!order) return "—";
    return order.display_id ? "#" + order.display_id : (order.id || "—");
  }

  function buildCustomerWhatsApp(order) {
    var message = [
      "Hi " + (order.customer_name || "there") + ",",
      "",
      "Thank you for your Dvites order. Please share your wedding details, photos, and events so we can customize your invitation.",
      "",
      "Order ID: " + orderRef(order),
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
      "Order ID: " + orderRef(order),
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
      "display_id", "id", "created_at", "template_name", "template_slug", "amount", "currency",
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

  function paymentLabel(order) {
    if (order.payment_status) return order.payment_status;
    if (order.razorpay_payment_id) return "Paid";
    return "—";
  }

  function renderOrderMobileCard(order) {
    return (
      '<article class="admin-order-card" data-order-id="' + order.id + '">' +
        '<div class="admin-order-card-top">' +
          '<span class="admin-pill admin-pill-id">' + orderRef(order) + '</span>' +
          '<div class="admin-order-card-badges">' +
            '<span class="admin-pill admin-pill-paid">' + paymentLabel(order) + '</span>' +
            '<span class="admin-pill">' + (order.customization_status || "New") + '</span>' +
          '</div>' +
        '</div>' +
        '<h3 class="admin-order-card-title">' + (order.template_name || "—") + '</h3>' +
        '<p class="admin-order-card-amount">' + global.DvitesAdmin.formatMoney(order.amount) + '</p>' +
        '<p class="admin-order-card-customer">' + customerLine(order) + '</p>' +
        (order.customer_email && customerLine(order) !== order.customer_email
          ? '<p class="admin-order-card-sub">' + order.customer_email + '</p>' : "") +
        (order.customer_phone ? '<p class="admin-order-card-sub">' + order.customer_phone + '</p>' : "") +
        '<p class="admin-order-card-date">' + global.DvitesAdmin.formatDate(order.created_at) + '</p>' +
        renderOrderActions(order, true) +
      '</article>'
    );
  }

  function selectOrder(orderId, scrollToDetail) {
    selectedOrderId = orderId;
    document.querySelectorAll(".admin-order-row").forEach(function (row) {
      row.classList.toggle("is-selected", row.getAttribute("data-order-id") === orderId);
    });
    var order = orders.find(function (o) { return o.id === orderId; });
    var detail = document.getElementById("orders-detail");
    if (detail) detail.innerHTML = renderDetail(order || null);
    if (scrollToDetail && detail) {
      detail.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    bindDetailActions();
  }

  function renderDetail(order) {
    if (!order) {
      return '<div class="admin-panel"><p class="admin-status">Select an order to view details.</p></div>';
    }
    return (
      '<div class="admin-panel">' +
        '<h2>Order Details</h2>' +
        '<dl class="admin-detail-grid">' +
          '<div class="admin-detail-row"><dt>Order ID</dt><dd><span class="admin-pill admin-pill-id">' + orderRef(order) + '</span></dd></div>' +
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
        '<div class="admin-actions admin-detail-actions">' +
          '<a class="admin-btn admin-btn-success" href="' + buildCustomerWhatsApp(order) + '" target="_blank" rel="noopener">WhatsApp</a>' +
          '<a class="admin-btn" href="' + buildCustomerEmail(order) + '">Email</a>' +
          '<button class="admin-btn admin-btn-danger admin-order-delete" type="button" data-order-id="' + order.id + '">Delete</button>' +
        '</div>' +
      '</div>'
    );
  }

  function deleteOrder(orderId) {
    if (deletingOrderId) return;
    var order = orders.find(function (o) { return o.id === orderId; });
    var label = order ? orderRef(order) : "this order";
    global.DvitesAdmin.confirmDialog({
      title: "Delete order " + label + "?",
      message: "This permanently removes this order from Dvites Admin. Order, revenue, and customer totals will be recalculated.",
      confirmLabel: "Delete order",
    }).then(function (ok) {
      if (!ok) return;
      deletingOrderId = orderId;
      document.querySelectorAll('.admin-order-delete[data-order-id="' + orderId + '"]').forEach(function (btn) {
        btn.disabled = true;
        btn.textContent = "Deleting…";
      });
      global.DvitesAdmin.adminFetch("/api/orders?id=" + encodeURIComponent(orderId), { method: "DELETE" })
        .then(function (res) {
          return res.json().then(function (data) {
            if (!res.ok || data.error || !data.ok) {
              throw new Error(data.error || "Could not delete order. Nothing was changed.");
            }
            if (selectedOrderId === orderId) selectedOrderId = null;
            global.DvitesAdmin.showToast("Order " + label + " deleted");
            loadOrders();
          });
        })
        .catch(function (error) {
          global.DvitesAdmin.showToast(error.message || "Could not delete order.", "error");
        })
        .finally(function () {
          deletingOrderId = null;
        });
    });
  }

  function bindDetailActions() {
    document.querySelectorAll("#orders-detail .admin-order-delete[data-order-id]").forEach(function (deleteBtn) {
      deleteBtn.addEventListener("click", function () {
        deleteOrder(deleteBtn.getAttribute("data-order-id"));
      });
    });
  }

  function renderOrders(data) {
    orders = data.orders || [];
    var summary = data.summary || {};
    var el = contentEl();
    if (!el) return;

    el.innerHTML =
      '<div class="admin-grid">' +
        '<div class="admin-card"><div class="admin-card-label">Total orders</div><div class="admin-card-value">' + (summary.total_orders || 0) + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Total revenue</div><div class="admin-card-value admin-card-value-gold">' + global.DvitesAdmin.formatMoney(summary.total_revenue) + '</div></div>' +
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
        '<div class="admin-order-cards admin-mobile-only" id="orders-mobile-list"></div>' +
        '<div class="admin-table-wrap admin-desktop-only">' +
          '<table class="admin-table">' +
            '<thead><tr><th>Order</th><th>Date</th><th>Template</th><th>Customer</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead>' +
            '<tbody id="orders-table-body"></tbody>' +
          '</table>' +
        '</div>' +
      '</div>' +
      '<div id="orders-detail">' + renderDetail(null) + '</div>';

    document.getElementById("orders-range").value = currentRange;
    document.getElementById("orders-status").value = currentStatus;

    var tbody = document.getElementById("orders-table-body");
    var mobileList = document.getElementById("orders-mobile-list");
    if (!orders.length) {
      if (tbody) tbody.innerHTML = '<tr><td colspan="7">No orders found for this period.</td></tr>';
      if (mobileList) mobileList.innerHTML = '<p class="admin-status">No orders found.</p>';
    } else {
      if (tbody) {
        tbody.innerHTML = orders.map(function (order) {
          return (
            '<tr data-order-id="' + order.id + '" class="admin-order-row' + (selectedOrderId === order.id ? ' is-selected' : '') + '">' +
              '<td><span class="admin-pill admin-pill-id">' + orderRef(order) + '</span></td>' +
              '<td>' + global.DvitesAdmin.formatDate(order.created_at) + '</td>' +
              '<td>' + (order.template_name || "—") + '</td>' +
              '<td>' + customerLine(order) + '</td>' +
              '<td>' + global.DvitesAdmin.formatMoney(order.amount) + '</td>' +
              '<td><span class="admin-pill admin-pill-paid">' + paymentLabel(order) + '</span> · ' + (order.customization_status || "New") + '</td>' +
              '<td class="admin-table-actions">' +
                '<a class="admin-icon-btn" href="' + buildCustomerWhatsApp(order) + '" target="_blank" rel="noopener" title="WhatsApp">' + global.DvitesAdmin.iconSvg("whatsapp") + '</a>' +
                '<a class="admin-icon-btn" href="' + buildCustomerEmail(order) + '" title="Email customer">' + global.DvitesAdmin.iconSvg("mail") + '</a>' +
                '<button type="button" class="admin-icon-btn admin-order-delete" data-order-id="' + order.id + '" title="Delete order">' + global.DvitesAdmin.iconSvg("trash") + '</button>' +
              '</td>' +
            '</tr>'
          );
        }).join("");
      }
      if (mobileList) {
        mobileList.innerHTML = orders.map(renderOrderMobileCard).join("");
      }
    }

    bindOrdersUi();
    if (selectedOrderId) {
      var selected = orders.find(function (o) { return o.id === selectedOrderId; });
      document.getElementById("orders-detail").innerHTML = renderDetail(selected || null);
      bindDetailActions();
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
    document.querySelectorAll(".admin-order-row[data-order-id]").forEach(function (row) {
      row.addEventListener("click", function (event) {
        if (event.target.closest(".admin-icon-btn") || event.target.closest(".admin-order-menu")) return;
        selectOrder(row.getAttribute("data-order-id"), false);
      });
    });
    document.querySelectorAll(".admin-order-view[data-order-id]").forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.stopPropagation();
        selectOrder(button.getAttribute("data-order-id"), true);
      });
    });
    document.querySelectorAll(".admin-order-delete[data-order-id]").forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        deleteOrder(button.getAttribute("data-order-id"));
      });
    });
    document.querySelectorAll(".admin-order-menu-toggle").forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.stopPropagation();
        var id = button.getAttribute("data-order-id");
        document.querySelectorAll(".admin-order-menu-panel").forEach(function (panel) {
          if (panel.getAttribute("data-order-menu") === id) {
            panel.classList.toggle("is-hidden");
          } else {
            panel.classList.add("is-hidden");
          }
        });
      });
    });
  }

  function loadOrders() {
    var el = contentEl();
    if (el && !el.querySelector(".admin-grid")) {
      el.innerHTML = global.DvitesAdmin.renderLoadingPanel("Loading orders…");
    }
    var url =
      "/api/orders?range=" + encodeURIComponent(currentRange) +
      "&search=" + encodeURIComponent(searchQuery);
    if (currentStatus) url += "&status=" + encodeURIComponent(currentStatus);

    global.DvitesAdmin.adminFetch(url)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.error) throw new Error(data.error);
        if (global.DvitesAdminSound) {
          global.DvitesAdminSound.ingestOrders(data.orders || [], true);
        }
        renderOrders(data);
      })
      .catch(function (error) {
        var el = contentEl();
        if (el) el.innerHTML = '<div class="admin-panel"><p class="admin-status">' + (error.message || 'Unable to load orders.') + '</p></div>';
      });
  }

  function startAutoRefresh() {
    if (refreshTimer) clearInterval(refreshTimer);
    refreshTimer = setInterval(function () {
      if (document.visibilityState === "visible") loadOrders();
    }, 45000);
  }

  function init() {
    if (!global.DvitesAdmin.ensureAuthShell("Orders", "orders")) return;
    loadOrders();
    startAutoRefresh();

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", function (event) {
        if (event.data && event.data.type === "DVITES_NEW_ORDER") {
          loadOrders();
        }
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(window);
