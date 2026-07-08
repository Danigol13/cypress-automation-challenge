import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import loginPage from '../../support/page_objects/loginPage';

Given('que acesso a página de login', () => {
  loginPage.visit();
});

When('informo o email {string} e senha {string}', (email, password) => {
  loginPage.fillEmail(email);
  loginPage.fillPassword(password);
});

When('clico no botão de login', () => {
  loginPage.clickLogin();
});

Then('devo ser redirecionado para a página principal logado com sucesso', () => {
  cy.url().should('not.include', '/login');
  loginPage.assertLoginSuccess();
});

Then('devo ver a mensagem de erro de credenciais inválidas', () => {
  loginPage.assertLoginError();
});

// Step compartilhado com checkout.feature
Given('que estou logado com email {string} e senha {string}', (email, password) => {
  loginPage.visit();
  loginPage.login(email, password);
  loginPage.assertLoginSuccess();
});
