// Animación cards al hacer scroll
const cards = document.querySelectorAll('.section-box, .section-box-2, .hero-content');
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



    const families = {
      Issela: { Familia_Rocha_Quezada: 5, Familia_Gonzalez_Quezada: 2, Familia_Hernandez_Quezada: 3, Familia_Rosales_Quezada: 6, Familia_Rios_Quezada: 4, Familia_Rocha_Nader: 2, Familia_Guerrero_Lopez: 4, Familia_Molina_Franco:2, Familia_Hernandez_Melendrez:2, Familia_Crissanto_Hernandez:2, Familia_Gonzalez_Gonzalez:2},
      Carlos: { Familia_Avitia_Hernandez: 5, Familia_Perales_Avitia: 3,Familia_Rodriguez_Hernandez:2,Familia_Herrera_Hernandez:2, Familia_Hernandez_Cabrales:3, Familia_Esquvel_Hernandez:2, Familia_Hernandes_De_La_Hoya:2, Familia_Hernandez_Silecio:2}
    };

    // Nombres legibles para mostrar en dropdown y WhatsApp
    const familyNames = {
      Familia_Rocha_Quezada: "Familia Rocha Quezada",
      Familia_Gonzalez_Quezada: "Familia Gonzalez Quezada",
      Familia_Hernandez_Quezada: "Familia Hernandez Quezada",
      Familia_Rosales_Quezada: "Familia Rosales Quezada",
      Familia_Rios_Quezada: "Familia Rios Quezada",
      Familia_Rocha_Nader: "Familia Rocha Nader",
      Familia_Hernandez_Melendrez: "Familia Hernandez Melendrez",
      Familia_Crissanto_Hernandez: "Familia Crissanto Hernandez",
      Familia_Gonzalez_Gonzalez: "Familia Gonzalez Gonzalez",
      Familia_Guerrero_Lopez: "Familia Guerrero Lopez",
      Familia_Molina_Franco: "Familia Molina Franco",
      Familia_Avitia_Hernandez: "Familia Avitia Hernandez",
      Familia_Perales_Avitia: "Familia Perales Avitia",
      Familia_Rodriguez_Hernandez: "Familia Rodriguez Hernandez",
      Familia_Herrera_Hernandez: "Familia Herrera Hernandez",
      Familia_Hernandez_Cabrales: "Familia Hernandez Cabrales",
      Familia_Esquvel_Hernandez: "Familia Esquvel Hernandez",
      Familia_Hernandes_De_La_Hoya: "Familia Hernandes De La Hoya",
      Familia_Hernandez_Silecio: "Familia Hernandez Silecio"

    };


  const familySelect = document.getElementById('familySelect');
  const subfamilySelect = document.getElementById('subfamilySelect');
  const subfamilyDiv = document.getElementById('subfamilyDiv');
  const ticketsDiv = document.getElementById('ticketsDiv');
  const ticketSelect = document.getElementById('ticketSelect');

 // Al cambiar familia principal
familySelect.addEventListener('change', () => {
  const family = familySelect.value;

  // Limpiar subfamilia y tickets
  subfamilySelect.innerHTML = '<option value="">-- Selecciona --</option>';
  ticketSelect.innerHTML = '<option value="">-- Selecciona --</option>';
  ticketsDiv.style.display = 'none';

  if(family && families[family]) {
    Object.keys(families[family]).forEach(sub => {
      const option = document.createElement('option');
      option.value = sub; // valor interno
      option.textContent = familyNames[sub]; // texto visible legible
      subfamilySelect.appendChild(option);
    });
    subfamilyDiv.style.display = 'block';
  } else {
    subfamilyDiv.style.display = 'none';
  }
});

  // Al cambiar subfamilia
  subfamilySelect.addEventListener('change', () => {
    const family = familySelect.value;
    const sub = subfamilySelect.value;
    ticketSelect.innerHTML = '<option value="">-- Selecciona --</option>';

    if(sub) {
      const maxTickets = families[family][sub];
      for(let i=1; i<=maxTickets; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        ticketSelect.appendChild(option);
      }
      ticketsDiv.style.display = 'block';
    } else {
      ticketsDiv.style.display = 'none';
    }
  });

    // Al confirmar asistencia (botón)
    function confirmAttendance() {
      const family = familySelect.value;
      const sub = subfamilySelect.value;
      const tickets = ticketSelect.value;

      if(!family) { alert("Selecciona tu familia principal."); return; }
      if(!sub) { alert("Selecciona tu familia."); return; }
      if(!tickets) { alert("Selecciona cuántos boletos usarás."); return; }

      const phoneNumber = "+526188000268";
      const message = `Con mucha alegría, la *${familyNames[sub]}* de la Novia(o) *${family}* confirma *${tickets} personas* para su asistencia a la boda el 20 de Diciembre de 2025.` + 
      `\n` + 
      `\n- Dress Code: Semi-Formal\n- Importante: No se aceptan niños.\n` +
      `\n` + 
      `¡Nos vemos pronto!`;

      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    }