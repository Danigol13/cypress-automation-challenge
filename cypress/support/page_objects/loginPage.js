class LoginPage {
  elements = {
    emailInput: () => cy.get('input[data-qa="login-email"]'),
    passwordInput: () => cy.get('input[data-qa="login-password"]'),
    loginButton: () => cy.get('button[data-qa="login-button"]'),
    errorMessage: () => cy.contains('p', 'Your email or password is incorrect!'),
    logoutLink: () => cy.get('a[href="/logout"]'),
  };

  visit() {
    cy.visit('/login');
  }

  fillEmail(email) {
    this.elements.emailInput().clear().type(email);
  }

  fillPassword(password) {
    this.elements.passwordInput().clear().type(password);
  }

  clickLogin() {
    this.elements.loginButton().click();
  }

  login(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.clickLogin();
  }

  assertLoginSuccess() {
    this.elements.logoutLink().should('be.visible');
  }

  assertLoginError() {
    this.elements.errorMessage().should('be.visible');
  }
}

export default new LoginPage();
