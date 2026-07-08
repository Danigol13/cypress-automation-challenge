import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import productsPage from '../../support/page_objects/productsPage';

Given('que acesso a página de produtos', () => {
  productsPage.visit();
});

When('realizo uma busca pelo termo {string}', (term) => {
  productsPage.search(term);
});

Then('devo ver resultados de produtos na listagem', () => {
  productsPage.assertResultsVisible();
});

Then('não devo ver produtos na listagem de resultados', () => {
  productsPage.assertNoResults();
});
