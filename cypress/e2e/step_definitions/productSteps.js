import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('o nome e o preço do produto devem estar visíveis', () => {
  cy.get('.product-information h2').should('be.visible');
  cy.get('.product-information').should('contain.text', 'Rs.');
  cy.screenshot('CT15-detalhes-do-produto');
});
