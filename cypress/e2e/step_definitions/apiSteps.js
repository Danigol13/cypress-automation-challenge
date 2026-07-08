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
  cy.screenshot('CT09-api-trello-credenciais-validas');
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

Then('tiro evidência da resposta 401 da action', () => {
  cy.screenshot('CT10-api-trello-credenciais-invalidas');
});

// ─── CT18–CT23 ────────────────────────────────────────────────────────────────

Then('o campo {string} da resposta raiz deve ser {string}', (field, expectedValue) => {
  const value = apiResponse.body?.[field];
  cy.log(`[Trello Response] ${field} = "${value}"`);
  expect(value).to.equal(expectedValue);
  cy.screenshot(`CT18-api-trello-campo-${field}`);
});

Then('o campo {string} da resposta raiz deve estar preenchido', (field) => {
  const value = apiResponse.body?.[field];
  cy.log(`[Trello Response] ${field} = "${value}"`);
  expect(value).to.not.be.undefined;
  expect(value).to.not.be.null;
  cy.screenshot(`CT19-api-trello-campo-${field}-preenchido`);
});

When('busco os detalhes do board associado à action', () => {
  const key = Cypress.env('TRELLO_KEY');
  const token = Cypress.env('TRELLO_TOKEN');
  const boardId = apiResponse.body?.data?.board?.id;
  cy.log(`[Trello] Board ID: ${boardId}`);
  cy.request({
    method: 'GET',
    url: `${TRELLO_BASE_URL}/boards/${boardId}`,
    qs: { key, token },
    failOnStatusCode: false,
  }).then((res) => { apiResponse = res; });
});

When('busco os detalhes da lista associada à action', () => {
  const key = Cypress.env('TRELLO_KEY');
  const token = Cypress.env('TRELLO_TOKEN');
  const listId = apiResponse.body?.data?.list?.id;
  cy.log(`[Trello] List ID: ${listId}`);
  cy.request({
    method: 'GET',
    url: `${TRELLO_BASE_URL}/lists/${listId}`,
    qs: { key, token },
    failOnStatusCode: false,
  }).then((res) => { apiResponse = res; });
});

When('busco os detalhes do card associado à action', () => {
  const key = Cypress.env('TRELLO_KEY');
  const token = Cypress.env('TRELLO_TOKEN');
  const cardId = apiResponse.body?.data?.card?.id;
  cy.log(`[Trello] Card ID: ${cardId}`);
  cy.request({
    method: 'GET',
    url: `${TRELLO_BASE_URL}/cards/${cardId}`,
    qs: { key, token },
    failOnStatusCode: false,
  }).then((res) => { apiResponse = res; });
});

Then('o campo {string} do board deve ser exibido no log', (field) => {
  const value = apiResponse.body?.[field];
  cy.log(`[Board] ${field} = "${value}"`);
  expect(value, `Campo ${field} do board deve existir`).to.not.be.undefined;
  cy.screenshot('CT20-api-trello-get-board');
});

Then('o campo {string} da lista deve ser exibido no log', (field) => {
  const value = apiResponse.body?.[field];
  cy.log(`[List] ${field} = "${value}"`);
  expect(value, `Campo ${field} da lista deve existir`).to.not.be.undefined;
  cy.screenshot('CT21-api-trello-get-lista');
});

Then('o campo {string} do card deve ser exibido no log', (field) => {
  const value = apiResponse.body?.[field];
  cy.log(`[Card] ${field} = "${value}"`);
  expect(value, `Campo ${field} do card deve existir`).to.not.be.undefined;
  cy.screenshot('CT22-api-trello-get-card');
});

When('realizo um GET para o board sem autenticação', () => {
  cy.request({
    method: 'GET',
    url: `${TRELLO_BASE_URL}/boards/invalid_board_id_000`,
    qs: { key: 'invalid_key_000', token: 'invalid_token_000' },
    failOnStatusCode: false,
  }).then((res) => { apiResponse = res; });
});

Then('tiro evidência do board sem autenticação', () => {
  cy.screenshot('CT23-api-trello-board-credenciais-invalidas');
});
