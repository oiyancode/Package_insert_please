export function renderFeedbackModal(
    isOpen: boolean,
    feedback: { success: boolean; title: string; bodyHtml: string } | null,
    onNextPatient: () => void
): void {
    const modal = document.getElementById('modal-feedback');
    if (!modal) return;

    if (!isOpen || !feedback) {
        modal.classList.add('hidden');
        return;
    }

    const iconBox = document.getElementById('fb-icon-box');
    const titleEl = document.getElementById('fb-title');
    const bodyEl = document.getElementById('fb-body');
    const nextBtn = document.getElementById('next-patient-btn');

    if (iconBox && titleEl) {
        if (feedback.success) {
            iconBox.className = "w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0 bg-emerald-950/80 border-2 border-emerald-500 text-emerald-400";
            iconBox.innerHTML = '<i class="fa-solid fa-check"></i>';
            titleEl.className = "font-bold text-lg font-mono text-emerald-400";
        } else {
            iconBox.className = "w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0 bg-rose-950/80 border-2 border-rose-500 text-rose-400";
            iconBox.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
            titleEl.className = "font-bold text-lg font-mono text-rose-400";
        }
        titleEl.textContent = feedback.title;
    }

    if (bodyEl) {
        bodyEl.innerHTML = feedback.bodyHtml;
    }

    if (nextBtn) {
        nextBtn.onclick = () => onNextPatient();
    }

    modal.classList.remove('hidden');
}
