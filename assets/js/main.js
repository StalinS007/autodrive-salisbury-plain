/* AutoDrive Salisbury Plain — interactions */
(function () {
  "use strict";

  // Google Analytics 4 (gtag) — loads GA and tracks pageviews
  (function () {
    var GA_ID = "G-5QT9NZ63W1";
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date());
    gtag("config", GA_ID);
  }());

  // Track customer contact actions as GA4 events (phone, WhatsApp, booking, email)
  (function () {
    function track(name, params) {
      if (typeof window.gtag === "function") window.gtag("event", name, params || {});
    }
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a");
      if (!a) return;
      var href = a.getAttribute("href") || "";
      if (href.indexOf("tel:") === 0) track("phone_click", { link_url: href });
      else if (/wa\.me|whatsapp/i.test(href)) track("whatsapp_click", { link_url: href });
      else if (href.indexOf("mailto:") === 0) track("email_click", { link_url: href });
      else if (/#book\b/.test(href)) track("book_click", { link_url: href });
    });
    var form = document.getElementById("booking-form");
    if (form) form.addEventListener("submit", function () { track("generate_lead", { method: "booking_form" }); });
  }());

  // Mobile nav toggle
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  if (toggle && header) {
    toggle.addEventListener("click", function () {
      header.classList.toggle("open");
    });
    header.querySelectorAll(".nav a").forEach(function (a) {
      a.addEventListener("click", function () { header.classList.remove("open"); });
    });
  }

  // Scroll reveal
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 4, 3) * 80 + "ms";
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // Booking / contact form (progressive enhancement)
  var form = document.getElementById("booking-form");
  if (form) {
    var status = form.querySelector(".form-status");
    form.addEventListener("submit", function (ev) {
      // If a real endpoint is configured (data-endpoint), POST via fetch.
      var endpoint = form.getAttribute("data-endpoint");
      if (!endpoint) {
        // No backend wired yet — show a friendly confirmation and stop.
        ev.preventDefault();
        if (status) {
          status.className = "form-status ok";
          status.textContent = "Thanks! Your request has been captured. Connect a form endpoint (Formspree/back-end) to receive these by email. For an instant booking, tap Call or WhatsApp.";
        }
        return;
      }
      ev.preventDefault();
      var btn = form.querySelector('[type="submit"]');
      var original = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      }).then(function (r) {
        if (r.ok) {
          form.reset();
          if (status) { status.className = "form-status ok"; status.textContent = "Thanks! Your booking request has been sent. We'll be in touch shortly."; }
        } else {
          if (status) { status.className = "form-status err"; status.textContent = "Sorry, something went wrong. Please call us on +61 432 520 230."; }
        }
      }).catch(function () {
        if (status) { status.className = "form-status err"; status.textContent = "Network error. Please call us on +61 432 520 230."; }
      }).finally(function () {
        if (btn) { btn.disabled = false; btn.textContent = original; }
      });
    });
  }

  // Footer year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Reviews — per-category carousels: prev/next cycles the cards, tap a card to expand
  (function () {
    var cats = document.querySelectorAll(".revcat");
    if (!cats.length) return;
    cats.forEach(function (cat) {
      var cards = Array.prototype.slice.call(cat.querySelectorAll(".rev-card"));
      if (!cards.length) return;
      var prev = cat.querySelector(".revcat__prev");
      var next = cat.querySelector(".revcat__next");
      var count = cat.querySelector(".revcat__count");
      var i = 0;
      function show(n) {
        cards[i].classList.remove("is-active", "is-open");
        i = (n + cards.length) % cards.length;
        cards[i].classList.add("is-active");
        if (count) count.textContent = (i + 1) + " / " + cards.length;
      }
      if (prev) prev.addEventListener("click", function (e) { e.stopPropagation(); show(i - 1); });
      if (next) next.addEventListener("click", function (e) { e.stopPropagation(); show(i + 1); });
      cards.forEach(function (c) {
        c.addEventListener("click", function () { c.classList.toggle("is-open"); });
      });
    });
  }());

  // Services exploded-car video (diagram, labels + health-check panel are baked in).
  // Just make sure it plays — muted autoplay, with a nudge on first interaction as a fallback.
  (function () {
    var V = document.getElementById('ad-vid');
    if (!V) return;
    function play() { var p = V.play(); if (p && p.catch) p.catch(function () {}); }
    if (V.readyState >= 2) play();
    ['loadeddata', 'canplay'].forEach(function (ev) { V.addEventListener(ev, play); });
    ['touchstart', 'pointerdown', 'scroll'].forEach(function (ev) {
      window.addEventListener(ev, function once() { play(); window.removeEventListener(ev, once); }, { once: true, passive: true });
    });
  }());
})();
