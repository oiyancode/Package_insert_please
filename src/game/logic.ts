import { state } from './state';

export function shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function processDecision(): "success" | "error" {
    const currentCase = state.currentCasesList[state.currentCaseIdx];
    state.showingFeedback = true;

    if (state.appliedStamp === currentCase.correctDecision) {
        state.score += 50.00;
        state.feedbackSuccess = true;
        state.feedbackMessage = "APROVADO PELO CONTROLE SANITÁRIO ACADÊMICO:\n" + currentCase.explanation;
        return "success";
    } else {
        state.warnings++;
        state.feedbackSuccess = false;
        state.feedbackMessage = "ALERTA DE INFRAÇÃO FARMACÊUTICA GRAVE:\n" + currentCase.incorrectText;
        return "error";
    }
}

export interface AdvanceCaseResult {
    ended: boolean;
    victory: boolean;
    message: string;
}

export function advanceCase(): AdvanceCaseResult | null {
    state.showingFeedback = false;
    state.appliedStamp = null;
    state.selectedStamp = null;

    if (state.warnings >= state.maxWarnings) {
        state.gameActive = false;
        return {
            ended: true,
            victory: false,
            message: "Sua licença universitária de triagem clínica foi cassada. Seus erros farmacológicos causaram reações catastróficas e falência de órgãos em múltiplos pacientes."
        };
    } else if (state.currentCaseIdx + 1 < state.currentCasesList.length) {
        state.currentCaseIdx++;
        state.currentManualTab = "Bulas";
        return null;
    } else {
        state.gameActive = false;
        return {
            ended: true,
            victory: true,
            message: "Parabéns! Você concluiu com excelência todos os prontuários de triagem designados para o seu período de estudo."
        };
    }
}
