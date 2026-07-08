class HomePage {
  elements = {
    navbar: () => cy.get('#header'),
    productsLink: () => cy.get('a[href="/products"]'),
    cartLink: () => cy.get('a[href="/view_cart"]'),
    logoutLink: () => cy.get('a[href="/logout"]'),
  };

  visit() {
    cy.visit('/');
  }

  goToProducts() {
    this.elements.productsLink().first().click();
  }

  goToCart() {
    this.elements.cartLink().first().click();
  }

  assertIsLoaded() {
    cy.url().should('include', 'automationexercise.com');
    this.elements.navbar().should('be.visible');
  }
}

export default new HomePage();
