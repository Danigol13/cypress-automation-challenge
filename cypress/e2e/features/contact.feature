Feature: Formulário de contato
  Como visitante da plataforma
  Quero enviar uma mensagem pelo formulário de contato
  Para entrar em contato com a equipe

  Scenario: CT27 - Envio de formulário de contato com dados válidos exibe sucesso
    Given que acesso a página de contato
    When preencho e envio o formulário com dados válidos
    Then devo ver a mensagem de envio com sucesso
