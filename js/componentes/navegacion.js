/*
 * Barra superior: nombre del jardín y accesos a cada parte de la mochila.
 * Las pestañas son enlaces (#recomendaciones, #juegos, ...), así que
 * funcionan con mouse, con el dedo y con el teclado.
 */
window.Jardin = window.Jardin || {};

// Las partes de la mochila interactiva, en el orden en que se muestran.
Jardin.partes = [
  { ruta: "recomendaciones", nombre: "Recomendaciones ante contingencias", corto: "Recomendaciones", icono: "escudo", color: "rosa" },
  { ruta: "juegos", nombre: "Juegos", corto: "Juegos", icono: "dado", color: "lila" },
  { ruta: "canciones", nombre: "Canciones", corto: "Canciones", icono: "notas", color: "amarillo" },
  { ruta: "actividades", nombre: "Actividades no presenciales", corto: "Actividades", icono: "casita", color: "menta" },
];

Jardin.crearNavegacion = function (config) {
  const ilu = Jardin.ilustraciones;
  const barra = document.createElement("header");
  barra.className = "barra";

  const pestanas = [{ ruta: "inicio", nombre: "Inicio: la mochila", corto: "Inicio", icono: "mochilita", color: "celeste" }]
    .concat(Jardin.partes)
    .map(
      (p) => `
        <a class="pestana tema-${p.color}" href="#${p.ruta}" data-ruta="${p.ruta}" aria-label="${p.nombre}">
          <span class="pestana__icono">${ilu[p.icono]}</span><span class="pestana__texto">${p.corto}</span>
        </a>`
    )
    .join("");

  barra.innerHTML = `
    <div class="barra__contenido">
      <a class="barra__marca" href="#inicio">
        <img class="barra__logo" src="img/logo.png" alt="" width="64" height="64" />
        <span class="barra__nombre"></span>
      </a>
      <nav class="barra__nav" aria-label="Partes de la mochila">${pestanas}</nav>
    </div>`;
  barra.querySelector(".barra__nombre").textContent = config.jardin.nombre;

  return {
    nodo: barra,
    // Marca la pestaña activa (con aria-current, no solo con color).
    marcar(ruta) {
      barra.querySelectorAll(".pestana").forEach((p) => {
        if (p.dataset.ruta === ruta) p.setAttribute("aria-current", "page");
        else p.removeAttribute("aria-current");
      });
    },
  };
};

// Botón "Volver a la mochila" que va arriba de cada sección.
Jardin.botonVolver = function () {
  return `<a class="volver" href="#inicio">${Jardin.ilustraciones.volver}<span>Volver a la mochila</span></a>`;
};
