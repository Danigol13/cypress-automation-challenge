@Web @Regression
Feature: Checkout - usuário autenticado
  Como usuário autenticado
  Quero finalizar minha compra
  Para confirmar os itens e realizar o pagamento

  Background:
    Given que estou logado como usuário válido
    And que adiciono um produto ao carrinho

  @CT07 @Smoke @Critical
  Scenario: Usuário logado visualiza produto na tela de finalização de compra
    When acesso o carrinho e prossigo para o checkout
    Then os produtos devem aparecer na tela de finalização de compra

  @CT52 @Critical
  Scenario: Finalizar compra com dados de pagamento válidos exibe confirmação do pedido
    When acesso o carrinho e prossigo para o checkout
    And prossigo para a tela de pagamento
    And preencho os dados de pagamento com informações válidas
    Then devo ver a confirmação do pedido realizado com sucesso

  @CT53
  Scenario Outline: Campo obrigatório "<campo>" não preenchido impede confirmação de pagamento
    When acesso o carrinho e prossigo para o checkout
    And prossigo para a tela de pagamento
    And submeto o formulário sem o campo "<campo>"
    Then o campo de pagamento "<campo>" deve estar inválido

    Examples:
      | campo        |
      | name-on-card |
      | card-number  |
      | cvc          |
      | expiry-month |
      | expiry-year  |
