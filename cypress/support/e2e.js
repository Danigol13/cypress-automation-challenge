import './commands';

// Bloqueia scripts de anúncios do Google que atrasam o evento load da página
beforeEach(() => {
  cy.intercept('POST', '**/googlesyndication.com/**', { statusCode: 200, body: '' });
  cy.intercept('POST', '**/fundingchoicesmessages.google.com/**', { statusCode: 200, body: '' });
  cy.intercept('GET', '**/pagead/**', { statusCode: 200, body: '' });
});

afterEach(function () {
  const title = this.currentTest?.title;
  if (title) {
    const slug = title.replace(/[^a-zA-Z0-9À-ÿ]/g, '-').replace(/-+/g, '-').toLowerCase();
    cy.screenshot(slug);
  }
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
