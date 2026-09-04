/**
 * AutoDrive — booking invite webhook (Google Apps Script)
 * ------------------------------------------------------
 * Creates the booking on JITTY'S Google Calendar with the customer as a guest,
 * so Google emails the customer a real invitation (Accept / Decline) and the
 * acceptance shows back on Jitty's event. Both sides get reminders.
 *
 * DEPLOY (5 minutes, must be done while signed in as Jitty's Google account):
 *   1. Go to https://script.google.com  →  New project
 *   2. Delete the sample code, paste this whole file, and click Save (name it "AutoDrive bookings")
 *   3. Deploy  →  New deployment  →  type: Web app
 *        Execute as:      Me
 *        Who has access:  Anyone
 *      → Deploy → Authorise (Google will warn "unverified app" — Advanced → Go to project) → Allow
 *   4. Copy the Web app URL (ends in /exec)
 *   5. Paste that URL into booking.html  →  var ENDPOINT = "…";  and push the site.
 *
 * The TOKEN below must match the one in confirm.html. It is a light abuse deterrent,
 * not a secret — the real protection is the daily cap and the sanity checks.
 */

var TOKEN       = "ad-book-2026";
var MAX_PER_DAY = 40;
var LOC         = "AutoDrive, 6 Lolands Rd, Salisbury Plain SA 5109";

function doPost(e) {
  try {
    var d = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    if (d.token !== TOKEN) return out({ ok: false, error: "bad token" });
    if (!d.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) return out({ ok: false, error: "bad email" });

    var start = new Date(d.startUTC), end = new Date(d.endUTC);
    if (isNaN(start) || isNaN(end) || end <= start) return out({ ok: false, error: "bad time" });
    if (start.getTime() < Date.now() - 24 * 3600 * 1000) return out({ ok: false, error: "in the past" });
    if (end.getTime() - start.getTime() > 12 * 3600 * 1000) return out({ ok: false, error: "too long" });

    // daily cap so a leaked link can't flood the calendar
    var props = PropertiesService.getScriptProperties();
    var key = "count_" + Utilities.formatDate(new Date(), "Australia/Adelaide", "yyyyMMdd");
    var n = parseInt(props.getProperty(key) || "0", 10);
    if (n >= MAX_PER_DAY) return out({ ok: false, error: "daily limit reached" });
    props.setProperty(key, String(n + 1));

    var name = clean(d.name) || "Customer";
    var title = name + " — " + (clean(d.service) || "Booking");
    var desc = [
      "Vehicle: " + (clean(d.car) || "-"),
      "Phone: "   + (clean(d.phone) || "-"),
      "Email: "   + d.email,
      d.note ? "Note: " + clean(d.note) : "",
      "",
      "Booked via autodrivesalisburyplain.com.au"
    ].filter(Boolean).join("\n");

    var ev = CalendarApp.getDefaultCalendar().createEvent(title, start, end, {
      location: LOC,
      description: desc,
      guests: d.email,
      sendInvites: true            // <- this is what emails the customer the invitation
    });
    ev.addPopupReminder(120);      // Jitty: 2 hours before
    ev.addEmailReminder(24 * 60);  // Jitty: the day before

    return out({ ok: true, id: ev.getId() });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  }
}

// Visiting the URL in a browser just confirms it's alive.
function doGet() { return out({ ok: true, service: "AutoDrive booking webhook" }); }

function clean(s) { return String(s || "").replace(/[\r\n]+/g, " ").slice(0, 200).trim(); }
function out(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
