/*
 * Voz de la mochila. Solo habla cuando el nene toca algo: nunca suena sola al entrar.
 *
 * Primero usa los audios grabados de audios/voz (lista en js/datos/audios.js),
 * que suenan igual en cualquier celular o compu. Si una frase no tiene audio,
 * usa la voz del dispositivo, pero solo si es en castellano.
 *
 * Se puede apagar con el botón del parlante; la elección se recuerda.
 */
window.Jardin = window.Jardin || {};

(function () {
  const audios = Jardin.audios || {};
  const hayAudios = Object.keys(audios).length > 0;
  const sintesis = window.speechSynthesis;
  const haySintesis = !!(sintesis && window.SpeechSynthesisUtterance);
  // Un solo reproductor para toda la página (así los celulares lo dejan sonar).
  const reproductor = typeof Audio === "function" ? new Audio() : null;
  let activa = true;

  try {
    activa = localStorage.getItem("jardin-voz") !== "apagada";
  } catch (e) {
    /* sin almacenamiento: queda encendida */
  }

  // Voz del dispositivo en castellano, si es posible de Argentina o Latinoamérica.
  function vozEnCastellano() {
    if (!haySintesis) return null;
    const voces = sintesis.getVoices().filter((v) => /^es/i.test(v.lang));
    const preferidas = ["es-AR", "es-UY", "es-419", "es-MX", "es-US", "es-ES"];
    return preferidas.map((l) => voces.find((v) => v.lang.replace("_", "-") === l)).find(Boolean) || voces[0] || null;
  }

  function callar() {
    if (reproductor) reproductor.pause();
    if (haySintesis) sintesis.cancel();
  }

  const oyentes = [];

  Jardin.voz = {
    disponible: (hayAudios && !!reproductor) || haySintesis,
    get activa() {
      return this.disponible && activa;
    },
    hablar(texto) {
      if (!this.activa || !texto) return;
      callar();
      if (audios[texto] && reproductor) {
        reproductor.src = audios[texto];
        reproductor.currentTime = 0;
        const reproduccion = reproductor.play();
        if (reproduccion && reproduccion.catch) reproduccion.catch(() => {});
        return;
      }
      const voz = vozEnCastellano();
      if (!voz) return; // sin voz en castellano, mejor no leer con acento raro
      const frase = new SpeechSynthesisUtterance(texto);
      frase.voice = voz;
      frase.lang = voz.lang;
      frase.rate = 0.95;
      frase.pitch = 1.4;
      sintesis.speak(frase);
    },
    callar,
    alternar() {
      activa = !activa;
      if (!activa) callar();
      try {
        localStorage.setItem("jardin-voz", activa ? "encendida" : "apagada");
      } catch (e) {
        /* nada */
      }
      oyentes.forEach((fn) => fn(activa));
    },
    alCambiar(fn) {
      oyentes.push(fn);
    },
  };

  // Algunos navegadores cargan la lista de voces más tarde.
  if (haySintesis && sintesis.addEventListener) sintesis.addEventListener("voiceschanged", () => {});

  // Botón de parlante reutilizable para encender o apagar la voz.
  Jardin.crearBotonVoz = function () {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "boton boton--suave boton-voz";
    if (!Jardin.voz.disponible) {
      boton.hidden = true;
      return boton;
    }
    function pintar() {
      const on = Jardin.voz.activa;
      boton.setAttribute("aria-pressed", on ? "true" : "false");
      boton.innerHTML = `${on ? Jardin.ilustraciones.parlante : Jardin.ilustraciones.parlanteMudo}<span>${on ? "Voz encendida" : "Voz apagada"}</span>`;
    }
    boton.addEventListener("click", () => Jardin.voz.alternar());
    Jardin.voz.alCambiar(pintar);
    pintar();
    return boton;
  };
})();
