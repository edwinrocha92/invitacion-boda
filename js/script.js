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


const countdownDate = new Date("2025-12-20T17:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days.toString().padStart(2, "0");
  document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
  document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
  document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
}

// Inicializamos
updateCountdown();
// Actualizamos cada segundo
setInterval(updateCountdown, 1000);
// Listas de invitados por familia
const guests = {
  issela: [
    "Salvador Rocha, Norma Ayala, Alessia y Abel",
    "Edwin Rocha y Lili Nader",
    "Abuelita Micaelina y Jesus",
    "Floridem Guerreo y Omar Zamora",
    "Damar Franco y Ricardo",
    "Graciela Quezada",
    "Crucita Quezada",
    "Citlali Gonzales",
    "Lucy Quezada",
    "Carlos Rios",
    "Vianey Quezada",
    "Alfonso Rosales",
    "Yazmin Rosales",
    "Jatziri Rios",
    "Valeria Rios"
  ],
  carlos: [
    "Ana López",
    "Jorge Martínez",
    "Lucía Hernández",
    "Juana Hernández Sánchez",
    "Alfredo Avitia Tinoco",
    "Miguel Hernández Carrillo",
    "Luis Ángel Avitia Hernández",
    "Ana Cristina Avitia Hernández",
    "Jonathan Perales",
    "Ana Victoria Perales Avitia",
    "Gabriela Hernández Sánchez",
    "Pareja de tía gaby",
    "Víctor Hernández",
    "Tía chayo",
    "Monserrat Hernández",
    "Cesar Esquivel",
    "Ericka Hernández",
    "Mónica",
    "Luis Hernández",
    "Maritza",
    "Tío lalo",
    "Juan Fco Martínez",
    "Daniela Resendiz",
    "Marcos Fco Hernández",
    "Andrea",
    "Pedro Salas",
    "Carlos Mercado",
    "Gerardo Mercado",
    "José Ángel Chaidez"
  ]
};

// Referencias a los selectores
const familySelect = document.getElementById('familySelect');
const guestSelect = document.getElementById('guestName');
const guestDiv = document.getElementById('guestDiv');

// Al cambiar la familia
familySelect.addEventListener('change', () => {
  const family = familySelect.value;
  
  // Limpiar dropdown de invitados
  guestSelect.innerHTML = '<option value="">-- Selecciona --</option>';

  if (family && guests[family]) {
    guests[family].forEach(name => {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      guestSelect.appendChild(option);
    });
    guestDiv.style.display = 'block';
  } else {
    guestDiv.style.display = 'none';
  }
});




function confirmAttendance() {
  const guestName = document.getElementById("guestName").value;
  if (!guestName) {
    alert("Por favor selecciona tu nombre antes de confirmar.");
    return;
  }

  // Número de WhatsApp al que se enviará (pón tu número aquí con código de país)
  const phoneNumber = "+526181171910"; // ejemplo: +52 618 123 4567
  // Mensaje dinámico
  const message = `Yo *${guestName}* confirmo mi asistencia a tu evento de boda <3`;
  // Construir enlace a WhatsApp
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Abrir WhatsApp
  window.open(whatsappUrl, "_blank");
}