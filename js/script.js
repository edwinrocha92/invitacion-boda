// Animación cards al hacer scroll
const cards = document.querySelectorAll('.section-box, .hero-content');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.3 });
cards.forEach(card => observer.observe(card));

// Temporizador dinámico
const countdownEl = document.getElementById('countdown-timer');
const weddingDate = new Date('2025-12-20T17:00:00');

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  countdownEl.textContent = `Faltan ${days} días`;
}

updateCountdown();
setInterval(updateCountdown, 1000 * 60 * 60); // actualiza cada hora
