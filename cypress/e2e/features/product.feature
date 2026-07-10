@Web @Regression
Feature: Detalhes de produto
  Como usuário da plataforma
  Quero visualizar a página de detalhe de um produto
  Para confirmar nome e preço antes de comprar

  @CT15
  Scenario: Página de detalhe do produto exibe nome e preço
    Given que acesso a página de produtos
    When visualizo o primeiro produto disponível
    Then o nome e o preço do produto devem estar visíveis
