import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import loginPage from '../../support/page_objects/loginPage';

Given('que acesso a página de login', () => {
  loginPage.visit();
});

When('informo as credenciais de um usuário válido', () => {
  cy.fixture('users').then((data) => {
    loginPage.fillEmail(data.validUser.email);
    loginPage.fillPassword(data.validUser.password);
  });
});

When('informo as credenciais de um usuário inválido', () => {
  cy.fixture('users').then((data) => {
    loginPage.fillEmail(data.invalidUser.email);
    loginPage.fillPassword(data.invalidUser.password);
  });
});

When('clico no botão de login', () => {
  loginPage.clickLogin();
});

Then('devo ser redirecionado para a página principal logado com sucesso', () => {
  cy.url().should('not.include', '/login');
  loginPage.elements.logoutLink().should('be.visible');
});

Then('devo ver a mensagem de erro de credenciais inválidas', () => {
  loginPage.elements.errorMessage().should('be.visible');
});

Given('que estou logado como usuário válido', () => {
  cy.fixture('users').then((data) => {
    cy.login(data.validUser.email, data.validUser.password);
  });
});

Given('que estou logado com email {string} e senha {string}', (email, password) => {
  cy.login(email, password);
});

When('preencho apenas a senha do usuário válido', () => {
  cy.fixture('users').then((data) => {
    loginPage.fillPassword(data.validUser.password);
  });
});

When('preencho apenas o email do usuário válido', () => {
  cy.fixture('users').then((data) => {
    loginPage.fillEmail(data.validUser.email);
  });
});

Then('o campo de email deve ser marcado como obrigatório', () => {
  cy.url().should('include', '/login');
  loginPage.elements.emailInput().should('have.attr', 'required');
});

Then('o campo de senha deve ser marcado como obrigatório', () => {
  cy.url().should('include', '/login');
  loginPage.elements.passwordInput().should('have.attr', 'required');
});

When('clico no botão de logout', () => {
  cy.get('a[href="/logout"]').click();
});

Then('devo ser redirecionado para a página de login', () => {
  cy.url().should('include', '/login');
});
