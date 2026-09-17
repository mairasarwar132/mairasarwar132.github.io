/* Vanilla JS for navigation, theme, filters, modal, form, and small UX helpers. */

const PROJECTS = {
  "right-eat-web": {
    title: "Right Eat",
    subtitle: "Food website",
    status: "Web project",
    statusClass: "",
    description:
      "Right Eat is a responsive food website built with HTML, CSS and JavaScript. It presents food items with a clean restaurant-style layout and a simple interactive web experience.",
    tech: ["HTML", "CSS", "JavaScript", "Responsive Design", "Web UI"],
    listHeading: "Features",
    features: [
      "Food website interface",
      "Responsive layout",
      "Food item showcase",
      "Clean navigation",
      "Interactive JavaScript behavior"
    ],
    github: null,
    demo: null
  },
  "right-order-right-eat": {
    title: "Right Order Right Eat",
    subtitle: "Flutter Food Ordering Application",
    status: "Featured project",
    statusClass: "",
    description:
      "Right Order Right Eat is a Flutter-based food ordering application designed for the Pakistani market. The application allows customers to explore food items, manage their cart, place orders and interact with restaurant-related functionality.",
    tech: ["Flutter", "Dart", "Firebase", "Firestore", "Firebase Storage", "SQLite", "Node.js", "APIs"],
    listHeading: "Features",
    features: [
      "Food browsing",
      "Food categories",
      "Cart",
      "Checkout",
      "Firebase Authentication",
      "Firestore",
      "Firebase Storage",
      "SQLite/local data",
      "Admin food CRUD",
      "API integration",
      "Delivery-related functionality"
    ],
    github: null,
    demo: null
  },
  fittrack: {
    title: "FitTrack Pro",
    subtitle: "Flutter fitness tracking app",
    status: "Completed",
    statusClass: "is-done",
    description:
      "Fitness tracking mobile application built with Flutter using modern state management, navigation and local database technologies.",
    tech: ["Flutter", "Dart", "Riverpod", "go_router", "Drift", "SQLite"],
    listHeading: "Features",
    features: [
      "Fitness tracking",
      "Local database",
      "State management",
      "Navigation",
      "Light/Dark mode"
    ],
    github: "https://github.com/mairasarwar132/CodeAlpha_FitnessTracker",
    demo: null
  },
  quoteflow: {
    title: "QuoteFlow",
    subtitle: "Random quote generator",
    status: "Completed",
    statusClass: "is-done",
    description: "Random quote generator mobile application developed with Flutter.",
    tech: ["Flutter", "Dart", "Riverpod", "go_router", "Google Fonts"],
    listHeading: "Notes",
    features: ["Completed Flutter mobile project associated with the CodeAlpha internship."],
    github: "https://github.com/mairasarwar132/CodeAlpha_RandomQuoteGenerator",
    demo: null
  },
  flashcard: {
    title: "Flashcard Quiz App",
    subtitle: "Flutter flashcards and quiz",
    status: "Completed",
    statusClass: "is-done",
    description:
      "Completed Flutter-based flashcard and quiz application with local database storage and state management.",
    tech: ["Flutter", "Dart", "Riverpod", "go_router", "Google Fonts", "Equatable", "Drift", "SQLite"],
    listHeading: "Features",
    features: [
      "Create flashcards",
      "Update flashcards",
      "Delete flashcards",
      "Show Answer",
      "Next / Previous",
      "Local database",
      "State management"
    ],
    github: "https://github.com/mairasarwar132/CodeAlpha_FlashcardQuizApp",
    demo: null
  },
  negotiation: {
    title: "Smart Price Negotiation Agent",
    subtitle: "Academic AI mini project",
    status: "AI mini project",
    statusClass: "",
    description:
      "An AI mini project that simulates price negotiation using the Minimax algorithm and game-theoretic decision making. This is an academic simulation, not a production AI agent.",
    tech: ["Artificial Intelligence", "Minimax Algorithm", "Game Theory", "State Space", "PEAS", "Decision Making"],
    listHeading: "Concepts",
    features: [
      "Artificial Intelligence",
      "Minimax Algorithm",
      "Game Theory",
      "State Space",
      "PEAS",
      "Decision Making"
    ],
    github: null,
    demo: null
  },
  heart: {
    title: "Heart Failure Prediction",
    subtitle: "Academic machine learning project",
    status: "Academic ML project",
    statusClass: "",
    description:
      "An academic machine learning project designed to explore prediction of heart failure using relevant patient data.",
    tech: ["Machine Learning", "Data preprocessing", "Classification", "Prediction", "Model evaluation"],
    listHeading: "Concepts",
    features: [
      "Machine Learning",
      "Data preprocessing",
      "Classification",
      "Prediction",
      "Model evaluation"
    ],
    github: null,
    demo: null
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  initTheme();
  initNav();
  initSmoothScroll();
  initActiveNav();
  initFilters();
  initModal();
  initReveal();
  initBackToTop();
});

function initTheme() {
  const stored = localStorage.getItem("theme");
  const theme = stored === "light" || stored === "dark" ? stored : "dark";
  document.documentElement.setAttribute("data-theme", theme);
  updateThemeButton(theme);

  const toggle = document.querySelector(".theme-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateThemeButton(next);
  });
}

function updateThemeButton(theme) {
  const toggle = document.querySelector(".theme-toggle");
  if (!toggle) return;
  toggle.setAttribute(
    "aria-label",
    theme === "light" ? "Switch to dark theme" : "Switch to light theme"
  );
}

function initNav() {
  const btn = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    btn.setAttribute("aria-label", open ? "Open menu" : "Close menu");
    menu.classList.toggle("is-open", !open);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Open menu");
      menu.classList.remove("is-open");
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function initActiveNav() {
  const links = Array.from(document.querySelectorAll(".nav-menu a"));
  const ids = links
    .map((link) => link.getAttribute("href"))
    .filter((href) => href && href.startsWith("#"))
    .map((href) => href.slice(1));

  const sections = ids
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (!sections.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        links.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0.1 }
  );

  sections.forEach((section) => observer.observe(section));
}

function initFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");
  const empty = document.getElementById("filter-empty");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      buttons.forEach((other) => {
        other.classList.toggle("is-active", other === btn);
        other.setAttribute("aria-pressed", other === btn ? "true" : "false");
      });

      let visible = 0;
      cards.forEach((card) => {
        const cats = (card.dataset.categories || "").split(/\s+/);
        const show = filter === "all" || cats.includes(filter);
        card.classList.toggle("is-hidden", !show);
        if (show) visible += 1;
      });

      if (empty) empty.hidden = visible !== 0;
    });
  });
}

function initModal() {
  const modal = document.getElementById("project-modal");
  if (!modal) return;

  const dialog = modal.querySelector(".modal-dialog");
  const closeBtn = modal.querySelector(".modal-close");

  document.querySelectorAll(".project-open").forEach((btn) => {
    btn.addEventListener("click", () => openModal(btn.dataset.project));
  });

  closeBtn.addEventListener("click", closeModal);
  modal.querySelector("[data-close-modal]").addEventListener("click", closeModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });

  function openModal(id) {
    const data = PROJECTS[id];
    if (!data) return;

    document.getElementById("modal-title").textContent = data.title;
    document.getElementById("modal-sub").textContent = data.subtitle || "";
    document.getElementById("modal-desc").textContent = data.description;
    document.getElementById("modal-list-heading").textContent = data.listHeading;

    const status = document.getElementById("modal-status");
    status.textContent = data.status;
    status.className = "project-status " + (data.statusClass || "");

    const tech = document.getElementById("modal-tech");
    tech.innerHTML = "";
    data.tech.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      tech.appendChild(li);
    });

    const features = document.getElementById("modal-features");
    features.innerHTML = "";
    data.features.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      features.appendChild(li);
    });

    const actions = document.getElementById("modal-actions");
    actions.innerHTML = "";

    if (data.github) {
      const github = document.createElement("a");
      github.className = "btn btn-primary";
      github.href = data.github;
      github.target = "_blank";
      github.rel = "noopener noreferrer";
      github.textContent = "GitHub";
      actions.appendChild(github);
    }

    if (data.demo) {
      const demo = document.createElement("a");
      demo.className = "btn btn-outline";
      demo.href = data.demo;
      demo.target = "_blank";
      demo.rel = "noopener noreferrer";
      demo.textContent = "Demo";
      actions.appendChild(demo);
    } else {
      const soon = document.createElement("button");
      soon.type = "button";
      soon.className = "btn btn-outline is-disabled";
      soon.setAttribute("aria-disabled", "true");
      soon.textContent = "Demo coming soon";
      actions.appendChild(soon);
    }

    modal.hidden = false;
    document.body.classList.add("modal-open");
    dialog.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-in"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((el) => observer.observe(el));
}

function initBackToTop() {
  const btn = document.querySelector(".back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("is-visible", window.scrollY > 480);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
