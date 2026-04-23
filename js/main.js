/**
 * RENATA MANDELMAN PORTFOLIO
 * Main JavaScript - Interactivity & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar todas las funciones
  initNavigation();
  initScrollAnimations();
  initSmoothScroll();
  initVideoCards();
});

/**
 * Navigation - Mobile Toggle & Scroll Effect
 */
function initNavigation() {
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.querySelector('.nav__menu');
  const navLinks = document.querySelectorAll('.nav__link');
  
  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      
      // Animate hamburger to X
      const spans = navToggle.querySelectorAll('span');
      navToggle.classList.toggle('active');
    });
  }
  
  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
  
  // Nav background on scroll
  const handleNavScroll = () => {
    if (window.scrollY > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  };
  
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();
}

/**
 * Scroll Animations - Fade in sections on scroll
 */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Unobserve after animation plays
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all sections
  const sections = document.querySelectorAll('.sobre-mi, .videos, .proyectos, .habilidades, .contacto');
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Also observe cards individually
  const cards = document.querySelectorAll('.sobre-mi__card, .video-card, .project-card');
  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });
}

/**
 * Smooth Scroll - Anchor links with easing
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Skip if it's just "#"
      if (href === '#') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Video Cards - Lazy loading & hover effects
 */
function initVideoCards() {
  const videoCards = document.querySelectorAll('.video-card');
  
  videoCards.forEach(card => {
    // Add hover sound effect simulation (visual feedback)
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(-4px)';
    });
  });
}

/**
 * Utility: Add class to element when in viewport
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Export for potential future use
 */
window.PortfolioUtils = {
  isInViewport
};