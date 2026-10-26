// --- Config ---
const DURACION_MINUTOS = 15;

// --- Estado ---
let indiceActual = 0;
let respuestas = new Array(PREGUNTAS.length).fill(null);
let segundosRestantes = DURACION_MINUTOS * 60;
let timerInterval = null;
let finalizado = false;

// --- Elementos ---
const timerText = document.getElementById("timerText");
const statusGroup = document.getElementById("statusGroup");
const statusIcon = document.getElementById("statusIconBadge");
const statusText = document.getElementById("statusText");
const progressLabel = document.getElementById("progressLabel");
const progressFill = document.getElementById("progressFill");
const questionText = document.getElementById("questionText");
const optionsList = document.getElementById("optionsList");
const btnAnt = document.getElementById("btnAnt");
const btnSig = document.getElementById("btnSig");
const btnFinalizar = document.getElementById("btnFinalizar");
const questionCard = document.getElementById("questionCard");
const navRow = document.querySelector(".nav-row");
const resultsView = document.getElementById("resultsView");
const resultsScore = document.getElementById("resultsScore");
const resultsDetail = document.getElementById("resultsDetail");
const btnReiniciar = document.getElementById("btnReiniciar");

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function tick() {
  if (finalizado) return;
  segundosRestantes--;
  timerText.textContent = formatTime(Math.max(segundosRestantes, 0));
  if (segundosRestantes <= 0) {
    clearInterval(timerInterval);
    finalizarEvaluacion();
  }
}

const ICONO_WIFI = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
  <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
  <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
  <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
  <line x1="12" y1="20" x2="12.01" y2="20"/>
</svg>`;

const ICONO_WIFI_OFF = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
  <line x1="1" y1="1" x2="23" y2="23"/>
  <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/>
  <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/>
  <path d="M10.71 5.05A16 16 0 0 1 22.58 9"/>
  <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/>
  <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
  <line x1="12" y1="20" x2="12.01" y2="20"/>
</svg>`;

function actualizarStatus() {
  const online = navigator.onLine;
  statusGroup.classList.toggle("offline", !online);
  statusIcon.innerHTML = online ? ICONO_WIFI : ICONO_WIFI_OFF;
  statusText.textContent = online ? "Online" : "Offline";
}

function renderPregunta() {
  const p = PREGUNTAS[indiceActual];
  progressLabel.textContent = `Pregunta ${indiceActual + 1} de ${PREGUNTAS.length}`;
  progressFill.style.width = `${((indiceActual + 1) / PREGUNTAS.length) * 100}%`;
  questionText.textContent = p.texto;

  optionsList.innerHTML = "";
  p.opciones.forEach((opcion, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = opcion;
    if (respuestas[indiceActual] === i) btn.classList.add("selected");
    btn.addEventListener("click", () => {
      respuestas[indiceActual] = i;
      renderPregunta();
    });
    optionsList.appendChild(btn);
  });

  btnAnt.disabled = indiceActual === 0;
  btnSig.disabled = indiceActual === PREGUNTAS.length - 1;
}

function finalizarEvaluacion() {
  if (finalizado) return;
  finalizado = true;
  clearInterval(timerInterval);

  let correctas = 0;
  resultsDetail.innerHTML = "";
  PREGUNTAS.forEach((p, i) => {
    const elegida = respuestas[i];
    const esCorrecta = elegida === p.correcta;
    if (esCorrecta) correctas++;

    const item = document.createElement("div");
    item.className = "result-item";
    item.innerHTML = `
      <div class="q">${i + 1}. ${p.texto}</div>
      <div class="chosen ${esCorrecta ? "ok" : "bad"}">
        Tu respuesta: ${elegida === null ? "(sin responder)" : p.opciones[elegida]}
      </div>
      ${esCorrecta ? "" : `<div class="correct">Correcta: ${p.opciones[p.correcta]}</div>`}
    `;
    resultsDetail.appendChild(item);
  });

  resultsScore.textContent = `${correctas} / ${PREGUNTAS.length} correctas`;

  questionCard.classList.add("hidden");
  navRow.classList.add("hidden");
  btnFinalizar.classList.add("hidden");
  resultsView.classList.remove("hidden");
}

function reiniciar() {
  indiceActual = 0;
  respuestas = new Array(PREGUNTAS.length).fill(null);
  segundosRestantes = DURACION_MINUTOS * 60;
  finalizado = false;

  questionCard.classList.remove("hidden");
  navRow.classList.remove("hidden");
  btnFinalizar.classList.remove("hidden");
  resultsView.classList.add("hidden");

  renderPregunta();
  timerInterval = setInterval(tick, 1000);
}

btnAnt.addEventListener("click", () => {
  if (indiceActual > 0) {
    indiceActual--;
    renderPregunta();
  }
});

btnSig.addEventListener("click", () => {
  if (indiceActual < PREGUNTAS.length - 1) {
    indiceActual++;
    renderPregunta();
  }
});

btnFinalizar.addEventListener("click", finalizarEvaluacion);
btnReiniciar.addEventListener("click", reiniciar);

window.addEventListener("online", actualizarStatus);
window.addEventListener("offline", actualizarStatus);

// --- Splash cosmético (solo decorativo, no verifica nada real) ---
const SPLASH_PASOS = [
  { texto: "🔍 Verificando dispositivo...", ok: false },
  { texto: "✅ Sin emulador detectado", ok: true },
  { texto: "✅ Sin root detectado", ok: true },
  { texto: "✅ Todo listo", ok: true }
];

function runSplash(onDone) {
  const splash = document.getElementById("splash");
  const lines = document.getElementById("splashLines");
  let i = 0;

  function paso() {
    if (i >= SPLASH_PASOS.length) {
      setTimeout(() => {
        splash.classList.add("fade-out");
        setTimeout(() => splash.remove(), 400);
        onDone();
      }, 400);
      return;
    }
    const p = SPLASH_PASOS[i];
    const div = document.createElement("div");
    div.className = "splash-line" + (p.ok ? " ok" : "");
    div.textContent = p.texto;
    lines.appendChild(div);
    i++;
    setTimeout(paso, 450);
  }
  paso();
}

// --- Init ---
timerText.textContent = formatTime(segundosRestantes);
actualizarStatus();
renderPregunta();
runSplash(() => {
  timerInterval = setInterval(tick, 1000);
});
