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
