class RegisterPage {
  elements = {
    signupNameInput: () => cy.get('input[data-qa="signup-name"]'),
    signupEmailInput: () => cy.get('input[data-qa="signup-email"]'),
    signupButton: () => cy.get('button[data-qa="signup-button"]'),
    passwordInput: () => cy.get('input[data-qa="password"]'),
    firstNameInput: () => cy.get('input[data-qa="first_name"]'),
    lastNameInput: () => cy.get('input[data-qa="last_name"]'),
    addressInput: () => cy.get('input[data-qa="address"]'),
    countrySelect: () => cy.get('select[data-qa="country"]'),
    stateInput: () => cy.get('input[data-qa="state"]'),
    cityInput: () => cy.get('input[data-qa="city"]'),
    zipcodeInput: () => cy.get('input[data-qa="zipcode"]'),
    mobileInput: () => cy.get('input[data-qa="mobile_number"]'),
    createAccountButton: () => cy.get('button[data-qa="create-account"]'),
    accountCreatedTitle: () => cy.get('h2[data-qa="account-created"]'),
    emailExistsError: () => cy.get('p.text-danger'),
  };

  visit() {
    cy.visit('/login');
  }

  fillSignup(name, email) {
    this.elements.signupNameInput().type(name);
    this.elements.signupEmailInput().type(email);
    this.elements.signupButton().click();
  }

  fillRegistrationForm() {
    this.elements.passwordInput().type('Senha@123');
    cy.get('select[data-qa="days"]').select('1');
    cy.get('select[data-qa="months"]').select('1');
    cy.get('select[data-qa="years"]').select('2000');
    this.elements.firstNameInput().type('Test');
    this.elements.lastNameInput().type('User');
    this.elements.addressInput().type('123 Test Street');
    this.elements.countrySelect().select('United States');
    this.elements.stateInput().type('California');
    this.elements.cityInput().type('Los Angeles');
    this.elements.zipcodeInput().type('90001');
    this.elements.mobileInput().type('5555555555');
    this.elements.createAccountButton().click();
  }

  assertAccountCreated() {
    this.elements.accountCreatedTitle().should('be.visible');
  }

  assertEmailAlreadyExists() {
    cy.contains('Email Address already exist!').should('be.visible');
  }
}

export default new RegisterPage();
