import type { Decision } from '../data/cases';

export function renderStampPanel(
    selectedStamp: Decision | null,
    onSelectStamp: (stamp: Decision) => void,
    onClearStamp: () => void
): void {
    const btnAprovar = document.getElementById('stamp-btn-APROVAR');
    const btnRecusar = document.getElementById('stamp-btn-RECUSAR');
    const btnAjustar = document.getElementById('stamp-btn-AJUSTAR');
    const unselectBtn = document.getElementById('unselect-stamp-btn');
    const indicator = document.getElementById('stamp-status-indicator');

    const floatingCursor = document.getElementById('floating-stamp-cursor');
    const floatingBox = document.getElementById('floating-stamp-box');
    const floatingText = document.getElementById('floating-stamp-text');

    const buttons = [btnAprovar, btnRecusar, btnAjustar];
    buttons.forEach(btn => {
        if (btn) btn.classList.remove('ring-4', 'ring-amber-400', 'scale-[1.02]');
    });

    if (btnAprovar) btnAprovar.onclick = () => onSelectStamp('APROVAR');
    if (btnRecusar) btnRecusar.onclick = () => onSelectStamp('RECUSAR');
    if (btnAjustar) btnAjustar.onclick = () => onSelectStamp('AJUSTAR');
    if (unselectBtn) unselectBtn.onclick = () => onClearStamp();

    if (!selectedStamp) {
        if (floatingCursor) floatingCursor.style.display = 'none';
        if (unselectBtn) unselectBtn.classList.add('hidden');
        if (indicator) {
            indicator.innerHTML = '<i class="fa-solid fa-hand-pointer"></i> SELECIONE UM CARIMBO';
            indicator.className = "text-[#d8a048] font-bold block flex items-center justify-end gap-1";
        }
        return;
    }

    const activeBtn = document.getElementById(`stamp-btn-${selectedStamp}`);
    if (activeBtn) {
        activeBtn.classList.add('ring-4', 'ring-amber-400', 'scale-[1.02]');
    }

    if (unselectBtn) unselectBtn.classList.remove('hidden');
    if (floatingCursor) floatingCursor.style.display = 'block';

    if (indicator && floatingBox && floatingText) {
        if (selectedStamp === 'APROVAR') {
            floatingBox.className = "border-4 border-emerald-600 text-emerald-700 px-4 py-2 rounded-lg font-extrabold text-sm tracking-widest uppercase rotate-[-6deg] shadow-2xl bg-emerald-50/90 flex items-center gap-2";
            floatingText.innerHTML = '<i class="fa-solid fa-check"></i> 1. APROVAR';
            indicator.innerHTML = '<i class="fa-solid fa-stamp text-emerald-400"></i> CARIMBO: APROVAR EQUIPADO';
            indicator.className = "text-emerald-400 font-bold block flex items-center justify-end gap-1";
        } else if (selectedStamp === 'RECUSAR') {
            floatingBox.className = "border-4 border-rose-600 text-rose-700 px-4 py-2 rounded-lg font-extrabold text-sm tracking-widest uppercase rotate-[-6deg] shadow-2xl bg-rose-50/90 flex items-center gap-2";
            floatingText.innerHTML = '<i class="fa-solid fa-xmark"></i> 2. RECUSAR';
            indicator.innerHTML = '<i class="fa-solid fa-stamp text-rose-400"></i> CARIMBO: RECUSAR EQUIPADO';
            indicator.className = "text-rose-400 font-bold block flex items-center justify-end gap-1";
        } else if (selectedStamp === 'AJUSTAR') {
            floatingBox.className = "border-4 border-amber-600 text-amber-800 px-4 py-2 rounded-lg font-extrabold text-sm tracking-widest uppercase rotate-[-6deg] shadow-2xl bg-amber-50/90 flex items-center gap-2";
            floatingText.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> 3. AJUSTAR';
            indicator.innerHTML = '<i class="fa-solid fa-stamp text-amber-400"></i> CARIMBO: AJUSTAR EQUIPADO';
            indicator.className = "text-amber-400 font-bold block flex items-center justify-end gap-1";
        }
    }
}

export function setupStampCursorTracking(hasSelectedStamp: () => boolean): void {
    const floatingCursor = document.getElementById('floating-stamp-cursor');
    if (!floatingCursor) return;

    document.addEventListener('mousemove', (e: MouseEvent) => {
        if (hasSelectedStamp()) {
            floatingCursor.style.left = `${e.clientX}px`;
            floatingCursor.style.top = `${e.clientY}px`;
        }
    });
}
