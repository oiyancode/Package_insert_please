import type { Doc1 } from '../data/cases';

export function renderPatientDoc(containerEl: HTMLElement, doc1: Doc1, age: string, weight: string): void {
    containerEl.innerHTML = `
        <div>
            <!-- Header do Documento -->
            <div class="flex justify-between items-start border-b border-[#c8beaa] pb-2 mb-3">
                <div>
                    <span class="text-[10px] text-[#706a5b] font-bold block uppercase tracking-wider">PAPEL 1 • PRONTUÁRIO</span>
                    <h3 class="font-bold text-sm text-[#11100e]">FICHA & ANAMNESE</h3>
                </div>
                <i class="fa-solid fa-id-card text-lg text-[#807663]"></i>
            </div>

            <!-- Relato do Paciente -->
            <div class="mb-3">
                <span class="text-[10px] text-[#706a5b] font-bold uppercase block mb-1">RELATO DO PACIENTE (SINTOMAS):</span>
                <div id="doc1-symptoms" class="bg-[#eee6d3] p-2.5 rounded border border-[#d6cbba] italic text-[#26241f] min-h-[60px]">
                    ${doc1.symptoms}
                </div>
            </div>

            <!-- Idade e Peso -->
            <div class="grid grid-cols-2 gap-2 mb-3 pb-2 border-b border-[#e2d8c5]">
                <div>
                    <span class="text-[10px] text-[#706a5b] font-bold block">IDADE:</span>
                    <span id="doc1-age" class="font-bold text-[#1a1917]">${age}</span>
                </div>
                <div>
                    <span class="text-[10px] text-[#706a5b] font-bold block">PESO:</span>
                    <span id="doc1-weight" class="font-bold text-[#1a1917]">${weight}</span>
                </div>
            </div>

            <!-- Condições Crônicas -->
            <div class="mb-3">
                <span class="text-[10px] text-[#706a5b] font-bold uppercase block mb-1">CONDIÇÕES CRÔNICAS:</span>
                <div id="doc1-chronic" class="inline-block bg-[#e5decb] px-2.5 py-1 rounded border border-[#cac0a8] font-bold text-[#2a2823]">
                    ${doc1.chronic}
                </div>
            </div>

            <!-- Alergias Relatadas -->
            <div class="mb-3">
                <span class="text-[10px] text-rose-800 font-bold uppercase block mb-1">⚠️ ALERGIAS RELATADAS:</span>
                <div id="doc1-allergies" class="bg-[#fce8e6] p-2 rounded border border-[#f5b8b5] text-rose-900 font-bold">
                    ${doc1.allergies}
                </div>
            </div>
        </div>

        <!-- Footer Papel 1 -->
        <div class="pt-3 border-t border-[#dcd3be] flex justify-between items-center text-[10px] text-[#787162]">
            <span>SUS • Triagem Inicial</span>
            <span class="font-bold">Doc. #P1</span>
        </div>
    `;
}
