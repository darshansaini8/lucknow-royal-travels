
"use strict";

/* REPLACE WITH THE BUSINESS'S REAL WHATSAPP NUMBER */
const WHATSAPP_NUMBER = "919876543210";

const currentPage = location.pathname.split("/").pop() || "index.html";

const navigation = [
  { label: "Home", href: "index.html" },
  { label: "About Us", href: "about.html" },
  { label: "Our Fleet", href: "fleet.html" },
  { label: "Tour Packages", href: "packages.html" },
  { label: "Contact", href: "contact.html" }
];

const header = document.getElementById("site-header");

if (header) {
  header.innerHTML = `
    <header class="site-header">
      <div class="container nav-inner">
        <a class="brand" href="index.html" aria-label="Lucknow Royal Tours home">
          <span class="brand-mark">R</span>
          <span class="brand-copy">
            <strong>Lucknow Royal</strong>
            <small>Tours & Travels</small>
          </span>
        </a>

        <button class="menu-toggle" id="menu-toggle"
          aria-label="Open navigation" aria-expanded="false"
          aria-controls="main-navigation">☰</button>

        <nav class="nav-links" id="main-navigation" aria-label="Main navigation">
          ${navigation.map(item => `
            <a href="${item.href}"
              class="${currentPage === item.href ? "active" : ""}"
              ${currentPage === item.href ? 'aria-current="page"' : ""}>
              ${item.label}
            </a>
          `).join("")}
        </nav>

        <a class="nav-cta" href="contact.html">Book a Taxi ↗</a>
      </div>
    </header>
  `;

  const menuButton = document.getElementById("menu-toggle");
  const menu = document.getElementById("main-navigation");

  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
    menuButton.textContent = isOpen ? "×" : "☰";
  });

  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "☰";
    });
  });
}

/* SHARED FOOTER */

const footer = document.getElementById("site-footer");

if (footer) {
  footer.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a class="brand" href="index.html">
              <span class="brand-mark" style="color:#fff">R</span>
              <span class="brand-copy">
                <strong>Lucknow Royal</strong>
                <small style="color:#c7b9ad">Tours & Travels</small>
              </span>
            </a>
            <p>
              Thoughtful travel, comfortable journeys and taxi services
              for exploring Lucknow and destinations beyond.
            </p>
          </div>

          <div class="footer-column">
            <h3>Explore</h3>
            <a href="about.html">About Us</a>
            <a href="fleet.html">Our Fleet</a>
            <a href="packages.html">Tour Packages</a>
            <a href="contact.html">Contact Us</a>
          </div>

          <div class="footer-column">
            <h3>Plan Your Ride</h3>
            <p>Local taxi & sightseeing</p>
            <p>Airport transfers</p>
            <p>Outstation travel</p>
            <a href="#" data-whatsapp>Enquire on WhatsApp ↗</a>
          </div>
        </div>

        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} Lucknow Royal Tours & Travels.</span>
          <span>Made for journeys worth remembering.</span>
        </div>
      </div>
    </footer>
  `;
}

/* WHATSAPP HELPER */

function openWhatsApp(message) {
  if (!/^[1-9]\d{9,14}$/.test(WHATSAPP_NUMBER)) {
    alert("Please set the correct business WhatsApp number in js/script.js.");
    return;
  }

  const url = "https://wa.me/" + WHATSAPP_NUMBER +
    "?text=" + encodeURIComponent(message);

  window.open(url, "_blank", "noopener,noreferrer");
}

document.querySelectorAll("[data-whatsapp]").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    openWhatsApp(
      "Hello Lucknow Royal Tours & Travels. I would like to enquire about a taxi booking."
    );
  });
});

/* FADE-IN ON SCROLL */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(element => revealObserver.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}

/* PREVENT PAST TRAVEL DATES */

const dateInput = document.getElementById("travel-date");

if (dateInput) {
  const today = new Date();
  const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
  ].join("-");

  dateInput.min = localToday;
}

/* HOME PAGE BOOKING FORM */

const bookingForm = document.getElementById("booking-form");

if (bookingForm) {
  bookingForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!bookingForm.reportValidity()) return;

    const form = new FormData(bookingForm);
    const pickup = String(form.get("pickup")).trim();
    const destination = String(form.get("destination")).trim();
    const date = String(form.get("date"));
    const vehicle = String(form.get("vehicle"));

    const message = [
      "Hello Lucknow Royal Tours & Travels!",
      "",
      "I would like to request a taxi booking.",
      "Pickup: " + pickup,
      "Destination: " + destination,
      "Travel date: " + date,
      "Preferred vehicle: " + vehicle,
      "",
      "Please confirm availability and the total fare."
    ].join("\n");

    openWhatsApp(message);
  });
}

/* CONTACT PAGE ENQUIRY */

const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const data = new FormData(contactForm);

    const message = [
      "Hello Lucknow Royal Tours & Travels!",
      "",
      "New travel enquiry",
      "Name: " + String(data.get("name")).trim(),
      "Phone: " + String(data.get("phone")).trim(),
      "Email: " + String(data.get("email") || "").trim(),
      "Service: " + String(data.get("service")),
      "Travel date: " + String(data.get("date") || "Not specified"),
      "Message: " + String(data.get("message")).trim()
    ].join("\n");

    openWhatsApp(message);
  });

  const params = new URLSearchParams(location.search);
  const requestedVehicle = params.get("vehicle");
  const vehicleField = contactForm.querySelector('[name="service"]');

  if (requestedVehicle && vehicleField) {
    const option = [...vehicleField.options].find(
      item => item.value.toLowerCase() === requestedVehicle.toLowerCase()
    );

    if (option) vehicleField.value = option.value;
  }
}



/* CONTACT PAGE DATE VALIDATION */

const contactDate = document.getElementById("contact-date");

if (contactDate) {
  const now = new Date();
  contactDate.min = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0")
  ].join("-");
}

/* PRE-FILL SERVICE OR TOUR FROM URL */

if (contactForm) {
  const params = new URLSearchParams(window.location.search);
  const serviceField = contactForm.querySelector('[name="service"]');
  const messageField = contactForm.querySelector('[name="message"]');

  const requestedVehicle = params.get("vehicle");
  const requestedTour = params.get("tour");

  if (requestedVehicle && serviceField) {
    const requested = requestedVehicle.toLowerCase();

    const match = Array.from(serviceField.options).find(option =>
      option.value.toLowerCase() === requested
    );

    if (match) serviceField.value = match.value;
  }

  if (requestedTour && messageField) {
    const safeTour = requestedTour.slice(0, 150).replace(/[<>]/g, "");

    messageField.value = "I am interested in the following tour: " + safeTour +
      ". Please share the itinerary and quotation.";
  }
}
