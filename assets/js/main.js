document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("open", !open);
      toggle.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
      nav.classList.remove("open");
    }));
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  // Subtle entrance animations; respect reduced-motion preferences.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  // Portfolio category filtering
  const filterButtons = document.querySelectorAll("[data-filter]");
  const projectCards = document.querySelectorAll(".portfolio-grid [data-category]");
  filterButtons.forEach(button => button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.toggle("active", btn === button));
    const filter = button.dataset.filter;
    projectCards.forEach(card => {
      card.hidden = !(filter === "all" || card.dataset.category === filter);
    });
  }));

  // Frontend-only contact form validation and success state.
  const form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const success = form.querySelector(".form-success");
      if (success) {
        success.hidden = false;
        success.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      form.reset();
    });
  }
});