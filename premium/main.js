// ── PREMIUM VARIATION — main.js ──

document.addEventListener("DOMContentLoaded", async () => {
  // Load config
  await configLoader.load();
  
  // Populate DOM with config data
  DOMPopulator.populateAll(configLoader);
  
  const SCRIPT_URL = configLoader.get('formConfig.googleSheetURL') ||
    "https://script.google.com/macros/s/AKfycbxmPzYRBa49M2b6JVBNPb_loBdU9qb5zKjGM7G4JdpVrvuBgi9pXsRPyI2AN5uKy33f/exec";
  const toast = document.getElementById("toastMessage");
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 4500);
  };

  // ── LOADER ──
  const loader = document.getElementById("loader");
  const fill = document.getElementById("loaderFill");
  const count = document.getElementById("loaderCount");
  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.random() * 8 + 3;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadInterval);
      fill.style.width = "100%";
      count.textContent = "100";
      setTimeout(() => {
        loader.classList.add("done");
        document.body.style.overflow = "auto";
      }, 400);
    } else {
      fill.style.width = progress + "%";
      count.textContent = Math.floor(progress);
    }
  }, 60);
  document.body.style.overflow = "hidden";

  // ── CUSTOM CURSOR ──
  const cursor = document.getElementById("cursor");
  const dot = document.getElementById("cursorDot");
  let cursorX = 0,
    cursorY = 0;
  let dotX = 0,
    dotY = 0;

  document.addEventListener("mousemove", (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    dot.style.left = cursorX + "px";
    dot.style.top = cursorY + "px";
  });

  // Smooth cursor lag
  function animateCursor() {
    dotX += (cursorX - dotX) * 0.18;
    dotY += (cursorY - dotY) * 0.18;
    cursor.style.left = dotX + "px";
    cursor.style.top = dotY + "px";
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor expand on interactive elements
  document
    .querySelectorAll("a, button, .svc-card, .pj, .t-card")
    .forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("expand"));
      el.addEventListener("mouseleave", () =>
        cursor.classList.remove("expand"),
      );
    });

  // ── NAVBAR SCROLL ──
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 80);
  });

  // ── MOBILE NAV ──
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  toggle?.addEventListener("click", () => links.classList.toggle("open"));
  links
    ?.querySelectorAll("a")
    .forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open")),
    );

  // ── SCROLL FADE IN ──
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

  // ── PARALLAX HERO BLUEPRINT ──
  const blueprint = document.querySelector(".hero-blueprint");
  window.addEventListener("scroll", () => {
    if (!blueprint) return;
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      blueprint.style.transform = `translateY(${scrolled * 0.12}px)`;
    }
  });

  // ── FORM SUBMIT ──
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector(".btn-submit");
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Sending...";
    }
    const formData = new FormData(form);
    fetch(SCRIPT_URL, { method: "POST", body: formData })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          showToast("Enquiry submitted successfully.");
          success.classList.add("show");
          form.reset();
          setTimeout(() => success.classList.remove("show"), 5000);
        } else {
          alert("Unable to submit form. Please try again later.");
        }
      })
      .catch(() => {
        alert("Network error submitting form. Please try again later.");
      })
      .finally(() => {
        if (btn) {
          btn.disabled = false;
          btn.textContent = "Submit Enquiry";
        }
      });
  });

  // ── SMOOTH SCROLL ──
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const offset = navbar.offsetHeight + 20;
        const top =
          target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  // ── PROJECT HOVER TILT ──
  document.querySelectorAll(".pj").forEach((pj) => {
    pj.addEventListener("mousemove", (e) => {
      const rect = pj.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      pj.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) scale(1.01)`;
    });
    pj.addEventListener("mouseleave", () => {
      pj.style.transform = "perspective(800px) rotateY(0) rotateX(0) scale(1)";
      pj.style.transition = "transform 0.5s ease";
    });
    pj.addEventListener("mouseenter", () => {
      pj.style.transition = "transform 0.1s ease";
    });
  });

  // ── SERVICE CARD LINE ANIM ──
  document.querySelectorAll(".svc-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.querySelector(".svc-arrow").style.opacity = "1";
    });
    card.addEventListener("mouseleave", () => {
      card.querySelector(".svc-arrow").style.opacity = "0";
    });
  });

  // ── ACTIVE NAV LINK ON SCROLL ──
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
    });
    navLinks.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  });
});
