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

  // Date-ask: before opening WhatsApp, qualify the enquiry. Generic buttons ask
  // "what service?" then "what date?"; section buttons (detailing/used cars/$129)
  // already know the service, so they just ask the date. The answers are
  // stitched into the WhatsApp message.
  (function () {
    var modal = null, pendingUrl = "", mode = "date", chosenSvc = null, pendingDate = "";
    // Wording for the date step, tailored to what the visitor is actually booking.
    // `vehicle: true` means: after the date, also ask for make/model + odometer —
    // used for service/detailing/paint (it's THEIR car). Used-car enquiries (cars)
    // skip this — the visitor doesn't have "their car" details to give.
    var CTX = {
      service: { head: "When would you like your service?", copy: "Pick a date and we will contact you back.", phrase: "My car is free on ", vehicle: true, issue: true },
      problem: { head: "When can we take a look?", copy: "Pick a date and we will contact you back.", phrase: "My car is free on ", vehicle: true, issue: true, issueRequired: true },
      detail: { head: "When would you like your detailing?", copy: "Pick a date and we will contact you back.", phrase: "My car is free on ", vehicle: true },
      cars: { head: "When can you come by?", copy: "Pick a day to come and have a look and we will contact you back.", phrase: "I am available to come have a look on ", vehicle: false },
      paint: { head: "When would you like your repair?", copy: "Pick a date and we will contact you back.", phrase: "My car is free on ", vehicle: true }
    };
    var curCtx = CTX.service;
    // Top-level enquiry categories for the generic button.
    var services = [
      { label: "General car service", base: "Hi Jitty, I would like to book my car in for a service.", ctx: "service" },
      { label: "Car not running right?", sub: "Warning light, strange noise, leak or anything odd &mdash; tell us what's going on and we'll take a look.", base: "Hi Jitty, my car is having some issues and I would like to get it checked.", ctx: "problem" },
      { label: "Car detailing", base: "Hi Jitty, I would like to book my car in for car detailing.", ctx: "detail" },
      { label: "Used car enquiry", base: "Hi Jitty, I am interested in looking at your used cars.", ctx: "cars" },
      { label: "Paint &amp; panel repair", base: "Hi Jitty, I would like to book my car in for paint and panel repair.", ctx: "paint" }
    ];
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var viewY = today.getFullYear(), viewM = today.getMonth(), selISO = "";
    var DOW = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    function el(sel) { return modal.querySelector(sel); }
    function pad(n) { return n < 10 ? "0" + n : "" + n; }
    function isoOf(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
    function fmt(v) { return new Date(v + "T00:00:00").toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" }); }
    function build() {
      modal = document.createElement("div");
      modal.className = "dateask";
      var chips = services.map(function (s, i) {
        var inner = s.label + (s.sub ? '<span class="dateask__svcsub">' + s.sub + "</span>" : "");
        return '<button type="button" class="dateask__svc" data-i="' + i + '">' + inner + "</button>";
      }).join("");
      modal.innerHTML =
        '<div class="dateask__backdrop"></div>' +
        '<div class="dateask__card" role="dialog" aria-modal="true" aria-labelledby="dateask-h">' +
        '<button type="button" class="dateask__close" aria-label="Close">&times;</button>' +
        '<h3 id="dateask-h"></h3>' +
        '<p class="dateask__copy"></p>' +
        '<div class="dateask__services" hidden>' + chips + "</div>" +
        '<div class="dateask__datewrap" hidden>' +
          '<div class="dateask__locs">' +
            "<div><strong>Where to Find Us</strong>6 Lolands Rd, Salisbury Plain SA 5109</div>" +
          "</div>" +
          '<div class="dateask__cal"></div>' +
          '<p class="dateask__note">Closed Sundays.</p>' +
          '<button type="button" class="btn btn--lg btn--block dateask__go" hidden>Continue</button>' +
        "</div>" +
        '<div class="dateask__vehiclewrap" hidden>' +
          '<div class="field"><label for="dateask-make">Car make</label><input type="text" id="dateask-make" placeholder="e.g. Toyota" autocomplete="off" /></div>' +
          '<div class="field"><label for="dateask-model">Model</label><input type="text" id="dateask-model" placeholder="e.g. Corolla" autocomplete="off" /></div>' +
          '<div class="field"><label for="dateask-year">Year</label><input type="text" inputmode="numeric" id="dateask-year" placeholder="e.g. 2009" maxlength="4" autocomplete="off" /></div>' +
          '<div class="field"><label for="dateask-km">Odometer (km)</label><input type="text" inputmode="numeric" id="dateask-km" placeholder="e.g. 85,000" autocomplete="off" /></div>' +
          '<div class="field dateask__issuefield"><label for="dateask-issue">Anything wrong with the car? <span class="dateask__opt">(optional)</span></label><textarea id="dateask-issue" rows="2" placeholder="e.g. ABS light flashing on the dashboard while driving"></textarea></div>' +
          '<p class="dateask__verr" hidden>Please fill in your car&rsquo;s details so we can quote you accurately.</p>' +
          '<button type="button" class="btn btn--lg btn--block dateask__vgo">Continue to WhatsApp</button>' +
        "</div>" +
        "</div>";
      document.body.appendChild(modal);
      el(".dateask__backdrop").addEventListener("click", close);
      el(".dateask__close").addEventListener("click", close);
      modal.querySelectorAll(".dateask__svc").forEach(function (b) {
        b.addEventListener("click", function () { chosenSvc = services[+b.getAttribute("data-i")]; curCtx = CTX[chosenSvc.ctx]; showDate(); });
      });
      el(".dateask__cal").addEventListener("click", function (e) {
        var nav = e.target.closest(".cal__nav");
        if (nav && !nav.disabled) {
          viewM += parseInt(nav.getAttribute("data-d"), 10);
          if (viewM < 0) { viewM = 11; viewY--; }
          if (viewM > 11) { viewM = 0; viewY++; }
          renderCal();
          return;
        }
        var day = e.target.closest(".cal__day");
        if (day && !day.disabled) {
          selISO = day.getAttribute("data-iso");
          renderCal();
          el(".dateask__go").hidden = false;
        }
      });
      el(".dateask__go").addEventListener("click", function () {
        if (!selISO) return;
        var dateText = fmt(selISO);
        if (curCtx.vehicle) { pendingDate = dateText; showVehicle(); }
        else finish(dateText);
      });
      // Vehicle details are required: block the WhatsApp handoff until all three
      // fields are filled, flagging the empty ones.
      el(".dateask__vgo").addEventListener("click", function () {
        var inputs = [el("#dateask-make"), el("#dateask-model"), el("#dateask-year"), el("#dateask-km")];
        if (curCtx.issueRequired) inputs.push(el("#dateask-issue"));
        var missing = false;
        inputs.forEach(function (inp) {
          var bad = !inp.value.trim();
          inp.classList.toggle("is-invalid", bad);
          if (bad) missing = true;
        });
        el(".dateask__verr").hidden = !missing;
        if (missing) return;
        finish(pendingDate, {
          make: inputs[0].value.trim(),
          model: inputs[1].value.trim(),
          year: inputs[2].value.trim(),
          km: inputs[3].value.trim(),
          issue: curCtx.issue ? el("#dateask-issue").value : ""
        });
      });
      el(".dateask__vehiclewrap").addEventListener("input", function (e) {
        if (e.target && e.target.classList) e.target.classList.remove("is-invalid");
      });
    }
    function renderCal() {
      var first = new Date(viewY, viewM, 1);
      var startCol = (first.getDay() + 6) % 7; // Monday-first grid
      var total = new Date(viewY, viewM + 1, 0).getDate();
      var canPrev = viewY > today.getFullYear() || (viewY === today.getFullYear() && viewM > today.getMonth());
      var h = '<div class="cal__head">' +
        '<button type="button" class="cal__nav" data-d="-1" aria-label="Previous month"' + (canPrev ? "" : " disabled") + ">&lsaquo;</button>" +
        "<strong>" + first.toLocaleDateString("en-AU", { month: "long", year: "numeric" }) + "</strong>" +
        '<button type="button" class="cal__nav" data-d="1" aria-label="Next month">&rsaquo;</button>' +
        '</div><div class="cal__grid">';
      DOW.forEach(function (d) { h += '<span class="cal__dow">' + d + "</span>"; });
      for (var i = 0; i < startCol; i++) h += "<span></span>";
      for (var day = 1; day <= total; day++) {
        var dt = new Date(viewY, viewM, day);
        var s = isoOf(dt);
        var off = dt.getDay() === 0 || dt < today; // Sundays closed, no past dates
        h += '<button type="button" class="cal__day' + (off ? " is-off" : "") + (s === selISO ? " is-sel" : "") +
             '" data-iso="' + s + '"' + (off ? " disabled" : "") + ">" + day + "</button>";
      }
      el(".dateask__cal").innerHTML = h + "</div>";
    }
    function resetDate() {
      selISO = ""; pendingDate = "";
      viewY = today.getFullYear(); viewM = today.getMonth();
      if (modal) {
        renderCal();
        el(".dateask__go").hidden = true;
        ["#dateask-make", "#dateask-model", "#dateask-year", "#dateask-km", "#dateask-issue"].forEach(function (id) {
          var inp = el(id); inp.value = ""; inp.classList.remove("is-invalid");
        });
        el(".dateask__verr").hidden = true;
      }
    }
    function showService() {
      el("#dateask-h").textContent = "What service are you looking for?";
      el(".dateask__copy").textContent = "Pick one so we can help you faster.";
      el(".dateask__services").hidden = false;
      el(".dateask__datewrap").hidden = true;
      el(".dateask__vehiclewrap").hidden = true;
    }
    function showDate() {
      el("#dateask-h").textContent = curCtx.head;
      el(".dateask__copy").textContent = curCtx.copy;
      el(".dateask__services").hidden = true;
      el(".dateask__datewrap").hidden = false;
      el(".dateask__vehiclewrap").hidden = true;
      renderCal();
    }
    function showVehicle() {
      el("#dateask-h").textContent = "Tell us about your car";
      el(".dateask__copy").textContent = "So we can give you an accurate quote.";
      el(".dateask__datewrap").hidden = true;
      el(".dateask__vehiclewrap").hidden = false;
      // The issue box only appears for contexts that want it; for the "car not
      // running right" stream it is the whole point, so it becomes required.
      el(".dateask__issuefield").hidden = !curCtx.issue;
      el(".dateask__issuefield label").innerHTML = curCtx.issueRequired
        ? "What&rsquo;s going on with the car?"
        : 'Anything wrong with the car? <span class="dateask__opt">(optional)</span>';
    }
    function close() { if (modal) modal.classList.remove("open"); pendingUrl = ""; chosenSvc = null; }
    // Normalise customer-typed text for the WhatsApp message: collapse whitespace,
    // no space before punctuation ("driving ." -> "driving."), capitalise, end with ".".
    function tidy(s) {
      s = (s || "").replace(/\s+/g, " ").trim();
      if (!s) return "";
      s = s.replace(/\s+([.,!?;:])/g, "$1");
      s = s.charAt(0).toUpperCase() + s.slice(1);
      if (!/[.!?]$/.test(s)) s += ".";
      return s;
    }
    function finish(dateText, vehicle) {
      var base = pendingUrl, svc = chosenSvc, url = base;
      close();
      if (!base) return;
      var extra = "";
      if (dateText) extra += " " + curCtx.phrase + dateText + ".";
      if (vehicle && (vehicle.make || vehicle.model || vehicle.year || vehicle.km)) {
        var car = [vehicle.make, vehicle.model].filter(Boolean).join(" ");
        var bits = [];
        if (car) bits.push("Car: " + car);
        if (vehicle.year) bits.push("Year: " + vehicle.year);
        if (vehicle.km) bits.push("Odometer: " + vehicle.km + " km");
        extra += " " + bits.join(", ") + ".";
        var issueText = tidy(vehicle.issue);
        if (issueText) extra += " Issue: " + issueText;
        if (typeof window.gtag === "function") window.gtag("event", "vehicle_info_submitted", { make: vehicle.make, model: vehicle.model, year: vehicle.year, km: vehicle.km, has_issue: issueText ? "yes" : "no" });
      }
      if (mode === "service") {
        var msg = svc ? svc.base : "Hi Jitty, I would like to book my car in.";
        url = "https://wa.me/61432520230?text=" + encodeURIComponent(msg + extra);
      } else if (extra) {
        var joiner = base.indexOf("?text=") > -1 ? "%20" : "?text=";
        url += joiner + encodeURIComponent(extra.trim());
      }
      if (dateText && typeof window.gtag === "function") window.gtag("event", "booking_date_picked", { date_text: dateText });
      window.location.href = url;
    }
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href*="wa.me/"]');
      if (!a) return;
      e.preventDefault();
      // A link can declare its own flow via data-ctx, overriding the keyword guess:
      //   data-ctx="cars|service|detail|paint" -> go straight to that date flow, keeping
      //   the link's own prefilled message (e.g. a specific car listing);
      //   data-ctx="direct" -> skip the modal entirely and open WhatsApp as-is.
      var forced = a.getAttribute("data-ctx");
      if (forced === "direct") { window.location.href = a.href; return; }
      pendingUrl = a.href;
      chosenSvc = null;
      var txt = "";
      try { txt = decodeURIComponent((a.href.split("?text=")[1] || "")); } catch (err) { txt = a.href; }
      if (forced && CTX[forced]) {
        mode = "date"; curCtx = CTX[forced];
      } else {
        mode = /detailing|used cars|\$129|for a service|paint and panel/i.test(txt) ? "date" : "service";
        curCtx = /used cars/i.test(txt) ? CTX.cars : (/detailing/i.test(txt) ? CTX.detail : (/paint and panel/i.test(txt) ? CTX.paint : CTX.service));
      }
      if (!modal) build();
      resetDate();
      if (mode === "service") showService(); else showDate();
      modal.classList.add("open");
    });
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

  // Booking form — packages the details into a pre-filled SMS to the workshop.
  // The customer's messages app opens with everything filled in; they just hit send.
  var form = document.getElementById("booking-form");
  if (form) {
    var status = form.querySelector(".form-status");
    function bookingLines() {
      function val(name) {
        var el = form.querySelector('[name="' + name + '"]');
        return el && el.value ? el.value.trim() : "";
      }
      var lines = ["Booking request - AutoDrive website"];
      if (val("name")) lines.push("Name: " + val("name"));
      if (val("phone")) lines.push("Phone: " + val("phone"));
      if (val("vehicle")) lines.push("Vehicle: " + val("vehicle"));
      if (val("service")) lines.push("Service: " + val("service"));
      if (val("preferred_date")) lines.push("Preferred date: " + val("preferred_date"));
      if (val("message")) lines.push("Notes: " + val("message"));
      return lines.join("\n");
    }
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var smsNumber = form.getAttribute("data-sms") || "+61432247691";
      if (status) {
        status.className = "form-status ok";
        status.textContent = "Opening your messages app with the details filled in - just tap send!";
      }
      window.location.href = "sms:" + smsNumber + "?body=" + encodeURIComponent(bookingLines());
    });
    var emailBtn = document.getElementById("email-fallback");
    if (emailBtn) {
      emailBtn.addEventListener("click", function () {
        var to = form.getAttribute("data-email") || "autodrive5109@gmail.com";
        if (typeof window.gtag === "function") window.gtag("event", "email_click", { link_url: "mailto:" + to, method: "booking_form_fallback" });
        window.location.href = "mailto:" + to +
          "?subject=" + encodeURIComponent("Booking request - AutoDrive website") +
          "&body=" + encodeURIComponent(bookingLines());
      });
    }
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
    });
  }());

  // Reviews — shorten long review text to a snippet with a "more/less" toggle
  (function () {
    var LIMIT = 90;
    function setup() {
      document.querySelectorAll(".rev-card p").forEach(function (p) {
        if (p.querySelector(".rc-more")) return;
        var raw = (p.textContent || "").trim();
        var quoted = raw.length > 1 && raw.charAt(0) === '"' && raw.charAt(raw.length - 1) === '"';
        var inner = quoted ? raw.slice(1, -1) : raw;
        if (inner.length <= LIMIT) return;
        var cut = inner.slice(0, LIMIT);
        var sp = cut.lastIndexOf(" ");
        if (sp > 55) cut = cut.slice(0, sp);
        cut = cut.replace(/[\s.,;:!?"]+$/, "");
        var shortSpan = document.createElement("span");
        shortSpan.className = "rc-short";
        shortSpan.textContent = (quoted ? '"' : "") + cut + "… ";
        var fullSpan = document.createElement("span");
        fullSpan.className = "rc-fulltext";
        fullSpan.textContent = raw;
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "rc-more";
        btn.setAttribute("aria-label", "Show full review");
        var card = p.closest(".rev-card");
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          if (card) card.classList.toggle("is-open");
        });
        p.textContent = "";
        p.appendChild(shortSpan);
        p.appendChild(fullSpan);
        p.appendChild(btn);
      });
    }
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(setup); }
    else { setup(); }
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

  // Used-cars photo + video gallery: arrows, dots, swipe, keyboard.
  // The video plays only when it's the active slide (and pauses when you leave it).
  (function () {
    var galleries = document.querySelectorAll('[data-gallery]');
    Array.prototype.forEach.call(galleries, function (g) {
      var track = g.querySelector('.car__gallery-track');
      if (!track) return;
      var slides = track.querySelectorAll('.car__slide');
      var n = slides.length;
      if (!n) return;
      var prev = g.querySelector('.car__nav--prev');
      var next = g.querySelector('.car__nav--next');
      var dotsWrap = g.querySelector('.car__dots');
      var i = 0;

      // Only one slide? Hide the controls — nothing to navigate.
      if (n < 2) {
        if (prev) prev.hidden = true;
        if (next) next.hidden = true;
      }

      var dots = [];
      if (dotsWrap && n > 1) {
        for (var k = 0; k < n; k++) {
          var b = document.createElement('button');
          b.type = 'button';
          b.setAttribute('aria-label', 'Go to item ' + (k + 1));
          (function (idx) { b.addEventListener('click', function () { go(idx); }); })(k);
          dotsWrap.appendChild(b);
          dots.push(b);
        }
      }

      function syncVideo() {
        Array.prototype.forEach.call(track.querySelectorAll('video'), function (vid) {
          var onActive = slides[i].contains(vid);
          if (onActive) { var p = vid.play(); if (p && p.catch) p.catch(function () {}); }
          else { try { vid.pause(); vid.currentTime = 0; } catch (e) {} }
        });
      }
      function render() {
        track.style.transform = 'translateX(' + (-i * 100) + '%)';
        for (var d = 0; d < dots.length; d++) { dots[d].classList.toggle('is-active', d === i); }
        syncVideo();
      }
      function go(idx) { i = (idx % n + n) % n; render(); }

      if (next) next.addEventListener('click', function () { go(i + 1); });
      if (prev) prev.addEventListener('click', function () { go(i - 1); });

      g.setAttribute('tabindex', '0');
      g.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); }
      });

      // Swipe (ignore near-vertical drags so page scrolling still works)
      var x0 = null, y0 = null;
      g.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
      g.addEventListener('touchend', function (e) {
        if (x0 === null) return;
        var dx = e.changedTouches[0].clientX - x0;
        var dy = e.changedTouches[0].clientY - y0;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { go(i + (dx < 0 ? 1 : -1)); }
        x0 = y0 = null;
      }, { passive: true });

      render();
    });
  }());

  // Stock carousel: step between whole car listings. One car per page on phone,
  // two per page on desktop. The red-bar count auto-derives from the car count.
  (function () {
    var sc = document.querySelector('[data-stock]');
    if (!sc) return;
    var track = sc.querySelector('.stock-carousel__track');
    if (!track) return;
    var cars = Array.prototype.filter.call(track.children, function (el) {
      return el.classList && el.classList.contains('car');
    });
    var total = cars.length;
    if (!total) return;
    var countEl = sc.querySelector('.stock-carousel__count');
    var prev = sc.querySelector('.stock-carousel__arrow--prev');
    var next = sc.querySelector('.stock-carousel__arrow--next');
    var page = 0;

    function perView() { return window.matchMedia('(min-width:760px)').matches ? 2 : 1; }
    function pageCount() { return Math.ceil(total / perView()); }

    function updateLabel() {
      if (!countEl) return;
      var pv = perView();
      var first = page * pv + 1;
      var last = Math.min(total, page * pv + pv);
      if (last > first) countEl.innerHTML = 'Cars <b>' + first + '–' + last + '</b> of <b>' + total + '</b> available';
      else countEl.innerHTML = 'Car <b>' + first + '</b> of <b>' + total + '</b> available';
    }
    function syncVideos() {
      var pv = perView();
      cars.forEach(function (car, idx) {
        var visible = (idx >= page * pv && idx < page * pv + pv);
        if (!visible) {
          Array.prototype.forEach.call(car.querySelectorAll('video'), function (v) {
            try { v.pause(); } catch (e) {}
          });
        }
      });
    }
    function render() {
      var maxPage = pageCount() - 1;
      if (page > maxPage) page = maxPage;
      if (page < 0) page = 0;
      track.style.transform = 'translateX(' + (-page * 100) + '%)';
      updateLabel();
      if (prev) prev.disabled = (page <= 0);
      if (next) next.disabled = (page >= maxPage);
      syncVideos();
    }
    function go(d) { page += d; render(); }

    if (next) next.addEventListener('click', function () { go(1); });
    if (prev) prev.addEventListener('click', function () { go(-1); });

    sc.setAttribute('tabindex', '0');
    sc.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    });

    // Swipe to change cars — but only when the gesture does NOT start on a photo
    // gallery (so the on-photo swipe still flips photos, no clash).
    var x0 = null, y0 = null, ignore = false;
    sc.addEventListener('touchstart', function (e) {
      var t = e.touches[0]; x0 = t.clientX; y0 = t.clientY;
      ignore = !!(e.target.closest && e.target.closest('[data-gallery]'));
    }, { passive: true });
    sc.addEventListener('touchend', function (e) {
      if (x0 === null || ignore) { x0 = y0 = null; return; }
      var t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) { go(dx < 0 ? 1 : -1); }
      x0 = y0 = null;
    }, { passive: true });

    // Layout can switch between 1-up and 2-up on resize — reset to a valid page.
    var lastPV = perView();
    window.addEventListener('resize', function () {
      var pv = perView();
      if (pv !== lastPV) { lastPV = pv; page = 0; }
      render();
    });

    render();
  }());
})();
