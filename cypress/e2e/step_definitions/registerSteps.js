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
  cy.fixture('users').then((data) => {
    registerPage.fillRegistrationForm(data.register);
  });
});

Then('devo ver a confirmação de conta criada com sucesso', () => {
  registerPage.assertAccountCreated();
});

When('tento me cadastrar com o email de um usuário já existente', () => {
  cy.fixture('users').then((data) => {
    registerPage.fillSignup(data.existingUser.name, data.existingUser.email);
  });
});

Then('devo ver a mensagem de email já cadastrado', () => {
  registerPage.assertEmailAlreadyExists();
});
