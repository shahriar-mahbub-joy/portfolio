// ============================================
// HOVER TILT — subtle tilt toward cursor on achievement + ref cards
// ============================================
function setupTilt(selector, maxTilt) {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const tiltX = (0.5 - y) * maxTilt * 2;
      const tiltY = (x - 0.5) * maxTilt * 2;
      card.style.transform = `translateY(-4px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) rotateX(0) rotateY(0)";
    });
  });
}

// ============================================
// NAV: mobile toggle
// ============================================
function setupNav() {
  const toggle = document.getElementById("navToggle");
  const links = document.querySelector(".nav-links");

  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
  });

  links.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => links.classList.remove("open"));
  });
}

// ============================================
// SCROLL REVEAL — IntersectionObserver fade/rise
// ============================================
function setupReveal() {
  const els = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window)) {
    els.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  els.forEach(el => observer.observe(el));
}

// ============================================
// INIT
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  setupTilt(".achievement-card", 4);
  setupTilt(".ref-card", 4);
  setupNav();
  setupReveal();
  document.getElementById("year").textContent = new Date().getFullYear();
});