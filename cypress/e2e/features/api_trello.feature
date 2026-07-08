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
    And tiro evidência da resposta 401 da action

  Scenario: CT18 - Validar campo "type" da action deve ser "updateCard"
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    Then o campo "type" da resposta raiz deve ser "updateCard"

  Scenario: CT19 - Validar campo "date" da action deve estar preenchido
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    Then o campo "date" da resposta raiz deve estar preenchido

  Scenario: CT20 - GET no board da action retorna 200 e nome do board
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    And busco os detalhes do board associado à action
    Then o status code da resposta deve ser 200
    And o campo "name" do board deve ser exibido no log

  Scenario: CT21 - GET na lista da action retorna 200 e nome da lista
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    And busco os detalhes da lista associada à action
    Then o status code da resposta deve ser 200
    And o campo "name" da lista deve ser exibido no log

  Scenario: CT22 - GET no card da action retorna 200 e nome do card
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    And busco os detalhes do card associado à action
    Then o status code da resposta deve ser 200
    And o campo "name" do card deve ser exibido no log

  Scenario: CT23 - GET no board com credenciais inválidas retorna 401
    Given que não possuo credenciais da API Trello
    When realizo um GET para o board sem autenticação
    Then o status code da resposta deve ser 401
    And tiro evidência do board sem autenticação

  Scenario: CT29 - GET card com ID inexistente retorna 404
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para um card com ID inexistente
    Then o status code da resposta deve ser 404

  Scenario: CT30 - Campo "idMemberCreator" da action deve estar preenchido
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    Then o campo "idMemberCreator" da resposta raiz deve estar preenchido

  Scenario: CT31 - GET action com filtro de campos retorna apenas os campos solicitados
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para a action com filtro de campos "type,date"
    Then o status code da resposta deve ser 200
    And os campos filtrados type e date devem estar presentes na resposta

  Scenario: CT32 - Estrutura data.board da action deve conter id e name
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    Then a estrutura data.board deve conter id e name

  Scenario: CT33 - idBoard do card deve corresponder ao board da action
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    And busco o card da action e verifico o board
    Then o idBoard do card deve corresponder ao board da action
