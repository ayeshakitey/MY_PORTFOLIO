/* === CUSTOM CURSOR === */
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .project-card, .highlight-card, .contact-link-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    cursor.style.background = 'rgba(124,58,237,0.5)';
    cursorFollower.style.transform = 'translate(-50%,-50%) scale(1.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursor.style.background = 'var(--accent)';
    cursorFollower.style.transform = 'translate(-50%,-50%) scale(1)';
  });
});

/* === NAVBAR SCROLL === */
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
});

/* === HAMBURGER MENU === */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* === ROLE ROTATOR === */
const roleItems = document.querySelectorAll('.role-item');
let currentRole = 0;

function rotateRole() {
  roleItems[currentRole].classList.remove('active');
  roleItems[currentRole].classList.add('exit');
  setTimeout(() => { roleItems[currentRole].classList.remove('exit'); }, 500);
  currentRole = (currentRole + 1) % roleItems.length;
  roleItems[currentRole].classList.add('active');
}
setInterval(rotateRole, 2800);

/* === PARTICLES === */
const particlesContainer = document.getElementById('particles');
const PARTICLE_COUNT = 30;

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const p = document.createElement('div');
  p.classList.add('particle');
  const size = Math.random() * 4 + 2;
  const left = Math.random() * 100;
  const delay = Math.random() * 10;
  const duration = Math.random() * 15 + 10;
  p.style.cssText = `
    width: ${size}px; height: ${size}px;
    left: ${left}%;
    top: ${Math.random() * 100}%;
    animation-duration: ${duration}s;
    animation-delay: -${delay}s;
    opacity: ${Math.random() * 0.2 + 0.05};
  `;
  p.style.animationName = Math.random() > 0.5 ? 'particleFloat' : 'floatY';
  particlesContainer.appendChild(p);
}

// Add particle animation to stylesheet
const style = document.createElement('style');
style.textContent = `
  @keyframes particleFloat {
    0% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-60px) rotate(180deg); }
    100% { transform: translateY(0) rotate(360deg); }
  }
`;
document.head.appendChild(style);

/* === SCROLL REVEAL === */
const revealElements = document.querySelectorAll('.section-header, .about-grid, .skills-grid, .projects-grid, .contact-grid, .skill-category, .project-card, .highlight-card, .about-content, .about-visual');

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

/* === SKILL BAR ANIMATION === */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(fill => {
        const w = fill.getAttribute('data-width');
        setTimeout(() => { fill.style.width = w + '%'; }, 200);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(el => skillObserver.observe(el));

/* === ACTIVE NAV LINK === */
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = '#fff';
        }
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => sectionObserver.observe(s));

/* === SMOOTH SCROLL for anchor links === */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* === CONTACT FORM === */
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  btn.innerHTML = '<span>Sending...</span>';
  btn.disabled = true;

  setTimeout(() => {
    form.style.display = 'none';
    success.classList.add('visible');
  }, 1500);
}

/* === TILT EFFECT on project cards === */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `translateY(-6px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s ease';
    setTimeout(() => { card.style.transition = ''; }, 400);
  });
});

/* === NUMBER COUNTER ANIMATION for stats === */
function animateCounter(el, target, suffix = '') {
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Number.isInteger(target)
      ? Math.floor(current) + suffix
      : current.toFixed(2) + suffix;
  }, duration / steps);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Animate stats if needed (hero stats are visible from start)
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => statsObserver.observe(el));

/* === TYPING EFFECT on code card === */
// subtle shine sweep on code card
const codeCard = document.querySelector('.code-card');
if (codeCard) {
  codeCard.addEventListener('mouseenter', () => {
    codeCard.style.boxShadow = '0 0 60px rgba(124,58,237,0.4), 0 4px 32px rgba(0,0,0,0.4)';
  });
  codeCard.addEventListener('mouseleave', () => {
    codeCard.style.boxShadow = '';
  });
}

/* === FLOATING BADGES RANDOM COLORS on hover === */
document.querySelectorAll('.f-badge').forEach(badge => {
  badge.addEventListener('mouseenter', () => {
    badge.style.borderColor = 'rgba(124,58,237,0.5)';
    badge.style.background = 'rgba(124,58,237,0.15)';
    badge.style.transform += ' scale(1.05)';
  });
  badge.addEventListener('mouseleave', () => {
    badge.style.borderColor = '';
    badge.style.background = '';
  });
});
