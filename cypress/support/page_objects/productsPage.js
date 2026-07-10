class ProductsPage {
  elements = {
    searchInput: () => cy.get('#search_product'),
    searchButton: () => cy.get('#submit_search'),
    searchedProductsTitle: () => cy.get('h2.title.text-center'),
    productCards: () => cy.get('.single-products'),
    viewProductLinks: () => cy.get('.choose a'),
    addToCartButton: () => cy.get('button.cart'),
    continueShoppingButton: () => cy.get('button.close-modal'),
    viewCartInModal: () => cy.get('a[href="/view_cart"].btn'),
  };

  visit() {
    cy.visit('/products');
  }

  search(term) {
    this.elements.searchInput().clear().type(term);
    this.elements.searchButton().click();
  }

  assertResultsVisible() {
    this.elements.searchedProductsTitle().should('contain', 'Searched Products');
    this.elements.productCards().should('have.length.greaterThan', 0);
  }

  assertNoResults() {
    this.elements.searchedProductsTitle().should('contain', 'Searched Products');
    this.elements.productCards().should('have.length', 0);
  }

  viewFirstProduct() {
    this.elements.viewProductLinks().first().click();
  }

  addToCart() {
    this.elements.addToCartButton().click();
  }

  continueShopping() {
    this.elements.continueShoppingButton().should('be.visible').click();
  }

  setQuantity(qty) {
    cy.get('#quantity').clear().type(String(qty));
  }

  addToCartFromDetail() {
    cy.get('#add-to-cart-button, button.cart').first().click();
  }

  assertProductDetailsVisible() {
    cy.get('.product-information h2').should('be.visible');
    cy.get('.product-information').should('contain.text', 'Rs.');
  }
}

export default new ProductsPage();
