export type Decision = "APROVAR" | "RECUSAR" | "AJUSTAR";

export interface Doc1 {
    symptoms: string;
    chronic: string;
    allergies: string;
}

export interface Doc2 {
    diagnosis: string;
    labsHtml: string;
    doctorObs: string;
    doctorName: string;
}

export interface Doc3 {
    drug: string;
    dose: string;
    freq: string;
    duration: string;
    otherDrugs: string;
}

export interface Kinetics {
    halfLife: number;
    doseAmt: number;
    interval: number;
    state: "therapeutic" | "toxic" | "ineffective";
    desc: string;
}

export interface Case {
    id: number;
    semesterTag: string;
    avatarIcon?: string;
    patientName: string;
    age: string;
    weight: string;
    speech: string;
    doc1: Doc1;
    doc2: Doc2;
    doc3: Doc3;
    correctDecision: Decision;
    explanation: string;
    kinetics: Kinetics;
}

export const allCases: Case[] = [
    // ================= 4º SEMESTRE (BÁSICO & DOSES ESTÁVEIS) =================
    {
        id: 1,
        semesterTag: "4º Semestre: Geral",
        avatarIcon: "fa-user-check",
        patientName: "Carlos Eduardo Santos",
        age: "28 anos",
        weight: "82 kg",
        speech: "Estou com uma dor de garganta forte e febre alta há dois dias.", // TODO: revisar com especialista
        doc1: {
            symptoms: "Amigdalite Bacteriana Aguda na garganta com dor",
            chronic: "Nenhuma",
            allergies: "Nenhuma conhecida em prontuário"
        },
        doc2: {
            diagnosis: "Amigdalite Bacteriana Aguda",
            labsHtml: `
                <div class="flex justify-between border-b border-[#dcd1be] pb-1">
                    <span>Função Renal:</span>
                    <span class="font-bold text-emerald-800">115 mL/min (Normal)</span>
                </div>
            `,
            doctorObs: "Geralmente seguro, alta margem terapêutica no sangue.",
            doctorName: "Dr. Responsável • CRM 00000" // TODO: revisar com especialista
        },
        doc3: {
            drug: "AMOXICILINA 500MG",
            dose: "500 mg Via Oral (VO)",
            freq: "A cada 8 horas (8/8h)",
            duration: "10 dias",
            otherDrugs: "Nenhum no momento"
        },
        correctDecision: "APROVAR",
        explanation: "Caso terapêutico ideal. Dose perfeita para paciente jovem e rim íntegro. O tempo do ciclo de antibiótico está dentro da janela adequada de combate.",
        kinetics: {
            halfLife: 1.0,
            doseAmt: 1.0,
            interval: 8,
            state: "therapeutic",
            desc: "Concentração ideal na Zona Terapêutica ativa."
        }
    },
    {
        id: 2,
        semesterTag: "4º Semestre: Geral",
        avatarIcon: "fa-user-injured",
        patientName: "Marcos de Oliveira",
        age: "35 anos",
        weight: "75 kg",
        speech: "Estou com uma dor de cabeça tensional horrível que não passa.", // TODO: revisar com especialista
        doc1: {
            symptoms: "Dor de Cabeça Tensional Recorrente Crônica",
            chronic: "Nenhuma",
            allergies: "Nenhuma"
        },
        doc2: {
            diagnosis: "Cefaleia Tensional Crônica",
            labsHtml: `
                <div class="flex justify-between border-b border-[#dcd1be] pb-1">
                    <span>Função Renal:</span>
                    <span class="font-bold text-emerald-800">100 mL/min (Normal)</span>
                </div>
            `,
            doctorObs: "Risco gravíssimo de saturação enzimática hepática.",
            doctorName: "Dr. Responsável • CRM 00000" // TODO: revisar com especialista
        },
        doc3: {
            drug: "PARACETAMOL 1000MG",
            dose: "1000 mg (1g) Via Oral (VO)",
            freq: "A cada 4 horas (4/4h) (Total = 6.000 mg/dia)",
            duration: "7 dias",
            otherDrugs: "Nenhum"
        },
        correctDecision: "AJUSTAR",
        explanation: "Ao prescrever 1g de 4/4h, o paciente consome 6g/dia (6000mg). O limite seguro diário é de 4g. É necessário ajustar a frequência para no mínimo 6/6h para evitar insuficiência hepática fatal.",
        kinetics: {
            halfLife: 2.5,
            doseAmt: 1.8,
            interval: 4,
            state: "toxic",
            desc: "Saturação das enzimas gera curva plasmática em nível tóxico acumulado."
        }
    },

    // ================= 5º SEMESTRE (FARMACOCINÉTICA & AJUSTE RENAL) =================
    {
        id: 3,
        semesterTag: "5º Semestre: Cinética",
        avatarIcon: "fa-user-elderly",
        patientName: "Roberto de Souza",
        age: "72 anos",
        weight: "65 kg",
        speech: "Estou internado na UTI por conta de uma pneumonia forte.", // TODO: revisar com especialista
        doc1: {
            symptoms: "Pneumonia Nosocomial Grave na UTI",
            chronic: "Insuficiência Renal Moderada a Grave",
            allergies: "Nenhuma cadastrada"
        },
        doc2: {
            diagnosis: "Pneumonia Nosocomial Grave",
            labsHtml: `
                <div class="flex justify-between border-b border-[#dcd1be] pb-1">
                    <span>eGFR (Taxa Filt. Renal):</span>
                    <span class="font-bold text-amber-900">32 mL/min</span>
                </div>
            `,
            doctorObs: "Janela terapêutica estreita. Alta ototoxicidade e toxicidade renal direta.",
            doctorName: "Dr. Responsável • CRM 00000" // TODO: revisar com especialista
        },
        doc3: {
            drug: "GENTAMICINA 80MG",
            dose: "80 mg Intravenosa (IV)",
            freq: "A cada 8 horas (8/8h)",
            duration: "7 dias",
            otherDrugs: "Nenhum"
        },
        correctDecision: "AJUSTAR",
        explanation: "A Gentamicina é eliminada exclusivamente por filtração renal. Com depuração renal em 32 mL/min, a administração de 8/8h causará acúmulo exponencial no sangue, lesionando irreversivelmente a audição e os rins.",
        kinetics: {
            halfLife: 10.0,
            doseAmt: 1.5,
            interval: 8,
            state: "toxic",
            desc: "Meia-vida estendida impede clareamento e acumula o fármaco na zona de toxicidade."
        }
    },
    {
        id: 4,
        semesterTag: "5º Semestre: Cinética",
        avatarIcon: "fa-user-injured",
        patientName: "Julio Cesar Mendes",
        age: "51 anos",
        weight: "92 kg",
        speech: "Estou com uma crise de gota horrível no dedão do pé.", // TODO: revisar com especialista
        doc1: {
            symptoms: "Crise Gota Inflamatória Aguda no dedão do pé",
            chronic: "Insuficiência Renal Crônica Terminal",
            allergies: "Nenhuma"
        },
        doc2: {
            diagnosis: "Crise de Gota Aguda + IRC Terminal",
            labsHtml: `
                <div class="flex justify-between border-b border-[#dcd1be] pb-1">
                    <span>eGFR (Taxa Filt. Renal):</span>
                    <span class="font-bold text-rose-900">18 mL/min (Terminal)</span>
                </div>
            `,
            doctorObs: "Inibição de prostaglandinas renais reduz bruscamente o fluxo renal.",
            doctorName: "Dr. Responsável • CRM 00000" // TODO: revisar com especialista
        },
        doc3: {
            drug: "IBUPROFENO 600MG",
            dose: "600 mg Via Oral (VO)",
            freq: "A cada 8 horas (8/8h)",
            duration: "5 dias",
            otherDrugs: "Alopurinol 100mg/dia"
        },
        correctDecision: "RECUSAR",
        explanation: "Em paciente com filtração renal de 18 mL/min, qualquer AINE (como Ibuprofeno) bloqueia a síntese de prostaglandinas e interrompe a perfusão do glomérulo. Isso anula a pouca filtração restante, enviando o paciente direto para diálise emergencial.",
        kinetics: {
            halfLife: 2.0,
            doseAmt: 1.3,
            interval: 8,
            state: "toxic",
            desc: "Interrupção súbita do fluxo renal gera dano direto tóxico cumulativo ao néfron."
        }
    },

    // ================= 6º SEMESTRE (DINÂMICA AVANÇADA & INTERAÇÕES COMPLEXAS) =================
    {
        id: 5,
        semesterTag: "6º Semestre: Avançado",
        avatarIcon: "fa-user-injured",
        patientName: "Maria de Lourdes Oliveira",
        age: "45 anos",
        weight: "70 kg",
        speech: "Estou tratando uma trombose na perna esquerda e sinto dores.", // TODO: revisar com especialista
        doc1: {
            symptoms: "Trombose Venosa Profunda (TVP) em perna esquerda",
            chronic: "Nenhuma",
            allergies: "Ácido Acetilsalicílico (AAS)"
        },
        doc2: {
            diagnosis: "TVP em perna esquerda",
            labsHtml: `
                <div class="flex justify-between border-b border-[#dcd1be] pb-1">
                    <span>eGFR (Taxa Filt. Renal):</span>
                    <span class="font-bold text-emerald-800">95 mL/min (Normal)</span>
                </div>
            `,
            doctorObs: "Alergia cruzada conhecida com salicilatos. Sinergismo aditivo com anticoagulantes.",
            doctorName: "Dr. Responsável • CRM 00000" // TODO: revisar com especialista
        },
        doc3: {
            drug: "ASPIRINA (AAS) 500MG",
            dose: "500 mg Via Oral (VO)",
            freq: "A cada 6 horas (6/6h) se dor",
            duration: "Se necessário",
            otherDrugs: "Varfarina 5mg/dia"
        },
        correctDecision: "RECUSAR",
        explanation: "O paciente tem alergia documentada ao AAS. Além disso, a combinação de AAS com Varfarina gera uma interação perigosa de sinergismo hemostático, com altíssimo risco de sangramento gastrointestinal maciço e fatal. Deve ser recusado.",
        kinetics: {
            halfLife: 3.0,
            doseAmt: 1.7,
            interval: 6,
            state: "toxic",
            desc: "O sinergismo de ação anula as barreiras de coagulação de forma perigosa."
        }
    },
    {
        id: 6,
        semesterTag: "6º Semestre: Avançado",
        avatarIcon: "fa-user-ninja",
        patientName: "Ana Julia Lima",
        age: "34 anos",
        weight: "58 kg",
        speech: "Tenho pressão alta e sinto taquicardia.", // TODO: revisar com especialista
        doc1: {
            symptoms: "Hipertensão Arterial com taquicardia",
            chronic: "Asma Ativa",
            allergies: "Pólen e Dipirona"
        },
        doc2: {
            diagnosis: "Hipertensão Arterial + Asma",
            labsHtml: `
                <div class="flex justify-between border-b border-[#dcd1be] pb-1">
                    <span>eGFR (Taxa Filt. Renal):</span>
                    <span class="font-bold text-emerald-800">88 mL/min (Normal)</span>
                </div>
            `,
            doctorObs: "Bloqueia receptores Beta-1 cardíacos e Beta-2 pulmonares.",
            doctorName: "Dr. Responsável • CRM 00000" // TODO: revisar com especialista
        },
        doc3: {
            drug: "PROPRANOLOL 40MG",
            dose: "40 mg Via Oral (VO)",
            freq: "A cada 12 horas (12/12h)",
            duration: "Uso Contínuo",
            otherDrugs: "Salbutamol (Spray Inalatório SOS)"
        },
        correctDecision: "RECUSAR",
        explanation: "O Propranolol bloqueia não-seletivamente os receptores pulmonares Beta-2. Se a paciente asmática precisar do Salbutamol (um agonista Beta-2), o medicamento de resgate será ineficaz devido ao bloqueio físico pelo Propranolol, desencadeando asfixia grave.",
        kinetics: {
            halfLife: 4.0,
            doseAmt: 1.0,
            interval: 12,
            state: "toxic",
            desc: "Bloqueio contínuo e irreversível de receptores pulmonares Beta-2."
        }
    },
    {
        id: 7,
        semesterTag: "6º Semestre: Avançado",
        avatarIcon: "fa-user-elderly",
        patientName: "Dona Leonor Vieira",
        age: "79 anos",
        weight: "50 kg",
        speech: "Tenho insuficiência cardíaca e batedeira no coração.", // TODO: revisar com especialista
        doc1: {
            symptoms: "Insuficiência Cardíaca Congestiva (ICC) com fibrilação",
            chronic: "Função Renal Reduzida pela Idade",
            allergies: "Nenhuma"
        },
        doc2: {
            diagnosis: "ICC + Fibrilação Atrial",
            labsHtml: `
                <div class="flex justify-between border-b border-[#dcd1be] pb-1">
                    <span>eGFR (Taxa Filt. Renal):</span>
                    <span class="font-bold text-amber-900">42 mL/min</span>
                </div>
            `,
            doctorObs: "Inibe fortemente a glicoproteína-P e o citocromo CYP3A4.",
            doctorName: "Dr. Responsável • CRM 00000" // TODO: revisar com especialista
        },
        doc3: {
            drug: "AMIODARONA 200MG",
            dose: "200 mg Via Oral (VO)",
            freq: "A cada 8 horas (8/8h)",
            duration: "Fase de Carga por 5 dias",
            otherDrugs: "Digoxina 0.25 mg/dia"
        },
        correctDecision: "AJUSTAR",
        explanation: "A Amiodarona bloqueia a depuração da Digoxina. Se ambas as doses cheias forem administradas simultaneamente, os níveis plasmáticos de Digoxina escalarão para a faixa de toxicidade (parada por assistolia ou bloqueio atrioventricular total). Deve-se solicitar o ajuste (redução imediata da Digoxina).",
        kinetics: {
            halfLife: 48.0,
            doseAmt: 2.0,
            interval: 8,
            state: "toxic",
            desc: "Inibição de glicoproteína-P faz a concentração de Digoxina disparar rumo ao nível tóxico."
        }
    }
];
