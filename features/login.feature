Feature: Login no SauceDemo

  Scenario: Login com credenciais válidas
    Given que o usuário está na página de login do SauceDemo
    When o usuário insere e-mail e senha válidos
    Then o usuário deve ver a página de produtos

  Scenario: Login com credenciais inválidas
    Given que o usuário está na página de login do SauceDemo
    When o usuário insere e-mail e senha inválidos
    Then o usuário deve receber uma mensagem apontando que o usuário ou senha é inválido