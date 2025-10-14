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
      Issela: { Familia_Rocha_Quezada: 5, Familia_Gonzalez_Quezada: 2, Familia_Hernandez_Quezada: 3, Familia_Rosales_Quezada: 6, Familia_Rios_Quezada: 4, Familia_Rocha_Nader: 2, Familia_Guerrero_Lopez: 4, Familia_Molina_Franco:2, Familia_Hernandez_Melendrez:2, Familia_Crissanto_Hernandez:2, Familia_Gonzalez_Gonzalez:2, Familia_Appleberry:2, Familia_Ayala:2},
      Carlos: { Familia_Avitia_Hernandez: 5, Familia_Perales_Avitia: 3,Familia_Rodriguez_Hernandez:2,Familia_Herrera_Hernandez:2, Familia_Hernandez_Cabrales:3, Familia_Esquivel_Hernandez:2, Familia_Hernandez_De_La_Hoya:2, Familia_Hernandez_Silerio:2,Familia_Hernandez_Arambula:5, Fam_Mata_Hernandez:2, Fam_Espinoza_Hernandez:6, Familia_Felix:3, Familia_Torres_Hernandez:3}
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
      Familia_Appleberry: "Familia Appleberry",
      Familia_Ayala: "Martin Ayala & Familia",
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
      Familia_Felix: "Familia Félix",
      Familia_Torres_Hernandez: "Familia Torres Hernández"

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
  subfamilySelect.value = ""; // 🔹 Reseteamos selección
  ticketSelect.innerHTML = '<option value="">-- Selecciona --</option>';
  ticketSelect.value = ""; // 🔹 Reseteamos selección
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

  if (sub) {
    const maxTickets = families[family][sub];

    messageDiv.innerHTML = `Solo una persona de <b>${familyNames[sub]}</b> debe confirmar asistencia. 
      Selecciona cuántas personas de tu familia asistirán (máximo ${maxTickets}).`;

    const noOption = document.createElement('option');
    noOption.value = "0";
    noOption.textContent = "No asistiré";
    ticketSelect.appendChild(noOption);

    for (let i = 1; i <= maxTickets; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      ticketSelect.appendChild(option);
    }
    ticketsDiv.style.display = 'block';

    // 🔹 Hack: liberar foco en móviles para poder volver a abrir "Novia/Novio"
    setTimeout(() => familySelect.blur(), 100);
  } else {
    ticketsDiv.style.display = 'none';
    messageDiv.innerHTML = '';
  }
});


 let tempData = {}; // Guardará los valores antes de confirmar

  function confirmAttendance() {
    const family = familySelect.value;
    const sub = subfamilySelect.value;
    const tickets = ticketSelect.value;

    if (!family) { alert("Selecciona tu familia principal."); return; }
    if (!sub) { alert("Selecciona tu familia."); return; }
    if (!tickets) { alert("Selecciona cuántos boletos usarás."); return; }

    // Guardamos los datos en memoria temporal
    tempData = { family, sub, tickets };

    // Inyectamos el mensaje en el modal
    const confirmMsg = `¿Confirmas que la familia <strong>${familyNames[sub]}</strong> 
      invitada por <strong>${family}</strong> usará 
      <strong>${tickets} boletos</strong>?`;
    document.getElementById("confirmModalBody").innerHTML = confirmMsg;

    // Mostramos el modal
    const modal = new bootstrap.Modal(document.getElementById("confirmModal"));
    modal.show();
  }

  // Acción al confirmar en el modal
  document.getElementById("confirmYesBtn").addEventListener("click", function() {
    const { family, sub, tickets } = tempData;

    // Números de teléfono según familia principal
    let phoneNumber;
    if (family === "Issela") {
      phoneNumber = "+526188000268";
    } else if (family === "Carlos") {
      phoneNumber = "+525623341410";
    }

    let message = `*MENSAJE NUEVO*\n\n`;
    if (tickets === "0") {
      message += `Lamentablemente, La *${familyNames[sub]}* invitada por *${family}* no podrá acompañarlos en la celebración de su boda el *20 de Diciembre de 2025*.\n\n` +
                 `Con mucho cariño, les deseamos lo mejor en este día tan especial y una vida llena de amor y felicidad.`;
    } else {
      message += `Con mucha alegría, La *${familyNames[sub]}* de la Novia(o) *${family}* confirma la asistencia de *${tickets} personas* a la boda el *20 de Diciembre de 2025*.\n\n` +
                 `*Dress Code:* Semi-Formal\n\n` +
                 `*Importante:* No se aceptan niños.\n\n` +
                 `¡Nos vemos pronto!`;
    }

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    // Cerrar el modal después de confirmar
    const modalElement = document.getElementById("confirmModal");
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  });





// const overlay = document.getElementById('inviteOverlay');
// const enterBtn = document.getElementById('enterBtn');
// const audio = document.getElementById('bg-music');
// const START_AT = 5;
// // Bloquear scroll al cargar
// document.body.classList.add("modal-open");
// if (!overlay || !enterBtn) return;

// enterBtn.addEventListener('click', () => {
//   // Evitar doble clicks
//   if (overlay.classList.contains('fade-out')) return;

//   document.body.classList.remove("modal-open");
//   // Remover del DOM cuando termine la transición
//   overlay.addEventListener("transitionend", () => {
//     overlay.remove();
//   });

//   // Reproducir música en segundo plano
//   if (audio) {
//     setTimeout(() => {
//       try {
//         audio.currentTime = START_AT;
//         audio.play().catch(() => {
//           console.warn('El audio requiere interacción del usuario.');
//         });
//       } catch (e) {
//         console.warn(e);
//       }
//     }, 200);
//   }
// });


document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('inviteOverlay');
  const enterBtn = document.getElementById('enterBtn');
  const audio = document.getElementById('bg-music');
  const START_AT = 6;

  // Asegurar bloqueo de scroll al inicio
  document.body.classList.add('modal-open');

  // Si por alguna razón el overlay no existe, evitamos errores
  if (!overlay || !enterBtn) return;

  enterBtn.addEventListener('click', (ev) => {
    // Evitar doble clicks
    if (overlay.classList.contains('fade-out')) return;

    // 1) Intentar reproducir audio dentro de la interacción (necesario para móviles)
    try {
      // fijar tiempo antes de play (si el navegador lo permite)
      if (audio) {
        // si el audio está cargado, setear el tiempo; si no, lo intentamos aunque falle
        try { audio.currentTime = START_AT; } catch (e) { /* ignore */ }
        // Llamada a play (no await) para no bloquear el hilo principal
        audio.play().catch(err => {
          // Si falla, lo registramos pero no interrumpe la UX
          console.warn('No se pudo iniciar audio automáticamente:', err);
        });
      }
    } catch (err) {
      console.warn('Error al intentar reproducir audio:', err);
    }

    // 2) Activar clase de fade-out
    overlay.classList.add('fade-out');

    // 3) Usar transitionend para remover el overlay definitivamente y restaurar scroll
    const onTransitionEnd = (e) => {
      // Solo reaccionamos al cambio de opacidad en el propio overlay
      if (e.target === overlay && e.propertyName === 'opacity') {
        cleanup();
      }
    };

    // Si transitionend no se dispara (por algún motivo), fallback timeout
    let fallbackTimer = setTimeout(() => {
      cleanup();
    }, 900); // ligeramente mayor que la transición (0.6s) por seguridad

    function cleanup() {
      // Remover listener y timer (si existe)
      overlay.removeEventListener('transitionend', onTransitionEnd);
      clearTimeout(fallbackTimer);

      // Removemos el elemento del DOM para evitar cualquier "fantasma"
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }

      // Restaurar scroll
      document.body.classList.remove('modal-open');
    }

    overlay.addEventListener('transitionend', onTransitionEnd, { once: true });
  });
});
