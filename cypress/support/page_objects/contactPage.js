class ContactPage {
  elements = {
    nameInput: () => cy.get('[data-qa="name"]'),
    emailInput: () => cy.get('[data-qa="email"]'),
    subjectInput: () => cy.get('[data-qa="subject"]'),
    messageTextarea: () => cy.get('[data-qa="message"]'),
    submitButton: () => cy.get('[data-qa="submit-button"]'),
    successMessage: () => cy.get('.status.alert-success'),
  };

  visit() {
    cy.visit('/contact_us');
  }

  fillAndSubmit(name, email, subject, message) {
    this.elements.nameInput().type(name);
    this.elements.emailInput().type(email);
    this.elements.subjectInput().type(subject);
    this.elements.messageTextarea().type(message);
    cy.on('window:confirm', () => true);
    this.elements.submitButton().click();
  }

  assertSuccess() {
    this.elements.successMessage().should('contain.text', 'Success!');
  }
}

export default new ContactPage();
