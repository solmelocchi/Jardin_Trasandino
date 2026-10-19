/*
 * Recomendaciones ante contingencias: ¿qué guardamos en la mochila de emergencia?
 *
 * Modo "Jugar a guardar": los elementos están escondidos alrededor de la
 * mochila. Al tocar uno se descubre y la voz cuenta qué es y para qué sirve.
 * Después se lo vuelve a tocar (o se lo arrastra) para meterlo en la mochila.
 *
 * Modos "En el jardín" y "En casa": los pasos a seguir si tiembla.
 */
window.Jardin = window.Jardin || {};

(function () {
  const ANIMOS = ["¡Descubriste algo!", "¡Mirá lo que encontraste!", "¡Muy bien!", "¡Genial!"];
  const GUARDADOS = ["¡Adentro de la mochila!", "¡Muy bien guardado!", "¡Uno más en la mochila!", "¡Súper! ¿Qué nos falta?"];
  const PISTA = "Tocá un globito con signo de pregunta para descubrir qué es.";

  /*
   * Reparte n puntos sobre una elipse a distancias iguales (medidas sobre
   * la curva), empezando arriba y girando como las agujas del reloj.
   * rx y ry son porcentajes del ancho y del alto del escenario.
   */
  function posicionesEnRonda(n, rx, ry, proporcion) {
    const pasos = 720;
    const puntos = [];
    let largo = 0;
    let anterior = null;
    for (let i = 0; i <= pasos; i++) {
      const ang = -Math.PI / 2 + (i / pasos) * Math.PI * 2;
      const p = { x: rx * Math.cos(ang), y: ry * Math.sin(ang) };
      // El alto se pasa a la misma escala que el ancho para medir bien.
      if (anterior) largo += Math.hypot(p.x - anterior.x, (p.y - anterior.y) / proporcion);
      p.largo = largo;
      puntos.push(p);
      anterior = p;
    }
    const resultado = [];
    let j = 0;
    for (let k = 0; k < n; k++) {
      const objetivo = ((k + 0.5) / n) * largo;
      while (j < puntos.length - 1 && puntos[j].largo < objetivo) j++;
      resultado.push({ x: 50 + puntos[j].x, y: 50 + puntos[j].y });
    }
    return resultado;
  }

  // Reinicia una animación CSS quitando y volviendo a poner la clase.
  function repetir(nodo, clase, ms) {
    nodo.classList.remove(clase);
    void nodo.offsetWidth;
    nodo.classList.add(clase);
    if (ms) setTimeout(() => nodo.classList.remove(clase), ms);
  }

  Jardin.crearRecomendaciones = function (config) {
    const ilu = Jardin.ilustraciones;
    const datos = Jardin.elementosMochila;
    const total = datos.length;
    const posiciones = posicionesEnRonda(total, 40.5, 37, 1.3);

    const seccion = document.createElement("section");
    seccion.className = "seccion recomendaciones";
    seccion.id = "seccion-recomendaciones";
    seccion.setAttribute("aria-labelledby", "recomendaciones-titulo");
    seccion.innerHTML = `
      <header class="seccion__cabecera">
        ${Jardin.botonVolver()}
        <h1 class="seccion__titulo" id="recomendaciones-titulo" tabindex="-1">Recomendaciones ante contingencias</h1>
        <p class="seccion__bajada">Aprendemos a cuidarnos, con calma y junto a los adultos.</p>
      </header>

      <div class="herramientas">
        <div class="modos" role="group" aria-label="Elegí cómo mirar">
          <button class="modos__boton" type="button" data-modo="juego" aria-pressed="true">${ilu.mochilita}<span>Jugar a guardar</span></button>
          <button class="modos__boton" type="button" data-modo="jardin" aria-pressed="false">${ilu.sol}<span>En el jardín</span></button>
          <button class="modos__boton" type="button" data-modo="casa" aria-pressed="false">${ilu.casa}<span>En casa</span></button>
          <button class="modos__boton" type="button" data-modo="video" aria-pressed="false">${ilu.tren}<span>Video del tren</span></button>
        </div>
        <span class="herramientas__voz"></span>
      </div>

      <div class="modo" data-panel="juego">
        <div class="mochila__tablero">
          <div class="progreso">
            <p class="progreso__texto"></p>
            <div class="progreso__ranuras" aria-hidden="true"></div>
          </div>
          <button class="boton boton--suave mochila__reiniciar" type="button">${ilu.otraVez}<span>Empezar de nuevo</span></button>
        </div>

        <div class="mochila__juego">
          <div class="escenario" role="list" aria-label="Cosas para guardar, alrededor de la mochila">
            <div class="escenario__mochila" aria-hidden="true">${ilu.mochila}</div>
          </div>

          <aside class="globo" aria-label="La mochila te cuenta">
            <div class="globo__dibujo" aria-hidden="true"></div>
            <div class="globo__cuerpo">
              <div class="globo__texto" aria-live="polite">
                <p class="globo__animo"></p>
                <p class="globo__nombre"></p>
                <p class="globo__frase"></p>
                <p class="globo__pista"></p>
              </div>
              <div class="globo__acciones">
                <button class="boton globo__guardar" type="button">${ilu.mochilita}<span>¡A la mochila!</span></button>
                <button class="boton boton--suave globo__escuchar" type="button">${ilu.parlante}<span>Escuchar</span></button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div class="modo" data-panel="jardin" hidden></div>
      <div class="modo" data-panel="casa" hidden></div>
      <div class="modo" data-panel="video" hidden>
        <div class="video-reco">
          <ul class="tarjetas tarjetas--canciones video-reco__video"></ul>
        </div>
      </div>

      <dialog class="festejo" aria-labelledby="festejo-titulo">
        <div class="festejo__confeti" aria-hidden="true"></div>
        <div class="festejo__mochila" aria-hidden="true">${ilu.mochila}</div>
        <h2 class="festejo__titulo" id="festejo-titulo">¡Excelente!</h2>
        <p class="festejo__texto">¡Ya guardaste todo lo que necesitamos en nuestra mochila de emergencia!</p>
        <p class="festejo__consejo">Ahora podés prepararla junto a tu familia.</p>
        <div class="festejo__botones">
          <button class="boton" type="button" data-accion="otra-vez" autofocus>${ilu.otraVez}<span>¡Jugar otra vez!</span></button>
          <button class="boton boton--suave" type="button" data-accion="cerrar">Mirar mi mochila</button>
        </div>
      </dialog>`;

    seccion.querySelector(".herramientas__voz").appendChild(Jardin.crearBotonVoz());

    const $ = (sel) => seccion.querySelector(sel);
    const escenario = $(".escenario");
    const mochila = $(".escenario .escenario__mochila");
    const globo = $(".globo");
    const botonGuardar = $(".globo__guardar");
    const botonEscuchar = $(".globo__escuchar");
    const dialogo = $(".festejo");
    let animo = 0;
    let guardado = 0;
    let actual = null; // elemento que se está mostrando en el globo

    /* ---------------- Modos: jugar / ver todo junto ---------------- */

    function cambiarModo(modo) {
      seccion.querySelectorAll(".modos__boton").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.modo === modo)));
      seccion.querySelectorAll(".modo").forEach((p) => (p.hidden = p.dataset.panel !== modo));
      Jardin.voz.callar();
      Jardin.detenerVideos();
    }
    seccion.querySelectorAll(".modos__boton").forEach((b) => b.addEventListener("click", () => cambiarModo(b.dataset.modo)));

    /* ---------------- Juego ---------------- */

    function sobreMochila(x, y) {
      const r = mochila.getBoundingClientRect();
      const margen = 24;
      return x > r.left - margen && x < r.right + margen && y > r.top - margen && y < r.bottom + margen;
    }

    const elementos = datos.map((dato, i) => {
      const el = Jardin.crearElementoMochila(dato, i, {
        alTocar: tocar,
        estaSobreMochila: sobreMochila,
        alArrastrar: (encima) => mochila.classList.toggle("escenario__mochila--esperando", encima),
        alSoltarEnMochila: (e, fantasma) => meterEnMochila(e, fantasma),
      });
      el.ubicar(posiciones[i].x, posiciones[i].y);
      escenario.appendChild(el.nodo);
      return el;
    });

    function actualizarProgreso() {
      $(".progreso__texto").innerHTML =
        guardado === 0
          ? `¡Guardá las <strong>${total}</strong> cosas en la mochila!`
          : `Guardaste <strong>${guardado}</strong> de <strong>${total}</strong> en la mochila`;
      $(".progreso__ranuras").innerHTML = elementos
        .map((e) =>
          e.estado === "guardado"
            ? `<span class="ranura ranura--llena tema-${e.datos.color}">${Jardin.dibujo(e.datos.id)}</span>`
            : `<span class="ranura"></span>`
        )
        .join("");
    }

    function decir({ dibujo, animo: textoAnimo, nombre, frase, pista }) {
      repetir(globo, "globo--nuevo");
      $(".globo__dibujo").innerHTML = dibujo;
      $(".globo__animo").textContent = textoAnimo;
      $(".globo__nombre").textContent = nombre;
      $(".globo__frase").textContent = frase;
      $(".globo__pista").textContent = pista || "";
      botonGuardar.hidden = !(actual && actual.estado === "descubierto");
      botonEscuchar.hidden = !actual || !Jardin.voz.disponible;
    }

    function saludar(textoAnimo) {
      actual = null;
      decir({ dibujo: ilu.mochila, animo: textoAnimo, nombre: "¿Qué guardamos?", frase: PISTA });
    }

    function tocar(el) {
      const d = el.datos;
      actual = el;
      if (el.estado === "escondido") {
        el.revelar();
        decir({
          dibujo: Jardin.dibujo(d.id),
          animo: ANIMOS[animo++ % ANIMOS.length],
          nombre: d.nombre,
          frase: d.frase,
          pista: "Tocalo otra vez o arrastralo hasta la mochila para guardarlo.",
        });
        Jardin.voz.hablar(Jardin.frases.elemento(d));
      } else if (el.estado === "descubierto") {
        meterEnMochila(el, Jardin.crearFantasma(el.burbuja, d.id));
      } else {
        decir({ dibujo: Jardin.dibujo(d.id), animo: "Ya está en la mochila", nombre: d.nombre, frase: d.frase });
        Jardin.voz.hablar(Jardin.frases.elemento(d));
      }
    }

    // El dibujo vuela hasta la mochila, que lo "come" contenta.
    function meterEnMochila(el, fantasma) {
      const d = el.datos;
      el.guardar();
      guardado++;
      actual = el;
      decir({
        dibujo: Jardin.dibujo(d.id),
        animo: guardado === total ? "¡Guardaste el último!" : GUARDADOS[(guardado - 1) % GUARDADOS.length],
        nombre: d.nombre,
        frase: d.frase,
        pista: guardado === total ? "" : PISTA,
      });
      Jardin.voz.hablar(Jardin.frases.guardar(d));
      repetir(mochila, "escenario__mochila--abre");
      Jardin.moverFantasma(fantasma, mochila.getBoundingClientRect(), 0.2, () => {
        fantasma.remove();
        repetir(mochila, "escenario__mochila--feliz", 1100);
        actualizarProgreso();
        if (guardado === total) setTimeout(festejar, 900);
      });
    }

    botonGuardar.addEventListener("click", () => {
      if (actual && actual.estado === "descubierto") {
        meterEnMochila(actual, Jardin.crearFantasma(actual.burbuja, actual.datos.id));
      }
    });
    botonEscuchar.addEventListener("click", () => {
      if (actual) Jardin.voz.hablar(Jardin.frases.elemento(actual.datos));
    });

    function festejar() {
      const colores = ["#ffd95e", "#ff9fb2", "#6fd6b0", "#6ec6ff", "#b69cff", "#ffb36b"];
      $(".festejo__confeti").innerHTML = Array.from({ length: 36 }, (_, i) => {
        const forma = i % 3 === 0 ? "confeti--estrella" : i % 3 === 1 ? "confeti--redondo" : "";
        return `<span class="confeti ${forma}" style="--x:${Math.round(Math.random() * 100)}%;--d:${(Math.random() * 1.2).toFixed(2)}s;--t:${(2.4 + Math.random() * 1.8).toFixed(2)}s;--g:${Math.round(Math.random() * 360)}deg;--c:${colores[i % colores.length]}"></span>`;
      }).join("");
      if (typeof dialogo.showModal === "function") dialogo.showModal();
      else dialogo.setAttribute("open", "");
      Jardin.voz.hablar(Jardin.frases.festejo);
    }

    function cerrarFestejo() {
      if (typeof dialogo.close === "function") dialogo.close();
      else dialogo.removeAttribute("open");
    }

    function reiniciar() {
      elementos.forEach((e) => e.esconder());
      guardado = 0;
      animo = 0;
      Jardin.voz.callar();
      actualizarProgreso();
      saludar("¡Escondimos todo de nuevo!");
    }

    $(".mochila__reiniciar").addEventListener("click", reiniciar);
    dialogo.addEventListener("click", (ev) => {
      const accion = ev.target.closest("[data-accion]");
      if (!accion) return;
      cerrarFestejo();
      if (accion.dataset.accion === "otra-vez") {
        reiniciar();
        elementos[0].enfocar();
      }
    });

    /* ---------------- Video del tren (con el afiche al lado) ---------------- */

    const video = config.videoRecomendaciones;
    const panelVideo = seccion.querySelector('[data-panel="video"]');
    if (video && Jardin.enlaceValido(video.youtube)) {
      panelVideo.querySelector(".video-reco__video").appendChild(Jardin.crearTarjetaCancion(video));
      if (video.afiche) {
        const figura = document.createElement("figure");
        figura.className = "video-reco__afiche";
        figura.innerHTML = `<img src="" alt="" width="800" height="800" loading="lazy" />`;
        figura.querySelector("img").src = video.afiche;
        figura.querySelector("img").alt = video.descripcionAfiche || "";
        panelVideo.querySelector(".video-reco").prepend(figura);
      }
    } else {
      // Sin video configurado, no se muestra el botón.
      seccion.querySelector('[data-modo="video"]').remove();
    }

    /* ---------------- Pasos: en el jardín y en casa ---------------- */

    ["jardin", "casa"].forEach((lugar) => {
      const info = Jardin.recomendaciones[lugar];
      const panel = seccion.querySelector(`[data-panel="${lugar}"]`);
      panel.innerHTML = `<p class="pasos__intro"></p>`;
      panel.querySelector(".pasos__intro").textContent = info.intro;

      let lista = null;
      let momento = null;
      info.pasos.forEach((paso, i) => {
        // Cada momento ("Durante", "Después") tiene su título y su lista.
        if (!lista || paso.momento !== momento) {
          momento = paso.momento;
          if (momento) {
            const h = document.createElement("h2");
            h.className = "pasos__momento";
            h.textContent = momento;
            panel.appendChild(h);
          }
          lista = document.createElement("ol");
          lista.className = "pasos";
          lista.start = i + 1;
          panel.appendChild(lista);
        }
        const li = document.createElement("li");
        li.className = `paso tema-${paso.color}`;
        li.innerHTML = `
          <button class="paso__boton" type="button">
            <span class="paso__numero" aria-hidden="true">${i + 1}</span>
            <span class="paso__dibujo" aria-hidden="true">${Jardin.dibujo(paso.dibujo)}</span>
            <span class="paso__titulo"></span>
          </button>`;
        li.querySelector(".paso__titulo").textContent = paso.titulo;
        li.querySelector("button").addEventListener("click", () => {
          repetir(li, "paso--toca", 700);
          Jardin.voz.hablar(Jardin.frases.paso(i + 1, paso));
        });
        lista.appendChild(li);
      });

      const nota = document.createElement("p");
      nota.className = "consejo pasos__consejo";
      nota.innerHTML = `<span class="consejo__dibujo">${ilu.sol}</span><span>Lo más importante: <strong>escuchar y seguir las indicaciones de los adultos que nos cuidan.</strong></span>`;
      panel.appendChild(nota);
    });

    actualizarProgreso();
    saludar("¡Hola!");
    return seccion;
  };
})();
