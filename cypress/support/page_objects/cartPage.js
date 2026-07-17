class CartPage {
  elements = {
    cartRows: () => cy.get('#cart_info_table tbody tr'),
    productNamesInCart: () => cy.get('#cart_info_table .cart_description h4 a'),
    emptyCartMessage: () => cy.get('#empty_cart', { timeout: 10000 }),
    proceedToCheckoutBtn: () => cy.get('a.check_out'),
    firstRowDeleteBtn: () => cy.get('#cart_info_table tbody tr').first().find('.cart_quantity_delete'),
    firstRowPrice: () => cy.get('#cart_info_table tbody tr').first().find('.cart_price p'),
    firstRowQty: () => cy.get('#cart_info_table tbody tr').first().find('.cart_quantity button'),
    firstRowTotal: () => cy.get('#cart_info_table tbody tr').first().find('.cart_total_price'),
  };

  visit() {
    cy.visit('/view_cart');
  }

  proceedToCheckout() {
    this.elements.proceedToCheckoutBtn().click();
  }

  removeFirstProduct() {
    this.elements.firstRowDeleteBtn().click();
  }
}

export default new CartPage();
