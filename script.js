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
   TYPING EFFECT
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
  if (!isDeleting && charIndex === current.length) { speed = 2000; isDeleting = true; }
  else if (isDeleting && charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; speed = 400; }
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
   CARRUSELES — múltiples independientes
   ============================================================
   En lugar de buscar un ID único, buscamos TODOS los elementos
   con el atributo [data-carousel] y creamos una instancia
   independiente para cada uno. Es como un bucle que instancia
   el mismo prefab varias veces en Unity.
============================================================ */
document.querySelectorAll('[data-carousel]').forEach(carousel => {

  const slides        = carousel.querySelectorAll('.carousel-slide');
  const dotsContainer = carousel.querySelector('.carousel-dots');
  const prevBtn       = carousel.querySelector('.carousel-arrow--prev');
  const nextBtn       = carousel.querySelector('.carousel-arrow--next');

  let current   = 0;
  let autoTimer = null;
  const INTERVAL = 3500;

  /* Generar puntos para este carrusel */
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.carousel-dot');

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  function startAuto() { autoTimer = setInterval(next, INTERVAL); }
  function stopAuto()  { clearInterval(autoTimer); }

  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);

  startAuto();
});