/*
 * Ilustraciones originales del sitio, dibujadas en SVG.
 * Todas comparten el mismo trazo (contorno violeta oscuro, rellenos pastel
 * y caritas sonrientes) para que se vean como una misma familia.
 * Al estar dentro del código, no dependen de imágenes externas.
 */
window.Jardin = window.Jardin || {};

(function () {
  const TINTA = "#3d3466";

  // Envoltorio común: trazo redondeado y grosor parejo.
  function svg(viewBox, contenido, clase) {
    return (
      `<svg class="ilustracion ${clase || ""}" viewBox="${viewBox}" aria-hidden="true" focusable="false">` +
      `<g stroke="${TINTA}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">${contenido}</g></svg>`
    );
  }

  // Carita sonriente reutilizable (ojitos, sonrisa y cachetes).
  function cara(cx, cy, e) {
    e = e || 1;
    const ox = 7 * e;
    return (
      `<ellipse cx="${cx - 13 * e}" cy="${cy + 5 * e}" rx="${4.5 * e}" ry="${3 * e}" fill="#ff8fab" opacity=".6" stroke="none"/>` +
      `<ellipse cx="${cx + 13 * e}" cy="${cy + 5 * e}" rx="${4.5 * e}" ry="${3 * e}" fill="#ff8fab" opacity=".6" stroke="none"/>` +
      `<circle cx="${cx - ox}" cy="${cy}" r="${3.4 * e}" fill="${TINTA}" stroke="none"/>` +
      `<circle cx="${cx + ox}" cy="${cy}" r="${3.4 * e}" fill="${TINTA}" stroke="none"/>` +
      `<path d="M${cx - 5 * e} ${cy + 6 * e} q${5 * e} ${4.5 * e} ${10 * e} 0" fill="none" stroke-width="${3 * e}"/>`
    );
  }

  // Estrella de cinco puntas.
  function estrella(cx, cy, r, color) {
    const puntos = [];
    for (let i = 0; i < 10; i++) {
      const radio = i % 2 === 0 ? r : r * 0.48;
      const ang = -Math.PI / 2 + (i * Math.PI) / 5;
      puntos.push(`${(cx + radio * Math.cos(ang)).toFixed(1)},${(cy + radio * Math.sin(ang)).toFixed(1)}`);
    }
    return `<polygon points="${puntos.join(" ")}" fill="${color}" stroke-width="3"/>`;
  }

  const brillo = (x, y, h) => `<rect x="${x}" y="${y}" width="6" height="${h}" rx="3" fill="#fff" stroke="none" opacity=".85"/>`;

  /* ---------------- Elementos de la mochila (viewBox 120x120) ---------------- */

  const elementos = {
    agua: svg(
      "0 0 120 120",
      `<rect x="47" y="8" width="26" height="14" rx="5" fill="#7cc8f8"/>
       <path d="M50 22h20v8c0 4 16 8 16 22v48a14 14 0 0 1-14 14H48a14 14 0 0 1-14-14V52c0-14 16-18 16-22z" fill="#e8f7ff"/>
       <path d="M36 70c8-5 16 5 24 0s16-5 24 0v30a12 12 0 0 1-12 12H48a12 12 0 0 1-12-12z" fill="#8ed2fb" stroke="none"/>
       <path d="M50 22h20v8c0 4 16 8 16 22v48a14 14 0 0 1-14 14H48a14 14 0 0 1-14-14V52c0-14 16-18 16-22z" fill="none"/>
       ${brillo(42, 50, 16)}
       ${cara(60, 88, 1)}`
    ),

    linterna: svg(
      "0 0 120 120",
      `<g transform="rotate(-25 60 60)">
         <path d="M88 50L114 38V82L88 70z" fill="#fff3a6" stroke="none" opacity=".95"/>
         <rect x="14" y="48" width="52" height="24" rx="10" fill="#ffd95e"/>
         <path d="M62 42h18a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6H62z" fill="#ffb36b"/>
         <rect x="84" y="46" width="6" height="28" rx="3" fill="#fffbe0"/>
         <rect x="44" y="42" width="12" height="8" rx="3" fill="#ff8fab"/>
         ${cara(32, 58, 0.85)}
       </g>`
    ),

    botiquin: svg(
      "0 0 120 120",
      `<path d="M44 36v-8a8 8 0 0 1 8-8h16a8 8 0 0 1 8 8v8" fill="none" stroke-width="6"/>
       <rect x="14" y="34" width="92" height="70" rx="16" fill="#ff9fb2"/>
       <path d="M55 42h10v9h9v10h-9v9H55v-9h-9V51h9z" fill="#fff"/>
       ${brillo(22, 44, 18)}
       ${cara(60, 84, 1)}`
    ),

    silbato: svg(
      "0 0 120 120",
      `<path d="M30 44c-16-10-24 8-14 18" fill="none" stroke="#ff8fab" stroke-width="5"/>
       <circle cx="32" cy="46" r="6" fill="#fff"/>
       <path d="M52 42H104a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H78.8A28 28 0 1 1 52 42z" fill="#ffb36b"/>
       <rect x="80" y="46" width="14" height="8" rx="3" fill="${TINTA}" stroke="none"/>
       ${cara(52, 70, 1)}`
    ),

    radio: svg(
      "0 0 120 120",
      `<path d="M86 40L100 14" fill="none"/>
       <circle cx="101" cy="12" r="5" fill="#ff8fab"/>
       <rect x="12" y="38" width="96" height="66" rx="16" fill="#cbb8ff"/>
       <circle cx="40" cy="71" r="20" fill="#fff"/>
       <rect x="66" y="52" width="32" height="14" rx="5" fill="#fff8d6"/>
       <path d="M74 52v14M84 52v8" stroke-width="3"/>
       <circle cx="73" cy="85" r="6" fill="#ffd95e"/>
       <circle cx="91" cy="85" r="6" fill="#8be0c4"/>
       ${cara(40, 68, 0.85)}`
    ),

    alimentos: svg(
      "0 0 120 120",
      `<rect x="58" y="24" width="48" height="80" rx="8" fill="#ffd95e"/>
       <circle cx="82" cy="50" r="14" fill="#e8b87a"/>
       <circle cx="77" cy="46" r="2.4" fill="${TINTA}" stroke="none"/>
       <circle cx="87" cy="52" r="2.4" fill="${TINTA}" stroke="none"/>
       <circle cx="80" cy="56" r="2.4" fill="${TINTA}" stroke="none"/>
       <path d="M66 80h32M66 90h22" stroke-width="3"/>
       <path d="M16 50v52a22 7 0 0 0 44 0V50" fill="#8be0c4"/>
       <rect x="17" y="64" width="42" height="24" fill="#fff" stroke="none"/>
       <path d="M16 64h44M16 88h44" stroke-width="3"/>
       <ellipse cx="38" cy="50" rx="22" ry="7" fill="#e6fff6"/>
       ${cara(38, 73, 0.9)}`
    ),

    documentos: svg(
      "0 0 120 120",
      `<rect x="12" y="22" width="96" height="86" rx="12" fill="#eaf7ff"/>
       <rect x="26" y="42" width="48" height="56" rx="5" fill="#fff"/>
       <path d="M34 80h24M34 89h16" stroke-width="3"/>
       <rect x="56" y="62" width="42" height="30" rx="6" fill="#ffd1dc"/>
       <circle cx="68" cy="75" r="6" fill="#fff" stroke-width="3"/>
       <path d="M80 72h12M80 81h8" stroke-width="3"/>
       <path d="M12 34h96" stroke-dasharray="4 5" stroke-width="3"/>
       <rect x="90" y="27" width="11" height="14" rx="3" fill="#ff8fab"/>
       ${brillo(18, 46, 26)}
       ${cara(50, 58, 0.8)}`
    ),

    telefonos: svg(
      "0 0 120 120",
      `<rect x="24" y="12" width="74" height="96" rx="12" fill="#ffc8a8"/>
       <rect x="36" y="22" width="54" height="76" rx="7" fill="#fff"/>
       <circle cx="24" cy="30" r="4.5" fill="#fff"/>
       <circle cx="24" cy="50" r="4.5" fill="#fff"/>
       <circle cx="24" cy="70" r="4.5" fill="#fff"/>
       <circle cx="24" cy="90" r="4.5" fill="#fff"/>
       <circle cx="63" cy="45" r="15" fill="#8be0c4"/>
       <path d="M56 38c2-2 4-1 5 1l1.5 3c.6 1.4 0 2.6-1.2 3.3 1 2.6 3 4.6 5.5 5.7.8-1.2 2-1.7 3.4-1.1l3 1.5c2 1 2.3 3 .6 4.6-2.8 2.7-7.8 1.8-12.6-3S53.6 41 56 38z" fill="#fff" stroke-width="2.5"/>
       ${cara(63, 74, 0.9)}
       <path d="M48 92h30" stroke-width="3"/>`
    ),

    manta: svg(
      "0 0 120 120",
      `<rect x="14" y="78" width="92" height="26" rx="13" fill="#cbb8ff"/>
       <path d="M24 91h72" stroke-dasharray="5 6" stroke-width="3"/>
       <rect x="19" y="54" width="82" height="26" rx="13" fill="#8be0c4"/>
       <path d="M30 67h60" stroke-dasharray="5 6" stroke-width="3"/>
       <rect x="24" y="28" width="72" height="28" rx="14" fill="#ff9fb2"/>
       ${cara(60, 38, 0.85)}`
    ),

    higiene: svg(
      "0 0 120 120",
      `<g transform="rotate(18 90 60)">
         <rect x="84" y="36" width="12" height="72" rx="6" fill="#ff9fb2"/>
         <rect x="81" y="12" width="18" height="26" rx="5" fill="#fff"/>
         <path d="M86 16v18M90 16v18M94 16v18" stroke-width="2.5"/>
       </g>
       <circle cx="30" cy="48" r="8" fill="#fff" stroke-width="3"/>
       <circle cx="47" cy="38" r="5.5" fill="#fff" stroke-width="3"/>
       <circle cx="58" cy="52" r="4" fill="#fff" stroke-width="3"/>
       <rect x="12" y="62" width="64" height="42" rx="17" fill="#bfe8ff"/>
       ${brillo(20, 70, 14)}
       ${cara(44, 80, 0.95)}`
    ),
  };

  /* ---------------- La mochila protagonista ---------------- */

  const mochila = svg(
    "0 0 300 340",
    `<path d="M120 52a30 30 0 0 1 60 0" fill="none" stroke-width="12"/>
     <path d="M120 52a30 30 0 0 1 60 0" fill="none" stroke="#ffd95e" stroke-width="5"/>
     <rect x="34" y="196" width="34" height="84" rx="15" fill="#ff8577"/>
     <rect x="232" y="196" width="34" height="84" rx="15" fill="#ff8577"/>
     <path d="M60 128C60 78 100 50 150 50s90 28 90 78v160a32 32 0 0 1-32 32H92a32 32 0 0 1-32-32z" fill="#ff9a8b"/>
     <path d="M70 136c2-46 36-70 80-70s78 24 80 70c-26 10-54 14-80 14s-54-4-80-14z" fill="#ff8577"/>
     <path d="M90 92c10-10 24-16 38-18" fill="none" stroke="#fff" stroke-width="6" opacity=".7"/>
     <rect x="136" y="128" width="28" height="30" rx="8" fill="#ffd95e"/>
     <rect x="145" y="137" width="10" height="12" rx="3" fill="#ff8577" stroke-width="3"/>
     <rect x="88" y="222" width="124" height="84" rx="26" fill="#ffb4a8"/>
     <path d="M100 242h100" stroke-dasharray="6 6" stroke-width="3"/>
     <path d="M184 242v14" stroke-width="3"/>
     <circle cx="184" cy="260" r="5" fill="#ffd95e" stroke-width="3"/>
     ${estrella(150, 276, 17, "#ffd95e")}
     <g class="mochila-cachetes">
       <ellipse cx="98" cy="202" rx="13" ry="8" fill="#ff6f8f" opacity=".45" stroke="none"/>
       <ellipse cx="202" cy="202" rx="13" ry="8" fill="#ff6f8f" opacity=".45" stroke="none"/>
     </g>
     <g class="mochila-ojos">
       <ellipse cx="116" cy="184" rx="10" ry="12" fill="${TINTA}" stroke="none"/>
       <ellipse cx="184" cy="184" rx="10" ry="12" fill="${TINTA}" stroke="none"/>
       <circle cx="119" cy="179" r="3.6" fill="#fff" stroke="none"/>
       <circle cx="187" cy="179" r="3.6" fill="#fff" stroke="none"/>
     </g>
     <path class="mochila-sonrisa" d="M136 200q14 13 28 0" fill="none" stroke-width="5"/>
     <path class="mochila-boca" d="M134 198q16 0 32 0q-2 20-16 20t-16-20z" fill="${TINTA}" stroke-width="3"/>
     <path class="mochila-boca" d="M142 210q8-5 16 0q-3 6-8 6t-8-6z" fill="#ff8fab" stroke="none"/>`,
    "mochila"
  );

  /* ---------------- Salas ---------------- */

  const salas = {
    animalitos: svg(
      "0 0 200 140",
      `<ellipse cx="126" cy="42" rx="10" ry="28" fill="#fff"/>
       <ellipse cx="154" cy="42" rx="10" ry="28" fill="#fff"/>
       <ellipse cx="126" cy="44" rx="4" ry="17" fill="#ffc2d1" stroke="none"/>
       <ellipse cx="154" cy="44" rx="4" ry="17" fill="#ffc2d1" stroke="none"/>
       <circle cx="140" cy="90" r="32" fill="#fff"/>
       ${cara(140, 92, 1.1)}
       <path d="M38 64L42 28 66 50zM90 64L86 28 62 50z" fill="#ffc89a"/>
       <circle cx="64" cy="84" r="34" fill="#ffc89a"/>
       <path d="M30 88h-14M30 96l-12 4M98 88h14M98 96l12 4" stroke-width="3"/>
       ${cara(64, 86, 1.1)}
       <path d="M102 34c-4-6-12-2-8 4l8 8 8-8c4-6-4-10-8-4z" fill="#ff8fab" stroke-width="3"/>`
    ),

    lapices: svg(
      "0 0 200 140",
      `<rect x="26" y="98" width="112" height="24" rx="7" fill="#b69cff"/>
       <rect x="122" y="103" width="10" height="14" rx="2" fill="#fff" stroke="none"/>
       <rect x="34" y="74" width="98" height="24" rx="7" fill="#6fd6b0"/>
       <rect x="116" y="79" width="10" height="14" rx="2" fill="#fff" stroke="none"/>
       <rect x="30" y="50" width="104" height="24" rx="7" fill="#ff9fb2"/>
       <rect x="118" y="55" width="10" height="14" rx="2" fill="#fff" stroke="none"/>
       ${cara(76, 60, 0.85)}
       <rect x="148" y="42" width="16" height="74" rx="3" fill="#ffd95e"/>
       <path d="M148 42l8-22 8 22z" fill="#ffe0c7"/>
       <path d="M153.5 32l2.5-7 2.5 7z" fill="${TINTA}" stroke="none"/>
       <rect x="148" y="114" width="16" height="12" rx="3" fill="#ff9fb2"/>
       <g transform="rotate(12 180 80)">
         <rect x="172" y="48" width="16" height="70" rx="3" fill="#6ec6ff"/>
         <path d="M172 48l8-20 8 20z" fill="#ffe0c7"/>
         <path d="M177.5 39l2.5-7 2.5 7z" fill="${TINTA}" stroke="none"/>
       </g>
       ${estrella(30, 26, 12, "#ffd95e")}`
    ),

    flores: svg(
      "0 0 200 140",
      `<path d="M100 134V86" fill="none" stroke="#3a9c7a" stroke-width="6"/>
       <path d="M100 114c-10-14-26-12-30-6 10 8 22 10 30 6zM100 106c10-14 26-12 30-6-10 8-22 10-30 6z" fill="#6fd6b0" stroke-width="3"/>
       ${[0, 60, 120, 180, 240, 300]
         .map((g) => {
           const a = (g * Math.PI) / 180;
           return `<circle cx="${(100 + 24 * Math.cos(a)).toFixed(1)}" cy="${(62 + 24 * Math.sin(a)).toFixed(1)}" r="16" fill="#ff9fb2"/>`;
         })
         .join("")}
       <circle cx="100" cy="62" r="20" fill="#ffd95e"/>
       ${cara(100, 61, 0.95)}
       ${estrella(36, 38, 16, "#ffd95e")}
       ${estrella(164, 34, 14, "#b69cff")}
       ${estrella(160, 104, 11, "#6ec6ff")}
       ${estrella(42, 104, 12, "#ffb36b")}`
    ),

    personajes: svg(
      "0 0 200 140",
      `<path d="M28 140v-10a28 22 0 0 1 56 0v10z" fill="#ffb36b"/>
       <path d="M116 140v-10a28 22 0 0 1 56 0v10z" fill="#b69cff"/>
       <circle cx="56" cy="84" r="26" fill="#ffd9c2"/>
       <path d="M30 82a26 26 0 0 1 52 0c-10-8-18-10-26-6-8-4-16-2-26 6z" fill="#8a5a44"/>
       ${cara(56, 88, 0.9)}
       <circle cx="144" cy="84" r="26" fill="#ffe2cf"/>
       <path d="M118 82a26 26 0 0 1 52 0c-12-4-22-10-26-16-4 6-14 12-26 16z" fill="#ffd95e"/>
       <path d="M158 60l10-6v12z" fill="#ff8fab" stroke-width="3"/>
       ${cara(144, 88, 0.9)}
       <circle cx="76" cy="58" r="10" fill="#4a3b36"/>
       <circle cx="124" cy="58" r="10" fill="#4a3b36"/>
       <path d="M72 140v-12a28 22 0 0 1 56 0v12z" fill="#6ec6ff"/>
       <circle cx="100" cy="76" r="28" fill="#f0c09e"/>
       <path d="M72 74a28 28 0 0 1 56 0c-14-8-42-8-56 0z" fill="#4a3b36"/>
       ${cara(100, 80, 0.95)}`
    ),
  };

  /* ---------------- Juegos y recursos ---------------- */

  const juegos = {
    preguntas: svg(
      "0 0 200 140",
      `<path d="M24 26a14 14 0 0 1 14-14h70a14 14 0 0 1 14 14v40a14 14 0 0 1-14 14H58l-18 16v-16h-2a14 14 0 0 1-14-14z" fill="#fff"/>
       <text x="73" y="66" text-anchor="middle" font-family="'Baloo 2', sans-serif" font-weight="800" font-size="52" fill="#b69cff" stroke="none">?</text>
       <path d="M92 70a14 14 0 0 1 14-14h66a14 14 0 0 1 14 14v34a14 14 0 0 1-14 14h-6v14l-16-14h-44a14 14 0 0 1-14-14z" fill="#6fd6b0"/>
       <path d="M122 88l11 11 21-21" fill="none" stroke-width="7"/>
       ${estrella(176, 26, 11, "#ffd95e")}`
    ),

    oca: svg(
      "0 0 200 140",
      `<path d="M22 112c30 10 50-30 80-24s40 30 72 10" fill="none" stroke="#fff" stroke-width="26"/>
       ${[
         [22, 112, "#ff9fb2"],
         [48, 104, "#ffd95e"],
         [74, 92, "#6fd6b0"],
         [102, 88, "#6ec6ff"],
         [128, 98, "#b69cff"],
         [154, 104, "#ff9fb2"],
         [178, 96, "#ffd95e"],
       ]
         .map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="11" fill="${c}" stroke-width="3"/>`)
         .join("")}
       <g transform="rotate(-10 80 40)">
         <rect x="52" y="12" width="56" height="56" rx="14" fill="#fff"/>
         <circle cx="68" cy="28" r="4.5" fill="#ff8577" stroke="none"/>
         <circle cx="92" cy="52" r="4.5" fill="#ff8577" stroke="none"/>
         <circle cx="68" cy="52" r="4.5" fill="#ff8577" stroke="none"/>
         <circle cx="92" cy="28" r="4.5" fill="#ff8577" stroke="none"/>
       </g>
       <ellipse cx="150" cy="54" rx="24" ry="18" fill="#fff"/>
       <path d="M162 46c4-22 22-24 22-12 0 6-6 8-10 12" fill="#fff"/>
       <path d="M184 34l10 3-10 4z" fill="#ffb36b" stroke-width="3"/>
       <circle cx="178" cy="32" r="2.4" fill="#3d3466" stroke="none"/>
       <path d="M138 54c6 6 14 6 20 0" fill="none" stroke-width="3"/>`
    ),

    memoria: svg(
      "0 0 200 140",
      `<g transform="rotate(-10 52 72)">
         <rect x="24" y="28" width="56" height="78" rx="12" fill="#b69cff"/>
         <text x="52" y="82" text-anchor="middle" font-family="'Baloo 2', sans-serif" font-weight="800" font-size="40" fill="#fff" stroke="none">?</text>
       </g>
       <g transform="rotate(10 148 72)">
         <rect x="120" y="28" width="56" height="78" rx="12" fill="#ff9fb2"/>
         <text x="148" y="82" text-anchor="middle" font-family="'Baloo 2', sans-serif" font-weight="800" font-size="40" fill="#fff" stroke="none">?</text>
       </g>
       <rect x="70" y="20" width="60" height="86" rx="12" fill="#fff"/>
       <path d="M86 58c0-14 6-22 14-22s14 8 14 22v32a6 6 0 0 1-6 6H92a6 6 0 0 1-6-6z" fill="#ff9a8b" stroke-width="3"/>
       <path d="M94 36a6 6 0 0 1 12 0" fill="none" stroke-width="3"/>
       <circle cx="95" cy="64" r="2.5" fill="#3d3466" stroke="none"/>
       <circle cx="105" cy="64" r="2.5" fill="#3d3466" stroke="none"/>
       <path d="M96 70q4 4 8 0" fill="none" stroke-width="2.5"/>
       <rect x="92" y="78" width="16" height="12" rx="4" fill="#ffb4a8" stroke-width="2.5"/>
       ${estrella(100, 124, 10, "#ffd95e")}`
    ),

    frases: svg(
      "0 0 200 140",
      `<rect x="18" y="20" width="164" height="62" rx="16" fill="#fff"/>
       <path d="M34 42h40" stroke-width="5"/>
       <rect x="82" y="32" width="46" height="20" rx="6" fill="#fff" stroke-dasharray="5 5" stroke-width="3"/>
       <path d="M136 42h30M34 64h70" stroke-width="5"/>
       <rect x="112" y="54" width="46" height="20" rx="6" fill="#fff" stroke-dasharray="5 5" stroke-width="3"/>
       <g transform="rotate(-8 60 108)">
         <rect x="34" y="96" width="54" height="24" rx="8" fill="#ffd95e"/>
         <path d="M46 108h30" stroke-width="4"/>
       </g>
       <g transform="rotate(6 136 110)">
         <rect x="108" y="98" width="56" height="24" rx="8" fill="#6fd6b0"/>
         <path d="M120 110h32" stroke-width="4"/>
       </g>
       <path d="M86 104l10 10-2-14z" fill="#fff" stroke-width="3"/>`
    ),

    carpeta: svg(
      "0 0 200 140",
      `<path d="M30 40a10 10 0 0 1 10-10h40l12 12h68a10 10 0 0 1 10 10v8H30z" fill="#ffc94a"/>
       <rect x="54" y="20" width="64" height="58" rx="6" fill="#fff" transform="rotate(-8 86 49)"/>
       <rect x="84" y="24" width="64" height="58" rx="6" fill="#e8f7ff" transform="rotate(6 116 53)"/>
       <path d="M24 60a10 10 0 0 1 10-10h132a10 10 0 0 1 10 10l-6 58a10 10 0 0 1-10 9H40a10 10 0 0 1-10-9z" fill="#ffd95e"/>
       ${cara(100, 90, 1.15)}
       ${estrella(172, 26, 11, "#ff9fb2")}`
    ),

    notas: svg(
      "0 0 120 120",
      `<path d="M48 84V30l50-12v54" fill="none" stroke-width="5"/>
       <path d="M48 30l50-12v14L48 44z" fill="${TINTA}"/>
       <ellipse cx="36" cy="86" rx="16" ry="12" fill="#ffd95e" transform="rotate(-18 36 86)"/>
       <ellipse cx="86" cy="74" rx="16" ry="12" fill="#ff9fb2" transform="rotate(-18 86 74)"/>
       ${cara(36, 85, 0.6)}
       ${cara(86, 73, 0.6)}
       ${estrella(18, 26, 9, "#6ec6ff")}
       ${estrella(106, 100, 8, "#b69cff")}`
    ),
  };

  /* ---------------- Botones de la mochila interactiva ---------------- */

  const botones = {
    escudo: svg(
      "0 0 120 120",
      `<path d="M60 10l40 14v32c0 28-18 46-40 54-22-8-40-26-40-54V24z" fill="#ff9fb2"/>
       <path d="M60 22l28 10v24c0 20-12 34-28 40" fill="none" stroke="#fff" stroke-width="5" opacity=".8"/>
       <path d="M60 44c-5-9-18-6-18 3 0 8 9 13 18 20 9-7 18-12 18-20 0-9-13-12-18-3z" fill="#fff" stroke-width="3.5"/>
       ${cara(60, 80, 0.8)}`
    ),
    dado: svg(
      "0 0 120 120",
      `<g transform="rotate(12 84 50)">
         <rect x="62" y="20" width="46" height="46" rx="12" fill="#b69cff"/>
         <circle cx="74" cy="32" r="4" fill="#fff" stroke="none"/>
         <circle cx="96" cy="54" r="4" fill="#fff" stroke="none"/>
         <circle cx="85" cy="43" r="4" fill="#fff" stroke="none"/>
       </g>
       <g transform="rotate(-10 46 74)">
         <rect x="16" y="44" width="60" height="60" rx="15" fill="#fff"/>
         <circle cx="30" cy="58" r="4.5" fill="#ff8577" stroke="none"/>
         <circle cx="62" cy="58" r="4.5" fill="#ff8577" stroke="none"/>
         <circle cx="30" cy="90" r="4.5" fill="#ff8577" stroke="none"/>
         <circle cx="62" cy="90" r="4.5" fill="#ff8577" stroke="none"/>
         ${cara(46, 72, 0.85)}
       </g>`
    ),
    casita: svg(
      "0 0 120 120",
      `<rect x="24" y="52" width="66" height="54" rx="8" fill="#8be0c4"/>
       <path d="M14 58L57 20l43 38" fill="#ff9fb2"/>
       <path d="M14 58L57 20l43 38" fill="none" stroke-width="6"/>
       <rect x="62" y="74" width="18" height="32" rx="4" fill="#fff"/>
       ${cara(42, 76, 0.85)}
       <g transform="rotate(28 102 74)">
         <rect x="96" y="50" width="12" height="44" rx="2" fill="#ffd95e"/>
         <path d="M96 94l6 12 6-12z" fill="#ffe0c7"/>
         <rect x="96" y="44" width="12" height="7" rx="2" fill="#ff9fb2"/>
       </g>`
    ),
  };

  /* ---------------- Pequeños íconos y decoraciones ---------------- */

  const iconos = {
    sol: svg(
      "0 0 100 100",
      `${[0, 45, 90, 135, 180, 225, 270, 315]
        .map((g) => `<path d="M50 14v-8" transform="rotate(${g} 50 50)" stroke="#ffb36b" stroke-width="7"/>`)
        .join("")}
       <circle cx="50" cy="50" r="26" fill="#ffd95e"/>
       ${cara(50, 50, 1.05)}`,
      "icono-sol"
    ),
    casa: svg(
      "0 0 48 48",
      `<path d="M8 22L24 9l16 13v16a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3z" fill="#ffd6e0" stroke-width="3.5"/>
       <path d="M19 41V30h10v11" fill="#fff" stroke-width="3.5"/>`
    ),
    mochilita: svg(
      "0 0 48 48",
      `<path d="M19 9a5 5 0 0 1 10 0" fill="none" stroke-width="3.5"/>
       <path d="M10 20c0-7 6-11 14-11s14 4 14 11v18a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4z" fill="#ff9a8b" stroke-width="3.5"/>
       <rect x="16" y="28" width="16" height="10" rx="4" fill="#ffb4a8" stroke-width="3"/>`
    ),
    lapiz: svg(
      "0 0 48 48",
      `<g transform="rotate(40 24 24)">
         <rect x="18" y="10" width="12" height="28" rx="2" fill="#ffd95e" stroke-width="3.5"/>
         <path d="M18 38l6 8 6-8z" fill="#ffe0c7" stroke-width="3.5"/>
         <rect x="18" y="4" width="12" height="7" rx="2" fill="#ff9fb2" stroke-width="3.5"/>
       </g>`
    ),
    parlante: svg(
      "0 0 24 24",
      `<path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" stroke="currentColor" stroke-width="2"/>
       <path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" fill="none" stroke="currentColor" stroke-width="2.4"/>`,
      "icono-parlante"
    ),
    parlanteMudo: svg(
      "0 0 24 24",
      `<path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" stroke="currentColor" stroke-width="2"/>
       <path d="M16 9l5 6M21 9l-5 6" fill="none" stroke="currentColor" stroke-width="2.4"/>`,
      "icono-parlante"
    ),
    tilde: svg(
      "0 0 24 24",
      `<path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3.2"/>`,
      "icono-tilde"
    ),
    volver: svg(
      "0 0 24 24",
      `<path d="M14 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="3"/>`,
      "icono-volver"
    ),
    play: svg(
      "0 0 24 24",
      `<path d="M8 5.5v13l10.5-6.5z" fill="currentColor" stroke="currentColor" stroke-width="2"/>`,
      "icono-play"
    ),
    externo: svg(
      "0 0 24 24",
      `<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" fill="none" stroke="currentColor" stroke-width="2.5"/>`,
      "icono-externo"
    ),
    reloj: svg(
      "0 0 24 24",
      `<circle cx="12" cy="12" r="9" fill="#fff" stroke="currentColor" stroke-width="2.5"/>
       <path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="2.5"/>`,
      "icono-reloj"
    ),
    otraVez: svg(
      "0 0 24 24",
      `<path d="M4 12a8 8 0 1 0 2.5-5.8M4 4v5h5" fill="none" stroke="currentColor" stroke-width="2.6"/>`,
      "icono-otra-vez"
    ),
    estrellaLlena: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" class="estrellita estrellita--llena"><path d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z" fill="#ffd95e" stroke="${TINTA}" stroke-width="2" stroke-linejoin="round"/></svg>`,
    estrellaVacia: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" class="estrellita estrellita--vacia"><path d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z" fill="#fff" stroke="${TINTA}" stroke-width="2" stroke-linejoin="round" stroke-dasharray="3 2.4"/></svg>`,
    nube: `<svg viewBox="0 0 200 100" aria-hidden="true" focusable="false" class="nube-svg"><path d="M40 90a30 30 0 0 1-2-60 38 38 0 0 1 70-14 30 30 0 0 1 50 18 28 28 0 0 1 4 56z" fill="#fff"/></svg>`,
  };

  /* ---------------- Escenas de los pasos ante un sismo (viewBox 160x120) ---------------- */

  const PIEL = "#ffd9c2";
  // Cabeza con pelo y carita.
  const cabeza = (cx, cy, r, pelo) =>
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${PIEL}"/>` +
    `<path d="M${cx - r} ${cy - 1}a${r} ${r} 0 0 1 ${2 * r} 0q${-r} ${-r * 0.75} ${-2 * r} 0z" fill="${pelo}"/>` +
    cara(cx, cy + r * 0.2, r / 19);
  const mano = (x, y) => `<circle cx="${x}" cy="${y}" r="5" fill="${PIEL}" stroke-width="3"/>`;
  const piso = `<path d="M8 108h144" stroke-width="3" opacity=".3"/>`;
  const flecha = (d, color) => `<path d="${d}" fill="none" stroke="${color}" stroke-width="5"/>`;
  const mesa = (x1, x2) =>
    `<rect x="${x1 + 6}" y="44" width="9" height="64" rx="3" fill="#d9a066"/>` +
    `<rect x="${x2 - 15}" y="44" width="9" height="64" rx="3" fill="#d9a066"/>` +
    `<rect x="${x1}" y="34" width="${x2 - x1}" height="12" rx="4" fill="#e8b87a"/>`;

  const pasos = {
    pasoAgacharse: svg(
      "0 0 160 120",
      `${piso}
       <path d="M54 106c0-22 12-30 26-30s26 8 26 30z" fill="#ff9fb2"/>
       ${cabeza(80, 60, 18, "#8a5a44")}
       ${mano(64, 46)}${mano(96, 46)}
       ${flecha("M134 30v40M124 60l10 10 10-10", "#ff8577")}`
    ),
    pasoCubrirse: svg(
      "0 0 160 120",
      `${piso}
       ${mesa(18, 142)}
       <path d="M56 106c0-18 10-24 24-24s24 6 24 24z" fill="#6ec6ff"/>
       ${cabeza(80, 70, 15, "#4a3b36")}
       ${mano(68, 58)}${mano(92, 58)}`
    ),
    pasoSujetarse: svg(
      "0 0 160 120",
      `${piso}
       ${mesa(54, 150)}
       <path d="M16 106c0-20 10-26 22-26s22 6 22 26z" fill="#ffd95e"/>
       ${cabeza(38, 66, 15, "#8a5a44")}
       <path d="M50 92l12-8M50 100l12 0" fill="none" stroke-width="4"/>
       ${mano(64, 84)}${mano(64, 100)}`
    ),
    pasoVentana: svg(
      "0 0 160 120",
      `${piso}
       <rect x="12" y="18" width="50" height="62" rx="5" fill="#bfe8ff"/>
       <path d="M37 18v62M12 49h50" stroke-width="3"/>
       ${brillo(18, 24, 18)}
       <rect x="98" y="78" width="32" height="28" rx="12" fill="#6fd6b0"/>
       ${cabeza(114, 62, 16, "#4a3b36")}
       ${flecha("M68 94h22M82 86l8 8-8 8", "#3fb48a")}`
    ),
    pasoCalma: svg(
      "0 0 160 120",
      `${piso}
       <path d="M44 106c0-22 12-30 26-30s26 8 26 30z" fill="#b69cff"/>
       ${cabeza(70, 60, 18, "#8a5a44")}
       ${mano(64, 92)}${mano(76, 92)}
       <path d="M104 22a10 10 0 0 1 10-10h28a10 10 0 0 1 10 10v16a10 10 0 0 1-10 10h-16l-10 9v-9h-2a10 10 0 0 1-10-10z" fill="#fff"/>
       <path d="M128 25c-3-6-12-4-12 2 0 5 6 8 12 13 6-5 12-8 12-13 0-6-9-8-12-2z" fill="#ff8fab" stroke-width="2.5"/>`
    ),
    pasoSalir: svg(
      "0 0 160 120",
      `${piso}
       <rect x="114" y="16" width="38" height="92" rx="4" fill="#ffc8a8"/>
       <circle cx="144" cy="64" r="3" fill="${TINTA}" stroke="none"/>
       <path d="M34 100l-3 8M46 100l4 8M72 100l-3 8M84 100l4 8" stroke-width="4"/>
       <rect x="28" y="70" width="24" height="32" rx="10" fill="#6ec6ff"/>
       ${cabeza(40, 57, 13, "#8a5a44")}
       <rect x="66" y="70" width="24" height="32" rx="10" fill="#ff9fb2"/>
       ${cabeza(78, 57, 13, "#e0a63a")}
       ${flecha("M90 30h16M100 24l6 6-6 6", "#3fb48a")}`
    ),
    pasoEncuentro: svg(
      "0 0 160 120",
      `${piso}
       <path d="M132 108V52" stroke-width="5"/>
       <rect x="110" y="14" width="44" height="40" rx="6" fill="#6fd6b0"/>
       <circle cx="124" cy="28" r="4" fill="#fff" stroke="none"/>
       <circle cx="132" cy="25" r="4" fill="#fff" stroke="none"/>
       <circle cx="140" cy="28" r="4" fill="#fff" stroke="none"/>
       <path d="M117 46c0-7 3-11 7-11s7 4 7 11zM125 44c0-8 3-12 7-12s7 4 7 12zM133 46c0-7 3-11 7-11s7 4 7 11z" fill="#fff" stroke="none"/>
       <path d="M46 96l-2 12M58 96l2 12M80 100l-2 8M90 100l2 8" stroke-width="4"/>
       <rect x="38" y="46" width="28" height="52" rx="10" fill="#b69cff"/>
       ${cabeza(52, 33, 13, "#4a3b36")}
       <rect x="74" y="76" width="22" height="26" rx="9" fill="#ffd95e"/>
       ${cabeza(85, 64, 12, "#8a5a44")}
       <path d="M66 70l7 10" stroke-width="4"/>
       ${mano(72, 80)}`
    ),
    pasoAscensor: svg(
      "0 0 160 120",
      `<rect x="30" y="12" width="80" height="96" rx="6" fill="#e3e0f0"/>
       <rect x="40" y="22" width="60" height="86" fill="#f4f2fa" stroke-width="3"/>
       <path d="M70 22v86" stroke-width="3"/>
       <rect x="118" y="46" width="16" height="30" rx="5" fill="#fff"/>
       <path d="M126 51l-4 6h8zM126 71l-4-6h8z" fill="${TINTA}" stroke="none"/>
       <circle cx="106" cy="26" r="18" fill="#ff8577"/>
       <path d="M98 18l16 16M114 18l-16 16" stroke="#fff" stroke-width="5"/>`
    ),
    pasoMochila: svg(
      "0 0 160 120",
      `${piso}
       <path d="M86 72c0-10 8-16 18-16s18 6 18 16v30a6 6 0 0 1-6 6H92a6 6 0 0 1-6-6z" fill="#ff9a8b"/>
       <path d="M98 56a6 6 0 0 1 12 0" fill="none"/>
       <rect x="94" y="86" width="20" height="14" rx="5" fill="#ffb4a8" stroke-width="3"/>
       ${cara(104, 72, 0.55)}
       <path d="M50 100l-2 8M62 100l2 8" stroke-width="4"/>
       <rect x="42" y="72" width="30" height="30" rx="12" fill="#6ec6ff"/>
       ${cabeza(57, 57, 15, "#8a5a44")}
       <path d="M72 84l10 4" stroke-width="4"/>
       ${mano(84, 88)}`
    ),
    pasoTelefono: svg(
      "0 0 160 120",
      `<rect x="56" y="8" width="48" height="102" rx="10" fill="#fff"/>
       <rect x="62" y="20" width="36" height="70" rx="4" fill="#d6efff" stroke-width="3"/>
       <text x="80" y="62" text-anchor="middle" font-family="'Baloo 2', sans-serif" font-weight="800" font-size="21" fill="${TINTA}" stroke="none">911</text>
       <circle cx="80" cy="99" r="5" fill="#6fd6b0" stroke-width="3"/>
       <path d="M112 38c6 6 6 16 0 22M120 32c9 9 9 25 0 34M48 38c-6 6-6 16 0 22M40 32c-9 9-9 25 0 34" fill="none" stroke-width="3"/>`
    ),
  };

  Jardin.ilustraciones = Object.assign({}, elementos, salas, juegos, botones, pasos, iconos, { mochila });

  // Devuelve el dibujo pedido o, si el nombre no existe, una estrella.
  Jardin.dibujo = function (nombre) {
    return Jardin.ilustraciones[nombre] || svg("0 0 120 120", estrella(60, 60, 44, "#ffd95e"));
  };
})();
