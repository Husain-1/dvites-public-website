(function () {
  "use strict";

  function formatIcsDate(isoDate) {
    return String(isoDate || "").replace(/-/g, "");
  }

  function buildIcs(cfg) {
    var couple = cfg.couple || {};
    var date = couple.date;
    if (!date) return "";
    var end = new Date(date + "T00:00:00");
    end.setDate(end.getDate() + 1);
    var endStr = end.toISOString().slice(0, 10).replace(/-/g, "");
    var title = (couple.bride || "Bride") + " & " + (couple.groom || "Groom") + " Wedding";
    var location = couple.venue || "";
    return [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Dvites//Wedding//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:" + Date.now() + "@dvites.com",
      "DTSTAMP:" + formatIcsDate(new Date().toISOString().slice(0, 10)) + "T000000Z",
      "DTSTART;VALUE=DATE:" + formatIcsDate(date),
      "DTEND;VALUE=DATE:" + endStr,
      "SUMMARY:" + title,
      "LOCATION:" + location,
      "DESCRIPTION:Wedding celebration of " + title,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");
  }

  function wireAppleCalendar(cfg) {
    var buttons = document.querySelectorAll(".rsvp-cal-btn");
    if (!buttons[1]) return;
    var btn = buttons[1];
    btn.setAttribute("href", "#");
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      var ics = buildIcs(cfg);
      if (!ics) return;
      var blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = (cfg.couple && cfg.couple.bride && cfg.couple.groom
        ? cfg.couple.bride + "-" + cfg.couple.groom + "-wedding.ics"
        : "wedding.ics");
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    });
  }

  function wireWhatsApp(cfg) {
    var btn = document.querySelector(".rsvp-btn");
    if (!btn) return;
    var couple = cfg.couple || {};
    var rsvp = cfg.rsvp || {};
    var number = String(rsvp.whatsapp || couple.whatsapp || "").replace(/\D/g, "");
    if (number) return;
    btn.setAttribute("href", "#");
    btn.addEventListener("click", function (event) {
      event.preventDefault();
    });
  }

  function init() {
    var cfg = window.__WEDDING_CONFIG__;
    if (!cfg) return;
    wireAppleCalendar(cfg);
    wireWhatsApp(cfg);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
