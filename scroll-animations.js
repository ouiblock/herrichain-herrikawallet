/* ============================================================
   HERRIKA - Scroll Animations & Dynamic Effects
   ============================================================ */

(function() {
  'use strict';

  // ----- Respect de prefers-reduced-motion -----
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Auto-tag des éléments à animer au scroll.
   * Applique automatiquement des classes reveal* aux sections clés
   * pour éviter d'avoir à modifier tous les HTML.
   */
  function autoTagRevealElements() {
    // Titres de section
    document.querySelectorAll('.section-title, section h2, .hero-title').forEach(el => {
      if (!el.classList.contains('reveal') &&
          !el.classList.contains('reveal-left') &&
          !el.classList.contains('reveal-right')) {
        el.classList.add('reveal');
      }
    });

    // Descriptions
    document.querySelectorAll('.section-description, .hero-description').forEach(el => {
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
    });

    // Grilles de cartes → stagger sur le parent
    document.querySelectorAll('.features-grid, .feature-grid, .cards-grid, .pricing-grid').forEach(el => {
      if (!el.classList.contains('reveal-stagger')) el.classList.add('reveal-stagger');
    });

    // Cartes individuelles qui ne sont pas dans un grid-stagger
    document.querySelectorAll('.feature-card, .card, .pricing-card, .partner-card').forEach(el => {
      const parent = el.parentElement;
      if (parent && !parent.classList.contains('reveal-stagger') && !el.classList.contains('reveal')) {
        el.classList.add('reveal');
      }
    });

    // Aperçu téléphone → slide depuis la droite
    document.querySelectorAll('.phone-mockup, .hero-visual').forEach(el => {
      if (!el.classList.contains('reveal-right') && !el.classList.contains('reveal')) {
        el.classList.add('reveal-right');
      }
    });

    // Hero text → slide depuis la gauche
    document.querySelectorAll('.hero-text').forEach(el => {
      if (!el.classList.contains('reveal-left')) el.classList.add('reveal-left');
    });

    // CTA buttons
    document.querySelectorAll('.hero-cta').forEach(el => {
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
    });
  }

  /**
   * IntersectionObserver pour révéler les éléments au scroll
   */
  function initScrollReveal() {
    const revealClasses = ['reveal', 'reveal-left', 'reveal-right', 'reveal-scale', 'reveal-stagger'];
    const selector = revealClasses.map(c => '.' + c).join(', ');
    const elements = document.querySelectorAll(selector);

    if (prefersReducedMotion) {
      elements.forEach(el => el.classList.add('is-visible'));
      return;
    }

    if (!('IntersectionObserver' in window)) {
      // Fallback : tout afficher
      elements.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Un élément révélé ne se masque plus
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    elements.forEach(el => observer.observe(el));
  }

  /**
   * Navbar dynamique au scroll
   */
  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar') || document.querySelector('nav.navbar') || document.querySelector('header');
    if (!navbar) return;

    let lastScroll = 0;
    let ticking = false;

    function update() {
      const scrollY = window.scrollY;

      if (scrollY > 20) {
        navbar.classList.add('is-scrolled');
      } else {
        navbar.classList.remove('is-scrolled');
      }

      lastScroll = scrollY;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }

  /**
   * Parallax doux pour éléments avec [data-parallax]
   */
  function initParallax() {
    if (prefersReducedMotion) return;

    const elements = document.querySelectorAll('[data-parallax], .parallax-slow');
    if (elements.length === 0) return;

    let ticking = false;

    function update() {
      const scrollY = window.scrollY;
      elements.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.15;
        const rect = el.getBoundingClientRect();
        const offset = rect.top + scrollY;
        const viewportCenter = scrollY + window.innerHeight / 2;
        const distance = viewportCenter - offset;
        el.style.transform = `translateY(${distance * speed * -0.1}px)`;
      });
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }

  /**
   * Tilt 3D sur les cartes au survol souris (desktop uniquement)
   */
  function initCardTilt() {
    if (prefersReducedMotion) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const cards = document.querySelectorAll('.feature-card, .pricing-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /**
   * Compteurs animés pour les chiffres avec [data-count]
   */
  function initCounters() {
    if (prefersReducedMotion) return;

    const counters = document.querySelectorAll('[data-count]');
    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.dataset.count);
          const duration = parseInt(el.dataset.countDuration) || 1500;
          const decimals = parseInt(el.dataset.countDecimals) || 0;
          const prefix = el.dataset.countPrefix || '';
          const suffix = el.dataset.countSuffix || '';

          let start = null;

          function step(timestamp) {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            // easeOutExpo
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const value = target * eased;
            el.textContent = prefix + value.toFixed(decimals) + suffix;
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          }

          window.requestAnimationFrame(step);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(el => observer.observe(el));
  }

  /**
   * Animation du solde dans le wallet mockup
   */
  function initWalletBalance() {
    if (prefersReducedMotion) return;
    const el = document.querySelector('.hk-balance-amount[data-amount]');
    if (!el) return;

    const target = parseFloat(el.dataset.amount);
    if (isNaN(target)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const duration = 1800;
        let start = null;
        function step(ts) {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = target * eased;
          const formatted = value.toFixed(2).replace('.', ',') + ' €';
          el.textContent = formatted;
          if (progress < 1) window.requestAnimationFrame(step);
        }
        el.textContent = '0,00 €';
        window.requestAnimationFrame(step);
        observer.unobserve(el);
      });
    }, { threshold: 0.4 });

    observer.observe(el);
  }

  /**
   * Smooth scroll sur les liens ancres
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        }
      });
    });
  }

  /**
   * Initialisation au chargement
   */
  function init() {
    autoTagRevealElements();
    initScrollReveal();
    initNavbarScroll();
    initParallax();
    initCardTilt();
    initCounters();
    initWalletBalance();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
