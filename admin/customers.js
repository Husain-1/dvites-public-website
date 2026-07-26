(function (global) {
  "use strict";

  var customers = [];
  var searchQuery = "";
  var sortKey = "last_order_at";
  var sortDir = -1;

  function contentEl() {
    return document.getElementById("admin-content");
  }

  function csvEscape(value) {
    var text = value == null ? "" : String(value);
    return '"' + text.replace(/"/g, '""') + '"';
  }

  function exportCustomersCsv(rows) {
    var headers = [
      "Customer Name", "Email", "Phone", "Total Orders", "Products Purchased",
      "Total Spent", "First Order Date", "Last Order Date", "Order IDs",
    ];
    var lines = [headers.join(",")];
    rows.forEach(function (c) {
      lines.push([
        csvEscape(c.name),
        csvEscape(c.email),
        csvEscape(c.phone),
        csvEscape(c.order_count),
        csvEscape((c.products || []).join("; ")),
        csvEscape(c.total_spent),
        csvEscape(c.first_order_at),
        csvEscape(c.last_order_at),
        csvEscape((c.display_ids || c.order_ids || []).join("; ")),
      ].join(","));
    });
    var blob = new Blob(["\uFEFF" + lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    var link = document.createElement("a");
    var stamp = new Date().toISOString().slice(0, 10);
    link.href = URL.createObjectURL(blob);
    link.download = "dvites-customers-" + stamp + ".csv";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function sortedCustomers(list) {
    var copy = list.slice();
    copy.sort(function (a, b) {
      var av = a[sortKey];
      var bv = b[sortKey];
      if (sortKey === "total_spent" || sortKey === "order_count") {
        av = Number(av || 0);
        bv = Number(bv || 0);
      } else {
        av = String(av || "");
        bv = String(bv || "");
      }
      if (av < bv) return -1 * sortDir;
      if (av > bv) return 1 * sortDir;
      return 0;
    });
    return copy;
  }

  function openCustomerDetail(customer) {
    var ordersHtml = (customer.orders || []).map(function (order) {
      return (
        '<li>' +
          '<strong>' + (order.template_name || "—") + '</strong> · ' +
          global.DvitesAdmin.formatMoney(order.amount) + ' · ' +
          global.DvitesAdmin.formatDate(order.created_at) +
          (order.display_id ? ' · #' + order.display_id : "") +
        '</li>'
      );
    }).join("");
    global.DvitesAdmin.openModal(
      customer.name || "Customer",
      '<dl class="admin-detail-grid">' +
        '<div class="admin-detail-row"><dt>Email</dt><dd>' + (customer.email || "—") + '</dd></div>' +
        '<div class="admin-detail-row"><dt>Phone</dt><dd>' + (customer.phone || "—") + '</dd></div>' +
        '<div class="admin-detail-row"><dt>Orders</dt><dd>' + customer.order_count + '</dd></div>' +
        '<div class="admin-detail-row"><dt>Total spent</dt><dd>' + global.DvitesAdmin.formatMoney(customer.total_spent) + '</dd></div>' +
        '<div class="admin-detail-row"><dt>Products</dt><dd>' + (customer.products || []).join(", ") + '</dd></div>' +
      '</dl>' +
      '<h3>Purchases</h3><ul class="admin-customer-orders">' + (ordersHtml || "<li>No orders</li>") + '</ul>',
      '<button type="button" class="admin-btn admin-btn-primary" id="customer-detail-close">Close</button>'
    );
    var closeBtn = document.getElementById("customer-detail-close");
    if (closeBtn) closeBtn.addEventListener("click", global.DvitesAdmin.closeModal);
  }

  function renderTable(list, summary) {
    var rows = sortedCustomers(list);
    var el = contentEl();
    if (!el) return;

    el.innerHTML =
      '<div class="admin-grid admin-grid-customers">' +
        '<div class="admin-card"><div class="admin-card-label">Total customers</div><div class="admin-card-value">' + (summary.total_customers || 0) + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">New this month</div><div class="admin-card-value">' + (summary.new_this_month || 0) + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Repeat customers</div><div class="admin-card-value">' + (summary.repeat_customers || 0) + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Customer revenue</div><div class="admin-card-value admin-card-value-gold">' + global.DvitesAdmin.formatMoney(summary.customer_revenue) + '</div></div>' +
      '</div>' +
      '<div class="admin-panel">' +
        '<div class="admin-filters">' +
          '<input class="admin-input" id="customers-search" placeholder="Search customers…" value="' + searchQuery.replace(/"/g, "&quot;") + '" />' +
          '<select class="admin-select" id="customers-sort">' +
            '<option value="last_order_at">Sort: Last order</option>' +
            '<option value="total_spent">Sort: Total spent</option>' +
            '<option value="order_count">Sort: Order count</option>' +
            '<option value="name">Sort: Name</option>' +
          '</select>' +
          '<button class="admin-btn admin-btn-primary" id="customers-export" type="button">Export CSV</button>' +
          '<button class="admin-btn" id="customers-refresh" type="button">Refresh</button>' +
        '</div>' +
        '<div class="admin-table-wrap">' +
          '<table class="admin-table">' +
            '<thead><tr><th>Customer</th><th>Email</th><th>Phone</th><th>Orders</th><th>Products</th><th>Total spent</th><th>Last order</th><th></th></tr></thead>' +
            '<tbody id="customers-table-body"></tbody>' +
          '</table>' +
        '</div>' +
      '</div>';

    document.getElementById("customers-sort").value = sortKey;
    var tbody = document.getElementById("customers-table-body");
    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="8">No customers yet.</td></tr>';
    } else {
      tbody.innerHTML = rows.map(function (c) {
        return (
          '<tr>' +
            '<td>' + (c.name || "—") + '</td>' +
            '<td>' + (c.email || "—") + '</td>' +
            '<td>' + (c.phone || "—") + '</td>' +
            '<td>' + c.order_count + '</td>' +
            '<td>' + (c.products || []).slice(0, 2).join(", ") + ((c.products || []).length > 2 ? "…" : "") + '</td>' +
            '<td>' + global.DvitesAdmin.formatMoney(c.total_spent) + '</td>' +
            '<td>' + global.DvitesAdmin.formatDate(c.last_order_at) + '</td>' +
            '<td><button type="button" class="admin-btn admin-btn-primary admin-customer-view" data-customer-id="' + c.id + '">View</button></td>' +
          '</tr>'
        );
      }).join("");
    }

    document.getElementById("customers-export").addEventListener("click", function () {
      exportCustomersCsv(rows);
    });
    document.getElementById("customers-refresh").addEventListener("click", loadCustomers);
    document.getElementById("customers-search").addEventListener("input", function (event) {
      searchQuery = event.target.value.trim();
      loadCustomers();
    });
    document.getElementById("customers-sort").addEventListener("change", function (event) {
      sortKey = event.target.value;
      renderTable(customers, window.__dvitesCustomerSummary || {});
    });
    document.querySelectorAll(".admin-customer-view").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-customer-id");
        var customer = customers.find(function (c) { return c.id === id; });
        if (customer) openCustomerDetail(customer);
      });
    });
  }

  function loadCustomers() {
    var el = contentEl();
    if (el && !el.querySelector(".admin-grid-customers")) {
      el.innerHTML = global.DvitesAdmin.renderLoadingPanel("Loading customers…");
    }
    var url = "/api/customers?search=" + encodeURIComponent(searchQuery);
    global.DvitesAdmin.adminFetch(url)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.error) throw new Error(data.error);
        customers = data.customers || [];
        window.__dvitesCustomerSummary = data.summary || {};
        renderTable(customers, data.summary || {});
      })
      .catch(function (error) {
        if (el) {
          el.innerHTML =
            '<div class="admin-panel"><p class="admin-status">' + (error.message || "Could not load customers.") + '</p>' +
            '<button class="admin-btn admin-btn-primary" type="button" id="customers-retry">Retry</button></div>';
          document.getElementById("customers-retry").addEventListener("click", loadCustomers);
        }
      });
  }

  function init() {
    if (!global.DvitesAdmin.ensureAuthShell("Customers", "customers")) return;
    loadCustomers();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(window);
