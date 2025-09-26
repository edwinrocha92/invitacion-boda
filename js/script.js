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
      Carlos: { Familia_Avitia_Hernandez: 5, Familia_Perales_Avitia: 3,Familia_Rodriguez_Hernandez:2,Familia_Herrera_Hernandez:2, Familia_Hernandez_Cabrales:3, Familia_Esquivel_Hernandez:2, Familia_Hernandez_De_La_Hoya:2, Familia_Hernandez_Silerio:2,Familia_Hernandez_Arambula:5, Fam_Mata_Hernandez:2, Fam_Espinoza_Hernandez:6, Familia_Felix:3}
    };

    // Nombres legibles para mostrar en dropdown y WhatsApp
    const familyNames = {
      //FAMILIA DE ISSELA
      Familia_Rocha_Quezada: "Familia Rocha Quezada",
      Familia_Gonzalez_Quezada: "Familia González Quezada",
      Familia_Hernandez_Quezada: "Familia Hernández Quezada",
      Familia_Rosales_Quezada: "Familia Rosales Quezada",
      Familia_Rios_Quezada: "Familia Rios Quezada",
      Familia_Rocha_Nader: "Familia Rocha Nader",
      Familia_Hernandez_Melendrez: "Familia Hernández Melendrez",
      Familia_Crissanto_Hernandez: "Familia Crissanto Hernández",
      Familia_Gonzalez_Gonzalez: "Familia González González",
      Familia_Guerrero_Lopez: "Familia Guerrero López",
      Familia_Molina_Franco: "Familia Molina Franco",
      //FAMILIA DE CARLOS
      Familia_Avitia_Hernandez: "Familia Avitia Hernández",
      Familia_Perales_Avitia: "Familia Perales Avitia",
      Familia_Rodriguez_Hernandez: "Familia Rodríguez Hernández",
      Familia_Herrera_Hernandez: "Familia Herrera Hernández",
      Familia_Hernandez_Cabrales: "Familia Hernández Cabrales",
      Familia_Esquivel_Hernandez: "Familia Esquivel Hernández",
      Familia_Hernandez_De_La_Hoya: "Familia Hernández De La Hoya",
      Familia_Hernandez_Silerio: "Familia Hernández Silerio",
      Familia_Hernandez_Arambula: "Familia Hernández Arámbula",
      Fam_Mata_Hernandez: "Familia Mata Hernández",
      Fam_Espinoza_Hernandez: "Familia Espinoza Hernández",
      Familia_Felix: "Familia Félix"

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

subfamilySelect.addEventListener('change', () => {
  const family = familySelect.value;
  const sub = subfamilySelect.value;
  ticketSelect.innerHTML = '<option value="">-- Selecciona --</option>';
  const messageDiv = document.getElementById('ticketsMessage');

  if(sub) {
    const maxTickets = families[family][sub];

    // 🔹 Reemplazar mensaje en vez de insertar nuevos
    messageDiv.innerHTML = `Solo una persona de <b>${familyNames[sub]}</b> debe confirmar asistencia. 
      Selecciona cuántas personas de tu familia asistirán (máximo ${maxTickets}).`;

        // 🔹 Nueva opción "No asistiré"
      const noOption = document.createElement('option');
      noOption.value = "0";
      noOption.textContent = "No asistiré";
      ticketSelect.appendChild(noOption);

    // Generar opciones de boletos
    for(let i=1; i<=maxTickets; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      ticketSelect.appendChild(option);
    }
    ticketsDiv.style.display = 'block';
  } else {
    ticketsDiv.style.display = 'none';
    messageDiv.innerHTML = '';
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

      // Números de teléfono según familia principal
      let phoneNumber;
      if (family === "Issela") {
              phoneNumber = "+526188000268";
      } else if  (family === "Carlos") {
              phoneNumber = "+525623341410";
      }



      let message = `*MENSAJE NUEVO*\n\n`;
      if (tickets === "0") {

              message += `Lamentablemente, La *${familyNames[sub]}* invitada por *${family}* no podrá acompañarlos en la celebración de su boda el *20 de Diciembre de 2025*.\n\n` +
               `Con mucho cariño, les deseamos lo mejor en este día tan especial y una vida llena de amor y felicidad.`;

      } else {

              message +=`Con mucha alegría, La *${familyNames[sub]}* de la Novia(o) *${family}* confirma la asistencia de *${tickets} personas* a la boda el *20 de Diciembre de 2025*.\n`+
                        `\n`+
                        `*Dress Code:* Semi-Formal\n`+
                        `\n`+
                        `*Importante:* No se aceptan niños.\n`+
                        `\n`+
                        `¡Nos vemos pronto!`;
          }


      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    }






const overlay = document.getElementById('inviteOverlay');
const enterBtn = document.getElementById('enterBtn');
const audio = document.getElementById('bg-music');
const START_AT = 5;
// Bloquear scroll al cargar
document.body.classList.add("modal-open");
enterBtn.addEventListener('click', () => {
        // 🚪 Quita overlay con fade-out
    overlay.classList.add("hide");
    document.body.classList.remove("modal-open"); // Reactiva scroll
 
  // Reproducir audio desde el segundo 20
  if (audio) {
    try {
      audio.currentTime = START_AT;
      audio.play().catch(() => {
        console.warn('El audio requiere interacción del usuario.');
      });
    } catch(e) {
      console.warn(e);
    }
  }
});
