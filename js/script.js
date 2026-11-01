// Shared JavaScript for navigation, footer year and contact form.
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  document.querySelectorAll(".year").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  const form = document.getElementById("contactForm");
  if (!form) return;

  const fields = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    subject: document.getElementById("subject"),
    message: document.getElementById("message")
  };
  const status = document.getElementById("formStatus");

  function showError(field, message) {
    document.getElementById(`${field}Error`).textContent = message;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    Object.keys(fields).forEach((field) => showError(field, ""));
    status.textContent = "";
    let valid = true;

    if (fields.name.value.trim().length < 2) {
      showError("name", "Please enter a name with at least 2 characters.");
      valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(fields.email.value.trim())) {
      showError("email", "Please enter a valid email address.");
      valid = false;
    }

    if (!fields.subject.value.trim()) {
      showError("subject", "Please enter a subject.");
      valid = false;
    }

    if (fields.message.value.trim().length < 10) {
      showError("message", "Message must contain at least 10 characters.");
      valid = false;
    }

    if (!valid) {
      status.textContent = "Please correct the highlighted fields.";
      status.style.color = "#bd3d32";
      return;
    }

    // Front-end demo only: connect a backend or form service to receive messages.
    status.textContent = "Thank you! Your message passed validation. This demo form is not connected to a server.";
    status.style.color = "#174c3c";
    form.reset();
  });
});