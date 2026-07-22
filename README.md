# ⚖️ Bula, Por Favor! - Clinical Compliance

![Versão](https://img.shields.io/badge/versão-v2.0.0-e8c374?style=flat-square) ![Educacional](https://img.shields.io/badge/fins-educacionais-81c8be?style=flat-square) ![Licença](https://img.shields.io/badge/licença-MIT-a6d189?style=flat-square)

Jogo educacional de triagem farmacêutica para estudantes de Farmácia, inspirado na mecânica de *"Papers, Please"*.

> **Nota de versão:** a partir da v2.0.0, o jogo abandonou a renderização em `<canvas>` e o sistema de temas trocáveis. A interface agora é feita inteiramente em **DOM + Tailwind CSS**, o que trouxe mais legibilidade, responsividade e acessibilidade — trade-off consciente em relação à v1.0.0 (canvas + pixel art).

---

## ⚠️ Aviso Legal / Disclaimer

> **Simulação educacional com fins didáticos. Todos os casos clínicos apresentados são fictícios e foram criados exclusivamente para fins de aprendizagem acadêmica. Este jogo NÃO substitui o julgamento clínico profissional, a orientação de um farmacêutico habilitado ou qualquer forma de aconselhamento médico. Nunca tome decisões sobre saúde com base neste simulador.**

---

## 🎮 Como o Jogo Funciona

O jogo simula um **plantão de triagem farmacêutica**. A cada rodada, você recebe três documentos sobre o mesmo paciente e precisa decidir o que fazer com a prescrição antes de liberar a dispensação.

### 1. Seleção de Semestre (Modal Inicial)

| Modo | Foco clínico |
|---|---|
| **4º Semestre: Geral** | Farmacodinâmica básica, toxicidade aguda simples |
| **5º Semestre: Cinética** | Clearance renal, ajuste de dose por depuração biológica |
| **6º Semestre: Avançado** | Interações medicamentosas, antagonismo de receptores, polifarmácia |
| **Mesa Clínica Completa** | Todos os casos misturados em ordem aleatória |

### 2. Os Três Documentos do Caso

- **Doc. 1 — Ficha do Paciente:** sintomas relatados, comorbidades crônicas, alergias.
- **Doc. 2 — Laudo Clínico:** diagnóstico, exames laboratoriais relevantes, observação do médico responsável.
- **Doc. 3 — Prescrição:** fármaco, dose, frequência, duração e outros medicamentos em uso — é aqui que o carimbo é aplicado.

### 3. Manual de Referência (Modal "Bulário")

Consultável em qualquer momento antes de decidir, com duas abas:
- **Fármacos & Dosagens** — dados de referência do medicamento prescrito.
- **Gráfico PK** — curva de concentração plasmática calculada a partir da farmacocinética real do caso (`kinetics`), indicando se a dose projetada cai na faixa terapêutica, tóxica ou abaixo do nível mínimo eficaz.

### 4. Tomando a Decisão (O Carimbo)

```
1. Clique em um dos três carimbos no painel "Porta-Carimbos":
   [ ✅ APROVAR ]   [ ⚠️ AJUSTAR ]   [ ❌ RECUSAR ]

2. Clique sobre o Doc. 3 (Prescrição) para aplicar o carimbo escolhido.
   (Pressione ESC ou "Soltar Carimbo" para desistir da seleção)
```

Ao aplicar, um modal de feedback exibe a explicação clínica do caso e o acerto/erro é registrado. Fechar o modal avança para o próximo paciente.

### 5. Pontuação e Advertências

| Evento | Efeito |
|---|---|
| Decisão correta | +CR$ 150,00 na pontuação |
| Decisão errada | +1 advertência |
| 3 advertências acumuladas | **Game Over** — licença cassada |
| Todos os casos concluídos | **Vitória** — plantão aprovado |

O cabeçalho exibe em tempo real: pontuação, advertências (`X / 3`) e total de atendimentos realizados.

---

## 📁 Estrutura de Pastas

```
├── index.html                  # Estrutura DOM completa (docs, modais, cabeçalho)
├── package.json
├── README.md
├── src/
│   ├── main.ts                 # Orquestrador: listeners de UI + ligação logic ↔ render
│   ├── style.css
│   ├── audio/
│   │   └── soundEngine.ts      # Síntese de efeitos sonoros (Web Audio API)
│   ├── data/
│   │   └── cases.ts            # Banco de casos clínicos (Edite aqui!)
│   ├── game/
│   │   ├── state.ts            # Memória do jogo (score, warnings, caso atual, modais abertos)
│   │   └── logic.ts            # Regras puras de decisão — sem acesso a DOM
│   ├── render/
│   │   ├── patientDoc.ts       # Doc. 1 — Ficha do paciente
│   │   ├── labsDoc.ts          # Doc. 2 — Laudo clínico
│   │   ├── prescriptionDoc.ts  # Doc. 3 — Prescrição + overlay do carimbo
│   │   ├── stampPanel.ts       # Painel de carimbos + cursor flutuante
│   │   ├── manualModal.ts      # Modal do bulário (abas + gráfico PK)
│   │   └── feedbackModal.ts    # Modal de acerto/erro
│   └── services/
│       └── bulaService.ts      # Busca dados reais de medicamento (hoje: mock — ver seção Backend)
```

---

## 🚀 Como Executar Localmente

```bash
npm install
npm run dev
```

Abra o link do terminal (geralmente `http://localhost:5173`).

Para rodar os testes automatizados da lógica de jogo:

```bash
npm run test
```

---

## 🔌 Conexão com o Backend

O jogo consulta dados reais de medicamentos através de um backend próprio (repositório separado: `bula-por-favor-api`), que atua como proxy seguro para a API do [Bulário Digital](https://bulario.app.br/docs/).

- **Local:** crie um arquivo `.env` na raiz com `VITE_API_URL=http://localhost:3000`.
- **Produção:** configure `VITE_API_URL` nas variáveis de ambiente do Vercel, apontando para a URL do backend publicado no Render. **Variáveis do Vite são resolvidas no build** — após alterar o valor, é necessário disparar um novo deploy.
- Enquanto o backend não estiver publicado, `src/services/bulaService.ts` retorna dados mockados — o restante do jogo funciona normalmente sem depender dele.

---

## 📝 Como Adicionar ou Modificar Casos Clínicos (Para Farmácia)

Os casos estão em **`src/data/cases.ts`**. Copie o modelo abaixo, preencha e adicione ao array (separando por vírgula):

```typescript
{
    id: 7,
    semesterTag: "4º Semestre: Geral", // ou "5º Semestre: Cinética" / "6º Semestre: Avançado"
    avatarIcon: "fa-user",             // ícone Font Awesome do paciente
    patientName: "Nome Completo do Paciente",
    age: "Idade (ex: 45 anos)",
    weight: "Peso (ex: 70 kg)",
    speech: "Frase em 1ª pessoa contando o motivo da consulta.",
    doc1: {
        symptoms: '"Sintomas relatados entre aspas."',
        chronic: "Comorbidade crônica ou 'Nenhuma'",
        allergies: "Alergias relatadas ou 'Nenhuma'"
    },
    doc2: {
        diagnosis: "Diagnóstico médico",
        labsHtml: `
            <div class="flex justify-between border-b border-[#dcd1be] pb-1">
                <span>Nome do exame:</span>
                <span class="font-bold">Resultado</span>
            </div>
        `,
        doctorObs: '"Observação curta do médico responsável."',
        doctorName: "Dr(a). Nome • CRM 00000"
    },
    doc3: {
        drug: "NOME DO FÁRMACO DOSE",
        dose: "Descrição completa da posologia prescrita",
        freq: "Frequência (ex: 3 vezes ao dia)",
        duration: "Duração do tratamento",
        otherDrugs: "Outros medicamentos em uso ou 'Nenhum'"
    },
    correctDecision: "APROVAR", // Deve ser exatamente "APROVAR", "AJUSTAR" ou "RECUSAR"
    explanation: "<strong>Decisão Correta: [...].</strong><br><br>Explicação clínica completa exibida no feedback, seja a decisão certa ou errada.",
    kinetics: {
        halfLife: 3.0,          // meia-vida em horas
        doseAmt: 1.0,           // altura da dose no gráfico (0.8 a 2.0)
        interval: 8,            // intervalo entre doses em horas
        state: "therapeutic",   // "therapeutic" | "toxic" | "ineffective"
        desc: "Mensagem curta explicando a curva plasmática."
    }
}
```

### ⚠️ Dicas Importantes para Cadastro
* **`correctDecision`**: exatamente `"APROVAR"`, `"AJUSTAR"` ou `"RECUSAR"` (maiúsculas).
* **`kinetics.state`**: exatamente `"therapeutic"`, `"toxic"` ou `"ineffective"`.
* `labsHtml` aceita HTML simples (é inserido diretamente na tela) — mantenha a mesma estrutura de `<div>` dos exemplos para não quebrar o estilo.

---

## 🧪 Testes

A lógica de jogo (`src/game/logic.ts`) é desacoplada do DOM e testada com **Vitest**:

```bash
npm run test
```

Cobertura atual: comparação de decisão correta/incorreta, incremento de pontuação e advertências, e disparo de fim de jogo ao atingir o limite de erros.

---

## 🤝 Créditos

Casos clínicos revisados em colaboração com Ananda Moreno, estudante de Farmácia (conteúdo técnico). Engenharia e arquitetura do jogo por Jadson Yan.