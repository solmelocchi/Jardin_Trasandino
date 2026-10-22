/*
 * Lee los juegos, las canciones y las salitas desde la planilla de Google
 * que manejan las seños (ver `planilla` en js/config.js).
 *
 * Cada pestaña de la planilla es una sección de la página y cada fila es
 * una tarjeta. Si la planilla no responde (sin internet, sin permiso,
 * etc.), la página se queda con lo que está escrito en js/config.js.
 */
window.Jardin = window.Jardin || {};

(function () {
  const COLORES = ["celeste", "amarillo", "rosa", "menta", "lila", "naranja"];
  const DIBUJOS = {
    juegos: ["preguntas", "oca", "memoria", "frases", "comic"],
    canciones: ["notas", "tren"],
    salas: ["animalitos", "lapices", "flores", "personajes"],
  };

  // Convierte un texto CSV en una lista de filas (respeta comillas y saltos de línea).
  function leerCsv(texto) {
    const filas = [];
    let fila = [];
    let campo = "";
    let entreComillas = false;
    for (let i = 0; i < texto.length; i++) {
      const c = texto[i];
      if (entreComillas) {
        if (c === '"' && texto[i + 1] === '"') {
          campo += '"';
          i++;
        } else if (c === '"') entreComillas = false;
        else campo += c;
      } else if (c === '"') entreComillas = true;
      else if (c === ",") {
        fila.push(campo);
        campo = "";
      } else if (c === "\n" || c === "\r") {
        if (c === "\r" && texto[i + 1] === "\n") i++;
        fila.push(campo);
        filas.push(fila);
        fila = [];
        campo = "";
      } else campo += c;
    }
    if (campo || fila.length) {
      fila.push(campo);
      filas.push(fila);
    }
    return filas;
  }

  // "Enlace (YouTube o Drive)" -> "enlace youtube o drive"
  const normalizar = (t) =>
    String(t || "")
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();

  // Devuelve las filas como objetos { "titulo": ..., "enlace": ... } sin filas vacías.
  function comoObjetos(filas) {
    const [cabecera, ...resto] = filas;
    if (!cabecera) return [];
    const claves = cabecera.map(normalizar);
    return resto
      .map((f) => Object.fromEntries(claves.map((k, i) => [k, (f[i] || "").trim()])))
      .filter((o) => Object.values(o).some(Boolean));
  }

  // Busca el valor de la primera columna cuyo título empiece con alguno de los nombres.
  function valor(fila, ...nombres) {
    const clave = Object.keys(fila).find((k) => nombres.some((n) => k.startsWith(n)));
    return clave ? fila[clave] : "";
  }

  const elegir = (texto, lista, i) => (lista.includes(normalizar(texto)) ? normalizar(texto) : lista[i % lista.length]);

  function plataforma(url) {
    try {
      const host = new URL(url).hostname.replace(/^www\./, "");
      if (host.includes("wordwall")) return "Wordwall";
      if (host.includes("mobbyt")) return "Mobbyt";
      return host;
    } catch (e) {
      return "internet";
    }
  }

  async function pestana(id, nombre) {
    const url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&headers=1&sheet=${encodeURIComponent(nombre)}`;
    const control = new AbortController();
    const espera = setTimeout(() => control.abort(), 8000);
    try {
      const r = await fetch(url, { signal: control.signal, cache: "no-store" });
      const texto = await r.text();
      // Sin permiso, Google devuelve una página de inicio de sesión en vez del CSV.
      if (!r.ok || texto.trim().startsWith("<")) return null;
      return comoObjetos(leerCsv(texto));
    } catch (e) {
      return null;
    } finally {
      clearTimeout(espera);
    }
  }

  /*
   * Devuelve { juegos, canciones, salas } con lo que haya en la planilla.
   * Una sección que no se pudo leer queda sin definir (y se usa js/config.js).
   */
  Jardin.cargarPlanilla = async function (config) {
    const id = config.planilla && config.planilla.id;
    if (!id) return null;
    const [juegos, canciones, salas] = await Promise.all([
      pestana(id, "Juegos"),
      pestana(id, "Canciones"),
      pestana(id, "Salitas"),
    ]);
    const datos = {};

    if (juegos) {
      datos.juegos = juegos
        .map((f, i) => ({
          titulo: valor(f, "titulo"),
          tipo: valor(f, "tipo") || "Juego",
          enlace: valor(f, "enlace"),
          plataforma: plataforma(valor(f, "enlace")),
          color: elegir(valor(f, "color"), COLORES, i + 4),
          ilustracion: elegir(valor(f, "dibujo"), DIBUJOS.juegos, i),
          boton: "¡Jugar!",
        }))
        .filter((j) => j.titulo && Jardin.enlaceValido(j.enlace));
    }

    if (canciones) {
      datos.canciones = canciones
        .map((f, i) => {
          const enlace = valor(f, "enlace youtube", "enlace del", "enlace (", "enlace yt", "enlace video") || valor(f, "enlace");
          const esYoutube = /youtu\.?be/i.test(enlace);
          return {
            titulo: valor(f, "titulo"),
            descripcion: valor(f, "descripcion"),
            youtube: esYoutube ? enlace : "",
            drive: esYoutube ? "" : enlace,
            letra: valor(f, "enlace a la letra", "letra"),
            color: elegir(valor(f, "color"), COLORES, i + 1),
            ilustracion: elegir(valor(f, "dibujo"), DIBUJOS.canciones, i),
          };
        })
        .filter((c) => c.titulo && Jardin.enlaceValido(c.youtube || c.drive));
    }

    if (salas) {
      // Una salita sin enlace igual aparece, con el cartel "¡Muy pronto!".
      datos.salas = salas
        .map((f, i) => ({
          nombre: valor(f, "nombre"),
          enlaceDrive: valor(f, "enlace"),
          color: elegir(valor(f, "color"), COLORES, i),
          ilustracion: elegir(valor(f, "dibujo"), DIBUJOS.salas, i),
        }))
        .filter((s) => s.nombre);
    }

    return datos;
  };
})();
