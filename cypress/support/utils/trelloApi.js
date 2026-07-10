const BASE_URL = 'https://api.trello.com/1';

const INVALID_KEY = 'invalid_key_000';
const INVALID_TOKEN = 'invalid_token_000';

function buildQs(extraQs = {}) {
  return {
    key: Cypress.env('TRELLO_KEY'),
    token: Cypress.env('TRELLO_TOKEN'),
    ...extraQs,
  };
}

export function trelloGet(endpoint, extraQs = {}, failOnStatusCode = true) {
  return cy.request({
    method: 'GET',
    url: `${BASE_URL}${endpoint}`,
    qs: buildQs(extraQs),
    failOnStatusCode,
  });
}

export function trelloPost(endpoint, body) {
  return cy.request({
    method: 'POST',
    url: `${BASE_URL}${endpoint}`,
    qs: buildQs(),
    body,
  });
}

export function trelloDelete(endpoint) {
  return cy.request({
    method: 'DELETE',
    url: `${BASE_URL}${endpoint}`,
    qs: buildQs(),
  });
}

export function trelloGetUnauthorized(endpoint) {
  return cy.request({
    method: 'GET',
    url: `${BASE_URL}${endpoint}`,
    qs: { key: INVALID_KEY, token: INVALID_TOKEN },
    failOnStatusCode: false,
  });
}

export function trelloGetWithInvalidToken(endpoint) {
  return cy.request({
    method: 'GET',
    url: `${BASE_URL}${endpoint}`,
    qs: { key: Cypress.env('TRELLO_KEY'), token: INVALID_TOKEN },
    failOnStatusCode: false,
  });
}

export function trelloPostUnauthorized(endpoint, body) {
  return cy.request({
    method: 'POST',
    url: `${BASE_URL}${endpoint}`,
    qs: { key: INVALID_KEY, token: INVALID_TOKEN },
    body,
    failOnStatusCode: false,
  });
}
