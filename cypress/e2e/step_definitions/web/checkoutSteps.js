import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import paymentPage from '../../../support/page_objects/paymentPage';

When('prossigo para a tela de pagamento', () => {
  paymentPage.placeOrderFromCheckout();
});

When('preencho os dados de pagamento com informações válidas', () => {
  paymentPage.fillForm('QA Test User', '4111111111111111', '123', '12', '2028');
  paymentPage.confirmPayment();
});

Then('devo ver a confirmação do pedido realizado com sucesso', () => {
  paymentPage.assertOrderPlaced();
});

When('submeto o formulário sem o campo {string}', (campo) => {
  paymentPage.fillFormExcept(campo);
  paymentPage.confirmPayment();
});

Then('o campo de pagamento {string} deve estar inválido', (campo) => {
  paymentPage.assertFieldInvalid(campo);
});
