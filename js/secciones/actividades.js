/*
 * Secciones con tarjetas: Juegos, Canciones y Actividades no presenciales.
 * Todo el contenido (títulos y enlaces) sale de js/config.js.
 */
window.Jardin = window.Jardin || {};

(function () {
  // Arma una sección con cabecera, botón de volver y una lista de tarjetas.
  function crearSeccion({ ruta, titulo, bajada, contenido }) {
    const seccion = document.createElement("section");
    seccion.className = `seccion seccion-tarjetas ${ruta}`;
    seccion.id = `seccion-${ruta}`;
    seccion.setAttribute("aria-labelledby", `${ruta}-titulo`);
    seccion.innerHTML = `
      <header class="seccion__cabecera">
        ${Jardin.botonVolver()}
        <h1 class="seccion__titulo" id="${ruta}-titulo" tabindex="-1">${titulo}</h1>
        <p class="seccion__bajada">${bajada}</p>
      </header>
      ${contenido}`;
    return seccion;
  }

  function llenar(seccion, nombre, lista, crear) {
    const ul = seccion.querySelector(`[data-lista="${nombre}"]`);
    (lista || []).forEach((dato) => ul.appendChild(crear(dato)));
    if (!ul.children.length) ul.closest(".grupo").hidden = true;
  }

  /* -------- Juegos -------- */
  Jardin.crearJuegos = function (config) {
    const seccion = crearSeccion({
      ruta: "juegos",
      titulo: "Juegos",
      bajada: "Juegos para aprender a prepararnos ante un sismo, con calma y acompañados.",
      contenido: `
        <section class="grupo" aria-label="Juegos">
          <div class="consejo">
            <span class="consejo__dibujo">${Jardin.ilustraciones.sol}</span>
            <p>Lo más importante: <strong>escuchar y seguir las indicaciones de las seños y de los adultos que nos cuidan.</strong></p>
          </div>
          <ul class="tarjetas" data-lista="juegos"></ul>
          <p class="nota-adultos">Para familias y docentes: los juegos están en Wordwall y Mobbyt y se abren en una pestaña nueva.</p>
        </section>`,
    });
    llenar(seccion, "juegos", config.juegos, (j) => Jardin.crearTarjetaEnlace(j, "juego"));

    // Afiche de las salitas, arriba de los juegos.
    const afiche = config.aficheJuegos;
    if (afiche && afiche.imagen) {
      const figura = document.createElement("figure");
      figura.className = "afiche-juegos";
      figura.innerHTML = `<img src="" alt="" width="800" height="800" loading="lazy" />`;
      figura.querySelector("img").src = afiche.imagen;
      figura.querySelector("img").alt = afiche.descripcion || "";
      seccion.querySelector(".grupo").prepend(figura);
    }
    return seccion;
  };

  /* -------- Canciones -------- */
  Jardin.crearCanciones = function (config) {
    const seccion = crearSeccion({
      ruta: "canciones",
      titulo: "Canciones",
      bajada: "Cantamos y aprendemos juntos.",
      contenido: `
        <section class="grupo" aria-label="Canciones">
          <ul class="tarjetas tarjetas--canciones" data-lista="canciones"></ul>
          <p class="nota-adultos">Para familias y docentes: las canciones están en YouTube y en Google Drive.</p>
        </section>`,
    });
    llenar(seccion, "canciones", config.canciones, Jardin.crearTarjetaCancion);
    return seccion;
  };

  /* -------- Actividades no presenciales -------- */
  Jardin.crearActividades = function (config) {
    const seccion = crearSeccion({
      ruta: "actividades",
      titulo: "Actividades no presenciales",
      bajada: "Elegí tu salita para ver sus actividades.",
      contenido: `
        <section class="grupo" aria-label="Actividades por salita">
          <ul class="tarjetas tarjetas--salas" data-lista="salas"></ul>
        </section>`,
    });
    llenar(seccion, "salas", config.salas, Jardin.crearTarjetaSala);
    return seccion;
  };
})();
