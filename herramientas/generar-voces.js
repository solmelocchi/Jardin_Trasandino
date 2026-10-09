/*
 * Genera los audios de la voz de la mochila (voz rioplatense, más aguda
 * para que suene como de nene) a partir de las frases de js/frases.js.
 *
 * Cuándo usarlo: cada vez que se cambie una frase, un elemento de la mochila
 * o un paso de las recomendaciones.
 *
 * Cómo usarlo (necesita Node y el programa edge-tts de Python):
 *   pip install edge-tts
 *   node herramientas/generar-voces.js
 *
 * Si edge-tts no está en el PATH, se puede indicar su ubicación:
 *   EDGE_TTS="C:\ruta\a\edge-tts.exe" node herramientas/generar-voces.js
 *
 * Solo genera las frases nuevas o cambiadas, borra los audios que ya no se
 * usan y actualiza js/datos/audios.js (la lista que usa la página).
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const crypto = require("crypto");
const { execFileSync } = require("child_process");

// Voz elegida: cambiando estos tres valores cambia toda la voz.
const VOZ = "es-UY-ValentinaNeural";
const TONO = "+45Hz"; // más alto = suena más chiquita
const VELOCIDAD = "+8%";

const RAIZ = path.join(__dirname, "..");
const CARPETA = path.join(RAIZ, "audios", "voz");
const EDGE_TTS = process.env.EDGE_TTS || "edge-tts";

// Cargamos los mismos archivos que usa la página para leer las frases.
const contexto = vm.createContext({});
contexto.window = contexto;
["js/datos/elementos-mochila.js", "js/datos/recomendaciones.js", "js/frases.js"].forEach((archivo) =>
  vm.runInContext(fs.readFileSync(path.join(RAIZ, archivo), "utf8"), contexto, { filename: archivo })
);
const frases = contexto.Jardin.frases.todas();

// Nombre de archivo legible + una huella corta (cambia si cambia el texto o la voz).
function nombreArchivo(texto) {
  const legible = texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  const huella = crypto.createHash("md5").update(`${VOZ}|${TONO}|${VELOCIDAD}|${texto}`).digest("hex").slice(0, 6);
  return `${legible}-${huella}.mp3`;
}

fs.mkdirSync(CARPETA, { recursive: true });
const mapa = {};
let nuevos = 0;

frases.forEach((texto) => {
  const archivo = nombreArchivo(texto);
  const destino = path.join(CARPETA, archivo);
  if (!fs.existsSync(destino)) {
    execFileSync(EDGE_TTS, ["--voice", VOZ, `--pitch=${TONO}`, `--rate=${VELOCIDAD}`, "--text", texto, "--write-media", destino], {
      stdio: "inherit",
    });
    nuevos++;
  }
  mapa[texto] = `audios/voz/${archivo}`;
});

// Borrar audios que ya no corresponden a ninguna frase.
const usados = new Set(Object.values(mapa).map((r) => path.basename(r)));
const borrados = fs.readdirSync(CARPETA).filter((f) => f.endsWith(".mp3") && !usados.has(f));
borrados.forEach((f) => fs.unlinkSync(path.join(CARPETA, f)));

fs.writeFileSync(
  path.join(RAIZ, "js", "datos", "audios.js"),
  `/*
 * Archivo generado por herramientas/generar-voces.js: no editar a mano.
 * Relaciona cada frase con su audio (voz ${VOZ}, tono ${TONO}, velocidad ${VELOCIDAD}).
 */
window.Jardin = window.Jardin || {};

Jardin.audios = ${JSON.stringify(mapa, null, 2)};
`
);

console.log(`Listo: ${frases.length} frases, ${nuevos} audios nuevos, ${borrados.length} borrados.`);
