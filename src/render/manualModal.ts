import type { Kinetics } from '../data/cases';

export function renderManualModal(
    isOpen: boolean,
    activeTab: 'farmacos' | 'cinetica',
    currentKinetics: Kinetics | undefined,
    onClose: () => void,
    onSwitchTab: (tab: 'farmacos' | 'cinetica') => void
): void {
    const modal = document.getElementById('modal-bulario');
    if (!modal) return;

    if (!isOpen) {
        modal.classList.add('hidden');
        return;
    }

    modal.classList.remove('hidden');

    const tabFarmacosEl = document.getElementById('bulario-tab-farmacos');
    const tabCineticaEl = document.getElementById('bulario-tab-cinetica');
    const btnFarmacos = document.getElementById('tab-btn-farmacos');
    const btnCinetica = document.getElementById('tab-btn-cinetica');

    if (activeTab === 'farmacos') {
        if (tabFarmacosEl) tabFarmacosEl.classList.remove('hidden');
        if (tabCineticaEl) tabCineticaEl.classList.add('hidden');

        if (btnFarmacos) {
            btnFarmacos.className = "py-2 px-4 font-bold text-[#d8a048] border-b-2 border-[#d8a048] bg-[#1a191e] rounded-t flex items-center gap-2";
        }
        if (btnCinetica) {
            btnCinetica.className = "py-2 px-4 font-bold text-[#8c8675] hover:text-[#e6dec8] border-b-2 border-transparent rounded-t flex items-center gap-2";
        }
    } else {
        if (tabFarmacosEl) tabFarmacosEl.classList.add('hidden');
        if (tabCineticaEl) tabCineticaEl.classList.remove('hidden');

        if (btnFarmacos) {
            btnFarmacos.className = "py-2 px-4 font-bold text-[#8c8675] hover:text-[#e6dec8] border-b-2 border-transparent rounded-t flex items-center gap-2";
        }
        if (btnCinetica) {
            btnCinetica.className = "py-2 px-4 font-bold text-[#d8a048] border-b-2 border-[#d8a048] bg-[#1a191e] rounded-t flex items-center gap-2";
        }

        const canvas = document.getElementById('pkModalCanvas') as HTMLCanvasElement;
        if (canvas) {
            drawPKCanvas(canvas, currentKinetics);
        }
    }

    if (btnFarmacos) btnFarmacos.onclick = () => onSwitchTab('farmacos');
    if (btnCinetica) btnCinetica.onclick = () => onSwitchTab('cinetica');

    const closeBtn = document.getElementById('close-bulario-btn');
    if (closeBtn) closeBtn.onclick = () => onClose();
}

export function drawPKCanvas(canvas: HTMLCanvasElement, kinetics?: Kinetics): void {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Fundo escuro
    ctx.fillStyle = '#0a0a0c';
    ctx.fillRect(0, 0, w, h);

    if (!kinetics) {
        // Render fallback default static curve if no case kinetics is loaded
        ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
        ctx.fillRect(40, 50, w - 50, 80);

        ctx.strokeStyle = '#f43f5e';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(40, 50);
        ctx.lineTo(w - 10, 50);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.strokeStyle = '#33323f';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(40, 10);
        ctx.lineTo(40, h - 25);
        ctx.lineTo(w - 10, h - 25);
        ctx.stroke();

        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(40, h - 25);
        ctx.quadraticCurveTo(w * 0.3, 15, w - 10, h - 35);
        ctx.stroke();
        return;
    }

    // Dynamic PK Plotting
    const gx = 40, gy = 15, graphW = w - 50, graphH = h - 45;

    // Background zones
    const toxicY = gy + graphH * 0.28;
    const effectiveY = gy + graphH * 0.72;

    ctx.fillStyle = 'rgba(244, 63, 94, 0.12)';
    ctx.fillRect(gx, gy, graphW, toxicY - gy);

    ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
    ctx.fillRect(gx, toxicY, graphW, effectiveY - toxicY);

    ctx.fillStyle = 'rgba(100, 100, 100, 0.08)';
    ctx.fillRect(gx, effectiveY, graphW, gy + graphH - effectiveY);

    // Limit lines
    ctx.save();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(gx, toxicY);
    ctx.lineTo(gx + graphW, toxicY);
    ctx.stroke();

    ctx.strokeStyle = '#10b981';
    ctx.beginPath();
    ctx.moveTo(gx, effectiveY);
    ctx.lineTo(gx + graphW, effectiveY);
    ctx.stroke();
    ctx.restore();

    // Zone Labels
    ctx.font = 'bold 10px monospace';
    ctx.fillStyle = '#f43f5e';
    ctx.fillText('⚠️ ZONA TÓXICA (MTC)', gx + 8, toxicY - 5);

    ctx.fillStyle = '#10b981';
    ctx.fillText('✅ FAIXA TERAPÊUTICA (MEC)', gx + 8, effectiveY - 5);

    ctx.fillStyle = '#9ca3af';
    ctx.fillText('❌ ZONA INEFETIVA', gx + 8, gy + graphH - 8);

    // Eixos
    ctx.strokeStyle = '#33323f';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(gx, gy);
    ctx.lineTo(gx, gy + graphH);
    ctx.lineTo(gx + graphW, gy + graphH);
    ctx.stroke();

    // PK equation: ke = 0.693 / halfLife, ka = 2.0
    const ke = 0.693 / kinetics.halfLife;
    const ka = 2.0;
    const doseInterval = kinetics.interval;
    const doseAmount = kinetics.doseAmt;

    const pts: { x: number; y: number }[] = [];
    const steps = 150;
    const totalTimeHours = 36;
    const doseTimes = [0, doseInterval, doseInterval * 2, doseInterval * 3, doseInterval * 4];

    for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * totalTimeHours;
        let conc = 0;

        for (const dTime of doseTimes) {
            if (t >= dTime) {
                const dt = t - dTime;
                conc += doseAmount * (Math.exp(-ke * dt) - Math.exp(-ka * dt));
            }
        }

        let scaleY = 38;
        if (kinetics.state === 'toxic') scaleY = 48;
        if (kinetics.state === 'ineffective') scaleY = 18;

        const px = gx + (i / steps) * graphW;
        let py = (gy + graphH) - (conc * scaleY) - 5;
        if (py < gy + 2) py = gy + 2;
        if (py > gy + graphH - 2) py = gy + graphH - 2;

        pts.push({ x: px, y: py });
    }

    // Draw plasma concentration curve
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
    }
    ctx.stroke();
}
