// ── CONFIG ──
const SUPABASE_URL = "https://exjymvnpdygmbxgzpjas.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_6Xm5Zyr0eMKVrFbSl4i-TQ_tnYyOu6b";
const WEB3FORMS_KEY = "59bdfb6d-b5ee-4c89-9b7d-a69f09cae927";

// ── TOAST ──
function createToast() {
  const el = document.getElementById("toastMessage");
  return (message) => {
    if (!el) return;
    el.textContent = message;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 4500);
  };
}

// ── NAV MODULE ──
const NavModule = {
  init() {
    const navbar = document.getElementById("navbar");
    const hero = document.getElementById("home");
    if (!navbar) return;

    const getThreshold = () =>
      hero
        ? hero.offsetTop + hero.offsetHeight - navbar.offsetHeight
        : window.innerHeight * 0.8;

    const update = () => {
      const scrolled = window.scrollY > getThreshold();
      navbar.classList.toggle("scrolled", scrolled);
      navbar.classList.toggle("nav-transparent", !scrolled);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
  },
};

// ── MOBILE NAV MODULE ──
const MobileNavModule = {
  init() {
    const toggle = document.getElementById("navToggle");
    const links = document.getElementById("navLinks");
    if (!toggle || !links) return;

    toggle.addEventListener("click", () => links.classList.toggle("open"));
    links
      .querySelectorAll("a")
      .forEach((a) => a.addEventListener("click", () => links.classList.remove("open")));
  },
};

// ── HERO SCROLL MODULE ──
const HeroScrollModule = {
  init() {
    const btn = document.getElementById("scrollBtn");
    const target = document.getElementById("about");
    if (!btn || !target) return;
    btn.addEventListener("click", () => target.scrollIntoView({ behavior: "smooth" }));
  },
};

// ── FADE-IN MODULE ──
const FadeInModule = {
  init() {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    document.querySelectorAll(".hero-content").forEach((el) => el.classList.add("visible"));
  },
};

// ── FORM MODULE ──
const FormModule = {
  init({ supabase, showToast }) {
    const form = document.getElementById("contactForm");
    const successEl = document.getElementById("formSuccess");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;

      try {
        const data = FormModule._getFormData(form);
        const { error } = await supabase.from("form_submissions").insert([data]).select();

        if (error) {
          showToast("Unable to submit. Please try again later.");
        } else {
          FormModule._sendEmail(data);
          FormModule._onSuccess(form, successEl, showToast);
        }
      } catch {
        showToast("Network error. Please try again later.");
      } finally {
        if (btn) btn.disabled = false;
      }
    });
  },

  _getFormData(form) {
    const fd = new FormData(form);
    return {
      name: fd.get("name"),
      email: fd.get("email"),
      mobile: fd.get("mobile"),
      requirement: fd.get("requirement"),
      budget: fd.get("budget"),
      message: fd.get("message"),
    };
  },

  _sendEmail(data) {
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...data }),
    }).catch((err) => console.warn("Email notification failed:", err));
  },

  _onSuccess(form, successEl, showToast) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast("Message submitted successfully. We'll be in touch soon!");
    form.reset();
    if (!successEl) return;
    successEl.classList.add("show");
    setTimeout(() => successEl.classList.remove("show"), 5000);
  },
};

// ── SMOOTH SCROLL MODULE ──
const SmoothScrollModule = {
  init() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const target = document.querySelector(a.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  },
};

// ── CAROUSEL MODULE ──
const CarouselModule = {
  init() {
    const track = document.querySelector(".testimonials-track");
    const prevBtn = document.getElementById("testimonialPrev");
    const nextBtn = document.getElementById("testimonialNext");
    const dotsContainer = document.getElementById("carouselDots");
    if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

    const cards = Array.from(track.querySelectorAll(".testimonial-card"));
    let currentIndex = 0;

    const getVisibleCount = () => {
      if (window.innerWidth <= 600) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    };

    const buildDots = () => {
      const count = getVisibleCount();
      dotsContainer.innerHTML = "";
      Array.from({ length: Math.ceil(cards.length / count) }, (_, i) => {
        const dot = document.createElement("button");
        dot.className = "carousel-dot" + (i === 0 ? " active" : "");
        dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
        dot.addEventListener("click", () => goTo(i * count));
        dotsContainer.appendChild(dot);
      });
    };

    const updateDots = () => {
      const count = getVisibleCount();
      const activeStep = Math.round(currentIndex / count);
      dotsContainer
        .querySelectorAll(".carousel-dot")
        .forEach((d, i) => d.classList.toggle("active", i === activeStep));
    };

    const goTo = (index) => {
      const count = getVisibleCount();
      const maxIndex = Math.max(0, cards.length - count);
      currentIndex = Math.max(0, Math.min(index, maxIndex));
      track.style.transform = `translateX(-${currentIndex * (cards[0].offsetWidth + 32)}px)`;
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= maxIndex;
      updateDots();
    };

    prevBtn.addEventListener("click", () => goTo(currentIndex - getVisibleCount()));
    nextBtn.addEventListener("click", () => goTo(currentIndex + getVisibleCount()));

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
  },
};

// ── BOOTSTRAP ──
// To add a new feature: create a module with init() and add it to the array below.
// No existing module needs to change (OCP).
document.addEventListener("DOMContentLoaded", () => {
  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const showToast = createToast();
  const ctx = { supabase, showToast };

  [NavModule, MobileNavModule, HeroScrollModule, FadeInModule, SmoothScrollModule, CarouselModule]
    .forEach((m) => m.init(ctx));

  FormModule.init(ctx);
});
