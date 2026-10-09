/*
 * Mensajito amable que aparece abajo unos segundos
 * (por ejemplo, cuando una sala todavía no tiene su carpeta).
 */
window.Jardin = window.Jardin || {};

(function () {
  let caja = null;
  let temporizador = null;

  Jardin.mostrarAviso = function (texto) {
    if (!caja) {
      caja = document.createElement("div");
      caja.className = "aviso";
      caja.setAttribute("role", "status");
      caja.innerHTML = `<span class="aviso__dibujo">${Jardin.ilustraciones.sol}</span><p class="aviso__texto"></p>
        <button class="aviso__cerrar" type="button" aria-label="Cerrar mensaje">×</button>`;
      caja.querySelector("button").addEventListener("click", ocultar);
      document.body.appendChild(caja);
    }
    caja.querySelector(".aviso__texto").textContent = texto;
    // Forzamos un cuadro para que la animación de entrada se repita.
    caja.classList.remove("aviso--visible");
    void caja.offsetWidth;
    caja.classList.add("aviso--visible");
    clearTimeout(temporizador);
    temporizador = setTimeout(ocultar, 6000);
  };

  function ocultar() {
    if (caja) caja.classList.remove("aviso--visible");
  }
})();
