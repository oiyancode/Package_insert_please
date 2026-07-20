export interface Tab {
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
    label: string;
}

export interface StampButton {
    x: number;
    y: number;
    w: number;
    h: number;
    color: string;
    text: string;
}

export interface Layout {
    patientCard: { x: number; y: number; w: number; h: number };
    prescription: { x: number; y: number; w: number; h: number };
    manual: { x: number; y: number; w: number; h: number };
    stamps: {
        APROVAR: StampButton;
        AJUSTAR: StampButton;
        REJEITAR: StampButton;
    };
    tabs: Tab[];
    confirmBtn: { x: number; y: number; w: number; h: number };
}

export const layout: Layout = {
    patientCard: { x: 30, y: 70, w: 290, h: 360 },
    prescription: { x: 340, y: 70, w: 290, h: 360 },
    manual: { x: 650, y: 70, w: 320, h: 480 },
    stamps: {
        APROVAR: { x: 50, y: 460, w: 160, h: 45, color: "#85b668", text: "🟢 APROVAR" },
        AJUSTAR: { x: 230, y: 460, w: 160, h: 45, color: "#e5c890", text: "🟡 AJUSTAR" },
        REJEITAR: { x: 410, y: 460, w: 160, h: 45, color: "#e78284", text: "🔴 REJEITAR" }
    },
    tabs: [
        { id: "Bulas", x: 650, y: 35, w: 60, h: 35, label: "Bula" },
        { id: "Cinetica", x: 712, y: 35, w: 62, h: 35, label: "Cinética" },
        { id: "Dinamica", x: 776, y: 35, w: 62, h: 35, label: "Dinâmica" },
        { id: "Seguranca", x: 840, y: 35, w: 62, h: 35, label: "Segur." },
        { id: "Janela", x: 904, y: 35, w: 66, h: 35, label: "Gráfico 📊" }
    ],
    confirmBtn: { x: 230, y: 530, w: 180, h: 50 }
};
