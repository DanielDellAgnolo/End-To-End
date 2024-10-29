const { expect } = require('@playwright/test');

class Compra {
    constructor(page) {
        this.page = page;
        this.locatorCarrinhoButton = page.locator('#shopping_cart_container');
        this.locatorItensCarrinhoList = page.locator('[data-test="inventory-item"]');
        this.locatorNomeSpan = page.locator('#first-name');
        this.locatorSobrenomeSpan = page.locator('#last-name');
        this.locatorCEPSpan = page.locator('#postal-code');
        this.locatorContinuarButton = page.locator('#continue');
    }

    async adicionarProdutoCarrinho(produto) {
        await this.page.locator(produto).click();
    }
    
    async verificarProdutoCarrinho(produto) {
        this.acessarCarrinho();
        await expect(this.page.locator(produto)).toBeVisible();
    }
    
    async acessarCarrinho() {
        await this.locatorCarrinhoButton.click();
    }

    async preencherInformacoesEntrega(nome, sobrenome, CEP) {
        await this.locatorNomeSpan.fill(nome);
        await this.locatorSobrenomeSpan.fill(sobrenome);
        await this.locatorCEPSpan.fill(CEP);
        await this.locatorContinuarButton.click();
    }
}

module.exports = Compra;