class CartPage {
  elements = {
    cartRows: () => cy.get('#cart_info_table tbody tr'),
    productNamesInCart: () => cy.get('#cart_info_table .cart_description h4 a'),
    emptyCartMessage: () => cy.get('#empty_cart'),
    proceedToCheckoutBtn: () => cy.get('a.check_out'),
  };

  visit() {
    cy.visit('/view_cart');
  }

  assertCartHasItems() {
    this.elements.cartRows().should('have.length.greaterThan', 0);
  }

  assertCartIsEmpty() {
    this.elements.emptyCartMessage().should('be.visible');
  }

  assertProductInCart() {
    this.elements.productNamesInCart().first().should('be.visible');
  }

  proceedToCheckout() {
    this.elements.proceedToCheckoutBtn().click();
  }

  removeFirstProduct() {
    cy.get('.cart_quantity_delete').first().click();
  }

  assertCartEmptyAfterRemoval() {
    cy.get('#empty_cart', { timeout: 10000 }).should('be.visible');
  }

  assertProductQuantity(qty) {
    cy.get('.cart_quantity button').first().should('have.text', String(qty));
  }

  assertTotalMatchesUnitPrice() {
    cy.get('.cart_price p').first().invoke('text').as('priceText');
    cy.get('.cart_quantity button').first().invoke('text').as('qtyText');
    cy.get('.cart_total_price').first().invoke('text').as('totalText');

    cy.then(function () {
      const price = parseInt(this.priceText.replace(/\D/g, ''), 10);
      const qty = parseInt(this.qtyText.trim(), 10);
      const total = parseInt(this.totalText.replace(/\D/g, ''), 10);
      expect(total).to.equal(price * qty);
    });
  }
}

export default new CartPage();
