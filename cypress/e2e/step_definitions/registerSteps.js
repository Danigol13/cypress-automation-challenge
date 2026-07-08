import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import registerPage from '../../support/page_objects/registerPage';

Given('que acesso a página de cadastro', () => {
  registerPage.visit();
});

When('preencho o nome {string} e um email único para cadastro', (name) => {
  const uniqueEmail = `testuser_${Date.now()}@example.com`;
  registerPage.fillSignup(name, uniqueEmail);
});

When('concluo o preenchimento do formulário de cadastro', () => {
  registerPage.fillRegistrationForm();
});

Then('devo ver a confirmação de conta criada com sucesso', () => {
  registerPage.assertAccountCreated();
  cy.screenshot('CT16-cadastro-usuario-valido');
});

When('tento me cadastrar com o email {string} já existente', (email) => {
  registerPage.fillSignup('Existing User', email);
});

Then('devo ver a mensagem de email já cadastrado', () => {
  registerPage.assertEmailAlreadyExists();
  cy.screenshot('CT17-cadastro-email-existente');
});
