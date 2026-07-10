import { Then } from '@badeball/cypress-cucumber-preprocessor';
import productsPage from '../../support/page_objects/productsPage';

Then('o nome e o preço do produto devem estar visíveis', () => {
  productsPage.assertProductDetailsVisible();
});
