Feature: Login na plataforma Automation Exercise
  Como usuário cadastrado
  Quero realizar login na plataforma
  Para acessar as funcionalidades disponíveis

  Background:
    Given que acesso a página de login

  Scenario: CT01 - Login com credenciais válidas
    When informo o email "teste2021@teste.com.br" e senha "teste"
    And clico no botão de login
    Then devo ser redirecionado para a página principal logado com sucesso

  Scenario: CT02 - Login com credenciais inválidas
    When informo o email "invalido@example.com" e senha "senhaerrada123"
    And clico no botão de login
    Then devo ver a mensagem de erro de credenciais inválidas

  Scenario: CT11 - Login sem informar o email deve manter o usuário na página de login
    When preencho apenas a senha "teste"
    And clico no botão de login
    Then o campo de email deve ser marcado como obrigatório

  Scenario: CT12 - Login sem informar a senha deve manter o usuário na página de login
    When preencho apenas o email "teste2021@teste.com.br"
    And clico no botão de login
    Then o campo de senha deve ser marcado como obrigatório
