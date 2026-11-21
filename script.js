document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.classList.add("js");
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const closeMenu = () => {
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Open menu");
    navMenu?.classList.remove("is-open");
  };
  navToggle?.addEventListener("click", () => {
    const open = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!open));
    navToggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
    navMenu?.classList.toggle("is-open", !open);
  });
  document.querySelectorAll(".nav-menu a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navMenu?.classList.contains("is-open")) {
      closeMenu();
      navToggle?.focus();
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  const filterButtons = document.querySelectorAll(".filter-button");
  const projectCards = document.querySelectorAll(".project-card");
  const filterStatus = document.getElementById("project-filter-status");
  filterButtons.forEach((button) => button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    projectCards.forEach((card) => {
      const categories = card.dataset.categories || "";
      card.classList.toggle("is-hidden", filter !== "all" && !categories.split(" ").includes(filter));
    });
    const visibleCount = [...projectCards].filter((card) => !card.classList.contains("is-hidden")).length;
    if (filterStatus) filterStatus.textContent = `${visibleCount} ${visibleCount === 1 ? "project" : "projects"} shown`;
  }));

  const navLinks = [...document.querySelectorAll(".nav-menu a")];
  const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "location"); else link.removeAttribute("aria-current");
      });
    }), { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 });
    sections.forEach((section) => navObserver.observe(section));

    const revealObserver = new IntersectionObserver((entries, observer) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));
  } else {
    document.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));
  }

  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const data = new FormData(contactForm);
    const subject = encodeURIComponent(data.get("subject"));
    const body = encodeURIComponent(`Hello Maira,\n\n${data.get("message")}\n\nFrom: ${data.get("name")} (${data.get("email")})`);
    if (formStatus) formStatus.textContent = "Opening your email application with a pre-filled draft.";
    window.location.href = `mailto:mairasarwar132@gmail.com?subject=${subject}&body=${body}`;
  });
});
