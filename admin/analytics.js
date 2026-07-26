(function (global) {
  "use strict";

  var currentRange = "today";
  var customFrom = "";
  var customTo = "";

  var RANGE_LABELS = {
    today: "Today",
    yesterday: "Yesterday",
    week: "Last 7 days",
    "30d": "Last 30 days",
    month: "This month",
    custom: "Custom",
  };

  function contentEl() {
    return document.getElementById("admin-content");
  }

  function renderFilters() {
    var customBlock = currentRange === "custom"
      ? '<div class="admin-analytics-custom">' +
          '<label>From <input class="admin-input" type="date" id="analytics-from" value="' + customFrom + '" /></label>' +
          '<label>To <input class="admin-input" type="date" id="analytics-to" value="' + customTo + '" /></label>' +
          '<button class="admin-btn admin-btn-primary" type="button" id="analytics-apply-custom">Apply</button>' +
        '</div>'
      : "";

    return (
      '<div class="admin-analytics-toolbar">' +
        '<label class="admin-range-label" for="analytics-range-select">Date range</label>' +
        '<select class="admin-select admin-range-select" id="analytics-range-select">' +
          Object.keys(RANGE_LABELS).map(function (range) {
            return '<option value="' + range + '"' + (currentRange === range ? " selected" : "") + '>' + RANGE_LABELS[range] + '</option>';
          }).join("") +
        '</select>' +
        customBlock +
      '</div>'
    );
  }

  function renderBarChart(title, rows) {
    if (!rows || !rows.length) {
      return '<div class="admin-panel"><h2>' + title + '</h2><p class="admin-status">No data yet.</p></div>';
    }
    var max = rows[0].count || 1;
    var html = '<div class="admin-panel admin-panel-chart"><h2>' + title + '</h2><div class="admin-bar-chart">';
    rows.forEach(function (row) {
      var width = Math.max(6, Math.round((row.count / max) * 100));
      html +=
        '<div class="admin-bar-row">' +
          '<span class="admin-bar-label" title="' + row.label.replace(/"/g, "&quot;") + '">' + row.label + '</span>' +
          '<div class="admin-bar-track"><div class="admin-bar-fill" style="width:' + width + '%"></div></div>' +
          '<strong class="admin-bar-count">' + row.count + '</strong>' +
        '</div>';
    });
    return html + '</div></div>';
  }

  function renderDashboard(data) {
    var el = contentEl();
    if (!el) return;

    el.innerHTML =
      renderFilters() +
      '<div class="admin-grid admin-grid-analytics">' +
        '<div class="admin-card"><div class="admin-card-label"><span class="admin-live-dot"></span>Live now</div><div class="admin-card-value">' + data.live_visitors + '</div><div class="admin-card-note">Active in last 60 seconds</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Visitors today</div><div class="admin-card-value">' + data.visitors_today + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Visitors yesterday</div><div class="admin-card-value">' + data.visitors_yesterday + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Visitors this week</div><div class="admin-card-value">' + data.visitors_week + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Visitors this month</div><div class="admin-card-value">' + data.visitors_month + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Visitors in range</div><div class="admin-card-value">' + data.visitors_in_range + '</div><div class="admin-card-note">' + data.range + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Page views</div><div class="admin-card-value">' + data.page_views + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Modal opens</div><div class="admin-card-value">' + data.modal_opens + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Demo clicks</div><div class="admin-card-value">' + data.demo_clicks + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Buy clicks</div><div class="admin-card-value">' + data.buy_clicks + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Checkout opens</div><div class="admin-card-value">' + data.checkout_opens + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Payment successes</div><div class="admin-card-value">' + data.payment_successes + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Conversion rate</div><div class="admin-card-value">' + data.conversion_rate + '%</div><div class="admin-card-note">Payments / checkout opens</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Orders in range</div><div class="admin-card-value">' + data.orders_count + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Revenue in range</div><div class="admin-card-value admin-card-value-gold">' + global.DvitesAdmin.formatMoney(data.revenue) + '</div></div>' +
      '</div>' +
      renderBarChart('Page-wise visits', data.page_breakdown) +
      renderBarChart('Template-wise views', data.template_breakdown);

    bindFilters();
  }

  function loadAnalytics() {
    var el = contentEl();
    if (el) el.innerHTML = global.DvitesAdmin.renderLoadingPanel("Loading analytics…");

    var url = '/api/analytics?range=' + encodeURIComponent(currentRange);
    if (currentRange === 'custom') {
      url += '&from=' + encodeURIComponent(customFrom) + '&to=' + encodeURIComponent(customTo);
    }
    global.DvitesAdmin.adminFetch(url)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.error) throw new Error(data.error);
        renderDashboard(data);
      })
      .catch(function (error) {
        var target = contentEl();
        if (target) {
          target.innerHTML =
            '<div class="admin-panel">' +
              '<p class="admin-status">' + (error.message || 'Could not load analytics.') + '</p>' +
              '<button class="admin-btn admin-btn-primary" type="button" id="analytics-retry">Retry</button>' +
            '</div>';
          var retry = document.getElementById("analytics-retry");
          if (retry) retry.addEventListener("click", loadAnalytics);
        }
      });
  }

  function bindFilters() {
    var select = document.getElementById("analytics-range-select");
    if (select) {
      select.addEventListener("change", function () {
        currentRange = select.value;
        if (currentRange !== "custom") {
          loadAnalytics();
          return;
        }
        var el = contentEl();
        if (el && el.querySelector(".admin-grid-analytics")) {
          var toolbar = el.querySelector(".admin-analytics-toolbar");
          if (toolbar) toolbar.outerHTML = renderFilters();
          bindFilters();
        } else {
          el.innerHTML = renderFilters() + global.DvitesAdmin.renderLoadingPanel("Select dates and tap Apply.");
          bindFilters();
        }
      });
    }

    var apply = document.getElementById("analytics-apply-custom");
    if (apply) {
      apply.addEventListener("click", function () {
        customFrom = (document.getElementById("analytics-from").value || "").trim();
        customTo = (document.getElementById("analytics-to").value || "").trim();
        currentRange = "custom";
        loadAnalytics();
      });
    }
  }

  function init() {
    if (!global.DvitesAdmin.ensureAuthShell('Analytics', 'analytics')) return;
    loadAnalytics();
    setInterval(loadAnalytics, 30000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);
