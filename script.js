/* ----------------------------------------------------------
       TYPING EFFECT
       - We have an array of phrases. The script "types" them
         letter by letter into the #typed-text element.
       - setTimeout(fn, ms) calls a function once after X milliseconds.
       - When a phrase is done, it waits, then starts "deleting"
         it letter by letter (reduces charIndex).
       - When empty, it moves to the next phrase in the array.
    ---------------------------------------------------------- */
    const typedEl = document.getElementById('typed-text');

    const phrases = [
      'Unity Developer',
      'Game Programmer',
      'C# Enthusiast',
      'Level Designer',
      'Looking for my first gamedev job_'
    ];

    let phraseIndex = 0;   // which phrase we're on
    let charIndex   = 0;   // how many characters we've typed
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


    /* ----------------------------------------------------------
       SKILL BAR ANIMATION ON SCROLL
       IntersectionObserver notifies us when an element enters
       the visible area of the screen. The bars only animate
       when the user scrolls to them.
    ---------------------------------------------------------- */
    const skillFills = document.querySelectorAll('.skill-fill');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const level = fill.getAttribute('data-level');
          fill.style.width = level + '%';
          observer.unobserve(fill);
        }
      });
    }, { threshold: 0.2 });

    skillFills.forEach(fill => observer.observe(fill));


    /* ----------------------------------------------------------
       ACTIVE NAV LINK on scroll
    ---------------------------------------------------------- */
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