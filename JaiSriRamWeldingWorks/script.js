// ===== Preloader =====
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => preloader.classList.add('hide'), 400);
});

// ===== Theme Toggle (Dark / Light) =====
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('jsr-theme');
if (savedTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
}
themeToggle.addEventListener('click', () => {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  if (isLight) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('jsr-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('jsr-theme', 'light');
  }
});

// ===== Year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Mobile Nav =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== Header shrink + Back to top =====
const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 20 ? '0 4px 20px rgba(0,0,0,0.4)' : 'none';
  if (window.scrollY > 500) backToTop.classList.add('show');
  else backToTop.classList.remove('show');
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== Counter Animation =====
const counters = document.querySelectorAll('.num');
let counted = false;
function animateCounters() {
  if (counted) return;
  const heroStats = document.querySelector('.hero-stats');
  const rect = heroStats.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    counted = true;
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const timer = setInterval(() => {
        count += step;
        if (count >= target) { count = target; clearInterval(timer); }
        counter.textContent = count;
      }, 25);
    });
  }
}
window.addEventListener('scroll', animateCounters);
animateCounters();

// ===== Scroll Reveal =====
const revealTargets = document.querySelectorAll(
  '.service-card, .gallery-item, .about-text, .about-visual, .why-item, .contact-info, .contact-form'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealTargets.forEach(el => observer.observe(el));

// ===== Contact Form -> WhatsApp =====
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const workType = document.getElementById('workType').value;
  const message = document.getElementById('message').value.trim();

  if (!name || !phone || !workType) {
    formNote.textContent = 'Please fill in all required fields.';
    return;
  }

  const text = `Hello Jai SriRam Welding Works,%0A%0AMy name is *${name}*.%0APhone: ${phone}%0AWork Type: ${workType}%0AMessage: ${message || 'N/A'}%0A%0APlease share a quote. Thank you!`;
  const url = `https://wa.me/918297577470?text=${text}`;
  window.open(url, '_blank');
  formNote.textContent = 'Redirecting you to WhatsApp...';
  contactForm.reset();
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active-link', a.getAttribute('href') === `#${current}`);
  });
});
