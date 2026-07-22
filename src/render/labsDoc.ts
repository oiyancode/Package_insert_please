import type { Doc2 } from '../data/cases';

export function renderLabsDoc(containerEl: HTMLElement, doc2: Doc2): void {
    containerEl.innerHTML = `
        <div>
            <!-- Header do Documento -->
            <div class="flex justify-between items-start border-b border-[#c8beaa] pb-2 mb-3">
                <div>
                    <span class="text-[10px] text-[#706a5b] font-bold block uppercase tracking-wider">PAPEL 2 • CLINICAL REPORT</span>
                    <h3 class="font-bold text-sm text-[#11100e]">LAUDO & EXAMES</h3>
                </div>
                <i class="fa-solid fa-microscope text-lg text-[#807663]"></i>
            </div>

            <!-- Diagnóstico Clínico -->
            <div class="mb-3">
                <span class="text-[10px] text-[#706a5b] font-bold uppercase block mb-1">DIAGNÓSTICO CLÍNICO (MÉDICO):</span>
                <div id="doc2-diagnosis" class="bg-[#e3f2fd] p-2.5 rounded border border-[#bbdefb] font-bold text-[#0d47a1]">
                    ${doc2.diagnosis}
                </div>
            </div>

            <!-- Exames Laboratoriais -->
            <div class="mb-3">
                <span class="text-[10px] text-[#706a5b] font-bold uppercase block mb-1">EXAMES LABORATORIAIS RELEVANTES:</span>
                <div id="doc2-labs" class="bg-[#eee6d3] p-2.5 rounded border border-[#d6cbba] space-y-1.5 text-[11px]">
                    ${doc2.labsHtml}
                </div>
            </div>

            <!-- Observações do Médico -->
            <div class="mb-3">
                <span class="text-[10px] text-[#706a5b] font-bold uppercase block mb-1">OBSERVAÇÕES DO MÉDICO:</span>
                <p id="doc2-obs" class="italic text-[#38342d] bg-[#f0e8d5] p-2 rounded border border-[#dad0bb]">
                    ${doc2.doctorObs}
                </p>
            </div>
        </div>

        <!-- Footer Papel 2 -->
        <div class="pt-3 border-t border-[#dcd3be] flex justify-between items-center text-[10px] text-[#787162]">
            <span id="doc2-doctor">${doc2.doctorName}</span>
            <span class="font-bold">Doc. #P2</span>
        </div>
    `;
}
