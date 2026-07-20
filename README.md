# ⚖️ Bula, Por Favor! - Clinical Compliance

![Versão](https://img.shields.io/badge/versão-v1.0.0-e8c374?style=flat-square) ![Educacional](https://img.shields.io/badge/fins-educacionais-81c8be?style=flat-square) ![Licença](https://img.shields.io/badge/licença-MIT-a6d189?style=flat-square)

Este é um jogo educacional de triagem farmacêutica para estudantes de Farmácia, inspirado na mecânica de *"Papers, Please"*. O projeto foi refatorado utilizando **Vite** e **TypeScript** para garantir organização e facilidade de manutenção de conteúdo.

---

## ⚠️ Aviso Legal / Disclaimer

> **Simulação educacional com fins didáticos. Todos os casos clínicos apresentados são fictícios e foram criados exclusivamente para fins de aprendizagem acadêmica. Este jogo NÃO substitui o julgamento clínico profissional, a orientação de um farmacêutico habilitado ou qualquer forma de aconselhamento médico. Nunca tome decisões sobre saúde com base neste simulador.**

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
