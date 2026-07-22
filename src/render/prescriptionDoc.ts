import type { Decision, Doc3 } from '../data/cases';

export function renderPrescriptionDoc(
    containerEl: HTMLElement,
    doc3: Doc3,
    appliedStamp: Decision | null,
    isStampEquipped: boolean,
    onDocumentClick?: (e: MouseEvent) => void
): void {
    const stampTargetClass = isStampEquipped ? 'stamp-ready-target' : '';
    containerEl.className = `paper-doc rounded-md p-4 flex flex-col justify-between text-xs font-mono leading-relaxed min-h-[520px] relative overflow-hidden transition-all duration-200 ${stampTargetClass}`;

    if (onDocumentClick) {
        containerEl.onclick = onDocumentClick;
    }

    let stampOverlayHtml = '';
    if (appliedStamp) {
        let boxClass = '';
        let stampText = '';

        if (appliedStamp === 'APROVAR') {
            boxClass = 'border-4 border-emerald-600 text-emerald-700 bg-emerald-50/90 stamp-applied';
            stampText = '✓ APROVADO';
        } else if (appliedStamp === 'RECUSAR') {
            boxClass = 'border-4 border-rose-600 text-rose-700 bg-rose-50/90 stamp-applied';
            stampText = '✕ RECUSADO';
        } else if (appliedStamp === 'AJUSTAR') {
            boxClass = 'border-4 border-amber-600 text-amber-800 bg-amber-50/90 stamp-applied';
            stampText = '⚠️ REQUER AJUSTE';
        }

        stampOverlayHtml = `
            <div id="doc3-stamp-overlay" class="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div id="doc3-stamp-box" class="px-6 py-3 rounded-lg text-center font-extrabold text-xl tracking-widest uppercase rotate-[-6deg] shadow-2xl backdrop-blur-xs ${boxClass}">
                    ${stampText}
                </div>
            </div>
        `;
    }

    const targetHintClass = isStampEquipped ? '' : 'hidden';

    containerEl.innerHTML = `
        <div>
            <!-- Header do Documento -->
            <div class="flex justify-between items-start border-b border-[#c8beaa] pb-2 mb-3">
                <div>
                    <span class="text-[10px] text-[#706a5b] font-bold block uppercase tracking-wider">PAPEL 3 • RECEITUÁRIO</span>
                    <h3 class="font-bold text-sm text-[#11100e]">PRESCRIÇÃO MÉDICA</h3>
                </div>
                <i class="fa-solid fa-file-prescription text-lg text-[#807663]"></i>
            </div>

            <!-- Medicamento Prescrito Container -->
            <div class="bg-[#fffdf7] border-2 border-[#d0c5ae] rounded p-3 mb-3 shadow-inner">
                <span class="text-[10px] text-[#706a5b] font-bold uppercase block mb-1">MEDICAMENTO PRESCRITO:</span>
                <div id="doc3-drug" class="font-extrabold text-base text-[#11100e] tracking-wide mb-2 uppercase">
                    ${doc3.drug}
                </div>

                <div class="grid grid-cols-2 gap-2 text-[11px] mb-2">
                    <div>
                        <span class="text-[9px] text-[#706a5b] font-bold block">POSOLOGIA / DOSE:</span>
                        <span id="doc3-dose" class="font-bold text-[#26241f]">${doc3.dose}</span>
                    </div>
                    <div>
                        <span class="text-[9px] text-[#706a5b] font-bold block">FREQUÊNCIA:</span>
                        <span id="doc3-freq" class="font-bold text-[#26241f]">${doc3.freq}</span>
                    </div>
                </div>

                <div>
                    <span class="text-[9px] text-[#706a5b] font-bold block">DURAÇÃO DO TRATAMENTO:</span>
                    <span id="doc3-duration" class="font-bold text-[#26241f]">${doc3.duration}</span>
                </div>
            </div>

            <!-- Outros Fármacos em Uso -->
            <div class="mb-3">
                <span class="text-[10px] text-[#706a5b] font-bold uppercase block mb-1">OUTROS FÁRMACOS EM USO PELO PACIENTE:</span>
                <div id="doc3-other-drugs" class="bg-[#eee6d3] p-2 rounded border border-[#d6cbba] text-[#38342d]">
                    ${doc3.otherDrugs}
                </div>
            </div>
        </div>

        <!-- Banner Instrução quando carimbo está equipado -->
        <div id="doc3-target-hint" class="${targetHintClass} my-2 bg-amber-500/20 border border-amber-600/50 text-amber-900 rounded p-2 text-center text-[10px] font-bold animate-pulse">
            🎯 CLIQUE AQUI PARA APLICAR O CARIMBO NO PAPEL
        </div>

        ${stampOverlayHtml}

        <!-- Footer Papel 3 -->
        <div class="pt-3 border-t border-[#dcd3be] flex justify-between items-center text-[10px] text-[#787162]">
            <span>Carimbo/Assinatura CRM</span>
            <span class="font-bold">Doc. #P3</span>
        </div>
    `;
}
