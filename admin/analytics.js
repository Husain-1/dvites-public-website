(function (global) {
  "use strict";

  var currentRange = "today";
  var customFrom = "";
  var customTo = "";

  function contentEl() {
    return document.getElementById("admin-content");
  }

  function renderFilters() {
    return (
      '<div class="admin-filters" id="analytics-filters">' +
        ['today', 'yesterday', 'week', '30d', 'month', 'custom'].map(function (range) {
          var label =
            range === 'today' ? 'Today' :
            range === 'yesterday' ? 'Yesterday' :
            range === 'week' ? 'Last 7 days' :
            range === '30d' ? 'Last 30 days' :
            range === 'month' ? 'This month' : 'Custom';
          return '<button class="admin-chip' + (currentRange === range ? ' is-active' : '') + '" type="button" data-range="' + range + '">' + label + '</button>';
        }).join('') +
        '<input class="admin-input" type="date" id="analytics-from" />' +
        '<input class="admin-input" type="date" id="analytics-to" />' +
        '<button class="admin-btn admin-btn-primary" type="button" id="analytics-apply-custom">Apply</button>' +
      '</div>'
    );
  }

  function renderBarChart(title, rows) {
    if (!rows || !rows.length) {
      return '<div class="admin-panel"><h2>' + title + '</h2><p class="admin-status">No data yet.</p></div>';
    }
    var max = rows[0].count || 1;
    var html = '<div class="admin-panel"><h2>' + title + '</h2><div class="admin-bar-chart">';
    rows.forEach(function (row) {
      var width = Math.max(6, Math.round((row.count / max) * 100));
      html +=
        '<div class="admin-bar-row">' +
          '<span>' + row.label + '</span>' +
          '<div class="admin-bar-track"><div class="admin-bar-fill" style="width:' + width + '%"></div></div>' +
          '<strong>' + row.count + '</strong>' +
        '</div>';
    });
    return html + '</div></div>';
  }

  function renderDashboard(data) {
    var el = contentEl();
    if (!el) return;

    el.innerHTML =
      renderFilters() +
      '<div class="admin-grid">' +
        '<div class="admin-card"><div class="admin-card-label"><span class="admin-live-dot"></span>Live now</div><div class="admin-card-value">' + data.live_visitors + '</div><div class="admin-card-note">Active in last 60 seconds</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Visitors today</div><div class="admin-card-value">' + data.visitors_today + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Visitors yesterday</div><div class="admin-card-value">' + data.visitors_yesterday + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Visitors this week</div><div class="admin-card-value">' + data.visitors_week + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Visitors this month</div><div class="admin-card-value">' + data.visitors_month + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Visitors in range</div><div class="admin-card-value">' + data.visitors_in_range + '</div><div class="admin-card-note">' + data.range + '</div></div>' +
      '</div>' +
      '<div class="admin-grid">' +
        '<div class="admin-card"><div class="admin-card-label">Page views</div><div class="admin-card-value">' + data.page_views + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Template views</div><div class="admin-card-value">' + data.template_views + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Modal opens</div><div class="admin-card-value">' + data.modal_opens + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Demo clicks</div><div class="admin-card-value">' + data.demo_clicks + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Buy clicks</div><div class="admin-card-value">' + data.buy_clicks + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Checkout opens</div><div class="admin-card-value">' + data.checkout_opens + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Payment successes</div><div class="admin-card-value">' + data.payment_successes + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Conversion rate</div><div class="admin-card-value">' + data.conversion_rate + '%</div><div class="admin-card-note">Payments / checkout opens</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Orders in range</div><div class="admin-card-value">' + data.orders_count + '</div></div>' +
        '<div class="admin-card"><div class="admin-card-label">Revenue in range</div><div class="admin-card-value">' + global.DvitesAdmin.formatMoney(data.revenue) + '</div></div>' +
      '</div>' +
      renderBarChart('Page-wise visits', data.page_breakdown) +
      renderBarChart('Template-wise views', data.template_breakdown);

    bindFilters();
  }

  function loadAnalytics() {
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
        var el = contentEl();
        if (el) el.innerHTML = '<div class="admin-panel"><p class="admin-status">' + (error.message || 'Unable to load analytics.') + '</p></div>';
      });
  }

  function bindFilters() {
    document.querySelectorAll('[data-range]').forEach(function (button) {
      button.addEventListener('click', function () {
        currentRange = button.getAttribute('data-range');
        if (currentRange !== 'custom') loadAnalytics();
      });
    });

    var apply = document.getElementById('analytics-apply-custom');
    if (apply) {
      apply.addEventListener('click', function () {
        customFrom = (document.getElementById('analytics-from').value || '').trim();
        customTo = (document.getElementById('analytics-to').value || '').trim();
        currentRange = 'custom';
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
