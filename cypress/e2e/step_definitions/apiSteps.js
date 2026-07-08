import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const TRELLO_BASE_URL = 'https://api.trello.com/1';

let apiResponse;

// ─── CT09 ─────────────────────────────────────────────────────────────────────

Given('que possuo credenciais válidas da API Trello', function () {
  const key = Cypress.env('TRELLO_KEY');
  const token = Cypress.env('TRELLO_TOKEN');
  if (!key || !token) {
    cy.log('TRELLO_KEY / TRELLO_TOKEN não configurados — configure o .env para rodar este cenário.');
    this.skip();
  }
});

When('realizo um GET para o endpoint da action {string}', (actionId) => {
  const key = Cypress.env('TRELLO_KEY');
  const token = Cypress.env('TRELLO_TOKEN');

  cy.request({
    method: 'GET',
    url: `${TRELLO_BASE_URL}/actions/${actionId}`,
    qs: { key, token },
    failOnStatusCode: false,
  }).then((response) => {
    apiResponse = response;
  });
});

Then('o status code da resposta deve ser {int}', (expectedStatus) => {
  expect(apiResponse.status).to.equal(expectedStatus);
  cy.log(`Status Code: ${apiResponse.status}`);
});

Then('o campo {string} da estrutura {string} deve ser exibido no log', (field, structure) => {
  const value = apiResponse.body?.data?.[structure]?.[field];
  cy.log(`[Trello Response] data.${structure}.${field} = "${value}"`);
  expect(value, `Campo data.${structure}.${field} deve existir na resposta`).to.not.be.undefined;
});

// ─── CT10 ─────────────────────────────────────────────────────────────────────

Given('que não possuo credenciais da API Trello', () => {
  cy.log('Cenário negativo: requisição será enviada com credenciais inválidas');
});

// Usa credenciais inválidas para garantir 401 — sem parâmetros a action pode
// retornar 200 se o board for público, o que tornaria o cenário não-determinístico.
When('realizo um GET para o endpoint da action {string} sem autenticação', (actionId) => {
  cy.request({
    method: 'GET',
    url: `${TRELLO_BASE_URL}/actions/${actionId}`,
    qs: { key: 'invalid_key_000', token: 'invalid_token_000' },
    failOnStatusCode: false,
  }).then((response) => {
    apiResponse = response;
  });
});
