const counters = document.querySelectorAll('[data-count]');
const animate = (el) => {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const duration = 1200;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
};
const obs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animate(entry.target);
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach((c) => obs.observe(c));

const parallaxLayers = document.querySelectorAll('.parallax-img');
let ticking = false;

function updateParallax() {
  const viewportH = window.innerHeight;
  parallaxLayers.forEach((layer) => {
    const speed = parseFloat(layer.getAttribute('data-speed')) || 0.3;
    const section = layer.closest('section');
    const rect = section.getBoundingClientRect();
    const offset = rect.top * speed;
    const progress = Math.min(Math.max((viewportH - rect.top) / (viewportH + rect.height), 0), 1);
    const tilt = (progress - 0.5) * 6;
    layer.style.transform = `translate3d(0, ${offset}px, 0) scale(1.15) rotateX(${tilt}deg)`;
  });
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}, { passive: true });

updateParallax();
