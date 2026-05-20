(function () {
  let current = 0;
  let total = 0;
  let track = null;
  let slides = [];
  let dots = [];
  let progressFill = null;
  let counter = null;
  let isAnimating = false;

  function init() {
    track = document.querySelector('.presentation');
    slides = document.querySelectorAll('.slide');
    total = slides.length;
    progressFill = document.querySelector('.nav-progress-fill');
    counter = document.querySelector('.nav-counter');

    buildDots();
    goTo(0, false);

    // Keyboard
    document.addEventListener('keydown', onKey);
    // Touch
    let touchStartX = 0;
    document.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
    document.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 60) dx > 0 ? prev() : next();
    });
    // Wheel
    let wheelTimeout;
    document.addEventListener('wheel', e => {
      if (wheelTimeout) return;
      wheelTimeout = setTimeout(() => { wheelTimeout = null; }, 800);
      if (e.deltaY > 30 || e.deltaX > 30) next();
      else if (e.deltaY < -30 || e.deltaX < -30) prev();
    }, { passive: true });

    // Nav buttons
    document.getElementById('nav-prev')?.addEventListener('click', prev);
    document.getElementById('nav-next')?.addEventListener('click', next);
  }

  function buildDots() {
    const container = document.querySelector('.dot-nav');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const d = document.createElement('button');
      d.className = 'dot';
      d.setAttribute('aria-label', 'Slide ' + (i + 1));
      d.addEventListener('click', () => goTo(i));
      container.appendChild(d);
      dots.push(d);
    }
  }

  function goTo(index, animate = true) {
    if (index < 0 || index >= total || (animate && isAnimating)) return;
    isAnimating = true;
    current = index;

    track.style.transform = `translateX(-${current * 100}vw)`;
    if (!animate) track.style.transition = 'none';
    else track.style.transition = 'transform 0.7s cubic-bezier(0.65, 0, 0.35, 1)';

    // Active states
    slides.forEach((s, i) => s.classList.toggle('active', i === current));
    dots.forEach((d, i) => d.classList.toggle('active', i === current));

    // Progress
    const pct = ((current + 1) / total) * 100;
    if (progressFill) progressFill.style.width = pct + '%';
    if (counter) counter.textContent = (current + 1) + ' / ' + total;

    setTimeout(() => { isAnimating = false; }, 750);
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function onKey(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prev(); }
    if (e.key === 'Home') { e.preventDefault(); goTo(0); }
    if (e.key === 'End') { e.preventDefault(); goTo(total - 1); }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
