/**
 * AutoDrive — Find My Car email alert (Google Apps Script)
 * --------------------------------------------------------
 * find-my-car.html POSTs here the moment someone leaves their name + mobile (outcome "contact",
 * even if they never finish), again when they reach the booking step (outcome "qualified"), and
 * again when they confirm a time in the embedded Calendly (outcome "booked").
 * This emails every answer to ALERT_TO, so leads who drop out or never book can still be followed up.
 *
 * Version 5 (2026-11-25): also takes BOOKINGS from the website's two Typeform-style forms
 * (kind "service" from /book-service, kind "test_drive" from /cars/<slug>). Those are emailed to
 * BOOKING_TO the moment the customer submits, so nobody has to open WhatsApp.
 *
 * UPDATING an existing deployment keeps the same /exec URL: paste the new code, Save, then
 * Deploy -> Manage deployments -> pencil (edit) -> Version: New version -> Deploy.
 *
 * DEPLOY (5 minutes), signed in to Stalin's personal Google account (stalinsajie@gmail.com):
 *   1. Go to https://script.google.com  →  New project
 *   2. Delete the sample code, paste this whole file, and click Save (name it "AutoDrive car finder alert")
 *   3. Deploy  →  New deployment  →  type: Web app
 *        Execute as:      Me
 *        Who has access:  Anyone
 *      → Deploy → Authorise (Google will warn "unverified app" — Advanced → Go to project) → Allow
 *   4. Copy the Web app URL (ends in /exec)
 *   5. Paste that URL into find-my-car.html  →  var ALERT_URL = "…";  and push the site.
 *
 * The TOKEN below must match the one in find-my-car.html. It is a light abuse deterrent,
 * not a secret — the real protection is the daily cap and the length limits.
 */

var TOKEN       = "ad-find-2026";
var ALERT_TO    = "stalinsajie@gmail.com";
var BOOKING_TO  = "autodrive5109@gmail.com, stalinsajie@gmail.com";   // service + test drive bookings
var MAX_PER_DAY = 30;
var GUIDE_URL   = "https://autodrivesalisburyplain.com.au/car-guide.pdf";

var LABELS = {
  name: "Name", mobile: "Mobile", email: "Email", location: "Location", about: "About them", budget: "Budget",
  funds: "Funds", timing: "Buying in next couple of months", priority: "Matters most", source: "Lead source"
};

function doPost(e) {
  try {
    var d = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (d.token !== TOKEN) return out({ ok: false, error: "bad token" });
    if (d.kind === "service" || d.kind === "test_drive") return booking(d);
    if (!d.name || !d.mobile) return out({ ok: false, error: "missing contact" });
    if (!underDailyCap()) return out({ ok: false, error: "daily cap" });

    var clip = function (v) { return String(v || "").replace(/[\r\n]+/g, " ").slice(0, 400); };
    var outcome = d.outcome === "booked" ? "BOOKED (confirmed a call time in Calendly)" :
                  d.outcome === "qualified" ? "QUALIFIED" :
                  d.outcome === "contact" ? "NEW LEAD (left their details, still finishing the form)" :
                  "Not qualified (" + clip(d.reason) + ")";
    var tag = d.outcome === "booked" ? "BOOKED" : d.outcome === "qualified" ? "QUALIFIED" : d.outcome === "contact" ? "NEW LEAD" : "not qualified";

    var lines = ["Outcome: " + outcome, ""];
    Object.keys(LABELS).forEach(function (k) { if (d[k]) lines.push(LABELS[k] + ": " + clip(d[k])); });
    var mobile = clip(d.mobile).replace(/[^\d+]/g, "");
    var wa = "https://wa.me/" + mobile.replace(/^\+/, "").replace(/^0/, "61");
    lines.push("", "WhatsApp them: " + wa);
    // The page promises the free strategy PDF by text: one tap opens WhatsApp with the message ready.
    if (d.outcome === "contact" || d.outcome === "qualified") {
      var first = clip(d.name).split(" ")[0];
      lines.push("", "WhatsApp them the guide too (one tap, message ready): " + wa + "?text=" + encodeURIComponent(
        "Hi " + first + ", it's Jitty from AutoDrive Salisbury Plain. Here's your free car buying guide (we emailed it too): " +
        GUIDE_URL + " We'd love to help you find a car that suits you. When's a good time to talk?"));
    }
    lines.push("", d.outcome === "booked"
      ? "They booked their call. The time and Zoom link are in the Calendly email to autodrive5109@gmail.com."
      : d.outcome === "qualified"
      ? "They were shown the booking calendar. If no BOOKED email follows soon, they didn't pick a time: message them."
      : d.outcome === "contact"
      ? "They passed every question and left their name and number. If no QUALIFIED email follows soon, they stopped at the last step: message them."
      : "They were stopped by the form, but left their details.");

    // Lead magnet: the first time they leave their details, email them the free strategy PDF.
    var email = clip(d.email).trim();
    if (d.outcome === "contact" && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      try { sendGuide(email, clip(d.name).split(" ")[0]); lines.push("", "Free strategy PDF emailed to " + email + "."); }
      catch (gErr) { lines.push("", "Could NOT email them the strategy PDF (" + gErr + "). Send it by WhatsApp below."); }
    }

    MailApp.sendEmail({
      to: ALERT_TO,
      subject: "Find My Car: " + clip(d.name) + " | " + tag +
               " | " + clip(d.budget || "no budget") + " | " + clip(d.location || ""),
      body: lines.join("\n"),
      name: "AutoDrive website"
    });
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  }
}

// A booking from /book-service or a car page: every answer in the email, subject says what and when.
function booking(d) {
  var clip = function (v, n) { return String(v || "").replace(/[\r\n]+/g, " ").slice(0, n || 200); };
  if (!d.name || !d.phone) return out({ ok: false, error: "missing contact" });
  if (!underDailyCap()) return out({ ok: false, error: "daily cap" });
  var rows = Array.isArray(d.rows) ? d.rows.slice(0, 20) : [];
  var lines = rows.map(function (r) { return clip(r && r[0], 40) + ": " + clip(r && r[1]); });
  var phone = clip(d.phone, 30).replace(/[^\d+]/g, "");
  lines.push("", "Call them: " + phone,
             "WhatsApp them: https://wa.me/" + phone.replace(/^\+/, "").replace(/^0/, "61"));
  if (d.page) lines.push("", "Sent from: " + clip(d.page, 300));
  var subject = d.kind === "service"
    ? "SERVICE BOOKING: " + clip(d.name, 60) + " | " + clip(d.what, 60) + " | " + clip(d.when, 60)
    : "TEST DRIVE: " + clip(d.name, 60) + " | " + clip(d.what, 80) + " | " + clip(d.when, 60);
  var mail = { to: BOOKING_TO, subject: subject, body: lines.join("\n"), name: "AutoDrive website" };
  var email = clip(d.email, 120).trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) mail.replyTo = email;   // Reply goes straight to the customer
  MailApp.sendEmail(mail);
  return out({ ok: true });
}

function sendGuide(to, first) {
  // Owner style rule: short, plain, direct words. No phone number.
  var esc = function (v) { return String(v).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var text = "Hi " + first + ",\n\nHere's your free car buying guide:\n" + GUIDE_URL +
    "\n\nIt shows you 6 simple steps to buy a good car and not get ripped off.\n\n" +
    "We'll get in touch soon to help you find a car that suits you.\n\nAutoDrive Salisbury Plain\n6 Lolands Rd, Salisbury Plain SA 5109";
  var html = '<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.5;color:#222;max-width:520px">' +
    "<p>Hi " + esc(first) + ",</p><p>Here's your free car buying guide:</p>" +
    '<p><a href="' + GUIDE_URL + '" style="display:inline-block;background:#C01418;color:#fff;font-weight:bold;text-decoration:none;padding:12px 22px;border-radius:999px">' +
    "Download the guide (PDF)</a></p>" +
    "<p>It shows you 6 simple steps to buy a good car and not get ripped off.</p>" +
    "<p>We'll get in touch soon to help you find a car that suits you.</p>" +
    "<p>AutoDrive Salisbury Plain<br>6 Lolands Rd, Salisbury Plain SA 5109</p></div>";
  MailApp.sendEmail({ to: to, subject: "Your free car buying guide", body: text, htmlBody: html,
    name: "AutoDrive Salisbury Plain", replyTo: "autodrive5109@gmail.com" });
}

function underDailyCap() {
  var props = PropertiesService.getScriptProperties();
  var key = "n_" + Utilities.formatDate(new Date(), "Australia/Adelaide", "yyyyMMdd");
  var n = Number(props.getProperty(key) || 0);
  if (n >= MAX_PER_DAY) return false;
  props.setProperty(key, String(n + 1));
  return true;
}

function out(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
