import { describe, it, expect, beforeEach } from 'vitest';
import { createInitialState } from './state';
import type { GameState } from './state';
import { applyDecision, getCurrentCase } from './logic';

describe('Game Logic - applyDecision', () => {
    let state: GameState;

    beforeEach(() => {
        state = createInitialState();
        state.gameActive = true;
    });

    it('returns success when decision matches correctDecision', () => {
        const currentCase = getCurrentCase(state);
        expect(currentCase).not.toBeNull();

        const correct = currentCase!.correctDecision;
        const result = applyDecision(state, correct);

        expect(result.isCorrect).toBe(true);
        expect(result.title).toContain('CORRETA');
        expect(state.showingFeedback).toBe(true);
    });

    it('increments warnings when decision is incorrect', () => {
        const currentCase = getCurrentCase(state);
        expect(currentCase).not.toBeNull();

        const wrongDecision = currentCase!.correctDecision === 'APROVAR' ? 'RECUSAR' : 'APROVAR';
        const initialWarnings = state.warnings;

        const result = applyDecision(state, wrongDecision);

        expect(result.isCorrect).toBe(false);
        expect(state.warnings).toBe(initialWarnings + 1);
        expect(result.title).toContain('ALERTA');
    });

    it('increases score correctly on correct decisions', () => {
        const currentCase = getCurrentCase(state);
        expect(currentCase).not.toBeNull();

        const initialScore = state.score;
        const correct = currentCase!.correctDecision;

        applyDecision(state, correct);

        expect(state.score).toBe(initialScore + 150.00);
    });

    it('deactivates game when warnings reach maxWarnings limit', () => {
        const wrongDecision = 'RECUSAR'; // If case 1 is APROVAR
        state.currentCasesList[0].correctDecision = 'APROVAR';

        expect(state.gameActive).toBe(true);

        applyDecision(state, wrongDecision); // Warning 1
        expect(state.gameActive).toBe(true);

        applyDecision(state, wrongDecision); // Warning 2
        expect(state.gameActive).toBe(true);

        applyDecision(state, wrongDecision); // Warning 3 -> Game Over
        expect(state.warnings).toBe(3);
        expect(state.gameActive).toBe(false);
    });
});
