Feature: Adicionar produto ao carrinho
  Como usuário da plataforma
  Quero adicionar produtos ao carrinho
  Para poder comprá-los posteriormente

  Scenario: CT05 - Adicionar produto ao carrinho com sucesso
    Given que acesso a página de produtos
    When visualizo o primeiro produto disponível
    And clico em adicionar ao carrinho
    And opto por continuar comprando
    Then o produto deve estar presente no carrinho

  Scenario: CT06 - Acessar carrinho vazio sem adicionar produtos
    Given que acesso o carrinho sem adicionar produtos
    Then o carrinho deve estar vazio
