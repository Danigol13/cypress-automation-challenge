import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import contactPage from '../../../support/page_objects/contactPage';

Given('que acesso a página de contato', () => {
  contactPage.visit();
});

When('preencho e envio o formulário com dados válidos', () => {
  contactPage.fillAndSubmit(
    'Test User',
    'testcontact@example.com',
    'Dúvida sobre produtos',
    'Gostaria de mais informações sobre os produtos disponíveis na loja.'
  );
});

Then('devo ver a mensagem de envio com sucesso', () => {
  contactPage.assertSuccess();
  cy.screenshot('CT27-formulario-contato-sucesso');
});
