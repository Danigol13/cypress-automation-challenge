Feature: Busca de produtos na plataforma
  Como usuário da plataforma
  Quero buscar produtos pelo nome
  Para encontrar itens de interesse

  Scenario: CT03 - Busca com termo válido retorna produtos
    Given que acesso a página de produtos
    When realizo uma busca pelo termo "Dress"
    Then devo ver resultados de produtos na listagem

  Scenario: CT04 - Busca com termo inexistente não retorna produtos
    Given que acesso a página de produtos
    When realizo uma busca pelo termo "xyzabc999notexist"
    Then não devo ver produtos na listagem de resultados
