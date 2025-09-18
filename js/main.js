// main.js - mobile nav, reveal on scroll, modal, form validation
document.addEventListener('DOMContentLoaded', function () {
  // Set current year
  const years = document.querySelectorAll('[id^="year"]');
  years.forEach(el => el.textContent = new Date().getFullYear());

  // Mobile nav toggles (support multiple pages)
  ['#nav-toggle','#nav-toggle-2','#nav-toggle-3','#nav-toggle-4'].forEach(btnSel => {
    const btn = document.querySelector(btnSel);
    if (!btn) return;
    const nav = btn.nextElementSibling || document.querySelector('#nav');
    btn.addEventListener('click', () => {
      nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
  });

  // Simple reveal on scroll
  const reveals = document.querySelectorAll('.reveal, .reveal-grid');
  const revealObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });
  reveals.forEach(r => revealObserver.observe(r));

  // Modal for services read more
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.getElementById('modal-close');

  function openModal(content) {
    if (!modal) return;
    modalContent.innerHTML = content;
    modal.setAttribute('aria-hidden','false');
  }
  function closeModal() { if (!modal) return; modal.setAttribute('aria-hidden','true'); }

  document.querySelectorAll('.detail-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.service;
      let html = '<h3>Details</h3>';
      if (id === 'webdev') {
        html += '<p>Full website development: HTML, CSS, JS, responsiveness, basic SEO.</p>';
      } else if (id === 'uiux') {
        html += '<p>Designs that focus on accessibility and clarity. Wireframes & prototypes.</p>';
      } else {
        html += '<p>Deployment with Git + Netlify/Vercel/GitHub Pages; automation & CI basics.</p>';
      }
      openModal(html);
    });
  });
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  // Contact form simple validation demo
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      const status = document.getElementById('form-status');

      if (!name.value || name.value.length < 2) return status.textContent = 'Please enter your name (2+ chars).';
      if (!email.value || !/^\S+@\S+\.\S+$/.test(email.value)) return status.textContent = 'Please enter a valid email.';
      if (!message.value || message.value.length < 10) return status.textContent = 'Message should be 10+ characters.';

      // Example: client-side success simulation
      status.textContent = 'Sending…';
      setTimeout(() => {
        status.textContent = 'Thanks — your message was sent (demo).';
        form.reset();
      }, 700);
    });
  }
});
