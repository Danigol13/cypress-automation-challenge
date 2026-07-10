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

Os testes de API requerem uma chave e token válidos do Trello para os cenários autenticados:

1. Acesse https://trello.com/power-ups/admin e crie um Power-Up
2. Copie a **API Key**
3. Clique em **Token** para gerar um token de acesso
4. No arquivo `.env`, preencha:
   ```
   TRELLO_KEY=sua_api_key
   TRELLO_TOKEN=seu_token
   ```

> Os cenários negativos de API (CT10, CT23, CT51 etc.) não requerem credenciais válidas e validam retornos 401.

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
npm run test:login      # CT01, CT02, CT11, CT12, CT55 — Login e Logout
npm run test:search     # CT03, CT04 — Busca de produtos
npm run test:cart       # CT05, CT06, CT08, CT13, CT14, CT26, CT28 — Carrinho
npm run test:checkout   # CT07, CT52, CT53 — Checkout e Pagamento
npm run test:api        # CT09, CT10, CT18–CT51 — API Trello (GET, POST, DELETE)
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
│   ├── evidencias/                 # Screenshots por feature (gerados na execução)
│   │   ├── login.feature/
│   │   ├── search.feature/
│   │   ├── add_to_cart.feature/
│   │   ├── checkout.feature/
│   │   └── api_trello.feature/
│   ├── support/
│   │   ├── page_objects/           # Page Object Model
│   │   │   ├── loginPage.js
│   │   │   ├── homePage.js
│   │   │   ├── productsPage.js
│   │   │   ├── cartPage.js
│   │   │   ├── checkoutPage.js
│   │   │   └── paymentPage.js
│   │   ├── commands.js
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

### Login (`login.feature`)

| ID   | Tipo      | Descrição                                                        |
|------|-----------|------------------------------------------------------------------|
| CT01 | Positivo  | Login com credenciais válidas                                    |
| CT02 | Negativo  | Login com credenciais inválidas exibe mensagem de erro           |
| CT11 | Negativo  | Login sem email mantém o usuário na página de login              |
| CT12 | Negativo  | Login sem senha mantém o usuário na página de login              |
| CT55 | Positivo  | Logout realizado com sucesso                                     |

### Busca (`search.feature`)

| ID   | Tipo      | Descrição                                                        |
|------|-----------|------------------------------------------------------------------|
| CT03 | Positivo  | Busca com termo válido retorna produtos                          |
| CT04 | Negativo  | Busca com termo inexistente não retorna produtos                 |

### Carrinho (`add_to_cart.feature`)

| ID   | Tipo      | Descrição                                                        |
|------|-----------|------------------------------------------------------------------|
| CT05 | Positivo  | Adicionar produto ao carrinho com sucesso                        |
| CT06 | Negativo  | Acessar carrinho vazio exibe mensagem adequada                   |
| CT08 | Negativo  | Usuário não logado é solicitado a fazer login no checkout        |
| CT13 | Positivo  | Remover produto do carrinho deve esvaziá-lo                      |
| CT14 | Positivo  | Quantidade do produto adicionado ao carrinho deve ser 1          |
| CT26 | Positivo  | Total do produto deve corresponder ao preço unitário             |
| CT28 | Positivo  | Alterar quantidade para 2 antes de adicionar reflete no carrinho |

### Checkout e Pagamento (`checkout.feature`)

| ID   | Tipo      | Descrição                                                        |
|------|-----------|------------------------------------------------------------------|
| CT07 | Positivo  | Usuário logado visualiza produtos na tela de finalização         |
| CT52 | Positivo  | Pagamento com dados válidos exibe confirmação do pedido          |
| CT53 | Negativo  | Campo obrigatório não preenchido impede confirmação (5 exemplos) |

### API Trello (`api_trello.feature`)

| ID   | Tipo      | Descrição                                                        |
|------|-----------|------------------------------------------------------------------|
| CT09 | Positivo  | GET com credenciais válidas retorna 200 e exibe list.name        |
| CT10 | Negativo  | GET sem credenciais retorna 401                                  |
| CT18 | Positivo  | Campo "type" da action deve ser "updateCard"                     |
| CT19 | Positivo  | Campo "date" da action deve estar preenchido                     |
| CT20 | Positivo  | GET no board da action retorna 200 e nome do board               |
| CT21 | Positivo  | GET na lista da action retorna 200 e nome da lista               |
| CT22 | Positivo  | GET no card da action retorna 200 e nome do card                 |
| CT23 | Negativo  | GET no board com credenciais inválidas retorna 401               |
| CT29 | Negativo  | GET card com ID inexistente retorna 404                          |
| CT30 | Positivo  | Campo "idMemberCreator" deve estar preenchido                    |
| CT31 | Positivo  | Filtro de campos retorna apenas os campos solicitados            |
| CT32 | Positivo  | Estrutura data.board deve conter id e name                       |
| CT33 | Positivo  | idBoard do card deve corresponder ao board da action             |
| CT34 | Positivo  | GET /members retorna 200 e username do membro                    |
| CT35 | Positivo  | GET /boards/lists retorna 200 e array não vazio                  |
| CT36 | Positivo  | GET /boards/cards retorna 200 e array não vazio                  |
| CT37 | Positivo  | GET /boards/members retorna 200 e array não vazio                |
| CT38 | Positivo  | Campo data.card.id da action deve estar preenchido               |
| CT39 | Positivo  | Estrutura data.old deve existir na action updateCard             |
| CT40 | Positivo  | ID da resposta deve corresponder ao ID da action consultada      |
| CT41 | Negativo  | GET com token inválido retorna 401                               |
| CT42 | Negativo  | GET com ID em formato inválido retorna 400                       |
| CT43 | Negativo  | GET para endpoint inexistente retorna 404                        |
| CT44 | Positivo  | GET /boards/cards?limit=1 retorna exatamente 1 card              |
| CT45 | Positivo  | GET com display=true retorna campo display na resposta           |
| CT46 | Positivo  | GET /boards com fields=name,closed retorna apenas esses campos   |
| CT47 | Positivo  | GET /boards/lists?filter=open retorna somente listas abertas     |
| CT48 | Positivo  | POST /cards cria card com sucesso e retorna nome correto         |
| CT49 | Positivo  | Card criado via POST deve ser confirmado via GET                 |
| CT50 | Positivo  | DELETE no card criado retorna 200                                |
| CT51 | Negativo  | POST criar card sem autenticação retorna 401                     |

**Total: 52 cenários automatizados**

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
