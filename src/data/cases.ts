export interface Patient {
    name: string;
    age: string;
    weight: string;
    renal: string;
    allergies: string;
    diagnosis: string;
    currentMeds: string;
}

export interface Prescription {
    drug: string;
    dose: string;
    route: string;
    freq: string;
    duration: string;
}

export interface DrugDetails {
    name: string;
    class: string;
    indication: string;
    alert: string;
    rule: string;
    halfLife: string;
}

export interface Kinetics {
    halfLife: number;
    doseAmt: number;
    interval: number;
    state: "therapeutic" | "toxic" | "ineffective";
    desc: string;
}

export type Decision = "APROVAR" | "AJUSTAR" | "REJEITAR";

export interface Case {
    semester: number;
    patient: Patient;
    prescription: Prescription;
    drugDetails: DrugDetails;
    correctDecision: Decision;
    explanation: string;
    incorrectText: string;
    kinetics: Kinetics;
}

export const allCases: Case[] = [
    // ================= 4º SEMESTRE (BÁSICO & DOSES ESTÁVEIS) =================
    {
        semester: 4,
        patient: {
            name: "Carlos Eduardo Santos",
            age: "28 anos",
            weight: "82 kg",
            renal: "115 mL/min (Excelente ritmo de filtração)",
            allergies: "Nenhuma conhecida em prontuário",
            diagnosis: "Amigdalite Bacteriana Aguda na garganta com dor",
            currentMeds: "Nenhum no momento"
        },
        prescription: {
            drug: "Amoxicilina",
            dose: "500 mg",
            route: "Via Oral (VO)",
            freq: "A cada 8 horas (8/8h)",
            duration: "10 dias"
        },
        drugDetails: {
            name: "Amoxicilina",
            class: "Penicilina de Amplo Espectro",
            indication: "Infecções de vias aéreas superiores, amigdalites.",
            alert: "Geralmente seguro, alta margem terapêutica no sangue.",
            rule: "Dose típica em adultos: 500mg de 8/8h por 7 a 10 dias. Requer cautela apenas em caso de alergias graves a antibióticos beta-lactâmicos.",
            halfLife: "Meia-vida (t1/2): ~1.0 hora. Eliminação renal rápida, exigindo frequência rígida de 8/8h para não cair na zona inefetiva."
        },
        correctDecision: "APROVAR",
        explanation: "Caso terapêutico ideal. Dose perfeita para paciente jovem e rim íntegro. O tempo do ciclo de antibiótico está dentro da janela adequada de combate.",
        incorrectText: "Incorreto! Este é o tratamento padrão inicial. Rejeitar ou ajustar atrasa o combate bacteriano, prolongando o quadro inflamatório do paciente.",
        kinetics: {
            halfLife: 1.0,
            doseAmt: 1.0,
            interval: 8,
            state: "therapeutic",
            desc: "Concentração ideal na Zona Terapêutica ativa."
        }
    },
    {
        semester: 4,
        patient: {
            name: "Marcos de Oliveira",
            age: "35 anos",
            weight: "75 kg",
            renal: "100 mL/min (Saudável)",
            allergies: "Nenhuma",
            diagnosis: "Dor de Cabeça Tensional Recorrente Crônica",
            currentMeds: "Nenhum"
        },
        prescription: {
            drug: "Paracetamol",
            dose: "1000 mg (1g)",
            route: "Via Oral (VO)",
            freq: "A cada 4 horas (4/4h)",
            duration: "7 dias"
        },
        drugDetails: {
            name: "Paracetamol",
            class: "Analgésico e Antipirético",
            indication: "Cefaleia, febre, dor leve a moderada.",
            alert: "Risco gravíssimo de saturação enzimática hepática e hepatite medicamentosa fatal.",
            rule: "Dose diária máxima absoluta em adultos: 4000mg (4g/dia). Doses acima deste limite saturam a glutationa, gerando acúmulo de NAPQI tóxico.",
            halfLife: "Meia-vida (t1/2): ~2.5 horas. A velocidade de metabolização é estável, mas a via de conjugação satura na sobredose."
        },
        correctDecision: "AJUSTAR",
        explanation: "Ao prescrever 1g de 4/4h, o paciente consome 6g/dia (6000mg). O limite seguro diário é de 4g. É necessário ajustar a frequência para no mínimo 6/6h para evitar insuficiência hepática fatal.",
        incorrectText: "Erro fatal! Aprovar esta receita causa lesão celular hepática massiva por acúmulo de metabólito tóxico (NAPQI) não metabolizado.",
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
        semester: 5,
        patient: {
            name: "Roberto de Souza",
            age: "72 anos",
            weight: "65 kg",
            renal: "32 mL/min (Insuficiência Renal Moderada a Grave)",
            allergies: "Nenhuma cadastrada",
            diagnosis: "Pneumonia Nosocomial Grave na UTI",
            currentMeds: "Nenhum"
        },
        prescription: {
            drug: "Gentamicina (Injetável)",
            dose: "80 mg",
            route: "Intravenosa (IV)",
            freq: "A cada 8 horas (8/8h)",
            duration: "7 dias"
        },
        drugDetails: {
            name: "Gentamicina",
            class: "Aminoglicosídeo",
            indication: "Infecções graves por germes gram-negativos resistentes.",
            alert: "Janela terapêutica estreita. Alta ototoxicidade e toxicidade renal direta cumulativa.",
            rule: "Com Clearance de Creatinina abaixo de 50 mL/min, é obrigatório aumentar o intervalo para 12h ou 24h para permitir eliminação antes da nova dose.",
            halfLife: "Meia-vida (t1/2): ~2.0 horas normais. Com ClCr de 32, a meia-vida se estende para mais de 10 horas devido à excreção comprometida!"
        },
        correctDecision: "AJUSTAR",
        explanation: "A Gentamicina é eliminada exclusivamente por filtração renal. Com depuração renal em 32 mL/min, a administração de 8/8h causará acúmulo exponencial no sangue, lesionando irreversivelmente a audição e os rins.",
        incorrectText: "Incorreto! Gentamicina tem janela terapêutica extremamente estreita. Aprovar essa dose vai induzir lesão renal aguda severa e ototoxicidade.",
        kinetics: {
            halfLife: 10.0,
            doseAmt: 1.5,
            interval: 8,
            state: "toxic",
            desc: "Meia-vida estendida impede clareamento e acumula o fármaco na zona de toxicidade."
        }
    },
    {
        semester: 5,
        patient: {
            name: "Julio Cesar Mendes",
            age: "51 anos",
            weight: "92 kg",
            renal: "18 mL/min (Insuficiência Renal Crônica Terminal)",
            allergies: "Nenhuma",
            diagnosis: "Crise Gota Inflamatória Aguda no dedão do pé",
            currentMeds: "Alopurinol 100mg/dia"
        },
        prescription: {
            drug: "Ibuprofeno",
            dose: "600 mg",
            route: "Via Oral (VO)",
            freq: "A cada 8 horas (8/8h)",
            duration: "5 dias"
        },
        drugDetails: {
            name: "Ibuprofeno",
            class: "Anti-inflamatório Não Esteroidal (AINE)",
            indication: "Artrites e processos inflamatórios agudos.",
            alert: "A inibição de prostaglandinas renais reduz bruscamente o fluxo e pressão de perfusão arterial renal.",
            rule: "Contraindicado de forma absoluta para pacientes com Clearance Renal de Creatinina < 30 mL/min devido à precipitação imediata de falência renal.",
            halfLife: "Meia-vida (t1/2): ~2.0 horas. Porém, o impacto dinâmico na microcirculação do glomérulo é crítico e imediato."
        },
        correctDecision: "REJEITAR",
        explanation: "Em paciente com filtração renal de 18 mL/min, qualquer AINE (como Ibuprofeno) bloqueia a síntese de prostaglandinas e interrompe a perfusão do glomérulo. Isso anula a pouca filtração restante, enviando o paciente direto para diálise emergencial.",
        incorrectText: "Incorreto! Ajustar a dosagem não elimina a restrição fisiológica. AINEs são contraindicados de maneira total em quadros de lesão renal crônica grave.",
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
        semester: 6,
        patient: {
            name: "Maria de Lourdes Oliveira",
            age: "45 anos",
            weight: "70 kg",
            renal: "95 mL/min (Função Saudável)",
            allergies: "Ácido Acetilsalicílico (AAS)",
            diagnosis: "Trombose Venosa Profunda (TVP) em perna esquerda",
            currentMeds: "Varfarina 5mg/dia"
        },
        prescription: {
            drug: "Aspirina (AAS)",
            dose: "500 mg",
            route: "Via Oral (VO)",
            freq: "A cada 6 horas (6/6h) se dor",
            duration: "Se necessário"
        },
        drugDetails: {
            name: "Ácido Acetilsalicílico (AAS)",
            class: "Anti-inflamatório/Antiplaquetário",
            indication: "Inibição de agregação plaquetária, analgésico.",
            alert: "Alergia cruzada conhecida com salicilatos. Sinergismo aditivo com anticoagulantes.",
            rule: "Contraindicado para alérgicos a salicilatos. A interação farmacodinâmica entre Varfarina e AAS multiplica exponencialmente o tempo de sangramento, causando hemorragias.",
            halfLife: "Meia-vida (t1/2): ~3.0 horas para dose baixa. A inibição de plaquetas é irreversível pelos 7 dias de vida de cada célula."
        },
        correctDecision: "REJEITAR",
        explanation: "O paciente tem alergia documentada ao AAS. Além disso, a combinação de AAS com Varfarina gera uma interação perigosa de sinergismo hemostático, com altíssimo risco de sangramento gastrointestinal maciço e fatal. Deve ser rejeitado.",
        incorrectText: "Erro clínico grave! O paciente possui alergia documentada e já está anticoagulado. Aprovar ou tentar ajustar coloca a vida do paciente em risco por hemorragia aguda.",
        kinetics: {
            halfLife: 3.0,
            doseAmt: 1.7,
            interval: 6,
            state: "toxic",
            desc: "O sinergismo de ação anula as barreiras de coagulação de forma perigosa."
        }
    },
    {
        semester: 6,
        patient: {
            name: "Ana Julia Lima",
            age: "34 anos",
            weight: "58 kg",
            renal: "88 mL/min (Adequado)",
            allergies: "Pólen e Dipirona",
            diagnosis: "Hipertensão Arterial com taquicardia",
            currentMeds: "Salbutamol (Spray Inalatório SOS contra Crises de Asma)"
        },
        prescription: {
            drug: "Propranolol",
            dose: "40 mg",
            route: "Via Oral (VO)",
            freq: "A cada 12 horas (12/12h)",
            duration: "Uso Contínuo"
        },
        drugDetails: {
            name: "Propranolol",
            class: "Beta-bloqueador Não Seletivo",
            indication: "Hipertensão, arritmias, taquicardia.",
            alert: "Bloqueia receptores Beta-1 cardíacos e simultaneamente os receptores Beta-2 pulmonares.",
            rule: "Contraindicado de forma absoluta em pacientes com asma ativa ou broncoespasmo crônico. Ao bloquear receptores pulmonares Beta-2, anula a ação do Salbutamol e causa crise asmática irreversível.",
            halfLife: "Meia-vida (t1/2): ~4.0 horas. O bloqueio de receptores pulmonares impede a dilatação brônquica vital."
        },
        correctDecision: "REJEITAR",
        explanation: "O Propranolol bloqueia não-seletivamente os receptores pulmonares Beta-2. Se a paciente asmatica precisar do Salbutamol (um agonista Beta-2), o medicamento de resgate será ineficaz devido ao bloqueio físico pelo Propranolol, desencadeando asfixia grave.",
        incorrectText: "Erro letal! O Propranolol causará um broncoespasmo severo que não poderá ser revertido pelo Salbutamol de resgate, gerando insuficiência respiratória imediata.",
        kinetics: {
            halfLife: 4.0,
            doseAmt: 1.0,
            interval: 12,
            state: "toxic",
            desc: "Bloqueio contínuo e irreversível de receptores pulmonares Beta-2."
        }
    },
    {
        semester: 6,
        patient: {
            name: "Dona Leonor Vieira",
            age: "79 anos",
            weight: "50 kg",
            renal: "42 mL/min (Função Reduzida pela Idade)",
            allergies: "Nenhuma",
            diagnosis: "Insuficiência Cardíaca Congestiva (ICC) com fibrilação",
            currentMeds: "Digoxina 0.25 mg/dia"
        },
        prescription: {
            drug: "Amiodarona",
            dose: "200 mg",
            route: "Via Oral (VO)",
            freq: "A cada 8 horas (8/8h)",
            duration: "Fase de Carga por 5 dias"
        },
        drugDetails: {
            name: "Amiodarona",
            class: "Antiarrítmico Classe III",
            indication: "Arritmias ventriculares e supraventriculares.",
            alert: "Inibe fortemente a glicoproteína-P (gp-P) e o citocromo CYP3A4, reduzindo o clearance sistêmico da Digoxina.",
            rule: "Ao introduzir Amiodarona a um paciente usando Digoxina, a dose de Digoxina DEVE ser reduzida preventivamente em 50% para evitar intoxicação digitálica com arritmias mortais.",
            halfLife: "Meia-vida (t1/2): Amiodarona possui meia-vida extraordinária de até 60 dias! Ela satura tecidos e reduz a excreção de digoxina continuamente."
        },
        correctDecision: "AJUSTAR",
        explanation: "A Amiodarona bloqueia a depuração da Digoxina. Se ambas as doses cheias forem administradas simultaneamente, os níveis plasmáticos de Digoxina escalarão para a faixa de toxicidade (parada por assistolia ou bloqueio atrioventricular total). Deve-se solicitar o ajuste (redução imediata da Digoxina).",
        incorrectText: "Erro perigoso! Introduzir Amiodarona sem diminuir a dose da Digoxina em uso causará intoxicação digitálica severa em menos de 48 horas devido ao acúmulo por bloqueio de transportadores de excreção.",
        kinetics: {
            halfLife: 48.0,
            doseAmt: 2.0,
            interval: 8,
            state: "toxic",
            desc: "Inibição de glicoproteína-P faz a concentração de Digoxina disparar rumo ao nível tóxico."
        }
    }
];
