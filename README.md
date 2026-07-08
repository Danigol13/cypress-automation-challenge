# Cypress Automation Challenge

Framework de automação de testes utilizando **Cypress + Cucumber (BDD)** em JavaScript.

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18.x
- npm >= 9.x
- Google Chrome (recomendado)

---

## Instalação

1. **Clone ou extraia o projeto:**
   ```bash
   cd cypress-automation-challenge
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   ```bash
   copy .env.example .env
   ```
   Edite o arquivo `.env` com suas credenciais do Trello (veja seção [Configuração](#configuração)).

---

## Configuração

### Credenciais Web

O arquivo `cypress/fixtures/users.json` contém as credenciais para os testes web.

> **Importante:** Para o site **automationexercise.com**, as credenciais precisam pertencer a uma conta cadastrada. Se necessário, crie uma conta em https://www.automationexercise.com/login e atualize o arquivo `users.json`.

### Credenciais API Trello

O teste de API (CT09) requer uma chave e token válidos do Trello:

1. Acesse https://trello.com/power-ups/admin e crie um Power-Up
2. Copie a **API Key**
3. Clique em **Token** para gerar um token de acesso
4. No arquivo `.env`, preencha:
   ```
   TRELLO_KEY=sua_api_key
   TRELLO_TOKEN=seu_token
   ```

> O CT10 (cenário negativo) não requer credenciais e valida o retorno 401.

---

## Como Executar os Testes

### Interface gráfica do Cypress (recomendado para exploração)
```bash
npm run test:open
```

### Todos os testes em modo headless
```bash
npm test
```

### Todos os testes com browser visível
```bash
npm run test:headed
```

### Executar por feature individualmente
```bash
npm run test:login      # CT01 e CT02 — Login
npm run test:search     # CT03 e CT04 — Busca
npm run test:cart       # CT05 e CT06 — Adicionar ao carrinho
npm run test:checkout   # CT07 e CT08 — Checkout
npm run test:api        # CT09 e CT10 — API Trello
```

### Gerar relatório HTML
```bash
npm run report
```
O relatório é gerado em: `cypress/results/report/index.html`

---

## Estrutura do Projeto

```
cypress-automation-challenge/
├── cypress/
│   ├── e2e/
│   │   ├── features/               # Arquivos .feature (BDD)
│   │   │   ├── login.feature
│   │   │   ├── search.feature
│   │   │   ├── add_to_cart.feature
│   │   │   ├── checkout.feature
│   │   │   └── api_trello.feature
│   │   └── step_definitions/       # Step definitions (Cucumber)
│   │       ├── loginSteps.js
│   │       ├── searchSteps.js
│   │       ├── cartSteps.js
│   │       └── apiSteps.js
│   ├── evidencias/                 # Screenshots manuais (por feature)
│   ├── support/
│   │   ├── page_objects/           # Page Object Model
│   │   │   ├── loginPage.js
│   │   │   ├── homePage.js
│   │   │   ├── productsPage.js
│   │   │   └── cartPage.js
│   │   └── e2e.js
│   └── fixtures/
│       └── users.json              # Massa de dados
├── scripts/
│   ├── capture-chrome-window.ps1   # Captura screenshot da janela do Chrome
│   ├── capture-api-evidencias.mjs  # Geração de evidências HTML para API
│   ├── generate-report.mjs         # Relatório HTML Cucumber
│   ├── upload-xray.mjs             # Upload de resultados para JIRA Xray
│   └── templates/
│       ├── api-evidence-01.html    # Template evidência positiva
│       └── api-evidence-02.html    # Template evidência negativa
├── cypress.config.js
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

---

## Cenários de Teste

| ID   | Feature             | Tipo      | Descrição                                               |
|------|---------------------|-----------|---------------------------------------------------------|
| CT01 | Login               | Positivo  | Login com credenciais válidas                           |
| CT02 | Login               | Negativo  | Login com credenciais inválidas — exibe mensagem erro   |
| CT03 | Busca               | Positivo  | Busca por "Dress" retorna produtos                      |
| CT04 | Busca               | Negativo  | Busca por termo inexistente não retorna produtos        |
| CT05 | Carrinho            | Positivo  | Adicionar produto ao carrinho com sucesso               |
| CT06 | Carrinho            | Negativo  | Carrinho vazio exibe mensagem adequada                  |
| CT07 | Checkout            | Positivo  | Usuário logado vê produtos na tela de finalização       |
| CT08 | Checkout            | Negativo  | Usuário não logado é solicitado a fazer login           |
| CT09 | API Trello          | Positivo  | GET com credenciais válidas → 200 e exibe list.name     |
| CT10 | API Trello          | Negativo  | GET sem credenciais → 401                               |

---

## Scripts Auxiliares

### Captura de Screenshot Manual (Windows)
```powershell
.\scripts\capture-chrome-window.ps1 -FeatureName "login" -ScenarioName "CT01"
```
A imagem é salva em `cypress/evidencias/login.feature/`.

### Upload para JIRA Xray
Configure `JIRA_BASE_URL` e `JIRA_TOKEN` no `.env`, depois:
```bash
node scripts/upload-xray.mjs
```

---

## Tecnologias Utilizadas

| Tecnologia | Versão | Função |
|---|---|---|
| [Cypress](https://cypress.io) | 13.x | Framework de automação E2E |
| [@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor) | 20.x | Integração BDD/Cucumber |
| [esbuild](https://esbuild.github.io/) | 0.25.x | Bundler para os step definitions |
| [dotenv](https://github.com/motdotla/dotenv) | 16.x | Variáveis de ambiente |
| [multiple-cucumber-html-reporter](https://github.com/WasiqB/multiple-cucumber-html-reporter) | 3.x | Relatório HTML |
