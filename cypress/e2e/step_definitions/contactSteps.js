import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import contactPage from '../../support/page_objects/contactPage';

Given('que acesso a página de contato', () => {
  contactPage.visit();
});

When('preencho e envio o formulário com dados válidos', () => {
  cy.fixture('users').then((data) => {
    contactPage.fillAndSubmit(
      data.contact.name,
      data.contact.email,
      data.contact.subject,
      data.contact.message
    );
  });
});

Then('devo ver a mensagem de envio com sucesso', () => {
  contactPage.assertSuccess();
});
