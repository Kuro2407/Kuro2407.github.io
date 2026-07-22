/* ============================================================
   TAB SWITCHER
   ============================================================
   Concepto clave: classList
   - En Unity activas/desactivas objetos con SetActive(true/false).
   - Aquí hacemos lo mismo con clases CSS:
       elemento.classList.add('active')    → activa (muestra)
       elemento.classList.remove('active') → desactiva (oculta)
   - El CSS define qué significa "active" (visible, opacidad 1, etc.)
   - El JS solo decide qué elemento la tiene en cada momento.
   ============================================================ */

/* ============================================================
   PROJECT TABS
============================================================ */
const projectTabs   = document.querySelectorAll('.project-tab');
const projectPanels = document.querySelectorAll('.project-panel');

projectTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.ptab;

    projectTabs.forEach(t   => t.classList.remove('active'));
    projectPanels.forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById('ptab-' + target).classList.add('active');
  });
});


/* ============================================================
   TYPING EFFECT (solo en panel Game Dev)
   ============================================================ */
const typedEl = document.getElementById('typed-text');

const phrases = [
  'Unity Developer',
  'Game Programmer',
  'C# Enthusiast',
  'Level Designer',
  'Looking for my first gamedev job_'
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;

function type() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
  } else {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
  }

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === current.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(type, speed);
}

type();


/* ============================================================
   ACTIVE NAV LINK on scroll
   ============================================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--neon-green)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

/* ============================================================
   CARRUSEL DE RENDERS — efecto slide
   ============================================================
   En lugar de mostrar/ocultar slides con display,
   movemos todo el track con translateX.
   Si cada slide mide 100%, el slide N está en: N * -100%
   Igual que mover un objeto en Unity con transform.position.
   ============================================================ */

const carousel      = document.getElementById('render-carousel');
const track         = document.getElementById('carousel-track');
const slides        = carousel.querySelectorAll('.carousel-slide');
const dotsContainer = document.getElementById('carousel-dots');
const prevBtn       = document.getElementById('carousel-prev');
const nextBtn       = document.getElementById('carousel-next');

let currentSlide = 0;
let autoTimer    = null;
const INTERVAL   = 3500;

/* Crear un punto por cada slide */
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.classList.add('carousel-dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll('.carousel-dot');

/* Ir a un slide: mueve el track con translateX */
function goTo(index) {
  dots[currentSlide].classList.remove('active');

  currentSlide = (index + slides.length) % slides.length;

  /* Mover el track: slide 0 → 0%, slide 1 → -100%, slide 2 → -200% */
  track.style.transform = `translateX(${currentSlide * -100}%)`;

  dots[currentSlide].classList.add('active');
}

function next() { goTo(currentSlide + 1); }
function prev() { goTo(currentSlide - 1); }

prevBtn.addEventListener('click', next);
nextBtn.addEventListener('click', prev);

function startAuto() { autoTimer = setInterval(next, INTERVAL); }
function stopAuto()  { clearInterval(autoTimer); }

carousel.addEventListener('mouseenter', stopAuto);
carousel.addEventListener('mouseleave', startAuto);

startAuto();