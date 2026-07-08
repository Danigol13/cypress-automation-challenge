import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import categoryPage from '../../../support/page_objects/categoryPage';

When('acesso a categoria Women Dress', () => {
  categoryPage.selectWomenDress();
});

When('acesso a categoria Men Tshirts', () => {
  categoryPage.selectMenTshirts();
});

Then('devo ver os produtos da categoria Women filtrados', () => {
  categoryPage.assertCategoryProductsVisible('Women');
  cy.screenshot('CT24-categoria-women-dress');
});

Then('devo ver os produtos da categoria Men filtrados', () => {
  categoryPage.assertCategoryProductsVisible('Men');
  cy.screenshot('CT25-categoria-men-tshirts');
});
