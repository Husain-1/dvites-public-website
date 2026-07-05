(function (global) {
  "use strict";

  var EMAIL = "infodvites@gmail.com";
  var PRICE = 1499;
  var OLD_PRICE = 2499;
  var PARTNER_MIN = 3;
  var PARTNER_MAX = 5;
  var PARTNER_DISCOUNT = 0.05;

  var TEMPLATES = [
    {
      id: "mountains",
      url: "/templates/Mountains/",
      title: "Mountains",
      category: "South Indian Wedding",
      tags: ["south-indian", "royal"],
      preview: "/templates/Mountains/assets/images/UrvYrWOHdNQYDDGmVMsVSKysPBk-d8b6660d.png",
      description: "A graceful South Indian wedding website with ceremony details, family blessings, and a warm traditional feel your guests will love.",
      featured: true
    },
    {
      id: "balcony-seaview",
      url: "/templates/balcony-seaview/",
      title: "Balcony Seaview",
      category: "Coastal Destination",
      tags: ["destination", "luxury"],
      preview: "/templates/balcony-seaview/assets/images/african-leaves-theme-poster-CYIJ7aA2.jpg",
      description: "A dreamy destination-style invite with ocean views, elegant typography, and a romantic coastal atmosphere perfect for beach weddings.",
      featured: false
    },
    {
      id: "curtains",
      url: "/templates/curtains/",
      title: "Curtains",
      category: "Classic Elegance",
      tags: ["luxury", "minimal"],
      preview: "/templates/curtains/assets/images/curtains-theme-poster-BhK08iq7.jpg",
      description: "Grand curtains reveal a timeless wedding story — refined animations, soft luxury tones, and an unforgettable first impression.",
      featured: true
    },
    {
      id: "laavan",
      url: "/templates/laavan/",
      title: "Laavan",
      category: "Anand Karaj / Sikh Wedding",
      tags: ["sikh", "royal"],
      preview: "/templates/laavan/assets/images/7c71eoi4vVG89GySPUZlgrCxg.jpg",
      description: "A serene Anand Karaj invitation with sacred symbolism, elegant blue tones, and every ceremony beautifully laid out for your guests.",
      featured: true
    },
    {
      id: "maison-doree",
      url: "/templates/maison-doree/",
      title: "Maison Dorée",
      category: "Luxury European",
      tags: ["luxury"],
      preview: "/templates/maison-doree/assets/intro-poster-new-CNDDqY2q.jpg",
      description: "European luxury meets wedding romance — golden accents, cinematic motion, and a sophisticated invite for couples who want something extraordinary.",
      featured: true
    },
    {
      id: "mewar-midnight",
      url: "/templates/mewar-midnight/",
      title: "Mewar Midnight",
      category: "Royal Rajasthani",
      tags: ["royal"],
      preview: "/templates/mewar-midnight/assets/images/layers/Herp%20Palace.webp",
      description: "Royal Rajasthani grandeur with palace imagery, rich maroon tones, and a regal experience worthy of your most special celebration.",
      featured: false
    },
    {
      id: "niqah",
      url: "/templates/niqah/",
      title: "Niqah",
      category: "Islamic Nikah",
      tags: ["muslim", "luxury"],
      preview: "/templates/niqah/assets/images/7c71eoi4vVG89GySPUZlgrCxg.jpg",
      description: "An elegant Nikah invitation with refined typography, soft florals, and a warm welcome for your walima and nikah celebrations.",
      featured: true
    },
    {
      id: "oud-blossom-majlis",
      url: "/templates/oud-blossom-majlis/",
      title: "Oud Blossom Majlis",
      category: "Arabic Majlis",
      tags: ["muslim", "luxury"],
      preview: "/templates/oud-blossom-majlis/assets/images/tild3736-6638-4539-b133-393334313761/People_in_elegant_at.png",
      description: "Arabic majlis elegance with oud-inspired aesthetics, rich cultural details, and a luxurious invite for your wedding festivities.",
      featured: false
    },
    {
      id: "rajkamal-palace",
      url: "/templates/rajkamal-palace/",
      title: "Rajkamal Palace",
      category: "Royal Palace Indian",
      tags: ["royal"],
      preview: "/templates/rajkamal-palace/assets/images/Demo/hero-arch_demo.webp",
      description: "Palace-inspired Indian royalty with arch motifs, golden details, and a majestic wedding website that feels truly grand.",
      featured: true
    }
  ];

  function formatRupee(n) {
    return "₹" + n.toLocaleString("en-IN");
  }

  function mailto(subject, body) {
    return "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  function enquiryMail(title) {
    return mailto(
      "Enquiry — " + title + " Wedding Invitation",
      "Hi Dvites,\n\nI'm interested in the " + title + " wedding invitation template.\n\nPlease share next steps.\n\nThank you."
    );
  }

  function buyMail(title) {
    return mailto(
      "Buy Now — " + title + " Wedding Invitation",
      "Hi Dvites,\n\nI'd like to purchase the " + title + " template (₹1,499).\n\nPlease confirm availability and payment details.\n\nThank you."
    );
  }

  function renderCard(tpl) {
    return (
      '<article class="tpl-card card" data-id="' + tpl.id + '" data-demo-url="' + tpl.url + '" data-title="' + tpl.title + '" data-category="' + tpl.category + '" data-tags="' + tpl.tags.join(" ") + '" data-description="' + tpl.description.replace(/"/g, "&quot;") + '">' +
        '<div class="tpl-card-inner">' +
          '<div class="tpl-preview-wrap">' +
            '<div class="tpl-phone"><div class="tpl-phone-screen" style="background-image:url(\'' + tpl.preview + '\')"></div></div>' +
          '</div>' +
          '<div class="tpl-body">' +
            '<span class="save-badge">Save 40%</span>' +
            '<h3 class="tpl-name">' + tpl.title + '</h3>' +
            '<p class="tpl-category">' + tpl.category + '</p>' +
            '<div class="tpl-pricing"><span class="old-price">' + formatRupee(OLD_PRICE) + '</span><span class="current-price">' + formatRupee(PRICE) + '</span></div>' +
            '<div class="tpl-actions card-actions">' +
              '<button type="button" class="btn btn-primary btn-customize">Customize Design</button>' +
              '<button type="button" class="btn btn-ghost btn-watch demo-btn">Watch Demo</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function renderCatalog(container, filterFeatured) {
    if (!container) return;
    var list = filterFeatured
      ? TEMPLATES.filter(function (t) { return t.featured; }).slice(0, 6)
      : TEMPLATES;
    container.innerHTML = list.map(renderCard).join("");
    equalizeCardHeights(container);
  }

  function equalizeCardHeights(container) {
    if (!container || global.innerWidth < 640) return;
    requestAnimationFrame(function () {
      var cards = container.querySelectorAll(".tpl-card:not(.is-hidden)");
      cards.forEach(function (card) { card.style.minHeight = ""; });
      var max = 0;
      cards.forEach(function (card) {
        max = Math.max(max, card.offsetHeight);
      });
      if (max > 0) {
        cards.forEach(function (card) {
          card.style.minHeight = max + "px";
        });
      }
    });
  }

  function initHeroScroll() {
    var iframe = document.getElementById("hero-iframe");
    if (!iframe || !global.DvitesPhonePreview) return;
    global.DvitesPhonePreview.setup(iframe, { mode: "preview", autoScroll: true });
  }

  function initModal() {
    var modal = document.getElementById("demo-modal");
    if (!modal) return;

    var iframe = document.getElementById("demo-iframe");
    var modalTitle = document.getElementById("modal-title");
    var modalCategory = document.getElementById("modal-category");
    var modalDesc = document.getElementById("modal-desc");
    var modalBuy = document.getElementById("modal-buy");
    var lastFocused = null;

    if (iframe && global.DvitesPhonePreview) {
      global.DvitesPhonePreview.setup(iframe, { mode: "modal", autoScroll: false });
    }

    function bindCards() {
      document.querySelectorAll(".card[data-demo-url]").forEach(function (card) {
        if (card.dataset.modalBound === "1") return;
        card.dataset.modalBound = "1";
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");

        card.addEventListener("click", function () {
          openModal(card);
        });

        card.addEventListener("keydown", function (event) {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openModal(card);
          }
        });

        card.querySelectorAll(".btn-customize, .btn-watch, .demo-btn").forEach(function (btn) {
          btn.addEventListener("click", function (event) {
            event.stopPropagation();
            openModal(card);
          });
        });
      });
    }

    function openModalFromTemplate(tpl) {
      if (!tpl) return;
      lastFocused = document.activeElement;
      modalTitle.textContent = tpl.title || "";
      modalCategory.textContent = tpl.category || "";
      modalDesc.textContent = tpl.description || "";
      iframe.src = tpl.url;
      if (modalBuy) modalBuy.href = buyMail(tpl.title || "Template");
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      modal.querySelector(".modal-close").focus();
    }

    function openModal(card) {
      var url = card.getAttribute("data-demo-url");
      var title = card.getAttribute("data-title");
      var category = card.getAttribute("data-category");
      var desc = card.getAttribute("data-description") || "";
      if (!url) return;

      lastFocused = document.activeElement;
      modalTitle.textContent = title || "";
      modalCategory.textContent = category || "";
      modalDesc.textContent = desc;
      iframe.src = url;
      if (modalBuy) modalBuy.href = buyMail(title || "Template");

      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      modal.querySelector(".modal-close").focus();
    }

    function closeModal() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      iframe.src = "about:blank";
      if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    }

    bindCards();

    var heroWatch = document.getElementById("hero-watch-demo");
    if (heroWatch) {
      heroWatch.addEventListener("click", function () {
        if (typeof global.DvitesOpenModalById === "function") {
          global.DvitesOpenModalById("balcony-seaview");
        }
      });
    }

    modal.querySelectorAll("[data-close-modal]").forEach(function (el) {
      el.addEventListener("click", closeModal);
    });

    modal.querySelector(".modal-panel").addEventListener("click", function (e) {
      e.stopPropagation();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
    });

    global.DvitesRebindModal = bindCards;
    global.DvitesOpenModalById = function (id) {
      var card = document.querySelector('.card[data-id="' + id + '"]');
      if (card) {
        openModal(card);
        return;
      }
      var tpl = TEMPLATES.find(function (t) { return t.id === id; });
      if (tpl) openModalFromTemplate(tpl);
    };
  }

  function initFilters() {
    var chips = document.querySelectorAll(".filter-chip");
    if (!chips.length) return;
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var filter = chip.getAttribute("data-filter");
        chips.forEach(function (c) { c.classList.remove("is-active"); });
        chip.classList.add("is-active");
        var catalog = document.getElementById("full-catalog");
        document.querySelectorAll(".card[data-demo-url]").forEach(function (card) {
          var tags = (card.getAttribute("data-tags") || "").split(/\s+/);
          var show = filter === "all" || tags.indexOf(filter) !== -1;
          card.classList.toggle("is-hidden", !show);
        });
        if (catalog) equalizeCardHeights(catalog);
      });
    });
  }

  function initModalExtras() {
    var msgs = document.querySelectorAll(".urgency-msg");
    if (msgs.length < 2) return;
    var index = 0;
    setInterval(function () {
      msgs[index].classList.remove("is-active");
      index = (index + 1) % msgs.length;
      msgs[index].classList.add("is-active");
    }, 3000);
  }

  function initMobileNav() {
    var toggle = document.querySelector(".menu-toggle");
    var mobileNav = document.getElementById("mobile-nav");
    if (!toggle || !mobileNav) return;
    toggle.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initFaq() {
    document.querySelectorAll(".faq-item").forEach(function (item) {
      item.querySelector(".faq-q").addEventListener("click", function () {
        var wasOpen = item.classList.contains("is-open");
        document.querySelectorAll(".faq-item").forEach(function (i) { i.classList.remove("is-open"); });
        if (!wasOpen) item.classList.add("is-open");
      });
    });
  }

  function initProtection() {
    document.addEventListener("contextmenu", function (e) { e.preventDefault(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") return;
      var key = e.key;
      var blocked =
        key === "F12" ||
        (e.ctrlKey && e.shiftKey && /[ijc]/i.test(key)) ||
        (e.ctrlKey && !e.shiftKey && /[us]/i.test(key)) ||
        (e.metaKey && e.altKey && /[iju]/i.test(key)) ||
        (e.metaKey && e.shiftKey && /[cij]/i.test(key));
      if (blocked) { e.preventDefault(); e.stopPropagation(); }
    });
  }

  function initPartnerStudio() {
    var grid = document.getElementById("partner-grid");
    var cart = document.getElementById("partner-cart");
    if (!grid || !cart) return;

    grid.innerHTML = TEMPLATES.map(function (tpl) {
      return (
        '<label class="partner-item" data-id="' + tpl.id + '">' +
          '<input type="checkbox" name="partner-template" value="' + tpl.id + '" />' +
          '<div class="partner-item-thumb" style="background-image:url(\'' + tpl.preview + '\')"></div>' +
          '<div class="partner-item-info">' +
            '<strong>' + tpl.title + '</strong>' +
            '<span>' + tpl.category + ' · ' + formatRupee(PRICE) + '</span>' +
          '</div>' +
        '</label>'
      );
    }).join("");

    var countEl = document.getElementById("cart-count");
    var subtotalEl = document.getElementById("cart-subtotal");
    var discountEl = document.getElementById("cart-discount");
    var totalEl = document.getElementById("cart-total");
    var badge = document.getElementById("discount-badge");
    var orderBtn = document.getElementById("partner-order-btn");
    var hintEl = document.getElementById("cart-hint");

    function updateCartHint(count) {
      if (!hintEl) return;
      if (count < PARTNER_MIN) {
        hintEl.textContent = "Select at least 3 templates to continue.";
      } else if (count >= PARTNER_MAX) {
        hintEl.textContent = "Maximum 5 templates allowed per partner order.";
      } else {
        hintEl.textContent = "Select 3 to 5 templates to unlock your 5% partner discount and send your bulk order.";
      }
    }

    function updateCart() {
      var checked = grid.querySelectorAll('input:checked');
      var count = checked.length;
      var subtotal = count * PRICE;
      var qualifies = count >= PARTNER_MIN && count <= PARTNER_MAX;
      var discount = qualifies ? Math.round(subtotal * PARTNER_DISCOUNT) : 0;
      var total = subtotal - discount;

      countEl.textContent = count;
      subtotalEl.textContent = formatRupee(subtotal);
      discountEl.textContent = discount ? "−" + formatRupee(discount) : formatRupee(0);
      totalEl.textContent = formatRupee(total);
      badge.classList.toggle("is-visible", qualifies);
      updateCartHint(count);

      grid.querySelectorAll(".partner-item").forEach(function (item) {
        var input = item.querySelector("input");
        var atMax = count >= PARTNER_MAX;
        item.classList.toggle("is-selected", input.checked);
        if (!input.checked && atMax) {
          input.disabled = true;
          item.classList.add("is-at-limit");
        } else {
          input.disabled = false;
          item.classList.remove("is-at-limit");
        }
      });

      orderBtn.disabled = !qualifies;
      orderBtn.style.opacity = qualifies ? "1" : "0.55";
    }

    grid.addEventListener("change", function (e) {
      var checked = grid.querySelectorAll("input:checked");
      if (checked.length > PARTNER_MAX && e.target.checked) {
        e.target.checked = false;
      }
      updateCart();
    });
    updateCart();

    orderBtn.addEventListener("click", function () {
      var selected = [];
      grid.querySelectorAll("input:checked").forEach(function (input) {
        var tpl = TEMPLATES.find(function (t) { return t.id === input.value; });
        if (tpl) selected.push(tpl.title);
      });
      if (selected.length < PARTNER_MIN || selected.length > PARTNER_MAX) return;

      var subtotal = selected.length * PRICE;
      var discount = Math.round(subtotal * PARTNER_DISCOUNT);
      var total = subtotal - discount;

      var body =
        "Hi Dvites,\n\nI'd like to place a Partner Studio bulk order.\n\n" +
        "Selected templates (" + selected.length + "):\n" +
        selected.map(function (n, i) { return (i + 1) + ". " + n; }).join("\n") +
        "\n\nQuantity: " + selected.length +
        "\nOriginal total: " + formatRupee(subtotal) +
        "\nPartner discount (5%): −" + formatRupee(discount) +
        "\nFinal total: " + formatRupee(total) +
        "\n\nPlease confirm next steps.\n\nThank you.";

      window.location.href = mailto("Partner Studio Order — " + selected.length + " Templates", body);
    });
  }

  function initPageRecovery() {
    global.addEventListener("pageshow", function (e) {
      if (!e.persisted) return;
      document.body.classList.remove("modal-open");
      var modal = document.getElementById("demo-modal");
      if (modal) {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
      }
      var hero = document.getElementById("hero-iframe");
      if (hero && hero.src && hero.src.indexOf("about:blank") < 0) {
        var src = hero.src;
        hero.src = "about:blank";
        setTimeout(function () { hero.src = src; }, 50);
      }
    });
  }

  global.Dvites = {
    TEMPLATES: TEMPLATES,
    EMAIL: EMAIL,
    PRICE: PRICE,
    renderCatalog: renderCatalog,
    enquiryMail: enquiryMail,
    buyMail: buyMail,
    init: function () {
      initHeroScroll();
      initModal();
      initModalExtras();
      initFilters();
      initMobileNav();
      initFaq();
      initProtection();
      initPartnerStudio();
      initPageRecovery();
      global.addEventListener("resize", function () {
        var featured = document.getElementById("featured-catalog");
        var full = document.getElementById("full-catalog");
        if (featured) equalizeCardHeights(featured);
        if (full) equalizeCardHeights(full);
      });
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", global.Dvites.init);
  } else {
    global.Dvites.init();
  }
})(window);
