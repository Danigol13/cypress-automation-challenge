class HomePage {
  elements = {
    logo: () => cy.get('#header .logo'),
    navbar: () => cy.get('#header .navbar-nav'),
    signupLoginLink: () => cy.get('a[href="/login"]'),
    logoutLink: () => cy.get('a[href="/logout"]'),
    cartLink: () => cy.get('a[href="/view_cart"]'),
  };

  visit() {
    cy.visit('/');
  }

  assertIsVisible() {
    this.elements.logo().should('be.visible');
  }

  assertLoggedIn() {
    this.elements.logoutLink().should('be.visible');
  }

  goToCart() {
    this.elements.cartLink().click();
  }
}

export default new HomePage();
