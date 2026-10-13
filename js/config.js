/*
 * ==========================================================
 *  CONFIGURACIÓN DEL JARDÍN
 *  Este es el ÚNICO archivo que hace falta tocar para cambiar
 *  el nombre del jardín y los enlaces de salas, juegos y canciones.
 * ==========================================================
 *
 *  Cómo cargar el enlace de una carpeta de Google Drive:
 *    1. En Google Drive, abrí la carpeta.
 *    2. Botón "Compartir" > "Cualquier persona con el enlace" > "Copiar enlace".
 *    3. Pegá el enlace entre las comillas.
 *
 *  Si un enlace queda vacío (""), la tarjeta muestra "¡Muy pronto!"
 *  y avisa que va a estar disponible próximamente.
 *
 *  Para agregar una sala, un juego o una canción, copiá un bloque
 *  { ... } de la lista que corresponda y cambiale los datos.
 *
 *  Colores disponibles (`color`):
 *    "celeste", "amarillo", "rosa", "menta", "lila", "naranja"
 *
 *  Ilustraciones disponibles (`ilustracion`):
 *    salas:     "animalitos", "lapices", "flores", "personajes"
 *    juegos:    "preguntas", "oca", "memoria", "frases", "comic"
 *    canciones: "notas"
 */
window.JARDIN_CONFIG = {
  jardin: {
    // Nombre que aparece arriba de todo y en la pestaña del navegador.
    nombre: "JIN 0-152 Tren Trasandino",
    titulo: "¡Bienvenidos a nuestro jardín!",
    lema: "Aprendemos, descubrimos y jugamos juntos",
  },

  // ---------- Actividades no presenciales ----------
  // Las dos carpetas están dentro de la carpeta general de abajo.
  salas: [
    {
      nombre: "Salita de 4",
      color: "celeste",
      ilustracion: "animalitos",
      enlaceDrive: "https://drive.google.com/drive/folders/1qo4GTYEtw0hhzekUe0NVKxEB5NMVUXaR",
    },
    {
      nombre: "Salita de 5",
      color: "amarillo",
      ilustracion: "lapices",
      enlaceDrive: "https://drive.google.com/drive/folders/1E-PzxkYqDojJkeQ-C9A7WF0UCd4nLmvp",
    },
  ],

  // La carpeta general que contiene a las dos salitas es:
  // https://drive.google.com/drive/folders/1_lEX7qt2gDJrBpziLCh98_pqAYVbEqYq

  // ---------- Juegos (sobre sismos) ----------
  juegos: [
    {
      titulo: "Medidas de seguridad durante un sismo",
      tipo: "Preguntas y respuestas",
      plataforma: "Wordwall",
      color: "lila",
      ilustracion: "preguntas",
      boton: "¡Jugar!",
      enlace: "https://wordwall.net/resource/97587851/medidas-de-seguridad-durante-un-sismo?wwmethod=link",
    },
    {
      titulo: "La oca sísmica",
      tipo: "Juego de la oca",
      plataforma: "Mobbyt",
      color: "naranja",
      ilustracion: "oca",
      boton: "¡Jugar!",
      enlace: "https://mobbyt.com/videojuego/educativo/play.php?Id=370598",
    },
    {
      titulo: "Mi mochila de emergencia",
      tipo: "Juego de memoria",
      plataforma: "Mobbyt",
      color: "rosa",
      ilustracion: "memoria",
      boton: "¡Jugar!",
      enlace: "https://mobbyt.com/videojuego/educativo/play.php?Id=370597",
    },
    {
      titulo: "Frases de qué hacer ante un sismo",
      tipo: "Completar la frase",
      plataforma: "Wordwall",
      color: "celeste",
      ilustracion: "frases",
      boton: "¡Comenzar!",
      enlace: "https://wordwall.net/es/resource/120931043?wwmethod=link",
    },
    {
      titulo: "Juego de memoria",
      tipo: "Memoria (6 parejas)",
      plataforma: "Mobbyt",
      color: "menta",
      ilustracion: "memoria",
      boton: "¡Jugar!",
      enlace: "https://mobbyt.com/videojuego/educativo/?Id=389382",
    },
    {
      titulo: "Mi cómic sismo",
      tipo: "Cómic",
      plataforma: "Mobbyt",
      color: "amarillo",
      ilustracion: "comic",
      boton: "¡Jugar!",
      enlace: "https://mobbyt.com/videojuego/educativo/play.php?Id=389395",
    },
  ],

  // ---------- Canciones (videos de YouTube) ----------
  // Pegá el enlace del video en `youtube`. Se reproduce dentro de la
  // página al tocar "¡Escuchar!" y también hay un acceso a YouTube.
  canciones: [
    {
      titulo: "La tierra tiembla, es un temblor",
      descripcion: "Canción con letra",
      color: "amarillo",
      ilustracion: "notas",
      youtube: "https://youtu.be/g_n3uibCq0I?feature=shared",
    },
  ],
};
