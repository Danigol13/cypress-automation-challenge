@Web @Regression
Feature: Login na plataforma Automation Exercise
  Como usuário cadastrado
  Quero realizar login na plataforma
  Para acessar as funcionalidades disponíveis

  Background:
    Given que acesso a página de login

  @CT01 @Smoke @Critical
  Scenario: Login com credenciais válidas
    When informo as credenciais de um usuário válido
    And clico no botão de login
    Then devo ser redirecionado para a página principal logado com sucesso

  @CT02
  Scenario: Login com credenciais inválidas
    When informo as credenciais de um usuário inválido
    And clico no botão de login
    Then devo ver a mensagem de erro de credenciais inválidas

  @CT11
  Scenario: Login sem informar o email deve manter o usuário na página de login
    When preencho apenas a senha do usuário válido
    And clico no botão de login
    Then o campo de email deve ser marcado como obrigatório

  @CT12
  Scenario: Login sem informar a senha deve manter o usuário na página de login
    When preencho apenas o email do usuário válido
    And clico no botão de login
    Then o campo de senha deve ser marcado como obrigatório

  @CT55 @Smoke @Security
  Scenario: Logout realizado com sucesso
    Given que estou logado como usuário válido
    When clico no botão de logout
    Then devo ser redirecionado para a página de login
