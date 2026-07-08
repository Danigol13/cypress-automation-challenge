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

// ─── CT18–CT23 ────────────────────────────────────────────────────────────────

Then('o campo {string} da resposta raiz deve ser {string}', (field, expectedValue) => {
  const value = apiResponse.body?.[field];
  cy.log(`[Trello Response] ${field} = "${value}"`);
  expect(value).to.equal(expectedValue);
});

Then('o campo {string} da resposta raiz deve estar preenchido', (field) => {
  const value = apiResponse.body?.[field];
  cy.log(`[Trello Response] ${field} = "${value}"`);
  expect(value).to.not.be.undefined;
  expect(value).to.not.be.null;
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
});

Then('o campo {string} da lista deve ser exibido no log', (field) => {
  const value = apiResponse.body?.[field];
  cy.log(`[List] ${field} = "${value}"`);
  expect(value, `Campo ${field} da lista deve existir`).to.not.be.undefined;
});

Then('o campo {string} do card deve ser exibido no log', (field) => {
  const value = apiResponse.body?.[field];
  cy.log(`[Card] ${field} = "${value}"`);
  expect(value, `Campo ${field} do card deve existir`).to.not.be.undefined;
});

When('realizo um GET para o board sem autenticação', () => {
  cy.request({
    method: 'GET',
    url: `${TRELLO_BASE_URL}/boards/invalid_board_id_000`,
    qs: { key: 'invalid_key_000', token: 'invalid_token_000' },
    failOnStatusCode: false,
  }).then((res) => { apiResponse = res; });
});

// ─── CT29–CT33 ────────────────────────────────────────────────────────────────

When('realizo um GET para um card com ID inexistente', () => {
  const key = Cypress.env('TRELLO_KEY');
  const token = Cypress.env('TRELLO_TOKEN');
  cy.request({
    method: 'GET',
    url: `${TRELLO_BASE_URL}/cards/000000000000000000000001`,
    qs: { key, token },
    failOnStatusCode: false,
  }).then((res) => { apiResponse = res; });
});

When('realizo um GET para a action com filtro de campos {string}', (fields) => {
  const key = Cypress.env('TRELLO_KEY');
  const token = Cypress.env('TRELLO_TOKEN');
  cy.request({
    method: 'GET',
    url: `${TRELLO_BASE_URL}/actions/592f11060f95a3d3d46a987a`,
    qs: { key, token, fields },
    failOnStatusCode: false,
  }).then((res) => { apiResponse = res; });
});

Then('os campos filtrados type e date devem estar presentes na resposta', () => {
  expect(apiResponse.body).to.have.property('type');
  expect(apiResponse.body).to.have.property('date');
  cy.log(`[Filtered] type="${apiResponse.body.type}", date="${apiResponse.body.date}"`);
});

Then('a estrutura data.board deve conter id e name', () => {
  const board = apiResponse.body?.data?.board;
  expect(board, 'data.board deve existir').to.exist;
  expect(board).to.have.property('id').that.is.not.undefined;
  expect(board).to.have.property('name').that.is.not.undefined;
  cy.log(`[Board] id="${board.id}", name="${board.name}"`);
});

When('busco o card da action e verifico o board', () => {
  const key = Cypress.env('TRELLO_KEY');
  const token = Cypress.env('TRELLO_TOKEN');
  const boardId = apiResponse.body?.data?.board?.id;
  const cardId = apiResponse.body?.data?.card?.id;
  cy.wrap(boardId).as('actionBoardId');
  cy.request({
    method: 'GET',
    url: `${TRELLO_BASE_URL}/cards/${cardId}`,
    qs: { key, token },
    failOnStatusCode: false,
  }).then((res) => { apiResponse = res; });
});

Then('o idBoard do card deve corresponder ao board da action', () => {
  cy.get('@actionBoardId').then((expectedBoardId) => {
    const cardBoardId = apiResponse.body?.idBoard;
    cy.log(`[Verify] Card idBoard="${cardBoardId}" === Board id="${expectedBoardId}"`);
    expect(cardBoardId).to.equal(expectedBoardId);
  });
});

// ─── CT34–CT47 ────────────────────────────────────────────────────────────────

When('busco os detalhes do member criador da action', () => {
  const key = Cypress.env('TRELLO_KEY');
  const token = Cypress.env('TRELLO_TOKEN');
  const memberId = apiResponse.body?.idMemberCreator;
  cy.log(`[Trello] Member ID: ${memberId}`);
  cy.request({
    method: 'GET',
    url: `${TRELLO_BASE_URL}/members/${memberId}`,
    qs: { key, token },
    failOnStatusCode: false,
  }).then((res) => { apiResponse = res; });
});

Then('o campo {string} do member deve ser exibido no log', (field) => {
  const value = apiResponse.body?.[field];
  cy.log(`[Member] ${field} = "${value}"`);
  expect(value, `Campo ${field} do member deve existir`).to.not.be.undefined;
});

When('busco as listas do board da action', () => {
  const key = Cypress.env('TRELLO_KEY');
  const token = Cypress.env('TRELLO_TOKEN');
  const boardId = apiResponse.body?.data?.board?.id;
  cy.log(`[Trello] Board ID para listas: ${boardId}`);
  cy.request({
    method: 'GET',
    url: `${TRELLO_BASE_URL}/boards/${boardId}/lists`,
    qs: { key, token },
    failOnStatusCode: false,
  }).then((res) => { apiResponse = res; });
});

Then('as listas do board devem ser um array não vazio', () => {
  expect(apiResponse.body).to.be.an('array').that.is.not.empty;
  cy.log(`[Trello] Listas encontradas: ${apiResponse.body.length}`);
});

When('busco os cards do board da action', () => {
  const key = Cypress.env('TRELLO_KEY');
  const token = Cypress.env('TRELLO_TOKEN');
  const boardId = apiResponse.body?.data?.board?.id;
  cy.log(`[Trello] Board ID para cards: ${boardId}`);
  cy.request({
    method: 'GET',
    url: `${TRELLO_BASE_URL}/boards/${boardId}/cards`,
    qs: { key, token },
    failOnStatusCode: false,
  }).then((res) => { apiResponse = res; });
});

Then('os cards do board devem ser um array não vazio', () => {
  expect(apiResponse.body).to.be.an('array').that.is.not.empty;
  cy.log(`[Trello] Cards encontrados: ${apiResponse.body.length}`);
});

When('busco os membros do board da action', () => {
  const key = Cypress.env('TRELLO_KEY');
  const token = Cypress.env('TRELLO_TOKEN');
  const boardId = apiResponse.body?.data?.board?.id;
  cy.log(`[Trello] Board ID para membros: ${boardId}`);
  cy.request({
    method: 'GET',
    url: `${TRELLO_BASE_URL}/boards/${boardId}/members`,
    qs: { key, token },
    failOnStatusCode: false,
  }).then((res) => { apiResponse = res; });
});

Then('os membros do board devem ser um array não vazio', () => {
  expect(apiResponse.body).to.be.an('array').that.is.not.empty;
  cy.log(`[Trello] Membros encontrados: ${apiResponse.body.length}`);
});

Then('o campo {string} de data.card deve estar preenchido', (field) => {
  const value = apiResponse.body?.data?.card?.[field];
  cy.log(`[Trello] data.card.${field} = "${value}"`);
  expect(value, `Campo data.card.${field} deve estar preenchido`).to.not.be.undefined;
  expect(value).to.not.be.null;
});

Then('a estrutura data.old deve existir na resposta', () => {
  const old = apiResponse.body?.data?.old;
  cy.log(`[Trello] data.old = ${JSON.stringify(old)}`);
  expect(old, 'data.old deve existir na resposta').to.exist;
});

Then('o id da resposta deve ser {string}', (expectedId) => {
  const id = apiResponse.body?.id;
  cy.log(`[Trello] response.id = "${id}", esperado = "${expectedId}"`);
  expect(id).to.equal(expectedId);
});

When('realizo um GET para a action com token inválido', () => {
  const key = Cypress.env('TRELLO_KEY');
  cy.request({
    method: 'GET',
    url: `${TRELLO_BASE_URL}/actions/592f11060f95a3d3d46a987a`,
    qs: { key, token: 'token_invalido_000' },
    failOnStatusCode: false,
  }).then((res) => { apiResponse = res; });
});

When('realizo um GET para a action com ID inválido {string}', (invalidId) => {
  const key = Cypress.env('TRELLO_KEY');
  const token = Cypress.env('TRELLO_TOKEN');
  cy.request({
    method: 'GET',
    url: `${TRELLO_BASE_URL}/actions/${invalidId}`,
    qs: { key, token },
    failOnStatusCode: false,
  }).then((res) => { apiResponse = res; });
});

When('realizo um GET para um endpoint inexistente da API Trello', () => {
  const key = Cypress.env('TRELLO_KEY');
  const token = Cypress.env('TRELLO_TOKEN');
  cy.request({
    method: 'GET',
    url: `${TRELLO_BASE_URL}/recurso_inexistente/000000000000`,
    qs: { key, token },
    failOnStatusCode: false,
  }).then((res) => { apiResponse = res; });
});

When('busco os cards do board da action com limite 1', () => {
  const key = Cypress.env('TRELLO_KEY');
  const token = Cypress.env('TRELLO_TOKEN');
  const boardId = apiResponse.body?.data?.board?.id;
  cy.log(`[Trello] Board ID para cards com limit=1: ${boardId}`);
  cy.request({
    method: 'GET',
    url: `${TRELLO_BASE_URL}/boards/${boardId}/cards`,
    qs: { key, token, limit: 1 },
    failOnStatusCode: false,
  }).then((res) => { apiResponse = res; });
});

Then('a resposta deve conter exatamente 1 item', () => {
  expect(apiResponse.body).to.be.an('array').with.length(1);
  cy.log(`[Trello] Itens retornados: ${apiResponse.body.length}`);
});

When('realizo um GET para a action com parâmetro display true', () => {
  const key = Cypress.env('TRELLO_KEY');
  const token = Cypress.env('TRELLO_TOKEN');
  cy.request({
    method: 'GET',
    url: `${TRELLO_BASE_URL}/actions/592f11060f95a3d3d46a987a`,
    qs: { key, token, display: true },
    failOnStatusCode: false,
  }).then((res) => { apiResponse = res; });
});

When('busco o board da action com campos filtrados {string}', (fields) => {
  const key = Cypress.env('TRELLO_KEY');
  const token = Cypress.env('TRELLO_TOKEN');
  const boardId = apiResponse.body?.data?.board?.id;
  cy.log(`[Trello] Board ID com fields="${fields}": ${boardId}`);
  cy.request({
    method: 'GET',
    url: `${TRELLO_BASE_URL}/boards/${boardId}`,
    qs: { key, token, fields },
    failOnStatusCode: false,
  }).then((res) => { apiResponse = res; });
});

Then('a resposta do board deve conter os campos name e closed', () => {
  const body = apiResponse.body;
  expect(body).to.have.property('name');
  expect(body).to.have.property('closed');
  cy.log(`[Board] name="${body.name}", closed="${body.closed}"`);
});

When('busco as listas abertas do board da action', () => {
  const key = Cypress.env('TRELLO_KEY');
  const token = Cypress.env('TRELLO_TOKEN');
  const boardId = apiResponse.body?.data?.board?.id;
  cy.log(`[Trello] Board ID para listas abertas: ${boardId}`);
  cy.request({
    method: 'GET',
    url: `${TRELLO_BASE_URL}/boards/${boardId}/lists`,
    qs: { key, token, filter: 'open' },
    failOnStatusCode: false,
  }).then((res) => { apiResponse = res; });
});

Then('todas as listas da resposta devem estar abertas', () => {
  expect(apiResponse.body).to.be.an('array').that.is.not.empty;
  apiResponse.body.forEach((list) => {
    cy.log(`[List] name="${list.name}", closed=${list.closed}`);
    expect(list.closed, `Lista "${list.name}" deve estar aberta`).to.equal(false);
  });
});
