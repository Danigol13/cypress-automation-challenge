import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import productsPage from '../../support/page_objects/productsPage';
import cartPage from '../../support/page_objects/cartPage';

// ─── Carrinho ────────────────────────────────────────────────────────────────

Given('que acesso o carrinho sem adicionar produtos', () => {
  cartPage.visit();
});

When('visualizo o primeiro produto disponível', () => {
  productsPage.viewFirstProduct();
});

When('clico em adicionar ao carrinho', () => {
  productsPage.addToCart();
});

When('opto por continuar comprando', () => {
  productsPage.continueShopping();
});

Then('o produto deve estar presente no carrinho', () => {
  cy.visit('/view_cart');
  cartPage.assertCartHasItems();
  cartPage.assertProductInCart();
});

Then('o carrinho deve estar vazio', () => {
  cartPage.assertCartIsEmpty();
});

// ─── Checkout ─────────────────────────────────────────────────────────────────

Given('que adiciono um produto ao carrinho', () => {
  // Adiciona via request direto usando a mesma sessão do usuário logado.
  // Isso garante que o produto está salvo no servidor antes de navegar ao checkout.
  cy.request('GET', '/add_to_cart/1?quantity=1').its('status').should('equal', 200);
  cy.visit('/view_cart');
  cy.get('#cart_info_table tbody tr', { timeout: 10000 }).should('have.length.greaterThan', 0);
});

When('acesso o carrinho e prossigo para o checkout', () => {
  cy.visit('/view_cart');
  cy.get('#cart_info_table tbody tr', { timeout: 10000 }).should('have.length.greaterThan', 0);
  cartPage.proceedToCheckout();
});

Then('os produtos devem aparecer na tela de finalização de compra', () => {
  cartPage.assertCheckoutHasProducts();
});

Then('devo ser solicitado a fazer login ou cadastro', () => {
  cartPage.assertLoginModalVisible();
});
