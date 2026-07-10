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
    birthDaySelect: () => cy.get('select[data-qa="days"]'),
    birthMonthSelect: () => cy.get('select[data-qa="months"]'),
    birthYearSelect: () => cy.get('select[data-qa="years"]'),
  };

  visit() {
    cy.visit('/login');
  }

  fillSignup(name, email) {
    this.elements.signupNameInput().type(name);
    this.elements.signupEmailInput().type(email);
    this.elements.signupButton().click();
  }

  fillRegistrationForm(data) {
    this.elements.passwordInput().type(data.password);
    this.elements.birthDaySelect().select(data.birthDay);
    this.elements.birthMonthSelect().select(data.birthMonth);
    this.elements.birthYearSelect().select(data.birthYear);
    this.elements.firstNameInput().type(data.firstName);
    this.elements.lastNameInput().type(data.lastName);
    this.elements.addressInput().type(data.address);
    this.elements.countrySelect().select(data.country);
    this.elements.stateInput().type(data.state);
    this.elements.cityInput().type(data.city);
    this.elements.zipcodeInput().type(data.zipcode);
    this.elements.mobileInput().type(data.mobile);
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
