# ⚖️ Bula, Por Favor! - Clinical Compliance

![Versão](https://img.shields.io/badge/versão-v1.0.0-e8c374?style=flat-square) ![Educacional](https://img.shields.io/badge/fins-educacionais-81c8be?style=flat-square) ![Licença](https://img.shields.io/badge/licença-MIT-a6d189?style=flat-square)

Este é um jogo educacional de triagem farmacêutica para estudantes de Farmácia, inspirado na mecânica de *"Papers, Please"*.

---

## ⚠️ Aviso Legal / Disclaimer

> **Simulação educacional com fins didáticos. Todos os casos clínicos apresentados são fictícios e foram criados exclusivamente para fins de aprendizagem acadêmica. Este jogo NÃO substitui o julgamento clínico profissional, a orientação de um farmacêutico habilitado ou qualquer forma de aconselhamento médico. Nunca tome decisões sobre saúde com base neste simulador.**

---

## 🎮 Como o Jogo Funciona

O jogo simula um **plantão de triagem farmacêutica** em um hospital universitário. A cada rodada, você recebe um prontuário de paciente e uma receita médica — e precisa decidir o que fazer com ela antes de liberar para dispensação.

### 1. Seleção de Nível (Tela Inicial)

Antes de começar, escolha um dos quatro modos de jogo, filtrados por complexidade curricular:

| Modo | Semestre | Foco clínico |
|---|---|---|
| **4º Semestre: Geral** | 4º | Farmacodinâmica básica, toxicidade aguda simples (ex: paracetamol) |
| **5º Semestre: Cinética** | 5º | Clearance renal, ajuste de dose por depuração biológica |
| **6º Semestre: Avançado** | 6º | Interações medicamentosas, antagonismo de receptores, polifarmácia |
| **Mesa Clínica Completa** | Todos | Todos os casos misturados em ordem aleatória |

### 2. A Interface de Jogo (Canvas)

Ao entrar no plantão, a tela é dividida em duas áreas principais:

- **Lado esquerdo — Prontuário e Receita:** exibe os dados do paciente (nome, idade, peso, função renal, alergias, diagnóstico, medicamentos em uso) e a receita prescrita (fármaco, dose, via, frequência e duração).
- **Lado direito — Manual Clínico:** uma referência consultável com três abas:
  - **Bulas** — informações do fármaco prescrito (classe, indicação, alertas de segurança, regra de dosagem, meia-vida)
  - **Interações** — alertas de interação com medicamentos que o paciente já usa
  - **Gráfico** — curva de concentração plasmática (farmacocinética) simulada, mostrando se a dose está na faixa terapêutica, tóxica ou abaixo do MEC

### 3. Tomando a Decisão (O Carimbo)

O fluxo de decisão é sempre o mesmo — dois cliques:

```
1. Clique em um dos três carimbos de decisão:
   [ ✅ APROVAR ]   [ ⚠️ AJUSTAR ]   [ ❌ REJEITAR ]

2. Clique sobre a receita médica para aplicar o carimbo.

3. Clique em "CONFIRMAR DECISÃO" para registrar seu aval.
```

Após confirmar, o jogo exibe o **feedback clínico** com a justificativa da decisão correta — e um clique em qualquer lugar avança para o próximo caso.

### 4. Pontuação e Advertências

| Evento | Efeito |
|---|---|
| Decisão correta | +CR$ 50,00 na pontuação |
| Decisão errada | +1 advertência |
| 3 advertências acumuladas | **Game Over** — licença cassada |
| Todos os casos concluídos | **Vitória** — plantão aprovado |

### 5. Fim de Jogo

- **Vitória:** você esgotou todos os prontuários do modo selecionado sem atingir o limite de erros.
- **Derrota:** você acumulou **3 advertências** — o jogo encerra e exibe o resumo com acertos, erros e balanço final em créditos.

Após qualquer encerramento, o botão **"Retornar ao Seletor de Nível"** reinicia tudo do zero.

---

## 📁 Estrutura de Pastas

Abaixo está o mapa de organização do código:

```
├── index.html            # Estrutura visual da página (telas de início, fim e layout)
├── package.json          # Gerenciamento de dependências do projeto
├── README.md             # Esta documentação
├── src/
│   ├── main.ts           # Inicializador do jogo (gerencia cliques e eventos)
│   ├── style.css         # Estilização visual básica
│   ├── audio/
│   │   └── synth.ts      # Gerador dos efeitos sonoros (carimbos, acertos e erros)
│   ├── data/
│   │   └── cases.ts      # Banco de dados com os CASOS CLÍNICOS (Edite aqui!)
│   ├── game/
│   │   ├── state.ts      # Memória do jogo (pontuação, erros, modo ativo)
│   │   └── logic.ts      # Regras de decisão clínica
│   └── render/
│       ├── canvas.ts     # Desenho do prontuário, receitas e manuais no canvas
│       └── layout.ts     # Coordenadas físicas dos botões na tela
```

---

## 🚀 Como Executar o Jogo Localmente

Para rodar o jogo no seu computador:

1. Instale as dependências (necessário apenas na primeira vez):
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Abra o link fornecido no terminal (geralmente `http://localhost:5173`) no seu navegador.

---

## 📝 Como Adicionar ou Modificar Casos Clínicos (Para Farmácia)

Todos os casos clínicos estão listados no arquivo **`src/data/cases.ts`**.
Para adicionar um novo caso clínico, você só precisa copiar o modelo abaixo, preenchê-lo com as informações clínicas e colá-lo dentro do array `allCases` (separando os casos por uma vírgula `,`).

### 📋 Modelo de Caso Clínico para Copiar e Colar

```typescript
    {
        semester: 4, // 4, 5 ou 6 (período acadêmico em que o caso se encaixa)
        patient: {
            name: "Nome Completo do Paciente",
            age: "Idade (ex: 45 anos)",
            weight: "Peso (ex: 70 kg)",
            renal: "Função Renal (ex: 95 mL/min (Função Saudável))",
            allergies: "Alergias relatadas ou 'Nenhuma'",
            diagnosis: "Diagnóstico médico ou queixa do paciente",
            currentMeds: "Medicamentos que o paciente já toma ou 'Nenhum'"
        },
        prescription: {
            drug: "Nome do Fármaco Prescrito",
            dose: "Dosagem (ex: 500 mg)",
            route: "Via de administração (ex: Via Oral (VO))",
            freq: "Frequência (ex: A cada 8 horas (8/8h))",
            duration: "Duração do tratamento (ex: 10 dias)"
        },
        drugDetails: {
            name: "Nome do Fármaco",
            class: "Classe farmacológica do medicamento",
            indication: "Para que é indicado nas bulas clássicas",
            alert: "Alertas graves de segurança clínica",
            rule: "Regra acadêmica de dosagem ideal ou contraindicação",
            halfLife: "Informação sobre meia-vida (t1/2) do fármaco"
        },
        correctDecision: "APROVAR", // Deve ser exatamente "APROVAR", "AJUSTAR" ou "REJEITAR"
        explanation: "Explicação detalhada de por que essa decisão é a correta. Esse texto aparecerá na tela se o estudante acertar.",
        incorrectText: "Explicação do erro cometido. Esse texto aparecerá na tela se o estudante errar.",
        kinetics: {
            halfLife: 3.0,     // Tempo de meia-vida em número (ex: 3.0 para 3 horas)
            doseAmt: 1.0,      // Altura da dose no gráfico (use valores entre 0.8 e 2.0)
            interval: 8,       // Frequência das doses em horas (ex: 8 para 8/8h)
            state: "therapeutic", // Use "therapeutic" (seguro), "toxic" (tóxico) ou "ineffective" (abaixo do MEC)
            desc: "Mensagem curta que aparece abaixo do gráfico explicando a curva plasmática."
        }
    },
```

### ⚠️ Dicas Importantes para Cadastro:
* **`correctDecision`**: Digite exatamente em letras maiúsculas: `"APROVAR"`, `"AJUSTAR"` ou `"REJEITAR"`.
* **`kinetics.state`**: Deve ser exatamente um destes três: `"therapeutic"`, `"toxic"` ou `"ineffective"`.
* Certifique-se de fechar as chaves `{}` e colocar uma vírgula `,` antes do próximo caso.
