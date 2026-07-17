import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import productsPage from '../../support/page_objects/productsPage';
import cartPage from '../../support/page_objects/cartPage';
import checkoutPage from '../../support/page_objects/checkoutPage';
import paymentPage from '../../support/page_objects/paymentPage';

// ─── Carrinho ─────────────────────────────────────────────────────────────────

Given('que acesso o carrinho sem adicionar produtos', () => {
  cartPage.visit();
});

Given('que adiciono um produto ao carrinho', () => {
  cy.addProductToCart();
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
  cartPage.elements.cartRows().should('have.length.greaterThan', 0);
  cartPage.elements.productNamesInCart().first().should('be.visible');
});

Then('o carrinho deve estar vazio', () => {
  cartPage.elements.emptyCartMessage().should('be.visible');
});

When('removo o produto do carrinho', () => {
  cartPage.removeFirstProduct();
});

Then('o carrinho deve estar vazio após a remoção', () => {
  cartPage.elements.emptyCartMessage().should('be.visible');
});

Then('a quantidade do produto no carrinho deve ser {int}', (qty) => {
  cartPage.elements.firstRowQty().should('have.text', String(qty));
});

Then('o total do produto deve corresponder ao preço unitário', () => {
  cartPage.elements.firstRowPrice().invoke('text').as('priceText');
  cartPage.elements.firstRowQty().invoke('text').as('qtyText');
  cartPage.elements.firstRowTotal().invoke('text').as('totalText');
  cy.then(function () {
    const price = parseInt(this.priceText.replace(/\D/g, ''), 10);
    const qty   = parseInt(this.qtyText.trim(), 10);
    const total = parseInt(this.totalText.replace(/\D/g, ''), 10);
    expect(total).to.equal(price * qty);
  });
});

When('altero a quantidade do produto para {int} e adiciono ao carrinho', (qty) => {
  cy.visit('/view_cart');
  cy.get('body').then(($body) => {
    if ($body.find('.cart_quantity_delete').length > 0) {
      cy.get('.cart_quantity_delete').each(($btn) => cy.wrap($btn).click());
      cy.get('#empty_cart', { timeout: 10000 }).should('be.visible');
    }
  });
  cy.visit('/product_details/1');
  productsPage.setQuantity(qty);
  productsPage.addToCartFromDetail();
  productsPage.continueShopping();
  cy.visit('/view_cart');
});

Then('o produto deve estar no carrinho com quantidade {int}', (qty) => {
  cartPage.elements.firstRowQty().should('have.text', String(qty));
});

// ─── Checkout ─────────────────────────────────────────────────────────────────

When('acesso o carrinho e prossigo para o checkout', () => {
  cy.visit('/view_cart');
  cy.get('#cart_info_table tbody tr', { timeout: 10000 }).should('have.length.greaterThan', 0);
  cartPage.proceedToCheckout();
});

Then('os produtos devem aparecer na tela de finalização de compra', () => {
  checkoutPage.assertProductsVisible();
});

Then('devo ser solicitado a fazer login ou cadastro', () => {
  checkoutPage.assertLoginModalVisible();
});

// ─── Pagamento ────────────────────────────────────────────────────────────────

When('prossigo para a tela de pagamento', () => {
  paymentPage.placeOrderFromCheckout();
});

When('preencho os dados de pagamento com informações válidas', () => {
  cy.fixture('users').then((data) => {
    paymentPage.fillForm(
      data.payment.nameOnCard,
      data.payment.cardNumber,
      data.payment.cvc,
      data.payment.expiryMonth,
      data.payment.expiryYear
    );
    paymentPage.confirmPayment();
  });
});

Then('devo ver a confirmação do pedido realizado com sucesso', () => {
  paymentPage.assertOrderPlaced();
});

When('submeto o formulário sem o campo {string}', (campo) => {
  cy.fixture('users').then((data) => {
    paymentPage.fillFormExcept(campo, data.payment);
    paymentPage.confirmPayment();
  });
});

Then('o campo de pagamento {string} deve estar inválido', (campo) => {
  paymentPage.assertFieldInvalid(campo);
});
