class PaymentPage {
  elements = {
    nameOnCard:  () => cy.get('[data-qa="name-on-card"]'),
    cardNumber:  () => cy.get('[data-qa="card-number"]'),
    cvc:         () => cy.get('[data-qa="cvc"]'),
    expiryMonth: () => cy.get('[data-qa="expiry-month"]'),
    expiryYear:  () => cy.get('[data-qa="expiry-year"]'),
    payButton:   () => cy.get('[data-qa="pay-button"]'),
  };

  placeOrderFromCheckout() {
    cy.contains('Place Order').click();
    cy.url().should('include', '/payment');
  }

  fillForm(name, number, cvc, month, year) {
    this.elements.nameOnCard().type(name);
    this.elements.cardNumber().type(number);
    this.elements.cvc().type(cvc);
    this.elements.expiryMonth().type(month);
    this.elements.expiryYear().type(year);
  }

  fillFormExcept(excludeField, data) {
    const fields = {
      'name-on-card': () => this.elements.nameOnCard().type(data.nameOnCard),
      'card-number':  () => this.elements.cardNumber().type(data.cardNumber),
      'cvc':          () => this.elements.cvc().type(data.cvc),
      'expiry-month': () => this.elements.expiryMonth().type(data.expiryMonth),
      'expiry-year':  () => this.elements.expiryYear().type(data.expiryYear),
    };
    Object.entries(fields).forEach(([key, fn]) => {
      if (key !== excludeField) fn();
    });
  }

  confirmPayment() {
    this.elements.payButton().click();
  }

  assertOrderPlaced() {
    cy.contains('Order Placed', { timeout: 15000 }).should('be.visible');
  }

  assertFieldInvalid(fieldDataQa) {
    cy.url().should('include', '/payment');
    cy.get(`[data-qa="${fieldDataQa}"]`)
      .invoke('prop', 'validity')
      .its('valid')
      .should('eq', false);
  }
}

export default new PaymentPage();
