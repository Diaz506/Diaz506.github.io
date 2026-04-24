/* ═══════════════════════════════════════════
   Main JS — Animations, nav, particles
   ═══════════════════════════════════════════ */

(function () {
  /* ── Navbar scroll effect ── */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveNav();
  });

  function updateActiveNav() {
    const sections = document.querySelectorAll('.section, .hero');
    let current = '';
    sections.forEach(s => {
      const top = s.offsetTop - 120;
      if (window.scrollY >= top) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  }

  /* ── Mobile hamburger ── */
  const hamburger = document.getElementById('nav-hamburger');
  const navMenu = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
    const expanded = hamburger.classList.contains('open');
    hamburger.setAttribute('aria-expanded', expanded);
  });

  navLinks.forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ── Scroll reveal (Intersection Observer) ── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger children slightly
          const delay = entry.target.dataset.revealDelay || 0;
          setTimeout(() => entry.target.classList.add('visible'), delay);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el, i) => {
    // Add stagger delay for grid children
    const parent = el.parentElement;
    if (parent && (parent.classList.contains('certs-grid') ||
        parent.classList.contains('skills-grid') ||
        parent.classList.contains('projects-grid') ||
        parent.classList.contains('community-grid') ||
        parent.classList.contains('contact-links'))) {
      const siblings = Array.from(parent.querySelectorAll('.reveal'));
      el.dataset.revealDelay = siblings.indexOf(el) * 80;
    }
    revealObserver.observe(el);
  });

  /* ── Hero particle canvas ── */
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrame;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function createParticles() {
      particles = [];
      const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 12000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.8 + 0.5,
          dx: (Math.random() - 0.5) * 0.4,
          dy: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 120, 212, ${0.08 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 120, 212, ${p.opacity})`;
        ctx.fill();
      });

      animFrame = requestAnimationFrame(drawParticles);
    }

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    resize();
    createParticles();
    drawParticles();

    // Pause when not visible
    const heroObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!animFrame) drawParticles();
      } else {
        cancelAnimationFrame(animFrame);
        animFrame = null;
      }
    });
    heroObserver.observe(canvas);
  }

  /* ── Smooth scroll for nav links ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
