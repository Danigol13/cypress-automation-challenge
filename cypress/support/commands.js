import loginPage from './page_objects/loginPage';

Cypress.Commands.add('login', (email, password) => {
  loginPage.visit();
  loginPage.login(email, password);
  loginPage.assertLoginSuccess();
});

Cypress.Commands.add('addProductToCart', () => {
  cy.visit('/products');
  cy.get('.choose a').first().click();
  cy.get('#add-to-cart-button, button.cart').first().click();
  cy.get('button.close-modal').should('be.visible').click();
  cy.visit('/view_cart');
  cy.get('#cart_info_table tbody tr', { timeout: 10000 }).should('have.length.greaterThan', 0);
});
