const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test');
const { STANDARD_USER } = require('../helpers/enviroments');
const Login = require('../helpers/loginPage'); 
const Compra = require('../helpers/compraPage'); 
const URL = 'https://www.saucedemo.com/';

const ID_MOCHILA_BUTTON = '#add-to-cart-sauce-labs-backpack';
const ID_MOCHILACARRINHO_BUTTON = '#item_4_title_link';
const ID_CONFIRMARCOMPRA_BUTTON = '#checkout';
const ID_FINALIZARCOMPRA_BUTTON = '#finish';
const ID_COMPRAREALIZADA_TEXTAREA = '#checkout_complete_container';

let browser;
let page;
let login;
let compra;

const produtos = {
  descricaoMochila: 'Sauce Labs Backpack'
};

Before(async function () {
  browser = await chromium.launch({ headless: false }); 
  const context = await browser.newContext(); 
  page = await context.newPage(); 
  login = new Login(page); 
  compra = new Compra(page); 
});

After(async function () {
  await browser.close(); 
});

// Cenário: Finalizar compra com sucesso
Given('o usuário está logado e na página de produtos', async function () {
  await page.goto(URL);
  await login.login(STANDARD_USER);
  await expect(page.getByText('Swag Labs')).toBeVisible();
});

When('o usuário seleciona o primeiro produto', async function () {
  //método que seleciona o primeiro produto
  await compra.adicionarProdutoCarrinho(ID_MOCHILA_BUTTON);
});

When('o usuário vai para o carrinho e visualiza o item selecionado no carrinho', async function () {
  //método que vai até o carrinho e visualiza o item selecionado no carrinho
  await compra.verificarProdutoCarrinho(ID_MOCHILACARRINHO_BUTTON);
});

When('o usuário segue para o pagamento', async function () {
  await page.locator(ID_CONFIRMARCOMPRA_BUTTON).click();
});

When('o usuário informa as informações de entrega', async function () {
  //método que informa as informações de entrega
  await compra.preencherInformacoesEntrega('Daniel', 'Dellagnolo', '123456789');
});

When('o usuário finaliza a compra', async function () {
  await expect(page.locator(ID_MOCHILACARRINHO_BUTTON)).toBeVisible();
  await page.locator(ID_FINALIZARCOMPRA_BUTTON).click(); // Clica em finalizar
});

Then('o usuário deve ver a mensagem Thank you for your order!', async function () {
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});

Then('o usuário deve ver o título Checkout: Complete!', async function () {
  await expect(page.locator(ID_COMPRAREALIZADA_TEXTAREA)).toBeVisible
  await expect(page.locator('.title')).toHaveText('Checkout: Complete!');
});
