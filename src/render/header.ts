import type { Case } from '../data/cases';

export function renderHeaderStats(
    semesterName: string,
    score: number,
    warnings: number,
    attendances: number,
    volume: number,
    isMuted: boolean
): void {
    const semEl = document.getElementById('hdr-semester');
    const scoreEl = document.getElementById('hdr-score');
    const warningsEl = document.getElementById('hdr-warnings');
    const countEl = document.getElementById('hdr-count');
    const volumeLabel = document.getElementById('volume-label');
    const volumeIcon = document.getElementById('volume-icon');

    if (semEl) semEl.textContent = semesterName;
    if (scoreEl) scoreEl.textContent = `CR$ ${score.toFixed(2)}`;
    if (warningsEl) warningsEl.textContent = `${warnings} / 3`;
    if (countEl) countEl.textContent = attendances.toString();

    if (volumeLabel) volumeLabel.textContent = `${Math.round(volume * 100)}%`;
    if (volumeIcon) {
        if (isMuted || volume === 0) {
            volumeIcon.className = "fa-solid fa-volume-xmark text-rose-400 text-xs";
        } else if (volume < 0.4) {
            volumeIcon.className = "fa-solid fa-volume-low text-xs";
        } else {
            volumeIcon.className = "fa-solid fa-volume-high text-xs";
        }
    }
}

export function renderPatientBanner(currentCase: Case | null, caseIndex: number): void {
    if (!currentCase) return;

    const avatarIcon = document.getElementById('patient-avatar-icon');
    const badgeEl = document.getElementById('patient-badge');
    const nameEl = document.getElementById('patient-name');
    const metaEl = document.getElementById('patient-meta');
    const speechEl = document.getElementById('patient-speech');

    if (avatarIcon && currentCase.avatarIcon) {
        avatarIcon.className = `fa-solid ${currentCase.avatarIcon}`;
    }

    if (badgeEl) badgeEl.textContent = `PACIENTE #${caseIndex + 1}`;
    if (nameEl) nameEl.textContent = currentCase.patientName;
    if (metaEl) metaEl.textContent = `${currentCase.age} • ${currentCase.weight}`;
    if (speechEl) speechEl.textContent = currentCase.speech;
}

export function renderSemesterModal(isOpen: boolean, onSelectSemester: (semName: string) => void): void {
    const modal = document.getElementById('modal-semester');
    if (!modal) return;

    if (!isOpen) {
        modal.classList.add('hidden');
        return;
    }

    modal.classList.remove('hidden');

    const btnSem4 = document.getElementById('btn-sem4');
    const btnSem5 = document.getElementById('btn-sem5');
    const btnSem6 = document.getElementById('btn-sem6');
    const btnAleatorio = document.getElementById('btn-aleatorio');

    if (btnSem4) btnSem4.onclick = () => onSelectSemester('4º Semestre: Geral');
    if (btnSem5) btnSem5.onclick = () => onSelectSemester('5º Semestre: Cinética');
    if (btnSem6) btnSem6.onclick = () => onSelectSemester('6º Semestre: Avançado');
    if (btnAleatorio) btnAleatorio.onclick = () => onSelectSemester('Mesa Aleatória');
}
