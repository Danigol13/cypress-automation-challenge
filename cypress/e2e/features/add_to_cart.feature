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

  Scenario: CT13 - Remover produto do carrinho deve esvaziá-lo
    Given que estou logado com email "teste2021@teste.com.br" e senha "teste"
    And que adiciono um produto ao carrinho
    When removo o produto do carrinho
    Then o carrinho deve estar vazio após a remoção

  Scenario: CT14 - Quantidade do produto adicionado ao carrinho deve ser 1
    Given que estou logado com email "teste2021@teste.com.br" e senha "teste"
    And que adiciono um produto ao carrinho
    Then a quantidade do produto no carrinho deve ser 1

  Scenario: CT26 - Total do produto no carrinho deve corresponder ao preço unitário
    Given que estou logado com email "teste2021@teste.com.br" e senha "teste"
    And que adiciono um produto ao carrinho
    Then o total do produto deve corresponder ao preço unitário

  Scenario: CT28 - Alterar quantidade para 2 antes de adicionar deve refletir no carrinho
    Given que estou logado com email "teste2021@teste.com.br" e senha "teste"
    When altero a quantidade do produto para 2 e adiciono ao carrinho
    Then o produto deve estar no carrinho com quantidade 2
