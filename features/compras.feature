Feature: Finalizar compra

  Scenario: Finalizando compra com sucesso
    Given o usuário está logado e na página de produtos
    When o usuário seleciona o primeiro produto
    And o usuário vai para o carrinho e visualiza o item selecionado no carrinho
    And o usuário segue para o pagamento
    And o usuário informa as informações de entrega
    And o usuário finaliza a compra
    Then o usuário deve ver a mensagem Thank you for your order!
    And o usuário deve ver o título Checkout: Complete!
