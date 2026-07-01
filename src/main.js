(function () {
  'use strict';

  /* ==========================================
     1. DOM REFS
     ========================================== */
  var header = document.getElementById('header');
  var menuToggle = document.getElementById('menuToggle');
  var nav = document.getElementById('nav');
  var navLinks = document.querySelectorAll('.nav-link');
  var yearSpan = document.getElementById('year');

  /* ==========================================
     2. HEADER SCROLL EFFECT
     ========================================== */
  function handleScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  /* ==========================================
     3. MOBILE MENU
     ========================================== */
  function openMenu() {
    menuToggle.classList.add('open');
    nav.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuToggle.classList.remove('open');
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', function () {
    if (nav.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && nav.classList.contains('open')) {
      closeMenu();
    }
  });

  /* ==========================================
     4. CLOSE MENU ON CLICK OUTSIDE
     ========================================== */
  document.addEventListener('click', function (e) {
    if (nav.classList.contains('open') &&
        !nav.contains(e.target) &&
        !menuToggle.contains(e.target)) {
      closeMenu();
    }
  });

  /* ==========================================
     5. SCROLL REVEAL (IntersectionObserver)
     ========================================== */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ==========================================
     6. ACTIVE NAV LINK ON SCROLL
     ========================================== */
  var sections = document.querySelectorAll('section[id], header[id]');

  function updateActiveLink() {
    var scrollPos = window.scrollY + 120;
    var currentId = '';

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      var href = link.getAttribute('href').replace('#', '');
      if (href === currentId || (!currentId && href === 'inicio')) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();

  /* ==========================================
      7. COPYRIGHT YEAR
     ========================================== */
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ==========================================
      8. ANTI-TAMPER & SECURITY
     ========================================== */
  // Block right-click
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

  // Block DevTools shortcuts
  document.addEventListener('keydown', function (e) {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'S'].indexOf(e.key.toUpperCase()) !== -1) ||
      (e.ctrlKey && e.key === 'U')
    ) {
      e.preventDefault();
      return false;
    }
  });

  // DevTools detection via debugger timing
  setInterval(function () {
    var start = performance.now();
    debugger;
    var end = performance.now();
    if (end - start > 100) {
      location.reload();
    }
  }, 4000);

  // Console psychological deterrent
  console.log('%c⚠️  ALERTA DE SEGURANÇA', 'font-size:22px;font-weight:bold;color:#f5c518');
  console.log('%cEsta p\u00e1gina \u00e9 monitorada contra altera\u00e7\u00f5es via navegador.', 'font-size:14px;color:#c0c0c0');
  console.log('%cModifica\u00e7\u00f5es n\u00e3o autorizadas ser\u00e3o revertidas automaticamente.', 'font-size:14px;color:#888');

  // Integrity check on critical text content
  var criticalTexts = [
    { sel: '.logo img', attr: 'alt' },
    { sel: '.footer-brand .logo img', attr: 'alt' },
    { sel: '.hero-content h1' },
    { sel: '.footer-col h4' }
  ];
  var originals = {};
  criticalTexts.forEach(function (item) {
    var el = document.querySelector(item.sel);
    if (el) {
      var key = item.sel + (item.attr || '');
      originals[key] = item.attr ? el.getAttribute(item.attr) : el.textContent;
    }
  });
  setInterval(function () {
    criticalTexts.forEach(function (item) {
      var el = document.querySelector(item.sel);
      if (el) {
        var key = item.sel + (item.attr || '');
        var current = item.attr ? el.getAttribute(item.attr) : el.textContent;
        if (current !== originals[key]) {
          if (item.attr) {
            el.setAttribute(item.attr, originals[key]);
          } else {
            el.textContent = originals[key];
          }
        }
      }
    });
  }, 2000);
})();