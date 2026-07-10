class PaymentPage {
  elements = {
    nameOnCard:   () => cy.get('[data-qa="name-on-card"]'),
    cardNumber:   () => cy.get('[data-qa="card-number"]'),
    cvc:          () => cy.get('[data-qa="cvc"]'),
    expiryMonth:  () => cy.get('[data-qa="expiry-month"]'),
    expiryYear:   () => cy.get('[data-qa="expiry-year"]'),
    payButton:    () => cy.get('[data-qa="pay-button"]'),
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

  fillFormExcept(excludeField) {
    const fields = {
      'name-on-card': () => this.elements.nameOnCard().type('QA Test User'),
      'card-number':  () => this.elements.cardNumber().type('4111111111111111'),
      'cvc':          () => this.elements.cvc().type('123'),
      'expiry-month': () => this.elements.expiryMonth().type('12'),
      'expiry-year':  () => this.elements.expiryYear().type('2028'),
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
    cy.screenshot('CT52-checkout-pedido-confirmado');
  }

  assertFieldInvalid(fieldDataQa) {
    cy.url().should('include', '/payment');
    cy.get(`[data-qa="${fieldDataQa}"]`)
      .invoke('prop', 'validity')
      .its('valid')
      .should('eq', false);
    cy.screenshot(`CT53-checkout-campo-${fieldDataQa}-invalido`);
  }
}

export default new PaymentPage();
