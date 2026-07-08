// Bloqueia scripts de anúncios do Google que atrasam o evento load da página
beforeEach(() => {
  cy.intercept('POST', '**/googlesyndication.com/**', { statusCode: 200, body: '' });
  cy.intercept('POST', '**/fundingchoicesmessages.google.com/**', { statusCode: 200, body: '' });
  cy.intercept('GET', '**/pagead/**', { statusCode: 200, body: '' });
});

Cypress.on('uncaught:exception', (err) => {
  if (
    err.message.includes('ResizeObserver loop') ||
    err.message.includes('Script error') ||
    err.message.includes('ChunkLoadError')
  ) {
    return false;
  }
});
