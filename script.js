/* ============================================================
   BLUE. — LANDING PAGE SCRIPTS
   ============================================================ */

// ── Sticky nav ──────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Mobile nav burger ───────────────────────────────────────
const burger   = document.getElementById('navBurger');
const mobileNav = document.getElementById('navMobile');

burger.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
  // Animate burger → X
  const spans = burger.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close mobile nav when a link is clicked
mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    const spans = burger.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ── Menu tab filter ─────────────────────────────────────────
const tabs  = document.querySelectorAll('.menu__tab');
const cards = document.querySelectorAll('.menu-card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const cat = tab.dataset.cat;

    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    let delay = 0;
    cards.forEach(card => {
      if (cat === 'all' || card.dataset.cat === cat) {
        card.classList.remove('hidden');
        card.style.opacity = '0';
        card.style.animationDelay = `${delay * 0.05}s`;
        card.style.animation = 'fadeUp .35s ease-out both';
        delay++;
      } else {
        card.classList.add('hidden');
        card.style.animation = '';
        card.style.opacity = '';
        card.style.animationDelay = '';
      }
    });
  });
});

// ── Intersection Observer — scroll-in animations ─────────────
const observerOpts = { threshold: 0.08 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOpts);

document.querySelectorAll(
  '.why-card, .menu-card, .deal-card, .review-card'
).forEach((el, i) => {
  el.classList.add('will-animate');
  el.style.transitionDelay = `${(i % 6) * 0.07}s`;
  observer.observe(el);
});
