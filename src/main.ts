import './style.css';
import { state, resetState } from './game/state';
import { allCases } from './data/cases';
import { shuffleArray, processDecision, advanceCase } from './game/logic';
import { playSynthSound } from './audio/synth';
import { drawGame } from './render/canvas';
import { layout } from './render/layout';

// DOM Elements
const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const scoreEl = document.getElementById("game-score") as HTMLSpanElement;
const warningsEl = document.getElementById("game-warnings") as HTMLSpanElement;
const modeLabelEl = document.getElementById("active-mode-label") as HTMLSpanElement;

const introScreenEl = document.getElementById("intro-screen") as HTMLDivElement;
const gameplayAreaEl = document.getElementById("gameplay-area") as HTMLDivElement;
const endScreenEl = document.getElementById("end-screen") as HTMLDivElement;

const endTitleEl = document.getElementById("end-title") as HTMLHeadingElement;
const endMessageEl = document.getElementById("end-message") as HTMLParagraphElement;
const endCorrectEl = document.getElementById("end-correct") as HTMLSpanElement;
const endErrorsEl = document.getElementById("end-errors") as HTMLSpanElement;
const endBalanceEl = document.getElementById("end-balance") as HTMLSpanElement;

const btnSemestre4 = document.getElementById("btn-semestre4") as HTMLButtonElement;
const btnSemestre5 = document.getElementById("btn-semestre5") as HTMLButtonElement;
const btnSemestre6 = document.getElementById("btn-semestre6") as HTMLButtonElement;
const btnAleatorio = document.getElementById("btn-aleatorio") as HTMLButtonElement;
const btnReset = document.getElementById("btn-reset") as HTMLButtonElement;

// Helper functions for UI
function updateUI(): void {
    scoreEl.innerText = `CR$ ${state.score.toFixed(2)}`;
    warningsEl.innerText = `${state.warnings} / ${state.maxWarnings}`;
}

function endGame(victory: boolean, msg: string): void {
    state.gameActive = false;
    gameplayAreaEl.classList.add("hidden");
    endScreenEl.classList.remove("hidden");

    if (victory) {
        endTitleEl.innerText = "PLANTÃO ACADÊMICO APROVADO!";
        endTitleEl.className = "text-3xl font-bold mb-2 font-mono text-[#a6d189]";
    } else {
        endTitleEl.innerText = "REPROVADO POR ERRO FATAL";
        endTitleEl.className = "text-3xl font-bold mb-2 font-mono text-[#e78284]";
    }

    endMessageEl.innerText = msg;
    endCorrectEl.innerText = `${state.score / 50}`;
    endErrorsEl.innerText = `${state.warnings}`;
    endBalanceEl.innerText = `CR$ ${state.score.toFixed(2)}`;
}

function resetGame(): void {
    gameplayAreaEl.classList.add("hidden");
    endScreenEl.classList.add("hidden");
    introScreenEl.classList.remove("hidden");
    resetState();
}

function startGame(mode: string): void {
    state.activeMode = mode;

    // Filtrar os casos por semestre ou carregar tudo
    if (mode === "semestre4") {
        state.currentCasesList = allCases.filter(c => c.semester === 4);
        modeLabelEl.innerText = "4º Semestre (Básico)";
    } else if (mode === "semestre5") {
        state.currentCasesList = allCases.filter(c => c.semester === 5);
        modeLabelEl.innerText = "5º Semestre (Cinética & Renal)";
    } else if (mode === "semestre6") {
        state.currentCasesList = allCases.filter(c => c.semester === 6);
        modeLabelEl.innerText = "6º Semestre (Avançado & Interações)";
    } else {
        // Mesa Clínica Geral: aleatório
        state.currentCasesList = [...allCases];
        shuffleArray(state.currentCasesList);
        modeLabelEl.innerText = "Mesa Clínica Geral (Aleatória)";
    }

    introScreenEl.classList.add("hidden");
    endScreenEl.classList.add("hidden");
    gameplayAreaEl.classList.remove("hidden");

    state.currentCaseIdx = 0;
    state.score = 0;
    state.warnings = 0;
    state.appliedStamp = null;
    state.selectedStamp = null;
    state.showingFeedback = false;
    state.currentManualTab = "Bulas";
    state.gameActive = true;

    updateUI();
    drawGame(ctx, state, layout);
}

// Canvas Mouse Interactions
canvas.addEventListener("click", (evt: MouseEvent) => {
    if (!state.gameActive) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = (evt.clientX - rect.left) * (canvas.width / rect.width);
    const mouseY = (evt.clientY - rect.top) * (canvas.height / rect.height);

    if (state.showingFeedback) {
        playSynthSound("click");
        const nextResult = advanceCase();
        if (nextResult) {
            endGame(nextResult.victory, nextResult.message);
        } else {
            drawGame(ctx, state, layout);
        }
        return;
    }

    // Checar cliques nas Abas do Manual Clínico
    for (let tab of layout.tabs) {
        if (mouseX >= tab.x && mouseX <= tab.x + tab.w &&
            mouseY >= tab.y && mouseY <= tab.y + tab.h) {
            state.currentManualTab = tab.id;
            playSynthSound("click");
            drawGame(ctx, state, layout);
            return;
        }
    }

    // Checar clique nos Botões de Carimbo
    for (let key in layout.stamps) {
        const stampKey = key as "APROVAR" | "AJUSTAR" | "REJEITAR";
        let btn = layout.stamps[stampKey];
        if (mouseX >= btn.x && mouseX <= btn.x + btn.w &&
            mouseY >= btn.y && mouseY <= btn.y + btn.h) {
            state.selectedStamp = stampKey;
            playSynthSound("click");
            drawGame(ctx, state, layout);
            return;
        }
    }

    // Checar clique para carimbar na Receita Médica
    let rx = layout.prescription;
    if (mouseX >= rx.x && mouseX <= rx.x + rx.w &&
        mouseY >= rx.y && mouseY <= rx.y + rx.h) {
        if (state.selectedStamp) {
            state.appliedStamp = state.selectedStamp;
            playSynthSound("stamp");
            state.selectedStamp = null; 
            drawGame(ctx, state, layout);
        }
        return;
    }

    // Checar clique no Botão Confirmar Decisão
    let btnConf = layout.confirmBtn;
    if (mouseX >= btnConf.x && mouseX <= btnConf.x + btnConf.w &&
        mouseY >= btnConf.y && mouseY <= btnConf.y + btnConf.h) {
        if (state.appliedStamp) {
            const soundType = processDecision();
            playSynthSound(soundType);
            updateUI();
            drawGame(ctx, state, layout);
        }
        return;
    }
});

// Event Listeners for HTML UI Buttons
btnSemestre4.addEventListener("click", () => startGame("semestre4"));
btnSemestre5.addEventListener("click", () => startGame("semestre5"));
btnSemestre6.addEventListener("click", () => startGame("semestre6"));
btnAleatorio.addEventListener("click", () => startGame("aleatorio"));
btnReset.addEventListener("click", () => resetGame());
