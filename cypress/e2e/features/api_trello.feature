Feature: API Trello - Consulta de action
  Como consumidor da API Trello
  Quero consultar os dados de uma action específica
  Para validar as informações retornadas pelo serviço

  Scenario: CT09 - GET Trello action com credenciais válidas retorna status 200 e exibe list.name
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    Then o status code da resposta deve ser 200
    And o campo "name" da estrutura "list" deve ser exibido no log

  Scenario: CT10 - GET Trello action sem credenciais retorna status 401
    Given que não possuo credenciais da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a" sem autenticação
    Then o status code da resposta deve ser 401
