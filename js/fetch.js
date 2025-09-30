document.addEventListener("DOMContentLoaded", () => {
  const eventsContainer = document.getElementById("eventsContainer");

  fetch("http://localhost:5000/api/eventos")
    .then(res => res.json())
    .then(data => {
      console.log("Eventos cargados:", data);
      data.forEach(evento => {
        const fecha = new Date(evento.fecha_inicio);
        const day = fecha.getDate().toString().padStart(2, "0");
        const month = fecha.toLocaleString("es-ES", { month: "short" }).toUpperCase();

        const card = document.createElement("div");
        card.classList.add("event-card");
        card.innerHTML = `
          <div class="event-date">
            <span class="day">${day}</span>
            <span class="month">${month}</span>
          </div>
          <div class="event-info">
            <h3>${evento.nombre}</h3>
            <p>${evento.descripcion}</p>
            <p><strong>Horario:</strong> ${evento.horario}</p>
            <p><em>Del ${evento.fecha_inicio} al ${evento.fecha_fin}</em></p>
            <a href="#" class="event-button">Más información</a>
          </div>
        `;

        eventsContainer.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Error cargando JSON:", err);
      eventsContainer.innerHTML = "<p>No se pudieron cargar los eventos.</p>";
    });
});