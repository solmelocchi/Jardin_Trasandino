/*
 * Recomendaciones ante un sismo, en pasos cortos y con dibujo.
 * "En el jardín" sigue la lámina de la seño (agacharse, cubrirse, sujetarse...).
 * "En casa" sigue la lámina para familias (durante y después del sismo).
 * Cada paso tiene: el dibujo (ver js/ilustraciones.js) y la frase que se lee.
 */
window.Jardin = window.Jardin || {};

Jardin.recomendaciones = {
  jardin: {
    intro: "Si la tierra tiembla en el jardín, hacemos esto junto a las seños:",
    pasos: [
      { titulo: "Agacharse", dibujo: "pasoAgacharse", color: "rosa" },
      { titulo: "Cubrirse debajo de una mesa resistente", dibujo: "pasoCubrirse", color: "celeste" },
      { titulo: "Sujetarse con firmeza", dibujo: "pasoSujetarse", color: "menta" },
      { titulo: "Alejarse de ventanas y de cosas que puedan caer", dibujo: "pasoVentana", color: "lila" },
      { titulo: "Mantener la calma", dibujo: "pasoCalma", color: "naranja" },
      { titulo: "Salir en orden cuando termine el movimiento", dibujo: "pasoSalir", color: "amarillo" },
      { titulo: "Ir al punto de encuentro con la seño", dibujo: "pasoEncuentro", color: "menta" },
    ],
  },
  casa: {
    intro: "Si la tierra tiembla en casa, hacemos esto junto a nuestra familia:",
    pasos: [
      { momento: "Durante el sismo", titulo: "Mantener la calma", dibujo: "pasoCalma", color: "naranja" },
      { momento: "Durante el sismo", titulo: "Agacharse, cubrirse y sujetarse debajo de una mesa resistente", dibujo: "pasoCubrirse", color: "celeste" },
      { momento: "Durante el sismo", titulo: "Alejarse de las ventanas", dibujo: "pasoVentana", color: "lila" },
      { momento: "Durante el sismo", titulo: "No usar el ascensor", dibujo: "pasoAscensor", color: "rosa" },
      { momento: "Después del sismo", titulo: "Salir con calma, de la mano de un adulto", dibujo: "pasoSalir", color: "amarillo" },
      { momento: "Después del sismo", titulo: "Llevar la mochila de emergencia", dibujo: "pasoMochila", color: "rosa" },
      { momento: "Después del sismo", titulo: "Si alguien necesita ayuda, un adulto llama al 911", dibujo: "pasoTelefono", color: "menta" },
    ],
  },
};
