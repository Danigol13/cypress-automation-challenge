import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import {
  trelloGet,
  trelloPost,
  trelloDelete,
  trelloGetUnauthorized,
  trelloGetWithInvalidToken,
  trelloPostUnauthorized,
} from '../../support/utils/trelloApi';

const ACTION_ID = Cypress.env('TRELLO_ACTION_ID');

let apiResponse;
let createdCardId;
let listIdForCard;

// ─── Credenciais ──────────────────────────────────────────────────────────────

Given('que possuo credenciais válidas da API Trello', () => {
  const key = Cypress.env('TRELLO_KEY');
  const token = Cypress.env('TRELLO_TOKEN');
  if (!key || !token) {
    throw new Error('TRELLO_KEY e TRELLO_TOKEN são obrigatórios. Configure o arquivo .env antes de executar os testes de API.');
  }
});

Given('que não possuo credenciais da API Trello', () => {
  cy.log('Cenário negativo: requisição será enviada com credenciais inválidas');
});

// ─── Actions ──────────────────────────────────────────────────────────────────

When('realizo um GET para o endpoint da action {string}', (actionId) => {
  trelloGet(`/actions/${actionId}`).then((res) => { apiResponse = res; });
});

When('realizo um GET para o endpoint da action {string} sem autenticação', (actionId) => {
  trelloGetUnauthorized(`/actions/${actionId}`).then((res) => { apiResponse = res; });
});

When('realizo um GET para a action com filtro de campos {string}', (fields) => {
  trelloGet(`/actions/${ACTION_ID}`, { fields }).then((res) => { apiResponse = res; });
});

When('realizo um GET para a action com parâmetro display true', () => {
  trelloGet(`/actions/${ACTION_ID}`, { display: true }).then((res) => { apiResponse = res; });
});

When('realizo um GET para a action com token inválido', () => {
  trelloGetWithInvalidToken(`/actions/${ACTION_ID}`).then((res) => { apiResponse = res; });
});

When('realizo um GET para a action com ID inválido {string}', (invalidId) => {
  trelloGet(`/actions/${invalidId}`, {}, false).then((res) => { apiResponse = res; });
});

// ─── Boards, Listas, Cards, Membros ───────────────────────────────────────────

When('busco os detalhes do board associado à action', () => {
  const boardId = apiResponse.body?.data?.board?.id;
  cy.log(`[Trello] Board ID: ${boardId}`);
  trelloGet(`/boards/${boardId}`).then((res) => { apiResponse = res; });
});

When('busco os detalhes da lista associada à action', () => {
  const listId = apiResponse.body?.data?.list?.id;
  cy.log(`[Trello] List ID: ${listId}`);
  trelloGet(`/lists/${listId}`).then((res) => { apiResponse = res; });
});

When('busco os detalhes do card associado à action', () => {
  const cardId = apiResponse.body?.data?.card?.id;
  cy.log(`[Trello] Card ID: ${cardId}`);
  trelloGet(`/cards/${cardId}`).then((res) => { apiResponse = res; });
});

When('busco os detalhes do member criador da action', () => {
  const memberId = apiResponse.body?.idMemberCreator;
  cy.log(`[Trello] Member ID: ${memberId}`);
  trelloGet(`/members/${memberId}`).then((res) => { apiResponse = res; });
});

When('busco as listas do board da action', () => {
  const boardId = apiResponse.body?.data?.board?.id;
  cy.log(`[Trello] Board ID para listas: ${boardId}`);
  trelloGet(`/boards/${boardId}/lists`).then((res) => { apiResponse = res; });
});

When('busco as listas abertas do board da action', () => {
  const boardId = apiResponse.body?.data?.board?.id;
  cy.log(`[Trello] Board ID para listas abertas: ${boardId}`);
  trelloGet(`/boards/${boardId}/lists`, { filter: 'open' }).then((res) => { apiResponse = res; });
});

When('busco os cards do board da action', () => {
  const boardId = apiResponse.body?.data?.board?.id;
  cy.log(`[Trello] Board ID para cards: ${boardId}`);
  trelloGet(`/boards/${boardId}/cards`).then((res) => { apiResponse = res; });
});

When('busco os cards do board da action com limite 1', () => {
  const boardId = apiResponse.body?.data?.board?.id;
  cy.log(`[Trello] Board ID para cards com limit=1: ${boardId}`);
  trelloGet(`/boards/${boardId}/cards`, { limit: 1 }).then((res) => { apiResponse = res; });
});

When('busco os membros do board da action', () => {
  const boardId = apiResponse.body?.data?.board?.id;
  cy.log(`[Trello] Board ID para membros: ${boardId}`);
  trelloGet(`/boards/${boardId}/members`).then((res) => { apiResponse = res; });
});

When('busco o board da action com campos filtrados {string}', (fields) => {
  const boardId = apiResponse.body?.data?.board?.id;
  cy.log(`[Trello] Board ID com fields="${fields}": ${boardId}`);
  trelloGet(`/boards/${boardId}`, { fields }).then((res) => { apiResponse = res; });
});

When('busco o card da action e verifico o board', () => {
  const boardId = apiResponse.body?.data?.board?.id;
  const cardId = apiResponse.body?.data?.card?.id;
  cy.wrap(boardId).as('actionBoardId');
  trelloGet(`/cards/${cardId}`).then((res) => { apiResponse = res; });
});

// ─── Endpoints negativos ──────────────────────────────────────────────────────

When('realizo um GET para um card com ID inexistente', () => {
  trelloGet('/cards/000000000000000000000001', {}, false).then((res) => { apiResponse = res; });
});

When('realizo um GET para o board sem autenticação', () => {
  trelloGetUnauthorized('/boards/invalid_board_id_000').then((res) => { apiResponse = res; });
});

When('realizo um GET para um endpoint inexistente da API Trello', () => {
  trelloGet('/recurso_inexistente/000000000000', {}, false).then((res) => { apiResponse = res; });
});

// ─── POST / DELETE ────────────────────────────────────────────────────────────

When('busco a lista da action para usar como destino do card', () => {
  trelloGet('/members/me/boards').then((boardsRes) => {
    const boardId = boardsRes.body[0]?.id;
    cy.log(`[Trello] Board do usuário: ${boardId}`);
    trelloGet(`/boards/${boardId}/lists`).then((listsRes) => {
      listIdForCard = listsRes.body[0]?.id;
      cy.log(`[Trello] idList para criação de card: ${listIdForCard}`);
    });
  });
});

When('crio um card com nome {string} na lista obtida', (cardName) => {
  trelloPost('/cards', { idList: listIdForCard, name: cardName }).then((res) => {
    apiResponse = res;
    createdCardId = res.body?.id;
    cy.log(`[Trello] Card criado — id: ${createdCardId}, name: "${res.body?.name}"`);
  });
});

When('crio um card temporário na lista obtida', () => {
  trelloPost('/cards', { idList: listIdForCard, name: 'Card Temporario DELETE' }).then((res) => {
    apiResponse = res;
    createdCardId = res.body?.id;
    cy.log(`[Trello] Card temporário criado — id: ${createdCardId}`);
  });
});

When('consulto o card criado via GET', () => {
  trelloGet(`/cards/${createdCardId}`).then((res) => { apiResponse = res; });
});

When('removo o card via DELETE', () => {
  trelloDelete(`/cards/${createdCardId}`).then((res) => { apiResponse = res; });
});

Then('removo o card criado para limpeza', () => {
  trelloDelete(`/cards/${createdCardId}`).then((res) => {
    cy.log(`[Trello] Limpeza — DELETE card status: ${res.status}`);
  });
});

When('tento criar um card sem autenticação', () => {
  trelloPostUnauthorized('/cards', { idList: 'qualquer_lista', name: 'Card Sem Auth' })
    .then((res) => { apiResponse = res; });
});

// ─── Assertions ───────────────────────────────────────────────────────────────

Then('o status code da resposta deve ser {int}', (expectedStatus) => {
  expect(apiResponse.status).to.equal(expectedStatus);
  cy.log(`Status Code: ${apiResponse.status}`);
});

Then('o campo {string} da estrutura {string} deve ser exibido no log', (field, structure) => {
  const value = apiResponse.body?.data?.[structure]?.[field];
  cy.log(`[Trello Response] data.${structure}.${field} = "${value}"`);
  expect(value, `Campo data.${structure}.${field} deve existir na resposta`).to.not.be.undefined;
});

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

Then('o campo {string} do member deve ser exibido no log', (field) => {
  const value = apiResponse.body?.[field];
  cy.log(`[Member] ${field} = "${value}"`);
  expect(value, `Campo ${field} do member deve existir`).to.not.be.undefined;
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

Then('o idBoard do card deve corresponder ao board da action', () => {
  cy.get('@actionBoardId').then((expectedBoardId) => {
    const cardBoardId = apiResponse.body?.idBoard;
    cy.log(`[Verify] Card idBoard="${cardBoardId}" === Board id="${expectedBoardId}"`);
    expect(cardBoardId).to.equal(expectedBoardId);
  });
});

Then('as listas do board devem ser um array não vazio', () => {
  expect(apiResponse.body).to.be.an('array').that.is.not.empty;
  cy.log(`[Trello] Listas encontradas: ${apiResponse.body.length}`);
});

Then('os cards do board devem ser um array não vazio', () => {
  expect(apiResponse.body).to.be.an('array').that.is.not.empty;
  cy.log(`[Trello] Cards encontrados: ${apiResponse.body.length}`);
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

Then('a resposta deve conter exatamente 1 item', () => {
  expect(apiResponse.body).to.be.an('array').with.length(1);
  cy.log(`[Trello] Itens retornados: ${apiResponse.body.length}`);
});

Then('a resposta do board deve conter os campos name e closed', () => {
  const body = apiResponse.body;
  expect(body).to.have.property('name');
  expect(body).to.have.property('closed');
  cy.log(`[Board] name="${body.name}", closed="${body.closed}"`);
});

Then('todas as listas da resposta devem estar abertas', () => {
  expect(apiResponse.body).to.be.an('array').that.is.not.empty;
  apiResponse.body.forEach((list) => {
    cy.log(`[List] name="${list.name}", closed=${list.closed}`);
    expect(list.closed, `Lista "${list.name}" deve estar aberta`).to.equal(false);
  });
});

Then('o nome do card criado deve ser {string}', (expectedName) => {
  expect(apiResponse.body?.name).to.equal(expectedName);
  cy.log(`[Trello] name = "${apiResponse.body?.name}"`);
});

Then('o nome do card consultado deve ser {string}', (expectedName) => {
  expect(apiResponse.body?.name).to.equal(expectedName);
  cy.log(`[Trello] Card consultado name = "${apiResponse.body?.name}"`);
});

// ─── Automation Exercise API ──────────────────────────────────────────────────

let aeApiResponse;
let aeApiResponse2;

const AE_BASE_URL = 'https://automationexercise.com/api';

function parseAeBody(body) {
  return typeof body === 'string' ? JSON.parse(body) : body;
}

function buildAccountPayload(email) {
  return {
    name: 'QA Tester',
    email,
    password: 'Test@1234',
    title: 'Mr',
    birth_date: '15',
    birth_month: '6',
    birth_year: '1990',
    firstname: 'QA',
    lastname: 'Tester',
    company: 'QA Company',
    address1: '123 Test Street',
    address2: 'Apt 4',
    country: 'United States',
    zipcode: '90001',
    state: 'California',
    city: 'Los Angeles',
    mobile_number: '5551234567',
  };
}

Given('que acesso a API do Automation Exercise', () => {
  cy.log(`Automation Exercise API: ${AE_BASE_URL}`);
});

When('envio um POST para criar uma conta com dados válidos', () => {
  const uniqueEmail = `qa_${Date.now()}@test.com`;
  Cypress.env('aeEmail', uniqueEmail);

  cy.request({
    method: 'POST',
    url: `${AE_BASE_URL}/createAccount`,
    form: true,
    body: buildAccountPayload(uniqueEmail),
  }).then((res) => {
    aeApiResponse = res;
    cy.log(`[AE] createAccount status=${res.status}, body=${JSON.stringify(res.body)}`);
  });
});

When('crio uma conta e tento criar novamente com o mesmo email', () => {
  const uniqueEmail = `qa_dup_${Date.now()}@test.com`;

  cy.request({
    method: 'POST',
    url: `${AE_BASE_URL}/createAccount`,
    form: true,
    body: buildAccountPayload(uniqueEmail),
  }).then((res) => {
    cy.log(`[AE] Primeira criação responseCode=${parseAeBody(res.body).responseCode}`);
    Cypress.env('aeEmail', uniqueEmail);
  });

  cy.request({
    method: 'POST',
    url: `${AE_BASE_URL}/createAccount`,
    form: true,
    failOnStatusCode: false,
    body: buildAccountPayload(uniqueEmail),
  }).then((res) => {
    aeApiResponse2 = res;
    cy.log(`[AE] Segunda criação body=${JSON.stringify(res.body)}`);
  });
});

Then('o responseCode da resposta de criação deve ser {int}', (expectedCode) => {
  const body = parseAeBody(aeApiResponse.body);
  cy.log(`[AE] responseCode = ${body.responseCode}`);
  expect(body.responseCode).to.equal(expectedCode);
});

Then('a mensagem da resposta deve ser {string}', (expectedMessage) => {
  const body = parseAeBody(aeApiResponse.body);
  cy.log(`[AE] message = "${body.message}"`);
  expect(body.message).to.equal(expectedMessage);
});

Then('o responseCode da segunda tentativa deve ser {int}', (expectedCode) => {
  const body = parseAeBody(aeApiResponse2.body);
  cy.log(`[AE] responseCode segunda tentativa = ${body.responseCode}`);
  expect(body.responseCode).to.equal(expectedCode);
});

Then('a mensagem da segunda tentativa deve ser {string}', (expectedMessage) => {
  const body = parseAeBody(aeApiResponse2.body);
  cy.log(`[AE] message segunda tentativa = "${body.message}"`);
  expect(body.message).to.equal(expectedMessage);
});
