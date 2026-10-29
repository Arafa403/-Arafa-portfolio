
document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Navigation
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  toggle?.addEventListener("click", () => {
    const isOpen = nav?.classList.toggle("open") ?? false;

    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.textContent = isOpen ? "✕" : "☰";
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle?.setAttribute("aria-expanded", "false");

      if (toggle) toggle.textContent = "☰";
    });
  });

  // 2. Copy Email
  const copyButton = document.querySelector(".copy-email");
  const feedback = document.querySelector(".copy-feedback");

  copyButton?.addEventListener("click", async () => {
    const email =
      copyButton.dataset.copy || "arafamd7420@gmail.com";

    try {
      await navigator.clipboard.writeText(email);

      if (feedback) {
        feedback.textContent = "Email copied to clipboard.";
      }
    } catch (error) {
      if (feedback) {
        feedback.textContent = `Email: ${email}`;
      }
    }
  });

  // 3. EmailJS Contact Form
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");

  if (!form || !status) return;

  if (typeof emailjs === "undefined") {
    status.textContent =
      "Email service unavailable. Refresh the page and try again.";

    console.error("EmailJS library was not loaded.");
    return;
  }

  const SERVICE_ID = "service_fdmqd6f";
  const TEMPLATE_ID = "template_wypihdr";
  const PUBLIC_KEY = "pCpnsTKQ9uqT6_y_t";

  emailjs.init({
    publicKey: PUBLIC_KEY
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const button = form.querySelector('button[type="submit"]');
    const originalText = button?.innerHTML ?? "";

    if (button) {
      button.disabled = true;
      button.textContent = "Sending...";
    }

    status.textContent = "Sending your message...";

    try {
      const response = await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        form
      );

      console.log("EmailJS success:", response.status, response.text);

      status.textContent =
        "Message sent successfully! Thank you for contacting me.";

      form.reset();
    } catch (error) {
      console.error("EmailJS error:", error);

      status.textContent =
        "Unable to send your message. Please try again.";

    } finally {
      if (button) {
        button.disabled = false;
        button.innerHTML = originalText;
      }
    }
  });
});
