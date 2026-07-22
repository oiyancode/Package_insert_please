import type { Case, Decision } from '../data/cases';
import type { GameState } from './state';

export function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function filterCasesBySemester(allCasesList: Case[], semName: string): Case[] {
    if (semName.includes('4º')) {
        return allCasesList.filter(c => c.semesterTag.includes('4º'));
    } else if (semName.includes('5º')) {
        return allCasesList.filter(c => c.semesterTag.includes('5º'));
    } else if (semName.includes('6º')) {
        return allCasesList.filter(c => c.semesterTag.includes('6º'));
    } else {
        const copy = [...allCasesList];
        return shuffleArray(copy);
    }
}

export function getCurrentCase(s: GameState): Case | null {
    if (!s.currentCasesList || s.currentCasesList.length === 0) return null;
    const idx = s.currentCaseIdx % s.currentCasesList.length;
    return s.currentCasesList[idx];
}

export function selectStamp(
    s: GameState,
    type: Decision,
    soundEngine?: { playPickup: () => void }
): void {
    if (soundEngine) soundEngine.playPickup();
    if (s.selectedStamp === type) {
        s.selectedStamp = null;
    } else {
        s.selectedStamp = type;
    }
}

export function clearSelectedStamp(s: GameState): void {
    s.selectedStamp = null;
}

export function applyDecision(
    s: GameState,
    decisionType: Decision,
    soundEngine?: { playStamp: () => void; playSuccess: () => void; playError: () => void }
): { isCorrect: boolean; title: string; bodyHtml: string } {
    if (soundEngine) soundEngine.playStamp();

    const currentCase = getCurrentCase(s);
    if (!currentCase) {
        return { isCorrect: false, title: 'ERRO', bodyHtml: 'Nenhum caso carregado.' };
    }

    const isCorrect = (decisionType === currentCase.correctDecision);
    s.attendances++;
    s.appliedStamp = decisionType;
    clearSelectedStamp(s);

    let title = '';
    if (isCorrect) {
        if (soundEngine) soundEngine.playSuccess();
        s.score += 150.00;
        title = 'DECISÃO CLINICAMENTE CORRETA!';
    } else {
        if (soundEngine) soundEngine.playError();
        s.warnings++;
        title = 'ALERTA DE SEGURANÇA FARMACÊUTICA';
        if (s.warnings >= s.maxWarnings) {
            s.gameActive = false;
        }
    }

    s.showingFeedback = true;
    s.lastFeedback = {
        success: isCorrect,
        title,
        bodyHtml: currentCase.explanation,
    };

    return { isCorrect, title, bodyHtml: currentCase.explanation };
}

export function nextPatient(s: GameState): void {
    s.showingFeedback = false;
    s.lastFeedback = null;
    s.appliedStamp = null;
    s.selectedStamp = null;
    s.currentCaseIdx++;
}

export function selectSemester(s: GameState, semName: string, allCasesList: Case[]): void {
    s.currentSemester = semName;
    s.currentCasesList = filterCasesBySemester(allCasesList, semName);
    s.currentCaseIdx = 0;
    s.showingFeedback = false;
    s.lastFeedback = null;
    s.appliedStamp = null;
    s.selectedStamp = null;
    s.isSemesterOpen = false;
    s.gameActive = true;
}
