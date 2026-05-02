// ── CONTOUR INTERIOR DESIGN — main.js ──

document.addEventListener("DOMContentLoaded", () => {

  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxmPzYRBa49M2b6JVBNPb_loBdU9qb5zKjGM7G4JdpVrvuBgi9pXsRPyI2AN5uKy33f/exec";

  const toast = document.getElementById("toastMessage");
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 4500);
  };

  // ── TRANSPARENT → SOLID NAV ON SCROLL ──
  // The nav is transparent when the user is at the very top (within the hero).
  // Once they scroll past the hero section it becomes a solid opaque bar.
  const navbar = document.getElementById("navbar");
  const heroSection = document.getElementById("home");

  function updateNav() {
    if (!navbar) return;
    // Use the hero's bottom edge as the threshold; fallback to 80vh
    const threshold = heroSection
      ? heroSection.offsetTop + heroSection.offsetHeight - navbar.offsetHeight
      : window.innerHeight * 0.8;

    if (window.scrollY > threshold) {
      navbar.classList.add("scrolled");
      navbar.classList.remove("nav-transparent");
    } else {
      navbar.classList.remove("scrolled");
      navbar.classList.add("nav-transparent");
    }
  }

  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav(); // run once on load

  // ── MOBILE NAV TOGGLE ──
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
    links
      .querySelectorAll("a")
      .forEach((a) =>
        a.addEventListener("click", () => links.classList.remove("open")),
      );
  }

  // ── HERO SCROLL BUTTON ──
  const scrollBtn = document.getElementById("scrollBtn");
  if (scrollBtn) {
    scrollBtn.addEventListener("click", () => {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // ── SCROLL FADE-IN ──
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

  // Hero content visible immediately
  document
    .querySelectorAll(".hero-content")
    .forEach((el) => el.classList.add("visible"));

  // ── CONTACT FORM SUBMIT ──
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;
      const formData = new FormData(form);
      fetch(SCRIPT_URL, { method: "POST", body: formData })
        .then((res) => res.json())
        .then((result) => {
          if (result.status === "success") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            showToast("Message submitted successfully. We'll be in touch soon!");
            if (success) success.classList.add("show");
            form.reset();
            setTimeout(() => {
              if (success) success.classList.remove("show");
            }, 5000);
          } else {
            showToast("Unable to submit. Please try again later.");
          }
        })
        .catch(() => {
          showToast("Network error. Please try again later.");
        })
        .finally(() => {
          if (btn) btn.disabled = false;
        });
    });
  }

  // ── SMOOTH SCROLL FOR ANCHOR LINKS ──
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

});

// ── TESTIMONIALS CAROUSEL ──
(function () {
  // Wait for DOM to be ready
  function initCarousel() {
    const track = document.querySelector(".testimonials-track");
    const container = document.getElementById("testimonialsTrack");
    const prevBtn = document.getElementById("testimonialPrev");
    const nextBtn = document.getElementById("testimonialNext");
    const dotsContainer = document.getElementById("carouselDots");

    if (!track || !container || !prevBtn || !nextBtn || !dotsContainer) return;

    const cards = Array.from(track.querySelectorAll(".testimonial-card"));
    const totalCards = cards.length;
    let currentIndex = 0;

    function getVisibleCount() {
      if (window.innerWidth <= 600) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }

    function buildDots() {
      dotsContainer.innerHTML = "";
      const visibleCount = getVisibleCount();
      const totalSteps = Math.ceil(totalCards / visibleCount);
      for (let i = 0; i < totalSteps; i++) {
        const dot = document.createElement("button");
        dot.className = "carousel-dot" + (i === 0 ? " active" : "");
        dot.setAttribute("aria-label", "Go to slide " + (i + 1));
        dot.addEventListener("click", () => goTo(i * visibleCount));
        dotsContainer.appendChild(dot);
      }
    }

    function updateDots() {
      const visibleCount = getVisibleCount();
      const dots = dotsContainer.querySelectorAll(".carousel-dot");
      const activeStep = Math.round(currentIndex / visibleCount);
      dots.forEach((d, i) => d.classList.toggle("active", i === activeStep));
    }

    function goTo(index) {
      const visibleCount = getVisibleCount();
      const maxIndex = Math.max(0, totalCards - visibleCount);
      currentIndex = Math.max(0, Math.min(index, maxIndex));

      const cardEl = cards[0];
      const gap = 32; // 2rem
      const step = cardEl.offsetWidth + gap;
      track.style.transform = `translateX(-${currentIndex * step}px)`;

      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= maxIndex;

      updateDots();
    }

    prevBtn.addEventListener("click", () => {
      goTo(currentIndex - getVisibleCount());
    });

    nextBtn.addEventListener("click", () => {
      goTo(currentIndex + getVisibleCount());
    });

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        currentIndex = 0;
        buildDots();
        goTo(0);
      }, 200);
    });

    buildDots();
    goTo(0);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCarousel);
  } else {
    initCarousel();
  }
})();
