/**
 * AutoDrive — Find My Car email alert (Google Apps Script)
 * --------------------------------------------------------
 * find-my-car.html POSTs here when someone finishes the application (qualified, or stopped
 * after giving their name + mobile). This emails every answer to ALERT_TO, so leads who
 * qualify but never book the Calendly call can still be followed up.
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
var MAX_PER_DAY = 30;

var LABELS = {
  name: "Name", mobile: "Mobile", location: "Location", about: "About them", budget: "Budget",
  funds: "Funds", timing: "Buying in next couple of months", priority: "Matters most", source: "Lead source"
};

function doPost(e) {
  try {
    var d = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (d.token !== TOKEN) return out({ ok: false, error: "bad token" });
    if (!d.name || !d.mobile) return out({ ok: false, error: "missing contact" });
    if (!underDailyCap()) return out({ ok: false, error: "daily cap" });

    var clip = function (v) { return String(v || "").replace(/[\r\n]+/g, " ").slice(0, 400); };
    var outcome = d.outcome === "qualified" ? "QUALIFIED" : "Not qualified (" + clip(d.reason) + ")";

    var lines = ["Outcome: " + outcome, ""];
    Object.keys(LABELS).forEach(function (k) { if (d[k]) lines.push(LABELS[k] + ": " + clip(d[k])); });
    var mobile = clip(d.mobile).replace(/[^\d+]/g, "");
    lines.push("", "WhatsApp them: https://wa.me/" + mobile.replace(/^\+/, "").replace(/^0/, "61"));
    lines.push("", d.outcome === "qualified"
      ? "They were shown the 'Book my eligibility call' button. If no Calendly booking arrives, message them."
      : "They were stopped by the form, but left their details.");

    MailApp.sendEmail({
      to: ALERT_TO,
      subject: "Find My Car: " + clip(d.name) + " | " + (d.outcome === "qualified" ? "QUALIFIED" : "not qualified") +
               " | " + clip(d.budget || "no budget") + " | " + clip(d.location || ""),
      body: lines.join("\n"),
      name: "AutoDrive website"
    });
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  }
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
