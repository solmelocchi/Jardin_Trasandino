/*
 * Tarjetas de la sección Actividades: salas, juegos y recursos.
 * Toda la información (nombres, colores y enlaces) viene de js/config.js.
 */
window.Jardin = window.Jardin || {};

(function () {
  // Un enlace está "configurado" solo si es una dirección web completa.
  Jardin.enlaceValido = function (url) {
    return typeof url === "string" && /^https?:\/\/\S+$/i.test(url.trim());
  };

  function escapar(texto) {
    const div = document.createElement("div");
    div.textContent = texto == null ? "" : String(texto);
    return div.innerHTML;
  }

  // Botón grande que abre el enlace en una pestaña nueva.
  function botonEnlace(url, texto, quien) {
    return `
      <a class="boton boton--tarjeta tarjeta__accion" href="${escapar(url.trim())}" target="_blank" rel="noopener noreferrer">
        <span>${escapar(texto)}</span>${Jardin.ilustraciones.externo}
        <span class="solo-lectores">: ${escapar(quien)} (se abre en una pestaña nueva)</span>
      </a>`;
  }

  /* -------- Tarjeta de sala -------- */
  Jardin.crearTarjetaSala = function (sala) {
    const lista = Jardin.enlaceValido(sala.enlaceDrive);
    const tarjeta = document.createElement("li");
    tarjeta.className = `tarjeta tarjeta--sala tema-${sala.color || "celeste"}${lista ? "" : " tarjeta--pronto"}`;
    tarjeta.innerHTML = `
      <div class="tarjeta__dibujo">${Jardin.dibujo(sala.ilustracion)}</div>
      <h3 class="tarjeta__titulo">${escapar(sala.nombre)}</h3>
      ${
        lista
          ? `<p class="tarjeta__texto">Carpeta de actividades</p>
             ${botonEnlace(sala.enlaceDrive, "Ver actividades", sala.nombre)}`
          : `<p class="tarjeta__texto tarjeta__pronto">${Jardin.ilustraciones.reloj}<span>¡Muy pronto!</span></p>
             <button class="boton boton--tarjeta tarjeta__accion" type="button">
               <span>Ver actividades</span><span class="solo-lectores">: ${escapar(sala.nombre)}</span>
             </button>`
      }`;

    // Sin enlace: tocar cualquier parte de la tarjeta (o su botón) muestra el aviso.
    if (!lista) {
      tarjeta.addEventListener("click", () => {
        Jardin.mostrarAviso(
          `Las actividades de la ${sala.nombre} van a estar disponibles muy pronto. ¡Volvé a visitarnos!`
        );
      });
    }
    return tarjeta;
  };

  /* -------- Tarjeta de juego o recurso -------- */
  Jardin.crearTarjetaEnlace = function (dato, tipo) {
    const tarjeta = document.createElement("li");
    tarjeta.className = `tarjeta tarjeta--${tipo} tema-${dato.color || "lila"}`;
    const detalle =
      tipo === "juego"
        ? `<p class="tarjeta__chip">${escapar(dato.tipo)}</p>
           <p class="tarjeta__texto tarjeta__texto--chico">Juego en ${escapar(dato.plataforma)}</p>`
        : `<p class="tarjeta__texto tarjeta__texto--chico">${escapar(dato.descripcion)}</p>`;

    tarjeta.innerHTML = `
      <div class="tarjeta__dibujo">${Jardin.dibujo(dato.ilustracion)}</div>
      <h3 class="tarjeta__titulo">${escapar(dato.titulo)}</h3>
      ${detalle}
      ${
        Jardin.enlaceValido(dato.enlace)
          ? botonEnlace(dato.enlace, dato.boton || "¡Jugar!", dato.titulo)
          : `<p class="tarjeta__texto tarjeta__pronto">${Jardin.ilustraciones.reloj}<span>¡Muy pronto!</span></p>`
      }`;
    return tarjeta;
  };

  /* -------- Tarjeta de canción (video de YouTube) -------- */

  const videos = [];
  Jardin.detenerVideos = function () {
    videos.forEach((detener) => detener());
  };

  // Saca el código del video de cualquier enlace de YouTube (youtu.be, watch?v=, shorts, embed).
  function codigoYoutube(url) {
    const m = String(url || "").match(/(?:youtu\.be\/|[?&]v=|\/shorts\/|\/embed\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : null;
  }

  Jardin.crearTarjetaCancion = function (cancion) {
    const tarjeta = document.createElement("li");
    tarjeta.className = `tarjeta tarjeta--cancion tema-${cancion.color || "amarillo"}`;
    const valido = Jardin.enlaceValido(cancion.youtube);
    // YouTube solo deja ver el video dentro de la página cuando el sitio se abre
    // desde una dirección web (no con doble clic en el archivo): ahí da "Error 153".
    const codigo = valido && location.protocol !== "file:" ? codigoYoutube(cancion.youtube) : null;

    tarjeta.innerHTML = `
      <div class="tarjeta__dibujo tarjeta__pantalla">${Jardin.dibujo(cancion.ilustracion || "notas")}</div>
      <h3 class="tarjeta__titulo">${escapar(cancion.titulo)}</h3>
      <p class="tarjeta__texto tarjeta__texto--chico">${escapar(cancion.descripcion || "")}</p>
      ${
        !valido
          ? `<p class="tarjeta__texto tarjeta__pronto">${Jardin.ilustraciones.reloj}<span>¡Muy pronto!</span></p>`
          : `<div class="tarjeta__botones">
               ${codigo ? `<button class="boton boton--tarjeta" type="button">${Jardin.ilustraciones.play}<span>¡Escuchar!</span><span class="solo-lectores">: ${escapar(cancion.titulo)}</span></button>` : ""}
               ${
                 codigo
                   ? `<a class="boton boton--suave boton--chico" href="${escapar(cancion.youtube.trim())}" target="_blank" rel="noopener">
                        <span>Ver en YouTube</span>${Jardin.ilustraciones.externo}<span class="solo-lectores"> (se abre en una pestaña nueva)</span>
                      </a>`
                   : `<a class="boton boton--tarjeta" href="${escapar(cancion.youtube.trim())}" target="_blank" rel="noopener">
                        ${Jardin.ilustraciones.play}<span>¡Escuchar en YouTube!</span><span class="solo-lectores"> (se abre en una pestaña nueva)</span>
                      </a>`
               }
             </div>`
      }`;

    // El video recién se carga cuando alguien toca "¡Escuchar!".
    const play = tarjeta.querySelector("button");
    const pantalla = tarjeta.querySelector(".tarjeta__pantalla");
    const dibujo = pantalla.innerHTML;
    if (play) {
      // Al salir de la sección, el video se apaga y vuelve el dibujo.
      videos.push(() => {
        if (!pantalla.classList.contains("tarjeta__pantalla--video")) return;
        pantalla.classList.remove("tarjeta__pantalla--video");
        pantalla.innerHTML = dibujo;
        play.hidden = false;
      });
      play.addEventListener("click", () => {
        pantalla.classList.add("tarjeta__pantalla--video");
        pantalla.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${codigo}?autoplay=1&rel=0" title="Video: ${escapar(cancion.titulo)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
        play.hidden = true;
        Jardin.voz.callar();
      });
    }
    return tarjeta;
  };
})();
