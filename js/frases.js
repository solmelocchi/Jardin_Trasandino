/*
 * Todo lo que dice la mochila en voz alta.
 * Cada frase tiene su audio grabado en audios/voz (ver herramientas/generar-voces.js).
 * Si se cambia una frase acá o en js/datos, hay que volver a generar los audios.
 */
window.Jardin = window.Jardin || {};

Jardin.frases = {
  saludo: "¡Hola! Soy la mochila del jardín Trasandino. ¿Qué querés abrir?",
  festejo: "¡Excelente! ¡Ya guardaste todo lo que necesitamos en nuestra mochila de emergencia!",

  // Al descubrir o tocar una cosa de la mochila.
  elemento: (d) => `${d.nombre}. ${d.frase}`,
  // Al meterla en la mochila.
  guardar: (d) => `¡${d.nombre}, a la mochila!`,
  // Pasos de "En el jardín" y "En casa" (el número empieza en 1).
  paso: (numero, paso) => `Paso ${numero}. ${paso.titulo}.`,

  // Lista completa de frases, para generar los audios.
  todas() {
    const lista = [this.saludo, this.festejo];
    Jardin.elementosMochila.forEach((d) => lista.push(this.elemento(d), this.guardar(d)));
    Object.values(Jardin.recomendaciones).forEach((lugar) =>
      lugar.pasos.forEach((p, i) => lista.push(this.paso(i + 1, p)))
    );
    return Array.from(new Set(lista));
  },
};
