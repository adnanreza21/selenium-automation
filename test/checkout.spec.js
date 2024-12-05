const { By, Builder, Browser, until } = require('selenium-webdriver');
const assert = require("assert");
const account = require('../data/account.json');
const url = require('../data/url.json');
const username = account.standard_user.username;
const password = account.standard_user.password;
const base_url = url.base_url;

(async function login() {
  let driver;

  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get(base_url);

    let title = await driver.getTitle();
    assert.equal("Swag Labs", title);

    await driver.manage().setTimeouts({ implicit: 500 });

    let textBoxUsername = await driver.findElement(By.name('user-name'));
    let textBoxPassword = await driver.findElement(By.name('password'));
    let loginButton = await driver.findElement(By.css('#login-button'));

    await textBoxUsername.sendKeys(username);
    await textBoxPassword.sendKeys(password);
    await loginButton.click();

    await driver.wait(until.urlContains('inventory'), 10000); // Adjust URL part and timeout as needed

    console.log('Login successfull!');
  } catch (error) {
    console.error('Error during login:', error);
  }
  try {

    let buttonAddCart1 = await driver.findElement(By.name('add-to-cart-sauce-labs-fleece-jacket'));
    let buttonAddCart2 = await driver.findElement(By.name('add-to-cart-sauce-labs-onesie'));
    let buttonToCart = await driver.findElement(By.css('.shopping_cart_link'));


    await buttonAddCart1.click();
    await buttonAddCart2.click();
    await buttonToCart.click();

    await driver.wait(until.urlContains('cart'), 10000); // Adjust URL part and timeout as needed

    console.log('Success to Cart!!!');
  } catch (error) {
    console.error('Error during To Cart:', error);

  } finally {
    await driver.quit();
  }
}())