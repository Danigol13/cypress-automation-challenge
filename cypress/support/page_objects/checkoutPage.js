class CheckoutPage {
  elements = {
    reviewOrderHeader: () => cy.contains('Review Your Order'),
    productRows: () => cy.get('[id^="product-"]'),
    loginModal: () => cy.get('.modal-body'),
    placeOrderBtn: () => cy.contains('Place Order'),
  };

  assertProductsVisible() {
    cy.url().should('include', '/checkout');
    this.elements.reviewOrderHeader().should('be.visible');
    this.elements.productRows().should('have.length.greaterThan', 0);
  }

  assertLoginModalVisible() {
    this.elements.loginModal().should('contain', 'Register / Login');
  }

  placeOrder() {
    this.elements.placeOrderBtn().click();
    cy.url().should('include', '/payment');
  }
}

export default new CheckoutPage();
