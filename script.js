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

function actualizarStatus() {
  const online = navigator.onLine;
  statusGroup.classList.toggle("offline", !online);
  statusIcon.textContent = online ? "📶" : "🚫";
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

// --- Init ---
timerText.textContent = formatTime(segundosRestantes);
actualizarStatus();
renderPregunta();
timerInterval = setInterval(tick, 1000);
