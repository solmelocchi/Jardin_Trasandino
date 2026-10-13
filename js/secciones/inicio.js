/*
 * Inicio: la mochila interactiva. Una mochila grande en el centro
 * con cuatro botones alrededor que abren cada parte del sitio.
 */
window.Jardin = window.Jardin || {};

Jardin.crearInicio = function (config) {
  const ilu = Jardin.ilustraciones;
  const SALUDO = Jardin.frases.saludo;
  // Posición de cada botón (porcentajes del ancho y del alto).
  const lugares = [
    { x: 15, y: 30 },
    { x: 85, y: 30 },
    { x: 15, y: 76 },
    { x: 85, y: 76 },
  ];

  const botones = Jardin.partes
    .map(
      (p, i) => `
      <a class="hub__boton tema-${p.color}" href="#${p.ruta}" style="--x:${lugares[i].x}%;--y:${lugares[i].y}%;--orden:${i}">
        <span class="hub__circulo">${ilu[p.icono]}</span>
        <span class="hub__etiqueta">${p.nombre}</span>
      </a>`
    )
    .join("");

  const seccion = document.createElement("section");
  seccion.className = "seccion inicio";
  seccion.id = "seccion-inicio";
  seccion.setAttribute("aria-labelledby", "inicio-titulo");
  seccion.innerHTML = `
    <div class="inicio__portada">
      <img class="inicio__logo" src="img/logo.png" alt="Logo del JIN 0-152 Tren Trasandino" width="160" height="160" />
      <div class="inicio__textos">
        <h1 class="inicio__titulo" id="inicio-titulo" tabindex="-1"></h1>
        <p class="inicio__lema"></p>
      </div>
    </div>

    <div class="hub">
      <svg class="hub__tiras" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M38 50C30 44 26 38 15 30M62 50C70 44 74 38 85 30M38 72C30 74 26 75 15 76M62 72C70 74 74 75 85 76"/>
      </svg>
      <div class="hub__arco" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>
      <p class="hub__globo">${SALUDO}</p>
      <button class="hub__mochila" type="button" aria-label="La mochila del jardín. Tocala para que te salude.">${ilu.mochila}</button>
      ${botones}
    </div>`;

  seccion.querySelector(".inicio__titulo").textContent = config.jardin.titulo;
  seccion.querySelector(".inicio__lema").textContent = config.jardin.lema;

  // Al tocar la mochila, saluda (con voz si está encendida) y da un saltito.
  const mochila = seccion.querySelector(".hub__mochila");
  mochila.addEventListener("click", () => {
    mochila.classList.remove("hub__mochila--saluda");
    void mochila.offsetWidth;
    mochila.classList.add("hub__mochila--saluda");
    Jardin.voz.hablar(SALUDO);
  });

  return seccion;
};
