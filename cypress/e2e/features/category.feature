Feature: Navegação por categoria de produtos
  Como usuário da plataforma
  Quero navegar entre categorias de produtos
  Para encontrar produtos de segmentos específicos

  Scenario: CT24 - Navegar para categoria Women exibe produtos filtrados
    Given que acesso a página de produtos
    When acesso a categoria Women Dress
    Then devo ver os produtos da categoria Women filtrados

  Scenario: CT25 - Navegar para categoria Men exibe produtos filtrados
    Given que acesso a página de produtos
    When acesso a categoria Men Tshirts
    Then devo ver os produtos da categoria Men filtrados
