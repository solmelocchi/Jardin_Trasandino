/*
 * Arranque del sitio: arma las secciones y cambia entre ellas
 * según la dirección (#inicio, #recomendaciones, #juegos, #canciones, #actividades).
 * Así el botón "atrás" del navegador y los enlaces directos funcionan.
 */
(function () {
  const config = window.JARDIN_CONFIG;

  document.title = `${config.jardin.nombre} · Mochila interactiva`;

  const navegacion = Jardin.crearNavegacion(config);
  const principal = document.getElementById("principal");
  document.body.insertBefore(navegacion.nodo, principal);

  const secciones = {
    inicio: Jardin.crearInicio(config),
    recomendaciones: Jardin.crearRecomendaciones(config),
    juegos: Jardin.crearJuegos(config),
    canciones: Jardin.crearCanciones(config),
    actividades: Jardin.crearActividades(config),
  };
  const RUTAS = Object.keys(secciones);
  RUTAS.forEach((r) => principal.appendChild(secciones[r]));

  let primeraVez = true;

  function mostrar() {
    const pedida = location.hash.replace("#", "");
    const ruta = RUTAS.includes(pedida) ? pedida : "inicio";
    RUTAS.forEach((r) => (secciones[r].hidden = r !== ruta));
    navegacion.marcar(ruta);
    document.body.dataset.ruta = ruta;
    Jardin.voz.callar();
    Jardin.detenerVideos();

    // Al cambiar de sección, llevamos el foco al título (útil con teclado y lectores).
    if (!primeraVez) {
      window.scrollTo(0, 0);
      const titulo = secciones[ruta].querySelector("h1");
      if (titulo) titulo.focus({ preventScroll: true });
    }
    primeraVez = false;
  }

  window.addEventListener("hashchange", mostrar);
  mostrar();

  // Lo que cargan las seños en la planilla reemplaza a las listas de config.js.
  const constructores = { juegos: Jardin.crearJuegos, canciones: Jardin.crearCanciones, actividades: Jardin.crearActividades };
  Jardin.cargarPlanilla(config).then((datos) => {
    if (!datos) return;
    if (datos.juegos) config.juegos = datos.juegos;
    if (datos.canciones) config.canciones = datos.canciones;
    if (datos.salas) config.salas = datos.salas;
    Object.keys(constructores).forEach((ruta) => {
      const nueva = constructores[ruta](config);
      nueva.hidden = secciones[ruta].hidden;
      nueva.style.animation = "none"; // sin parpadeo al reemplazarla
      secciones[ruta].replaceWith(nueva);
      secciones[ruta] = nueva;
    });
  });
})();
