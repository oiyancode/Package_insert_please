import './style.css';
import { state } from './game/state';
import { allCases } from './data/cases';
import type { Decision } from './data/cases';
import {
    getCurrentCase,
    selectStamp,
    clearSelectedStamp,
    applyDecision,
    nextPatient,
    selectSemester
} from './game/logic';
import { soundEngine } from './audio/soundEngine';
import { renderHeaderStats, renderPatientBanner, renderSemesterModal } from './render/header';
import { renderPatientDoc } from './render/patientDoc';
import { renderLabsDoc } from './render/labsDoc';
import { renderPrescriptionDoc } from './render/prescriptionDoc';
import { renderStampPanel, setupStampCursorTracking } from './render/stampPanel';
import { renderManualModal } from './render/manualModal';
import { renderFeedbackModal } from './render/feedbackModal';

// --- UI RE-RENDER ORCHESTRATOR ---
function updateUI(): void {
    const currentCase = getCurrentCase(state);

    // 1. Header & Stats
    renderHeaderStats(
        state.currentSemester,
        state.score,
        state.warnings,
        state.attendances,
        soundEngine.volume,
        soundEngine.isMuted
    );

    // 2. Patient Banner
    renderPatientBanner(currentCase, state.currentCaseIdx);

    // 3. Document 1 (Patient Prontuário)
    const doc1El = document.getElementById('doc1-paper');
    if (doc1El && currentCase) {
        renderPatientDoc(doc1El, currentCase.doc1, currentCase.age, currentCase.weight);
    }

    // 4. Document 2 (Labs & Clinical Report)
    const doc2El = document.getElementById('doc2-paper');
    if (doc2El && currentCase) {
        renderLabsDoc(doc2El, currentCase.doc2);
    }

    // 5. Document 3 (Prescription + Stamp)
    const doc3El = document.getElementById('doc3-paper');
    if (doc3El && currentCase) {
        renderPrescriptionDoc(
            doc3El,
            currentCase.doc3,
            state.appliedStamp,
            state.selectedStamp !== null,
            () => handleDocument3Click()
        );
    }

    // 6. Stamp Control Panel
    renderStampPanel(
        state.selectedStamp,
        (stamp: Decision) => {
            selectStamp(state, stamp, soundEngine);
            updateUI();
        },
        () => {
            clearSelectedStamp(state);
            updateUI();
        }
    );

    // 7. Modals
    renderSemesterModal(state.isSemesterOpen, (semName: string) => {
        selectSemester(state, semName, allCases);
        updateUI();
    });

    renderManualModal(
        state.isBularioOpen,
        state.activeBularioTab,
        currentCase?.kinetics,
        () => {
            state.isBularioOpen = false;
            updateUI();
        },
        (tab) => {
            state.activeBularioTab = tab;
            updateUI();
        }
    );

    renderFeedbackModal(
        state.showingFeedback,
        state.lastFeedback,
        () => {
            nextPatient(state);
            updateUI();
        }
    );
}

// --- USER INTERACTION HANDLERS ---
function handleDocument3Click(): void {
    if (!state.selectedStamp) {
        const indicator = document.getElementById('stamp-status-indicator');
        if (indicator) {
            indicator.classList.add('animate-bounce');
            setTimeout(() => indicator.classList.remove('animate-bounce'), 1000);
        }
        return;
    }

    const chosenStamp = state.selectedStamp;
    applyDecision(state, chosenStamp, soundEngine);
    updateUI();
}

// --- EVENT SETUP ---
window.addEventListener('DOMContentLoaded', () => {
    // Controls
    const openBularioBtn = document.getElementById('open-bulario-btn');
    if (openBularioBtn) {
        openBularioBtn.onclick = () => {
            state.isBularioOpen = true;
            updateUI();
        };
    }

    const openSemesterBtn = document.getElementById('open-semester-btn');
    if (openSemesterBtn) {
        openSemesterBtn.onclick = () => {
            state.isSemesterOpen = true;
            updateUI();
        };
    }

    // Volume Slider
    const volumeSlider = document.getElementById('volume-slider') as HTMLInputElement;
    if (volumeSlider) {
        volumeSlider.oninput = (e) => {
            const target = e.target as HTMLInputElement;
            soundEngine.setVolume(target.value);
            updateUI();
        };
    }

    // Mute Button
    const muteBtn = document.getElementById('volume-mute-btn');
    if (muteBtn) {
        muteBtn.onclick = () => {
            soundEngine.toggleMute();
            updateUI();
        };
    }

    // Keydown ESC handler to unselect stamp
    document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            clearSelectedStamp(state);
            updateUI();
        }
    });

    // Setup mouse cursor tracking for floating stamp
    setupStampCursorTracking(() => state.selectedStamp !== null);

    // Initial render
    state.gameActive = true;
    updateUI();
});
