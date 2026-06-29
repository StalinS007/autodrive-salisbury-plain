/* AutoDrive Salisbury Plain — interactions */
(function () {
  "use strict";

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

  // Video-background services section animation
  (function () {
    var V = document.getElementById('ad-vid');
    if (!V) return;
    var flash = document.getElementById('ad-flash'), flashg = document.getElementById('ad-flashg');
    var groups = [].slice.call(document.querySelectorAll('.ad-lbl'));
    var rows = [].slice.call(document.querySelectorAll('.ad-vrow'));
    var W = 1920;
    function cl(v, a, b) { return Math.max(a, Math.min(b, v)); }
    function sm(a, b, t) { t = cl((t - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
    function lerp(a, b, t) { return a + (b - a) * t; }
    function mix(c1, c2, t) { return 'rgb(' + Math.round(lerp(c1[0], c2[0], t)) + ',' + Math.round(lerp(c1[1], c2[1], t)) + ',' + Math.round(lerp(c1[2], c2[2], t)) + ')'; }
    var AMBER = [245, 166, 35], GREEN = [43, 182, 115];
    function gtime(o) { return 3.45 + o * 0.11; }
    function frame() {
      var t = V.currentTime || 0;
      flash.style.opacity = (t < 1.8 ? (Math.sin(cl((t - 0.1) / 1.5, 0, 1) * Math.PI) * 0.85).toFixed(3) : 0);
      flash.setAttribute('x', lerp(-220, W, cl((t - 0.1) / 1.5, 0, 1)).toFixed(0));
      var gp = cl((t - 5.6) / 1.6, 0, 1);
      flashg.style.opacity = ((t > 5.55 && t < 7.35) ? (Math.sin(gp * Math.PI) * 0.8).toFixed(3) : 0);
      flashg.setAttribute('x', lerp(W, -220, gp).toFixed(0));
      groups.forEach(function (g) {
        var o = +g.getAttribute('data-ord');
        var rev = sm(3.0 + o * 0.03, 3.35 + o * 0.03, t) * (1 - sm(4.95, 5.2, t));
        var gr = sm(gtime(o), gtime(o) + 0.3, t);
        g.querySelector('.ad-leader').style.opacity = rev;
        g.querySelector('.ad-pill').style.opacity = rev;
        g.querySelector('.ad-ptxt').style.opacity = rev;
        var fl = g.querySelector('.ad-flag'), ring = g.querySelector('.ad-flagring'), tk = g.querySelector('.ad-tick');
        fl.style.opacity = rev; fl.setAttribute('fill', mix(AMBER, GREEN, gr)); ring.style.opacity = rev; tk.style.opacity = rev * gr;
      });
      rows.forEach(function (r, i) {
        var gr = sm(gtime(i), gtime(i) + 0.3, t);
        r.querySelector('.ad-vdot').style.background = mix(AMBER, GREEN, gr);
        r.querySelector('.ad-vchk').style.opacity = gr;
        if (gr > 0.5) r.classList.add('done'); else r.classList.remove('done');
      });
      requestAnimationFrame(frame);
    }
    V.addEventListener('loadeddata', function () { V.play().catch(function () {}); });
    requestAnimationFrame(frame);
  }());
})();
