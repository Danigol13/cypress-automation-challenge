@Web @Regression
Feature: Adicionar produto ao carrinho
  Como usuário da plataforma
  Quero adicionar e gerenciar produtos no carrinho
  Para controlar os itens antes de finalizar a compra

  @CT05 @Smoke @Critical
  Scenario: Adicionar produto ao carrinho com sucesso
    Given que acesso a página de produtos
    When visualizo o primeiro produto disponível
    And clico em adicionar ao carrinho
    And opto por continuar comprando
    Then o produto deve estar presente no carrinho

  @CT06
  Scenario: Acessar carrinho vazio sem adicionar produtos
    Given que acesso o carrinho sem adicionar produtos
    Then o carrinho deve estar vazio

  @CT08
  Scenario: Usuário não logado é solicitado a fazer login ao tentar realizar checkout
    Given que acesso a página de produtos
    And visualizo o primeiro produto disponível
    And clico em adicionar ao carrinho
    And opto por continuar comprando
    When acesso o carrinho e prossigo para o checkout
    Then devo ser solicitado a fazer login ou cadastro

  @CT13
  Scenario: Remover produto do carrinho deve esvaziá-lo
    Given que estou logado como usuário válido
    And que adiciono um produto ao carrinho
    When removo o produto do carrinho
    Then o carrinho deve estar vazio após a remoção

  @CT14
  Scenario: Quantidade do produto adicionado ao carrinho deve ser 1
    Given que estou logado como usuário válido
    And que adiciono um produto ao carrinho
    Then a quantidade do produto no carrinho deve ser 1

  @CT26
  Scenario: Total do produto no carrinho deve corresponder ao preço unitário
    Given que estou logado como usuário válido
    And que adiciono um produto ao carrinho
    Then o total do produto deve corresponder ao preço unitário

  @CT28
  Scenario: Alterar quantidade para 2 antes de adicionar deve refletir no carrinho
    Given que estou logado como usuário válido
    When altero a quantidade do produto para 2 e adiciono ao carrinho
    Then o produto deve estar no carrinho com quantidade 2
