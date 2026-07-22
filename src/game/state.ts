import type { Case, Decision } from '../data/cases';
import { allCases } from '../data/cases';

export interface GameState {
    currentSemester: string;
    currentCaseIdx: number;
    score: number;
    warnings: number;
    maxWarnings: number;
    attendances: number;
    selectedStamp: Decision | null;
    appliedStamp: Decision | null;
    showingFeedback: boolean;
    lastFeedback: {
        success: boolean;
        title: string;
        bodyHtml: string;
    } | null;
    currentCasesList: Case[];
    gameActive: boolean;
    activeBularioTab: 'farmacos' | 'cinetica';
    isBularioOpen: boolean;
    isSemesterOpen: boolean;
}

export function createInitialState(): GameState {
    return {
        currentSemester: "Mesa Aleatória",
        currentCaseIdx: 0,
        score: 0.0,
        warnings: 0,
        maxWarnings: 3,
        attendances: 0,
        selectedStamp: null,
        appliedStamp: null,
        showingFeedback: false,
        lastFeedback: null,
        currentCasesList: [...allCases],
        gameActive: false,
        activeBularioTab: 'farmacos',
        isBularioOpen: false,
        isSemesterOpen: false,
    };
}

export const state: GameState = createInitialState();

export function resetState(): void {
    const fresh = createInitialState();
    Object.assign(state, fresh);
}
