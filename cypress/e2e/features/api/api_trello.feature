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

  Scenario: CT34 - GET /members/{idMemberCreator} retorna 200 e username do membro
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    And busco os detalhes do member criador da action
    Then o status code da resposta deve ser 200
    And o campo "username" do member deve ser exibido no log

  Scenario: CT35 - GET /boards/{id}/lists retorna 200 e array não vazio
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    And busco as listas do board da action
    Then o status code da resposta deve ser 200
    And as listas do board devem ser um array não vazio

  Scenario: CT36 - GET /boards/{id}/cards retorna 200 e array não vazio
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    And busco os cards do board da action
    Then o status code da resposta deve ser 200
    And os cards do board devem ser um array não vazio

  Scenario: CT37 - GET /boards/{id}/members retorna 200 e array não vazio
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    And busco os membros do board da action
    Then o status code da resposta deve ser 200
    And os membros do board devem ser um array não vazio

  Scenario: CT38 - Campo data.card.id da action deve estar preenchido
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    Then o campo "id" de data.card deve estar preenchido

  Scenario: CT39 - Estrutura data.old deve existir na action do tipo updateCard
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    Then a estrutura data.old deve existir na resposta

  Scenario: CT40 - O id da resposta deve corresponder ao id da action consultada
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    Then o id da resposta deve ser "592f11060f95a3d3d46a987a"

  Scenario: CT41 - GET action com token inválido retorna 401
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para a action com token inválido
    Then o status code da resposta deve ser 401

  Scenario: CT42 - GET action com ID em formato inválido retorna 400
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para a action com ID inválido "abc123"
    Then o status code da resposta deve ser 400

  Scenario: CT43 - GET para endpoint inexistente retorna 404
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para um endpoint inexistente da API Trello
    Then o status code da resposta deve ser 404

  Scenario: CT44 - GET /boards/{id}/cards?limit=1 retorna exatamente 1 card
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    And busco os cards do board da action com limite 1
    Then o status code da resposta deve ser 200
    And a resposta deve conter exatamente 1 item

  Scenario: CT45 - GET action com display=true deve retornar campo display na resposta
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para a action com parâmetro display true
    Then o status code da resposta deve ser 200
    And o campo "display" da resposta raiz deve estar preenchido

  Scenario: CT46 - GET /boards/{id} com fields=name,closed retorna apenas esses campos
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    And busco o board da action com campos filtrados "name,closed"
    Then o status code da resposta deve ser 200
    And a resposta do board deve conter os campos name e closed

  Scenario: CT47 - GET /boards/{id}/lists?filter=open retorna somente listas abertas
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    And busco as listas abertas do board da action
    Then o status code da resposta deve ser 200
    And todas as listas da resposta devem estar abertas
