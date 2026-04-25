/**
 * Private Google Apps Script backend for the contact form.
 *
 * IMPORTANT:
 * 1) Create a new standalone Apps Script project in script.google.com
 * 2) Paste this file into that private project
 * 3) Replace RECIPIENT_EMAIL with your private Gmail address
 * 4) Deploy as a Web app with access set to Anyone
 * 5) Copy the Web app URL into assets/config.js in your GitHub Pages site
 *
 * Do NOT commit your real Gmail address into a public GitHub repo.
 */

const RECIPIENT_EMAIL = "romi2410@gmail.com";
const SUBJECT_PREFIX = "Portfolio Contact";

function doPost(e) {
  try {
    const params = e && e.parameter ? e.parameter : {};
    const name = clean(params.name);
    const email = clean(params.email);
    const company = clean(params.company);
    const message = clean(params.message);
    const website = clean(params.website);

    if (website) {
      return jsonResponse({ ok: true });
    }

    if (!name || !email || !message) {
      return jsonResponse({ ok: false, error: "Missing required fields." });
    }

    const safeSubject = SUBJECT_PREFIX + ": " + truncate(name, 80);
    const body = [
      "New message from your portfolio site",
      "",
      "Name: " + name,
      "Email: " + email,
      "Company / role: " + (company || "Not provided"),
      "",
      "Message:",
      message,
    ].join("\n");

    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      subject: safeSubject,
      body: body,
      replyTo: email,
      name: "Portfolio Contact Form",
    });

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) });
  }
}

function clean(value) {
  return String(value || "").replace(/[<>]/g, "").trim();
}

function truncate(value, maxLength) {
  return value.length > maxLength ? value.slice(0, maxLength) : value;
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
