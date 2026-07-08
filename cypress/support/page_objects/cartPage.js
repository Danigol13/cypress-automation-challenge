class CartPage {
  elements = {
    cartRows: () => cy.get('#cart_info_table tbody tr'),
    productNamesInCart: () => cy.get('#cart_info_table .cart_description h4 a'),
    emptyCartMessage: () => cy.get('#empty_cart'),
    proceedToCheckoutBtn: () => cy.get('a.check_out'),
    checkoutProductNames: () => cy.get('#cart_info_table .cart_description h4'),
    loginToCheckoutModal: () => cy.get('.modal-body'),
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

  assertCheckoutHasProducts() {
    cy.url().should('include', '/checkout');

    // Loga estrutura real da página para identificar o seletor correto
    cy.document().then((doc) => {
      const tables = Array.from(doc.querySelectorAll('table'));
      tables.forEach((t, i) =>
        cy.log(`[DOM] table[${i}]: id="${t.id}" class="${t.className}" rows=${t.rows.length}`)
      );
      const cartInfo = doc.querySelector('#cart_info');
      cy.log(`[DOM] #cart_info: ${cartInfo ? `found, children=${cartInfo.children.length}` : 'NOT FOUND'}`);
      const products = doc.querySelectorAll('[id^="product-"]');
      cy.log(`[DOM] [id^="product-"]: ${products.length} elements`);
    });

    cy.contains('Review Your Order', { timeout: 15000 }).should('be.visible');
    // Funciona tanto para <tr id="product-1"> (tabela) quanto <li id="product-1"> (lista)
    cy.get('[id^="product-"]', { timeout: 15000 }).should('have.length.greaterThan', 0);
  }

  assertLoginModalVisible() {
    this.elements.loginToCheckoutModal().should('contain', 'Register / Login');
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
}

export default new CartPage();
