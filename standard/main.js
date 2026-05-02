// ── STANDARD VARIATION — main.js ──

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

  // Sticky header
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 80);
  });

  // Mobile nav
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  toggle?.addEventListener("click", () => links.classList.toggle("open"));
  links
    ?.querySelectorAll("a")
    .forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open")),
    );

  // Scroll fade-in with stagger for grids
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          // Stagger children of grids
          const delay = e.target.dataset.delay || 0;
          setTimeout(() => e.target.classList.add("visible"), delay * 100);
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll(".fade-in").forEach((el, i) => {
    // Add stagger to grid children
    const parent = el.parentElement;
    if (
      parent.classList.contains("services-list") ||
      parent.classList.contains("t-grid") ||
      parent.classList.contains("process-grid")
    ) {
      const siblings = [...parent.querySelectorAll(".fade-in")];
      el.dataset.delay = siblings.indexOf(el);
    }
    observer.observe(el);
  });

  // Trigger hero on load
  document
    .querySelectorAll(".hero .fade-in")
    .forEach((el) => el.classList.add("visible"));

  // Duplicate marquee for seamless loop
  const track = document.getElementById("marqueeTrack");
  if (track) {
    track.innerHTML += track.innerHTML;
  }

  // Form submit
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (btn) btn.disabled = true;
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
        if (btn) btn.disabled = false;
      });
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const offset = header.offsetHeight;
        const top =
          target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  // Service hover accent
  document.querySelectorAll(".svc").forEach((svc) => {
    svc.addEventListener("mouseenter", () => {
      svc.querySelector(".svc-line").style.width = "3rem";
    });
    svc.addEventListener("mouseleave", () => {
      svc.querySelector(".svc-line").style.width = "0";
    });
  });
});
