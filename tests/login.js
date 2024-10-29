const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test');
const { STANDARD_USER, INVALID_USER, MENSAGE_USER_OR_PASSWORD_INVALID } = require('../helpers/enviroments');
const Login = require('../helpers/loginPage'); 
const URL = 'https://www.saucedemo.com/';

let browser;
let page;
let login;

// Hook para executar antes de cada cenário
Before(async function () {
  browser = await chromium.launch({ headless: false }); 
  const context = await browser.newContext(); 
  page = await context.newPage(); 
  login = new Login(page); 
});

// Hook para executar após cada cenário
After(async function () {
  await browser.close(); 
});

// Passo: Acessando a página de login
Given('que o usuário está na página de login do SauceDemo', async function () {
  await page.goto(URL);
});

// Cenário 1: Login com credenciais válidas
When('o usuário insere e-mail e senha válidos', async function () {
  await login.login(STANDARD_USER); 
});

Then('o usuário deve ver a página de produtos', async function () {
  await expect(page.getByText('Swag Labs')).toBeVisible(); 
  await expect(page.locator('[data-test="title"]')).toBeVisible(); 
});

// Cenário 2: Login com credenciais inválidas
When('o usuário insere e-mail e senha inválidos', async function () {
  await login.login(INVALID_USER); 
});

Then('o usuário deve receber uma mensagem apontando que o usuário ou senha é inválido', async function () {
  const errorLocator = page.locator('[data-test="error"]');
  
  await expect(errorLocator).toBeVisible(); 
  await expect(errorLocator).toHaveText(MENSAGE_USER_OR_PASSWORD_INVALID);
});
