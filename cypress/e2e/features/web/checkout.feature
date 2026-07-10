Feature: Validação dos produtos na tela de pagamento
  Como usuário da plataforma
  Quero validar os produtos incluídos no carrinho durante o checkout
  Para confirmar os itens antes de finalizar a compra

  Scenario: CT07 - Usuário logado visualiza produto na tela de finalização de compra
    Given que estou logado com email "teste2021@teste.com.br" e senha "teste"
    And que adiciono um produto ao carrinho
    When acesso o carrinho e prossigo para o checkout
    Then os produtos devem aparecer na tela de finalização de compra

  Scenario: CT08 - Usuário não logado é solicitado a fazer login ao tentar realizar checkout
    Given que acesso a página de produtos
    And visualizo o primeiro produto disponível
    And clico em adicionar ao carrinho
    And opto por continuar comprando
    When acesso o carrinho e prossigo para o checkout
    Then devo ser solicitado a fazer login ou cadastro

  Scenario: CT52 - Finalizar compra com dados de pagamento válidos exibe confirmação do pedido
    Given que estou logado com email "teste2021@teste.com.br" e senha "teste"
    And que adiciono um produto ao carrinho
    When acesso o carrinho e prossigo para o checkout
    And prossigo para a tela de pagamento
    And preencho os dados de pagamento com informações válidas
    Then devo ver a confirmação do pedido realizado com sucesso

  Scenario Outline: CT53 - Campo obrigatório "<campo>" não preenchido impede confirmação de pagamento
    Given que estou logado com email "teste2021@teste.com.br" e senha "teste"
    And que adiciono um produto ao carrinho
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
