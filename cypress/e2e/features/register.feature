@Web @Regression
Feature: Cadastro de usuário
  Como novo visitante
  Quero criar uma conta na plataforma
  Para acessar funcionalidades exclusivas de usuário cadastrado

  @CT16
  Scenario: Cadastro com dados válidos cria conta com sucesso
    Given que acesso a página de cadastro
    When preencho o nome "Test User" e um email único para cadastro
    And concluo o preenchimento do formulário de cadastro
    Then devo ver a confirmação de conta criada com sucesso

  @CT17
  Scenario: Cadastro com email já cadastrado exibe mensagem de erro
    Given que acesso a página de cadastro
    When tento me cadastrar com o email de um usuário já existente
    Then devo ver a mensagem de email já cadastrado
