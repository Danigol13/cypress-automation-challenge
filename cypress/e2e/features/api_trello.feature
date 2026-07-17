@API @Regression
Feature: API Trello - Consulta de action
  Como consumidor da API Trello
  Quero consultar os dados de uma action específica
  Para validar as informações retornadas pelo serviço

  @CT09 @Smoke
  Scenario: GET Trello action com credenciais válidas retorna status 200 e exibe list.name
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    Then o status code da resposta deve ser 200
    And o campo "name" da estrutura "list" deve ser exibido no log

  @CT10
  Scenario: GET Trello action sem credenciais retorna status 401
    Given que não possuo credenciais da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a" sem autenticação
    Then o status code da resposta deve ser 401

  @CT18
  Scenario: Validar campo "type" da action deve ser "updateCard"
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    Then o campo "type" da resposta raiz deve ser "updateCard"

  @CT19
  Scenario: Validar campo "date" da action deve estar preenchido
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    Then o campo "date" da resposta raiz deve estar preenchido

  @CT20
  Scenario: GET no board da action retorna 200 e nome do board
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    And busco os detalhes do board associado à action
    Then o status code da resposta deve ser 200
    And o campo "name" do board deve ser exibido no log

  @CT21
  Scenario: GET na lista da action retorna 200 e nome da lista
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    And busco os detalhes da lista associada à action
    Then o status code da resposta deve ser 200
    And o campo "name" da lista deve ser exibido no log

  @CT22
  Scenario: GET no card da action retorna 200 e nome do card
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    And busco os detalhes do card associado à action
    Then o status code da resposta deve ser 200
    And o campo "name" do card deve ser exibido no log

  @CT23
  Scenario: GET no board com credenciais inválidas retorna 401
    Given que não possuo credenciais da API Trello
    When realizo um GET para o board sem autenticação
    Then o status code da resposta deve ser 401

  @CT29
  Scenario: GET card com ID inexistente retorna 404
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para um card com ID inexistente
    Then o status code da resposta deve ser 404

  @CT30
  Scenario: Campo "idMemberCreator" da action deve estar preenchido
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    Then o campo "idMemberCreator" da resposta raiz deve estar preenchido

  @CT31
  Scenario: GET action com filtro de campos retorna apenas os campos solicitados
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para a action com filtro de campos "type,date"
    Then o status code da resposta deve ser 200
    And os campos filtrados type e date devem estar presentes na resposta

  @CT32
  Scenario: Estrutura data.board da action deve conter id e name
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    Then a estrutura data.board deve conter id e name

  @CT33
  Scenario: idBoard do card deve corresponder ao board da action
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    And busco o card da action e verifico o board
    Then o idBoard do card deve corresponder ao board da action

  @CT34
  Scenario: GET /members/{idMemberCreator} retorna 200 e username do membro
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    And busco os detalhes do member criador da action
    Then o status code da resposta deve ser 200
    And o campo "username" do member deve ser exibido no log

  @CT35
  Scenario: GET /boards/{id}/lists retorna 200 e array não vazio
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    And busco as listas do board da action
    Then o status code da resposta deve ser 200
    And as listas do board devem ser um array não vazio

  @CT36
  Scenario: GET /boards/{id}/cards retorna 200 e array não vazio
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    And busco os cards do board da action
    Then o status code da resposta deve ser 200
    And os cards do board devem ser um array não vazio

  @CT37
  Scenario: GET /boards/{id}/members retorna 200 e array não vazio
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    And busco os membros do board da action
    Then o status code da resposta deve ser 200
    And os membros do board devem ser um array não vazio

  @CT38
  Scenario: Campo data.card.id da action deve estar preenchido
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    Then o campo "id" de data.card deve estar preenchido

  @CT39
  Scenario: Estrutura data.old deve existir na action do tipo updateCard
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    Then a estrutura data.old deve existir na resposta

  @CT40
  Scenario: O id da resposta deve corresponder ao id da action consultada
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    Then o id da resposta deve ser "592f11060f95a3d3d46a987a"

  @CT41
  Scenario: GET action com token inválido retorna 401
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para a action com token inválido
    Then o status code da resposta deve ser 401

  @CT42
  Scenario: GET action com ID em formato inválido retorna 400
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para a action com ID inválido "abc123"
    Then o status code da resposta deve ser 400

  @CT43
  Scenario: GET para endpoint inexistente retorna 404
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para um endpoint inexistente da API Trello
    Then o status code da resposta deve ser 404

  @CT44
  Scenario: GET /boards/{id}/cards?limit=1 retorna exatamente 1 card
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    And busco os cards do board da action com limite 1
    Then o status code da resposta deve ser 200
    And a resposta deve conter exatamente 1 item

  @CT45
  Scenario: GET action com display=true deve retornar campo display na resposta
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para a action com parâmetro display true
    Then o status code da resposta deve ser 200
    And o campo "display" da resposta raiz deve estar preenchido

  @CT46
  Scenario: GET /boards/{id} com fields=name,closed retorna apenas esses campos
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    And busco o board da action com campos filtrados "name,closed"
    Then o status code da resposta deve ser 200
    And a resposta do board deve conter os campos name e closed

  @CT47
  Scenario: GET /boards/{id}/lists?filter=open retorna somente listas abertas
    Given que possuo credenciais válidas da API Trello
    When realizo um GET para o endpoint da action "592f11060f95a3d3d46a987a"
    And busco as listas abertas do board da action
    Then o status code da resposta deve ser 200
    And todas as listas da resposta devem estar abertas

  @CT48
  Scenario: POST /cards cria card no Trello com sucesso e retorna nome correto
    Given que possuo credenciais válidas da API Trello
    When busco a lista da action para usar como destino do card
    And crio um card com nome "Card Desafio QA" na lista obtida
    Then o status code da resposta deve ser 200
    And o nome do card criado deve ser "Card Desafio QA"
    And removo o card criado para limpeza

  @CT49
  Scenario: Card criado via POST deve ser confirmado via GET
    Given que possuo credenciais válidas da API Trello
    When busco a lista da action para usar como destino do card
    And crio um card com nome "Card Verificacao GET" na lista obtida
    And consulto o card criado via GET
    Then o status code da resposta deve ser 200
    And o nome do card consultado deve ser "Card Verificacao GET"
    And removo o card criado para limpeza

  @CT50
  Scenario: DELETE no card criado deve retornar 200
    Given que possuo credenciais válidas da API Trello
    When busco a lista da action para usar como destino do card
    And crio um card temporário na lista obtida
    And removo o card via DELETE
    Then o status code da resposta deve ser 200

  @CT51
  Scenario: POST criar card sem autenticação retorna 401
    Given que não possuo credenciais da API Trello
    When tento criar um card sem autenticação
    Then o status code da resposta deve ser 401

  # ─── Automation Exercise API ────────────────────────────────────────────────

  @CT52 @Smoke
  Scenario: POST /api/createAccount cria conta com dados válidos e retorna responseCode 201
    Given que acesso a API do Automation Exercise
    When envio um POST para criar uma conta com dados válidos
    Then o responseCode da resposta de criação deve ser 201
    And a mensagem da resposta deve ser "User created!"

  @CT53
  Scenario: POST /api/createAccount com email já existente retorna responseCode 400
    Given que acesso a API do Automation Exercise
    When crio uma conta e tento criar novamente com o mesmo email
    Then o responseCode da segunda tentativa deve ser 400
    And a mensagem da segunda tentativa deve ser "Email already exists!"
