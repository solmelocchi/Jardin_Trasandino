/*
 * Un elemento que se descubre y se guarda en la mochila.
 * Tiene tres momentos:
 *   1. escondido:   un globito con signo de pregunta.
 *   2. descubierto: se ve el dibujo y su nombre.
 *   3. guardado:    ya está dentro de la mochila (queda su lugar vacío con un tilde).
 * Para guardarlo se lo vuelve a tocar o se lo arrastra hasta la mochila.
 */
window.Jardin = window.Jardin || {};

Jardin.crearElementoMochila = function (elemento, numero, opciones) {
  const item = document.createElement("div");
  item.setAttribute("role", "listitem");
  item.className = `elemento tema-${elemento.color}`;
  item.style.setProperty("--retraso", `${(numero % 5) * -0.7}s`);

  const chispas = Array.from({ length: 8 }, (_, i) => `<span style="--i:${i}"></span>`).join("");
  item.innerHTML = `
    <button class="elemento__boton" type="button">
      <span class="elemento__burbuja">
        <span class="elemento__dibujo" aria-hidden="true">${Jardin.dibujo(elemento.id)}</span>
        <span class="elemento__tapa" aria-hidden="true"><span class="elemento__pregunta">?</span></span>
        <span class="elemento__hueco" aria-hidden="true">${Jardin.ilustraciones.tilde}</span>
        <span class="elemento__chispas" aria-hidden="true">${chispas}</span>
      </span>
      <span class="elemento__etiqueta" aria-hidden="true"></span>
    </button>`;

  const boton = item.querySelector("button");
  const burbuja = item.querySelector(".elemento__burbuja");
  const etiqueta = item.querySelector(".elemento__etiqueta");
  let estado = "escondido";

  function pintar() {
    item.dataset.estado = estado;
    etiqueta.textContent = estado === "escondido" ? "" : elemento.nombre;
    const textos = {
      escondido: `Sorpresa número ${numero + 1}. Tocá para descubrir qué es.`,
      descubierto: `${elemento.nombre}: ${elemento.frase} Tocá otra vez para guardarlo en la mochila.`,
      guardado: `${elemento.nombre}: ya está guardado en la mochila.`,
    };
    boton.setAttribute("aria-label", textos[estado]);
  }

  function animarClase(clase, ms) {
    item.classList.remove(clase);
    void item.offsetWidth;
    item.classList.add(clase);
    setTimeout(() => item.classList.remove(clase), ms);
  }

  /* ---------- Arrastrar hasta la mochila (mouse o dedo) ---------- */
  let inicio = null;
  let fantasma = null;
  let ignorarClick = false;

  boton.addEventListener("pointerdown", (ev) => {
    if (estado !== "descubierto" || ev.button > 0) return;
    inicio = { x: ev.clientX, y: ev.clientY, id: ev.pointerId };
  });

  window.addEventListener("pointermove", (ev) => {
    if (!inicio || ev.pointerId !== inicio.id) return;
    if (!fantasma) {
      if (Math.hypot(ev.clientX - inicio.x, ev.clientY - inicio.y) < 10) return;
      fantasma = Jardin.crearFantasma(burbuja, elemento.id);
      item.classList.add("elemento--arrastrando");
    }
    const tam = fantasma.offsetWidth;
    fantasma.style.left = `${ev.clientX - tam / 2}px`;
    fantasma.style.top = `${ev.clientY - tam / 2}px`;
    opciones.alArrastrar(opciones.estaSobreMochila(ev.clientX, ev.clientY));
  });

  function terminarArrastre(ev, cancelado) {
    if (!inicio || ev.pointerId !== inicio.id) return;
    inicio = null;
    if (!fantasma) return;
    ignorarClick = true;
    setTimeout(() => (ignorarClick = false), 50);
    const f = fantasma;
    fantasma = null;
    opciones.alArrastrar(false);
    if (!cancelado && opciones.estaSobreMochila(ev.clientX, ev.clientY)) {
      opciones.alSoltarEnMochila(api, f);
    } else {
      // Vuelve a su lugar.
      Jardin.moverFantasma(f, burbuja.getBoundingClientRect(), 1, () => {
        f.remove();
        item.classList.remove("elemento--arrastrando");
      });
    }
  }

  window.addEventListener("pointerup", (ev) => terminarArrastre(ev, false));
  window.addEventListener("pointercancel", (ev) => terminarArrastre(ev, true));

  boton.addEventListener("click", () => {
    if (!ignorarClick) opciones.alTocar(api);
  });

  const api = {
    nodo: item,
    burbuja,
    datos: elemento,
    get estado() {
      return estado;
    },
    revelar() {
      estado = "descubierto";
      pintar();
      animarClase("elemento--recien", 1200);
    },
    guardar() {
      estado = "guardado";
      item.classList.remove("elemento--arrastrando");
      pintar();
      animarClase("elemento--guardando", 700);
    },
    esconder() {
      if (estado === "escondido") return;
      estado = "escondido";
      pintar();
      animarClase("elemento--escondiendo", 600);
    },
    // Coloca el elemento en la ronda (porcentajes del escenario).
    ubicar(x, y) {
      item.style.setProperty("--x", `${x}%`);
      item.style.setProperty("--y", `${y}%`);
    },
    enfocar() {
      boton.focus();
    },
  };

  pintar();
  return api;
};

/*
 * "Fantasma": copia flotante del dibujo que vuela hasta la mochila
 * (o que sigue al dedo mientras se arrastra).
 */
Jardin.crearFantasma = function (desde, id) {
  const r = desde.getBoundingClientRect();
  const f = document.createElement("div");
  f.className = "fantasma";
  f.setAttribute("aria-hidden", "true");
  f.innerHTML = Jardin.dibujo(id);
  f.style.width = `${r.width}px`;
  f.style.height = `${r.height}px`;
  f.style.left = `${r.left}px`;
  f.style.top = `${r.top}px`;
  document.body.appendChild(f);
  return f;
};

// Lleva el fantasma hasta el centro de `destino`, achicándolo a `escala`.
Jardin.moverFantasma = function (f, destino, escala, alTerminar) {
  const r = f.getBoundingClientRect();
  const dx = destino.left + destino.width / 2 - (r.left + r.width / 2);
  const dy = destino.top + destino.height / 2 - (r.top + r.height / 2);
  // Se asegura de terminar una sola vez, aunque la animación no llegue a correr
  // (por ejemplo, si la pestaña quedó en segundo plano).
  let listo = false;
  const terminar = () => {
    if (listo) return;
    listo = true;
    alTerminar();
  };
  const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (quieto || !f.animate) {
    terminar();
    return;
  }
  setTimeout(terminar, 800);
  const anim = f.animate(
    [
      { transform: "translate(0, 0) scale(1) rotate(0deg)" },
      { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 60}px) scale(${(1 + escala) / 2 + 0.15}) rotate(-12deg)`, offset: 0.5 },
      { transform: `translate(${dx}px, ${dy}px) scale(${escala}) rotate(8deg)` },
    ],
    { duration: 650, easing: "cubic-bezier(.45,0,.4,1)", fill: "forwards" }
  );
  anim.onfinish = terminar;
};
