import type { GameState } from '../game/state';
import type { Layout } from './layout';
import type { Case } from '../data/cases';

export function drawGame(ctx: CanvasRenderingContext2D, state: GameState, layout: Layout): void {
    if (!state.gameActive) return;

    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    // Fundo estilo mesa burocrática de triagem
    ctx.fillStyle = "#1e1d1a";
    ctx.fillRect(0, 0, width, height);

    // Detalhe rústico de ranhuras de mesa
    ctx.strokeStyle = "#2e2d27";
    ctx.lineWidth = 1;
    for (let i = 0; i < height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
    }

    const currentCase = state.currentCasesList[state.currentCaseIdx];
    if (!currentCase) return;

    // 1. RENDERIZAR PRONTUÁRIO DO PACIENTE (Esquerda - Fundo Bege Envelhecido Claro)
    drawPaper(ctx, layout.patientCard.x, layout.patientCard.y, layout.patientCard.w, layout.patientCard.h, "PRONTUÁRIO CLÍNICO", "#faf7eb");
    
    ctx.fillStyle = "#111111"; 
    ctx.font = "bold 11px monospace"; 
    let py = layout.patientCard.y + 55;
    const px = layout.patientCard.x + 20;

    py = wrapText(ctx, "PACIENTE: " + currentCase.patient.name, px, py, 250, 15);
    py = wrapText(ctx, "IDADE: " + currentCase.patient.age + " | PESO: " + currentCase.patient.weight, px, py, 250, 15);
    
    // Destacar função renal em vermelho de alta nitidez - QUEBRA DE TEXTO CONTRA VAZAMENTOS
    ctx.fillStyle = "#c0392b";
    py = wrapText(ctx, "DEP. RENAL (ClCr): " + currentCase.patient.renal, px, py, 250, 15);
    
    ctx.fillStyle = "#111111";
    py = wrapText(ctx, "ALERGIAS RELATADAS:", px, py, 250, 14);
    ctx.font = "bold 12px monospace";
    ctx.fillStyle = currentCase.patient.allergies !== "Nenhuma" && currentCase.patient.allergies !== "Nenhuma conhecida em prontuário" ? "#c0392b" : "#27ae60";
    py = wrapText(ctx, "👉 " + currentCase.patient.allergies, px, py, 250, 15);

    ctx.fillStyle = "#111111";
    ctx.font = "bold 11px monospace";
    py = wrapText(ctx, "HISTÓRICO / DIAGNÓSTICO ATUAL:", px, py, 250, 14);
    ctx.font = "italic 11px monospace";
    py = wrapText(ctx, currentCase.patient.diagnosis, px, py, 250, 14);
    py += 5;

    ctx.fillStyle = "#111111";
    ctx.font = "bold 11px monospace";
    py = wrapText(ctx, "FÁRMACOS EM USO CONCOMITANTE:", px, py, 250, 14);
    ctx.font = "bold 11px monospace";
    ctx.fillStyle = currentCase.patient.currentMeds !== "Nenhum" && currentCase.patient.currentMeds !== "Nenhum no momento" ? "#d35400" : "#111111";
    py = wrapText(ctx, "💊 " + currentCase.patient.currentMeds, px, py, 250, 14);

    // 2. RENDERIZAR RECEITA MÉDICA (Meio - Fundo Branco Padrão)
    drawPaper(ctx, layout.prescription.x, layout.prescription.y, layout.prescription.w, layout.prescription.h, "RECEITUÁRIO MÉDICO", "#ffffff");
    
    ctx.fillStyle = "#111111";
    ctx.font = "bold 12px monospace";
    let ry = layout.prescription.y + 60;
    const rx = layout.prescription.x + 20;

    // Logotipo de Clinica Médica Burocrática
    ctx.strokeStyle = "#27ae60";
    ctx.lineWidth = 1;
    ctx.strokeRect(layout.prescription.x + 245, layout.prescription.y + 12, 25, 25);
    ctx.fillStyle = "#27ae60";
    ctx.font = "bold 18px sans-serif";
    ctx.fillText("+", layout.prescription.x + 251, layout.prescription.y + 31);

    ctx.fillStyle = "#111111";
    ctx.font = "bold 13px monospace";
    ry = wrapText(ctx, "R/ Prescrição:", rx, ry, 250, 15); ry += 20;
    
    ctx.font = "bold 14px monospace";
    ctx.fillStyle = "#0c2340";
    ry = wrapText(ctx, "▶ " + currentCase.prescription.drug, rx, ry, 250, 15); ry += 22;
    
    ctx.font = "12px monospace";
    ctx.fillStyle = "#111111";
    ry = wrapText(ctx, "DOSE: " + currentCase.prescription.dose, rx, ry, 250, 15); ry += 18;
    ry = wrapText(ctx, "VIA: " + currentCase.prescription.route, rx, ry, 250, 15); ry += 18;
    ry = wrapText(ctx, "FREQUÊNCIA: " + currentCase.prescription.freq, rx, ry, 250, 15); ry += 18;
    ry = wrapText(ctx, "DURAÇÃO: " + currentCase.prescription.duration, rx, ry, 250, 15); ry += 35;

    // Linha de assinatura médica
    ctx.strokeStyle = "#7f8c8d";
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.moveTo(rx, ry);
    ctx.lineTo(rx + 250, ry);
    ctx.stroke();
    ctx.setLineDash([]); // Reset de traço pontilhado

    ctx.font = "9px monospace";
    ctx.fillStyle = "#555";
    ctx.fillText("Assinatura do Profissional Registrado", rx, ry + 12);

    // Carimbo aplicado
    if (state.appliedStamp) {
        drawStencilStamp(ctx, layout.prescription.x + 40, layout.prescription.y + 180, state.appliedStamp);
    }

    // 3. RENDERIZAR MANUAL DE REFERÊNCIA DE FARMACOLOGIA (Direita - Livro Aberto)
    drawManualTabs(ctx, state, layout);
    drawManualPage(ctx, state, layout);

    // 4. RENDERIZAR PAINEL DE COMANDO DO JOGADOR (Carimbos de mesa)
    for (let key in layout.stamps) {
        let stampKey = key as "APROVAR" | "AJUSTAR" | "REJEITAR";
        let btn = layout.stamps[stampKey];
        
        if (state.selectedStamp === stampKey) {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(btn.x - 3, btn.y - 3, btn.w + 6, btn.h + 6);
        }

        ctx.fillStyle = btn.color;
        ctx.fillRect(btn.x, btn.y, btn.w, btn.h);
        ctx.strokeStyle = "#44433d";
        ctx.lineWidth = 2;
        ctx.strokeRect(btn.x, btn.y, btn.w, btn.h);

        ctx.fillStyle = "#1a1a15";
        ctx.font = "bold 13px monospace";
        ctx.fillText(btn.text, btn.x + 15, btn.y + 26);
    }

    // Botão CONFIRMAR DECISÃO / ENVIAR RECEITA
    let btnConf = layout.confirmBtn;
    const canConfirm = state.appliedStamp !== null;
    ctx.fillStyle = canConfirm ? "#e8c374" : "#44433d";
    ctx.fillRect(btnConf.x, btnConf.y, btnConf.w, btnConf.h);
    ctx.strokeStyle = "#33322d";
    ctx.lineWidth = 2;
    ctx.strokeRect(btnConf.x, btnConf.y, btnConf.w, btnConf.h);

    ctx.fillStyle = canConfirm ? "#1a1a15" : "#888782";
    ctx.font = "bold 14px monospace";
    ctx.fillText("✓ ENVIAR DECISÃO", btnConf.x + 22, btnConf.y + 30);

    // Overlay de Feedback
    if (state.showingFeedback) {
        drawFeedbackOverlay(ctx, state);
    }
}

export function drawPaper(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, title: string, bgColor: string): void {
    ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;

    ctx.fillStyle = bgColor;
    ctx.fillRect(x, y, w, h);

    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.strokeStyle = "rgba(0,0,0,0.15)";
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 5, y + 5, w - 10, h - 10);

    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.fillRect(x + 5, y + 5, w - 10, 32);

    ctx.fillStyle = "rgba(0,0,0,0.8)";
    ctx.font = "bold 11px monospace";
    ctx.fillText(title, x + 15, y + 24);
}

export function drawManualTabs(ctx: CanvasRenderingContext2D, state: GameState, layout: Layout): void {
    for (let tab of layout.tabs) {
        const isActive = state.currentManualTab === tab.id;
        ctx.fillStyle = isActive ? "#fdf5cc" : "#5a5649";
        
        ctx.beginPath();
        ctx.moveTo(tab.x, tab.y + tab.h);
        ctx.lineTo(tab.x + 4, tab.y);
        ctx.lineTo(tab.x + tab.w - 4, tab.y);
        ctx.lineTo(tab.x + tab.w, tab.y + tab.h);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = "#3a3831";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = isActive ? "#1a1a15" : "#dddcd6";
        ctx.font = "bold 11px monospace";
        ctx.fillText(tab.label, tab.x + 6, tab.y + 22);
    }
}

export function drawManualPage(ctx: CanvasRenderingContext2D, state: GameState, layout: Layout): void {
    const currentCase = state.currentCasesList[state.currentCaseIdx];
    if (!currentCase) return;

    const mx = layout.manual.x;
    const my = layout.manual.y;
    const mw = layout.manual.w;
    const mh = layout.manual.h;

    ctx.fillStyle = "#fdf5cc";
    ctx.fillRect(mx, my, mw, mh);
    ctx.strokeStyle = "#3a3831";
    ctx.lineWidth = 2;
    ctx.strokeRect(mx, my, mw, mh);

    ctx.fillStyle = "#111111";
    let tx = mx + 15;
    let ty = my + 30;

    if (state.currentManualTab === "Bulas") {
        ctx.font = "bold 13px monospace";
        ctx.fillText("BULA: " + currentCase.drugDetails.name.toUpperCase(), tx, ty); ty += 20;
        
        ctx.font = "bold 11px monospace";
        ctx.fillStyle = "#603010";
        ctx.fillText("Classe: " + currentCase.drugDetails.class, tx, ty); ty += 18;
        
        ctx.fillStyle = "#111111";
        ctx.font = "bold 11px monospace";
        ctx.fillText("INDICAÇÃO CLÍNICA:", tx, ty); ty += 14;
        ctx.font = "italic 11px monospace";
        ty = wrapText(ctx, currentCase.drugDetails.indication, tx, ty, mw - 30, 14); ty += 12;

        ctx.font = "bold 11px monospace";
        ctx.fillStyle = "#c0392b";
        ctx.fillText("ALERTA DE SEGURANÇA:", tx, ty); ty += 14;
        ctx.font = "italic 11px monospace";
        ctx.fillStyle = "#111111";
        ty = wrapText(ctx, currentCase.drugDetails.alert, tx, ty, mw - 30, 14); ty += 12;

        ctx.font = "bold 11px monospace";
        ctx.fillStyle = "#4a597a";
        ctx.fillText("⏱️ INFORMAÇÕES DE MEIA-VIDA (t1/2):", tx, ty); ty += 14;
        ctx.font = "bold 11px monospace";
        ctx.fillStyle = "#0c2340";
        ty = wrapText(ctx, currentCase.drugDetails.halfLife, tx, ty, mw - 30, 14); ty += 12;

        ctx.font = "bold 11px monospace";
        ctx.fillStyle = "#0a5c1e";
        ctx.fillText("DIRETRIZ DE DOSAGEM ACADÊMICA:", tx, ty); ty += 14;
        ctx.font = "bold 11px monospace";
        ctx.fillStyle = "#111111";
        ty = wrapText(ctx, currentCase.drugDetails.rule, tx, ty, mw - 30, 14);

    } else if (state.currentManualTab === "Cinetica") {
        ctx.font = "bold 13px monospace";
        ctx.fillText("MANUAL DE FARMACOCINÉTICA", tx, ty); ty += 20;

        ctx.font = "bold 11px monospace";
        ctx.fillStyle = "#d35400";
        ctx.fillText("• Clearance (Depuração Renal):", tx, ty); ty += 14;
        ctx.font = "11px monospace";
        ctx.fillStyle = "#111111";
        ty = wrapText(ctx, "Capacidade de purificação renal por minuto. Quedas expressivas (< 50 mL/min) acumulam substâncias ativas no sangue, necessitando dilatar intervalos (ex: 8/8h passa para 12/12h ou 24/24h).", tx, ty, mw - 30, 14); ty += 12;

        ctx.font = "bold 11px monospace";
        ctx.fillStyle = "#d35400";
        ctx.fillText("• Constante de Eliminação (Ke):", tx, ty); ty += 14;
        ctx.font = "11px monospace";
        ctx.fillStyle = "#111111";
        ty = wrapText(ctx, "A fração do fármaco removida do organismo por unidade de tempo. Diretamente ligada à meia-vida biológica do princípio ativo no sangue.", tx, ty, mw - 30, 14); ty += 12;

        ctx.font = "bold 11px monospace";
        ctx.fillStyle = "#d35400";
        ctx.fillText("• Meia-vida de Eliminação (t 1/2):", tx, ty); ty += 14;
        ctx.font = "11px monospace";
        ctx.fillStyle = "#111111";
        ty = wrapText(ctx, "Tempo requerido para que a concentração plasmática caia exatamente pela metade. Guia a frequência entre doses terapêuticas.", tx, ty, mw - 30, 14);

    } else if (state.currentManualTab === "Dinamica") {
        ctx.font = "bold 13px monospace";
        ctx.fillText("MANUAL DE FARMACODINÂMICA", tx, ty); ty += 20;

        ctx.font = "bold 11px monospace";
        ctx.fillStyle = "#27ae60";
        ctx.fillText("• Receptores Fisiológicos:", tx, ty); ty += 14;
        ctx.font = "11px monospace";
        ctx.fillStyle = "#111111";
        ty = wrapText(ctx, "Proteínas celulares onde o fármaco ancora para estimular (Agonista) ou inibir (Antagonista) cascatas biológicas.", tx, ty, mw - 30, 14); ty += 12;

        ctx.font = "bold 11px monospace";
        ctx.fillStyle = "#27ae60";
        ctx.fillText("• Sinergismo de Adição:", tx, ty); ty += 14;
        ctx.font = "11px monospace";
        ctx.fillStyle = "#111111";
        ty = wrapText(ctx, "Acontece quando fármacos atuam no mesmo caminho biológico somando seus efeitos, o que pode desencadear toxicidade crônica crítica ou hemorragias graves.", tx, ty, mw - 30, 14); ty += 12;

        ctx.font = "bold 11px monospace";
        ctx.fillStyle = "#27ae60";
        ctx.fillText("• Bloqueio competitivo competitivo:", tx, ty); ty += 14;
        ctx.font = "11px monospace";
        ctx.fillStyle = "#111111";
        ty = wrapText(ctx, "Quando um antagonista se liga ao mesmo receptor fisiológico, impedindo de forma física a ação do agente salvador.", tx, ty, mw - 30, 14);

    } else if (state.currentManualTab === "Seguranca") {
        ctx.font = "bold 13px monospace";
        ctx.fillText("SEGURANÇA & BOAS PRÁTICAS", tx, ty); ty += 20;

        ctx.font = "bold 11px monospace";
        ctx.fillStyle = "#c0392b";
        ctx.fillText("• Alergia Medicamentosa Crônica:", tx, ty); ty += 14;
        ctx.font = "11px monospace";
        ctx.fillStyle = "#111111";
        ty = wrapText(ctx, "Reações imunológicas graves que impedem de forma absoluta qualquer reexposição ao fármaco alergênico, justificando rejeição total imediata.", tx, ty, mw - 30, 14); ty += 12;

        ctx.font = "bold 11px monospace";
        ctx.fillStyle = "#c0392b";
        ctx.fillText("• Limite de Dose Diária Máxima:", tx, ty); ty += 14;
        ctx.font = "11px monospace";
        ctx.fillStyle = "#111111";
        ty = wrapText(ctx, "A quantidade máxima acumulada que o fígado ou os rins toleram em 24h sem falência celular direta (ex: 4g de Paracetamol).", tx, ty, mw - 30, 14); ty += 12;

        ctx.font = "bold 11px monospace";
        ctx.fillStyle = "#c0392b";
        ctx.fillText("• Saturação Enzimática Crônica:", tx, ty); ty += 14;
        ctx.font = "11px monospace";
        ctx.fillStyle = "#111111";
        ty = wrapText(ctx, "Sobrecarga de rotas de clareamento do fígado (CYP3A4), desregulando a meia-vida normal de outras medicações concomitantes do prontuário.", tx, ty, mw - 30, 14);

    } else if (state.currentManualTab === "Janela") {
        // RENDERIZAR O GRÁFICO DINÂMICO DE JANELA TERAPÊUTICA
        drawTherapeuticWindowGraph(ctx, currentCase, tx, ty, mw - 30, mh - 60);
    }
}

export function drawTherapeuticWindowGraph(ctx: CanvasRenderingContext2D, currentCase: Case, tx: number, ty: number, gw: number, _gh: number): void {
    // Título superior
    ctx.fillStyle = "#111111";
    ctx.font = "bold 12px monospace";
    ctx.fillText("SIMULAÇÃO DE JANELA TERAPÊUTICA", tx, ty - 5);
    ctx.font = "italic 9px monospace";
    ctx.fillStyle = "#555";
    ctx.fillText("Curva de Concentração Plasmática Estimada:", tx, ty + 10);

    // Área real do gráfico
    const gx = tx;
    const gy = ty + 20;
    const graphW = gw;
    const graphH = 190;

    // Quadrado de fundo do gráfico
    ctx.fillStyle = "#faf5df";
    ctx.fillRect(gx, gy, graphW, graphH);
    ctx.strokeStyle = "#4a483a";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(gx, gy, graphW, graphH);

    // Divisões e preenchimentos das faixas
    const toxicLimitY = gy + graphH * 0.28;
    const effectiveLimitY = gy + graphH * 0.72;

    // Faixa Tóxica (Vermelha clara)
    ctx.fillStyle = "rgba(231, 130, 132, 0.15)";
    ctx.fillRect(gx, gy, graphW, toxicLimitY - gy);

    // Faixa Terapêutica (Verde clara)
    ctx.fillStyle = "rgba(166, 209, 137, 0.15)";
    ctx.fillRect(gx, toxicLimitY, graphW, effectiveLimitY - toxicLimitY);

    // Faixa Inefetiva (Cinza clara)
    ctx.fillStyle = "rgba(150, 150, 150, 0.08)";
    ctx.fillRect(gx, effectiveLimitY, graphW, gy + graphH - effectiveLimitY);

    // Traçar linhas de limite em traçado pontilhado
    ctx.save();
    ctx.setLineDash([4, 4]);
    
    // MTC (Mínimo Tóxico)
    ctx.strokeStyle = "#c0392b";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(gx, toxicLimitY);
    ctx.lineTo(gx + graphW, toxicLimitY);
    ctx.stroke();

    // MEC (Mínimo Efetivo)
    ctx.strokeStyle = "#27ae60";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(gx, effectiveLimitY);
    ctx.lineTo(gx + graphW, effectiveLimitY);
    ctx.stroke();
    ctx.restore();

    // Rótulos explicativos das zonas
    ctx.font = "bold 9px monospace";
    ctx.fillStyle = "#c0392b";
    ctx.fillText("⚠️ ZONA TÓXICA (MTC)", gx + 8, toxicLimitY - 6);

    ctx.fillStyle = "#27ae60";
    ctx.fillText("✅ FAIXA TERAPÊUTICA (MEC)", gx + 8, effectiveLimitY - 6);

    ctx.fillStyle = "#7f8c8d";
    ctx.fillText("❌ ZONA INEFETIVA", gx + 8, gy + graphH - 10);

    // Simulação matemática da curva de acúmulo de acordo com o caso clínico
    const kParams = currentCase.kinetics;
    const pts = [];
    const numPoints = 120;

    // Variáveis matemática ajustáveis baseadas nas taxas do caso
    let halfLife = kParams.halfLife;
    let interval = kParams.interval;
    let doseAmt = kParams.doseAmt;
    let state = kParams.state; // 'therapeutic', 'toxic', 'ineffective'

    // Cálculo da constante de eliminação ke baseado no t1/2 real do fármaco
    let ke = 0.693 / halfLife;
    let ka = 2.0; // Velocidade padrão de absorção intestinal ou tecidual

    // Cálculo dos pontos em tempo acumulado de doses sucessivas
    for (let i = 0; i <= numPoints; i++) {
        let t = (i / numPoints) * 36; // Projeta curva ao longo de 36 horas
        let conc = 0;

        // Somatória de contribuições cumulativas de múltiplas doses
        let doseTimes = [0, interval, interval * 2, interval * 3, interval * 4];
        for (let dTime of doseTimes) {
            if (t >= dTime) {
                let dt = t - dTime;
                // Equação clássica de absorção e eliminação simultânea de modelo monocompartimental
                conc += doseAmt * (Math.exp(-ke * dt) - Math.exp(-ka * dt));
            }
        }

        // Escalador vertical do gráfico de acordo com o estado pretendido
        let scaleY = 48;
        if (state === "toxic") scaleY = 55;
        if (state === "ineffective") scaleY = 22;

        let pxCoord = gx + (i / numPoints) * graphW;
        let pyCoord = (gy + graphH) - (conc * scaleY) - 5;

        // Bloqueador de extrapolação visual de limites de tela
        if (pyCoord < gy + 2) pyCoord = gy + 2;
        if (pyCoord > gy + graphH - 2) pyCoord = gy + graphH - 2;

        pts.push({ x: pxCoord, y: pyCoord });
    }

    // Desenhar a linha contínua da curva plasmática do fármaco
    ctx.strokeStyle = "#34495e";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
    }
    ctx.stroke();

    // Indicar status atual do paciente de forma clara e legível
    let statusText = "STATUS: TERAPÊUTICO ✅";
    let statusColor = "#27ae60";
    if (state === "toxic") {
        statusText = "STATUS: TÓXICO / RISCO DE FALÊNCIA ⚠️";
        statusColor = "#c0392b";
    } else if (state === "ineffective") {
        statusText = "STATUS: INEFETIVO / FALHA DO CICLO ❌";
        statusColor = "#e67e22";
    }

    ctx.fillStyle = statusColor;
    ctx.font = "bold 10px monospace";
    ctx.fillText(statusText, gx, gy + graphH + 18);

    // Caixa de diagnóstico detalhado de meia-vida
    ctx.fillStyle = "#111111";
    ctx.font = "9px monospace";
    wrapText(ctx, "Conclusão: " + kParams.desc, gx, gy + graphH + 30, graphW, 11);
}

export function drawStencilStamp(ctx: CanvasRenderingContext2D, x: number, y: number, type: "APROVAR" | "AJUSTAR" | "REJEITAR"): void {
    ctx.save();
    ctx.translate(x + 100, y + 40);
    ctx.rotate(-0.06);
    ctx.translate(-(x + 100), -(y + 40));

    let text = "";
    let color = "";
    if (type === "APROVAR") { text = "APROVADO"; color = "rgba(39, 174, 96, 0.85)"; }
    if (type === "AJUSTAR") { text = "REQUER AJUSTE"; color = "rgba(211, 84, 0, 0.85)"; }
    if (type === "REJEITAR") { text = "REJEITADO"; color = "rgba(192, 41, 43, 0.85)"; }

    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.setLineDash([15, 2, 8, 3, 12, 1]);
    ctx.strokeRect(x, y, 200, 55);
    ctx.setLineDash([]); 

    ctx.fillStyle = color;
    ctx.font = "bold 22px monospace";
    ctx.fillText(text, x + 20, y + 36);

    ctx.restore();
}

export function drawFeedbackOverlay(ctx: CanvasRenderingContext2D, state: GameState): void {
    ctx.fillStyle = "rgba(10, 10, 10, 0.85)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const ox = 150;
    const oy = 120;
    const ow = 700;
    const oh = 380;

    ctx.fillStyle = "#22211c";
    ctx.fillRect(ox, oy, ow, oh);
    ctx.strokeStyle = state.feedbackSuccess ? "#85b668" : "#e78284";
    ctx.lineWidth = 4;
    ctx.strokeRect(ox, oy, ow, oh);

    ctx.fillStyle = state.feedbackSuccess ? "#85b668" : "#e78284";
    ctx.fillRect(ox, oy, ow, 40);

    ctx.fillStyle = "#12110f";
    ctx.font = "bold 14px monospace";
    const headerTitle = state.feedbackSuccess ? "✦ CONFORMIDADE CLÍNICA VERIFICADA ✦" : "⚠ INCONFORMIDADE GRAVE IDENTIFICADA ⚠";
    ctx.fillText(headerTitle, ox + 140, oy + 26);

    ctx.fillStyle = "#fdf5cc";
    ctx.font = "bold 13px monospace";
    
    const lines = state.feedbackMessage.split("\n");
    let lineY = oy + 80;
    for (let line of lines) {
        lineY = wrapText(ctx, line, ox + 40, lineY, ow - 80, 20);
        lineY += 10;
    }

    ctx.fillStyle = "#888782";
    ctx.font = "bold 12px monospace";
    ctx.fillText("CLIQUE EM QUALQUER LUGAR DA TELA PARA AVANÇAR O CASO...", ox + 130, oy + oh - 30);
}

// Controle de quebra de linhas para evitar sobreposição ou extrapolação física
export function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number): number {
    const words = text.split(" ");
    let line = "";
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + " ";
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, currentY);
            line = words[n] + " ";
            currentY += lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, x, currentY);
    return currentY + lineHeight;
}
