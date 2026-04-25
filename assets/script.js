(function () {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const endpoint = window.CONTACT_ENDPOINT_URL;

  if (!form || !status) return;

  if (!endpoint || endpoint.includes("PASTE")) {
    status.textContent = "Contact form is in setup mode. Add your Apps Script URL in assets/config.js to activate it.";
    status.className = "form-status";
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!endpoint || endpoint.includes("PASTE")) {
      status.textContent = "Form endpoint is not configured yet.";
      status.className = "form-status is-error";
      return;
    }

    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const website = String(formData.get("website") || "").trim();

    if (!name || !email || !message) {
      status.textContent = "Please complete your name, email, and message.";
      status.className = "form-status is-error";
      return;
    }

    if (website) {
      status.textContent = "Thanks!";
      status.className = "form-status is-success";
      form.reset();
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const originalLabel = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    status.textContent = "";
    status.className = "form-status";

    try {
      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      form.reset();
      status.textContent = "Message sent. I’ll get back to you soon.";
      status.className = "form-status is-success";
    } catch (error) {
      console.error(error);
      status.textContent = "Something went wrong. Please try again in a moment.";
      status.className = "form-status is-error";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalLabel;
    }
  });
})();
