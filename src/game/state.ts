import type { Case } from '../data/cases';

export interface GameState {
    currentCasesList: Case[];
    currentCaseIdx: number;
    score: number;
    warnings: number;
    maxWarnings: number;
    selectedStamp: "APROVAR" | "AJUSTAR" | "REJEITAR" | null;
    appliedStamp: "APROVAR" | "AJUSTAR" | "REJEITAR" | null;
    gameActive: boolean;
    activeMode: string;
    feedbackMessage: string;
    feedbackSuccess: boolean;
    showingFeedback: boolean;
    currentManualTab: string;
}

export const state: GameState = {
    currentCasesList: [],
    currentCaseIdx: 0,
    score: 0.00,
    warnings: 0,
    maxWarnings: 3,
    selectedStamp: null,
    appliedStamp: null,
    gameActive: false,
    activeMode: "aleatorio",
    feedbackMessage: "",
    feedbackSuccess: false,
    showingFeedback: false,
    currentManualTab: "Bulas"
};

export function resetState(): void {
    state.currentCasesList = [];
    state.currentCaseIdx = 0;
    state.score = 0.00;
    state.warnings = 0;
    state.selectedStamp = null;
    state.appliedStamp = null;
    state.gameActive = false;
    state.activeMode = "aleatorio";
    state.feedbackMessage = "";
    state.feedbackSuccess = false;
    state.showingFeedback = false;
    state.currentManualTab = "Bulas";
}
